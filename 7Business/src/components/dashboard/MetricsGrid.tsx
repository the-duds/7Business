import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricCard as MetricCardType } from './types';

interface MetricsGridProps {
  metrics: MetricCardType[];
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.isPositive;

        return (
          <div
            key={metric.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header com ícone */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Icon size={24} className="text-indigo-600" />
              </div>

              {/* Change indicator */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold ${
                  isPositive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              {metric.title}
            </h3>

            {/* Value */}
            <p className="text-3xl font-bold text-slate-900 mb-2">
              {metric.value}
            </p>

            {/* Footer text */}
            <p className="text-xs text-slate-500">
              {isPositive ? 'Aumento' : 'Queda'} em relação ao mês anterior
            </p>
          </div>
        );
      })}
    </div>
  );
};
