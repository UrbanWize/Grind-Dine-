import React from 'react';
import { Button } from './ui/button';
import { CheckSquare, XCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LogButtonsProps {
  onLog: (status: 'packed' | 'forgot') => void;
  loggedToday: boolean;
  todayStatus?: 'packed' | 'forgot';
}

export default function LogButtons({ onLog, loggedToday, todayStatus }: LogButtonsProps) {
  if (loggedToday) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full p-6 rounded-card card-shadow flex items-center justify-center gap-3 border-2 ${
          todayStatus === 'packed' ? 'bg-success/10 border-success text-success' : 'bg-warning/10 border-warning text-warning'
        }`}
      >
        <CheckCircle2 className="w-8 h-8" />
        <span className="text-xl font-bold">Logged for today ✓</span>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-4 w-full">
      <Button 
        onClick={() => onLog('packed')}
        className="h-20 w-full bg-success hover:bg-success/90 rounded-card text-xl font-bold flex items-center justify-center gap-3 shadow-lg"
      >
        <CheckSquare className="w-8 h-8" />
        I packed lunch ✅
      </Button>
      <Button 
        onClick={() => onLog('forgot')}
        variant="outline"
        className="h-16 w-full border-warning bg-warning/10 text-warning hover:bg-warning/20 rounded-card text-lg font-bold flex items-center justify-center gap-3"
      >
        <XCircle className="w-6 h-6" />
        I forgot ☹️
      </Button>
    </div>
  );
}
