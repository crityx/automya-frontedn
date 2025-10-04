'use client';

import { memo } from 'react';
import { 
  User, 
  CreditCard, 
  Activity,
  Calendar,
  TrendUp,
  Shield,
  Envelope,
  PhoneCall,
  Buildings
} from 'phosphor-react';
import { UserStats } from './types';

interface UserOverviewSectionProps {
  user: any;
  stats: UserStats;
}

const UserOverviewSection = memo(function UserOverviewSection({ user, stats }: UserOverviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* Informations utilisateur */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <User size={20} className="text-primary" />
          Informations personnelles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Envelope size={16} className="text-gray" />
            <div>
              <p className="text-sm text-gray">Email</p>
              <p className="font-medium text-black">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <PhoneCall size={16} className="text-gray" />
            <div>
              <p className="text-sm text-gray">Téléphone</p>
              <p className="font-medium text-black">{user.phone || 'Non renseigné'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Buildings size={16} className="text-gray" />
            <div>
              <p className="text-sm text-gray">Entreprise</p>
              <p className="font-medium text-black">{user.company || 'Non renseigné'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray" />
            <div>
              <p className="text-sm text-gray">Inscrit le</p>
              <p className="font-medium text-black">{new Date(stats.joinDate).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendUp size={16} className="text-green-600" />
            <span className="text-sm text-gray">Posts créés</span>
          </div>
          <p className="text-2xl font-bold text-black">{stats.totalPosts}</p>
        </div>
        
        <div className="bg-white border border-gray/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} className="text-blue-600" />
            <span className="text-sm text-gray">Messages</span>
          </div>
          <p className="text-2xl font-bold text-black">{stats.totalMessages}</p>
        </div>
        
        <div className="bg-white border border-gray/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-purple-600" />
            <span className="text-sm text-gray">Connexions</span>
          </div>
          <p className="text-2xl font-bold text-black">{stats.totalConnections}</p>
        </div>
        
        <div className="bg-white border border-gray/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-orange-600" />
            <span className="text-sm text-gray">Leads</span>
          </div>
          <p className="text-2xl font-bold text-black">{stats.totalLeads}</p>
        </div>
      </div>

      {/* Métriques d'engagement */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4">Métriques d'engagement</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray mb-1">Engagement moyen</p>
            <p className="text-xl font-bold text-primary">{stats.avgEngagement}%</p>
          </div>
          
          <div>
            <p className="text-sm text-gray mb-1">Total dépensé</p>
            <p className="text-xl font-bold text-black">{stats.totalSpent} crédits</p>
          </div>
          
          <div>
            <p className="text-sm text-gray mb-1">Dernière activité</p>
            <p className="text-sm text-black">{new Date(stats.lastActive).toLocaleString('fr-FR')}</p>
          </div>
        </div>
      </div>

      {/* Status du compte */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          Status du compte
        </h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium text-black">
              {user.status === 'active' ? 'Compte actif' : 'Compte suspendu'}
            </span>
          </div>
          
          <div className="text-sm">
            <span className="text-gray">Abonnement: </span>
            <span className="font-medium text-black capitalize">{user.subscription}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserOverviewSection;