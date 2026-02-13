import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Login } from '@/components/auth/Login';
import { DashboardRouter } from '@/components/dashboard/DashboardRouter';
import { LandingPage } from '@/components/landing/LandingPage';
import { BookingPage } from '@/pages/booking/BookingPage';
import { CompanyManagement } from '@/pages/CompanyManagement';
import { CompanyCreatePage } from '@/pages/CompanyCreatePage';
import { SuperAdminDashboard } from '@/pages/SuperAdminDashboard';
import { StaffSchedulePage } from '@/pages/StaffSchedulePage';
import { authService, AuthUser } from '@/services/authService';
import { Company } from '@/types/company';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Restaurar sessão ao carregar a aplicação
  useEffect(() => {
    const savedUser = authService.restoreSession();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoadingSession(false);
  }, []);

  useEffect(() => {
    if (!isLoadingSession && user && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
    if (!isLoadingSession && user && location.pathname === '/login-admin') {
      navigate('/super-admin', { replace: true });
    }
  }, [isLoadingSession, user, location.pathname, navigate]);

  const handleAuthClick = () => {
    navigate('/login');
  };

  const handleAdminLoginClick = () => {
    navigate('/login-admin');
  };

  const handleCtaClick = () => {
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handleLoginSuccess = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    authService.saveSession(loggedInUser);
    navigate('/dashboard');
  };

  const handleAdminLoginSuccess = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    authService.saveSession(loggedInUser);
    navigate('/super-admin');
  };

  const handleAccessCompany = (company: Company) => {
    const companyUser: AuthUser = {
      id: `imp_${company.id}`,
      email: `${company.slug}@7business.com`,
      name: company.nomeFantasia,
      company,
    };
    setUser(companyUser);
    authService.saveSession(companyUser);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleBackToLanding = () => {
    navigate('/');
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
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginClick={handleAuthClick}
              onAdminLoginClick={handleAdminLoginClick}
              onStartClick={handleCtaClick}
              onBookingClick={handleBookingClick}
            />
          }
        />
        <Route
          path="/booking"
          element={
            <div>
              <button
                onClick={handleBackToLanding}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg transition"
              >
                ← Voltar
              </button>
              <BookingPage />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <button
                onClick={handleBackToLanding}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg transition"
              >
                ← Voltar
              </button>
              <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} />
            </div>
          }
        />
        <Route
          path="/login-admin"
          element={
            <div>
              <button
                onClick={handleBackToLanding}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg transition"
              >
                ← Voltar
              </button>
              <Login
                onLoginSuccess={handleAdminLoginSuccess}
                onSignupClick={handleSignupClick}
                variant="admin"
                showSignup={false}
              />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? <DashboardRouter user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/companies"
          element={user ? <CompanyManagement /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/companies/new"
          element={user ? <CompanyCreatePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/super-admin"
          element={
            user ? (
              <SuperAdminDashboard onAccessCompany={handleAccessCompany} />
            ) : (
              <Navigate to="/login-admin" replace />
            )
          }
        />
        <Route
          path="/staff/:employeeId"
          element={user ? <StaffSchedulePage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
