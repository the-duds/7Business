/**
 * 7Business - Type Utilities and Helpers
 * Helper functions and utility types for working with core entities
 */

import {
  Company,
  Service,
  Appointment,
  Customer,
  Provider,
  CustomFieldValue,
  CompanyCategory,
  AppointmentStatus,
  CustomField,
} from './index';

/**
 * Type guard for checking if a company is in a specific category
 */
export function isBeautySalon(company: Company): boolean {
  return company.category === CompanyCategory.BEAUTY;
}

export function isMechanicShop(company: Company): boolean {
  return company.category === CompanyCategory.MECHANICS;
}

export function isHealthClinic(company: Company): boolean {
  return company.category === CompanyCategory.HEALTH;
}

/**
 * Type guard for appointment status
 */
export function isAppointmentActive(appointment: Appointment): boolean {
  return appointment.status === AppointmentStatus.PENDING ||
         appointment.status === AppointmentStatus.CONFIRMED;
}

export function isAppointmentCompleted(appointment: Appointment): boolean {
  return appointment.status === AppointmentStatus.COMPLETED;
}

export function isAppointmentCancelled(appointment: Appointment): boolean {
  return appointment.status === AppointmentStatus.CANCELLED ||
         appointment.status === AppointmentStatus.NO_SHOW;
}

/**
 * Get custom field value by field ID from an array of custom field values
 */
export function getCustomFieldValue(
  customFieldValues: CustomFieldValue[],
  fieldId: string
): CustomFieldValue | undefined {
  return customFieldValues.find((cfv) => cfv.fieldId === fieldId);
}

/**
 * Set or update a custom field value
 */
export function setCustomFieldValue(
  customFieldValues: CustomFieldValue[],
  fieldId: string,
  value: string | number | boolean | Date | null
): CustomFieldValue[] {
  const existing = customFieldValues.findIndex((cfv) => cfv.fieldId === fieldId);
  
  if (existing >= 0) {
    // Update existing
    return [
      ...customFieldValues.slice(0, existing),
      { fieldId, value },
      ...customFieldValues.slice(existing + 1),
    ];
  } else {
    // Add new
    return [...customFieldValues, { fieldId, value }];
  }
}

/**
 * Filter custom fields by type
 */
export function getCustomFieldsByType(
  customFields: CustomField[],
  type: string
): CustomField[] {
  return customFields.filter((cf) => cf.type === type);
}

/**
 * Get required custom fields
 */
export function getRequiredCustomFields(customFields: CustomField[]): CustomField[] {
  return customFields.filter((cf) => cf.required);
}

/**
 * Validate custom field value against field definition
 */
export function validateCustomFieldValue(
  field: CustomField,
  value: unknown
): { valid: boolean; error?: string } {
  // Check required
  if (field.required && (value === null || value === undefined || value === '')) {
    return { valid: false, error: `${field.label} is required` };
  }

  if (value === null || value === undefined) {
    return { valid: true };
  }

  // Type validation
  switch (field.type) {
    case 'text':
    case 'textarea':
      if (typeof value !== 'string') {
        return { valid: false, error: `${field.label} must be text` };
      }
      if (field.maxLength && value.length > field.maxLength) {
        return { valid: false, error: `${field.label} exceeds max length of ${field.maxLength}` };
      }
      return { valid: true };

    case 'number':
      if (typeof value !== 'number') {
        return { valid: false, error: `${field.label} must be a number` };
      }
      if (field.minValue !== undefined && value < field.minValue) {
        return { valid: false, error: `${field.label} must be at least ${field.minValue}` };
      }
      if (field.maxValue !== undefined && value > field.maxValue) {
        return { valid: false, error: `${field.label} must be at most ${field.maxValue}` };
      }
      return { valid: true };

    case 'boolean':
      if (typeof value !== 'boolean') {
        return { valid: false, error: `${field.label} must be true or false` };
      }
      return { valid: true };

    case 'date':
      if (!(value instanceof Date) && typeof value !== 'string') {
        return { valid: false, error: `${field.label} must be a date` };
      }
      return { valid: true };

    case 'select':
      if (!field.options?.includes(String(value))) {
        return { valid: false, error: `${field.label} has invalid selection` };
      }
      return { valid: true };

    default:
      return { valid: true };
  }
}

/**
 * Get available providers for a service
 */
export function getProvidersForService(
  providers: Provider[],
  serviceId: string
): Provider[] {
  return providers.filter((p) => p.specialties.includes(serviceId) && p.isActive);
}

/**
 * Get appointment duration in hours
 */
export function getAppointmentDurationHours(appointment: Appointment): number {
  return (appointment.endTime.getTime() - appointment.startTime.getTime()) / (1000 * 60 * 60);
}

/**
 * Get appointment duration in minutes
 */
export function getAppointmentDurationMinutes(appointment: Appointment): number {
  return (appointment.endTime.getTime() - appointment.startTime.getTime()) / (1000 * 60);
}

/**
 * Check if an appointment is in the future
 */
export function isAppointmentInFuture(appointment: Appointment): boolean {
  return appointment.startTime > new Date();
}

/**
 * Check if an appointment is in the past
 */
export function isAppointmentInPast(appointment: Appointment): boolean {
  return appointment.endTime < new Date();
}

/**
 * Get overlapping appointments
 */
export function getOverlappingAppointments(
  appointments: Appointment[],
  appointmentToCheck: Appointment,
  providerId: string
): Appointment[] {
  return appointments.filter((apt) => {
    if (apt.id === appointmentToCheck.id) return false;
    if (apt.providerId !== providerId) return false;
    if (isAppointmentCancelled(apt)) return false;

    return (
      apt.startTime < appointmentToCheck.endTime &&
      apt.endTime > appointmentToCheck.startTime
    );
  });
}

/**
 * Calculate appointment revenue
 */
export function calculateAppointmentRevenue(appointment: Appointment): number {
  return appointment.finalPrice || 0;
}

/**
 * Get appointment revenue by service
 */
export function getRevenueByService(
  appointments: Appointment[],
  serviceId: string
): number {
  return appointments
    .filter((apt) => apt.serviceId === serviceId && isAppointmentCompleted(apt))
    .reduce((sum, apt) => sum + calculateAppointmentRevenue(apt), 0);
}

/**
 * Get total revenue
 */
export function getTotalRevenue(appointments: Appointment[]): number {
  return appointments
    .filter(isAppointmentCompleted)
    .reduce((sum, apt) => sum + calculateAppointmentRevenue(apt), 0);
}

/**
 * Get customer lifetime value
 */
export function getCustomerLifetimeValue(
  customer: Customer,
  appointments: Appointment[]
): number {
  return appointments
    .filter((apt) => apt.customerId === customer.id && isAppointmentCompleted(apt))
    .reduce((sum, apt) => sum + calculateAppointmentRevenue(apt), 0);
}

/**
 * Get most popular service
 */
export function getMostPopularService(
  appointments: Appointment[]
): { serviceId: string; count: number } | null {
  const serviceMap = new Map<string, number>();

  appointments.forEach((apt) => {
    if (isAppointmentCompleted(apt)) {
      serviceMap.set(apt.serviceId, (serviceMap.get(apt.serviceId) || 0) + 1);
    }
  });

  if (serviceMap.size === 0) return null;

  const mostPopular = Array.from(serviceMap.entries()).reduce((prev, current) =>
    prev[1] > current[1] ? prev : current
  );

  return { serviceId: mostPopular[0], count: mostPopular[1] };
}

/**
 * Get provider performance metrics
 */
export function getProviderMetrics(
  provider: Provider,
  appointments: Appointment[]
) {
  const providerAppointments = appointments.filter((apt) => apt.providerId === provider.id);
  const completedAppointments = providerAppointments.filter(isAppointmentCompleted);
  const revenue = completedAppointments.reduce(
    (sum, apt) => sum + calculateAppointmentRevenue(apt),
    0
  );

  return {
    totalAppointments: providerAppointments.length,
    completedAppointments: completedAppointments.length,
    revenue,
    averageAppointmentValue: completedAppointments.length > 0 ? revenue / completedAppointments.length : 0,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'BRL'): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
}

/**
 * Format time slot
 */
export function formatTimeSlot(startTime: Date, endTime: Date): string {
  const start = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const end = endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}

/**
 * Format duration in minutes to readable format
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Get business hours for a specific day
 */
export function getBusinessHoursForDay(
  company: Company,
  dayIndex: number // 0 = Sunday, 1 = Monday, etc.
): { isOpen: boolean; start?: string; end?: string; breakStart?: string; breakEnd?: string } | null {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ] as const;

  if (dayIndex < 0 || dayIndex > 6) return null;
  return company.operatingHours[days[dayIndex]];
}

/**
 * Check if company is open at a specific time
 */
export function isCompanyOpenAt(company: Company, date: Date): boolean {
  const dayIndex = date.getDay();
  const hours = getBusinessHoursForDay(company, dayIndex);

  if (!hours || !hours.isOpen) return false;

  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Simple time comparison (assumes HH:mm format)
  if (hours.start && timeStr < hours.start) return false;
  if (hours.end && timeStr >= hours.end) return false;
  if (hours.breakStart && hours.breakEnd && timeStr >= hours.breakStart && timeStr < hours.breakEnd) {
    return false;
  }

  return true;
}

/**
 * Type-safe merge of custom field values
 */
export function mergeCustomFieldValues(
  existing: CustomFieldValue[],
  updates: CustomFieldValue[]
): CustomFieldValue[] {
  const merged = [...existing];

  updates.forEach((update) => {
    const index = merged.findIndex((cfv) => cfv.fieldId === update.fieldId);
    if (index >= 0) {
      merged[index] = update;
    } else {
      merged.push(update);
    }
  });

  return merged;
}
