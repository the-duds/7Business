import { Shield, Users, TrendingUp, Settings, LogIn, Plus } from 'lucide-react';
import { useState } from 'react';
import { mockCompanies } from '../mocks/company.mock';

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  niche: 'Beleza' | 'Automotivo' | 'Saúde' | 'Consultoria';
  joinDate: string;
  plan: 'Free' | 'Pro';
  status: 'Ativo' | 'Suspenso';
}

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Beleza',
    subdomain: 'beleza',
    niche: 'Beleza',
    joinDate: '2023-01-01',
    plan: 'Free',
    status: 'Ativo',
  },
  {
    id: '2',
    name: 'Automotivo',
    subdomain: 'automotivo',
    niche: 'Automotivo',
    joinDate: '2023-02-01',
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '3',
    name: 'Saúde',
    subdomain: 'saude',
    niche: 'Saúde',
    joinDate: '2023-03-01',
    plan: 'Free',
    status: 'Ativo',
  },
  {
    id: '4',
    name: 'Consultoria',
    subdomain: 'consultoria',
    niche: 'Consultoria',
    joinDate: '2023-04-01',
    plan: 'Pro',
    status: 'Ativo',
  },
];

const metricCards = [
  { icon: Users, label: 'Total de Empresas', value: 42 },
  { icon: TrendingUp, label: 'MRR (Receita Mensal)', value: 'R$ 18.500' },
  { icon: Shield, label: 'Total de Agendamentos', value: 1240 },
];

const badgeColors: Record<string, string> = {
  Beleza: 'bg-pink-500',
  Automotivo: 'bg-yellow-500',
  Saúde: 'bg-green-500',
  Consultoria: 'bg-indigo-600',
};

// const mockTenants: Tenant[] = mockCompanies;

export function SuperAdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    subdomain: '',
    niche: 'Beleza',
    joinDate: '',
    plan: 'Free',
    status: 'Ativo',
  });

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImpersonate = (tenant: Tenant) => {
    alert(`Simulando login como: ${tenant.name}`);
    console.log('Impersonate:', tenant);
  };

  const handleAddTenant = () => {
    setTenants(prev => [
      ...prev,
      {
        ...newTenant,
        id: String(Date.now()),
        joinDate: new Date().toISOString().split('T')[0],
      } as Tenant,
    ]);
    setShowModal(false);
    setNewTenant({
      name: '',
      subdomain: '',
      niche: 'Beleza',
      joinDate: '',
      plan: 'Free',
      status: 'Ativo',
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar/Header */}
      <aside className="w-64 bg-slate-950 flex flex-col items-center py-8 shadow-lg">
        <Shield className="w-12 h-12 text-indigo-600 mb-4" />
        <h1 className="text-xl font-bold text-indigo-600 mb-2">7Business</h1>
        <span className="text-slate-300 mb-8">Centro de Comando</span>
        <Settings className="w-6 h-6 text-slate-400 mt-auto mb-4" />
      </aside>
      <main className="flex-1 p-8">
        {/* Métricas */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {metricCards.map((card, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-6 flex items-center gap-4 shadow">
              <card.icon className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="text-slate-100 text-lg font-bold">{card.value}</div>
                <div className="text-slate-400 text-sm">{card.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar empresa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-slate-800 text-white rounded px-4 py-2 w-64"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" /> Novo Cadastro
          </button>
        </div>
        {/* Tabela de Tenants */}
        <div className="bg-slate-900 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-slate-100">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Empresa</th>
                <th className="px-4 py-2 text-left">Subdomínio</th>
                <th className="px-4 py-2 text-left">Nicho</th>
                <th className="px-4 py-2 text-left">Data de Adesão</th>
                <th className="px-4 py-2 text-left">Plano</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map(tenant => (
                <tr key={tenant.id} className="border-b border-slate-800">
                  <td className="px-4 py-2">{tenant.name}</td>
                  <td className="px-4 py-2">/{tenant.subdomain}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-white ${badgeColors[tenant.niche]}`}>{tenant.niche}</span>
                  </td>
                  <td className="px-4 py-2">{tenant.joinDate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded ${tenant.plan === 'Pro' ? 'bg-indigo-600' : 'bg-slate-700'}`}>{tenant.plan}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded ${tenant.status === 'Ativo' ? 'bg-green-600' : 'bg-slate-700'}`}>{tenant.status}</span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-slate-800 hover:bg-slate-700 p-2 rounded"
                      title="Impersonate"
                      onClick={() => handleImpersonate(tenant)}
                    >
                      <LogIn className="w-5 h-5 text-indigo-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal de Novo Cadastro */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-md p-8 relative">
              <h2 className="text-xl font-bold text-indigo-600 mb-4">Novo Cadastro de Empresa</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Nome da Empresa"
                  value={newTenant.name}
                  onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                  className="bg-slate-800 text-white p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Subdomínio"
                  value={newTenant.subdomain}
                  onChange={e => setNewTenant({ ...newTenant, subdomain: e.target.value })}
                  className="bg-slate-800 text-white p-2 rounded"
                />
                <select
                  value={newTenant.niche}
                  onChange={e => setNewTenant({ ...newTenant, niche: e.target.value as Tenant['niche'] })}
                  className="bg-slate-800 text-white p-2 rounded"
                >
                  <option value="Beleza">Beleza</option>
                  <option value="Automotivo">Automotivo</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Consultoria">Consultoria</option>
                </select>
                <select
                  value={newTenant.plan}
                  onChange={e => setNewTenant({ ...newTenant, plan: e.target.value as Tenant['plan'] })}
                  className="bg-slate-800 text-white p-2 rounded"
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                </select>
                <select
                  value={newTenant.status}
                  onChange={e => setNewTenant({ ...newTenant, status: e.target.value as Tenant['status'] })}
                  className="bg-slate-800 text-white p-2 rounded"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Suspenso">Suspenso</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="bg-slate-700 px-4 py-2 rounded text-white"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-indigo-600 px-4 py-2 rounded text-white"
                  onClick={handleAddTenant}
                >
                  Salvar
                </button>
              </div>
              <button className="absolute top-4 right-4 text-white" onClick={() => setShowModal(false)}>✕</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
