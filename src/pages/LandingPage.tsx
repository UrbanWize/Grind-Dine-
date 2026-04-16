import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { ShoppingBag, CheckCircle2, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight">
            Stop Forgetting Lunch. <br />
            <span className="text-primary">Start Saving KSh 10,000 a Month.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            87% of workers skip lunch at least once a month. Don't be one of them. Fuel the grind. Protect your gut.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={handleGoogleSignIn} className="h-14 px-8 text-lg rounded-button">
            Continue with Google → Start Free
          </Button>
          <Link to="/starter-kit">
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-button">
              <ShoppingBag className="w-5 h-5 mr-2" />
              See lunch box recommendations
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary-dark">Why Grind & Dine?</h2>
          <div className="space-y-4">
            {[
              { text: "'Kibanda iko mbali.' — Distance is a pain.", icon: CheckCircle2 },
              { text: "'Serious stomach aches from unhygienic cooking.' — Hygiene fear.", icon: Heart },
              { text: "'I don't like eating the same meal twice.' — Variety needed.", icon: CheckCircle2 },
              { text: "'Restaurant meals are greasy and low quality.' — Health concern.", icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-card card-shadow border border-border-soft">
                <item.icon className="w-6 h-6 text-primary shrink-0" />
                <p className="text-text-primary font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square rounded-card overflow-hidden card-shadow">
          <img 
            src="https://picsum.photos/seed/lunchbox/800/800" 
            alt="Healthy lunch box" 
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"></div>
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center space-y-12">
        <h2 className="text-3xl font-bold text-primary-dark">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Reminders", desc: "We remind you the night before — so your lunch box is ready." },
            { step: "02", title: "Log Daily", desc: "Log whether you packed or forgot. Takes 2 seconds." },
            { step: "03", title: "Track Growth", desc: "Watch your streak grow and your savings stack up." },
            { step: "04", title: "Get Tips", desc: "Browse 30+ Kenyan lunch ideas and local starter kit picks." },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-card card-shadow border border-border-soft text-left space-y-3">
              <span className="text-4xl font-bold text-primary/20">{item.step}</span>
              <h3 className="text-xl font-bold text-primary-dark">{item.title}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-light/30 p-8 md:p-12 rounded-[32px] space-y-8">
        <h2 className="text-3xl font-bold text-primary-dark text-center">Real User Voices</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-card card-shadow italic text-text-primary">
            "Kibanda iko mbali, na nimepata stomach aches. Grind & Dine helps me pack my own safe food."
            <span className="block mt-4 text-sm font-bold not-italic text-text-secondary">— Reddit user</span>
          </div>
          <div className="bg-white p-6 rounded-card card-shadow italic text-text-primary">
            "I save Sh400 a day. My colleagues used to joke, but now they ask for tips."
            <span className="block mt-4 text-sm font-bold not-italic text-text-secondary">— Nairobi professional</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-soft pt-12 pb-8 text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-text-secondary font-medium">
          <span>Proudly built for the Kenyan Grind.</span>
          <span className="text-primary font-bold">KE</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          <Link to="/tips" className="hover:text-primary transition-colors">Tips Library</Link>
          <Link to="/starter-kit" className="hover:text-primary transition-colors">Starter Kit</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
