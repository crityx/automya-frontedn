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
  Users, 
  CurrencyDollar, 
  TrendUp, 
  Globe,
  User,
  ChatCircle,
  CreditCard,
  Trophy,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown
} from 'phosphor-react';
import Button from '@/components/ui/Button';

const platformGrowthData = [
  { month: 'Jan', users: 1250, revenue: 25600, sellers: 12, posts: 4500 },
  { month: 'Fév', users: 1680, revenue: 34200, sellers: 15, posts: 6200 },
  { month: 'Mar', users: 2100, revenue: 42800, sellers: 18, posts: 7800 },
  { month: 'Avr', users: 2450, revenue: 49500, sellers: 21, posts: 8900 },
  { month: 'Mai', users: 2890, revenue: 58200, sellers: 25, posts: 10500 },
  { month: 'Jun', users: 3420, revenue: 68900, sellers: 28, posts: 12300 },
  { month: 'Jul', users: 3950, revenue: 79500, sellers: 32, posts: 14100 },
  { month: 'Aoû', users: 4580, revenue: 92100, sellers: 35, posts: 16200 },
  { month: 'Sep', users: 5120, revenue: 103400, sellers: 38, posts: 18000 },
  { month: 'Oct', users: 5780, revenue: 116800, sellers: 42, posts: 20400 }
];

const subscriptionDistribution = [
  { name: 'Gratuit', value: 2890, color: '#94A3B8', revenue: 0 },
  { name: 'Premium', value: 2100, color: '#8c20f5', revenue: 58800 },
  { name: 'Enterprise', value: 790, color: '#3B82F6', revenue: 58000 }
];

const topSellerPerformance = [
  { name: 'Sophie Martin', users: 156, revenue: 8900, commission: 1335, growth: 15.2 },
  { name: 'Marc Dubois', users: 134, revenue: 7800, commission: 1404, growth: 12.8 },
  { name: 'Julie Moreau', users: 98, revenue: 5600, commission: 672, growth: 8.9 },
  { name: 'Pierre Rousseau', users: 87, revenue: 4900, commission: 490, growth: 6.7 },
  { name: 'Anne Lefebvre', users: 76, revenue: 4200, commission: 504, growth: 9.1 }
];

const geographicData = [
  { country: 'France', users: 3450, percentage: 59.7 },
  { country: 'Belgique', users: 890, percentage: 15.4 },
  { country: 'Suisse', users: 560, percentage: 9.7 },
  { country: 'Canada', users: 420, percentage: 7.3 },
  { country: 'Autres', users: 460, percentage: 7.9 }
];

const dailyActivity = [
  { hour: '00', activity: 120 },
  { hour: '06', activity: 280 },
  { hour: '08', activity: 520 },
  { hour: '09', activity: 890 },
  { hour: '10', activity: 1200 },
  { hour: '11', activity: 1450 },
  { hour: '12', activity: 980 },
  { hour: '14', activity: 1350 },
  { hour: '15', activity: 1580 },
  { hour: '16', activity: 1200 },
  { hour: '18', activity: 890 },
  { hour: '20', activity: 650 },
  { hour: '22', activity: 320 }
];

export default function GlobalStats() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const globalStats = {
    totalUsers: 5780,
    totalRevenue: 116800,
    totalSellers: 42,
    totalPosts: 20400,
    avgRevenuePerUser: 20.2,
    churnRate: 3.2,
    conversionRate: 24.8,
    platformGrowth: 18.5
  };

  const getGrowthIcon = (isPositive: boolean) => {
    return isPositive ? (
      <ArrowUp size={16} color="#16a34a" />
    ) : (
      <ArrowDown size={16} color="#dc2626" />
    );
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Statistiques globales</h1>
          <p className="text-gray">Vue d'ensemble de la performance de la plateforme Automya</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray" />
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
            <Download className="w-4 h-4 mr-2" />
            Exporter rapport
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              {getGrowthIcon(true)}
              <span className="text-sm font-medium">+{globalStats.platformGrowth}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{globalStats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray">Utilisateurs totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CurrencyDollar className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              {getGrowthIcon(true)}
              <span className="text-sm font-medium">+22%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{globalStats.totalRevenue.toLocaleString()}€</p>
            <p className="text-sm text-gray">Revenus totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              {getGrowthIcon(true)}
              <span className="text-sm font-medium">+15%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{globalStats.totalSellers}</p>
            <p className="text-sm text-gray">Vendeurs actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <ChatCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              {getGrowthIcon(true)}
              <span className="text-sm font-medium">+28%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{globalStats.totalPosts.toLocaleString()}</p>
            <p className="text-sm text-gray">Posts générés</p>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Platform Growth */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Croissance de la plateforme</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={platformGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8c20f5" 
                  fill="#8c20f5" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Utilisateurs"
                />
                <Area 
                  type="monotone" 
                  dataKey="sellers" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Vendeurs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Evolution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Évolution des revenus</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={platformGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Revenus (€)"
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
                  data={subscriptionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {subscriptionDistribution.map((sub, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: sub.color }}
                  ></div>
                  <span className="text-sm font-medium text-black">{sub.name}</span>
                </div>
                <div className="text-lg font-bold text-black">{sub.value.toLocaleString()}</div>
                <div className="text-xs text-gray">{sub.revenue.toLocaleString()}€</div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Activité quotidienne</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="activity" fill="#8c20f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Sellers Performance */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Top vendeurs</h2>
          
          <div className="space-y-4">
            {topSellerPerformance.map((seller, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-bold rounded-full">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-black">{seller.name}</h3>
                    <p className="text-sm text-gray">{seller.users} utilisateurs</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-black">{seller.revenue.toLocaleString()}€</div>
                  <div className="text-sm text-gray">Commission: {seller.commission}€</div>
                  <div className="flex items-center space-x-1 text-green-600 text-sm">
                    {getGrowthIcon(true)}
                    <span>+{seller.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Répartition géographique</h2>
          
          <div className="space-y-4">
            {geographicData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray" />
                  <span className="font-medium text-black">{country.country}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-black">{country.users.toLocaleString()}</div>
                    <div className="text-sm text-gray">{country.percentage}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Métriques de performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-black mb-1">{globalStats.avgRevenuePerUser}€</div>
            <div className="text-sm text-gray">ARPU moyen</div>
            <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mt-1">
              {getGrowthIcon(true)}
              <span>+5.2%</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-black mb-1">{globalStats.conversionRate}%</div>
            <div className="text-sm text-gray">Taux de conversion</div>
            <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mt-1">
              {getGrowthIcon(true)}
              <span>+2.8%</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-black mb-1">{globalStats.churnRate}%</div>
            <div className="text-sm text-gray">Taux de désabonnement</div>
            <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mt-1">
              {getGrowthIcon(false)}
              <span className="text-green-600">-0.8%</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-black mb-1">4.8/5</div>
            <div className="text-sm text-gray">Satisfaction client</div>
            <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mt-1">
              {getGrowthIcon(true)}
              <span>+0.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}