import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';
import { staffSchedules } from '@/components/dashboard/mockData';
import { StaffSchedule } from '@/components/dashboard/types';

const getBranding = () => {
  const storedUser = localStorage.getItem('authUser');
  if (!storedUser) {
    return null;
  }

  try {
    const user = JSON.parse(storedUser) as { company?: { slug?: string } };
    const slug = user.company?.slug;
    if (!slug) {
      return null;
    }

    const storedBranding = localStorage.getItem('tenantBranding');
    if (!storedBranding) {
      return null;
    }

    const brandingMap = JSON.parse(storedBranding) as Record<
      string,
      { name: string; logoUrl: string; primaryColor: string; secondaryColor: string }
    >;
    return brandingMap[slug] || null;
  } catch {
    return null;
  }
};

const AppointmentItem = ({
  appointment,
  accent,
}: {
  appointment: StaffSchedule['appointments'][number];
  accent?: string;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
    <div>
      <div className="text-sm font-semibold text-slate-900">{appointment.clientName}</div>
      <div className="text-xs text-slate-500">{appointment.service}</div>
    </div>
    <div className="text-right">
      <div className="text-sm font-semibold" style={accent ? { color: accent } : undefined}>
        {appointment.time}
      </div>
      <div className="text-xs text-slate-500">{appointment.duration} min</div>
    </div>
  </div>
);

export function StaffSchedulePage() {
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();
  const branding = useMemo(() => getBranding(), []);

  const schedule = useMemo(() => {
    return staffSchedules.find((item) => item.employee.id === employeeId) || null;
  }, [employeeId]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarClock
            size={24}
            className="text-indigo-600"
            style={branding ? { color: branding.primaryColor } : undefined}
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Agenda do Colaborador</h1>
            <p className="text-sm text-slate-600">
              {schedule ? schedule.employee.name : 'Colaborador nao encontrado'}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          style={branding ? { background: branding.secondaryColor } : undefined}
        >
          Voltar
        </button>
      </div>

      {!schedule ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          Nenhuma agenda encontrada para este colaborador.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-900">{schedule.employee.name}</div>
                {schedule.employee.role && (
                  <div className="text-sm text-slate-500">{schedule.employee.role}</div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {schedule.employee.services.map((service) => (
                  <span
                    key={service.id}
                    className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                    style={
                      branding
                        ? { borderColor: branding.primaryColor, color: branding.primaryColor }
                        : undefined
                    }
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {schedule.appointments.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                Nenhum agendamento para este colaborador.
              </div>
            ) : (
              schedule.appointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  accent={branding?.primaryColor}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
