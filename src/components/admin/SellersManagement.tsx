'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { 
  Users, 
  UserPlus, 
  MagnifyingGlass, 
  DotsThreeVertical,
  PenNib,
  Trash,
  Eye,
  CurrencyDollar,
  TrendUp,
  Award,
  Shield,
  ShieldCheck
} from 'phosphor-react';

const mockSellers = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie@vendeur1.com',
    company: 'Digital Growth',
    usersCount: 45,
    monthlyRevenue: 2890,
    totalRevenue: 28900,
    commission: 15,
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-10-02 14:30',
    performance: 'excellent'
  },
  {
    id: '2',
    name: 'Marc Dubois',
    email: 'marc@leadpro.fr',
    company: 'LeadPro Solutions',
    usersCount: 67,
    monthlyRevenue: 4200,
    totalRevenue: 42000,
    commission: 18,
    status: 'active',
    joinDate: '2024-02-20',
    lastLogin: '2024-10-02 09:15',
    performance: 'excellent'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    email: 'julie@autolinkedin.com',
    company: 'AutoLinkedIn',
    usersCount: 23,
    monthlyRevenue: 1450,
    totalRevenue: 8700,
    commission: 12,
    status: 'active',
    joinDate: '2024-06-10',
    lastLogin: '2024-10-01 16:45',
    performance: 'good'
  },
  {
    id: '4',
    name: 'Pierre Rousseau',
    email: 'pierre@networker.fr',
    company: 'Networker Pro',
    usersCount: 8,
    monthlyRevenue: 320,
    totalRevenue: 1920,
    commission: 10,
    status: 'pending',
    joinDate: '2024-09-25',
    lastLogin: '2024-10-01 11:20',
    performance: 'new'
  }
];

export default function SellersManagement() {
  const [sellers] = useState(mockSellers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    email: '',
    company: '',
    commission: 15
  });

  const stats = {
    totalSellers: sellers.length,
    activeSellers: sellers.filter(s => s.status === 'active').length,
    totalRevenue: sellers.reduce((sum, s) => sum + s.totalRevenue, 0),
    avgCommission: sellers.reduce((sum, s) => sum + s.commission, 0) / sellers.length
  };

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleViewDetails = (seller: any) => {
    setSelectedSeller(seller);
    setIsDetailModalOpen(true);
  };

  const handleCreateSeller = () => {
    console.log('Creating seller:', newSeller);
    setIsCreateModalOpen(false);
    setNewSeller({ name: '', email: '', company: '', commission: 15 });
    alert('Vendeur créé avec succès !');
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Gestion des vendeurs</h1>
            <p className="text-gray">Gérez vos vendeurs partenaires et leurs performances</p>
          </div>
          
          <Button onClick={() => setIsCreateModalOpen(true)} className="mt-4 md:mt-0">
            <UserPlus size={16} className="mr-2" />
            Ajouter un vendeur
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users size={24} color="#2563eb" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalSellers}</p>
            <p className="text-sm text-gray">Vendeurs totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <ShieldCheck size={24} color="#16a34a" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.activeSellers}</p>
            <p className="text-sm text-gray">Vendeurs actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <CurrencyDollar size={24} className="text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalRevenue.toLocaleString()}€</p>
            <p className="text-sm text-gray">Revenus générés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendUp size={24} color="#ea580c" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgCommission.toFixed(1)}%</p>
            <p className="text-sm text-gray">Commission moyenne</p>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-black">Liste des vendeurs</h2>
            
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} color="#6b7280" />
              <input
                type="text"
                placeholder="Rechercher un vendeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Vendeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Utilisateurs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Revenus mensuel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray/20">
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">{seller.name}</div>
                      <div className="text-sm text-gray">{seller.email}</div>
                      <div className="text-xs text-gray">{seller.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Users size={16} color="#6b7280" />
                      <span className="text-sm font-medium text-black">{seller.usersCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">{seller.monthlyRevenue.toLocaleString()}€</div>
                      <div className="text-xs text-gray">Total: {seller.totalRevenue.toLocaleString()}€</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-primary">{seller.commission}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPerformanceBadge(seller.performance)}`}>
                      {getPerformanceLabel(seller.performance)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(seller.status)}`}>
                      {getStatusLabel(seller.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(seller)}
                        className="px-3"
                      >
                        <Eye size={16} className="mr-1" />
                        Voir
                      </Button>
                      <button className="p-2 hover:bg-gray/10 rounded-lg">
                        <DotsThreeVertical size={16} color="#6b7280" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Détails du vendeur"
        size="lg"
      >
        {selectedSeller && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray">Nom complet</label>
                  <p className="text-black font-medium">{selectedSeller.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Email</label>
                  <p className="text-black">{selectedSeller.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Entreprise</label>
                  <p className="text-black">{selectedSeller.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Date d'inscription</label>
                  <p className="text-black">{new Date(selectedSeller.joinDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray">Utilisateurs gérés</label>
                  <p className="text-black font-medium">{selectedSeller.usersCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Revenus mensuels</label>
                  <p className="text-black font-medium">{selectedSeller.monthlyRevenue.toLocaleString()}€</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Commission</label>
                  <p className="text-primary font-medium">{selectedSeller.commission}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray">Dernière connexion</label>
                  <p className="text-black">{selectedSeller.lastLogin}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <PenNib size={16} className="mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" className="flex-1">
                  <Shield size={16} className="mr-2" />
                  Suspendre
                </Button>
                <Button variant="outline" className="text-red-600 hover:bg-red-50">
                  <Trash size={16} className="mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Seller Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Ajouter un nouveau vendeur"
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Nom complet"
            value={newSeller.name}
            onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
            placeholder="Jean Dupont"
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={newSeller.email}
            onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
            placeholder="jean@exemple.com"
            required
          />
          
          <Input
            label="Entreprise"
            value={newSeller.company}
            onChange={(e) => setNewSeller({ ...newSeller, company: e.target.value })}
            placeholder="Nom de l'entreprise"
            required
          />
          
          <Input
            label="Commission (%)"
            type="number"
            value={newSeller.commission}
            onChange={(e) => setNewSeller({ ...newSeller, commission: parseInt(e.target.value) })}
            min="5"
            max="25"
            required
          />
          
          <div className="flex space-x-4">
            <Button onClick={handleCreateSeller} className="flex-1">
              <UserPlus size={16} className="mr-2" />
              Créer le vendeur
            </Button>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}