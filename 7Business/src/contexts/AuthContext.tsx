import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  signin: (u: User) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signin = (u: User) => {
    setUser(u);
    // persist token/session here
  };

  const signout = () => {
    setUser(null);
    // clear persistence
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
