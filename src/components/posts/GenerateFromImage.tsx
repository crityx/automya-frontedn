'use client';

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
        <span className="text-primary font-medium">Générer à partir d'une image</span>
      </div>
      
      {!sourceImage ? (
        <div>
          <ImageGallery
            galleryImages={galleryImages}
            selectedImages={selectedSourceImages}
            onImageSelect={onMultipleImageSelect}
            onImport={onImportForGeneration}
            showImportButton={true}
            selectionMode="multiple"
            title="Sélectionnez des images sources"
            emptyMessage="Aucune image dans la galerie pour la génération"
          />
          
          {selectedSourceImages.length > 0 && (
            <div className="mt-6">
              <SelectedImagesPreview
                selectedImages={selectedSourceImages}
                onRemoveImage={onMultipleImageSelect}
                onClearAll={clearSelectedSourceImages}
                onAddMore={onImportForGeneration}
                maxDisplay={8}
              />
              
              <div className="flex space-x-3 mt-4">
                <Button
                  onClick={() => setSourceImage('selected')}
                  className="flex-1"
                  disabled={selectedSourceImages.length === 0}
                >
                  Suivant - Configurer la génération
                </Button>
                <Button variant="outline" onClick={onBackToImageOptions}>
                  Retour
                </Button>
              </div>
            </div>
          )}
          
          {selectedSourceImages.length === 0 && (
            <div className="flex space-x-3 mt-4">
              <Button variant="outline" onClick={onBackToImageOptions} className="flex-1">
                Retour aux options
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <SelectedImagesPreview
            selectedImages={selectedSourceImages}
            onRemoveImage={onMultipleImageSelect}
            onClearAll={clearSelectedSourceImages}
            onAddMore={() => setSourceImage(null)}
            maxDisplay={12}
          />
          
          <GenerationParameters
            params={generationParams}
            onChange={setGenerationParams}
            disabled={isGeneratingImage}
          />
          
          <div className="flex space-x-3 mt-6">
            <Button
              onClick={onGenerateFromImage}
              loading={isGeneratingImage}
              disabled={!generationParams.prompt.trim()}
              className="flex-1"
            >
              <Star size={16} className="mr-2" />
              {isGeneratingImage ? 'Génération...' : 'Générer l\'image'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSourceImage(null)}
              disabled={isGeneratingImage}
            >
              Retour à la sélection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}