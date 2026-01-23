/**
 * 7Business - Personalized Dashboard Components
 * Different layouts based on company category
 */

import React from 'react';
import { AuthUser } from '@/services/authService';
import { CompanyCategory } from '@/types';

interface DashboardProps {
  user: AuthUser;
  onLogout: () => void;
}

/**
 * Beauty Salon Dashboard - Shows appointment schedule with chairs/stations
 */
export const BeautyDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const appointments = [
    { id: 1, time: '09:00', customer: 'Maria Silva', service: 'Corte + Escova', chair: 1, duration: '60min' },
    { id: 2, time: '10:00', customer: 'Ana Costa', service: 'Manicure', chair: 2, duration: '45min' },
    { id: 3, time: '11:00', customer: 'Paula Santos', service: 'Pedicure', chair: 3, duration: '50min' },
    { id: 4, time: '14:00', customer: 'Lucia Ferreira', service: 'Coloração', chair: 1, duration: '120min' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.company.name}</h1>
            <p className="text-gray-600 text-sm">💇‍♀️ Salão de Beleza</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schedule Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda de Hoje - Cadeiras/Estações</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((chairNumber) => {
              const apt = appointments.find((a) => a.chair === chairNumber);
              return (
                <div
                  key={chairNumber}
                  className={`rounded-lg border-2 p-6 transition ${
                    apt
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">💺</div>
                    <h3 className="font-bold text-gray-900">Cadeira {chairNumber}</h3>
                  </div>

                  {apt ? (
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-gray-600">Horário</p>
                        <p className="font-semibold text-gray-900">{apt.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cliente</p>
                        <p className="font-semibold text-gray-900">{apt.customer}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Serviço</p>
                        <p className="font-semibold text-emerald-600">{apt.service}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duração</p>
                        <p className="font-semibold text-gray-900">{apt.duration}</p>
                      </div>
                      <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition text-xs font-semibold">
                        Detalhes
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-3">Disponível</p>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition text-xs font-semibold">
                        + Novo Agendamento
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Agendamentos Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ocupação</p>
                <p className="text-3xl font-bold text-emerald-600">100%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Faturamento Estimado</p>
                <p className="text-3xl font-bold text-blue-600">R$ 890</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/**
 * Mechanic Shop Dashboard - Shows repair bays and services
 */
export const MechanicsDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const jobs = [
    { id: 1, time: '08:30', vehicle: 'Honda Civic - Branco', service: 'Troca de óleo', bay: 1, status: 'Em progresso' },
    { id: 2, time: '09:00', vehicle: 'Ford Focus - Preto', service: 'Alinhamento', bay: 2, status: 'Aguardando' },
    { id: 3, time: '11:00', vehicle: 'Volkswagen Up - Prata', service: 'Revisão', bay: 3, status: 'Concluído' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.company.name}</h1>
            <p className="text-gray-600 text-sm">🔧 Oficina Mecânica</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Bays */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Oficinas/Baías de Serviço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((bayNumber) => {
              const job = jobs.find((j) => j.bay === bayNumber);
              return (
                <div
                  key={bayNumber}
                  className={`rounded-lg border-2 p-6 transition ${
                    job && job.status === 'Em progresso'
                      ? 'border-orange-500 bg-orange-50'
                      : job && job.status === 'Concluído'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">🔧</div>
                    <h3 className="font-bold text-gray-900">Baía {bayNumber}</h3>
                  </div>

                  {job ? (
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-gray-600">Veículo</p>
                        <p className="font-semibold text-gray-900">{job.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Serviço</p>
                        <p className="font-semibold text-gray-900">{job.service}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <p className={`font-semibold ${
                          job.status === 'Em progresso'
                            ? 'text-orange-600'
                            : job.status === 'Concluído'
                            ? 'text-green-600'
                            : 'text-blue-600'
                        }`}>
                          {job.status}
                        </p>
                      </div>
                      <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition text-xs font-semibold">
                        Atualizar Status
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-3">Disponível</p>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition text-xs font-semibold">
                        + Novo Serviço
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Serviços Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Em Progresso</p>
                <p className="text-3xl font-bold text-orange-600">{jobs.filter(j => j.status === 'Em progresso').length}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Concluído</p>
                <p className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === 'Concluído').length}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Faturamento</p>
                <p className="text-3xl font-bold text-blue-600">R$ 1.200</p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/**
 * Health Clinic Dashboard - Shows medical consultations schedule
 */
export const HealthDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const consultations = [
    { id: 1, time: '09:00', patient: 'João Pedro', doctor: 'Dr. Silva', type: 'Consulta Geral', room: '101' },
    { id: 2, time: '09:30', patient: 'Maria Santos', doctor: 'Dra. Ana', type: 'Consulta Cardiologia', room: '102' },
    { id: 3, time: '10:00', patient: 'Pedro Costa', doctor: 'Dr. Silva', type: 'Retorno', room: '101' },
    { id: 4, time: '14:00', patient: 'Lucia Ferreira', doctor: 'Dr. Rafael', type: 'Consulta Pediátrica', room: '103' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.company.name}</h1>
            <p className="text-gray-600 text-sm">🏥 Clínica Médica</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Consultations Schedule */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda Clínica - Horários de Consulta</h2>
          
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Horário</p>
                    <p className="text-2xl font-bold text-blue-600">{consultation.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Paciente</p>
                    <p className="font-semibold text-gray-900">{consultation.patient}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Médico</p>
                    <p className="font-semibold text-gray-900">{consultation.doctor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Tipo</p>
                    <p className="font-semibold text-gray-900">{consultation.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition text-sm font-semibold">
                      Detalhes
                    </button>
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition text-sm font-semibold">
                      Marcar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Consultas Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{consultations.length}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ocupação</p>
                <p className="text-3xl font-bold text-emerald-600">95%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pacientes Confirmados</p>
                <p className="text-3xl font-bold text-blue-600">{consultations.length}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Faturamento Esperado</p>
                <p className="text-3xl font-bold text-green-600">R$ 2.500</p>
              </div>
              <div className="text-4xl">💚</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/**
 * Dashboard Router - Selects correct dashboard based on company category
 */
export const DashboardRouter: React.FC<DashboardProps> = ({ user, onLogout }) => {
  switch (user.company.category) {
    case CompanyCategory.BEAUTY:
      return <BeautyDashboard user={user} onLogout={onLogout} />;
    case CompanyCategory.MECHANICS:
      return <MechanicsDashboard user={user} onLogout={onLogout} />;
    case CompanyCategory.HEALTH:
      return <HealthDashboard user={user} onLogout={onLogout} />;
    default:
      return <BeautyDashboard user={user} onLogout={onLogout} />;
  }
};
