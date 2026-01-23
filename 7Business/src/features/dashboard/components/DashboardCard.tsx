import React from 'react';
import IconButton from '@/components/icons/IconButton';

type Props = {
  title: string;
  value: string;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <IconButton label="Detalhes" />
    </div>
  );
}
