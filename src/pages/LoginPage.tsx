import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { Chrome } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '../Layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 space-y-2">
          <Logo className="w-12 h-12 text-2xl mx-auto" />
          <h1 className="text-3xl font-bold text-primary-dark">Grind & Dine</h1>
          <p className="text-text-secondary">Fuel the grind. Protect your gut.</p>
        </div>

        <Card className="card-shadow border-border-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Join thousands of Nairobi workers saving Sh400 a day.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-button bg-white hover:bg-gray-50 border-border-soft"
              onClick={handleGoogleSignIn}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-text-secondary">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-input h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 font-normal text-xs">Forgot password?</Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-input h-11"
                />
              </div>
              <Button className="w-full h-12 rounded-button text-lg">
                Sign In
              </Button>
            </div>

            <div className="text-center text-sm text-text-secondary">
              No account yet? <Button variant="link" className="p-0 h-auto font-bold text-primary">Sign up free</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
