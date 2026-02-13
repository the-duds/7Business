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
    <div className="bg-slate-900 rounded-lg p-6 shadow-lg">
      <table className="min-w-full text-slate-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Logo</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Nicho</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border-b border-slate-700">
              <td className="px-4 py-2">
                <img src={company.logoUrl} alt={company.nomeFantasia} className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2">{company.nomeFantasia}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white ${nicheColors[company.niche]}`}>{company.niche}</span>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded ${company.status === 'Ativo' ? 'bg-indigo-600' : 'bg-slate-700'}`}>{company.status}</span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-white"
                  onClick={() => onEdit(company)}
                >
                  Editar
                </button>
                <button
                  className="bg-slate-700 hover:bg-slate-800 px-3 py-1 rounded text-white"
                  onClick={() => onConfig(company)}
                >
                  Configurar
                </button>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={company.status === 'Ativo'}
                    onChange={() => onToggleStatus(company)}
                    className="sr-only"
                  />
                  <span className={`w-10 h-5 flex items-center bg-slate-700 rounded-full p-1 transition ${company.status === 'Ativo' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    <span className={`bg-white w-4 h-4 rounded-full shadow transform transition ${company.status === 'Ativo' ? 'translate-x-5' : ''}`}></span>
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
