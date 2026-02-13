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
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">Gestão e Configuração de Empresas</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white"
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
