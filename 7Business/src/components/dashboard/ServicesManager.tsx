import React, { useMemo, useState } from 'react';
import type { ServiceItem } from './companyDataStore';

interface ServicesManagerProps {
  services: ServiceItem[];
  onServicesChange: (services: ServiceItem[]) => void;
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  onServicesChange,
  branding,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    duration: 30,
    price: 0,
    status: 'Ativo' as ServiceItem['status'],
  });
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const activeCount = useMemo(
    () => services.filter((service) => service.status === 'Ativo').length,
    [services]
  );

  const filteredServices = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return services;
    }
    return services.filter((service) => service.name.toLowerCase().includes(normalized));
  }, [services, query]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', duration: 30, price: 0, status: 'Ativo' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      status: service.status,
    });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Nome do servico e obrigatorio.');
      return;
    }

    setError('');
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (editingId) {
      onServicesChange(
        services.map((service) =>
          service.id === editingId
            ? {
                ...service,
                name: form.name.trim(),
                duration: Number(form.duration),
                price: Number(form.price),
                status: form.status,
              }
            : service
        )
      );
    } else {
      onServicesChange([
        ...services,
        {
          id: `s_${Date.now()}`,
          name: form.name.trim(),
          duration: Number(form.duration),
          price: Number(form.price),
          status: form.status,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleToggleStatus = (serviceId: string) => {
    onServicesChange(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, status: service.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : service
      )
    );
  };

  const accentStyle = branding ? { background: branding.primaryColor } : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Servicos</h3>
          <p className="text-sm text-slate-500">{activeCount} servicos ativos.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar servico..."
            className="w-56 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg text-white font-semibold"
            style={accentStyle}
          >
            Novo Servico
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Servico</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Duracao</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Preco</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.id} className="border-t border-slate-100">
                <td className="px-6 py-4 text-sm text-slate-900">{service.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{service.duration} min</td>
                <td className="px-6 py-4 text-sm text-slate-600">R$ {service.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      service.status === 'Ativo'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm"
                      onClick={() => openEdit(service)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm"
                      onClick={() => handleToggleStatus(service.id)}
                    >
                      {service.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredServices.length === 0 && (
              <tr className="border-t border-slate-100">
                <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                  Nenhum servico encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-1">
              {editingId ? 'Editar Servico' : 'Novo Servico'}
            </h4>
            <p className="text-sm text-slate-500 mb-4">Cadastre os servicos ofertados.</p>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700">
                Nome do Servico
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Duracao (min)
                <input
                  type="number"
                  value={form.duration}
                  onChange={(event) => setForm({ ...form, duration: Number(event.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Preco (R$)
                <input
                  type="number"
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value as ServiceItem['status'] })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </label>
              {error && <div className="text-sm text-red-600">{error}</div>}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-white"
                style={accentStyle}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
