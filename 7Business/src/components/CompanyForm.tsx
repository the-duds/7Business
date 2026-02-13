import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company, BusinessNiche, WorkingHours } from '../types/company';
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
  const { control, handleSubmit, watch, setValue } = useForm<CompanyFormValues>({
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Dados Base */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-indigo-600 mb-4">Dados da Empresa</h2>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="nomeFantasia"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Nome Fantasia" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="documento"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="CNPJ/CPF" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Subdomínio/Slug" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Telefone (WhatsApp)" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="logoUrl"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} placeholder="Logo URL" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="niche"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <select {...field} className="bg-slate-800 text-white p-2 rounded">
                      <option value="Beleza">Beleza</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Consultoria">Consultoria</option>
                    </select>
                  )}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button type="button" className="bg-indigo-600 px-4 py-2 rounded text-white" onClick={() => setStep(2)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Configuração Dinâmica */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-indigo-600 mb-4">Configuração por Nicho</h2>
              {niche === 'Automotivo' && (
                <Controller
                  name="config.exigirPlacaVeiculo"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...field} checked={field.value || false} />
                      Exigir Placa do Veículo no agendamento
                    </label>
                  )}
                />
              )}
              {niche === 'Saúde' && (
                <Controller
                  name="config.exigirAnamnese"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...field} checked={field.value || false} />
                      Exigir preenchimento de Anamnese prévia
                    </label>
                  )}
                />
              )}
              <div className="mt-6 flex justify-between">
                <button type="button" className="bg-slate-700 px-4 py-2 rounded text-white" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button type="button" className="bg-indigo-600 px-4 py-2 rounded text-white" onClick={() => setStep(3)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Horário de Funcionamento */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-indigo-600 mb-4">Horário de Funcionamento</h2>
              <Controller
                name="workingHours.days"
                control={control}
                render={({ field }: { field: any }) => (
                  <div className="flex flex-wrap gap-2">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day) => (
                      <label key={day} className="flex items-center gap-1">
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
                    <input {...field} type="time" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
                <Controller
                  name="workingHours.closing"
                  control={control}
                  render={({ field }: { field: any }) => (
                    <input {...field} type="time" className="bg-slate-800 text-white p-2 rounded" />
                  )}
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button type="button" className="bg-slate-700 px-4 py-2 rounded text-white" onClick={() => setStep(2)}>
                  Voltar
                </button>
                <button type="submit" className="bg-indigo-600 px-4 py-2 rounded text-white">
                  Salvar
                </button>
              </div>
            </div>
          )}
        </form>
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
