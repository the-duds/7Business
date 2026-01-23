import React, { useReducer } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { StepServices } from './StepServices';
import { StepDateTime } from './StepDateTime';
import { StepConfirmation } from './StepConfirmation';
import { BookingState, BookingAction, Service, CompanyData } from './types';

// Dados mock da empresa
const mockCompanyData: CompanyData = {
  id: 'salao-da-ana',
  name: 'Salão da Ana',
  slug: 'salao-da-ana',
  description: 'Seu salão de beleza de confiança',
  services: [
    {
      id: 'corte',
      name: 'Corte de Cabelo',
      description: 'Corte profissional com design personalizado',
      price: 50,
      duration: 45,
      color: 'pink',
      icon: '✂️',
    },
    {
      id: 'coloracao',
      name: 'Coloração',
      description: 'Coloração ou descoloração com produtos premium',
      price: 120,
      duration: 90,
      color: 'purple',
      icon: '🎨',
    },
    {
      id: 'escova',
      name: 'Escova Progressiva',
      description: 'Tratamento de alisamento progressivo',
      price: 150,
      duration: 120,
      color: 'blue',
      icon: '💆‍♀️',
    },
    {
      id: 'manicure',
      name: 'Manicure',
      description: 'Manicure completa com esmalte ou gel',
      price: 40,
      duration: 45,
      color: 'pink',
      icon: '💅',
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      description: 'Pedicure completa com design',
      price: 45,
      duration: 45,
      color: 'green',
      icon: '🦶',
    },
    {
      id: 'design',
      name: 'Design de Sobrancelhas',
      description: 'Design e coloração de sobrancelhas',
      price: 35,
      duration: 30,
      color: 'pink',
      icon: '👁️',
    },
  ],
  availability: generateAvailability(),
};

function generateAvailability() {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' });

    // Não abre aos domingos
    const isAvailable = date.getDay() !== 0;

    const slots = isAvailable
      ? generateTimeSlots()
      : [];

    days.push({
      date: dateStr,
      dayOfWeek,
      available: isAvailable,
      slots,
    });
  }

  return days;
}

function generateTimeSlots() {
  const slots = [];
  const start = 9; // 9:00
  const end = 18; // 18:00
  const interval = 30; // 30 minutos

  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      // 30% de chance de estar indisponível (mock)
      slots.push({
        time,
        available: Math.random() > 0.3,
      });
    }
  }

  return slots;
}

const initialState: BookingState = {
  currentStep: 'service',
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  clientData: {
    name: '',
    email: '',
    phone: '',
  },
  isSubmitting: false,
  error: null,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SELECT_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        selectedDate: null,
        selectedTime: null,
      };

    case 'SELECT_DATE':
      return {
        ...state,
        selectedDate: action.payload,
        selectedTime: null,
      };

    case 'SELECT_TIME':
      return {
        ...state,
        selectedTime: action.payload,
      };

    case 'UPDATE_CLIENT_DATA':
      return {
        ...state,
        clientData: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export const BookingPage: React.FC = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const handleSelectService = (service: Service) => {
    dispatch({ type: 'SELECT_SERVICE', payload: service });
    dispatch({ type: 'SET_STEP', payload: 'datetime' });
  };

  const handleDateTimeNext = () => {
    if (state.selectedDate && state.selectedTime) {
      dispatch({ type: 'SET_STEP', payload: 'confirmation' });
    }
  };

  const handleConfirmBooking = async () => {
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sucesso
      dispatch({ type: 'SET_STEP', payload: 'success' });
      console.log('Agendamento confirmado:', {
        service: state.selectedService?.name,
        date: state.selectedDate,
        time: state.selectedTime,
        client: state.clientData,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao confirmar agendamento. Tente novamente.',
      });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const steps = ['Serviço', 'Data/Hora', 'Confirmação'];
  const stepIndex = ['service', 'datetime', 'confirmation'].indexOf(state.currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {mockCompanyData.name}
            </h1>
            <p className="text-sm text-slate-600">
              {mockCompanyData.description}
            </p>
          </div>
          {state.currentStep !== 'success' && state.currentStep !== 'service' && (
            <button
              onClick={() => {
                if (state.currentStep === 'confirmation') {
                  dispatch({ type: 'SET_STEP', payload: 'datetime' });
                } else {
                  dispatch({ type: 'SET_STEP', payload: 'service' });
                }
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-600" />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        {state.currentStep !== 'success' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                      index < stepIndex
                        ? 'bg-green-500 text-white'
                        : index === stepIndex
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {index < stepIndex ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        index < stepIndex ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 text-center">
              Etapa {stepIndex + 1} de {steps.length}: {steps[stepIndex]}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          {/* Step: Services */}
          {state.currentStep === 'service' && (
            <StepServices
              services={mockCompanyData.services}
              selectedService={state.selectedService}
              onSelectService={handleSelectService}
            />
          )}

          {/* Step: Date/Time */}
          {state.currentStep === 'datetime' && state.selectedService && (
            <div className="space-y-6">
              <StepDateTime
                availability={mockCompanyData.availability}
                selectedDate={state.selectedDate}
                selectedTime={state.selectedTime}
                onSelectDate={(date) =>
                  dispatch({ type: 'SELECT_DATE', payload: date })
                }
                onSelectTime={(time) =>
                  dispatch({ type: 'SELECT_TIME', payload: time })
                }
              />

              <button
                onClick={handleDateTimeNext}
                disabled={!state.selectedDate || !state.selectedTime}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Continuar para confirmação
              </button>
            </div>
          )}

          {/* Step: Confirmation */}
          {state.currentStep === 'confirmation' && (
            <StepConfirmation
              service={state.selectedService}
              date={state.selectedDate}
              time={state.selectedTime}
              clientData={state.clientData}
              onUpdateClientData={(data) =>
                dispatch({ type: 'UPDATE_CLIENT_DATA', payload: data })
              }
              onSubmit={handleConfirmBooking}
              isSubmitting={state.isSubmitting}
            />
          )}

          {/* Step: Success */}
          {state.currentStep === 'success' && (
            <div className="text-center py-12">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 size={64} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Agendamento Confirmado!
              </h2>
              <p className="text-slate-600 mb-6">
                Enviamos os detalhes para seu WhatsApp e e-mail
              </p>

              <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Serviço</p>
                  <p className="font-semibold text-slate-900">
                    {state.selectedService?.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Data</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(state.selectedDate + 'T00:00:00').toLocaleDateString(
                        'pt-BR'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Horário</p>
                    <p className="font-semibold text-slate-900">{state.selectedTime}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
              >
                Fazer outro agendamento
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>Dúvidas? Entre em contato pelo WhatsApp</p>
          <p className="font-semibold text-indigo-600 mt-1">📱 (11) 98765-4321</p>
        </div>
      </main>
    </div>
  );
};
