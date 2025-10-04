'use client';

import { useState } from 'react';
import PostEditor from './PostEditor';
import PostPreview from './PostPreview';
import ImageSelectionModal from './ImageSelectionModal';
import PublishConfirmationModal from '@/components/ui/PublishConfirmationModal';
import SchedulePostModal from '@/components/ui/SchedulePostModal';
import ScheduleConfirmationModal from '@/components/ui/ScheduleConfirmationModal';
import { usePostGeneration } from '@/hooks/usePostGeneration';

export default function PostGeneration() {
  // Additional states for new modals
  const [isPublishConfirmModalOpen, setIsPublishConfirmModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isScheduleConfirmModalOpen, setIsScheduleConfirmModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
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

  // Handlers for new functionality
  const handlePublishNowClick = () => {
    setIsPublishConfirmModalOpen(true);
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublishConfirmModalOpen(false);
      // TODO: Implement actual publishing logic
      console.log('Post published successfully');
    }, 2000);
  };

  const handleSaveDraft = () => {
    // TODO: Implement save as draft functionality
    console.log('Post saved as draft');
  };

  const handleSchedulePost = (date: string, time: string) => {
    const scheduledDateTime = new Date(`${date}T${time}`);
    
    // Store scheduled info for confirmation modal
    setScheduledDate(date);
    setScheduledTime(time);
    
    // TODO: Implement actual scheduling logic
    console.log('Post scheduled for:', scheduledDateTime.toLocaleString('fr-FR'));
    
    // Close schedule modal and show confirmation
    setIsScheduleModalOpen(false);
    setIsScheduleConfirmModalOpen(true);
  };

  const handleScheduleConfirm = () => {
    // Clear all content after successful scheduling
    clearContent();
    setIsScheduleConfirmModalOpen(false);
  };

  const clearContent = () => {
    setPostContent('');
    setDescription('');
    setWritingMode(null);
    // TODO: Clear selected image if any
  };

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
            onSaveDraft={handleSaveDraft}
            onPublishNow={handlePublishNowClick}
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

      {/* Schedule Post Modal */}
      <SchedulePostModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedulePost}
        postContent={postContent}
      />

      {/* Publish Confirmation Modal */}
      <PublishConfirmationModal
        isOpen={isPublishConfirmModalOpen}
        onClose={() => setIsPublishConfirmModalOpen(false)}
        onConfirm={handleConfirmPublish}
        isPublishing={isPublishing}
      />

      {/* Schedule Confirmation Modal */}
      <ScheduleConfirmationModal
        isOpen={isScheduleConfirmModalOpen}
        onClose={() => setIsScheduleConfirmModalOpen(false)}
        onConfirm={handleScheduleConfirm}
        scheduledDate={scheduledDate}
        scheduledTime={scheduledTime}
      />
    </div>
  );
}