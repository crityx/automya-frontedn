'use client';

import { useState } from 'react';
import { 
  ChatCircle,
  MagnifyingGlass,
  Robot,
  Lock
} from 'phosphor-react';
import Button from '@/components/ui/Button';

interface CommentingConfig {
  enabled: boolean;
  keywords: string[];
  commentObjective: 'educate' | 'engage' | 'promote' | 'network' | 'support';
  customPrompt: string;
}

export default function PostCommenting() {
  const [config, setConfig] = useState<CommentingConfig>({
    enabled: false,
    keywords: [],
    commentObjective: 'engage',
    customPrompt: ''
  });

  const objectiveOptions = {
    educate: 'Éduquer et informer',
    engage: 'Engager la conversation', 
    promote: 'Promouvoir mes services',
    network: 'Développer mon réseau',
    support: 'Apporter du soutien'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Commenter des postes par thématiques</h1>
        <p className="text-gray">Commentez automatiquement les posts d'autres personnes selon vos critères</p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-gray" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray mb-4">Bientôt disponible</h2>
          <p className="text-gray mb-8 max-w-2xl mx-auto">
            Cette fonctionnalité sera bientôt disponible et vous permettra de commenter automatiquement 
            les posts d'autres utilisateurs selon vos thématiques et objectifs.
          </p>
        </div>

        {/* Preview of upcoming features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
          <div className="bg-white rounded-lg p-6 border border-gray/20">
            <div className="flex items-center space-x-3 mb-4">
              <MagnifyingGlass size={24} className="text-gray" />
              <h3 className="font-semibold text-gray">Recherche par thématiques</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-sm text-gray">Leadership</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-sm text-gray">Marketing digital</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-sm text-gray">Entrepreneuriat</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray/20">
            <div className="flex items-center space-x-3 mb-4">
              <Robot size={24} className="text-gray" />
              <h3 className="font-semibold text-gray">Objectif du commentaire</h3>
            </div>
            <select disabled className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray">
              <option>Engager la conversation</option>
              <option>Éduquer et informer</option>
              <option>Promouvoir mes services</option>
              <option>Développer mon réseau</option>
            </select>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray/20 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <ChatCircle size={24} className="text-gray" />
              <h3 className="font-semibold text-gray">Prompt personnalisé</h3>
            </div>
            <textarea 
              disabled 
              rows={4}
              className="w-full px-3 py-3 rounded-lg border border-gray/20 bg-gray-100 text-gray resize-none"
              placeholder="Ex: Commentez de manière constructive en apportant votre expertise. Posez une question pour engager la conversation. Mentionnez subtilement votre expérience si pertinent..."
            />
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
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Comment ça fonctionnera ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <strong>1. Recherche</strong><br />
            L'IA trouvera des posts selon vos mots-clés et thématiques
          </div>
          <div>
            <strong>2. Analyse</strong><br />
            Elle analysera le contenu pour générer un commentaire pertinent
          </div>
          <div>
            <strong>3. Commentaire</strong><br />
            Elle publiera un commentaire selon votre objectif et style
          </div>
        </div>
      </div>
    </div>
  );
}