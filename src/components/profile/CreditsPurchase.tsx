'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Gem, CreditCard, Zap, Star, Check } from 'lucide-react';

const creditPackages = [
  {
    id: 'starter',
    name: 'Pack Starter',
    credits: 100,
    price: 9.99,
    bonus: 0,
    popular: false,
    description: 'Parfait pour commencer'
  },
  {
    id: 'growth',
    name: 'Pack Growth',
    credits: 300,
    price: 24.99,
    bonus: 50,
    popular: true,
    description: 'Le plus populaire'
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    credits: 600,
    price: 44.99,
    bonus: 150,
    popular: false,
    description: 'Pour les professionnels'
  },
  {
    id: 'enterprise',
    name: 'Pack Enterprise',
    credits: 1500,
    price: 99.99,
    bonus: 500,
    popular: false,
    description: 'Pour les équipes'
  }
];

const paymentMethods = [
  { id: 'card', name: 'Carte bancaire', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'paypal', name: 'PayPal', icon: <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div> },
];

export default function CreditsPurchase() {
  const [selectedPackage, setSelectedPackage] = useState('growth');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const selectedPack = creditPackages.find(pack => pack.id === selectedPackage);

  const handlePurchase = async () => {
    setProcessing(true);
    
    // Simuler un paiement
    setTimeout(() => {
      setProcessing(false);
      alert(`Achat réussi ! ${selectedPack?.credits + (selectedPack?.bonus || 0)} crédits ajoutés à votre compte.`);
    }, 2000);
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Acheter des crédits</h1>
        <p className="text-gray">Boostez votre activité avec plus de crédits</p>
      </div>

      {/* Current Credits */}
      <div className="bg-white rounded-2xl p-6 border border-gray/20 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Gem className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">Crédits actuels</h3>
              <p className="text-gray">Disponibles immédiatement</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">150</p>
            <p className="text-sm text-gray">crédits</p>
          </div>
        </div>
      </div>

      {/* Credit Packages */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Choisissez votre pack</h2>
          <p className="text-gray">Plus vous achetez, plus vous économisez !</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creditPackages.map((pack) => (
            <div
              key={pack.id}
              onClick={() => setSelectedPackage(pack.id)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPackage === pack.id
                  ? 'border-primary bg-primary/5 transform scale-105'
                  : 'border-gray/20 hover:border-gray/40'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Populaire</span>
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="mb-4">
                  <Gem className="w-12 h-12 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-black">{pack.name}</h3>
                  <p className="text-sm text-gray">{pack.description}</p>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {pack.credits}
                    {pack.bonus > 0 && (
                      <span className="text-lg text-green-600"> +{pack.bonus}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray">
                    {pack.bonus > 0 ? `${pack.credits + pack.bonus} crédits au total` : 'crédits'}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-black">{pack.price}€</div>
                  <p className="text-sm text-gray">
                    {(pack.price / (pack.credits + pack.bonus)).toFixed(3)}€ / crédit
                  </p>
                </div>

                {pack.bonus > 0 && (
                  <div className="mb-4 p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">
                      +{pack.bonus} crédits bonus inclus !
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  {selectedPackage === pack.id && (
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Finaliser l'achat</h2>

        {/* Selected Package Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-black">{selectedPack?.name}</h3>
              <p className="text-sm text-gray">
                {selectedPack?.credits} crédits
                {selectedPack?.bonus && selectedPack.bonus > 0 && (
                  <span className="text-green-600"> + {selectedPack.bonus} bonus</span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-black">{selectedPack?.price}€</p>
              <p className="text-sm text-gray">TTC</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-black mb-4">Méthode de paiement</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray/20 hover:border-gray/40'
                }`}
              >
                {method.icon}
                <span className="font-medium text-black">{method.name}</span>
                {paymentMethod === method.id && (
                  <div className="ml-auto w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray">
            <p>✓ Paiement sécurisé SSL</p>
            <p>✓ Crédits ajoutés instantanément</p>
          </div>
          <Button
            onClick={handlePurchase}
            loading={processing}
            size="lg"
            className="px-8"
          >
            <Zap className="w-4 h-4 mr-2" />
            {processing ? 'Traitement...' : `Acheter pour ${selectedPack?.price}€`}
          </Button>
        </div>
      </div>
    </div>
  );
}