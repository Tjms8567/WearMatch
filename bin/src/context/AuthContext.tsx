'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const adminEmails = useMemo(() => {
    const env = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
    return env.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('wearmatch_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== 'undefined') {
      if (u) localStorage.setItem('wearmatch_user', JSON.stringify(u));
      else localStorage.removeItem('wearmatch_user');
    }
  };

  const login = (email: string) => {
    const normalized = email.trim().toLowerCase();
    const role: UserRole = adminEmails.includes(normalized) ? 'admin' : 'user';
    persist({ email: normalized, role });
    if (role === 'admin') {
      localStorage.setItem('wearmatch_admin_ok', '1');
    }
  };

  const logout = () => {
    persist(null);
    localStorage.removeItem('wearmatch_admin_ok');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAdmin: !!user && user.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
