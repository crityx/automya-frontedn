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
  postContent: string;
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
  onBackToCategories
}: ImageSelectionModalProps) {
  const getModalTitle = () => {
    if (currentImageAction) {
      switch (currentImageAction) {
        case 'generate-from-post':
          return 'Générer à partir du post';
        case 'generate-from-description':
          return 'Générer à partir d\'une description';
        case 'from-gallery':
          return 'Choisir depuis la galerie';
        case 'generate-from-image':
          return 'Générer à partir d\'une image';
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
      size="xl"
    >
      {!currentImageCategory ? (
        <ImageCategorySelector onCategorySelect={onCategorySelect} />
      ) : !currentImageAction ? (
        <ImageOptionsSelector 
          currentImageCategory={currentImageCategory}
          onImageOptionSelect={onImageOptionSelect}
          onBackToCategories={onBackToCategories}
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
      ) : currentImageAction === 'from-gallery' ? (
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