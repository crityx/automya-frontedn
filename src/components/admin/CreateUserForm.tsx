'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserPlus, Envelope, User, CreditCard, Buildings, Phone } from 'phosphor-react';

export default function CreateUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subscription: 'Gratuit',
    initialCredits: 50,
    sendWelcomeEmail: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler la création d'utilisateur
    setTimeout(() => {
      setIsLoading(false);
      alert('Utilisateur créé avec succès !');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subscription: 'Gratuit',
        initialCredits: 50,
        sendWelcomeEmail: true
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const subscriptionPlans = [
    { value: 'Gratuit', name: 'Gratuit', credits: 50 },
    { value: 'Premium', name: 'Premium', credits: 500 },
    { value: 'Enterprise', name: 'Enterprise', credits: 2000 }
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Créer un nouveau compte</h1>
        <p className="text-gray">Ajoutez un nouvel utilisateur à votre liste</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Jean"
                icon={<User size={16} />}
                required
              />
              
              <Input
                label="Nom"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Dupont"
                icon={<User size={16} />}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="jean.dupont@exemple.com"
                icon={<Envelope size={16} />}
                required
              />
              
              <Input
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
                icon={<Phone size={16} />}
              />
            </div>
          </div>

          {/* Informations entreprise */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Informations entreprise</h2>
            <Input
              label="Entreprise"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Nom de l'entreprise"
              icon={<Buildings size={16} />}
            />
          </div>

          {/* Configuration du compte */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Configuration du compte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Plan d'abonnement
                </label>
                <select
                  value={formData.subscription}
                  onChange={(e) => handleChange('subscription', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.name} ({plan.credits} crédits)
                    </option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Crédits initiaux"
                type="number"
                value={formData.initialCredits}
                onChange={(e) => handleChange('initialCredits', parseInt(e.target.value))}
                min="0"
                max="5000"
                icon={<CreditCard size={16} />}
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4">Options</h2>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.sendWelcomeEmail}
                  onChange={(e) => handleChange('sendWelcomeEmail', e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-black">Envoyer un email de bienvenue avec les instructions</span>
              </label>
            </div>
          </div>

          {/* Aperçu */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-md font-semibold text-black mb-3">Aperçu du compte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray">Nom complet:</span>
                <span className="ml-2 text-black font-medium">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div>
                <span className="text-gray">Email:</span>
                <span className="ml-2 text-black font-medium">{formData.email}</span>
              </div>
              <div>
                <span className="text-gray">Plan:</span>
                <span className="ml-2 text-black font-medium">{formData.subscription}</span>
              </div>
              <div>
                <span className="text-gray">Crédits:</span>
                <span className="ml-2 text-black font-medium">{formData.initialCredits}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1"
            >
              <UserPlus size={16} className="mr-2" />
              {isLoading ? 'Création en cours...' : 'Créer le compte'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="px-8"
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}