import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Service } from '../types';

interface StepConfirmationProps {
  service: Service | null;
  date: string | null;
  time: string | null;
  clientData: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdateClientData: (data: { name: string; email: string; phone: string }) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({
  service,
  date,
  time,
  clientData,
  onUpdateClientData,
  onSubmit,
  isSubmitting,
}) => {
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!clientData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!clientData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)) {
      errors.email = 'E-mail inválido';
    }

    if (!clientData.phone.trim()) {
      errors.phone = 'WhatsApp é obrigatório';
    } else if (!/^\d{10,11}$/.test(clientData.phone.replace(/\D/g, ''))) {
      errors.phone = 'WhatsApp inválido (10-11 dígitos)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handlePhoneChange = (value: string) => {
    // Formata o telefone enquanto digita
    const cleaned = value.replace(/\D/g, '');
    const formatted =
      cleaned.length <= 10
        ? cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        : cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    onUpdateClientData({ ...clientData, phone: formatted });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Confirme sua reserva
        </h2>
        <p className="text-slate-600">
          Verifique os dados e complete seu agendamento
        </p>
      </div>

      {/* Resumo da Reserva */}
      <div className="bg-slate-50 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-slate-900">Resumo do agendamento</h3>

        {/* Card de Serviço */}
        {service && (
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">Serviço</p>
                <p className="font-semibold text-slate-900">{service.name}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {service.duration} min • R$ {service.price.toFixed(2)}
                </p>
              </div>
              <div className="text-2xl">{service.icon || '✂️'}</div>
            </div>
          </div>
        )}

        {/* Card de Data e Hora */}
        {date && time && (
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Data</p>
                <p className="font-semibold text-slate-900 capitalize">
                  {formatDate(date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Horário</p>
                <p className="font-semibold text-slate-900">{time}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulário de Dados */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <User size={18} className="text-indigo-600" />
          Seus dados
        </h3>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Nome completo
          </label>
          <input
            type="text"
            value={clientData.name}
            onChange={(e) =>
              onUpdateClientData({ ...clientData, name: e.target.value })
            }
            placeholder="João Silva"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
              formErrors.name
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2 flex items-center gap-2">
            <Mail size={16} />
            E-mail
          </label>
          <input
            type="email"
            value={clientData.email}
            onChange={(e) =>
              onUpdateClientData({ ...clientData, email: e.target.value })
            }
            placeholder="joao@example.com"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
              formErrors.email
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2 flex items-center gap-2">
            <Phone size={16} />
            WhatsApp
          </label>
          <input
            type="tel"
            value={clientData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="(11) 99999-9999"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
              formErrors.phone
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {formErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            Usaremos para confirmar seu agendamento
          </p>
        </div>

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Confirmando...
            </>
          ) : (
            'Confirmar agendamento'
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          Ao clicar em confirmar, você concorda com nossa política de privacidade
        </p>
      </form>
    </div>
  );
};
