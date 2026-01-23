/**
 * Types e Interfaces para Página de Agendamento
 * Arquitetura escalável e tipagem forte
 */

export type BookingStep = 'service' | 'datetime' | 'confirmation' | 'success';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  icon?: string;
  color: 'pink' | 'blue' | 'purple' | 'green';
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookings?: number;
}

export interface DayAvailability {
  date: string;
  dayOfWeek: string;
  available: boolean;
  slots: TimeSlot[];
}

export interface BookingState {
  currentStep: BookingStep;
  selectedService: Service | null;
  selectedDate: string | null;
  selectedTime: string | null;
  clientData: {
    name: string;
    email: string;
    phone: string;
  };
  isSubmitting: boolean;
  error: string | null;
}

export interface BookingAction {
  type:
    | 'SET_STEP'
    | 'SELECT_SERVICE'
    | 'SELECT_DATE'
    | 'SELECT_TIME'
    | 'UPDATE_CLIENT_DATA'
    | 'SET_ERROR'
    | 'RESET'
    | 'SET_SUBMITTING';
  payload?: any;
}

export interface CompanyData {
  id: string;
  name: string;
  slug: string;
  description: string;
  services: Service[];
  availability: DayAvailability[];
  phone?: string;
  email?: string;
  website?: string;
}
