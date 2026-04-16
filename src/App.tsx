import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, onSnapshot, doc, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Layout from './Layout';
import ErrorBoundary from './ErrorBoundary';
import { Toaster } from 'sonner';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TipsPage from './pages/TipsPage';
import ReferralsPage from './pages/ReferralsPage';
import SquadPage from './pages/SquadPage';
import StarterKitPage from './pages/StarterKitPage';
import MilestonesPage from './pages/MilestonesPage';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        setOnboardingCompleted(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setOnboardingCompleted(docSnap.data().onboardingCompleted);
      } else {
        setOnboardingCompleted(false);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching profile:", error);
      setLoading(false);
    });

    return () => unsubscribeProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/starter-kit" element={<StarterKitPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/onboarding" 
              element={user ? <OnboardingPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  onboardingCompleted === false ? <Navigate to="/onboarding" /> : <DashboardPage />
                ) : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={user ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tips" 
              element={user ? <TipsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/referrals" 
              element={user ? <ReferralsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/squad" 
              element={user ? <SquadPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/milestones" 
              element={user ? <MilestonesPage /> : <Navigate to="/login" />} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <Toaster position="top-center" richColors />
      </Router>
    </ErrorBoundary>
  );
}