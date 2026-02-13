import React, { useMemo, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { Appointment, StaffSchedule } from './types';

interface StaffSchedulesProps {
  schedules: StaffSchedule[];
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
  onViewSchedule?: (employeeId: string) => void;
}

const AppointmentRow: React.FC<{ appointment: Appointment; accent?: string }> = ({
  appointment,
  accent,
}) => {
  return (
    <div className="flex items-center justify-between text-sm text-slate-700">
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900">{appointment.clientName}</span>
        <span className="text-slate-500">{appointment.service}</span>
      </div>
      <div className="text-right">
        <span className="font-semibold" style={accent ? { color: accent } : undefined}>
          {appointment.time}
        </span>
        <div className="text-xs text-slate-500">{appointment.duration} min</div>
      </div>
    </div>
  );
};

const ServiceBadge: React.FC<{ label: string; accent?: string; isActive?: boolean }> = ({
  label,
  accent,
  isActive = false,
}) => {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive ? 'bg-slate-200 text-slate-900' : 'bg-slate-100 text-slate-700'
      }`}
      style={accent ? { border: `1px solid ${accent}` } : undefined}
    >
      {label}
    </span>
  );
};

const EmployeeCard: React.FC<{
  schedule: StaffSchedule;
  branding?: StaffSchedulesProps['branding'];
  serviceFilter?: string;
  onViewSchedule?: StaffSchedulesProps['onViewSchedule'];
}> = ({ schedule, branding, serviceFilter, onViewSchedule }) => {
  const accent = branding?.primaryColor;
  const border = branding?.secondaryColor;
  const upcoming = schedule.appointments
    .filter((appointment) =>
      serviceFilter && serviceFilter !== 'all'
        ? appointment.service === serviceFilter
        : true
    )
    .slice(0, 3);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4"
      style={border ? { borderColor: border } : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ background: accent || '#4f46e5' }}
        >
          {schedule.employee.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">
            {schedule.employee.name}
          </div>
          {schedule.employee.role && (
            <div className="text-xs text-slate-500">{schedule.employee.role}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {schedule.employee.services.map((service) => (
          <ServiceBadge
            key={service.id}
            label={service.name}
            accent={accent}
            isActive={serviceFilter === service.name}
          />
        ))}
      </div>

      <div className="space-y-3">
        {upcoming.length === 0 ? (
          <div className="text-sm text-slate-500">Sem agendamentos para este filtro.</div>
        ) : (
          upcoming.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
              accent={accent}
            />
          ))
        )}
      </div>

      <button
        className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        onClick={() => onViewSchedule?.(schedule.employee.id)}
      >
        Ver agenda completa
      </button>
    </div>
  );
};

export const StaffSchedules: React.FC<StaffSchedulesProps> = ({
  schedules,
  branding,
  onViewSchedule,
}) => {
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const employeeOptions = useMemo(
    () => schedules.map((schedule) => schedule.employee),
    [schedules]
  );

  const serviceOptions = useMemo(() => {
    const allServices = schedules.flatMap((schedule) =>
      schedule.employee.services.map((service) => service.name)
    );
    return Array.from(new Set(allServices));
  }, [schedules]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesEmployee =
        employeeFilter === 'all' || schedule.employee.id === employeeFilter;
      const matchesService =
        serviceFilter === 'all' ||
        schedule.employee.services.some((service) => service.name === serviceFilter);
      return matchesEmployee && matchesService;
    });
  }, [employeeFilter, schedules, serviceFilter]);

  const accentStyle = branding ? { borderColor: branding.secondaryColor } : undefined;
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CalendarClock
            size={20}
            className="text-indigo-600"
            style={branding ? { color: branding.primaryColor } : undefined}
          />
          <h3 className="text-lg font-semibold text-slate-900">Agenda por Funcionario</h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">
            Funcionario
            <select
              value={employeeFilter}
              onChange={(event) => setEmployeeFilter(event.target.value)}
              className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={accentStyle}
            >
              <option value="all">Todos</option>
              {employeeOptions.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Servico
            <select
              value={serviceFilter}
              onChange={(event) => setServiceFilter(event.target.value)}
              className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={accentStyle}
            >
              <option value="all">Todos</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSchedules.map((schedule) => (
          <EmployeeCard
            key={schedule.employee.id}
            schedule={schedule}
            branding={branding}
            serviceFilter={serviceFilter}
            onViewSchedule={onViewSchedule}
          />
        ))}
      </div>
    </section>
  );
};
