import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';

interface LayoutProps {
  children?: React.ReactNode;
  onAuthClick?: () => void;
  onCtaClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onAuthClick, 
  onCtaClick 
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onAuthClick={onAuthClick} />

      {/* Hero Section */}
      <Hero onCtaClick={onCtaClick} />

      {/* Main Content */}
      {children && (
        <main className="w-full">
          {children}
        </main>
      )}

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white mt-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">7</span>
                </div>
                <span className="text-lg font-bold text-white">7Business</span>
              </div>
              <p className="text-gray-400 text-sm">Gestão inteligente de agendamentos</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Recursos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Preços</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Segurança</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Sobre</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Contato</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Termos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2026 7Business. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
