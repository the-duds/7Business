/**
 * 7Business - Login Component
 * Elegant, centered, responsive login form with validation
 */

import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { validateLoginForm, LoginFormData } from '@/schemas/validation';

interface LoginComponentProps {
  onLoginSuccess: (user: any) => void;
  onSignupClick: () => void;
  variant?: 'company' | 'admin';
  showSignup?: boolean;
}

export const Login: React.FC<LoginComponentProps> = ({
  onLoginSuccess,
  onSignupClick,
  variant = 'company',
  showSignup = true,
}) => {
  const location = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const isAdmin = variant === 'admin';
  const tenantBranding = useMemo(() => {
    if (isAdmin) {
      return null;
    }

    const params = new URLSearchParams(location.search);
    const tenant = params.get('tenant');
    if (!tenant) {
      return null;
    }

    const stored = localStorage.getItem('tenantBranding');
    if (!stored) {
      return null;
    }

    try {
      const brandingMap = JSON.parse(stored) as Record<string, { name: string; logoUrl: string; primaryColor: string; secondaryColor: string }>;
      return brandingMap[tenant] || null;
    } catch {
      return null;
    }
  }, [isAdmin, location.search]);

  const headerTitle = isAdmin ? 'Painel Super Admin' : tenantBranding?.name || '7Business';
  const headerSubtitle = isAdmin
    ? 'Controle e operacao da plataforma'
    : 'Gestao inteligente de agendamentos';
  const footerText = isAdmin
    ? 'Acesso restrito. Credenciais administrativas.'
    : 'Demo: beauty_salon@7business.com / senha123';
  const headerGradientClass = isAdmin
    ? 'from-slate-900 via-slate-800 to-indigo-700'
    : 'from-blue-900 to-emerald-600';
  const accentClass = isAdmin ? 'text-indigo-600' : 'text-emerald-600';
  const focusClass = isAdmin ? 'focus:border-indigo-500' : 'focus:border-emerald-500';
  const buttonGradientClass = isAdmin
    ? 'from-slate-900 to-indigo-700 hover:from-slate-950 hover:to-indigo-800'
    : 'from-blue-900 to-emerald-600 hover:from-blue-950 hover:to-emerald-700';
  const backgroundClass = isAdmin ? 'from-slate-950 to-slate-900' : 'from-blue-900 to-blue-800';
  const blobPrimaryClass = isAdmin ? 'bg-indigo-500' : 'bg-emerald-500';
  const blobSecondaryClass = isAdmin ? 'bg-slate-500' : 'bg-blue-500';
  const headerStyle = tenantBranding
    ? { background: `linear-gradient(90deg, ${tenantBranding.secondaryColor}, ${tenantBranding.primaryColor})` }
    : undefined;
  const buttonStyle = tenantBranding
    ? { background: tenantBranding.primaryColor }
    : undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');

    const validation = validateLoginForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.login(formData.email, formData.password);

      if (formData.rememberMe) {
        authService.saveSession(user);
      }

      onLoginSuccess(user);
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} flex items-center justify-center p-4`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-96 h-96 ${blobPrimaryClass} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-8 left-20 w-96 h-96 ${blobSecondaryClass} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div
            className={`bg-gradient-to-r ${headerGradientClass} px-8 py-12 text-center`}
            style={headerStyle}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                {tenantBranding?.logoUrl ? (
                  <img
                    src={tenantBranding.logoUrl}
                    alt={headerTitle}
                    className="w-9 h-9 rounded object-contain"
                  />
                ) : (
                  <span
                    className={`text-2xl font-bold bg-gradient-to-r ${headerGradientClass} bg-clip-text text-transparent`}
                  >
                    7
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{headerTitle}</h1>
            <p className="text-blue-100">{headerSubtitle}</p>
          </div>

          <div className="px-8 py-8">
            {generalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-800 text-sm">{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600 bg-red-50'
                      : `border-gray-200 ${focusClass}`
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-12 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600 bg-red-50'
                        : `border-gray-200 ${focusClass}`
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M15.171 13.576l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414zm-3.586-2a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={`w-4 h-4 rounded border-gray-300 ${
                    isAdmin ? 'text-indigo-600 focus:ring-indigo-500' : 'text-emerald-600 focus:ring-emerald-500'
                  }`}
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me neste dispositivo
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${buttonGradientClass} disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:hover:scale-100`}
                style={buttonStyle}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </button>

              {showSignup && (
                <p className="text-center text-gray-600">
                  Não tem conta?{' '}
                  <button
                    type="button"
                    onClick={onSignupClick}
                    className={`${accentClass} hover:opacity-80 font-semibold`}
                  >
                    Cadastre-se aqui
                  </button>
                </p>
              )}
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">{footerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
