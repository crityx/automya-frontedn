'use client';

import { memo } from 'react';
import { 
  DotsThreeVertical,
  Eye,
  CurrencyDollar,
  TrendUp,
  Users
} from 'phosphor-react';
import { Seller } from './types';

interface SellerCardProps {
  seller: Seller;
  onViewDetails: (seller: Seller) => void;
}

const SellerCard = memo(function SellerCard({ seller, onViewDetails }: SellerCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      case 'new':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceLabel = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Bon';
      case 'average': return 'Moyen';
      case 'new': return 'Nouveau';
      default: return performance;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray/20 rounded-xl p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-black text-lg mb-1">{seller.name}</h3>
          <p className="text-gray text-sm mb-2">{seller.email}</p>
          <p className="text-black font-medium">{seller.company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(seller.status)}`}>
            {getStatusLabel(seller.status)}
          </span>
          <button
            onClick={() => onViewDetails(seller)}
            className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
            title="Voir les détails"
          >
            <Eye size={16} className="text-gray" />
          </button>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users size={16} className="text-blue-600 mr-1" />
          </div>
          <div className="font-bold text-black">{seller.usersCount}</div>
          <div className="text-xs text-gray">Utilisateurs</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <CurrencyDollar size={16} className="text-green-600 mr-1" />
          </div>
          <div className="font-bold text-black">{formatCurrency(seller.monthlyRevenue)}</div>
          <div className="text-xs text-gray">CA/mois</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendUp size={16} className="text-purple-600 mr-1" />
          </div>
          <div className="font-bold text-black">{seller.commission}%</div>
          <div className="text-xs text-gray">Commission</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray/10">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceBadge(seller.performance)}`}>
            {getPerformanceLabel(seller.performance)}
          </span>
        </div>
        <div className="text-xs text-gray">
          Inscrit le {new Date(seller.joinDate).toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  );
});

export default SellerCard;