'use client';

import { memo } from 'react';
import { Users, CurrencyDollar, TrendUp, ShieldCheck } from 'phosphor-react';
import { SellersStats as SellersStatsType } from './types';

interface SellersStatsProps {
  stats: SellersStatsType;
}

const SellersStats = memo(function SellersStats({ stats }: SellersStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Vendeurs Total',
      value: stats.totalSellers,
      icon: <Users size={24} className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-900'
    },
    {
      title: 'Vendeurs Actifs',
      value: stats.activeSellers,
      icon: <ShieldCheck size={24} className="text-green-600" />,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-900'
    },
    {
      title: 'CA Total',
      value: formatCurrency(stats.totalRevenue),
      icon: <CurrencyDollar size={24} className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-900'
    },
    {
      title: 'Commission Moyenne',
      value: `${Math.round(stats.avgCommission)}%`,
      icon: <TrendUp size={24} className="text-orange-600" />,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-900'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} border rounded-xl p-6 transition-transform hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              {stat.icon}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SellersStats;