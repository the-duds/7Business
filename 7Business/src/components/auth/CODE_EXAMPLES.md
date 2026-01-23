/**
 * EXEMPLOS DE CÓDIGO - Sistema de Login e Dashboard
 * ================================================
 */

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 1: Como usar authService                           │
// └─────────────────────────────────────────────────────────────┘

import { authService } from '@/services/authService';

// Fazer login
const handleLogin = async () => {
  try {
    const user = await authService.login('beauty_salon@7business.com', 'senha123');
    console.log('Usuário logado:', user);
    // user.company.name → "Bella Salão de Beleza"
    // user.company.category → "beauty"
  } catch (error) {
    console.error('Erro no login:', error.message);
  }
};

// Salvar sessão (após login bem-sucedido)
const saveUserSession = (user: AuthUser) => {
  authService.saveSession(user);
  // Agora o user.id, email e company estão salvos em localStorage
};

// Restaurar sessão (ao carregar o app)
const restoredUser = authService.restoreSession();
if (restoredUser) {
  console.log('Usuário restaurado:', restoredUser.name);
}

// Logout
authService.logout();
// localStorage.authUser é removido

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 2: Validação de formulário                         │
// └─────────────────────────────────────────────────────────────┘

import { validateLoginForm, validateEmail, validatePassword } from '@/schemas/validation';

// Validar email específico
const emailCheck = validateEmail('usuario@example.com');
if (emailCheck.valid) {
  console.log('Email válido');
} else {
  console.log('Erro:', emailCheck.error); // "Email inválido"
}

// Validar senha específica
const passwordCheck = validatePassword('abc123');
if (passwordCheck.valid) {
  console.log('Senha válida');
} else {
  console.log('Erro:', passwordCheck.error); // "Senha deve ter..."
}

// Validar formulário completo
const formData = {
  email: 'user@example.com',
  password: 'senha123',
  rememberMe: true,
};

const validation = validateLoginForm(formData);
if (validation.valid) {
  console.log('Formulário válido - fazer login');
} else {
  console.log('Erros:', validation.errors);
  // { email: 'Email inválido', password: 'Muito curta' }
}

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 3: Componente Login com validação                  │
// └─────────────────────────────────────────────────────────────┘

import React, { useState } from 'react';
import { Login } from '@/components/auth/Login';

export function MyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (user: any) => {
    console.log('Login bem-sucedido para:', user.email);
    setIsLoggedIn(true);
  };

  const handleSignupClick = () => {
    console.log('Usuário clicou em Cadastro');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onSignupClick={handleSignupClick}
        />
      ) : (
        <p>Bem-vindo ao sistema!</p>
      )}
    </div>
  );
}

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 4: Usando DashboardRouter                          │
// └─────────────────────────────────────────────────────────────┘

import { DashboardRouter } from '@/components/dashboard/DashboardRouter';

export function MainApp() {
  const user = {
    id: 'user_123',
    email: 'beauty_salon@7business.com',
    name: 'João',
    company: {
      // ... dados da empresa
      category: 'beauty',
      name: 'Bella Salão',
    },
  };

  const handleLogout = () => {
    console.log('Usuário saiu');
  };

  return (
    <DashboardRouter user={user} onLogout={handleLogout} />
    // Seleciona automaticamente BeautyDashboard porque category = 'beauty'
  );
}

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 5: App principal com roteamento                    │
// └─────────────────────────────────────────────────────────────┘

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Login } from '@/components/auth/Login';
import { DashboardRouter } from '@/components/dashboard/DashboardRouter';
import { authService, AuthUser } from '@/services/authService';

type View = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);

  // Restaurar sessão ao carregar
  useEffect(() => {
    const saved = authService.restoreSession();
    if (saved) {
      setUser(saved);
      setView('dashboard');
    }
  }, []);

  const handleLogin = (loggedUser: AuthUser) => {
    setUser(loggedUser);
    authService.saveSession(loggedUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setView('landing');
  };

  return (
    <div>
      {view === 'landing' && (
        <Layout 
          onAuthClick={() => setView('login')}
          onCtaClick={() => setView('login')}
        />
      )}

      {view === 'login' && (
        <Login 
          onLoginSuccess={handleLogin}
          onSignupClick={() => console.log('Signup')}
        />
      )}

      {view === 'dashboard' && user && (
        <DashboardRouter user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 6: Estender para uma nova categoria               │
// └─────────────────────────────────────────────────────────────┘

// Em DashboardRouter.tsx, adicione:

import { CompanyCategory } from '@/types';

export const VeterinaryDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.company.name}</h1>
            <p className="text-gray-600 text-sm">🐾 Clínica Veterinária</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seu conteúdo específico de clínica veterinária */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Atendimentos - Animais</h2>
        {/* ... */}
      </main>
    </div>
  );
};

// Depois, no switch de DashboardRouter:
export const DashboardRouter: React.FC<DashboardProps> = ({ user, onLogout }) => {
  switch (user.company.category) {
    case CompanyCategory.BEAUTY:
      return <BeautyDashboard user={user} onLogout={onLogout} />;
    case CompanyCategory.MECHANICS:
      return <MechanicsDashboard user={user} onLogout={onLogout} />;
    case CompanyCategory.HEALTH:
      return <HealthDashboard user={user} onLogout={onLogout} />;
    case CompanyCategory.OTHER:
      // Seu novo dashboard de veterinária
      return <VeterinaryDashboard user={user} onLogout={onLogout} />;
    default:
      return <BeautyDashboard user={user} onLogout={onLogout} />;
  }
};

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 7: Usar types do projeto                          │
// └─────────────────────────────────────────────────────────────┘

import { Company, Service, Appointment, Customer, CompanyCategory } from '@/types';

// Criar uma empresa de beleza
const beautyCompany: Company = {
  id: 'comp_001',
  name: 'Meu Salão',
  category: CompanyCategory.BEAUTY,
  description: 'Salão de beleza premium',
  address: {
    street: 'Rua A',
    number: '100',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
    country: 'Brazil',
  },
  contact: {
    email: 'contato@meusalao.com.br',
    phone: '+55 11 3000-0000',
  },
  timezone: 'America/Sao_Paulo',
  operatingHours: {
    monday: { isOpen: true, start: '09:00', end: '18:00' },
    tuesday: { isOpen: true, start: '09:00', end: '18:00' },
    wednesday: { isOpen: true, start: '09:00', end: '18:00' },
    thursday: { isOpen: true, start: '09:00', end: '21:00' },
    friday: { isOpen: true, start: '09:00', end: '21:00' },
    saturday: { isOpen: true, start: '09:00', end: '19:00' },
    sunday: { isOpen: false },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  customFields: [],
  categorySettings: { maxConcurrentAppointments: 8 },
};

// Criar um serviço
const service: Service = {
  id: 'svc_001',
  companyId: beautyCompany.id,
  name: 'Corte + Escova',
  duration: 60,
  price: 150.00,
  currency: 'BRL',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  customFields: [],
  customFieldValues: [],
};

// Criar um cliente
const customer: Customer = {
  id: 'cust_001',
  companyId: beautyCompany.id,
  firstName: 'Maria',
  lastName: 'Silva',
  phone: '+55 11 98000-0000',
  firstVisitDate: new Date(),
  totalAppointments: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  customFieldValues: [],
};

// ┌─────────────────────────────────────────────────────────────┐
// │ EXEMPLO 8: Testes no console do navegador                 │
// └─────────────────────────────────────────────────────────────┘

/*
// Verificar usuário logado
const user = JSON.parse(localStorage.getItem('authUser') || 'null');
console.log('Usuário:', user);

// Listar todas as keys do localStorage
console.log('localStorage:', Object.keys(localStorage));

// Simular logout
localStorage.removeItem('authUser');
location.reload();

// Verificar empresa do usuário
const user = JSON.parse(localStorage.getItem('authUser') || 'null');
console.log('Empresa:', user?.company?.name);
console.log('Categoria:', user?.company?.category);

// Listar stats do dashboard
const appointments = [
  { id: 1, time: '09:00', customer: 'Maria Silva' },
  { id: 2, time: '10:00', customer: 'Ana Costa' },
];
console.log('Agendamentos:', appointments.length);
console.log('Faturamento:', appointments.length * 150);
*/

export default {};
