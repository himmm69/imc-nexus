import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

// Firebase integration point:
// import { auth } from '@/lib/firebase';
// import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (method: 'google' | 'email') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'imc-study-hub-user';

// Mock user for demo
const mockUser: User = {
  id: 'user-1',
  name: 'Alex Student',
  email: 'alex.student@edu.fh-krems.ac.at',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);

    // Firebase integration:
    // const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    //   if (firebaseUser) {
    //     setUser({ id: firebaseUser.uid, name: firebaseUser.displayName, ... });
    //   } else {
    //     setUser(null);
    //   }
    //   setIsLoading(false);
    // });
    // return () => unsubscribe();
  }, []);

  const login = (method: 'google' | 'email') => {
    // Mock login - in real app, use Firebase auth
    console.log(`Login with ${method}`);
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));

    // Firebase integration:
    // if (method === 'google') {
    //   signInWithPopup(auth, new GoogleAuthProvider());
    // }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);

    // Firebase integration:
    // signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
