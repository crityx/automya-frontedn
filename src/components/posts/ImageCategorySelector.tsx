'use client';

import { mainImageCategories } from '@/utils/imageOptions';

interface ImageCategorySelectorProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function ImageCategorySelector({ onCategorySelect }: ImageCategorySelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-gray mb-6">Choisissez comment vous souhaitez ajouter une image à votre post :</p>
      
      {mainImageCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {category.icon}
            </div>
            <div>
              <h3 className="font-medium text-black mb-1">{category.name}</h3>
              <p className="text-sm text-gray">{category.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}