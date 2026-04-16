import React from 'react';
import { Card, CardContent } from './ui/card';
import { Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface StreakCardProps {
  currentStreak: number;
  bestStreak: number;
}

export default function StreakCard({ currentStreak, bestStreak }: StreakCardProps) {
  if (currentStreak === 0) {
    return (
      <Card className="card-shadow border-border-soft overflow-hidden bg-orange-50/30">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
            <Flame className="w-10 h-10 text-orange-200" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-primary-dark leading-tight">
              Your first streak starts with one tap ☝️
            </h3>
            <p className="text-sm text-text-secondary">
              Pack today to ignite your flame!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow border-border-soft overflow-hidden">
      <CardContent className="p-6 flex items-center gap-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
          <Flame className={`w-10 h-10 ${currentStreak > 0 ? 'text-orange-500 fill-orange-500' : 'text-orange-200'}`} />
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <motion.span 
              key={currentStreak}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-primary-dark"
            >
              {currentStreak}
            </motion.span>
            <span className="text-text-secondary font-medium">day streak</span>
          </div>
          <p className="text-sm text-text-secondary">
            Best record: <span className="font-bold text-primary-dark">{bestStreak} days</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
