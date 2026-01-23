import React from 'react';
import { Menu, X } from 'lucide-react';

interface LandingPageProps {
  onLoginClick?: () => void;
  onStartClick?: () => void;
  onBookingClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginClick = () => {},
  onStartClick = () => {},
  onBookingClick = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-white">
      {/* Header Fixo com Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">7</span>
            </div>
            <span className="font-bold text-xl text-slate-900">7Business</span>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
              Recursos
            </a>
            <a href="#categorias" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
              Para Quem
            </a>
            <a href="#preco" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
              Preços
            </a>
            <a href="#contato" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
              Contato
            </a>
          </div>

          {/* Botões */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={onStartClick}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Começar Agora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              <a href="#recursos" className="block text-slate-700 hover:text-indigo-600 font-medium">
                Recursos
              </a>
              <a href="#categorias" className="block text-slate-700 hover:text-indigo-600 font-medium">
                Para Quem
              </a>
              <a href="#preco" className="block text-slate-700 hover:text-indigo-600 font-medium">
                Preços
              </a>
              <a href="#contato" className="block text-slate-700 hover:text-indigo-600 font-medium">
                Contato
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={onLoginClick}
                  className="w-full px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onStartClick}
                  className="w-full px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Começar Agora
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            Gestão inteligente de
            <span className="block text-indigo-600">para qualquer negócio</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Personalizado para salões, oficinas e clínicas
          </p>

          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Automatize seus agendamentos, melhore a experiência do cliente e aumente sua produtividade com nossa plataforma SaaS moderna e intuitiva.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartClick}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Comece Agora
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('recursos');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold text-lg rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Saber Mais
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Recursos Principais</h2>
            <p className="text-xl text-slate-600">Tudo que você precisa para gerenciar seu negócio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Agendamentos Rápidos</h3>
              <p className="text-slate-600">
                Integre com seu calendário e sincronize automaticamente seus agendamentos
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Notificações Automáticas</h3>
              <p className="text-slate-600">
                Mantenha seus clientes sempre informados com notificações automáticas
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Relatórios Detalhados</h3>
              <p className="text-slate-600">
                Acompanhe seu desempenho em tempo real com relatórios e análises detalhadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Para Qualquer Negócio</h2>
            <p className="text-xl text-slate-600">Solução versátil para diversos ramos de atividade</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Category 1: Salão de Beleza */}
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-3">Salão de Beleza</h3>
              <p className="text-slate-600 text-center mb-4">
                Gerencie agendamentos de cortes, coloração, design de sobrancelhas e mais com facilidade
              </p>
              <button
                onClick={onBookingClick}
                className="w-full px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold rounded-lg transition-colors text-sm"
              >
                Agendar agora
              </button>
            </div>

            {/* Category 2: Oficina */}
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-3">Oficina</h3>
              <p className="text-slate-600 text-center">
                Organize cronogramas de manutenção, reparos e serviços automotivos com precisão
              </p>
            </div>

            {/* Category 3: Psicólogos */}
            <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-3">Psicólogos & Terapeutas</h3>
              <p className="text-slate-600 text-center">
                Gerenciar consultórios com privacidade, segurança e conformidade com regulamentações
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para começar?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Junte-se a centenas de negócios que já estão crescendo com 7Business
          </p>
          <button
            onClick={onStartClick}
            className="px-8 py-4 bg-white text-indigo-600 font-semibold text-lg rounded-lg hover:bg-indigo-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Comece Sua Avaliação Gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">7</span>
                </div>
                <span className="font-bold text-white">7Business</span>
              </div>
              <p className="text-sm">Gestão inteligente para qualquer negócio</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#recursos" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#preco" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#seguranca" className="hover:text-white transition-colors">Segurança</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 7Business. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
