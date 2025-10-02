'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Eye, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Settings,
  UserPlus
} from 'lucide-react';
import UserDetailModal from './UserDetailModal';

const mockUsers = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie@exemple.com',
    subscription: 'Premium',
    credits: 450,
    leads: 23,
    revenue: 29,
    joinDate: '2024-09-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@exemple.com',
    subscription: 'Enterprise',
    credits: 1200,
    leads: 67,
    revenue: 99,
    joinDate: '2024-08-22',
    status: 'active'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    email: 'julie@exemple.com',
    subscription: 'Gratuit',
    credits: 8,
    leads: 2,
    revenue: 0,
    joinDate: '2024-10-01',
    status: 'trial'
  }
];

interface SellerDashboardProps {
  userRole?: 'user' | 'seller' | 'admin';
}

export default function SellerDashboard({ userRole = 'seller' }: SellerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBulkCreditModalOpen, setIsBulkCreditModalOpen] = useState(false);
  const [bulkCredits, setBulkCredits] = useState({ amount: 50, reason: '' });

  const totalStats = {
    users: mockUsers.length,
    totalRevenue: mockUsers.reduce((sum, user) => sum + user.revenue, 0),
    totalLeads: mockUsers.reduce((sum, user) => sum + user.leads, 0),
    avgRevenue: mockUsers.reduce((sum, user) => sum + user.revenue, 0) / mockUsers.length
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleUserCreditAction = (action: 'add' | 'remove', amount: number, reason: string) => {
    console.log(`${action} ${amount} credits to ${selectedUser.name}: ${reason}`);
    alert(`${amount} crédits ${action === 'add' ? 'ajoutés' : 'retirés'} avec succès !`);
  };

  const handleBulkCredits = () => {
    if (!bulkCredits.amount || !bulkCredits.reason.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    console.log(`Adding ${bulkCredits.amount} credits to all users: ${bulkCredits.reason}`);
    setIsBulkCreditModalOpen(false);
    setBulkCredits({ amount: 50, reason: '' });
    alert(`${bulkCredits.amount} crédits ajoutés à tous les utilisateurs !`);
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          {userRole === 'admin' ? 'Administration Automya' : 'Dashboard Vendeur'}
        </h1>
        <p className="text-gray">
          {userRole === 'admin' 
            ? 'Gérez l\'ensemble de la plateforme et vos vendeurs' 
            : 'Gérez vos utilisateurs et suivez vos performances'
          }
        </p>
      </div>

      {/* Section Admin uniquement */}
      {userRole === 'admin' && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-black mb-2">🚀 Super Admin</h2>
                <p className="text-gray">Vous avez accès à toutes les fonctionnalités d'administration</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuration globale
                </Button>
                <Button>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Stats plateforme
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.users}</p>
            <p className="text-sm text-gray">Utilisateurs actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalRevenue}€</p>
            <p className="text-sm text-gray">Revenus ce mois</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalLeads}</p>
            <p className="text-sm text-gray">Leads générés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.avgRevenue.toFixed(0)}€</p>
            <p className="text-sm text-gray">Revenu moyen/user</p>
          </div>
        </div>
      </div>

      {/* Users Management */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-black">Mes utilisateurs</h2>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Filter */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="trial">Essai</option>
                <option value="premium">Premium</option>
              </select>

              {/* Bulk Credits */}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsBulkCreditModalOpen(true)}
                className="px-4"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Crédits pour tous
              </Button>

              {/* Add User */}
              <Button size="sm" className="px-4">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Abonnement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Crédits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Revenus
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
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">{user.name}</div>
                      <div className="text-sm text-gray">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.subscription === 'Enterprise' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.subscription === 'Premium'
                        ? 'bg-primary-light text-primary'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.leads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.revenue}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status === 'active' ? 'Actif' : 'Essai'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                        className="px-3"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                      <button className="p-2 hover:bg-gray/10 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
        onCreditAction={handleUserCreditAction}
      />

      {/* Bulk Credits Modal */}
      {isBulkCreditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-black mb-6">Ajouter des crédits à tous les utilisateurs</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Nombre de crédits
                </label>
                <input
                  type="number"
                  value={bulkCredits.amount}
                  onChange={(e) => setBulkCredits({ ...bulkCredits, amount: parseInt(e.target.value) })}
                  min="1"
                  max="1000"
                  className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Raison
                </label>
                <textarea
                  value={bulkCredits.reason}
                  onChange={(e) => setBulkCredits({ ...bulkCredits, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Ex: Bonus de fin d'année pour tous les utilisateurs"
                />
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Cette action ajoutera <strong>{bulkCredits.amount} crédits</strong> à tous les {mockUsers.length} utilisateurs.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Button onClick={handleBulkCredits} className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter les crédits
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsBulkCreditModalOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}