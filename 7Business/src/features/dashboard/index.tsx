import React from 'react';
import DashboardCard from './components/DashboardCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard title="Receita" value="R$ 12.345,67" />
      <DashboardCard title="Clientes" value="1.234" />
      <DashboardCard title="Conversões" value="12.3%" />
    </div>
  );
}
