import React from 'react';
import { Card, CardContent } from './ui/card';
import { Lightbulb, AlertCircle } from 'lucide-react';

interface TipsBannerProps {
  type: 'tummy' | 'variety' | 'missed';
  message: string;
}

export default function TipsBanner({ type, message }: TipsBannerProps) {
  const config = {
    tummy: { icon: AlertCircle, color: 'bg-orange-50 border-orange-200 text-orange-800' },
    variety: { icon: Lightbulb, color: 'bg-primary/5 border-primary/20 text-primary-dark' },
    missed: { icon: AlertCircle, color: 'bg-blue-50 border-blue-200 text-blue-800' },
  };

  const { icon: Icon, color } = config[type];

  return (
    <Card className={`card-shadow border ${color}`}>
      <CardContent className="p-4 flex gap-3 items-start">
        <Icon className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">{message}</p>
      </CardContent>
    </Card>
  );
}
