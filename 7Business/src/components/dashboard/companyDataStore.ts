import { useEffect, useState } from 'react';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Inativo';
}

export interface ServiceItem {
  id: string;
  name: string;
  duration: number;
  price: number;
  status: 'Ativo' | 'Inativo';
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'Ativo' | 'Inativo';
}

export interface EmployeeItem {
  id: string;
  name: string;
  role: string;
  services: string[];
  status: 'Ativo' | 'Inativo';
}

export interface CompanyData {
  clients: Client[];
  services: ServiceItem[];
  products: ProductItem[];
  employees: EmployeeItem[];
}

const STORAGE_KEY = 'companyDataStore';

const defaultCompanyData: CompanyData = {
  clients: [
    {
      id: 'c1',
      name: 'Maria Santos',
      email: 'maria@cliente.com',
      phone: '+55 11 99876-1234',
      status: 'Ativo',
    },
    {
      id: 'c2',
      name: 'Carlos Oliveira',
      email: 'carlos@cliente.com',
      phone: '+55 21 98765-4321',
      status: 'Ativo',
    },
  ],
  services: [
    { id: 's1', name: 'Corte', duration: 45, price: 80, status: 'Ativo' },
    { id: 's2', name: 'Coloracao', duration: 90, price: 150, status: 'Ativo' },
    { id: 's3', name: 'Revisao', duration: 60, price: 120, status: 'Ativo' },
    { id: 's4', name: 'Troca de oleo', duration: 40, price: 90, status: 'Ativo' },
  ],
  products: [
    { id: 'p1', name: 'Shampoo Premium', sku: 'SH-100', price: 45, stock: 12, status: 'Ativo' },
    { id: 'p2', name: 'Oleo Motor Sintetico', sku: 'OM-200', price: 85, stock: 6, status: 'Ativo' },
  ],
  employees: [
    {
      id: 'e1',
      name: 'Mariana Souza',
      role: 'Cabeleireira',
      services: ['Corte', 'Coloracao'],
      status: 'Ativo',
    },
    {
      id: 'e2',
      name: 'Carlos Almeida',
      role: 'Mecanico',
      services: ['Revisao', 'Troca de oleo'],
      status: 'Ativo',
    },
  ],
};

const loadCompanyData = (): CompanyData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultCompanyData;
  }

  try {
    const parsed = JSON.parse(stored) as CompanyData;
    return {
      clients: parsed.clients?.length ? parsed.clients : defaultCompanyData.clients,
      services: parsed.services?.length ? parsed.services : defaultCompanyData.services,
      products: parsed.products?.length ? parsed.products : defaultCompanyData.products,
      employees: parsed.employees?.length ? parsed.employees : defaultCompanyData.employees,
    };
  } catch {
    return defaultCompanyData;
  }
};

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState<CompanyData>(() => loadCompanyData());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companyData));
  }, [companyData]);

  return { companyData, setCompanyData };
};
