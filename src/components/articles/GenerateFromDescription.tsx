'use client';

import Button from '@/components/ui/Button';
import { Star } from 'phosphor-react';

interface GenerateFromDescriptionProps {
  imageDescription: string;
  setImageDescription: (description: string) => void;
  isGeneratingImage: boolean;
  onGenerateImage: () => void;
  onBackToCategories: () => void;
}

export default function GenerateFromDescription({
  imageDescription,
  setImageDescription,
  isGeneratingImage,
  onGenerateImage,
  onBackToCategories
}: GenerateFromDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-black mb-3">
          Décrivez l'image que vous souhaitez *
        </label>
        <textarea
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          rows={6}
          className="w-full px-4 py-4 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
          placeholder="Ex: Une illustration moderne montrant des graphiques de croissance avec des couleurs bleues et vertes, style professionnel, haute qualité..."
          required
        />
        <p className="text-xs text-gray mt-2">
          Décrivez précisément l'image que vous souhaitez générer
        </p>
      </div>
      <div className="flex space-x-3">
        <Button
          onClick={onGenerateImage}
          loading={isGeneratingImage}
          disabled={!imageDescription.trim()}
          className="flex-1"
        >
          <Star size={16} className="mr-2" />
          {isGeneratingImage ? 'Génération...' : 'Générer l\'image'}
        </Button>
        <Button
          variant="outline"
          onClick={onBackToCategories}
        >
          Retour
        </Button>
      </div>
    </div>
  );
}