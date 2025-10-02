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
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart,
  MessageCircle,
  Share,
  Users,
  Calendar,
  Award,
  Download
} from 'lucide-react';
import Button from '@/components/ui/Button';

const postPerformanceData = [
  { date: '01/10', views: 1250, likes: 89, comments: 23, shares: 12, leads: 3 },
  { date: '02/10', views: 2100, likes: 156, comments: 34, shares: 28, leads: 7 },
  { date: '03/10', views: 1800, likes: 134, comments: 28, shares: 19, leads: 5 },
  { date: '04/10', views: 3200, likes: 245, comments: 56, shares: 41, leads: 12 },
  { date: '05/10', views: 2890, likes: 198, comments: 42, shares: 35, leads: 9 },
  { date: '06/10', views: 2650, likes: 187, comments: 38, shares: 29, leads: 8 },
  { date: '07/10', views: 4100, likes: 312, comments: 67, shares: 52, leads: 15 }
];

const postTypes = [
  { name: 'Éducatif', value: 42, color: '#8c20f5' },
  { name: 'Stratégie', value: 28, color: '#3B82F6' },
  { name: 'Témoignage', value: 18, color: '#10B981' },
  { name: 'Personnel', value: 12, color: '#F59E0B' }
];

const topPosts = [
  {
    id: '1',
    title: '5 secrets pour automatiser LinkedIn sans risque',
    date: '2024-10-04',
    views: 4100,
    likes: 312,
    comments: 67,
    shares: 52,
    engagementRate: 10.5,
    type: 'educational'
  },
  {
    id: '2',
    title: 'Comment j\'ai généré 50 leads en une semaine',
    date: '2024-10-02',
    views: 2100,
    likes: 156,
    comments: 34,
    shares: 28,
    engagementRate: 10.4,
    type: 'strategy'
  },
  {
    id: '3',
    title: 'Témoignage client : +300% de croissance',
    date: '2024-10-05',
    views: 2890,
    likes: 198,
    comments: 42,
    shares: 35,
    engagementRate: 9.5,
    type: 'testimonial'
  }
];

const bestTimes = [
  { hour: '08:00', engagement: 5.2 },
  { hour: '09:00', engagement: 8.7 },
  { hour: '10:00', engagement: 12.3 },
  { hour: '11:00', engagement: 9.8 },
  { hour: '12:00', engagement: 6.4 },
  { hour: '13:00', engagement: 4.1 },
  { hour: '14:00', engagement: 7.9 },
  { hour: '15:00', engagement: 9.2 },
  { hour: '16:00', engagement: 8.5 },
  { hour: '17:00', engagement: 6.8 },
  { hour: '18:00', engagement: 5.3 },
  { hour: '19:00', engagement: 3.9 }
];

export default function PostAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    totalViews: 18290,
    totalLikes: 1321,
    totalComments: 288,
    totalShares: 216,
    avgEngagementRate: 8.7,
    totalLeads: 59,
    postsPublished: 12,
    bestPerformingType: 'Éducatif'
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'educational': return 'bg-purple-100 text-purple-800';
      case 'strategy': return 'bg-blue-100 text-blue-800';
      case 'testimonial': return 'bg-green-100 text-green-800';
      case 'personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'educational': return 'Éducatif';
      case 'strategy': return 'Stratégie';
      case 'testimonial': return 'Témoignage';
      case 'personal': return 'Personnel';
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Analytics des posts</h1>
          <p className="text-gray">Analysez les performances de vos publications LinkedIn</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray" />
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
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+23%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalViews.toLocaleString()}</p>
            <p className="text-sm text-gray">Vues totales</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+18%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalLikes.toLocaleString()}</p>
            <p className="text-sm text-gray">Likes totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalComments}</p>
            <p className="text-sm text-gray">Commentaires</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgEngagementRate}%</p>
            <p className="text-sm text-gray">Taux d'engagement</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Evolution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Évolution des performances</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={postPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Vues" />
                <Line type="monotone" dataKey="likes" stroke="#EF4444" strokeWidth={2} name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#10B981" strokeWidth={2} name="Commentaires" />
                <Line type="monotone" dataKey="leads" stroke="#8c20f5" strokeWidth={2} name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Post Types Distribution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Répartition par type de contenu</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={postTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {postTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Best Posting Times */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Meilleurs créneaux de publication</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8c20f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Meilleur créneau : 10h00 - 11h00 (12.3% d'engagement)
              </span>
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Posts les plus performants</h2>
          
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="p-4 border border-gray/20 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full">
                        {index + 1}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(post.type)}`}>
                        {getTypeName(post.type)}
                      </span>
                    </div>
                    <h3 className="font-medium text-black mb-2">{post.title}</h3>
                    <p className="text-sm text-gray mb-3">📅 {new Date(post.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Eye className="w-4 h-4 text-gray" />
                      <span className="text-sm font-medium text-black">{post.views.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-gray">Vues</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Heart className="w-4 h-4 text-gray" />
                      <span className="text-sm font-medium text-black">{post.likes}</span>
                    </div>
                    <span className="text-xs text-gray">Likes</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <MessageCircle className="w-4 h-4 text-gray" />
                      <span className="text-sm font-medium text-black">{post.comments}</span>
                    </div>
                    <span className="text-xs text-gray">Commentaires</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-gray" />
                      <span className="text-sm font-medium text-primary">{post.engagementRate}%</span>
                    </div>
                    <span className="text-xs text-gray">Engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalLeads}</p>
            <p className="text-sm text-gray">Leads générés</p>
            <p className="text-xs text-green-600 mt-1">+35% ce mois</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.postsPublished}</p>
            <p className="text-sm text-gray">Posts publiés</p>
            <p className="text-xs text-primary mt-1">Cette semaine</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-black mb-1">{stats.bestPerformingType}</p>
            <p className="text-sm text-gray">Type le plus performant</p>
            <p className="text-xs text-green-600 mt-1">42% du contenu</p>
          </div>
        </div>
      </div>
    </div>
  );
}