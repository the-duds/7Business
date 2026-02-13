import React, { useMemo, useState } from 'react';
import type { EmployeeItem } from './companyDataStore';

interface EmployeesManagerProps {
  employees: EmployeeItem[];
  onEmployeesChange: (employees: EmployeeItem[]) => void;
  services: string[];
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export const EmployeesManager: React.FC<EmployeesManagerProps> = ({
  employees,
  onEmployeesChange,
  services,
  branding,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    services: [] as string[],
    status: 'Ativo' as EmployeeItem['status'],
  });
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const serviceOptions = useMemo(() => services.slice().sort(), [services]);

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return employees;
    }
    return employees.filter((employee) => {
      const servicesLabel = employee.services.join(' ').toLowerCase();
      return (
        employee.name.toLowerCase().includes(normalized) ||
        employee.role.toLowerCase().includes(normalized) ||
        servicesLabel.includes(normalized)
      );
    });
  }, [employees, query]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', role: '', services: [], status: 'Ativo' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (employee: EmployeeItem) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      role: employee.role,
      services: employee.services,
      status: employee.status,
    });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Nome do funcionario e obrigatorio.');
      return;
    }

    setError('');
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (editingId) {
      onEmployeesChange(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...employee, ...form, name: form.name.trim() }
            : employee
        )
      );
    } else {
      onEmployeesChange([
        ...employees,
        {
          id: `e_${Date.now()}`,
          ...form,
          name: form.name.trim(),
        },
      ]);
    }

    setShowModal(false);
  };

  const handleToggleStatus = (employeeId: string) => {
    onEmployeesChange(
      employees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: employee.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : employee
      )
    );
  };

  const toggleService = (serviceName: string) => {
    setForm((prev) => {
      if (prev.services.includes(serviceName)) {
        return { ...prev, services: prev.services.filter((service) => service !== serviceName) };
      }
      return { ...prev, services: [...prev.services, serviceName] };
    });
  };

  const accentStyle = branding ? { background: branding.primaryColor } : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Funcionarios</h3>
          <p className="text-sm text-slate-500">Controle equipe e especialidades.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar funcionario..."
            className="w-56 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg text-white font-semibold"
            style={accentStyle}
          >
            Novo Funcionario
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Funcao</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Servicos</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-t border-slate-100">
                <td className="px-6 py-4 text-sm text-slate-900">{employee.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{employee.role}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {employee.services.length ? employee.services.join(', ') : 'Sem servicos'}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      employee.status === 'Ativo'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm"
                      onClick={() => openEdit(employee)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm"
                      onClick={() => handleToggleStatus(employee.id)}
                    >
                      {employee.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr className="border-t border-slate-100">
                <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                  Nenhum funcionario encontrado.
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
              {editingId ? 'Editar Funcionario' : 'Novo Funcionario'}
            </h4>
            <p className="text-sm text-slate-500 mb-4">Atualize o time da empresa.</p>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700">
                Nome
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Funcao
                <input
                  type="text"
                  value={form.role}
                  onChange={(event) => setForm({ ...form, role: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                />
              </label>
              <div>
                <p className="text-sm font-semibold text-slate-700">Servicos executados</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        form.services.includes(service)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                      style={
                        form.services.includes(service) && branding
                          ? { background: branding.primaryColor, borderColor: branding.primaryColor }
                          : undefined
                      }
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
              <label className="text-sm font-semibold text-slate-700">
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value as EmployeeItem['status'] })
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
