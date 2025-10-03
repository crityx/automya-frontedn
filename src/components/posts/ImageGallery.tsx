'use client';

import Button from '@/components/ui/Button';
import { Image as ImageIcon, Upload } from 'phosphor-react';
import { GalleryImage } from '@/types/post';

interface ImageGalleryProps {
  galleryImages: GalleryImage[];
  selectedImages: string[];
  onImageSelect: (imageUrl: string) => void;
  onImport: () => void;
  showImportButton?: boolean;
  selectionMode?: 'single' | 'multiple';
  title?: string;
  emptyMessage?: string;
}

export default function ImageGallery({
  galleryImages,
  selectedImages,
  onImageSelect,
  onImport,
  showImportButton = true,
  selectionMode = 'multiple',
  title = 'Sélectionnez des images',
  emptyMessage = 'Aucune image dans la galerie'
}: ImageGalleryProps) {
  return (
    <div>
      <h4 className="font-medium text-black mb-4 text-lg">{title}</h4>
      
      <div className="max-h-80 overflow-y-auto border border-gray/20 rounded-lg p-6">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {/* Import Button as first square */}
          {showImportButton && (
            <button
              onClick={onImport}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Upload size={24} className="text-gray group-hover:text-primary" />
              </div>
            </button>
          )}
          
          {galleryImages.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <ImageIcon size={64} className="text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">{emptyMessage}</h3>
              <p className="text-gray">Importez vos premières images</p>
            </div>
          ) : (
            galleryImages.map((image) => {
              const isSelected = selectedImages.includes(image.url);
              return (
                <button
                  key={image.id}
                  onClick={() => onImageSelect(image.url)}
                  className={`group relative aspect-square rounded-lg overflow-hidden transition-all ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'bg-gray-100 hover:ring-2 hover:ring-primary/50'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                    <ImageIcon size={24} className="text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      
      {selectionMode === 'multiple' && (
        <p className="text-sm text-gray mt-3 text-center">
          Cliquez sur les images pour les sélectionner (sélection multiple autorisée)
        </p>
      )}
    </div>
  );
}