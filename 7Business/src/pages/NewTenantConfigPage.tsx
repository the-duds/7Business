import { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const tenantSchema = z.object({
  nomeFantasia: z.string().min(2, 'Obrigatório'),
  documento: z.string().min(11, 'Obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(8, 'Obrigatório'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Use apenas letras minúsculas, números e hífens'),
  corPrimaria: z.string().regex(/^#([0-9a-fA-F]{6})$/, 'Hex inválido'),
  corSecundaria: z.string().regex(/^#([0-9a-fA-F]{6})$/, 'Hex inválido'),
  logoUrl: z.string().url('URL inválida'),
  niche: z.enum(['Beleza', 'Automotivo', 'Saúde']),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

const defaultValues: TenantFormValues = {
  nomeFantasia: '',
  documento: '',
  email: '',
  whatsapp: '',
  slug: '',
  corPrimaria: '#6366f1',
  corSecundaria: '#0f172a',
  logoUrl: '',
  niche: 'Beleza',
};

export function NewTenantConfigPage() {
  const [showPreview, setShowPreview] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues,
  });
  const values = watch();
  const inputClassName =
    'bg-slate-50 text-slate-900 p-2.5 rounded-lg w-full border border-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-300';
  const selectClassName =
    'bg-slate-50 text-slate-900 p-2.5 rounded-lg w-full border border-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-300';
  const colorInputClassName =
    'w-10 h-10 ml-2 border-none bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-indigo-500';

  const onSubmit = (data: TenantFormValues) => {
    console.log('Novo Tenant:', data);
    alert('Tenant cadastrado! (verifique o console)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center py-12">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Configuracao de Novo Tenant</h1>
        <p className="text-slate-600 mb-8">Defina dados do negocio e padrao visual do tenant.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dados do Negócio */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Dados do Negocio</h2>
            <Controller name="nomeFantasia" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="Nome Fantasia" className={inputClassName} />
                {errors.nomeFantasia && <span className="text-red-500 text-xs">{errors.nomeFantasia.message}</span>}
              </div>
            )} />
            <Controller name="documento" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="CNPJ/CPF" className={inputClassName} />
                {errors.documento && <span className="text-red-500 text-xs">{errors.documento.message}</span>}
              </div>
            )} />
            <Controller name="email" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="E-mail do proprietario" className={inputClassName} />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
            )} />
            <Controller name="whatsapp" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="WhatsApp de contato" className={inputClassName} />
                {errors.whatsapp && <span className="text-red-500 text-xs">{errors.whatsapp.message}</span>}
              </div>
            )} />
          </div>

          {/* Customização White-label e Configs */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Customizacao White-label</h2>
            <Controller name="slug" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="Slug da URL (ex: minha-clinica)" className={inputClassName} />
                <span className="text-xs text-slate-500">URL: 7business.com.br/<span className="text-indigo-600">{field.value || 'slug'}</span></span>
                {errors.slug && <span className="text-red-500 text-xs block">{errors.slug.message}</span>}
              </div>
            )} />
            <div className="flex gap-4">
              <Controller name="corPrimaria" control={control} render={({ field }) => (
                <div>
                  <label className="text-slate-600 text-xs">Cor Primaria</label>
                  <input {...field} type="color" className={colorInputClassName} />
                  {errors.corPrimaria && <span className="text-red-500 text-xs block">{errors.corPrimaria.message}</span>}
                </div>
              )} />
              <Controller name="corSecundaria" control={control} render={({ field }) => (
                <div>
                  <label className="text-slate-600 text-xs">Cor Secundaria</label>
                  <input {...field} type="color" className={colorInputClassName} />
                  {errors.corSecundaria && <span className="text-red-500 text-xs block">{errors.corSecundaria.message}</span>}
                </div>
              )} />
            </div>
            <Controller name="logoUrl" control={control} render={({ field }) => (
              <div>
                <input {...field} placeholder="URL da Logo" className={inputClassName} />
                {errors.logoUrl && <span className="text-red-500 text-xs">{errors.logoUrl.message}</span>}
              </div>
            )} />
            <Controller name="niche" control={control} render={({ field }) => (
              <div>
                <select {...field} className={selectClassName}>
                  <option value="Beleza">Beleza</option>
                  <option value="Automotivo">Automotivo</option>
                  <option value="Saúde">Saúde</option>
                </select>
                {errors.niche && <span className="text-red-500 text-xs">{errors.niche.message}</span>}
              </div>
            )} />
          </div>

          {/* Ações */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              onClick={() => setShowPreview(true)}
            >
              Visualizar Preview
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Salvar Tenant
            </button>
          </div>
        </form>
      </div>
      {/* Preview Card */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs relative flex flex-col items-center border border-slate-200"
            style={{ borderTop: `6px solid ${values.corPrimaria}` }}
          >
            <img
              src={values.logoUrl || 'https://placehold.co/80x80?text=Logo'}
              alt="Logo"
              className="w-20 h-20 rounded-full mb-4 bg-white object-contain"
            />
            <h3 className="text-lg font-bold mb-2" style={{ color: values.corPrimaria }}>
              {values.nomeFantasia || 'Nome Fantasia'}
            </h3>
            <span className="text-xs mb-2 px-2 py-1 rounded" style={{ background: values.corSecundaria, color: '#fff' }}>
              {values.niche}
            </span>
            <span className="text-slate-500 text-xs mb-4">7business.com.br/{values.slug || 'slug'}</span>
            <button className="absolute top-2 right-4 text-slate-500" onClick={() => setShowPreview(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
