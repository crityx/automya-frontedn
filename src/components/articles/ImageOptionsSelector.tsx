'use client';

import { textGenerationOptions, existingImageOptions } from '@/utils/imageOptions';

interface ImageOptionsSelectorProps {
  currentImageCategory: string;
  onImageOptionSelect: (optionId: string) => void;
  onBackToCategories: () => void;
}

export default function ImageOptionsSelector({ 
  currentImageCategory, 
  onImageOptionSelect, 
  onBackToCategories 
}: ImageOptionsSelectorProps) {
  const options = currentImageCategory === 'generate-from-text' 
    ? textGenerationOptions 
    : existingImageOptions;

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
            : 'Depuis images existantes'
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
    </div>
  );
}