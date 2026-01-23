import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Login } from '@/components/auth/Login';
import { DashboardRouter } from '@/components/dashboard/DashboardRouter';
import { authService, AuthUser } from '@/services/authService';

type AppView = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Restaurar sessão ao carregar a aplicação
  useEffect(() => {
    const savedUser = authService.restoreSession();
    if (savedUser) {
      setUser(savedUser);
      setCurrentView('dashboard');
    }
    setIsLoadingSession(false);
  }, []);

  const handleAuthClick = () => {
    setCurrentView('login');
  };

  const handleCtaClick = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    authService.saveSession(loggedInUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('landing');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleSignupClick = () => {
    // TODO: Implementar página de signup
    console.log('Signup clicked');
  };

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-white border-t-emerald-400 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-white text-lg font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      {currentView === 'landing' && (
        <Layout onAuthClick={handleAuthClick} onCtaClick={handleCtaClick} />
      )}

      {currentView === 'login' && (
        <div>
          <button
            onClick={handleBackToLanding}
            className="fixed top-4 left-4 z-50 px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg transition"
          >
            ← Voltar
          </button>
          <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} />
        </div>
      )}

      {currentView === 'dashboard' && user && (
        <DashboardRouter user={user} onLogout={handleLogout} />
      )}
    </AuthProvider>
  );
}
