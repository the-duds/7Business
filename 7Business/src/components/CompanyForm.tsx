import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '../types/company';
import { useState } from 'react';

const companySchema = z.object({
  nomeFantasia: z.string().min(2),
  documento: z.string().min(11),
  slug: z.string().min(2),
  telefone: z.string().min(8),
  niche: z.enum(['Beleza', 'Automotivo', 'Saúde', 'Consultoria']),
  status: z.enum(['Ativo', 'Pausado']),
  logoUrl: z.string().url(),
  config: z.object({
    exigirPlacaVeiculo: z.boolean().optional(),
    exigirAnamnese: z.boolean().optional(),
  }),
  workingHours: z.object({
    days: z.array(z.string()),
    opening: z.string(),
    closing: z.string(),
  }),
});

type CompanyFormValues = z.infer<typeof companySchema>;

interface Props {
  initialData?: Company;
  onSubmit: (data: CompanyFormValues) => void;
  onClose: () => void;
}

export function CompanyForm({ initialData, onSubmit, onClose }: Props) {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: initialData || {
      nomeFantasia: '',
      documento: '',
      slug: '',
      telefone: '',
      niche: 'Beleza',
      status: 'Ativo',
      logoUrl: '',
      config: {},
      workingHours: {
        days: [],
        opening: '',
        closing: '',
      },
    },
  });

  const niche = watch('niche');
  const inputClassName =
    'bg-slate-50 text-slate-900 p-2.5 rounded-lg w-full border border-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-300';
  const selectClassName =
    'bg-slate-50 text-slate-900 p-2.5 rounded-lg w-full border border-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-300';
  const timeInputClassName =
    'bg-slate-50 text-slate-900 p-2.5 rounded-lg w-full border border-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-300';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 border border-slate-200 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Dados Base */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Dados da Empresa</h2>
              <p className="text-slate-600 mb-4">Informacoes principais da empresa.</p>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="nomeFantasia"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Nome Fantasia" className={inputClassName} />
                  )}
                />
                <Controller
                  name="documento"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="CNPJ/CPF" className={inputClassName} />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Subdominio/Slug" className={inputClassName} />
                  )}
                />
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Telefone (WhatsApp)" className={inputClassName} />
                  )}
                />
                <Controller
                  name="logoUrl"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Logo URL" className={inputClassName} />
                  )}
                />
                <Controller
                  name="niche"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <select {...field} className={selectClassName}>
                      <option value="Beleza">Beleza</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Consultoria">Consultoria</option>
                    </select>
                  )}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  onClick={() => setStep(2)}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Configuração Dinâmica */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Configuracao por Nicho</h2>
              <p className="text-slate-600 mb-4">Ajustes extras de acordo com o segmento.</p>
              {niche === 'Automotivo' && (
                <Controller
                  name="config.exigirPlacaVeiculo"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <label className="flex items-center gap-2 text-slate-700">
                      <input type="checkbox" {...field} checked={field.value || false} className="h-4 w-4" />
                      Exigir Placa do Veiculo no agendamento
                    </label>
                  )}
                />
              )}
              {niche === 'Saúde' && (
                <Controller
                  name="config.exigirAnamnese"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <label className="flex items-center gap-2 text-slate-700">
                      <input type="checkbox" {...field} checked={field.value || false} className="h-4 w-4" />
                      Exigir preenchimento de Anamnese previa
                    </label>
                  )}
                />
              )}
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  onClick={() => setStep(3)}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Horário de Funcionamento */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Horario de Funcionamento</h2>
              <p className="text-slate-600 mb-4">Defina os dias e horarios disponiveis.</p>
              <Controller
                name="workingHours.days"
                control={control}
                render={({ field }: { field: any }) => (
                  <div className="flex flex-wrap gap-2">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day) => (
                      <label key={day} className="flex items-center gap-1 text-slate-700">
                        <input
                          type="checkbox"
                          checked={field.value.includes(day)}
                          onChange={() => {
                            if (field.value.includes(day)) {
                              field.onChange(field.value.filter((d: string) => d !== day));
                            } else {
                              field.onChange([...field.value, day]);
                            }
                          }}
                          className="h-4 w-4"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Controller
                  name="workingHours.opening"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} type="time" className={timeInputClassName} />
                  )}
                />
                <Controller
                  name="workingHours.closing"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} type="time" className={timeInputClassName} />
                  )}
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  onClick={() => setStep(2)}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </form>
        <button className="absolute top-4 right-4 text-slate-500" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
