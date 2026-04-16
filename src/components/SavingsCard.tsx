import React from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface SavingsCardProps {
  monthlySavings: number;
  lifetimeSavings: number;
}

export default function SavingsCard({ monthlySavings, lifetimeSavings }: SavingsCardProps) {
  const muturaPrice = 20;
  const muturaSticks = Math.floor(monthlySavings / muturaPrice);

  return (
    <Card className="card-shadow border-border-soft bg-primary/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Savings</span>
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-4xl font-bold text-primary-dark">KSh {monthlySavings.toLocaleString()}</h3>
          <p className="text-sm text-text-secondary font-medium">saved this month</p>
        </div>

        <div className="pt-4 border-t border-primary/10">
          {monthlySavings > 0 ? (
            <p className="text-sm text-text-primary">
              That's <span className="font-bold text-primary">{muturaSticks} mutura sticks</span> worth of savings! 🍢
            </p>
          ) : (
            <p className="text-sm text-text-primary italic">
              Pack your first lunch to start saving. Sh300 a day adds up fast.
            </p>
          )}
          <p className="text-xs text-text-secondary mt-1">
            Lifetime total: KSh {lifetimeSavings.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
