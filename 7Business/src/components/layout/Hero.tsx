import React from 'react';
import { Button } from '../ui/Button';

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Gestão inteligente de{' '}
          <span className="bg-gradient-to-r from-blue-900 to-emerald-600 bg-clip-text text-transparent">
            agendamentos
          </span>{' '}
          para qualquer negócio
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 mb-4">
          Personalizado para salões, oficinas e clínicas
        </p>
        
        <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          Automatize seus agendamentos, melhore a experiência do cliente e aumente sua produtividade com nossa plataforma SaaS moderna e intuitiva.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onCtaClick}
            className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Comece Agora
          </Button>
          <Button
            onClick={onCtaClick}
            className="bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Saber Mais
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Agendamentos Rápidos</h3>
            <p className="text-gray-600 text-sm">Integre com seu calendário e sincronize automaticamente</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Notificações Automáticas</h3>
            <p className="text-gray-600 text-sm">Mantenha seus clientes sempre informados</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Relatórios Detalhados</h3>
            <p className="text-gray-600 text-sm">Acompanhe seu desempenho em tempo real</p>
          </div>
        </div>
      </div>
    </section>
  );
};
