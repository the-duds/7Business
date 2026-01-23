import React from 'react';
import { Check } from 'lucide-react';
import { Service } from '../types';

interface StepServicesProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

const getColorClasses = (color: string, isSelected: boolean) => {
  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-300',
      icon: 'bg-pink-100 text-pink-600',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: 'bg-blue-100 text-blue-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      icon: 'bg-purple-100 text-purple-600',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      icon: 'bg-green-100 text-green-600',
    },
  };

  const classes = colorMap[color];

  if (isSelected) {
    return {
      card: `bg-indigo-50 border-2 border-indigo-600 ring-2 ring-indigo-200`,
      icon: 'bg-indigo-100 text-indigo-600',
      text: 'text-indigo-900',
    };
  }

  return {
    card: `${classes.bg} border-2 ${classes.border} hover:shadow-md transition-all`,
    icon: classes.icon,
    text: 'text-slate-900',
  };
};

export const StepServices: React.FC<StepServicesProps> = ({
  services,
  selectedService,
  onSelectService,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Que serviço você precisa?
        </h2>
        <p className="text-slate-600">
          Selecione o serviço desejado para ver a disponibilidade
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          const colors = getColorClasses(service.color, isSelected);

          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${colors.card}`}
            >
              {/* Header com ícone e checkbox */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${colors.icon}`}
                >
                  {service.icon || '✂️'}
                </div>

                {isSelected && (
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </div>

              {/* Nome e descrição */}
              <h3 className={`font-semibold text-lg mb-1 ${colors.text}`}>
                {service.name}
              </h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Duração e preço */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-sm text-slate-600">
                  ⏱️ {service.duration} min
                </span>
                <span className="text-lg font-bold text-indigo-600">
                  R$ {service.price.toFixed(2)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
