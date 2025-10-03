'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { 
  User, 
  CreditCard, 
  MessageSquare, 
  PenTool, 
  Activity,
  Calendar,
  TrendUp,
  Eye,
  Clock,
  Plus,
  Minus,
  Edit3,
  Shield,
  Mail,
  Phone,
  Building,
  Receipt,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'phosphor-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onCreditAction: (action: 'add' | 'remove', amount: number, reason: string) => void;
}

const mockUserDetails = {
  // Historique des crédits
  creditHistory: [
    { date: '2024-10-02 14:30', type: 'spent', amount: -5, balance: 445, activity: 'Messages LinkedIn automatisés' },
    { date: '2024-10-02 09:15', type: 'spent', amount: -10, balance: 450, activity: 'Génération de posts IA' },
    { date: '2024-10-01 16:45', type: 'added', amount: +200, balance: 460, activity: 'Achat pack Premium' },
    { date: '2024-10-01 11:20', type: 'spent', amount: -8, balance: 260, activity: 'Connexions LinkedIn' },
    { date: '2024-09-30 14:15', type: 'spent', amount: -12, balance: 268, activity: 'Génération contenu' }
  ],

  // Historique des paiements
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
      date: '2024-08-15 14:20',
      type: 'subscription',
      description: 'Abonnement Premium - Septembre 2024',
      amount: 29.00,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'Carte •••• 4242',
      transactionId: 'sub_1122334455',
      credits: 500
    },
    {
      id: 'pay_4',
      date: '2024-08-10 09:15',
      type: 'credit_purchase',
      description: 'Achat pack 100 crédits',
      amount: 9.50,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'PayPal',
      transactionId: 'txn_5566778899',
      credits: 100
    },
    {
      id: 'pay_5',
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
  
  // Logs d'activité
  activityLogs: [
    { date: '2024-10-02 14:30', action: 'LinkedIn Messages', details: '25 messages envoyés', status: 'success' },
    { date: '2024-10-02 14:15', action: 'Connexion', details: 'Connexion depuis Paris, France', status: 'info' },
    { date: '2024-10-02 09:15', action: 'Post Generation', details: 'Post éducatif généré avec IA', status: 'success' },
    { date: '2024-10-01 16:45', action: 'Purchase', details: 'Achat pack 200 crédits - 18€', status: 'success' },
    { date: '2024-10-01 11:20', action: 'LinkedIn Connections', details: '15 demandes de connexion envoyées', status: 'success' },
    { date: '2024-09-30 22:10', action: 'Déconnexion', details: 'Session terminée', status: 'info' }
  ],
  
  // Posts récents
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
    },
    {
      id: '3',
      date: '2024-09-30 11:45',
      title: 'Témoignage client : +300% de croissance',
      type: 'testimonial',
      engagement: { views: 2100, likes: 156, comments: 42 },
      credits: 12
    }
  ],
  
  // Messages récents
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
    },
    {
      id: '3',
      date: '2024-09-30 09:45',
      type: 'lead_qualification',
      count: 8,
      scenario: 'Qualification leads',
      success: 6,
      credits: 2
    }
  ],
  
  // Statistiques
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
  const [creditAmount, setCreditAmount] = useState(50);
  const [creditReason, setCreditReason] = useState('');
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [creditAction, setCreditAction] = useState<'add' | 'remove'>('add');

  if (!user) return null;

  const details = mockUserDetails;

  const handleCreditSubmit = () => {
    if (!creditAmount || !creditReason.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    onCreditAction(creditAction, creditAmount, creditReason);
    setShowCreditForm(false);
    setCreditAmount(50);
    setCreditReason('');
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: <User className="w-4 h-4" /> },
    { id: 'credits', name: 'Crédits', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'payments', name: 'Paiements', icon: <Receipt className="w-4 h-4" /> },
    { id: 'posts', name: 'Posts', icon: <PenTool className="w-4 h-4" /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'activity', name: 'Activité', icon: <Activity className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'educational': return 'bg-purple-100 text-purple-800';
      case 'strategy': return 'bg-blue-100 text-blue-800';
      case 'testimonial': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeName = (type: string) => {
    switch (type) {
      case 'educational': return 'Éducatif';
      case 'strategy': return 'Stratégie';
      case 'testimonial': return 'Témoignage';
      default: return type;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Payé';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'refunded': return 'Remboursé';
      default: return status;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'credit_purchase': return 'Achat crédits';
      case 'subscription': return 'Abonnement';
      case 'refund': return 'Remboursement';
      default: return type;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Détails - ${user.name}`} size="xl">
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black">{user.name}</h3>
              <p className="text-gray">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user.subscription === 'Enterprise' 
                    ? 'bg-purple-100 text-purple-800'
                    : user.subscription === 'Premium'
                    ? 'bg-primary-light text-primary'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.subscription}
                </span>
                <span className="flex items-center space-x-1 text-sm text-gray">
                  <CalendarBlank size={16} />
                  <span>Inscrit le {new Date(details.stats.joinDate).toLocaleDateString('fr-FR')}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCreditAction('add');
                setShowCreditForm(true);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter crédits
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCreditAction('remove');
                setShowCreditForm(true);
              }}
            >
              <Minus className="w-4 h-4 mr-1" />
              Retirer crédits
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{user.credits}</div>
            <div className="text-sm text-gray">Crédits actuels</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{details.stats.totalLeads}</div>
            <div className="text-sm text-gray">Leads générés</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{details.stats.totalPosts}</div>
            <div className="text-sm text-gray">Posts créés</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{details.stats.totalSpent}€</div>
            <div className="text-sm text-gray">Total dépensé</div>
          </div>
        </div>

        {/* Credit Form */}
        {showCreditForm && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-black mb-3">
              {creditAction === 'add' ? 'Ajouter des crédits' : 'Retirer des crédits'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Nombre de crédits</label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(parseInt(e.target.value))}
                  min="1"
                  max={creditAction === 'remove' ? user.credits : 10000}
                  className="w-full px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Raison</label>
                <input
                  type="text"
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  placeholder="Ex: Bonus parrainage"
                  className="w-full px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button size="sm" onClick={handleCreditSubmit}>
                {creditAction === 'add' ? 'Ajouter' : 'Retirer'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowCreditForm(false)}>
                Annuler
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray/20">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray hover:text-black'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black mb-3">Informations personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray" />
                      <span className="text-black">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray" />
                      <span className="text-black">TechCorp Inc.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray" />
                      <span className="text-black">+33 6 12 34 56 78</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-black mb-3">Statistiques</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray">Messages envoyés:</span>
                      <span className="text-black font-medium">{details.stats.totalMessages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray">Connexions:</span>
                      <span className="text-black font-medium">{details.stats.totalConnections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray">Engagement moyen:</span>
                      <span className="text-black font-medium">{details.stats.avgEngagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray">Dernière activité:</span>
                      <span className="text-black font-medium">{details.stats.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-4">
              <h4 className="font-medium text-black">Historique des crédits</h4>
              <div className="space-y-3">
                {details.creditHistory.map((credit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        credit.type === 'added' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {credit.type === 'added' ? (
                          <Plus className="w-4 h-4 text-green-600" />
                        ) : (
                          <Minus className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-black">{credit.activity}</div>
                        <div className="text-xs text-gray">{credit.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        credit.type === 'added' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {credit.type === 'added' ? '+' : ''}{credit.amount}
                      </div>
                      <div className="text-xs text-gray">Solde: {credit.balance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-black">Historique des paiements</h4>
                <div className="text-sm text-gray">
                  Total payé: <span className="font-medium text-black">
                    {details.paymentHistory.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}€
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {details.paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-4 border border-gray/20 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gray-50">
                          {getPaymentStatusIcon(payment.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-black">{payment.description}</h5>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusBadge(payment.status)}`}>
                              {getPaymentStatusLabel(payment.status)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {getPaymentTypeLabel(payment.type)}
                            </span>
                            <span>{payment.date}</span>
                            <span>{payment.paymentMethod}</span>
                          </div>
                          {payment.failureReason && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                              ⚠️ {payment.failureReason}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          payment.status === 'completed' ? 'text-green-600' :
                          payment.status === 'failed' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {payment.amount.toFixed(2)}€
                        </div>
                        {payment.credits > 0 && (
                          <div className="text-sm text-primary">+{payment.credits} crédits</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray/10 pt-2 mt-2">
                      <div className="flex justify-between text-xs text-gray">
                        <span>ID: {payment.transactionId}</span>
                        <span>{payment.currency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-black mb-3">Résumé des paiements</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {details.paymentHistory.filter(p => p.status === 'completed').length}
                    </div>
                    <div className="text-gray">Paiements réussis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {details.paymentHistory.filter(p => p.status === 'failed').length}
                    </div>
                    <div className="text-gray">Paiements échoués</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {details.paymentHistory.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.credits, 0)}
                    </div>
                    <div className="text-gray">Crédits achetés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">
                      {details.paymentHistory.filter(p => p.type === 'subscription' && p.status === 'completed').length}
                    </div>
                    <div className="text-gray">Mois d'abonnement</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-4">
              <h4 className="font-medium text-black">Posts récents</h4>
              <div className="space-y-3">
                {details.recentPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-gray/20 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-medium text-black">{post.title}</h5>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPostTypeColor(post.type)}`}>
                            {getPostTypeName(post.type)}
                          </span>
                          <span className="text-xs text-gray">{post.date}</span>
                        </div>
                      </div>
                      <span className="text-sm text-primary font-medium">{post.credits} crédits</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-medium text-black">{post.engagement.views}</div>
                        <div className="text-gray text-xs">Vues</div>
                      </div>
                      <div>
                        <div className="font-medium text-black">{post.engagement.likes}</div>
                        <div className="text-gray text-xs">Likes</div>
                      </div>
                      <div>
                        <div className="font-medium text-black">{post.engagement.comments}</div>
                        <div className="text-gray text-xs">Commentaires</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h4 className="font-medium text-black">Messages récents</h4>
              <div className="space-y-3">
                {details.recentMessages.map((message) => (
                  <div key={message.id} className="p-4 border border-gray/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-black">{message.scenario}</h5>
                        <div className="text-xs text-gray">{message.date}</div>
                      </div>
                      <span className="text-sm text-primary font-medium">{message.credits} crédits</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray">Envoyés:</span>
                        <span className="ml-2 text-black font-medium">{message.count}</span>
                      </div>
                      <div>
                        <span className="text-gray">Succès:</span>
                        <span className="ml-2 text-green-600 font-medium">{message.success}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h4 className="font-medium text-black">Logs d'activité</h4>
              <div className="space-y-3">
                {details.activityLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-gray/20 rounded-lg">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <Clock className="w-4 h-4 text-gray" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-black">{log.action}</h5>
                        <span className="text-xs text-gray">{log.date}</span>
                      </div>
                      <p className="text-sm text-gray mt-1">{log.details}</p>
                    </div>
                    <div className={`text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status === 'success' ? '✓' : log.status === 'error' ? '✗' : 'ℹ'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4 border-t border-gray/20">
          <Button variant="outline" className="flex-1">
            <Edit3 className="w-4 h-4 mr-2" />
            Modifier utilisateur
          </Button>
          <Button variant="outline" className="flex-1">
            <Shield className="w-4 h-4 mr-2" />
            Suspendre compte
          </Button>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </Modal>
  );
}