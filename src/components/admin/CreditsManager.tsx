'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { 
  CreditCard, 
  Plus, 
  Minus, 
  Search, 
  History,
  TrendingUp,
  Users,
  Gift,
  Package
} from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie@exemple.com',
    currentCredits: 450,
    totalSpent: 2350,
    subscription: 'Premium',
    lastActivity: '2024-10-01'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@exemple.com',
    currentCredits: 1200,
    totalSpent: 4800,
    subscription: 'Enterprise',
    lastActivity: '2024-10-02'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    email: 'julie@exemple.com',
    currentCredits: 8,
    totalSpent: 42,
    subscription: 'Gratuit',
    lastActivity: '2024-09-28'
  }
];

const creditPackages = [
  { id: 'pack-50', name: '50 crédits', credits: 50, price: 5 },
  { id: 'pack-200', name: '200 crédits', credits: 200, price: 18 },
  { id: 'pack-500', name: '500 crédits', credits: 500, price: 40 },
  { id: 'pack-1000', name: '1000 crédits', credits: 1000, price: 75 },
  { id: 'custom', name: 'Montant personnalisé', credits: 0, price: 0 }
];

const recentTransactions = [
  {
    id: '1',
    userId: '1',
    userName: 'Marie Dubois',
    type: 'add',
    amount: 200,
    reason: 'Achat pack Premium',
    date: '2024-10-01 14:30'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Thomas Martin',
    type: 'remove',
    amount: 50,
    reason: 'Utilisation LinkedIn',
    date: '2024-10-01 11:15'
  },
  {
    id: '3',
    userId: '1',
    userName: 'Marie Dubois',
    type: 'add',
    amount: 100,
    reason: 'Bonus parrainage',
    date: '2024-09-30 16:45'
  }
];

export default function CreditsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creditAction, setCreditAction] = useState<'add' | 'remove'>('add');
  const [creditAmount, setCreditAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('pack-50');
  const [reason, setReason] = useState('');

  const stats = {
    totalUsers: mockUsers.length,
    totalCreditsInCirculation: mockUsers.reduce((sum, user) => sum + user.currentCredits, 0),
    totalRevenue: mockUsers.reduce((sum, user) => sum + user.totalSpent, 0),
    avgCreditsPerUser: Math.round(mockUsers.reduce((sum, user) => sum + user.currentCredits, 0) / mockUsers.length)
  };

  const handleUserAction = (user: any, action: 'add' | 'remove') => {
    setSelectedUser(user);
    setCreditAction(action);
    setIsModalOpen(true);
  };

  const handleCreditTransaction = () => {
    const finalAmount = selectedPackage === 'custom' ? parseInt(customAmount) : creditAmount;
    
    if (!finalAmount || finalAmount <= 0) {
      alert('Veuillez entrer un montant valide');
      return;
    }

    if (!reason.trim()) {
      alert('Veuillez entrer une raison pour cette transaction');
      return;
    }

    console.log(`${creditAction === 'add' ? 'Adding' : 'Removing'} ${finalAmount} credits to/from ${selectedUser.name}`);
    console.log('Reason:', reason);
    
    setIsModalOpen(false);
    setReason('');
    setCustomAmount('');
    alert(`${finalAmount} crédits ${creditAction === 'add' ? 'ajoutés' : 'retirés'} avec succès !`);
  };

  const handlePackageChange = (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = creditPackages.find(p => p.id === packageId);
    if (pkg && pkg.id !== 'custom') {
      setCreditAmount(pkg.credits);
    }
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Gestion des crédits</h1>
        <p className="text-gray">Gérez les crédits de vos utilisateurs et suivez les transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalUsers}</p>
            <p className="text-sm text-gray">Utilisateurs totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalCreditsInCirculation.toLocaleString()}</p>
            <p className="text-sm text-gray">Crédits en circulation</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalRevenue}€</p>
            <p className="text-sm text-gray">Revenus totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgCreditsPerUser}</p>
            <p className="text-sm text-gray">Moyenne/utilisateur</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Users Credits Management */}
        <div className="bg-white rounded-2xl border border-gray/20">
          <div className="p-6 border-b border-gray/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-black">Gestion par utilisateur</h2>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-black">{user.name}</h3>
                    <p className="text-sm text-gray">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm">
                        <span className="text-gray">Crédits:</span>
                        <span className="ml-1 font-medium text-primary">{user.currentCredits}</span>
                      </span>
                      <span className="text-sm">
                        <span className="text-gray">Dépensés:</span>
                        <span className="ml-1 font-medium text-black">{user.totalSpent}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUserAction(user, 'add')}
                      className="px-3"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleUserAction(user, 'remove')}
                      className="px-3 text-red-600 hover:bg-red-50"
                    >
                      <Minus className="w-4 h-4 mr-1" />
                      Retirer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray/20">
          <div className="p-6 border-b border-gray/20">
            <h2 className="text-xl font-semibold text-black">Transactions récentes</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'add' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {transaction.type === 'add' ? (
                        <Plus className="w-4 h-4 text-green-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-black">{transaction.userName}</h3>
                      <p className="text-sm text-gray">{transaction.reason}</p>
                      <p className="text-xs text-gray">{transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className={`text-right ${
                    transaction.type === 'add' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span className="font-medium">
                      {transaction.type === 'add' ? '+' : '-'}{transaction.amount}
                    </span>
                    <span className="text-sm ml-1">crédits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Credit Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${creditAction === 'add' ? 'Ajouter' : 'Retirer'} des crédits`}
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-black">{selectedUser.name}</h3>
              <p className="text-sm text-gray">{selectedUser.email}</p>
              <p className="text-sm">
                <span className="text-gray">Crédits actuels:</span>
                <span className="ml-1 font-medium text-primary">{selectedUser.currentCredits}</span>
              </p>
            </div>

            {creditAction === 'add' && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Package de crédits
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {creditPackages.map((pkg) => (
                    <label key={pkg.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={selectedPackage === pkg.id}
                        onChange={(e) => handlePackageChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedPackage === pkg.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray/30 hover:border-primary/50'
                      }`}>
                        <div className="font-medium text-black">{pkg.name}</div>
                        {pkg.id !== 'custom' && (
                          <div className="text-sm text-gray">{pkg.price}€</div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {(creditAction === 'remove' || selectedPackage === 'custom') && (
              <Input
                label="Nombre de crédits"
                type="number"
                value={selectedPackage === 'custom' ? customAmount : creditAmount}
                onChange={(e) => {
                  if (selectedPackage === 'custom') {
                    setCustomAmount(e.target.value);
                  } else {
                    setCreditAmount(parseInt(e.target.value));
                  }
                }}
                min="1"
                max={creditAction === 'remove' ? selectedUser.currentCredits : 10000}
                placeholder="Entrez le nombre de crédits"
              />
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Raison de la transaction
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Expliquez pourquoi vous effectuez cette transaction..."
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleCreditTransaction} className="flex-1">
                <CreditCard className="w-4 h-4 mr-2" />
                {creditAction === 'add' ? 'Ajouter' : 'Retirer'} les crédits
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}