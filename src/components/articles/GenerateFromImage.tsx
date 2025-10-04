'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import ImageGallery from './ImageGallery';
import SelectedImagesPreview from './SelectedImagesPreview';
import GenerationParameters from './GenerationParameters';
import { Star } from 'phosphor-react';
import { GenerationParams, GalleryImage } from '@/types/post';

interface GenerateFromImageProps {
  galleryImages: GalleryImage[];
  selectedSourceImages: string[];
  sourceImage: string | null;
  generationParams: GenerationParams;
  isGeneratingImage: boolean;
  onMultipleImageSelect: (imageUrl: string) => void;
  onImportForGeneration: () => void;
  clearSelectedSourceImages: () => void;
  setSourceImage: (image: string | null) => void;
  setGenerationParams: (params: GenerationParams) => void;
  onGenerateFromImage: () => void;
  onBackToImageOptions: () => void;
}

export default function GenerateFromImage({
  galleryImages,
  selectedSourceImages,
  sourceImage,
  generationParams,
  isGeneratingImage,
  onMultipleImageSelect,
  onImportForGeneration,
  clearSelectedSourceImages,
  setSourceImage,
  setGenerationParams,
  onGenerateFromImage,
  onBackToImageOptions
}: GenerateFromImageProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      // Simuler un input file avec les fichiers glissés
      const mockEvent = {
        target: {
          files: imageFiles
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      // Réutiliser la logique d'import existante
      onImportForGeneration();
    }
  };

  return (
    <div className="space-y-6 min-h-[600px]">
      
      {!sourceImage ? (
        <div className="space-y-6">
          {/* Zone de glisser-déposer */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-gray/30 hover:border-primary/50 hover:bg-gray/5'
            }`}
            onClick={onImportForGeneration}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="text-primary">
                  <rect width="256" height="256" fill="none"></rect>
                  <path d="M74.3,90.6,128,36.9l53.7,53.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                  <line x1="128" y1="36.9" x2="128" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                  <path d="M216,144v64a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black mb-2">
                  {selectedSourceImages.length > 0 ? 'Ajouter plus d\'images' : 'Prenez des photos de vous'}
                </h4>
                <p className="text-gray text-sm">
                  Ou cliquez pour sélectionner des photos de vous ou vos créations
                  <br />
                  <span className="text-xs text-gray/70">
                    Formats supportés : JPG, PNG, WebP • Max 10MB par image
                  </span>
                </p>
              </div>
            </div>
            
            {selectedSourceImages.length > 0 && (
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                {selectedSourceImages.length}/8 images
              </div>
            )}
          </div>

          {/* Galerie d'images existantes */}
          <div>
            <ImageGallery
              galleryImages={galleryImages}
              selectedImages={selectedSourceImages}
              onImageSelect={onMultipleImageSelect}
              onImport={onImportForGeneration}
              showImportButton={false}
              selectionMode="multiple"
              title="Ou choisissez depuis la galerie existante"
              emptyMessage="Aucune image dans la galerie. Utilisez la zone ci-dessus pour importer vos images."
            />
          </div>
          
          {selectedSourceImages.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray/20">
              <SelectedImagesPreview
                selectedImages={selectedSourceImages}
                onRemoveImage={onMultipleImageSelect}
                onClearAll={clearSelectedSourceImages}
                onAddMore={onImportForGeneration}
                maxDisplay={8}
              />
              
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setSourceImage('selected')}
                  className="flex-1"
                  disabled={selectedSourceImages.length === 0}
                >
                  Suivant - Configurer la génération ({selectedSourceImages.length} images)
                </Button>
                <button 
                  onClick={clearSelectedSourceImages}
                  className="text-sm text-gray-400 hover:text-gray-600 font-medium px-4"
                >
                  Tout désélectionner
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Récapitulatif des images sélectionnées */}
          <div className="bg-white rounded-xl p-6 border border-gray/20">
            <SelectedImagesPreview
              selectedImages={selectedSourceImages}
              onRemoveImage={onMultipleImageSelect}
              onClearAll={clearSelectedSourceImages}
              onAddMore={() => setSourceImage(null)}
              maxDisplay={12}
            />
            <p className="text-sm text-gray mt-4">
              Ces images seront combinées pour créer une nouvelle image unique. 
              L'IA analysera les styles, couleurs et éléments de chaque image source.
            </p>
          </div>
          
          {/* Paramètres de génération */}
          <div className="bg-white rounded-xl p-6 border border-gray/20">
            <h4 className="font-semibold text-black mb-4">Paramètres de génération</h4>
            <GenerationParameters
              params={generationParams}
              onChange={setGenerationParams}
              disabled={isGeneratingImage}
            />
          </div>
          
          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={onGenerateFromImage}
              loading={isGeneratingImage}
              disabled={!generationParams.prompt.trim() || selectedSourceImages.length === 0}
              className="flex-1 py-4 text-lg"
              size="lg"
            >
              <Star size={20} className="mr-3" />
              {isGeneratingImage 
                ? `Génération en cours...` 
                : `Générer à partir de ${selectedSourceImages.length} image${selectedSourceImages.length > 1 ? 's' : ''}`
              }
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSourceImage(null)}
              disabled={isGeneratingImage}
              className="px-6"
            >
              Modifier la sélection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}