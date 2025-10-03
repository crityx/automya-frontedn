'use client';

import { useState } from 'react';
import { 
  MagnifyingGlass,
  Lock,
  Globe,
  MapPin
} from 'phosphor-react';
import Button from '@/components/ui/Button';

interface ProspectionConfig {
  enabled: boolean;
  sectors: string[];
  geographic: 'france' | 'europe' | 'international';
  region: string;
}

export default function Prospection() {
  const [config, setConfig] = useState<ProspectionConfig>({
    enabled: false,
    sectors: [],
    geographic: 'france',
    region: ''
  });

  const sectorOptions = [
    'Marketing & Communication',
    'Technologie & IT',
    'Finance & Consulting',
    'Ressources Humaines',
    'Vente & Commercial',
    'Santé & Bien-être',
    'Éducation & Formation',
    'Immobilier',
    'E-commerce',
    'Industrie'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Prospection géographique</h1>
        <p className="text-gray">Ciblez des prospects par secteur d'activité et zone géographique</p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray/20">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-gray" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray mb-4">Bientôt disponible</h2>
          <p className="text-gray mb-8 max-w-2xl mx-auto">
            La prospection avancée sera bientôt disponible pour cibler des prospects par secteur d'activité et zone géographique.
          </p>
        </div>

        {/* Preview of upcoming features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
          <div className="bg-white rounded-lg p-6 border border-gray/20">
            <div className="flex items-center space-x-3 mb-4">
              <MagnifyingGlass size={24} className="text-gray" />
              <h3 className="font-semibold text-gray">Ciblage par secteur</h3>
            </div>
            <div className="space-y-3">
              {sectorOptions.slice(0, 6).map((sector, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" disabled className="w-4 h-4" />
                  <span className="text-sm text-gray">{sector}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray/20">
            <div className="flex items-center space-x-3 mb-4">
              <Globe size={24} className="text-gray" />
              <h3 className="font-semibold text-gray">Zone géographique</h3>
            </div>
            <select disabled className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray mb-4">
              <option>France</option>
              <option>Europe</option>
              <option>International</option>
            </select>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin size={16} className="text-gray" />
              <input
                disabled
                placeholder="Ville ou région..."
                className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray/20 md:col-span-2">
            <h3 className="font-semibold text-gray mb-4">Critères de ciblage avancés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray mb-2">Taille d'entreprise</label>
                <select disabled className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray">
                  <option>Startup (1-50)</option>
                  <option>PME (50-250)</option>
                  <option>Grande entreprise (250+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray mb-2">Niveau de poste</label>
                <select disabled className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray">
                  <option>Manager</option>
                  <option>Directeur</option>
                  <option>C-Level</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button disabled className="opacity-50 cursor-not-allowed">
            <Lock size={16} className="mr-2" />
            Configuration verrouillée
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">Comment ça fonctionnera ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-800">
          <div>
            <strong>1. Recherche</strong><br />
            L'IA recherchera des profils selon vos critères géographiques et sectoriels
          </div>
          <div>
            <strong>2. Qualification</strong><br />
            Elle analysera les profils pour valider la pertinence du contact
          </div>
          <div>
            <strong>3. Invitation</strong><br />
            Elle enverra des invitations personnalisées selon votre stratégie
          </div>
        </div>
      </div>
    </div>
  );
}