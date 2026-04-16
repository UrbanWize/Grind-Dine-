import React, { useEffect, useState } from 'react';
import { auth, db, doc, onSnapshot, collection, query, where } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, Copy, Share2, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ReferralsPage() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) setProfile(docSnap.data());
    });

    const q = query(collection(db, 'referrals'), where('referrerUserId', '==', user.uid));
    const unsubscribeReferrals = onSnapshot(q, (querySnapshot) => {
      setReferrals(querySnapshot.docs.map(doc => doc.data()));
    });

    return () => {
      unsubscribeProfile();
      unsubscribeReferrals();
    };
  }, [user]);

  const copyCode = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      toast.success("Referral code copied!");
    }
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Grind & Dine',
        text: `Join me on Grind & Dine and start saving Sh400 a day by packing lunch! Use my code: ${profile?.referralCode}`,
        url: window.location.origin,
      });
    } else {
      copyCode();
    }
  };

  if (!profile) return null;

  return (
    <div className="max-w-md mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary-dark">Invite the Squad</h1>
        <p className="text-text-secondary">Lunch is better (and cheaper) together. Invite a colleague and watch your savings grow.</p>
      </div>

      <Card className="card-shadow border-primary/20 bg-primary/5">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">Your Referral Code</p>
            <div className="text-4xl font-black tracking-tighter text-primary-dark select-all">
              {profile.referralCode}
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={copyCode} variant="outline" className="flex-1 h-12 rounded-button">
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
            <Button onClick={shareApp} className="flex-1 h-12 rounded-button">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary-dark px-1">Your Referrals</h3>
        {referrals.length === 0 ? (
          <Card className="card-shadow border-dashed border-border-soft">
            <CardContent className="p-8 text-center text-text-secondary italic">
              No referrals yet. Start sharing to earn badges!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {referrals.map((ref, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-card card-shadow border border-border-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary">New Colleague</p>
                    <p className="text-xs text-text-secondary">Joined via your link</p>
                  </div>
                </div>
                {ref.status === 'active' ? (
                  <Badge className="bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-text-secondary">
                    <Clock className="w-3 h-3 mr-1" /> Pending
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Badge } from '../components/ui/badge';
