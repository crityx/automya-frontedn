'use client';

import Button from '@/components/ui/Button';
import { Image as ImageIcon } from 'phosphor-react';
import { GalleryImage } from '@/types/post';

interface GallerySelectorProps {
  galleryImages: GalleryImage[];
  onImageSelect: (imageUrl: string) => void;
  onBackToImageOptions: () => void;
}

export default function GallerySelector({
  galleryImages,
  onImageSelect,
  onBackToImageOptions
}: GallerySelectorProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray mb-4">
        <button
          onClick={onBackToImageOptions}
          className="hover:text-black transition-colors"
        >
          Depuis images existantes
        </button>
        <span>›</span>
        <span className="text-primary font-medium">Choisir depuis la galerie</span>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {galleryImages.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <ImageIcon size={48} className="text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">Aucune image dans la galerie</h3>
              <p className="text-gray">Importez vos premières images</p>
            </div>
          ) : (
            galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => onImageSelect(image.url)}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:ring-2 hover:ring-primary transition-all"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                <ImageIcon size={24} className="text-primary" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
            ))
          )}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBackToImageOptions} className="flex-1">
          Retour aux options
        </Button>
      </div>
    </div>
  );
}