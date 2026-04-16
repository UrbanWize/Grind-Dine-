import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, setDoc, serverTimestamp } from '../firebase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    profession: '',
    workplaceVibe: '',
    mode: '',
    tummyConditions: [] as string[],
    habits: {
      commute: false,
      boredom: false,
      earlyLunch: false,
      newbie: false,
    },
    reminderTime: '20:00',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = async () => {
    if (!user) return;

    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    await setDoc(doc(db, 'users', user.uid), {
      userId: user.uid,
      email: user.email,
      name: formData.name,
      profession: formData.profession,
      workplaceVibe: formData.workplaceVibe,
      mode: formData.mode,
      tummyConditions: formData.tummyConditions,
      commuterStress: formData.habits.commute,
      mealFatigue: formData.habits.boredom,
      earlyLunch: formData.habits.earlyLunch,
      brownBagExperience: formData.habits.newbie ? 'Newbie' : 'Experienced',
      reminderTime: formData.reminderTime,
      streak: 0,
      bestStreak: 0,
      totalSavings: 0,
      onboardingCompleted: true,
      referralCode,
      joinedDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      seenMilestones: [],
    });

    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-dark">Hey {formData.name || 'there'}! Let's get you set up. 👋</h2>
              <p className="text-text-secondary">A few quick questions so we can make Grind & Dine feel like it was built just for you.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-input"
              />
            </div>
            <Button onClick={nextStep} className="w-full h-12 rounded-button">
              Let's go <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark">What's your work situation?</h2>
            <div className="grid gap-3">
              {['Corporate employee', 'Freelancer', 'Remote worker', 'Other'].map(opt => (
                <Button 
                  key={opt} 
                  variant={formData.profession === opt ? 'default' : 'outline'}
                  className="h-14 justify-start px-6 rounded-button text-lg"
                  onClick={() => { setFormData({...formData, profession: opt}); nextStep(); }}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <Button variant="ghost" onClick={nextStep} className="w-full">Skip</Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark">What's the lunch vibe at your office?</h2>
            <div className="grid gap-3">
              {[
                { label: 'Family vibe — everyone shares 🍲', value: 'Family vibe' },
                { label: 'Individual — everyone eats their own 🍱', value: 'Individual' }
              ].map(opt => (
                <Button 
                  key={opt.value} 
                  variant={formData.workplaceVibe === opt.value ? 'default' : 'outline'}
                  className="h-14 justify-start px-6 rounded-button text-lg"
                  onClick={() => { setFormData({...formData, workplaceVibe: opt.value}); nextStep(); }}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            <Button variant="ghost" onClick={nextStep} className="w-full">Skip</Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark">Do you want to do this alone or with colleagues?</h2>
            <div className="grid gap-3">
              {[
                { label: 'Solo grinder 🦾', value: 'Solo grinder' },
                { label: 'Squad goals (invite later) 🤝', value: 'Squad goals' }
              ].map(opt => (
                <Button 
                  key={opt.value} 
                  variant={formData.mode === opt.value ? 'default' : 'outline'}
                  className="h-14 justify-start px-6 rounded-button text-lg"
                  onClick={() => { setFormData({...formData, mode: opt.value}); nextStep(); }}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            <Button variant="ghost" onClick={nextStep} className="w-full">Skip</Button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-dark">Any tummy issues we should know about?</h2>
              <p className="text-text-secondary">We'll personalise your tips based on this.</p>
            </div>
            <div className="grid gap-3">
              {['Acid reflux', 'Ulcers', 'Sensitive stomach', "I'm good 😊"].map(opt => (
                <div key={opt} className="flex items-center space-x-3 p-4 border rounded-card card-shadow bg-white">
                  <Checkbox 
                    id={opt} 
                    checked={formData.tummyConditions.includes(opt)}
                    onCheckedChange={(checked) => {
                      if (checked) setFormData({...formData, tummyConditions: [...formData.tummyConditions, opt]});
                      else setFormData({...formData, tummyConditions: formData.tummyConditions.filter(c => c !== opt)});
                    }}
                  />
                  <Label htmlFor={opt} className="text-lg cursor-pointer flex-1">{opt}</Label>
                </div>
              ))}
            </div>
            <Button onClick={nextStep} className="w-full h-12 rounded-button">Continue</Button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark">Quick ones — tick what applies to you:</h2>
            <div className="space-y-4">
              {[
                { id: 'commute', label: 'I commute in heavy morning traffic' },
                { id: 'boredom', label: 'I get bored eating the same lunch' },
                { id: 'earlyLunch', label: 'I sometimes eat before 12pm to save money' },
                { id: 'newbie', label: "I've never carried a lunch bag to work before" },
              ].map(item => (
                <div key={item.id} className="flex items-start space-x-3 p-4 border rounded-card card-shadow bg-white">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.habits[item.id as keyof typeof formData.habits]}
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      habits: { ...formData.habits, [item.id]: !!checked }
                    })}
                  />
                  <Label htmlFor={item.id} className="text-lg cursor-pointer leading-tight">{item.label}</Label>
                </div>
              ))}
            </div>
            <Button onClick={nextStep} className="w-full h-12 rounded-button">Continue</Button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-dark">When should we remind you to pack lunch?</h2>
              <p className="text-text-secondary">Evening works best — you're home, relaxed, and your lunch box is right there.</p>
            </div>
            <div className="flex justify-center py-8">
              <Input 
                type="time" 
                value={formData.reminderTime}
                onChange={e => setFormData({...formData, reminderTime: e.target.value})}
                className="w-48 h-16 text-3xl text-center rounded-input border-primary font-bold"
              />
            </div>
            <Button onClick={nextStep} className="w-full h-12 rounded-button">Set Reminder</Button>
            <Button variant="ghost" onClick={nextStep} className="w-full">Skip</Button>
          </div>
        );
      case 8:
        return (
          <div className="space-y-8 text-center py-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <CheckCircle2 className="w-24 h-24 text-success mx-auto" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-primary-dark">You're all set, {formData.name}! 🚀</h2>
              <p className="text-lg text-text-secondary">Your first packed lunch is going to feel amazing. Let's track it.</p>
            </div>
            <Button onClick={handleComplete} className="w-full h-14 rounded-button text-lg">
              Go to my dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 min-h-[70vh] flex flex-col">
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm font-medium text-text-secondary">
          <span>Step {Math.min(step, totalSteps)} of {totalSteps}</span>
          <span>{Math.round((Math.min(step, totalSteps) / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(Math.min(step, totalSteps) / totalSteps) * 100} className="h-2 bg-primary-light/30" />
      </div>

      <Card className="flex-1 card-shadow border-border-soft overflow-hidden relative">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      
      {step > 1 && step <= totalSteps && (
        <Button variant="link" onClick={prevStep} className="mt-4 text-text-secondary">
          Back
        </Button>
      )}
    </div>
  );
}
