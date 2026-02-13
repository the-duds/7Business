/**
 * 7Business - Dashboard Router
 * Componente principal que integra o novo dashboard moderno
 */

import React from 'react';
import { AuthUser } from '@/services/authService';
import { Dashboard } from './Dashboard';
import { DashboardUser } from './types';

interface DashboardRouterProps {
  user: AuthUser;
  onLogout: () => void;
}

/**
 * DashboardRouter - Componente que converte AuthUser para DashboardUser
 * e renderiza o novo Dashboard moderno
 */
export const DashboardRouter: React.FC<DashboardRouterProps> = ({
  user,
  onLogout,
}) => {
  const branding = (() => {
    const stored = localStorage.getItem('tenantBranding');
    if (!stored) {
      return null;
    }

    try {
      const brandingMap = JSON.parse(stored) as Record<
        string,
        { name: string; logoUrl: string; primaryColor: string; secondaryColor: string }
      >;
      return brandingMap[user.company.slug] || null;
    } catch {
      return null;
    }
  })();
  // Converter AuthUser para DashboardUser
  const dashboardUser: DashboardUser = {
    id: user.id || '1',
    name: user.name || user.email?.split('@')[0] || 'Usuário',
    email: user.email || 'user@example.com',
    role: 'admin', // Pode ser ajustado baseado em user.role se existir
  };

  return <Dashboard user={dashboardUser} onLogout={onLogout} branding={branding} />;
};
