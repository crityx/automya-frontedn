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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendUp, 
  Users, 
  CreditCard, 
  CurrencyDollar,
  CalendarBlank,
  Target,
  Award,
  ArrowUp,
  ArrowDown
} from 'phosphor-react';
import Button from '@/components/ui/Button';

const revenueData = [
  { month: 'Jan', revenue: 4500, users: 45, credits: 15000 },
  { month: 'Fév', revenue: 5200, users: 52, credits: 18500 },
  { month: 'Mar', revenue: 6100, users: 61, credits: 22000 },
  { month: 'Avr', revenue: 5800, users: 58, credits: 19500 },
  { month: 'Mai', revenue: 7200, users: 72, credits: 26000 },
  { month: 'Jun', revenue: 8100, users: 81, credits: 29500 },
  { month: 'Jul', revenue: 7900, users: 79, credits: 28000 },
  { month: 'Aoû', revenue: 8800, users: 88, credits: 32000 },
  { month: 'Sep', revenue: 9500, users: 95, credits: 35500 },
  { month: 'Oct', revenue: 10200, users: 102, credits: 38000 }
];

const subscriptionData = [
  { name: 'Gratuit', value: 45, color: '#94A3B8' },
  { name: 'Premium', value: 32, color: '#8c20f5' },
  { name: 'Enterprise', value: 23, color: '#3B82F6' }
];

const userGrowthData = [
  { date: '01/10', newUsers: 5, totalUsers: 95 },
  { date: '02/10', newUsers: 8, totalUsers: 103 },
  { date: '03/10', newUsers: 6, totalUsers: 109 },
  { date: '04/10', newUsers: 12, totalUsers: 121 },
  { date: '05/10', newUsers: 9, totalUsers: 130 },
  { date: '06/10', newUsers: 15, totalUsers: 145 },
  { date: '07/10', newUsers: 11, totalUsers: 156 }
];

const topPerformers = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie@exemple.com',
    subscription: 'Premium',
    monthlyRevenue: 29,
    totalSpent: 580,
    leads: 67,
    growth: '+15%'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@exemple.com',
    subscription: 'Enterprise',
    monthlyRevenue: 99,
    totalSpent: 1980,
    leads: 156,
    growth: '+22%'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    email: 'julie@exemple.com',
    subscription: 'Premium',
    monthlyRevenue: 29,
    totalSpent: 290,
    leads: 45,
    growth: '+8%'
  }
];

export default function SellerAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalRevenue: 10200,
    totalUsers: 156,
    avgRevenuePerUser: 65.4,
    creditsSold: 38000,
    conversionRate: 68.2,
    churnRate: 5.3,
    monthlyGrowth: 12.5
  };

  const getGrowthIcon = (growth: string) => {
    const isPositive = growth.startsWith('+');
    return isPositive ? (
      <ArrowUp className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: string) => {
    return growth.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Dashboard Vendeur - Analytics</h1>
          <p className="text-gray">Analysez vos performances de vente et croissance</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <CalendarBlank size={16} className="text-gray" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          
          <Button variant="outline">
            <Target size={16} className="mr-2" />
            Définir objectifs
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CurrencyDollar size={24} color="#16a34a" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">+{stats.monthlyGrowth}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalRevenue.toLocaleString()}€</p>
            <p className="text-sm text-gray">Revenus ce mois</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users size={24} color="#2563eb" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">+18%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalUsers}</p>
            <p className="text-sm text-gray">Utilisateurs actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <CreditCard size={24} className="text-primary" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">+25%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.creditsSold.toLocaleString()}</p>
            <p className="text-sm text-gray">Crédits vendus</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendUp size={24} color="#ea580c" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">+5%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgRevenuePerUser}€</p>
            <p className="text-sm text-gray">ARPU moyen</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Evolution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Évolution des revenus</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8c20f5" 
                  fill="#8c20f5" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Revenus (€)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Croissance utilisateurs</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Nouveaux utilisateurs"
                />
                <Line 
                  type="monotone" 
                  dataKey="totalUsers" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Total utilisateurs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Subscription Distribution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Répartition des abonnements</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {subscriptionData.map((sub, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: sub.color }}
                  ></div>
                  <span className="text-sm font-medium text-black">{sub.name}</span>
                </div>
                <span className="text-lg font-bold text-black">{sub.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Métriques clés</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray">Taux de conversion</p>
                <p className="text-xl font-bold text-black">{stats.conversionRate}%</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <ArrowUp size={16} />
                <span className="text-sm font-medium">+3.2%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray">Taux de désabonnement</p>
                <p className="text-xl font-bold text-black">{stats.churnRate}%</p>
              </div>
              <div className="flex items-center space-x-1 text-red-600">
                <ArrowDown size={16} />
                <span className="text-sm font-medium">-1.1%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray">Objectif mensuel</p>
                <p className="text-xl font-bold text-black">15 000€</p>
              </div>
              <div className="text-sm text-primary font-medium">
                68% atteint
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">Top utilisateurs performants</h2>
          <Button variant="outline" size="sm">
            <Award size={16} className="mr-2" />
            Voir tous
          </Button>
        </div>
        
        <div className="space-y-4">
          {topPerformers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-bold rounded-full">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-black">{user.name}</h3>
                  <p className="text-sm text-gray">{user.email}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {user.subscription}
                    </span>
                    <span className="text-xs text-gray">{user.leads} leads générés</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-black">{user.monthlyRevenue}€/mois</div>
                <div className="text-sm text-gray">Total: {user.totalSpent}€</div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${getGrowthColor(user.growth)}`}>
                  {getGrowthIcon(user.growth)}
                  <span>{user.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}