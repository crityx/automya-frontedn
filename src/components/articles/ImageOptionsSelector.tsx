'use client';

import { useEffect } from 'react';
import { textGenerationOptions, existingImageOptions, useExistingImagesOptions, aiGenerationOptions } from '@/utils/imageOptions';

interface ImageOptionsSelectorProps {
  currentImageCategory: string;
  onImageOptionSelect: (optionId: string) => void;
  onBackToCategories: () => void;
  postContent?: string | null;
  context?: 'post' | 'media';
}

export default function ImageOptionsSelector({ 
  currentImageCategory, 
  onImageOptionSelect, 
  onBackToCategories,
  postContent,
  context = 'post'
}: ImageOptionsSelectorProps) {
  // Si c'est "generate-from-image", on appelle directement la sélection via useEffect
  useEffect(() => {
    if (currentImageCategory === 'generate-from-image') {
      onImageOptionSelect('generate-from-image');
    }
    if (currentImageCategory === 'generate-from-text') {
      onImageOptionSelect('generate-from-text');
    }
  }, [currentImageCategory, onImageOptionSelect]);

  // Si c'est "generate-from-image" ou "generate-from-text", on ne rend rien (le useEffect s'en charge)
  if (currentImageCategory === 'generate-from-image' || currentImageCategory === 'generate-from-text') {
    return null;
  }

  let options;
  switch (currentImageCategory) {
    case 'generate-from-text':
      options = textGenerationOptions;
      break;
    case 'use-existing-images':
      options = useExistingImagesOptions;
      break;
    case 'generate-with-ai':
      options = aiGenerationOptions;
      break;
    default:
      options = [];
  }

  // Filtrer l'option "generate-from-post" si pas de contenu de post OU si contexte est "media"
  if (currentImageCategory === 'generate-from-text' && (!postContent || context === 'media')) {
    options = options.filter(option => option.id !== 'generate-from-post');
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray mb-4">
        <button
          onClick={onBackToCategories}
          className="hover:text-black transition-colors"
        >
          Ajouter une image
        </button>
        <span>›</span>
        <span className="text-primary font-medium">
          {currentImageCategory === 'generate-from-text' 
            ? 'Générer à partir du texte'
            : currentImageCategory === 'use-existing-images'
            ? 'Utiliser vos images'
            : currentImageCategory === 'generate-with-ai'
            ? 'Générer avec IA'
            : 'Options'
          }
        </span>
      </div>
      
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onImageOptionSelect(option.id)}
          className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {option.icon}
            </div>
            <div>
              <h3 className="font-medium text-black mb-1">{option.name}</h3>
              <p className="text-sm text-gray">{option.description}</p>
            </div>
          </div>
        </button>
      ))}
      
      {/* Bouton retour */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onBackToCategories}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ← Retour aux options principales
        </button>
      </div>
    </div>
  );
}