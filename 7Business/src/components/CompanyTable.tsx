import { Company } from '../types/company';

interface Props {
  companies: Company[];
  onEdit: (company: Company) => void;
  onConfig: (company: Company) => void;
  onToggleStatus: (company: Company) => void;
}

const nicheColors: Record<string, string> = {
  Beleza: 'bg-pink-500',
  Automotivo: 'bg-yellow-500',
  Saúde: 'bg-green-500',
  Consultoria: 'bg-indigo-600',
};

export function CompanyTable({ companies, onEdit, onConfig, onToggleStatus }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-slate-700">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Logo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Nicho</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={company.logoUrl} alt={company.nomeFantasia} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{company.nomeFantasia}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-white text-xs font-semibold ${nicheColors[company.niche]}`}>{company.niche}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      company.status === 'Ativo'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors text-sm"
                      onClick={() => onEdit(company)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
                      onClick={() => onConfig(company)}
                    >
                      Configurar
                    </button>
                    <label className="flex items-center cursor-pointer gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={company.status === 'Ativo'}
                        onChange={() => onToggleStatus(company)}
                        className="sr-only"
                      />
                      <span
                        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                          company.status === 'Ativo' ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                            company.status === 'Ativo' ? 'translate-x-5' : ''
                          }`}
                        ></span>
                      </span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {companies.length === 0 && (
        <div className="px-6 py-10 text-center text-slate-500">
          Nenhuma empresa cadastrada ainda.
        </div>
      )}
    </div>
  );
}
