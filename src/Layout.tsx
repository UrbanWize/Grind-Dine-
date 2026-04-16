import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, signOut } from './firebase';
import { LogOut, Home, Lightbulb, Users, Award, ShoppingBag, User } from 'lucide-react';
import { Button } from './components/ui/button';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-primary rounded-xl flex items-center justify-center text-white font-bold relative shadow-lg overflow-hidden`}>
      {/* Graph line inside G counter-form */}
      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full opacity-20" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M4 18 L10 12 L14 15 L20 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="relative z-10">G</span>
      {/* Amber flame dot at the peak */}
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-warning rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/tips', label: 'Tips', icon: Lightbulb },
    { path: '/referrals', label: 'Referrals', icon: Users },
    { path: '/milestones', label: 'Milestones', icon: Award },
    { path: '/starter-kit', label: 'Starter Kit', icon: ShoppingBag },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isPublicPage = ['/', '/login', '/starter-kit'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl tracking-tight text-primary-dark">Grind & Dine</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-text-secondary">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              !isPublicPage && (
                <Link to="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border-soft px-4 h-16 flex items-center justify-around z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-text-secondary'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
