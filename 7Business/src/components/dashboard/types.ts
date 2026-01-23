/**
 * Types e Interfaces para Dashboard
 * Arquitetura orientada a objetos tipagem forte
 */

export interface NavMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive: boolean;
}

export type AppointmentStatus = 'confirmado' | 'pendente' | 'cancelado';

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  date: string;
  status: AppointmentStatus;
  duration: number; // em minutos
}

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  icon: React.ElementType;
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'usuario';
}

export interface DashboardContextType {
  currentSection: 'dashboard' | 'agenda' | 'clientes' | 'financeiro' | 'configuracoes';
  user: DashboardUser;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentSection: (section: DashboardContextType['currentSection']) => void;
}
