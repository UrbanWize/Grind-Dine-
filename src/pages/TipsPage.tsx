import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Lightbulb, Clock, Wallet, Heart, Car, Zap } from 'lucide-react';

const TIPS = [
  {
    id: '1',
    title: 'Beat the Monday Slip',
    content: 'Pack Sunday night, keys-on-lunchbox trick. Future you says thank you!',
    tags: ['Quick Prep', 'For Commuters'],
    category: 'A',
    icon: Zap
  },
  {
    id: '2',
    title: '30-Day Kenyan Lunch Rotation',
    content: 'Chapo beans, ugali managu, pilau, githeri, biryani, bento, etc. Variety is the spice of life!',
    tags: ['All'],
    category: 'B',
    icon: Lightbulb
  },
  {
    id: '3',
    title: 'No-Reheat & No-Cook Options',
    content: 'Peanut butter + carrots, sandwiches, overnight oats, boiled eggs. Perfect for offices without microwaves.',
    tags: ['No-cook', 'Quick Prep'],
    category: 'C',
    icon: Clock
  },
  {
    id: '4',
    title: 'For Early Lunchers (10am)',
    content: 'Fiber-rich options like oats or sweet potatoes, mid-morning snack strategies to keep you full.',
    tags: ['Tummy-friendly'],
    category: 'D',
    icon: Heart
  },
  {
    id: '5',
    title: 'Budget-Friendly Under 100 KES',
    content: 'Githeri, ugali sukuma, rice beans, boiled eggs chapati. Saving money never tasted so good.',
    tags: ['Under 100 KES'],
    category: 'E',
    icon: Wallet
  },
  {
    id: '6',
    title: 'For the Forgetful Commuter',
    content: 'Bright bag, pack night before, keys trick. Don’t let Nairobi traffic beat you!',
    tags: ['For Commuters'],
    category: 'F',
    icon: Car
  }
];

const TAGS = ['All', 'No-cook', 'Under 100 KES', 'Tummy-friendly', 'For Commuters', 'Quick Prep'];

export default function TipsPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filteredTips = activeTag === 'All' 
    ? TIPS 
    : TIPS.filter(tip => tip.tags.includes(activeTag));

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-dark">Tips Library</h1>
        <p className="text-text-secondary">Kenyan lunch ideas and hacks to keep your grind going.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        {TAGS.map(tag => (
          <Button
            key={tag}
            variant={activeTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 ${activeTag === tag ? 'bg-primary border-primary' : 'text-text-secondary border-border-soft'}`}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid gap-4">
        {filteredTips.map(tip => (
          <Card key={tip.id} className="card-shadow border-border-soft overflow-hidden">
            <CardContent className="p-6 flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <tip.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-primary-dark">{tip.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tip.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-text-primary leading-relaxed">{tip.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <p className="text-text-secondary italic">"You've got this. See you tomorrow. 🍱"</p>
      </div>
    </div>
  );
}
