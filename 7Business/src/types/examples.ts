/**
 * 7Business - Type Usage Examples and Documentation
 * Examples of how to use the core interfaces and types
 */

import {
  Company,
  Service,
  Appointment,
  Customer,
  Provider,
  CompanyCategory,
  AppointmentStatus,
  CustomFieldType,
  CreateAppointmentRequest,
} from './index';

/**
 * Example 1: Creating a Beauty Salon Company
 */
export function createBeautySalon(): Company {
  return {
    id: 'company_001',
    name: 'Bella Salão de Beleza',
    category: CompanyCategory.BEAUTY,
    description: 'Salão de beleza premium com serviços de cabelo, manicure e spa',
    logo: 'https://example.com/logo.png',
    
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 501',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01311-100',
      country: 'Brazil',
      latitude: -23.5615,
      longitude: -46.6560,
    },
    
    contact: {
      email: 'contato@bellasalon.com.br',
      phone: '+55 11 3000-0000',
      whatsapp: '+55 11 99000-0000',
      website: 'https://bellasalon.com.br',
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
    
    customFields: [
      {
        id: 'cf_hair_type',
        name: 'hairType',
        label: 'Tipo de Cabelo',
        type: CustomFieldType.SELECT,
        required: false,
        options: ['Liso', 'Ondulado', 'Cacheado', 'Crespo'],
      },
      {
        id: 'cf_allergies',
        name: 'allergies',
        label: 'Alergias a Produtos',
        type: CustomFieldType.TEXTAREA,
        required: false,
        placeholder: 'Descreva alergias conhecidas...',
      },
    ],
    
    categorySettings: {
      maxConcurrentAppointments: 8,
      requiresDepositPercentage: 20,
    },
  };
}

/**
 * Example 2: Creating a Beauty Service
 */
export function createBeautyService(companyId: string): Service {
  return {
    id: 'service_001',
    companyId,
    name: 'Corte + Escova',
    description: 'Corte de cabelo com escova finalista',
    category: 'Hair',
    
    duration: 60, // minutes
    price: 150.00,
    currency: 'BRL',
    
    color: '#FF69B4',
    isActive: true,
    
    createdAt: new Date(),
    updatedAt: new Date(),
    
    customFields: [
      {
        id: 'cf_hair_treatment',
        name: 'hairTreatment',
        label: 'Tratamento de Cabelo',
        type: CustomFieldType.BOOLEAN,
        required: false,
      },
    ],
    
    customFieldValues: [],
    
    categorySpecific: {
      productsUsed: ['Shampoo Premium', 'Condicionador', 'Leave-in'],
      skillLevel: 'advanced',
    },
  };
}

/**
 * Example 3: Creating a Mechanic Shop Company
 */
export function createMechanicShop(): Company {
  return {
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
      email: 'contato@autocentro.com.br',
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
    
    customFields: [
      {
        id: 'cf_vehicle_brand',
        name: 'vehicleBrand',
        label: 'Marca do Veículo',
        type: CustomFieldType.TEXT,
        required: true,
      },
      {
        id: 'cf_license_plate',
        name: 'licensePlate',
        label: 'Placa do Veículo',
        type: CustomFieldType.TEXT,
        required: false,
        maxLength: 8,
      },
    ],
    
    categorySettings: {
      allowServiceKits: true,
      trackPartsInventory: true,
    },
  };
}

/**
 * Example 4: Creating a Health Clinic Company
 */
export function createHealthClinic(): Company {
  return {
    id: 'company_003',
    name: 'Clínica Médica Plus',
    category: CompanyCategory.HEALTH,
    description: 'Clínica com consultório geral, cardiologia e pediatria',
    
    address: {
      street: 'Avenida Brasil',
      number: '2000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
      country: 'Brazil',
    },
    
    contact: {
      email: 'contato@clinicaplus.com.br',
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
    
    customFields: [
      {
        id: 'cf_date_of_birth',
        name: 'dateOfBirth',
        label: 'Data de Nascimento',
        type: CustomFieldType.DATE,
        required: true,
      },
      {
        id: 'cf_health_conditions',
        name: 'healthConditions',
        label: 'Condições de Saúde Preexistentes',
        type: CustomFieldType.TEXTAREA,
        required: false,
      },
    ],
    
    categorySettings: {
      requiresMedicalLicense: true,
      enablePrescriptions: true,
    },
  };
}

/**
 * Example 5: Creating a Customer
 */
export function createCustomer(companyId: string): Customer {
  return {
    id: 'customer_001',
    companyId,
    firstName: 'Maria',
    lastName: 'Silva',
    email: 'maria@email.com',
    phone: '+55 11 98000-0000',
    whatsapp: '+55 11 98000-0000',
    
    address: {
      street: 'Rua das Flores',
      number: '100',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brazil',
    },
    
    firstVisitDate: new Date('2024-01-20'),
    totalAppointments: 5,
    lastAppointmentDate: new Date('2026-01-15'),
    
    preferredProviderIds: ['provider_001'],
    preferredTimeSlots: ['morning', 'afternoon'],
    
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(),
    isActive: true,
    
    customFieldValues: [
      {
        fieldId: 'cf_hair_type',
        value: 'Liso',
      },
    ],
    
    notes: 'Cliente VIP - desconto de 10%',
    tags: ['vip', 'frequent', 'referral'],
  };
}

/**
 * Example 6: Creating a Provider (Staff Member)
 */
export function createProvider(companyId: string): Provider {
  return {
    id: 'provider_001',
    companyId,
    firstName: 'Ana',
    lastName: 'Costa',
    email: 'ana@bellasalon.com.br',
    phone: '+55 11 99000-0000',
    
    specialties: ['service_001', 'service_002'], // Service IDs
    bio: 'Especialista em corte e escova com 10 anos de experiência',
    photo: 'https://example.com/ana.jpg',
    
    role: 'staff',
    isActive: true,
    hireDate: new Date('2022-06-01'),
    
    operatingHours: {
      monday: { isOpen: true, start: '09:00', end: '18:00' },
      tuesday: { isOpen: true, start: '09:00', end: '18:00' },
      wednesday: { isOpen: true, start: '09:00', end: '18:00' },
      thursday: { isOpen: true, start: '09:00', end: '21:00' },
      friday: { isOpen: true, start: '09:00', end: '21:00' },
      saturday: { isOpen: true, start: '09:00', end: '19:00' },
      sunday: { isOpen: false },
    },
    
    dayOff: ['2026-02-10', '2026-12-25'],
    
    createdAt: new Date('2022-06-01'),
    updatedAt: new Date(),
    
    customFieldValues: [],
  };
}

/**
 * Example 7: Creating an Appointment
 */
export function createAppointment(
  companyId: string,
  customerId: string,
  serviceId: string,
  providerId: string
): Appointment {
  const startTime = new Date('2026-02-01T14:00:00');
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 60 minutes

  return {
    id: 'appointment_001',
    companyId,
    
    customerId,
    serviceId,
    providerId,
    
    startTime,
    endTime,
    
    status: AppointmentStatus.CONFIRMED,
    
    reminderSentAt: new Date(),
    confirmationSentAt: new Date(),
    
    notes: 'Cliente prefere escova mais leve',
    internalNotes: 'Aplicar promoção VIP - 10% desconto',
    
    customFieldValues: [
      {
        fieldId: 'cf_hair_treatment',
        value: true,
      },
    ],
    
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user_001',
    
    finalPrice: 135.00, // 10% discount applied
    paymentStatus: 'paid',
    
    attachments: [],
  };
}

/**
 * Example 8: Creating an Appointment Request
 */
export function createAppointmentRequest(
  companyId: string,
  customerId: string,
  serviceId: string,
  providerId: string
): CreateAppointmentRequest {
  return {
    companyId,
    customerId,
    serviceId,
    providerId,
    startTime: new Date('2026-02-05T15:00:00'),
    notes: 'Primeira vez neste serviço',
    customFieldValues: [
      {
        fieldId: 'cf_hair_treatment',
        value: false,
      },
    ],
  };
}

/**
 * Example 9: Extensibility - Adding Custom Fields Dynamically
 */
export function addCustomFieldsToService(service: Service): Service {
  return {
    ...service,
    customFields: [
      ...service.customFields,
      {
        id: 'cf_fragrance_preference',
        name: 'fragrancePreference',
        label: 'Aroma Preferido',
        type: CustomFieldType.SELECT,
        required: false,
        options: ['Florido', 'Cítrico', 'Amadeirado', 'Neutro'],
      },
      {
        id: 'cf_scalp_sensitivity',
        name: 'scalpSensitivity',
        label: 'Sensibilidade do Couro Cabeludo',
        type: CustomFieldType.SELECT,
        required: false,
        options: ['Baixa', 'Média', 'Alta'],
      },
    ],
  };
}

/**
 * Example 10: Type-safe access pattern
 */
export function getCustomFieldValue(
  customFieldValues: any[],
  fieldId: string
): string | number | boolean | Date | null | undefined {
  const fieldValue = customFieldValues.find((cv) => cv.fieldId === fieldId);
  return fieldValue?.value;
}
