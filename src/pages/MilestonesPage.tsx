import React, { useEffect, useState } from 'react';
import { auth, db, doc, onSnapshot } from '../firebase';
import { Card, CardContent } from '../components/ui/card';
import { Award, Flame, Wallet, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const MILESTONES = [
  { id: 'streak-3', title: '3 Days Packed', desc: 'You\'re building something. Keep going.', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'streak-7', title: 'One Full Week', desc: 'You\'re not that person who forgets lunch anymore.', icon: Award, color: 'text-primary', bg: 'bg-primary/5' },
  { id: 'streak-30', title: '30 Days Strong', desc: 'A whole month. Sh9,000 saved. You actually did it.', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'savings-1k', title: 'First Sh1,000', desc: 'That\'s 3–4 good movie tickets at IMAX.', icon: Wallet, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'savings-5k', title: 'Sh5,000 Saved', desc: 'A solid grocery run at Naivas. Real money.', icon: Wallet, color: 'text-green-700', bg: 'bg-green-100' },
  { id: 'referral-1', title: 'Squad Starter', desc: 'Invited your first colleague to the grind.', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function MilestonesPage() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) setProfile(docSnap.data());
    });
    return () => unsubscribe();
  }, [user]);

  if (!profile) return null;

  const isAchieved = (id: string) => {
    if (id.startsWith('streak-')) {
      const days = parseInt(id.split('-')[1]);
      return (profile.bestStreak || 0) >= days;
    }
    if (id.startsWith('savings-')) {
      const amount = parseInt(id.split('-')[1].replace('k', '000'));
      return (profile.totalSavings || 0) >= amount;
    }
    if (id === 'referral-1') {
      return false; // Need to track referral count
    }
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary-dark">Milestone Wall</h1>
        <p className="text-text-secondary">A visual record of every streak achieved — your personal trophy shelf.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MILESTONES.map((m, i) => {
          const achieved = isAchieved(m.id);
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`card-shadow border-border-soft h-full transition-all duration-500 ${achieved ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                <CardContent className="p-6 flex gap-4">
                  <div className={`w-12 h-12 ${m.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <m.icon className={`w-6 h-6 ${m.color}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-primary-dark">{m.title}</h3>
                      {achieved && <CheckCircle2 className="w-4 h-4 text-success" />}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{m.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-primary/5 p-8 rounded-[32px] text-center space-y-4">
        <h3 className="text-xl font-bold text-primary-dark">Next Milestone</h3>
        <p className="text-text-secondary">Keep packing to unlock more trophies!</p>
      </div>
    </div>
  );
}

import { Trophy } from 'lucide-react';
