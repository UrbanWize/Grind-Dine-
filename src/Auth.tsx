import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebase'; // we'll create this next

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Detect if mobile (popups often blocked)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Redirect after success (handled by onAuthStateChanged)
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
        // After redirect, the page reloads and we handle result separately
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle redirect result (for mobile)
  getRedirectResult(auth).catch((err) => {
    console.error('Redirect sign-in error:', err);
    setError(err.message);
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleEmailAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
      <button onClick={handleGoogleSignIn} style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
        Continue with Google
      </button>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
          }
