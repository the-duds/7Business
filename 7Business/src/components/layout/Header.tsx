import React from 'react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onAuthClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">7</span>
              </div>
              <span className="text-xl font-bold text-gray-900">7Business</span>
            </div>
          </div>

          {/* Right side - Auth Button */}
          <div>
            <Button
              onClick={onAuthClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Entrar / Cadastro
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
