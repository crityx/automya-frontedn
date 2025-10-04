'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Coins, Clock, CalendarBlank, ArrowRight } from 'phosphor-react';
import Button from './Button';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  expiringCredits?: number;
  expirationDate?: string;
}

interface CreditCost {
  action: string;
  cost: number;
  icon: string;
}

interface CreditHistory {
  id: string;
  date: string;
  time: string;
  user: string;
  event: string;
  eventIcon: string;
  expiration?: string;
  credits: number;
  type: 'usage' | 'purchase' | 'bonus';
}

const creditCosts: CreditCost[] = [
  { action: 'Génération de posts (3 variantes)', cost: 5, icon: '📝' },
  { action: 'Génération d\'images IA', cost: 5, icon: '🖼️' },
  { action: 'Régénération de post', cost: 1, icon: '🔄' },
  { action: 'Entraînement de modèle IA photo', cost: 10, icon: '🤖' },
];

const mockHistory: CreditHistory[] = [
  {
    id: '1',
    date: '02/10/2025',
    time: '7:41 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération d\'illustrations',
    eventIcon: '🖼️',
    credits: -5,
    type: 'usage'
  },
  {
    id: '2',
    date: '02/10/2025',
    time: '7:41 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération d\'illustrations',
    eventIcon: '🖼️',
    credits: -5,
    type: 'usage'
  },
  {
    id: '3',
    date: '02/10/2025',
    time: '7:39 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération d\'illustrations',
    eventIcon: '🖼️',
    credits: -5,
    type: 'usage'
  },
  {
    id: '4',
    date: '02/10/2025',
    time: '7:35 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération d\'illustrations',
    eventIcon: '🖼️',
    credits: -5,
    type: 'usage'
  },
  {
    id: '5',
    date: '02/10/2025',
    time: '6:30 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération de posts via les actualités',
    eventIcon: '🗞️',
    credits: -1,
    type: 'usage'
  },
  {
    id: '6',
    date: '01/10/2025',
    time: '8:35 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Génération de posts via les actualités',
    eventIcon: '🗞️',
    credits: -1,
    type: 'usage'
  },
  {
    id: '7',
    date: '01/10/2025',
    time: '8:29 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Régénération de posts',
    eventIcon: '🔄',
    credits: -1,
    type: 'usage'
  },
  {
    id: '8',
    date: '29/09/2025',
    time: '6:10 pm',
    user: 'Baptiste Li Mandri 🔵',
    event: 'Free plan credits',
    eventIcon: '🎁',
    expiration: '29/12/2025',
    credits: 25,
    type: 'bonus'
  }
];

export default function CreditsModal({ 
  isOpen, 
  onClose, 
  currentCredits = 2,
  expiringCredits = 2,
  expirationDate = '3 mois'
}: CreditsModalProps) {
  const [activeTab, setActiveTab] = useState<'costs' | 'history'>('costs');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-light">
              <Coins size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">Détails des crédits</h2>
              <p className="text-gray text-sm">Gestion et historique de vos crédits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray/10 transition-colors"
          >
            <X size={20} className="text-gray" />
          </button>
        </div>

        {/* Credits Summary */}
        <div className="p-6 border-b border-gray/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-light rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Coins size={20} className="text-primary" />
                <span className="text-sm font-medium text-primary">Crédits actuels</span>
              </div>
              <p className="text-2xl font-bold text-black">{currentCredits}</p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={20} className="text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Crédits expirant</span>
              </div>
              <p className="text-2xl font-bold text-black">{expiringCredits}</p>
              <p className="text-xs text-orange-600">dans {expirationDate}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 flex items-center justify-center">
              <Link href="/profile/credits" className="w-full">
                <Button className="w-full flex items-center justify-center space-x-2">
                  <span>Obtenir plus de crédits</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray/20">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('costs')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'costs'
                  ? 'text-primary border-primary bg-primary/5'
                  : 'text-gray border-transparent hover:text-black'
              }`}
            >
              Détails des coûts
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'text-primary border-primary bg-primary/5'
                  : 'text-gray border-transparent hover:text-black'
              }`}
            >
              Historique d&apos;utilisation
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'costs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black mb-4">
                Coûts par action
              </h3>
              {creditCosts.map((cost, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{cost.icon}</span>
                    <span className="text-black font-medium">{cost.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins size={16} className="text-primary" />
                    <span className="text-primary font-bold">{cost.cost} crédit{cost.cost > 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black mb-4">
                Historique des transactions
              </h3>
              
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-3 bg-gray/10 rounded-lg text-sm font-medium text-gray">
                <span>Date et heure</span>
                <span>Utilisateur</span>
                <span>Évènement</span>
                <span>Expiration</span>
                <span className="text-right">Crédits</span>
              </div>
              
              {/* Table Content */}
              <div className="space-y-2">
                {mockHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-5 gap-4 p-3 bg-white border border-gray/20 rounded-lg text-sm hover:bg-gray/5 transition-colors"
                  >
                    <div>
                      <p className="text-black font-medium">{item.date}</p>
                      <p className="text-gray text-xs">{item.time}</p>
                    </div>
                    
                    <div>
                      <p className="text-black text-xs">{item.user}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span>{item.eventIcon}</span>
                      <span className="text-black">{item.event}</span>
                    </div>
                    
                    <div>
                      {item.expiration ? (
                        <div className="flex items-center space-x-1">
                          <CalendarBlank size={12} className="text-gray" />
                          <span className="text-gray text-xs">{item.expiration}</span>
                        </div>
                      ) : (
                        <span className="text-gray text-xs">-</span>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <span 
                        className={`font-bold text-sm ${
                          item.credits > 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}
                      >
                        {item.credits > 0 ? '+' : ''}{item.credits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}