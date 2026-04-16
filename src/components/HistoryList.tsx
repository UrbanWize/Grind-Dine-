import React from 'react';
import { format, parseISO } from 'date-fns';
import { Edit2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';

interface HistoryListProps {
  logs: any[];
}

export default function HistoryList({ logs }: HistoryListProps) {
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);

  if (logs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-primary-dark px-1">Recent History</h3>
      <div className="space-y-2">
        {sortedLogs.map((log) => (
          <div key={log.logId} className="flex items-center justify-between p-4 bg-white rounded-card card-shadow border border-border-soft">
            <div className="flex items-center gap-3">
              {log.status === 'packed' ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-warning" />
              )}
              <div>
                <p className="font-bold text-sm text-text-primary">
                  {format(parseISO(log.date), 'EEEE, MMM do')}
                </p>
                <p className="text-xs text-text-secondary">
                  {log.status === 'packed' ? 'Packed +Sh300 saved' : 'Forgot to pack'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
