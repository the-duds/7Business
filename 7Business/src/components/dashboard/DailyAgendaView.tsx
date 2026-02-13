import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Share2, Bell, MessageCircle } from 'lucide-react';

// Tipos
interface Professional {
  id: string;
  name: string;
  avatar?: string;
  color: string;
}

interface AgendaAppointment {
  id: string;
  professionalId: string;
  clientName: string;
  serviceName: string;
  startTime: string; // HH:MM format
  duration: number; // em minutos
  status: 'confirmado' | 'pendente' | 'cancelado';
  clientPhone?: string;
}

interface DailyAgendaViewProps {
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

// Mock Data
const mockProfessionals: Professional[] = [
  { id: 'p1', name: 'Mariana Silva', avatar: '', color: '#10b981' },
  { id: 'p2', name: 'Carlos Mendes', avatar: '', color: '#3b82f6' },
  { id: 'p3', name: 'Ana Costa', avatar: '', color: '#8b5cf6' },
  { id: 'p4', name: 'Pedro Santos', avatar: '', color: '#f59e0b' },
  { id: 'p5', name: 'Júlia Almeida', avatar: '', color: '#ec4899' },
];

const mockAppointments: AgendaAppointment[] = [
  { id: 'a1', professionalId: 'p1', clientName: 'Maria Oliveira', serviceName: 'Corte', startTime: '09:00', duration: 45, status: 'confirmado', clientPhone: '+55 11 99999-0001' },
  { id: 'a2', professionalId: 'p2', clientName: 'João Silva', serviceName: 'Barba', startTime: '09:30', duration: 30, status: 'confirmado', clientPhone: '+55 11 99999-0002' },
  { id: 'a3', professionalId: 'p1', clientName: 'Carla Souza', serviceName: 'Coloração', startTime: '10:30', duration: 90, status: 'confirmado', clientPhone: '+55 11 99999-0003' },
  { id: 'a4', professionalId: 'p3', clientName: 'Roberto Lima', serviceName: 'Corte + Barba', startTime: '10:00', duration: 60, status: 'pendente', clientPhone: '+55 11 99999-0004' },
  { id: 'a5', professionalId: 'p4', clientName: 'Fernanda Costa', serviceName: 'Hidratação', startTime: '11:00', duration: 60, status: 'confirmado', clientPhone: '+55 11 99999-0005' },
  { id: 'a6', professionalId: 'p5', clientName: 'Lucas Pereira', serviceName: 'Corte', startTime: '13:00', duration: 45, status: 'confirmado', clientPhone: '+55 11 99999-0006' },
  { id: 'a7', professionalId: 'p2', clientName: 'Beatriz Martins', serviceName: 'Manicure', startTime: '14:00', duration: 45, status: 'confirmado', clientPhone: '+55 11 99999-0007' },
  { id: 'a8', professionalId: 'p3', clientName: 'Ricardo Gomes', serviceName: 'Massagem', startTime: '15:00', duration: 60, status: 'pendente', clientPhone: '+55 11 99999-0008' },
  { id: 'a9', professionalId: 'p1', clientName: 'Patrícia Rocha', serviceName: 'Escova', startTime: '14:00', duration: 60, status: 'confirmado', clientPhone: '+55 11 99999-0009' },
  { id: 'a10', professionalId: 'p4', clientName: 'André Barbosa', serviceName: 'Corte', startTime: '16:00', duration: 45, status: 'cancelado', clientPhone: '+55 11 99999-0010' },
];

// Gera time slots de 30 em 30 minutos
const generateTimeSlots = (startHour = 8, endHour = 19): string[] => {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  return slots;
};

// Calcula posição e altura do card
const calculateCardPosition = (startTime: string, duration: number, startHour = 8) => {
  const parts = startTime.split(':');
  const hours = Number(parts[0]) || 0;
  const minutes = Number(parts[1]) || 0;
  const totalMinutesFromStart = (hours - startHour) * 60 + minutes;
  const top = (totalMinutesFromStart / 30) * 60; // 60px por slot de 30min
  const height = (duration / 30) * 60;
  return { top, height };
};

// Formata data
const formatDate = (date: Date): string => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const DailyAgendaView: React.FC<DailyAgendaViewProps> = ({ branding }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string>('all');

  const timeSlots = useMemo(() => generateTimeSlots(8, 19), []);

  const filteredProfessionals = useMemo(() => {
    if (selectedProfessional === 'all') {
      return mockProfessionals;
    }
    return mockProfessionals.filter((prof) => prof.id === selectedProfessional);
  }, [selectedProfessional]);

  const filteredAppointments = useMemo(() => {
    if (selectedProfessional === 'all') {
      return mockAppointments;
    }
    return mockAppointments.filter((apt) => apt.professionalId === selectedProfessional);
  }, [selectedProfessional]);

  const goToToday = () => setCurrentDate(new Date());
  const goToPreviousDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };
  const goToNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const accentColor = branding?.primaryColor || '#4f46e5';

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Atendimentos</h2>
            <p className="text-sm text-slate-500 mt-1">{formatDate(currentDate)}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Navegação de Data */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToToday}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Hoje
              </button>
              <button
                onClick={goToPreviousDay}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextDay}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Filtro de Profissional */}
            <select
              value={selectedProfessional}
              onChange={(e) => setSelectedProfessional(e.target.value)}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border-none outline-none"
            >
              <option value="all">Todos os Profissionais</option>
              {mockProfessionals.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name}
                </option>
              ))}
            </select>

            {/* Ações */}
            <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors" title="Compartilhar">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors" title="Notificações">
              <Bell size={20} />
            </button>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors" title="Atualizar">
              <RefreshCw size={20} />
            </button>

            {/* Botão ADICIONAR */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: accentColor }}
            >
              <Plus size={20} />
              ADICIONAR
            </button>
          </div>
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header: Profissionais */}
            <div className="flex border-b border-slate-200">
              <div className="w-20 flex-shrink-0 bg-slate-50 border-r border-slate-200 p-4">
                <span className="text-xs font-semibold text-slate-500">Horário</span>
              </div>
              {filteredProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  className="flex-1 min-w-[180px] p-4 bg-slate-50 border-r border-slate-200 last:border-r-0"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: prof.color }}
                    >
                      {prof.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{prof.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Body: Grid de Horários */}
            <div className="relative flex">
              {/* Coluna de Horários */}
              <div className="w-20 flex-shrink-0 bg-slate-50 border-r border-slate-200">
                {timeSlots.map((slot, index) => (
                  <div
                    key={slot}
                    className="h-[60px] border-b border-slate-200 flex items-start justify-center pt-1"
                  >
                    {index % 2 === 0 && (
                      <span className="text-xs font-medium text-slate-500">{slot}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Colunas dos Profissionais */}
              {filteredProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  className="flex-1 min-w-[180px] border-r border-slate-200 last:border-r-0 relative"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)',
                  }}
                >
                  {/* Linhas de Horário */}
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="h-[60px] border-b border-slate-100"
                    />
                  ))}

                  {/* Cards de Agendamento */}
                  {filteredAppointments
                    .filter((apt) => apt.professionalId === prof.id)
                    .map((apt) => {
                      const { top, height } = calculateCardPosition(apt.startTime, apt.duration);
                      const statusColors = {
                        confirmado: 'bg-emerald-100 border-emerald-300 text-emerald-900',
                        pendente: 'bg-amber-100 border-amber-300 text-amber-900',
                        cancelado: 'bg-slate-100 border-slate-300 text-slate-600',
                      };

                      return (
                        <div
                          key={apt.id}
                          className={`absolute left-1 right-1 rounded-lg border-l-4 p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${statusColors[apt.status]}`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            borderLeftColor: prof.color,
                          }}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-slate-600 mb-0.5">
                                {apt.startTime} - {(() => {
                                  const parts = apt.startTime.split(':');
                                  const h = Number(parts[0]) || 0;
                                  const m = Number(parts[1]) || 0;
                                  const totalMinutes = h * 60 + m + apt.duration;
                                  const endH = Math.floor(totalMinutes / 60);
                                  const endM = totalMinutes % 60;
                                  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
                                })()}
                              </div>
                              <div className="font-bold text-sm truncate">{apt.clientName}</div>
                              <div className="text-xs truncate mt-0.5">{apt.serviceName}</div>
                            </div>
                            {apt.clientPhone && (
                              <button className="p-1 hover:bg-white/50 rounded transition-colors flex-shrink-0">
                                <MessageCircle size={14} className="text-green-600" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-100 border-2 border-emerald-300 rounded"></div>
            <span className="text-xs text-slate-600">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-100 border-2 border-amber-300 rounded"></div>
            <span className="text-xs text-slate-600">Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-100 border-2 border-slate-300 rounded"></div>
            <span className="text-xs text-slate-600">Cancelado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
