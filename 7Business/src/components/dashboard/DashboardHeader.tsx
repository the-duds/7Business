import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { DashboardUser } from './types';

interface DashboardHeaderProps {
  title: string;
  user: DashboardUser;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  user,
  onSearchChange,
  searchQuery,
  branding,
}) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const accentStyle = branding ? { color: branding.primaryColor } : undefined;
  const ringStyle = branding ? { boxShadow: `0 0 0 2px ${branding.primaryColor}` } : undefined;

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-white border-b border-slate-200 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Title and Search */}
        <div className="flex items-center gap-8 flex-1">
          {branding && (
            <div className="hidden md:flex items-center gap-3">
              {branding.logoUrl ? (
                <img src={branding.logoUrl} alt={branding.name} className="w-8 h-8 rounded object-contain" />
              ) : (
                <div className="w-8 h-8 rounded bg-slate-200" />
              )}
              <span className="text-sm font-semibold text-slate-700">{branding.name}</span>
            </div>
          )}
          <h2 className="text-2xl font-bold text-slate-900 hidden md:block">
            {title}
          </h2>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                style={branding ? ringStyle : undefined}
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
            style={branding ? ringStyle : undefined}
          >
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={branding ? ringStyle : undefined}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ background: branding?.primaryColor || '#6366f1' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">
                  {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                </p>
              </div>
                <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
                  style={accentStyle}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>

                <a
                  href="#perfil"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Meu Perfil
                </a>
                <a
                  href="#configuracoes"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Configurações
                </a>
                <a
                  href="#ajuda"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Ajuda
                </a>

                <div className="border-t border-slate-200 mt-2 pt-2">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
