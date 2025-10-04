'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Target, 
  TrendUp, 
  CalendarBlank,
  Download,
  FunnelSimple,
  MagnifyingGlass,
  Envelope,
  Phone,
  LinkedinLogo
} from 'phosphor-react';
import Button from '@/components/ui/Button';

const leadsData = [
  { date: '01/10', leads: 3, qualified: 2, contacted: 1 },
  { date: '02/10', leads: 5, qualified: 4, contacted: 3 },
  { date: '03/10', leads: 2, qualified: 1, contacted: 1 },
  { date: '04/10', leads: 8, qualified: 6, contacted: 4 },
  { date: '05/10', leads: 6, qualified: 5, contacted: 3 },
  { date: '06/10', leads: 9, qualified: 7, contacted: 5 },
  { date: '07/10', leads: 4, qualified: 3, contacted: 2 }
];

const leadSources = [
  { name: 'Posts LinkedIn', value: 35, color: '#8c20f5' },
  { name: 'Messages directs', value: 28, color: '#3B82F6' },
  { name: 'Commentaires', value: 20, color: '#10B981' },
  { name: 'Connexions', value: 17, color: '#F59E0B' }
];

const recentLeads = [
  {
    id: '1',
    name: 'Marie Dubois',
    title: 'Directrice Marketing',
    company: 'TechCorp',
    email: 'marie.dubois@techcorp.com',
    phone: '+33 6 12 34 56 78',
    source: 'Post LinkedIn',
    status: 'qualified',
    score: 85,
    date: '2024-10-02'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    title: 'CEO',
    company: 'StartupInc',
    email: 'thomas@startupinc.com',
    phone: '+33 6 98 76 54 32',
    source: 'Message direct',
    status: 'contacted',
    score: 92,
    date: '2024-10-01'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    title: 'Responsable RH',
    company: 'BigCompany',
    email: 'j.moreau@bigcompany.fr',
    phone: '+33 6 11 22 33 44',
    source: 'Commentaire',
    status: 'new',
    score: 76,
    date: '2024-10-01'
  }
];

export default function LeadsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = {
    totalLeads: 127,
    qualifiedLeads: 89,
    conversionRate: 34.2,
    avgScore: 78
  };

  const exportLeads = () => {
    // TODO: Implement leads export
  };

  const contactLead = (leadId: string, method: string) => {
    // TODO: Implement lead contact via ${method}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'qualified': return 'Qualifié';
      case 'contacted': return 'Contacté';
      case 'converted': return 'Converti';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Leads captés</h1>
          <p className="text-gray">Analysez et gérez vos prospects LinkedIn</p>
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
          
          <Button onClick={exportLeads} variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users size={24} color="#2563eb" />
            </div>
            <span className="text-sm text-green-600 font-medium">+18%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalLeads}</p>
            <p className="text-sm text-gray">Leads totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Target size={24} color="#16a34a" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.qualifiedLeads}</p>
            <p className="text-sm text-gray">Leads qualifiés</p>
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
            <p className="text-2xl font-bold text-black mb-1">{stats.conversionRate}%</p>
            <p className="text-sm text-gray">Taux de conversion</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Target size={24} color="#d97706" />
            </div>
            <span className="text-sm text-green-600 font-medium">+3%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgScore}</p>
            <p className="text-sm text-gray">Score moyen</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Leads Evolution */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Évolution des leads</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#8c20f5" strokeWidth={2} name="Leads" />
                <Line type="monotone" dataKey="qualified" stroke="#10B981" strokeWidth={2} name="Qualifiés" />
                <Line type="monotone" dataKey="contacted" stroke="#F59E0B" strokeWidth={2} name="Contactés" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Sources des leads</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-black">Leads récents</h2>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Rechercher un lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tous les statuts</option>
                <option value="new">Nouveaux</option>
                <option value="qualified">Qualifiés</option>
                <option value="contacted">Contactés</option>
                <option value="converted">Convertis</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray/20">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">{lead.name}</div>
                      <div className="text-sm text-gray">{lead.title}</div>
                      <div className="text-xs text-gray mt-1">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-black">{lead.score}</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${lead.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => contactLead(lead.id, 'email')}
                        className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
                        title="Envoyer un email"
                      >
                        <Envelope size={16} color="#6b7280" />
                      </button>
                      <button
                        onClick={() => contactLead(lead.id, 'linkedin')}
                        className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
                        title="Contacter sur LinkedIn"
                      >
                        <LinkedinLogo size={16} color="#6b7280" />
                      </button>
                      <button
                        onClick={() => contactLead(lead.id, 'phone')}
                        className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
                        title="Appeler"
                      >
                        <Phone size={16} color="#6b7280" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}