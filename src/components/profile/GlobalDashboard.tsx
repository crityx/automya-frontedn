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
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendUp, 
  Users, 
  ChatCircle, 
  Target,
  CalendarBlank,
  Diamond,
  Award,
  Clock
} from 'phosphor-react';

const globalData = [
  { date: '01/10', posts: 3, leads: 2, messages: 12, engagement: 45 },
  { date: '02/10', posts: 2, leads: 4, messages: 18, engagement: 62 },
  { date: '03/10', posts: 4, leads: 3, messages: 15, engagement: 38 },
  { date: '04/10', posts: 3, leads: 6, messages: 22, engagement: 71 },
  { date: '05/10', posts: 5, leads: 8, messages: 28, engagement: 89 },
  { date: '06/10', posts: 3, leads: 5, messages: 31, engagement: 95 },
  { date: '07/10', posts: 4, leads: 7, messages: 25, engagement: 67 }
];

export default function GlobalDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const totalStats = {
    totalPosts: 156,
    totalLeads: 89,
    totalMessages: 547,
    totalCreditsUsed: 1247,
    currentStreak: 12,
    accountAge: 45
  };

  const achievements = [
    { title: 'Premier post', description: 'Votre premier post publié', unlocked: true, icon: '🎉' },
    { title: '10 leads générés', description: '10 leads captés avec succès', unlocked: true, icon: '🎯' },
    { title: '100 messages envoyés', description: '100 messages automatisés', unlocked: true, icon: '💬' },
    { title: 'Semaine parfaite', description: '7 jours d\'activité consécutifs', unlocked: true, icon: '🔥' },
    { title: 'Expert LinkedIn', description: '500 interactions générées', unlocked: false, icon: '🏆' },
    { title: 'Maître de l\'automatisation', description: '1000 crédits utilisés', unlocked: false, icon: '⚡' }
  ];

  const recentActivity = [
    { type: 'post', description: 'Post publié: "Les tendances LinkedIn 2024"', time: 'Il y a 2h', icon: '📝' },
    { type: 'lead', description: 'Nouveau lead: Marie Dubois', time: 'Il y a 4h', icon: '🎯' },
    { type: 'message', description: '5 messages automatiques envoyés', time: 'Il y a 6h', icon: '💬' },
    { type: 'connection', description: '3 nouvelles connexions LinkedIn', time: 'Hier', icon: '🤝' },
    { type: 'engagement', description: '12 nouvelles réactions sur vos posts', time: 'Hier', icon: '👍' }
  ];

  const periods = [
    { key: 'day', label: 'Aujourd\'hui' },
    { key: 'week', label: 'Cette semaine' },
    { key: 'month', label: 'Ce mois' },
    { key: 'year', label: 'Cette année' }
  ];

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Dashboard Global</h1>
          <p className="text-gray">Vue d'ensemble consolidée de votre activité Automya</p>
        </div>
        
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <ChatCircle size={20} className="text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalPosts}</p>
            <p className="text-sm text-gray">Posts publiés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-green-50">
              <Target size={20} className="text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalLeads}</p>
            <p className="text-sm text-gray">Leads générés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <Users size={20} className="text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalMessages}</p>
            <p className="text-sm text-gray">Messages envoyés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary-light">
              <Diamond size={20} className="text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.totalCreditsUsed}</p>
            <p className="text-sm text-gray">Crédits utilisés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-orange-50">
              <Award size={20} className="text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.currentStreak}</p>
            <p className="text-sm text-gray">Jours consécutifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <Clock size={20} className="text-gray-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{totalStats.accountAge}</p>
            <p className="text-sm text-gray">Jours d'ancienneté</p>
          </div>
        </div>
      </div>

      {/* Global Performance Chart */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <h2 className="text-xl font-semibold text-black mb-6">Performance globale</h2>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalData}>
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
                dataKey="engagement" 
                stroke="#8c20f5" 
                fill="#8c20f5"
                fillOpacity={0.1}
                strokeWidth={2}
                name="Engagement total"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Succès débloqués</h2>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${
                achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Activité récente</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-black font-medium">{activity.description}</p>
                  <p className="text-xs text-gray mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-sm text-primary hover:underline">
              Voir toute l'activité
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}