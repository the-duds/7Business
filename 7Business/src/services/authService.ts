/**
 * 7Business - Authentication Service
 * Mock authentication service with simulated user data
 */

import { Company as SalesCompany } from '@/types/company';
import { mockCompanies as companiesArray } from '../mocks/company.mock';

// Cria um Record<string, Company> indexado por email
const companyEmailMap: Record<string, SalesCompany> = {
  'beauty_salon@7business.com': companiesArray.find(c => c.slug === 'oficina-do-joao')!,
  'auto_center@7business.com': companiesArray.find(c => c.slug === 'studio-beleza')!,
  'clinic@7business.com': companiesArray.find(c => c.slug === 'clinica-saude')!,
  'superadmin@7business.com': {
    id: 'superadmin',
    logoUrl: '/logos/superadmin.png',
    nomeFantasia: '7Business Plataforma',
    documento: '00.000.000/0001-00',
    slug: 'superadmin',
    telefone: '+55 11 00000-0000',
    niche: 'Consultoria',
    status: 'Ativo',
    config: {},
    workingHours: {
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      opening: '00:00',
      closing: '23:59',
    },
    createdAt: new Date('2026-02-12'),
    updatedAt: new Date('2026-02-12'),
  },
};

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: SalesCompany;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (email: string, password: string, company: Omit<SalesCompany, 'id' | 'createdAt' | 'updatedAt'>) => Promise<AuthUser>;
  logout: () => void;
}

/**
 * Mock users database
 */
const mockUsers: Record<string, { password: string; name: string }> = {
  'beauty_salon@7business.com': { password: 'senha123', name: 'João Silva' },
  'auto_center@7business.com': { password: 'senha123', name: 'Carlos Santos' },
  'clinic@7business.com': { password: 'senha123', name: 'Dr. Ana Costa' },
  'superadmin@7business.com': { password: '7business2026', name: 'Super Admin' },
};

/**
 * Mock authentication service
 */
export const authService = {
  /**
   * Login simulado
   * Credenciais de teste:
   * - Email: beauty_salon@7business.com | Senha: senha123
   * - Email: auto_center@7business.com | Senha: senha123
   * - Email: clinic@7business.com | Senha: senha123
   */
  login: async (email: string, password: string): Promise<AuthUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers[email];
        const company = companyEmailMap[email];

        if (user && user.password === password && company) {
          resolve({
            id: `user_${Date.now()}`,
            email,
            name: user.name,
            company,
          });
        } else {
          reject(new Error('Email ou senha inválidos'));
        }
      }, 800); // Simula latência de rede
    });
  },

  /**
   * Signup simulado
   */
  signup: async (
    email: string,
    password: string,
    companyData: Omit<SalesCompany, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<AuthUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email]) {
          reject(new Error('Este email já está cadastrado'));
        } else {
          const newCompany: SalesCompany = {
            ...companyData,
            id: `company_${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          mockUsers[email] = { password, name: 'Novo Usuário' };
          companyEmailMap[email] = newCompany;

          resolve({
            id: `user_${Date.now()}`,
            email,
            name: 'Novo Usuário',
            company: newCompany,
          });
        }
      }, 800);
    });
  },

  /**
   * Logout (apenas limpa dados locais)
   */
  logout: () => {
    localStorage.removeItem('authUser');
  },

  /**
   * Restaura sessão a partir do localStorage
   */
  restoreSession: (): AuthUser | null => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Salva sessão no localStorage
   */
  saveSession: (user: AuthUser) => {
    localStorage.setItem('authUser', JSON.stringify(user));
  },
};
