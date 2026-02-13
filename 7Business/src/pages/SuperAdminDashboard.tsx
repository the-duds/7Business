import { Shield, Users, TrendingUp, Settings, LogIn, Plus, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Company } from '@/types/company';
import { mockCompanies } from '../mocks/company.mock';

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
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
    logoUrl: '/logos/beleza.png',
    primaryColor: '#ec4899',
    secondaryColor: '#111827',
    niche: 'Beleza',
    joinDate: '2023-01-01',
    plan: 'Free',
    status: 'Ativo',
  },
  {
    id: '2',
    name: 'Automotivo',
    subdomain: 'automotivo',
    logoUrl: '/logos/oficina.png',
    primaryColor: '#f59e0b',
    secondaryColor: '#0f172a',
    niche: 'Automotivo',
    joinDate: '2023-02-01',
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '3',
    name: 'Saúde',
    subdomain: 'saude',
    logoUrl: '/logos/saude.png',
    primaryColor: '#22c55e',
    secondaryColor: '#0f172a',
    niche: 'Saúde',
    joinDate: '2023-03-01',
    plan: 'Free',
    status: 'Ativo',
  },
  {
    id: '4',
    name: 'Consultoria',
    subdomain: 'consultoria',
    logoUrl: '/logos/consultoria.png',
    primaryColor: '#6366f1',
    secondaryColor: '#111827',
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

interface SuperAdminDashboardProps {
  onAccessCompany: (company: Company) => void;
}

const resolveCompanyForTenant = (tenant: Tenant): Company => {
  const found = mockCompanies.find(
    (company) =>
      company.slug === tenant.subdomain ||
      company.nomeFantasia.toLowerCase() === tenant.name.toLowerCase() ||
      company.niche === tenant.niche
  );

  if (found) {
    return found;
  }

  return {
    id: tenant.id,
    logoUrl: tenant.logoUrl || '/logos/placeholder.png',
    nomeFantasia: tenant.name,
    documento: '00.000.000/0000-00',
    slug: tenant.subdomain,
    telefone: '+55 11 00000-0000',
    niche: tenant.niche,
    status: tenant.status === 'Ativo' ? 'Ativo' : 'Pausado',
    config: {},
    workingHours: {
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      opening: '09:00',
      closing: '18:00',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export function SuperAdminDashboard({ onAccessCompany }: SuperAdminDashboardProps) {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTenantId, setEditingTenantId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [newTenant, setNewTenant] = useState({
    name: '',
    subdomain: '',
    logoUrl: '',
    primaryColor: '#6366f1',
    secondaryColor: '#0f172a',
    niche: 'Beleza',
    joinDate: '',
    plan: 'Free',
    status: 'Ativo',
  });

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3500);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleAccessCompany = (tenant: Tenant) => {
    const company = resolveCompanyForTenant(tenant);
    onAccessCompany(company);
  };

  const handleToggleStatus = (tenantId: string) => {
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === tenantId
          ? { ...tenant, status: tenant.status === 'Ativo' ? 'Suspenso' : 'Ativo' }
          : tenant
      )
    );
  };

  const handleAddTenant = () => {
    const errors: Record<string, string> = {};
    const trimmedName = newTenant.name.trim();
    const trimmedSubdomain = newTenant.subdomain.trim();
    const trimmedLogoUrl = newTenant.logoUrl.trim();
    const slugPattern = /^[a-z0-9-]+$/;
    const hexPattern = /^#([0-9a-fA-F]{6})$/;

    if (!trimmedName) {
      errors.name = 'Nome da empresa e obrigatorio.';
    }

    if (!trimmedSubdomain) {
      errors.subdomain = 'Subdominio e obrigatorio.';
    } else if (!slugPattern.test(trimmedSubdomain)) {
      errors.subdomain = 'Use apenas letras minusculas, numeros e hifen.';
    }

    if (trimmedLogoUrl) {
      try {
        new URL(trimmedLogoUrl);
      } catch {
        errors.logoUrl = 'Logo URL invalida.';
      }
    }

    if (!hexPattern.test(newTenant.primaryColor)) {
      errors.primaryColor = 'Cor primaria deve ser HEX (ex: #6366f1).';
    }

    if (!hexPattern.test(newTenant.secondaryColor)) {
      errors.secondaryColor = 'Cor secundaria deve ser HEX (ex: #0f172a).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    if (editingTenantId) {
      setTenants((prev) =>
        prev.map((tenant) =>
          tenant.id === editingTenantId
            ? {
                ...tenant,
                name: trimmedName,
                subdomain: trimmedSubdomain,
                logoUrl: trimmedLogoUrl || tenant.logoUrl,
                primaryColor: newTenant.primaryColor,
                secondaryColor: newTenant.secondaryColor,
                niche: newTenant.niche as Tenant['niche'],
                plan: newTenant.plan as Tenant['plan'],
                status: newTenant.status as Tenant['status'],
              }
            : tenant
        )
      );
      const updatedTenant = {
        ...newTenant,
        id: editingTenantId,
        name: trimmedName,
        subdomain: trimmedSubdomain,
        logoUrl: trimmedLogoUrl,
      } as Tenant;
      saveTenantBranding(updatedTenant);
      setSuccessMessage('Empresa atualizada com sucesso.');
    } else {
      const createdTenant = {
        ...newTenant,
        name: trimmedName,
        subdomain: trimmedSubdomain,
        logoUrl: trimmedLogoUrl,
        id: String(Date.now()),
        joinDate: new Date().toISOString().split('T')[0],
      } as Tenant;
      setTenants((prev) => [
        ...prev,
        createdTenant,
      ]);
      saveTenantBranding(createdTenant);
      setSuccessMessage('Empresa cadastrada com sucesso.');
    }
    setShowModal(false);
    setEditingTenantId(null);
    setNewTenant({
      name: '',
      subdomain: '',
      logoUrl: '',
      primaryColor: '#6366f1',
      secondaryColor: '#0f172a',
      niche: 'Beleza',
      joinDate: '',
      plan: 'Free',
      status: 'Ativo',
    });
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenantId(tenant.id);
    setFormErrors({});
    setNewTenant({
      name: tenant.name,
      subdomain: tenant.subdomain,
      logoUrl: tenant.logoUrl,
      primaryColor: tenant.primaryColor,
      secondaryColor: tenant.secondaryColor,
      niche: tenant.niche,
      joinDate: tenant.joinDate,
      plan: tenant.plan,
      status: tenant.status,
    });
    setShowModal(true);
  };

  const saveTenantBranding = (tenant: Tenant) => {
    const stored = localStorage.getItem('tenantBranding');
    let brandingMap: Record<string, { name: string; logoUrl: string; primaryColor: string; secondaryColor: string }> = {};

    if (stored) {
      try {
        brandingMap = JSON.parse(stored);
      } catch {
        brandingMap = {};
      }
    }

    brandingMap[tenant.subdomain] = {
      name: tenant.name,
      logoUrl: tenant.logoUrl,
      primaryColor: tenant.primaryColor,
      secondaryColor: tenant.secondaryColor,
    };

    localStorage.setItem('tenantBranding', JSON.stringify(brandingMap));
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar/Header */}
      <aside className="w-64 bg-slate-950 flex flex-col items-center py-8 shadow-lg">
        <Shield className="w-12 h-12 text-indigo-600 mb-4" />
        <h1 className="text-xl font-bold text-indigo-600 mb-2">7Business</h1>
        <span className="text-slate-300 mb-8">Centro de Comando</span>
        <div className="mt-auto flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
          <Settings className="w-6 h-6 text-slate-400" />
        </div>
      </aside>
      <main className="flex-1 p-8">
        {successMessage && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
            <div className="flex items-center justify-between gap-4">
              <span>{successMessage}</span>
              <button
                className="text-emerald-700 hover:text-emerald-900"
                onClick={() => setSuccessMessage('')}
              >
                ✕
              </button>
            </div>
          </div>
        )}
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
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded text-white text-sm"
                        onClick={() => handleEditTenant(tenant)}
                      >
                        Editar
                      </button>
                      <button
                        className={`px-3 py-1.5 rounded text-white text-sm flex items-center gap-2 transition ${
                          tenant.status === 'Suspenso'
                            ? 'bg-amber-700 hover:bg-amber-600'
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={tenant.status === 'Suspenso' ? 'Acessar mesmo com empresa suspensa' : 'Acessar empresa'}
                        onClick={() => handleAccessCompany(tenant)}
                      >
                        <LogIn className="w-4 h-4 text-indigo-300" />
                        Acessar
                      </button>
                      {tenant.status === 'Suspenso' && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          Bloqueado
                        </span>
                      )}
                      <button
                        className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded text-white text-sm"
                        onClick={() => handleToggleStatus(tenant.id)}
                      >
                        {tenant.status === 'Ativo' ? 'Desabilitar' : 'Ativar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal de Novo Cadastro */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {editingTenantId ? 'Editar Empresa' : 'Novo Cadastro de Empresa'}
              </h2>
              <p className="text-slate-600 mb-4">
                {editingTenantId
                  ? 'Atualize os dados, status e plano da empresa.'
                  : 'Preencha os dados principais do tenant.'}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm font-semibold text-slate-700">
                  Nome da Empresa
                  <input
                    type="text"
                    placeholder="Nome da Empresa"
                    value={newTenant.name}
                    onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </label>
                {formErrors.name && (
                  <span className="text-sm text-red-600">{formErrors.name}</span>
                )}
                <label className="text-sm font-semibold text-slate-700">
                  Subdominio
                  <input
                    type="text"
                    placeholder="Subdominio"
                    value={newTenant.subdomain}
                    onChange={e => setNewTenant({ ...newTenant, subdomain: e.target.value })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </label>
                {formErrors.subdomain && (
                  <span className="text-sm text-red-600">{formErrors.subdomain}</span>
                )}
                <label className="text-sm font-semibold text-slate-700">
                  Logo URL
                  <input
                    type="text"
                    placeholder="Logo URL"
                    value={newTenant.logoUrl}
                    onChange={e => setNewTenant({ ...newTenant, logoUrl: e.target.value })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </label>
                {formErrors.logoUrl && (
                  <span className="text-sm text-red-600">{formErrors.logoUrl}</span>
                )}
                <div className="flex flex-wrap gap-4">
                  <label className="text-sm font-semibold text-slate-700">
                    Cor Primaria
                    <input
                      type="color"
                      value={newTenant.primaryColor}
                      onChange={e => setNewTenant({ ...newTenant, primaryColor: e.target.value })}
                      className="mt-1 h-10 w-10 rounded border border-slate-200"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Cor Secundaria
                    <input
                      type="color"
                      value={newTenant.secondaryColor}
                      onChange={e => setNewTenant({ ...newTenant, secondaryColor: e.target.value })}
                      className="mt-1 h-10 w-10 rounded border border-slate-200"
                    />
                  </label>
                </div>
                {formErrors.primaryColor && (
                  <span className="text-sm text-red-600">{formErrors.primaryColor}</span>
                )}
                {formErrors.secondaryColor && (
                  <span className="text-sm text-red-600">{formErrors.secondaryColor}</span>
                )}
                <div className="text-xs text-slate-500">
                  URL de login: {newTenant.subdomain ? `/login?tenant=${newTenant.subdomain}` : '/login?tenant=slug'}
                </div>
                <label className="text-sm font-semibold text-slate-700">
                  Nicho
                  <select
                    value={newTenant.niche}
                    onChange={e => setNewTenant({ ...newTenant, niche: e.target.value as Tenant['niche'] })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Beleza">Beleza</option>
                    <option value="Automotivo">Automotivo</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Consultoria">Consultoria</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Plano
                  <select
                    value={newTenant.plan}
                    onChange={e => setNewTenant({ ...newTenant, plan: e.target.value as Tenant['plan'] })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Pro">Pro</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Status
                  <select
                    value={newTenant.status}
                    onChange={e => setNewTenant({ ...newTenant, status: e.target.value as Tenant['status'] })}
                    className="mt-1 w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Suspenso">Suspenso</option>
                  </select>
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTenantId(null);
                    setFormErrors({});
                    setNewTenant({
                      name: '',
                      subdomain: '',
                      logoUrl: '',
                      primaryColor: '#6366f1',
                      secondaryColor: '#0f172a',
                      niche: 'Beleza',
                      joinDate: '',
                      plan: 'Free',
                      status: 'Ativo',
                    });
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  onClick={handleAddTenant}
                >
                  {editingTenantId ? 'Salvar Alteracoes' : 'Salvar'}
                </button>
              </div>
              <button
                className="absolute top-4 right-4 text-slate-500"
                onClick={() => {
                  setShowModal(false);
                  setEditingTenantId(null);
                  setFormErrors({});
                  setNewTenant({
                    name: '',
                    subdomain: '',
                    logoUrl: '',
                    primaryColor: '#6366f1',
                    secondaryColor: '#0f172a',
                    niche: 'Beleza',
                    joinDate: '',
                    plan: 'Free',
                    status: 'Ativo',
                  });
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
