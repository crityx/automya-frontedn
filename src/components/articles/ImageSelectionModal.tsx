'use client';

import Modal from '@/components/ui/Modal';
import ImageCategorySelector from './ImageCategorySelector';
import ImageOptionsSelector from './ImageOptionsSelector';
import GenerateFromPost from './GenerateFromPost';
import GenerateFromDescription from './GenerateFromDescription';
import GallerySelector from './GallerySelector';
import GenerateFromImage from './GenerateFromImage';
import { GenerationParams, GalleryImage } from '@/types/post';

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageCategory: string | null;
  currentImageAction: string | null;
  postContent: string | null;
  imageDescription: string;
  setImageDescription: (description: string) => void;
  isGeneratingImage: boolean;
  sourceImage: string | null;
  setSourceImage: (image: string | null) => void;
  selectedSourceImages: string[];
  generationParams: GenerationParams;
  setGenerationParams: (params: GenerationParams) => void;
  galleryImages: GalleryImage[];
  onCategorySelect: (categoryId: string) => void;
  onImageOptionSelect: (optionId: string) => void;
  onGenerateImage: () => void;
  onGenerateFromImage: () => void;
  onImageSelect: (imageUrl: string) => void;
  onMultipleImageSelect: (imageUrl: string) => void;
  onImportForGeneration: () => void;
  clearSelectedSourceImages: () => void;
  onBackToImageOptions: () => void;
  onBackToCategories: () => void;
  context?: 'post' | 'media';
}

export default function ImageSelectionModal({
  isOpen,
  onClose,
  currentImageCategory,
  currentImageAction,
  postContent,
  imageDescription,
  setImageDescription,
  isGeneratingImage,
  sourceImage,
  setSourceImage,
  selectedSourceImages,
  generationParams,
  setGenerationParams,
  galleryImages,
  onCategorySelect,
  onImageOptionSelect,
  onGenerateImage,
  onGenerateFromImage,
  onImageSelect,
  onMultipleImageSelect,
  onImportForGeneration,
  clearSelectedSourceImages,
  onBackToImageOptions,
  onBackToCategories,
  context = 'post'
}: ImageSelectionModalProps) {
  const getModalTitle = () => {
    if (currentImageAction) {
      switch (currentImageAction) {
        case 'generate-from-post':
          return 'Générer à partir du post';
        case 'generate-from-description':
          return 'Générer à partir d\'une description';
        case 'generate-from-text':
          return 'Générer à partir du texte';
        case 'from-gallery':
          return 'Choisir depuis la galerie';
        case 'from-gallery-single':
          return 'Choisir depuis la galerie';
        case 'generate-from-image':
          return 'Générer à partir d\'une à 8 images';
        default:
          return 'Ajouter une image';
      }
    }
    return 'Ajouter une image';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        onBackToCategories();
      }}
      title={getModalTitle()}
      size={currentImageAction === 'generate-from-image' ? '4xl' : 'xl'}
    >
      {!currentImageCategory ? (
        <ImageCategorySelector onCategorySelect={onCategorySelect} context={context} />
      ) : !currentImageAction ? (
        <ImageOptionsSelector 
          currentImageCategory={currentImageCategory}
          onImageOptionSelect={onImageOptionSelect}
          onBackToCategories={onBackToCategories}
          postContent={postContent}
          context={context}
        />
      ) : currentImageAction === 'generate-from-post' ? (
        <GenerateFromPost
          postContent={postContent}
          isGeneratingImage={isGeneratingImage}
          onGenerateImage={onGenerateImage}
          onBackToCategories={onBackToCategories}
        />
      ) : currentImageAction === 'generate-from-description' ? (
        <GenerateFromDescription
          imageDescription={imageDescription}
          setImageDescription={setImageDescription}
          isGeneratingImage={isGeneratingImage}
          onGenerateImage={onGenerateImage}
          onBackToCategories={onBackToCategories}
        />
      ) : currentImageAction === 'generate-from-text' ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray mb-4">
            <button
              onClick={onBackToImageOptions}
              className="hover:text-black transition-colors"
            >
              Générer avec IA
            </button>
            <span>›</span>
            <span className="text-primary font-medium">Générer à partir du texte</span>
          </div>
          
          {context !== 'media' && (
            <button
              onClick={() => onImageOptionSelect('generate-from-post')}
              className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
              disabled={!postContent}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M248,152a8,8,0,0,1-8,8H200a8,8,0,0,1-8-8,16,16,0,0,0-16-16H80a16,16,0,0,0-16,16,8,8,0,0,1-8,8H16a8,8,0,0,1-8-8,40,40,0,0,1,40-40h96A40,40,0,0,1,248,152ZM56,80a8,8,0,0,0,8-8V64A16,16,0,0,1,80,48h96a16,16,0,0,1,16,16v8a8,8,0,0,0,16,0V64a32,32,0,0,0-32-32H80A32,32,0,0,0,48,64v8A8,8,0,0,0,56,80ZM216,184H40a24,24,0,0,0,0,48H216a24,24,0,0,0,0-48Z"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Générer à partir du post</h3>
                  <p className="text-sm text-gray">IA crée une image basée sur le contenu de votre post</p>
                </div>
              </div>
            </button>
          )}
          
          <button
            onClick={() => onImageOptionSelect('generate-from-description')}
            className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V200H40ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm-32,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h64A8,8,0,0,1,152,160Z"/></svg>
              </div>
              <div>
                <h3 className="font-medium text-black mb-1">Générer à partir d'une description</h3>
                <p className="text-sm text-gray">Décrivez l'image que vous voulez créer</p>
              </div>
            </div>
          </button>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={onBackToImageOptions}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Retour aux options IA
            </button>
          </div>
        </div>
      ) : currentImageAction === 'from-gallery' ? (
        <GallerySelector
          galleryImages={galleryImages}
          onImageSelect={onImageSelect}
          onBackToImageOptions={onBackToImageOptions}
        />
      ) : currentImageAction === 'from-gallery-single' ? (
        <GallerySelector
          galleryImages={galleryImages}
          onImageSelect={onImageSelect}
          onBackToImageOptions={onBackToImageOptions}
        />
      ) : currentImageAction === 'generate-from-image' ? (
        <GenerateFromImage
          galleryImages={galleryImages}
          selectedSourceImages={selectedSourceImages}
          sourceImage={sourceImage}
          generationParams={generationParams}
          isGeneratingImage={isGeneratingImage}
          onMultipleImageSelect={onMultipleImageSelect}
          onImportForGeneration={onImportForGeneration}
          clearSelectedSourceImages={clearSelectedSourceImages}
          setSourceImage={setSourceImage}
          setGenerationParams={setGenerationParams}
          onGenerateFromImage={onGenerateFromImage}
          onBackToImageOptions={onBackToImageOptions}
        />
      ) : null}
    </Modal>
  );
}