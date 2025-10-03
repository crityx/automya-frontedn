'use client';

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ChatCircle, 
  PaperPlaneRight, 
  ArrowBendUpLeft, 
  Clock,
  TrendUp,
  Users,
  Target,
  CheckCircle,
  CalendarBlank,
  Lock
} from 'phosphor-react';
import Button from '@/components/ui/Button';

const messagesData = [
  { date: '01/10', sent: 15, received: 8, responses: 6, leads: 2 },
  { date: '02/10', sent: 22, received: 12, responses: 9, leads: 4 },
  { date: '03/10', sent: 18, received: 9, responses: 7, leads: 3 },
  { date: '04/10', sent: 28, received: 18, responses: 14, leads: 6 },
  { date: '05/10', sent: 31, received: 21, responses: 16, leads: 8 },
  { date: '06/10', sent: 25, received: 15, responses: 11, leads: 5 },
  { date: '07/10', sent: 33, received: 22, responses: 18, leads: 7 }
];

const conversationTypes = [
  { name: 'Première connexion', value: 45, color: '#8c20f5' },
  { name: 'Suivi prospects', value: 32, color: '#3B82F6' },
  { name: 'Relance leads', value: 18, color: '#10B981' },
  { name: 'Qualification', value: 5, color: '#F59E0B' }
];

const recentConversations = [
  {
    id: '1',
    contact: 'Marie Dubois',
    company: 'TechCorp',
    lastMessage: 'Merci pour ces informations, pourrions-nous planifier un call ?',
    time: 'Il y a 2h',
    status: 'hot',
    scenario: 'Première connexion',
    responseRate: 100
  },
  {
    id: '2',
    contact: 'Thomas Martin',
    company: 'StartupInc',
    lastMessage: 'Je vais en discuter avec mon équipe et reviens vers vous.',
    time: 'Il y a 4h',
    status: 'warm',
    scenario: 'Suivi prospects',
    responseRate: 75
  },
  {
    id: '3',
    contact: 'Julie Moreau',
    company: 'BigCompany',
    lastMessage: 'Intéressant, pouvez-vous m\'envoyer plus de détails ?',
    time: 'Hier',
    status: 'warm',
    scenario: 'Qualification',
    responseRate: 80
  }
];

const topScenarios = [
  { name: 'Première connexion', sent: 89, responses: 67, rate: 75.3 },
  { name: 'Suivi prospects', sent: 56, responses: 38, rate: 67.9 },
  { name: 'Relance leads', sent: 34, responses: 19, rate: 55.9 },
  { name: 'Qualification', sent: 23, responses: 16, rate: 69.6 }
];

export default function MessagesDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    totalSent: 234,
    totalReceived: 156,
    responseRate: 66.7,
    avgResponseTime: 2.4,
    leadsGenerated: 42,
    activeConversations: 18
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'hot': return 'Chaud';
      case 'warm': return 'Tiède';
      case 'cold': return 'Froid';
      default: return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard des messages</h1>
        <p className="text-gray">Analysez les performances de vos conversations automatisées</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border border-gray/20">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-gray" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray mb-4">Bientôt disponible</h2>
          <p className="text-gray mb-8 max-w-2xl mx-auto">
            Le dashboard avancé des performances de messages sera bientôt disponible pour analyser vos conversations en détail.
          </p>
        </div>

        <div className="opacity-60 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <CalendarBlank size={16} className="text-gray" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="day">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <PaperPlaneRight size={24} color="#2563eb" />
                </div>
                <span className="text-sm text-green-600 font-medium">+15%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.totalSent}</p>
                <p className="text-sm text-gray">Messages envoyés</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-green-50">
                  <ArrowBendUpLeft size={24} color="#16a34a" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.totalReceived}</p>
                <p className="text-sm text-gray">Réponses reçues</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary-light">
                  <TrendUp size={24} className="text-primary" />
                </div>
                <span className="text-sm text-green-600 font-medium">+5%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.responseRate}%</p>
                <p className="text-sm text-gray">Taux de réponse</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Clock size={24} color="#ea580c" />
                </div>
                <span className="text-sm text-green-600 font-medium">-12%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.avgResponseTime}h</p>
                <p className="text-sm text-gray">Temps de réponse</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Target size={24} color="#9333ea" />
                </div>
                <span className="text-sm text-green-600 font-medium">+22%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.leadsGenerated}</p>
                <p className="text-sm text-gray">Leads générés</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-red-50">
                  <ChatCircle size={24} color="#dc2626" />
                </div>
                <span className="text-sm text-green-600 font-medium">+18%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.activeConversations}</p>
                <p className="text-sm text-gray">Conversations actives</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-8 border border-gray/20">
              <h2 className="text-xl font-semibold text-black mb-6">Évolution des messages</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={messagesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="sent" stroke="#3B82F6" strokeWidth={2} name="Envoyés" />
                    <Line type="monotone" dataKey="received" stroke="#10B981" strokeWidth={2} name="Reçus" />
                    <Line type="monotone" dataKey="responses" stroke="#8c20f5" strokeWidth={2} name="Réponses" />
                    <Line type="monotone" dataKey="leads" stroke="#F59E0B" strokeWidth={2} name="Leads" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray/20">
              <h2 className="text-xl font-semibold text-black mb-6">Types de conversations</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversationTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conversationTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray/20">
              <h2 className="text-xl font-semibold text-black mb-6">Performance par scénario</h2>
              
              <div className="space-y-4">
                {topScenarios.map((scenario, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-black">{scenario.name}</h3>
                      <span className="text-lg font-bold text-primary">{scenario.rate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray mb-2">
                      <span>{scenario.sent} envoyés</span>
                      <span>{scenario.responses} réponses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${scenario.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray/20">
              <h2 className="text-xl font-semibold text-black mb-6">Conversations récentes</h2>
              
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <div key={conversation.id} className="border border-gray/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-black">{conversation.contact}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversation.status)}`}>
                            {getStatusLabel(conversation.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray mb-2">{conversation.company}</p>
                        <p className="text-sm text-black italic mb-2">"{conversation.lastMessage}"</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray">{conversation.time}</span>
                          <span className="text-xs text-primary font-medium">{conversation.scenario}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray">Taux de réponse</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${conversation.responseRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-black">{conversation.responseRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button disabled className="opacity-50 cursor-not-allowed">
            <Lock size={16} className="mr-2" />
            Configuration verrouillée
          </Button>
        </div>
      </div>

      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">Comment ça fonctionnera ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-800">
          <div>
            <strong>1. Collecte</strong><br />
            Analyse automatique de toutes vos conversations et interactions
          </div>
          <div>
            <strong>2. Analyse</strong><br />
            Génération de métriques avancées et insights comportementaux
          </div>
          <div>
            <strong>3. Optimisation</strong><br />
            Recommandations pour améliorer vos performances conversationnelles
          </div>
        </div>
      </div>
    </div>
  );
}