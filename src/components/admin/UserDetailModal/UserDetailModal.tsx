'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import UserOverviewSection from './UserOverviewSection';
import CreditManagementSection from './CreditManagementSection';
import ActivitySection from './ActivitySection';
import PaymentSection from './PaymentSection';
import { UserDetailModalProps, UserDetails } from './types';

const mockUserDetails: UserDetails = {
  creditHistory: [
    { date: '2024-10-02 14:30', type: 'spent', amount: -5, balance: 445, activity: 'Messages LinkedIn automatisés' },
    { date: '2024-10-02 09:15', type: 'spent', amount: -10, balance: 450, activity: 'Génération de posts IA' },
    { date: '2024-10-01 16:45', type: 'added', amount: 200, balance: 460, activity: 'Achat pack Premium' },
    { date: '2024-10-01 11:20', type: 'spent', amount: -8, balance: 260, activity: 'Connexions LinkedIn' },
    { date: '2024-09-30 14:15', type: 'spent', amount: -12, balance: 268, activity: 'Génération contenu' }
  ],
  paymentHistory: [
    {
      id: 'pay_1',
      date: '2024-10-01 16:45',
      type: 'credit_purchase',
      description: 'Achat pack 200 crédits',
      amount: 18.00,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'Carte •••• 4242',
      transactionId: 'txn_1234567890',
      credits: 200
    },
    {
      id: 'pay_2',
      date: '2024-09-15 10:30',
      type: 'subscription',
      description: 'Abonnement Premium - Octobre 2024',
      amount: 29.00,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'Carte •••• 4242',
      transactionId: 'sub_0987654321',
      credits: 500
    },
    {
      id: 'pay_3',
      date: '2024-07-20 16:30',
      type: 'credit_purchase',
      description: 'Achat pack 50 crédits',
      amount: 5.00,
      currency: 'EUR',
      status: 'failed',
      paymentMethod: 'Carte •••• 1234',
      transactionId: 'txn_failed_001',
      credits: 0,
      failureReason: 'Carte refusée'
    }
  ],
  activityLogs: [
    { date: '2024-10-02 14:30', action: 'LinkedIn Messages', details: '25 messages envoyés', status: 'success' },
    { date: '2024-10-02 14:15', action: 'Connexion', details: 'Connexion depuis Paris, France', status: 'info' },
    { date: '2024-10-02 09:15', action: 'Post Generation', details: 'Post éducatif généré avec IA', status: 'success' },
    { date: '2024-10-01 16:45', action: 'Purchase', details: 'Achat pack 200 crédits - 18€', status: 'success' },
    { date: '2024-09-30 22:10', action: 'Déconnexion', details: 'Session terminée', status: 'info' }
  ],
  recentPosts: [
    {
      id: '1',
      date: '2024-10-02 09:15',
      title: '5 secrets pour automatiser LinkedIn sans risque',
      type: 'educational',
      engagement: { views: 1250, likes: 89, comments: 23 },
      credits: 10
    },
    {
      id: '2',
      date: '2024-10-01 14:30',
      title: 'Ma stratégie de lead generation qui fonctionne',
      type: 'strategy',
      engagement: { views: 890, likes: 67, comments: 18 },
      credits: 8
    }
  ],
  recentMessages: [
    {
      id: '1',
      date: '2024-10-02 14:30',
      type: 'connection',
      count: 25,
      scenario: 'Première connexion',
      success: 18,
      credits: 5
    },
    {
      id: '2',
      date: '2024-10-01 16:20',
      type: 'follow_up',
      count: 15,
      scenario: 'Suivi prospects',
      success: 12,
      credits: 3
    }
  ],
  stats: {
    totalPosts: 47,
    totalMessages: 234,
    totalConnections: 156,
    totalLeads: 89,
    avgEngagement: 8.7,
    totalSpent: 580,
    joinDate: '2024-08-15',
    lastActive: '2024-10-02 14:30'
  }
};

export default function UserDetailModal({ isOpen, onClose, user, onCreditAction }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'credits', label: 'Crédits' },
    { id: 'activity', label: 'Activité' },
    { id: 'payments', label: 'Paiements' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <UserOverviewSection user={user} stats={mockUserDetails.stats} />;
      case 'credits':
        return (
          <CreditManagementSection
            user={user}
            creditHistory={mockUserDetails.creditHistory}
            onCreditAction={onCreditAction}
          />
        );
      case 'activity':
        return (
          <ActivitySection
            activityLogs={mockUserDetails.activityLogs}
            recentPosts={mockUserDetails.recentPosts}
            recentMessages={mockUserDetails.recentMessages}
          />
        );
      case 'payments':
        return <PaymentSection paymentHistory={mockUserDetails.paymentHistory} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-black">{user.name}</h2>
            <p className="text-gray">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray">Crédits disponibles</p>
            <p className="text-2xl font-bold text-primary">{user.credits}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
}