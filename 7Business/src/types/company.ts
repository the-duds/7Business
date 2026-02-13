export type BusinessNiche = 
  | 'Beleza'
  | 'Automotivo'
  | 'Saúde'
  | 'Consultoria';

export interface WorkingHours {
  days: string[]; // e.g. ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
  opening: string; // '08:00'
  closing: string; // '18:00'
}

export interface CompanyConfig {
  exigirPlacaVeiculo?: boolean;
  exigirAnamnese?: boolean;
}

export interface Company {
  id: string;
  logoUrl: string;
  nomeFantasia: string;
  documento: string;
  slug: string;
  telefone: string;
  niche: BusinessNiche;
  status: 'Ativo' | 'Pausado';
  config: CompanyConfig;
  workingHours: WorkingHours;
  createdAt: Date;
  updatedAt: Date;
}
