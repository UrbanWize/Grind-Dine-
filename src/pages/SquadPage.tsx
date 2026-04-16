import React, { useEffect, useState } from 'react';
import { auth, db, collection, query, orderBy, limit, onSnapshot } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Trophy, Flame, TrendingUp, User } from 'lucide-react';

export default function SquadPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('streak', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLeaderboard(querySnapshot.docs.map(doc => doc.data()));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary-dark">Squad Leaderboard</h1>
        <p className="text-text-secondary">See who's leading the pack in Nairobi. Friendly competition keeps the gut healthy!</p>
      </div>

      <Card className="card-shadow border-border-soft overflow-hidden">
        <CardContent className="p-0">
          {leaderboard.map((user, i) => (
            <div key={user.userId} className={`flex items-center justify-between p-4 border-b border-border-soft last:border-0 ${i === 0 ? 'bg-primary/5' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-8 font-bold text-text-secondary">#{i + 1}</div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-text-primary">{user.name || 'Anonymous'}</p>
                  <p className="text-xs text-text-secondary">{user.profession || 'Packer'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                    <Flame className="w-4 h-4 fill-orange-500" />
                    {user.streak || 0}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Streak</div>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="text-primary font-bold">Sh{user.totalSavings?.toLocaleString() || 0}</div>
                  <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Saved</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="bg-white p-6 rounded-card card-shadow border border-border-soft text-center space-y-2">
        <TrendingUp className="w-8 h-8 text-primary mx-auto" />
        <h3 className="font-bold text-primary-dark">Keep it up!</h3>
        <p className="text-sm text-text-secondary">Every packed lunch moves you up the ranks. Nairobi is watching!</p>
      </div>
    </div>
  );
}
