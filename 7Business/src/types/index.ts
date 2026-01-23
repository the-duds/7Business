/**
 * 7Business - Core Type Definitions
 * Interfaces and types for the main entities of the 7Business platform
 */

/**
 * Categories supported by 7Business
 */
export enum CompanyCategory {
  BEAUTY = 'beauty',
  MECHANICS = 'mechanics',
  HEALTH = 'health',
  OTHER = 'other'
}

/**
 * Status of an appointment
 */
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

/**
 * Custom field types for flexibility
 */
export enum CustomFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  DATE = 'date',
  TEXTAREA = 'textarea'
}

/**
 * Custom field definition
 * Allows companies to extend entities with custom fields
 */
export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
  options?: string[]; // For SELECT type
  placeholder?: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

/**
 * Custom field value pair
 * Stores actual custom field values
 */
export interface CustomFieldValue {
  fieldId: string;
  value: string | number | boolean | Date | null;
}

/**
 * Address information
 * Reusable address structure
 */
export interface Address {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Business contact information
 */
export interface BusinessContact {
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
}

/**
 * Company entity
 * Represents a business using 7Business platform
 */
export interface Company {
  id: string;
  name: string;
  category: CompanyCategory;
  description?: string;
  logo?: string;
  address: Address;
  contact: BusinessContact;
  timezone: string;
  operatingHours: OperatingHours;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  
  // Customization
  customFields: CustomField[];
  customMetadata?: Record<string, unknown>;
  
  // Category-specific settings
  categorySettings: CategorySettings;
}

/**
 * Category-specific settings
 * Allows different configurations based on company type
 */
export interface CategorySettings {
  // Beauty-specific
  maxConcurrentAppointments?: number;
  requiresDepositPercentage?: number;
  
  // Mechanics-specific
  allowServiceKits?: boolean;
  trackPartsInventory?: boolean;
  
  // Health-specific
  requiresMedicalLicense?: boolean;
  enablePrescriptions?: boolean;
  
  // Generic
  [key: string]: unknown;
}

/**
 * Operating hours for a company or provider
 */
export interface OperatingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

/**
 * Time slot for operating hours
 */
export interface TimeSlot {
  isOpen: boolean;
  start?: string; // HH:mm format
  end?: string;   // HH:mm format
  breakStart?: string;
  breakEnd?: string;
}

/**
 * Service offered by a company
 * Linked to a company and provided by providers
 */
export interface Service {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  category?: string;
  
  // Pricing and duration
  duration: number; // in minutes
  price: number; // in currency units
  currency: string; // ISO 4217 code (e.g., 'BRL', 'USD')
  
  // Optional fields
  color?: string; // For calendar display
  icon?: string;
  isActive: boolean;
  
  // Media
  image?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Customization per service
  customFields: CustomField[];
  customFieldValues: CustomFieldValue[];
  
  // Category-specific fields
  categorySpecific?: {
    // Beauty
    productsUsed?: string[];
    skillLevel?: 'beginner' | 'intermediate' | 'advanced';
    
    // Mechanics
    partsRequired?: string[];
    estimatedLabor?: number;
    
    // Health
    requiresConsultation?: boolean;
    diagnosticType?: string;
    
    [key: string]: unknown;
  };
}

/**
 * Provider (staff member)
 * Can offer multiple services
 */
export interface Provider {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Professional information
  specialties: string[]; // Service IDs they can provide
  bio?: string;
  photo?: string;
  
  // Employment info
  role: 'staff' | 'manager' | 'owner' | 'admin';
  isActive: boolean;
  hireDate: Date;
  
  // Availability
  operatingHours: OperatingHours;
  dayOff?: string[]; // Dates when unavailable
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Customization
  customFieldValues: CustomFieldValue[];
  
  // Category-specific
  categorySpecific?: {
    // Health
    licenseNumber?: string;
    licenseExpiry?: Date;
    
    // Beauty
    certification?: string;
    
    [key: string]: unknown;
  };
}

/**
 * Customer entity
 * Represents a client/customer booking appointments
 */
export interface Customer {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  
  // Contact
  address?: Address;
  
  // Relationship
  firstVisitDate: Date;
  totalAppointments: number;
  lastAppointmentDate?: Date;
  
  // Preferences
  preferredProviderIds?: string[];
  preferredTimeSlots?: string[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  
  // Customization
  customFieldValues: CustomFieldValue[];
  notes?: string;
  
  // Loyalty/History
  tags?: string[];
}

/**
 * Appointment entity
 * Represents a booking linking Customer, Service, and Provider
 */
export interface Appointment {
  id: string;
  companyId: string;
  
  // Core relationships
  customerId: string;
  serviceId: string;
  providerId: string;
  
  // Schedule
  startTime: Date;
  endTime: Date;
  
  // Status and tracking
  status: AppointmentStatus;
  cancelledAt?: Date;
  cancelReason?: string;
  completedAt?: Date;
  
  // Customer communication
  reminderSentAt?: Date;
  confirmationSentAt?: Date;
  
  // Notes and customization
  notes?: string;
  internalNotes?: string;
  customFieldValues: CustomFieldValue[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID who created the appointment
  
  // Optional pricing override
  finalPrice?: number; // If different from service price
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'refunded';
  
  // Attachments (receipts, prescriptions, etc.)
  attachments?: Attachment[];
}

/**
 * Attachment for appointments
 * Supports documents, prescriptions, receipts, etc.
 */
export interface Attachment {
  id: string;
  name: string;
  type: string; // MIME type
  url: string;
  uploadedAt: Date;
  category: 'receipt' | 'prescription' | 'document' | 'other';
}

/**
 * Availability slot
 * Used for booking availability queries
 */
export interface AvailabilitySlot {
  providerId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

/**
 * Appointment request
 * Data structure for creating new appointments
 */
export interface CreateAppointmentRequest {
  companyId: string;
  customerId: string;
  serviceId: string;
  providerId: string;
  startTime: Date;
  notes?: string;
  customFieldValues?: CustomFieldValue[];
}

/**
 * Appointment update
 * Data structure for updating appointments
 */
export interface UpdateAppointmentRequest {
  startTime?: Date;
  status?: AppointmentStatus;
  notes?: string;
  internalNotes?: string;
  finalPrice?: number;
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'refunded';
  customFieldValues?: CustomFieldValue[];
}

/**
 * Analytics event
 * For tracking usage and insights
 */
export interface AnalyticsEvent {
  id: string;
  companyId: string;
  eventType: string;
  entityType: 'appointment' | 'customer' | 'service' | 'provider';
  entityId: string;
  data: Record<string, unknown>;
  createdAt: Date;
}

/**
 * Company settings
 * Configuration options per company
 */
export interface CompanySettings {
  id: string;
  companyId: string;
  
  // Notifications
  enableEmailReminders: boolean;
  enableSMSReminders: boolean;
  enableWhatsappReminders: boolean;
  reminderTimeBefore: number; // minutes before appointment
  
  // Booking rules
  minBookingAdvance: number; // minutes
  maxBookingAdvance: number; // days
  allowOnlineBooking: boolean;
  requireConfirmation: boolean;
  
  // Cancellation policy
  allowCustomerCancellation: boolean;
  cancellationDeadline: number; // hours before appointment
  cancellationFeePercentage?: number;
  
  // Customization
  theme?: 'light' | 'dark';
  primaryColor?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Error response for API
 */
export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
