import React from 'react';
import { Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Appointment, AppointmentStatus } from './types';

interface AppointmentsTableProps {
  appointments: Appointment[];
}

const getStatusBadge = (status: AppointmentStatus) => {
  const statusConfig = {
    confirmado: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: CheckCircle2,
      label: 'Confirmado',
    },
    pendente: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: AlertCircle,
      label: 'Pendente',
    },
    cancelado: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: XCircle,
      label: 'Cancelado',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
      <Icon size={16} />
      {config.label}
    </div>
  );
};

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Clock size={20} className="text-indigo-600" />
          Próximos Agendamentos
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Cliente
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Serviço
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Data
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Horário
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Duração
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <p className="text-slate-500 font-medium">
                    Nenhum agendamento encontrado
                  </p>
                </td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className={`border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-indigo-600">
                          {appointment.clientName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {appointment.clientName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{appointment.service}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{appointment.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {appointment.time}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">
                      {appointment.duration} min
                    </p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(appointment.status)}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {appointments.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Total de {appointments.length} agendamentos
          </p>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
            Ver Todos →
          </button>
        </div>
      )}
    </div>
  );
};
