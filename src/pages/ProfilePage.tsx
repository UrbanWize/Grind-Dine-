import React, { useEffect, useState } from 'react';
import { auth, db, doc, onSnapshot, updateDoc } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Bell, Shield, LogOut, Calendar } from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';
import { toast } from 'sonner';

export default function ProfilePage() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setReminderTime(data.reminderTime || '20:00');
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdateReminder = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), { reminderTime });
      toast.success("Reminder time updated!");
    } catch (error) {
      toast.error("Failed to update reminder.");
    }
  };

  if (!profile) return null;

  const daysMember = differenceInDays(new Date(), parseISO(profile.joinedDate));

  return (
    <div className="max-w-md mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={profile.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User className="w-12 h-12 text-primary" />
          )}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-primary-dark">{profile.name}</h1>
          <p className="text-text-secondary">{profile.email}</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-sm font-bold text-primary">
          <Calendar className="w-4 h-4" />
          {daysMember === 0 ? "Just joined — let's go! 🎒" : `Member for ${daysMember} days`}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Settings */}
        <Card className="card-shadow border-border-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reminder">Daily Pack Reminder</Label>
              <div className="flex gap-2">
                <Input 
                  id="reminder" 
                  type="time" 
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                  className="rounded-input h-11"
                />
                <Button onClick={handleUpdateReminder}>Save</Button>
              </div>
              <p className="text-xs text-text-secondary">We'll nudge you at this time to pack for tomorrow.</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="card-shadow border-border-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border-soft">
              <span className="text-text-secondary">Profession</span>
              <span className="font-bold">{profile.profession || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-soft">
              <span className="text-text-secondary">Workplace Vibe</span>
              <span className="font-bold">{profile.workplaceVibe || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-soft">
              <span className="text-text-secondary">Mode</span>
              <span className="font-bold">{profile.mode || 'Not set'}</span>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full h-12 rounded-button text-warning border-warning hover:bg-warning/5" onClick={() => auth.signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
