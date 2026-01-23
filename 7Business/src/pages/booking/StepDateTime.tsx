import React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { DayAvailability, TimeSlot } from '../types';

interface StepDateTimeProps {
  availability: DayAvailability[];
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

export const StepDateTime: React.FC<StepDateTimeProps> = ({
  availability,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) => {
  const [visibleDayIndex, setVisibleDayIndex] = React.useState(0);

  // Mostrar até 7 dias por vez (mobile: 3, desktop: 7)
  const daysPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 7;
  const visibleDays = availability.slice(visibleDayIndex, visibleDayIndex + daysPerView);

  const selectedDateData = availability.find((day) => day.date === selectedDate);

  const handlePrevious = () => {
    if (visibleDayIndex > 0) {
      setVisibleDayIndex(visibleDayIndex - 1);
    }
  };

  const handleNext = () => {
    if (visibleDayIndex + daysPerView < availability.length) {
      setVisibleDayIndex(visibleDayIndex + 1);
    }
  };

  const formatDateDisplay = (date: string) => {
    const d = new Date(date + 'T00:00:00');
    return {
      day: d.getDate(),
      month: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    };
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Data */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Quando você prefere?
        </h2>

        {/* Carousel de Datas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={visibleDayIndex === 0}
              className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex-1 grid grid-cols-3 sm:grid-cols-7 gap-2">
              {visibleDays.map((day) => {
                const isSelected = selectedDate === day.date;
                const { day: dayNum, month } = formatDateDisplay(day.date);

                return (
                  <button
                    key={day.date}
                    onClick={() => {
                      if (day.available) onSelectDate(day.date);
                    }}
                    disabled={!day.available}
                    className={`p-3 rounded-lg text-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                        : day.available
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 cursor-pointer'
                        : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="text-sm font-semibold">{dayNum}</div>
                    <div className="text-xs opacity-75">{month}</div>
                    <div className="text-xs mt-1">
                      {isSelected && day.slots.filter((s) => s.available).length > 0 && '✓'}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={visibleDayIndex + daysPerView >= availability.length}
              className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Seleção de Horário */}
      {selectedDate && selectedDateData && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            Horários disponíveis
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {selectedDateData.slots.map((slot) => {
              const isSelected = selectedTime === slot.time;

              return (
                <button
                  key={slot.time}
                  onClick={() => {
                    if (slot.available) onSelectTime(slot.time);
                  }}
                  disabled={!slot.available}
                  className={`py-2 px-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                    isSelected
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                      : slot.available
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 cursor-pointer'
                      : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          {selectedDateData.slots.filter((s) => s.available).length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Nenhum horário disponível nesta data. Escolha outro dia.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
