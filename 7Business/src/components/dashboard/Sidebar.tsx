import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Package,
  UserCog,
  DollarSign,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { NavMenuItem } from './types';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange,
  onLogout,
  isOpen,
  onToggle,
  branding,
}) => {
  const navItems: NavMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '#',
      isActive: currentSection === 'dashboard',
    },
    {
      id: 'agenda',
      label: 'Agenda',
      icon: Calendar,
      href: '#',
      isActive: currentSection === 'agenda',
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: Users,
      href: '#',
      isActive: currentSection === 'clientes',
    },
    {
      id: 'servicos',
      label: 'Servicos',
      icon: Briefcase,
      href: '#',
      isActive: currentSection === 'servicos',
    },
    {
      id: 'produtos',
      label: 'Produtos',
      icon: Package,
      href: '#',
      isActive: currentSection === 'produtos',
    },
    {
      id: 'funcionarios',
      label: 'Funcionarios',
      icon: UserCog,
      href: '#',
      isActive: currentSection === 'funcionarios',
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: DollarSign,
      href: '#',
      isActive: currentSection === 'financeiro',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed md:hidden top-4 left-4 z-40 p-2 text-white rounded-lg transition-colors"
        style={{ background: branding?.primaryColor || '#4f46e5' }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col`}
        style={branding ? { background: branding.secondaryColor } : undefined}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: branding?.primaryColor || '#4f46e5' }}
          >
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-white font-bold text-lg">7</span>
            )}
          </div>
          <div>
            <h1 className="font-bold text-lg">{branding?.name || '7Business'}</h1>
            <p className="text-xs text-slate-400">Gestao Inteligente</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.isActive;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onToggle(); // Fecha menu mobile
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900'
                }`}
                style={
                  isActive
                    ? { background: branding?.primaryColor || '#4f46e5' }
                    : undefined
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            style={branding ? { background: 'rgba(255,255,255,0.04)' } : undefined}
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};
