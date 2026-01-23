/**
 * 7Business - Authentication Service
 * Mock authentication service with simulated user data
 */

import { Company, CompanyCategory } from '@/types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: Company;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (email: string, password: string, company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => Promise<AuthUser>;
  logout: () => void;
}

/**
 * Mock companies database
 */
const mockCompanies: Record<string, Company> = {
  'beauty_salon@7business.com': {
    id: 'company_001',
    name: 'Bella Salão de Beleza',
    category: CompanyCategory.BEAUTY,
    description: 'Salão premium de beleza e estética',
    logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bella',
    
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01311-100',
      country: 'Brazil',
    },
    
    contact: {
      email: 'beauty_salon@7business.com',
      phone: '+55 11 3000-0000',
      whatsapp: '+55 11 99000-0000',
    },
    
    timezone: 'America/Sao_Paulo',
    
    operatingHours: {
      monday: { isOpen: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      tuesday: { isOpen: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      wednesday: { isOpen: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      thursday: { isOpen: true, start: '09:00', end: '21:00' },
      friday: { isOpen: true, start: '09:00', end: '21:00' },
      saturday: { isOpen: true, start: '09:00', end: '19:00' },
      sunday: { isOpen: false },
    },
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    isActive: true,
    
    customFields: [],
    categorySettings: { maxConcurrentAppointments: 8 },
  },
  
  'auto_center@7business.com': {
    id: 'company_002',
    name: 'Auto Center Profissional',
    category: CompanyCategory.MECHANICS,
    description: 'Serviços completos de manutenção automotiva',
    
    address: {
      street: 'Rua das Indústrias',
      number: '500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '03250-000',
      country: 'Brazil',
    },
    
    contact: {
      email: 'auto_center@7business.com',
      phone: '+55 11 4000-0000',
    },
    
    timezone: 'America/Sao_Paulo',
    
    operatingHours: {
      monday: { isOpen: true, start: '08:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      tuesday: { isOpen: true, start: '08:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      wednesday: { isOpen: true, start: '08:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      thursday: { isOpen: true, start: '08:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      friday: { isOpen: true, start: '08:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
      saturday: { isOpen: true, start: '08:00', end: '14:00' },
      sunday: { isOpen: false },
    },
    
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
    isActive: true,
    
    customFields: [],
    categorySettings: { allowServiceKits: true, trackPartsInventory: true },
  },
  
  'clinic@7business.com': {
    id: 'company_003',
    name: 'Clínica Médica Plus',
    category: CompanyCategory.HEALTH,
    description: 'Clínica com consultório geral e especialidades',
    
    address: {
      street: 'Avenida Brasil',
      number: '2000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
      country: 'Brazil',
    },
    
    contact: {
      email: 'clinic@7business.com',
      phone: '+55 21 3000-0000',
    },
    
    timezone: 'America/Rio_Branco',
    
    operatingHours: {
      monday: { isOpen: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      tuesday: { isOpen: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      wednesday: { isOpen: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      thursday: { isOpen: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      friday: { isOpen: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      saturday: { isOpen: false },
      sunday: { isOpen: false },
    },
    
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true,
    
    customFields: [],
    categorySettings: { requiresMedicalLicense: true, enablePrescriptions: true },
  },
};

/**
 * Mock users database
 */
const mockUsers: Record<string, { password: string; name: string }> = {
  'beauty_salon@7business.com': { password: 'senha123', name: 'João Silva' },
  'auto_center@7business.com': { password: 'senha123', name: 'Carlos Santos' },
  'clinic@7business.com': { password: 'senha123', name: 'Dr. Ana Costa' },
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
        const company = mockCompanies[email];

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
    companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<AuthUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email]) {
          reject(new Error('Este email já está cadastrado'));
        } else {
          const newCompany: Company = {
            ...companyData,
            id: `company_${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          mockUsers[email] = { password, name: 'Novo Usuário' };
          mockCompanies[email] = newCompany;

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
