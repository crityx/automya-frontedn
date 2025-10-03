'use client';

import Button from '@/components/ui/Button';
import { MagicWand } from 'phosphor-react';

interface GenerateFromPostProps {
  postContent: string;
  isGeneratingImage: boolean;
  onGenerateImage: () => void;
  onBackToCategories: () => void;
}

export default function GenerateFromPost({
  postContent,
  isGeneratingImage,
  onGenerateImage,
  onBackToCategories
}: GenerateFromPostProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Contenu du post :</h4>
        <p className="text-sm text-blue-800 line-clamp-4">{postContent}</p>
      </div>
      <p className="text-gray">L'IA va créer une image basée sur le contenu de votre post.</p>
      <div className="flex space-x-3">
        <Button
          onClick={onGenerateImage}
          loading={isGeneratingImage}
          className="flex-1"
        >
          <MagicWand size={16} className="mr-2" />
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