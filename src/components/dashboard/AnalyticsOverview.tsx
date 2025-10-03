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
  ThumbsUp, 
  Share, 
  UserPlus, 
  Target,
  TrendUp,
  TrendDown,
  CalendarBlank
} from 'phosphor-react';

const mockData = [
  { date: '01/10', comments: 12, reactions: 45, shares: 8, peopleAdded: 5, leadsCaptured: 3 },
  { date: '02/10', comments: 18, reactions: 62, shares: 12, peopleAdded: 8, leadsCaptured: 5 },
  { date: '03/10', comments: 15, reactions: 38, shares: 6, peopleAdded: 3, leadsCaptured: 2 },
  { date: '04/10', comments: 22, reactions: 71, shares: 15, peopleAdded: 12, leadsCaptured: 8 },
  { date: '05/10', comments: 28, reactions: 89, shares: 18, peopleAdded: 15, leadsCaptured: 11 },
  { date: '06/10', comments: 31, reactions: 95, shares: 22, peopleAdded: 18, leadsCaptured: 14 },
  { date: '07/10', comments: 25, reactions: 67, shares: 14, peopleAdded: 9, leadsCaptured: 7 }
];

const kpiData = [
  {
    title: 'Commentaires',
    value: 151,
    change: +12.5,
    icon: <ChatCircle size={24} color="#2563eb" />,
    color: '#3B82F6'
  },
  {
    title: 'Réactions',
    value: 467,
    change: +8.2,
    icon: <ThumbsUp size={24} color="#16a34a" />,
    color: '#10B981'
  },
  {
    title: 'Partages',
    value: 95,
    change: -2.1,
    icon: <Share size={24} color="#ea580c" />,
    color: '#F59E0B'
  },
  {
    title: 'Personnes ajoutées',
    value: 70,
    change: +15.3,
    icon: <UserPlus size={24} color="#9333ea" />,
    color: '#8B5CF6'
  },
  {
    title: 'Leads captés',
    value: 50,
    change: +22.8,
    icon: <Target size={24} className="text-primary" />,
    color: '#8c20f5'
  }
];

const engagementData = [
  { name: 'Commentaires', value: 151, color: '#3B82F6' },
  { name: 'Réactions', value: 467, color: '#10B981' },
  { name: 'Partages', value: 95, color: '#F59E0B' },
];

export default function AnalyticsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { key: 'day', label: 'Jour' },
    { key: 'week', label: 'Semaine' },
    { key: 'month', label: 'Mois' },
    { key: 'year', label: 'Année' }
  ];

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Analytics - Vue d'ensemble</h1>
          <p className="text-gray">Suivez les performances de votre activité LinkedIn</p>
        </div>
        
        {/* Period Filter */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <CalendarBlank size={16} className="text-gray" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {periods.map(period => (
              <option key={period.key} value={period.key}>{period.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-50">
                {kpi.icon}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change >= 0 ? (
                  <TrendUp size={16} />
                ) : (
                  <TrendDown size={16} />
                )}
                <span>{Math.abs(kpi.change)}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-black mb-1">{kpi.value}</p>
              <p className="text-sm text-gray">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            Évolution des performances
          </h2>
          <p className="text-gray">Analyse détaillée de vos métriques sur la période sélectionnée</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Commentaires"
              />
              <Line 
                type="monotone" 
                dataKey="reactions" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Réactions"
              />
              <Line 
                type="monotone" 
                dataKey="shares" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Partages"
              />
              <Line 
                type="monotone" 
                dataKey="peopleAdded" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Personnes ajoutées"
              />
              <Line 
                type="monotone" 
                dataKey="leadsCaptured" 
                stroke="#8c20f5" 
                strokeWidth={2}
                name="Leads captés"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Breakdown */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">
            Répartition de l'engagement
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">
            Contenu le plus performant
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Comment automatiser vos publications LinkedIn', engagement: 125, leads: 8 },
              { title: 'Les 5 erreurs à éviter sur LinkedIn', engagement: 98, leads: 6 },
              { title: 'Ma stratégie pour générer 100 leads/mois', engagement: 87, leads: 12 },
            ].map((post, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-black mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray">
                  <span>{post.engagement} interactions</span>
                  <span>•</span>
                  <span>{post.leads} leads générés</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}