import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Dashboard from '@/features/dashboard';

export default function App() {
  return (
    <AuthProvider>
      <main className="app-root p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">7Business</h1>
        </header>
        <section>
          <Dashboard />
        </section>
      </main>
    </AuthProvider>
  );
}
