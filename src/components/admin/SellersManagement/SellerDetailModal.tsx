'use client';

import { memo } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { 
  Users, 
  CurrencyDollar, 
  TrendUp,
  CalendarBlank,
  Clock,
  Envelope,
  PenNib,
  Trash
} from 'phosphor-react';
import { Seller } from './types';

interface SellerDetailModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (seller: Seller) => void;
  onDelete?: (sellerId: string) => void;
}

const SellerDetailModal = memo(function SellerDetailModal({ 
  seller, 
  isOpen, 
  onClose, 
  onEdit,
  onDelete 
}: SellerDetailModalProps) {
  if (!seller) return null;

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

  const handleSendEmail = () => {
    // TODO: Implement email functionality
    window.open(`mailto:${seller.email}`, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du vendeur" size="lg">
      <div className="space-y-6">
        {/* Header avec info principale */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-2">{seller.name}</h2>
            <div className="space-y-1">
              <p className="text-gray flex items-center">
                <Envelope size={16} className="mr-2" />
                {seller.email}
              </p>
              <p className="text-black font-medium">{seller.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm px-3 py-1 rounded-full ${getStatusBadge(seller.status)}`}>
              {getStatusLabel(seller.status)}
            </span>
            <span className={`text-sm px-3 py-1 rounded-full ${getPerformanceBadge(seller.performance)}`}>
              {getPerformanceLabel(seller.performance)}
            </span>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Users size={24} className="text-blue-600 mx-auto mb-2" />
            <div className="font-bold text-xl text-black">{seller.usersCount}</div>
            <div className="text-sm text-gray">Utilisateurs</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CurrencyDollar size={24} className="text-green-600 mx-auto mb-2" />
            <div className="font-bold text-xl text-black">{formatCurrency(seller.monthlyRevenue)}</div>
            <div className="text-sm text-gray">CA mensuel</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <TrendUp size={24} className="text-purple-600 mx-auto mb-2" />
            <div className="font-bold text-xl text-black">{formatCurrency(seller.totalRevenue)}</div>
            <div className="text-sm text-gray">CA total</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <TrendUp size={24} className="text-orange-600 mx-auto mb-2" />
            <div className="font-bold text-xl text-black">{seller.commission}%</div>
            <div className="text-sm text-gray">Commission</div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-black">Informations</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CalendarBlank size={16} className="text-gray mr-3" />
                <div>
                  <span className="text-gray">Inscrit le:</span>
                  <span className="ml-2 text-black font-medium">
                    {new Date(seller.joinDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={16} className="text-gray mr-3" />
                <div>
                  <span className="text-gray">Dernière connexion:</span>
                  <span className="ml-2 text-black font-medium">
                    {new Date(seller.lastLogin).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-black">Performance</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-gray">Niveau de performance:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${getPerformanceBadge(seller.performance)}`}>
                  {getPerformanceLabel(seller.performance)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray">Revenu par utilisateur:</span>
                <span className="ml-2 text-black font-medium">
                  {formatCurrency(seller.monthlyRevenue / Math.max(seller.usersCount, 1))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-6 border-t border-gray/10">
          <Button
            onClick={handleSendEmail}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Envelope size={16} />
            <span>Envoyer un email</span>
          </Button>
          
          {onEdit && (
            <Button
              onClick={() => onEdit(seller)}
              className="flex items-center space-x-2"
            >
              <PenNib size={16} />
              <span>Modifier</span>
            </Button>
          )}
          
          {onDelete && (
            <Button
              onClick={() => {
                if (confirm(`Êtes-vous sûr de vouloir supprimer ${seller.name} ?`)) {
                  onDelete(seller.id);
                  onClose();
                }
              }}
              variant="outline"
              className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash size={16} />
              <span>Supprimer</span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
});

export default SellerDetailModal;