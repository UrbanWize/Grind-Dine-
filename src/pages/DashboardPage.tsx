import React, { useEffect, useState } from 'react';
import { auth, db, doc, onSnapshot, collection, query, where, setDoc, updateDoc, getDocs, serverTimestamp, Timestamp } from '../firebase';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import LogButtons from '../components/LogButtons';
import StreakCard from '../components/StreakCard';
import SavingsCard from '../components/SavingsCard';
import WeeklyChart from '../components/WeeklyChart';
import HistoryList from '../components/HistoryList';
import TipsBanner from '../components/TipsBanner';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function DashboardPage() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    }, (error) => {
      console.error("Error fetching profile:", error);
    });

    const q = query(collection(db, 'logs'), where('userId', '==', user.uid));
    const unsubscribeLogs = onSnapshot(q, (querySnapshot) => {
      const logsData = querySnapshot.docs.map(doc => doc.data());
      setLogs(logsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching logs:", error);
      setLoading(false); // Set loading to false even on error to avoid blank screen
      toast.error("Failed to load your logs. Please check your connection.");
    });

    return () => {
      unsubscribeProfile();
      unsubscribeLogs();
    };
  }, [user]);

  const handleLog = async (status: 'packed' | 'forgot') => {
    if (!user || !profile) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const logKey = `${user.uid}_${today}`;
    const savingsImpact = status === 'packed' ? 300 : 0;

    // Calculate new streak
    let newStreak = profile.streak || 0;
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    const yesterdayLog = logs.find(l => l.date === yesterday);

    if (status === 'packed') {
      if (newStreak === 0 || yesterdayLog?.status === 'packed') {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      
      if (profile.streak === 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success("Yes! +Sh300 saved today 🍱");
      }
    } else {
      newStreak = 0;
      toast.info("Pole. Tomorrow is another chance. Here's a quick idea →");
    }

    const newBestStreak = Math.max(profile.bestStreak || 0, newStreak);
    const newTotalSavings = (profile.totalSavings || 0) + savingsImpact;

    try {
      await setDoc(doc(db, 'logs', logKey), {
        logId: logKey,
        userId: user.uid,
        date: today,
        status,
        savingsImpact,
        createdAt: new Date().toISOString(),
      });

      await updateDoc(doc(db, 'users', user.uid), {
        streak: newStreak,
        bestStreak: newBestStreak,
        totalSavings: newTotalSavings,
        lastActiveDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error logging:", error);
      toast.error("Failed to log. Please try again.");
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLog = logs.find(l => l.date === today);
  const loggedToday = !!todayLog;

  return (
    <div className="max-w-md mx-auto space-y-8 pb-12">
      {/* Header Greeting */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-primary-dark">Habari, {profile?.name?.split(' ')[0]}!</h2>
        <p className="text-text-secondary">
          {loggedToday 
            ? "You're all set for today. Great job!" 
            : "Have you packed your lunch for today?"}
        </p>
      </div>

      {/* Log Buttons */}
      <LogButtons 
        onLog={handleLog} 
        loggedToday={loggedToday} 
        todayStatus={todayLog?.status} 
      />

      {/* Stats Grid */}
      <div className="grid gap-4">
        <StreakCard 
          currentStreak={profile?.streak || 0} 
          bestStreak={profile?.bestStreak || 0} 
        />
        <SavingsCard 
          monthlySavings={profile?.totalSavings || 0} // For MVP, using total as monthly
          lifetimeSavings={profile?.totalSavings || 0} 
        />
      </div>

      {/* Weekly Chart */}
      <WeeklyChart logs={logs} />

      {/* Conditional Tips */}
      <AnimatePresence>
        {!loggedToday && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TipsBanner 
              type="variety" 
              message="No logs yet. Your lunch box is waiting. 👀" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <HistoryList logs={logs} />
    </div>
  );
}
