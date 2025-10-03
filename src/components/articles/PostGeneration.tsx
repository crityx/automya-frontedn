'use client';

import PostEditor from './PostEditor';
import PostPreview from './PostPreview';
import ImageSelectionModal from './ImageSelectionModal';
import Modal from '@/components/ui/Modal';
import { usePostGeneration } from '@/hooks/usePostGeneration';

export default function PostGeneration() {
  const {
    // State
    writingMode,
    postContent,
    description,
    isGenerating,
    selectedImage,
    isImageModalOpen,
    isScheduleModalOpen,
    viewMode,
    currentImageCategory,
    currentImageAction,
    imageDescription,
    isGeneratingImage,
    sourceImage,
    selectedSourceImages,
    generationParams,
    galleryImages,
    lastGenerationMethod,
    
    // Setters
    setWritingMode,
    setPostContent,
    setDescription,
    setIsImageModalOpen,
    setIsScheduleModalOpen,
    setViewMode,
    setImageDescription,
    setSourceImage,
    setGenerationParams,
    
    // Handlers
    handleGenerateFromDescription,
    handleCategorySelect,
    handleImageOptionSelect,
    handleGenerateImage,
    handleImageSelect,
    handleGenerateFromImage,
    handleBackToImageOptions,
    handleBackToCategories,
    handleEditImageParameters,
    handleChangeImageMethod,
    handleMultipleImageSelect,
    handleImportForGeneration,
    clearSelectedSourceImages,
  } = usePostGeneration();

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Génération de post</h1>
        <p className="text-gray">Rédigez et prévisualisez vos posts LinkedIn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Post Creation */}
        <div className="space-y-6">
          <PostEditor
            writingMode={writingMode}
            setWritingMode={setWritingMode}
            postContent={postContent}
            setPostContent={setPostContent}
            description={description}
            setDescription={setDescription}
            isGenerating={isGenerating}
            onGenerate={handleGenerateFromDescription}
            onSchedule={() => setIsScheduleModalOpen(true)}
          />
        </div>

        {/* Right Column - Preview */}
        <PostPreview
          postContent={postContent}
          writingMode={writingMode}
          selectedImage={selectedImage}
          lastGenerationMethod={lastGenerationMethod}
          isGeneratingImage={isGeneratingImage}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onImageClick={() => setIsImageModalOpen(true)}
          onEditImageParameters={handleEditImageParameters}
          onChangeImageMethod={handleChangeImageMethod}
        />
      </div>

      {/* Image Selection Modal */}
      <ImageSelectionModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImageCategory={currentImageCategory}
        currentImageAction={currentImageAction}
        postContent={postContent}
        imageDescription={imageDescription}
        setImageDescription={setImageDescription}
        isGeneratingImage={isGeneratingImage}
        sourceImage={sourceImage}
        setSourceImage={setSourceImage}
        selectedSourceImages={selectedSourceImages}
        generationParams={generationParams}
        setGenerationParams={setGenerationParams}
        galleryImages={galleryImages}
        onCategorySelect={handleCategorySelect}
        onImageOptionSelect={handleImageOptionSelect}
        onGenerateImage={handleGenerateImage}
        onGenerateFromImage={handleGenerateFromImage}
        onImageSelect={handleImageSelect}
        onMultipleImageSelect={handleMultipleImageSelect}
        onImportForGeneration={handleImportForGeneration}
        clearSelectedSourceImages={clearSelectedSourceImages}
        onBackToImageOptions={handleBackToImageOptions}
        onBackToCategories={handleBackToCategories}
      />

      {/* Schedule Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Planifier la publication"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray">Fonctionnalité de planification à implémenter</p>
        </div>
      </Modal>
    </div>
  );
}