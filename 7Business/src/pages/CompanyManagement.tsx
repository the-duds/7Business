import { useState } from 'react';
import { Company } from '../types/company';
import { CompanyTable } from '../components/CompanyTable';
import { CompanyForm } from '../components/CompanyForm';
import { mockCompanies } from '../mocks/company.mock';

export function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleConfig = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleToggleStatus = (company: Company) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id
          ? { ...c, status: c.status === 'Ativo' ? 'Pausado' : 'Ativo' }
          : c
      )
    );
  };

  const handleSubmit = (data: any) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === editingCompany.id ? { ...c, ...data } : c))
      );
    } else {
      setCompanies((prev) => [
        ...prev,
        { ...data, id: String(Date.now()) },
      ]);
    }
    setShowForm(false);
    setEditingCompany(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Gestao e Configuracao de Empresas</h1>
            <p className="text-slate-600 mt-2">
              Cadastre, edite e configure empresas com padrao visual consistente.
            </p>
          </div>
          <button
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={() => {
              setEditingCompany(null);
              setShowForm(true);
            }}
          >
            Nova Empresa
          </button>
        </div>
        <CompanyTable
          companies={companies}
          onEdit={handleEdit}
          onConfig={handleConfig}
          onToggleStatus={handleToggleStatus}
        />
      </div>
      {showForm && (
        <CompanyForm
          initialData={editingCompany || undefined}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
        />
      )}
    </div>
  );
}
