'use client';

import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  ThumbsUp, 
  ChatCircle, 
  Share, 
  TrendingUp,
  CalendarBlank,
  Eye,
  Heart,
  Users
} from 'phosphor-react';

const engagementData = [
  { date: '01/10', likes: 45, comments: 12, shares: 8, views: 234 },
  { date: '02/10', likes: 62, comments: 18, shares: 12, views: 298 },
  { date: '03/10', likes: 38, comments: 15, shares: 6, views: 189 },
  { date: '04/10', likes: 71, comments: 22, shares: 15, views: 367 },
  { date: '05/10', likes: 89, comments: 28, shares: 18, views: 445 },
  { date: '06/10', likes: 95, comments: 31, shares: 22, views: 512 },
  { date: '07/10', likes: 67, comments: 25, shares: 14, views: 378 }
];

const topPosts = [
  {
    id: 1,
    content: "Comment automatiser vos publications LinkedIn en 2024 🚀",
    engagement: { likes: 156, comments: 43, shares: 28, views: 2340 },
    date: '2024-10-01',
    type: 'educational'
  },
  {
    id: 2,
    content: "Ma stratégie pour générer 100 leads par mois sur LinkedIn 💼",
    engagement: { likes: 134, comments: 67, shares: 45, views: 1890 },
    date: '2024-09-29',
    type: 'strategy'
  },
  {
    id: 3,
    content: "Les 5 erreurs à éviter absolument sur LinkedIn ❌",
    engagement: { likes: 98, comments: 29, shares: 18, views: 1456 },
    date: '2024-09-27',
    type: 'tips'
  }
];

export default function EngagementAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const stats = {
    totalLikes: 892,
    totalComments: 234,
    totalShares: 156,
    totalViews: 12547,
    engagementRate: 4.2,
    reach: 8934
  };

  const getEngagementColor = (rate: number) => {
    if (rate > 5) return 'text-green-600 bg-green-50';
    if (rate > 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Engagement</h1>
          <p className="text-gray">Analysez l'interaction avec votre audience</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
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
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Toutes les métriques</option>
            <option value="likes">Likes uniquement</option>
            <option value="comments">Commentaires</option>
            <option value="shares">Partages</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <Heart size={24} color="#dc2626" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalLikes}</p>
            <p className="text-sm text-gray">Likes totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <ChatCircle size={24} color="#2563eb" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalComments}</p>
            <p className="text-sm text-gray">Commentaires</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Share size={24} color="#16a34a" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalShares}</p>
            <p className="text-sm text-gray">Partages</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Eye size={24} color="#9333ea" />
            </div>
            <span className="text-sm text-green-600 font-medium">+22%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalViews.toLocaleString()}</p>
            <p className="text-sm text-gray">Vues totales</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <TrendingUp size={24} className="text-primary" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.engagementRate}%</p>
            <p className="text-sm text-gray">Taux d'engagement</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <Users size={24} color="#ea580c" />
            </div>
            <span className="text-sm text-green-600 font-medium">+18%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.reach.toLocaleString()}</p>
            <p className="text-sm text-gray">Portée</p>
          </div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <h2 className="text-xl font-semibold text-black mb-6">Évolution de l'engagement</h2>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData}>
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
              <Area 
                type="monotone" 
                dataKey="likes" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef4444"
                fillOpacity={0.6}
                name="Likes"
              />
              <Area 
                type="monotone" 
                dataKey="comments" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Commentaires"
              />
              <Area 
                type="monotone" 
                dataKey="shares" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name="Partages"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Posts */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Posts les plus performants</h2>
          
          <div className="space-y-6">
            {topPosts.map((post, index) => (
              <div key={post.id} className="border border-gray/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-black font-medium mb-2 line-clamp-2">
                      {post.content}
                    </p>
                    <p className="text-xs text-gray">{post.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-red-600">{post.engagement.likes}</p>
                    <p className="text-xs text-gray">Likes</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{post.engagement.comments}</p>
                    <p className="text-xs text-gray">Comm.</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{post.engagement.shares}</p>
                    <p className="text-xs text-gray">Partages</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">{post.engagement.views}</p>
                    <p className="text-xs text-gray">Vues</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement by Time */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Engagement par heure</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { hour: '8h', engagement: 12 },
                { hour: '10h', engagement: 25 },
                { hour: '12h', engagement: 45 },
                { hour: '14h', engagement: 38 },
                { hour: '16h', engagement: 52 },
                { hour: '18h', engagement: 67 },
                { hour: '20h', engagement: 43 },
                { hour: '22h', engagement: 28 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8c20f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-primary-light rounded-lg">
            <p className="text-sm text-primary font-medium">💡 Conseil</p>
            <p className="text-sm text-black mt-1">
              Votre audience est plus active entre 16h et 18h. Planifiez vos posts à ces heures pour maximiser l'engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}