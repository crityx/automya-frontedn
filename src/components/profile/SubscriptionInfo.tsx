'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Check, Star, Lightning } from 'phosphor-react';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '/mois',
    description: 'Pour découvrir Automya',
    features: [
      '10 crédits par mois',
      '5 posts automatiques',
      'Support par email',
      'Analytics de base'
    ],
    current: false,
    popular: false
  },
  {
    name: 'Premium',
    price: '29€',
    period: '/mois',
    description: 'Pour les professionnels actifs',
    features: [
      '500 crédits par mois',
      'Posts illimités',
      'IA conversationnelle',
      'Analytics avancés',
      'Support prioritaire',
      'Intégrations avancées'
    ],
    current: true,
    popular: true
  },
  {
    name: 'Enterprise',
    price: '99€',
    period: '/mois',
    description: 'Pour les équipes et agences',
    features: [
      '2000 crédits par mois',
      'Gestion multi-comptes',
      'API accès',
      'Manager dédié',
      'Formation personnalisée',
      'White label'
    ],
    current: false,
    popular: false
  }
];

export default function SubscriptionInfo() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const currentPlan = plans.find(plan => plan.current);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Mon abonnement</h1>
        <p className="text-gray">Gérez votre abonnement et découvrez nos offres</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Abonnement actuel</h2>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary">{currentPlan?.name}</span>
              {currentPlan?.popular && (
                <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  Populaire
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-black">{currentPlan?.price}</p>
            <p className="text-gray">{currentPlan?.period}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Inclus dans votre forfait</h3>
            <ul className="space-y-3">
              {currentPlan?.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-black mb-4">Utilisation ce mois-ci</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray">Crédits utilisés</span>
                  <span className="text-black font-medium">347 / 500</span>
                </div>
                <div className="w-full bg-gray/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '69.4%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray">Posts publiés</span>
                  <span className="text-black font-medium">23</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray">Leads générés</span>
                  <span className="text-black font-medium">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray/20">
          <p className="text-sm text-gray mb-4">
            Prochaine facturation le 15 novembre 2024
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" className="px-6">
              Gérer la facturation
            </Button>
            <Button variant="ghost" className="px-6 text-red-600 hover:bg-red-50">
              Annuler l'abonnement
            </Button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Changer d'abonnement</h2>
          <p className="text-gray">Choisissez le plan qui correspond le mieux à vos besoins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                plan.current
                  ? 'border-primary bg-primary/5'
                  : selectedPlan === plan.name
                  ? 'border-primary'
                  : 'border-gray/20 hover:border-gray/40'
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star size={12} />
                    <span>Populaire</span>
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute top-4 right-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Actuel
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-black mb-2">{plan.name}</h3>
                <p className="text-gray text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-black">{plan.price}</span>
                  <span className="text-gray ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.current ? 'outline' : 'primary'}
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? 'Plan actuel' : 'Choisir ce plan'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray mb-4">
            Besoin d'aide pour choisir ? Notre équipe est là pour vous conseiller.
          </p>
          <Button variant="outline" className="px-6">
            Contacter un conseiller
          </Button>
        </div>
      </div>
    </div>
  );
}