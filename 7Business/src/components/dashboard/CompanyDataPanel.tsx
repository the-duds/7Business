import React, { useMemo, useState } from 'react';
import { ServicesManager } from './ServicesManager';
import { ProductsManager } from './ProductsManager';
import { EmployeesManager } from './EmployeesManager';

interface CompanyDataPanelProps {
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export const CompanyDataPanel: React.FC<CompanyDataPanelProps> = ({ branding }) => {
  const [tab, setTab] = useState<'services' | 'products' | 'employees'>('services');
  const [services, setServices] = useState<string[]>(['Corte', 'Coloracao']);

  const tabs = useMemo(
    () => [
      { id: 'services', label: 'Servicos' },
      { id: 'products', label: 'Produtos' },
      { id: 'employees', label: 'Funcionarios' },
    ],
    []
  );

  const accentStyle = branding ? { background: branding.primaryColor, color: '#fff' } : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((item) => (
          <button
            key={item.id}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              tab === item.id ? 'text-white border-transparent' : 'text-slate-600 border-slate-200'
            }`}
            style={tab === item.id ? accentStyle : undefined}
            onClick={() => setTab(item.id as typeof tab)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'services' && (
        <ServicesManager
          branding={branding}
          onServicesChange={(items) => setServices(items.map((service) => service.name))}
        />
      )}

      {tab === 'products' && <ProductsManager branding={branding} />}

      {tab === 'employees' && <EmployeesManager branding={branding} services={services} />}
    </div>
  );
};
