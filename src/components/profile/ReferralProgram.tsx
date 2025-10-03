'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { 
  Gift, 
  Users, 
  Copy, 
  Share, 
  Envelope, 
  ChatCircle,
  ArrowSquareOut,
  Trophy,
  Gem
} from 'phosphor-react';

export default function ReferralProgram() {
  const [referralCode] = useState('AUTOMYA-PG2024');
  const [copied, setCopied] = useState(false);

  const stats = {
    referrals: 12,
    activeReferrals: 8,
    totalEarnings: 340,
    thisMonth: 85
  };

  const recentReferrals = [
    { name: 'Marie Dupont', email: 'm***@gmail.com', date: '2024-09-28', status: 'active', earnings: 30 },
    { name: 'Thomas Martin', email: 't***@outlook.com', date: '2024-09-25', status: 'active', earnings: 30 },
    { name: 'Julie Moreau', email: 'j***@yahoo.fr', date: '2024-09-22', status: 'pending', earnings: 0 },
    { name: 'Pierre Durand', email: 'p***@gmail.com', date: '2024-09-20', status: 'active', earnings: 30 }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`https://automya.com/register?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Email',
      icon: <Envelope size={20} />,
      action: () => {
        const subject = 'Découvrez Automya - Automatisation LinkedIn';
        const body = `Salut ! Je voulais te parler d'Automya, un outil incroyable pour automatiser LinkedIn. Utilise mon code de parrainage pour bénéficier d'avantages : https://automya.com/register?ref=${referralCode}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }
    },
    {
      name: 'WhatsApp',
      icon: <ChatCircle size={20} />,
      action: () => {
        const message = `Découvre Automya pour automatiser ton LinkedIn ! Utilise mon lien de parrainage : https://automya.com/register?ref=${referralCode}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
      }
    },
    {
      name: 'LinkedIn',
      icon: <ArrowSquareOut size={20} />,
      action: () => {
        const message = `Je recommande Automya pour automatiser votre LinkedIn ! Lien de parrainage : https://automya.com/register?ref=${referralCode}`;
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://automya.com/register?ref=${referralCode}`)}`);
      }
    }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Programme de parrainage</h1>
        <p className="text-gray">Gagnez des récompenses en invitant vos amis</p>
      </div>

      {/* Program Overview */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">🎉 Gagnez 30€ par parrainage !</h2>
            <div className="space-y-2">
              <p className="text-white/90">• Votre filleul reçoit 50 crédits bonus</p>
              <p className="text-white/90">• Vous recevez 30€ quand il s'abonne</p>
              <p className="text-white/90">• Bonus de 10€ supplémentaires au 5ème parrainage</p>
            </div>
          </div>
          <div className="text-center">
            <Trophy size={80} className="text-yellow-300 mx-auto mb-2" />
            <p className="text-lg font-semibold">Parrain du mois</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.referrals}</p>
            <p className="text-sm text-gray">Parrainages totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.activeReferrals}</p>
            <p className="text-sm text-gray">Actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <Gift size={24} className="text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalEarnings}€</p>
            <p className="text-sm text-gray">Gains totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Gem size={24} className="text-yellow-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.thisMonth}€</p>
            <p className="text-sm text-gray">Ce mois-ci</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Link */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Votre lien de parrainage</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Code de parrainage
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray/20">
                <p className="font-mono text-primary font-medium">{referralCode}</p>
              </div>
              <Button
                onClick={handleCopyCode}
                variant="outline"
                size="sm"
                className="px-4"
              >
                <Copy size={16} className="mr-2" />
                {copied ? 'Copié !' : 'Copier'}
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Lien complet
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray/20">
              <p className="text-sm text-gray break-all">
                https://automya.com/register?ref={referralCode}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-black mb-4">Partager</h3>
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  variant="outline"
                  className="flex flex-col items-center space-y-2 h-auto py-4"
                >
                  {option.icon}
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Parrainages récents</h2>
          
          <div className="space-y-4">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-black">{referral.name}</h3>
                  <p className="text-sm text-gray">{referral.email}</p>
                  <p className="text-xs text-gray mt-1">{referral.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    referral.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {referral.status === 'active' ? 'Actif' : 'En attente'}
                  </span>
                  <p className="text-sm font-medium text-black mt-1">
                    {referral.earnings > 0 ? `+${referral.earnings}€` : '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" size="sm">
              Voir tout l'historique
            </Button>
          </div>
        </div>
      </div>

      {/* Program Rules */}
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Comment ça marche ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Share size={24} className="text-primary" />
            </div>
            <h3 className="font-medium text-black mb-2">1. Partagez</h3>
            <p className="text-sm text-gray">Partagez votre lien de parrainage avec vos amis et contacts</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-primary" />
            </div>
            <h3 className="font-medium text-black mb-2">2. Ils s'inscrivent</h3>
            <p className="text-sm text-gray">Vos filleuls créent leur compte et reçoivent 50 crédits bonus</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={24} className="text-primary" />
            </div>
            <h3 className="font-medium text-black mb-2">3. Vous gagnez</h3>
            <p className="text-sm text-gray">Recevez 30€ quand ils souscrivent à un abonnement payant</p>
          </div>
        </div>
      </div>
    </div>
  );
}