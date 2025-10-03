'use client';

import Button from '@/components/ui/Button';
import { Image as ImageIcon, Upload } from 'phosphor-react';

interface SelectedImagesPreviewProps {
  selectedImages: string[];
  onRemoveImage: (imageUrl: string) => void;
  onClearAll: () => void;
  onAddMore: () => void;
  maxDisplay?: number;
}

export default function SelectedImagesPreview({
  selectedImages,
  onRemoveImage,
  onClearAll,
  onAddMore,
  maxDisplay = 12
}: SelectedImagesPreviewProps) {
  if (selectedImages.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-black text-lg">
          Images sources sélectionnées ({selectedImages.length})
        </h4>
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Tout désélectionner
        </button>
      </div>
      
      {/* Preview des images sélectionnées */}
      <div className="mb-6 p-6 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
          {selectedImages.slice(0, maxDisplay).map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                <ImageIcon size={20} className="text-primary" />
              </div>
              <button
                onClick={() => onRemoveImage(imageUrl)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {selectedImages.length > maxDisplay && (
          <p className="text-sm text-gray mb-4 text-center">
            Et {selectedImages.length - maxDisplay} autres images...
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-black">
            Prêtes pour la génération
          </p>
          <Button
            onClick={onAddMore}
            variant="outline"
            size="sm"
          >
            <Upload size={14} className="mr-2" />
            Ajouter plus
          </Button>
        </div>
      </div>
    </div>
  );
}