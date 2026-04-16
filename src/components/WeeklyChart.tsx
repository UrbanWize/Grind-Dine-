import React from 'react';
import { format, subDays, isSameDay } from 'date-fns';

interface WeeklyChartProps {
  logs: any[];
}

export default function WeeklyChart({ logs }: WeeklyChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), 6 - i));

  return (
    <div className="space-y-4 bg-white/50 p-4 rounded-card border border-border-soft/50">
      <h3 className="text-lg font-bold text-primary-dark px-1">Your week so far</h3>
      <div className="grid grid-cols-7 gap-2 h-32 items-end">
        {last7Days.map((day, i) => {
          const dayLog = logs.find(l => l.date === format(day, 'yyyy-MM-dd'));
          const isToday = isSameDay(day, new Date());
          const isFuture = day > new Date() && !isToday;
          
          let height = 'h-4';
          let color = 'bg-gray-200';
          let label = '';

          if (dayLog) {
            if (dayLog.status === 'packed') {
              height = 'h-full';
              color = 'bg-success shadow-[0_0_12px_rgba(16,185,129,0.3)]';
              label = '+300';
            } else {
              height = 'h-1/3';
              color = 'bg-warning/60';
              label = 'Forgot';
            }
          } else if (isFuture) {
            height = 'h-2';
            color = 'bg-gray-100';
          } else if (isToday) {
            height = 'h-4';
            color = 'bg-primary/30 animate-pulse';
          }

          return (
            <div key={i} className="flex flex-col items-center gap-2 h-full">
              <div className="flex-1 w-full flex items-end">
                <div className={`w-full rounded-t-lg transition-all duration-700 ease-out ${height} ${color}`} />
              </div>
              <div className={`text-[10px] font-bold uppercase ${isToday ? 'text-primary' : 'text-text-secondary'}`}>
                {format(day, 'EEE')}
              </div>
            </div>
          );
        })}
      </div>
      {logs.length === 0 && (
        <p className="text-center text-xs text-text-secondary/70 italic">
          Your first week — start logging to see your progress! 🍱
        </p>
      )}
    </div>
  );
}
