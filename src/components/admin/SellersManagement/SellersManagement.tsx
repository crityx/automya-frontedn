'use client';

import { useState, memo, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import { UserPlus, MagnifyingGlass } from 'phosphor-react';
import SellersStats from './SellersStats';
import SellerCard from './SellerCard';
import CreateSellerModal from './CreateSellerModal';
import SellerDetailModal from './SellerDetailModal';
import { Seller, NewSeller, SellersStats as SellersStatsType } from './types';
import { mockSellers } from './mockData';

function SellersManagement() {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const stats: SellersStatsType = useMemo(() => ({
    totalSellers: sellers.length,
    activeSellers: sellers.filter(s => s.status === 'active').length,
    totalRevenue: sellers.reduce((sum, s) => sum + s.totalRevenue, 0),
    avgCommission: sellers.reduce((sum, s) => sum + s.commission, 0) / sellers.length
  }), [sellers]);

  const filteredSellers = useMemo(() => 
    sellers.filter(seller =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.company.toLowerCase().includes(searchTerm.toLowerCase())
    ), [sellers, searchTerm]
  );

  const handleViewDetails = useCallback((seller: Seller) => {
    setSelectedSeller(seller);
    setIsDetailModalOpen(true);
  }, []);

  const handleCreateSeller = useCallback((newSellerData: NewSeller) => {
    const newSeller: Seller = {
      id: Date.now().toString(),
      name: newSellerData.name,
      email: newSellerData.email,
      company: newSellerData.company,
      commission: newSellerData.commission,
      usersCount: 0,
      monthlyRevenue: 0,
      totalRevenue: 0,
      status: 'pending',
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      performance: 'new'
    };

    setSellers(prev => [newSeller, ...prev]);
    // TODO: Implement seller creation
  }, []);

  const handleEditSeller = useCallback((seller: Seller) => {
    // TODO: Implement edit functionality
    console.log('Edit seller:', seller);
  }, []);

  const handleDeleteSeller = useCallback((sellerId: string) => {
    setSellers(prev => prev.filter(s => s.id !== sellerId));
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedSeller(null);
  }, []);

  return (
    <>
      <div className="max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Gestion des Vendeurs</h1>
              <p className="text-gray">Gérez votre équipe de vente et leurs performances</p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 md:mt-0 flex items-center space-x-2"
            >
              <UserPlus size={20} />
              <span>Nouveau vendeur</span>
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <SellersStats stats={stats} />

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray" />
            <input
              type="text"
              placeholder="Rechercher un vendeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>
        </div>

        {/* Liste des vendeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray/60 mb-4">
              {searchTerm ? 'Aucun vendeur trouvé' : 'Aucun vendeur enregistré'}
            </div>
            {!searchTerm && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center space-x-2 mx-auto"
              >
                <UserPlus size={16} />
                <span>Créer le premier vendeur</span>
              </Button>
            )}
          </div>
        )}
      </div>

      <CreateSellerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSeller={handleCreateSeller}
      />

      <SellerDetailModal
        seller={selectedSeller}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onEdit={handleEditSeller}
        onDelete={handleDeleteSeller}
      />
    </>
  );
}

export default memo(SellersManagement);