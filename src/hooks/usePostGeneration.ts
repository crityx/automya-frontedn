'use client';

import { useState } from 'react';
import { WritingMode, ViewMode, GenerationParams, GalleryImage, GenerationMethod } from '@/types/post';

export function usePostGeneration() {
  const [writingMode, setWritingMode] = useState<WritingMode>(null);
  const [postContent, setPostContent] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [currentImageCategory, setCurrentImageCategory] = useState<string | null>(null);
  const [currentImageAction, setCurrentImageAction] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedSourceImages, setSelectedSourceImages] = useState<string[]>([]);
  const [generationParams, setGenerationParams] = useState<GenerationParams>({
    style: 'realistic',
    strength: 0.7,
    prompt: ''
  });
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    { id: '1', name: 'automation-workflow.png', url: '/api/placeholder/400/300' },
    { id: '2', name: 'linkedin-tips.jpg', url: '/api/placeholder/400/600' },
    { id: '3', name: 'strategy-guide.png', url: '/api/placeholder/600/400' },
    { id: '4', name: 'testimonial-bg.jpg', url: '/api/placeholder/500/300' },
    { id: '5', name: 'growth-chart.png', url: '/api/placeholder/400/400' },
    { id: '6', name: 'network-visual.jpg', url: '/api/placeholder/300/400' }
  ]);
  const [lastGenerationMethod, setLastGenerationMethod] = useState<GenerationMethod>(null);
  const [showParameterEditor, setShowParameterEditor] = useState(false);
  const [savedGenerationParams, setSavedGenerationParams] = useState<GenerationParams | null>(null);
  const [savedImageDescription, setSavedImageDescription] = useState('');

  const handleGenerateFromDescription = async () => {
    if (writingMode === 'ai' && !description.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockPost = `🚀 ${description}

Voici une réflexion que je voulais partager avec vous...

Dans un monde en constante évolution, il est essentiel de rester à la pointe des dernières tendances et innovations.

Les points clés à retenir :
• Innovation constante
• Adaptation rapide
• Collaboration efficace

Et vous, comment abordez-vous ces défis ? Partagez votre expérience ! 👇

#LinkedIn #Innovation #Croissance #Professionnel`;
      
      setPostContent(mockPost);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setCurrentImageCategory(categoryId);
  };

  const handleImageOptionSelect = (optionId: string) => {
    switch (optionId) {
      case 'generate-from-post':
        if (!postContent.trim()) {
          alert('Veuillez d\'abord écrire ou générer votre post');
          return;
        }
        // Génération directe avec fermeture du modal et animation dans le preview
        setIsImageModalOpen(false);
        setIsGeneratingImage(true);
        
        setTimeout(() => {
          const mockImageUrl = '/api/placeholder/400/300';
          setSelectedImage(mockImageUrl);
          setIsGeneratingImage(false);
          setLastGenerationMethod('generate-from-post');
        }, 3000);
        break;
      case 'generate-from-description':
        setCurrentImageAction('generate-from-description');
        break;
      case 'upload-file':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            const newImage = {
              id: Date.now().toString(),
              name: file.name,
              url: url
            };
            
            setGalleryImages(prev => [newImage, ...prev]);
            setSelectedImage(url);
            setIsImageModalOpen(false);
            
            console.log('Image ajoutée automatiquement à la galerie:', file.name);
          }
        };
        input.click();
        break;
      case 'from-gallery':
        setShowGallery(true);
        setCurrentImageAction('from-gallery');
        break;
      case 'generate-from-image':
        setShowGallery(true);
        setCurrentImageAction('generate-from-image');
        break;
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    
    // Sauvegarder les paramètres avant génération
    if (currentImageAction === 'generate-from-description') {
      setSavedImageDescription(imageDescription);
    } else if (currentImageAction === 'generate-from-image') {
      setSavedGenerationParams({ ...generationParams });
    }
    
    setTimeout(() => {
      const mockImageUrl = '/api/placeholder/400/300';
      setSelectedImage(mockImageUrl);
      setIsGeneratingImage(false);
      
      if (currentImageAction === 'generate-from-post') {
        setLastGenerationMethod('generate-from-post');
      } else if (currentImageAction === 'generate-from-description') {
        setLastGenerationMethod('generate-from-description');
      }
      
      setCurrentImageAction(null);
      setImageDescription('');
      setSourceImage(null);
      setIsImageModalOpen(false);
    }, 3000);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (currentImageAction === 'from-gallery') {
      setSelectedImage(imageUrl);
      setIsImageModalOpen(false);
    } else if (currentImageAction === 'generate-from-image') {
      setSourceImage(imageUrl);
      setShowGallery(false);
    }
  };

  const handleMultipleImageSelect = (imageUrl: string) => {
    setSelectedSourceImages(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const handleImportForGeneration = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const newImages: string[] = [];
        Array.from(files).forEach(file => {
          if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            const newImage = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              url: url
            };
            
            setGalleryImages(prev => [newImage, ...prev]);
            newImages.push(url);
          }
        });
        
        // Auto-sélectionner les nouvelles images
        setSelectedSourceImages(prev => [...prev, ...newImages]);
        console.log('Images importées et sélectionnées:', newImages.length);
      }
    };
    input.click();
  };

  const clearSelectedSourceImages = () => {
    setSelectedSourceImages([]);
  };

  const handleGenerateFromImage = () => {
    setIsGeneratingImage(true);
    
    setTimeout(() => {
      const mockImageUrl = '/api/placeholder/400/300';
      setSelectedImage(mockImageUrl);
      setIsGeneratingImage(false);
      
      setLastGenerationMethod('generate-from-image');
      
      setCurrentImageAction(null);
      setSourceImage(null);
      setIsImageModalOpen(false);
    }, 3000);
  };

  const handleBackToImageOptions = () => {
    setCurrentImageAction(null);
    setImageDescription('');
  };

  const handleBackToCategories = () => {
    setCurrentImageCategory(null);
    setCurrentImageAction(null);
    setImageDescription('');
    setSourceImage(null);
    setSelectedSourceImages([]);
    setShowGallery(false);
    setGenerationParams({ style: 'realistic', strength: 0.7, prompt: '' });
  };

  const handleEditImageParameters = () => {
    if (lastGenerationMethod === 'generate-from-image') {
      setCurrentImageCategory('from-existing-images');
      setCurrentImageAction('generate-from-image');
      // Restaurer les paramètres sauvegardés
      if (savedGenerationParams) {
        setGenerationParams(savedGenerationParams);
      }
      setIsImageModalOpen(true);
    } else if (lastGenerationMethod === 'generate-from-description') {
      setCurrentImageCategory('generate-from-text');
      setCurrentImageAction('generate-from-description');
      // Restaurer la description sauvegardée
      setImageDescription(savedImageDescription);
      setIsImageModalOpen(true);
    } else if (lastGenerationMethod === 'generate-from-post') {
      setCurrentImageCategory('generate-from-text');
      setCurrentImageAction('generate-from-post');
      setIsImageModalOpen(true);
    }
  };

  const handleChangeImageMethod = () => {
    setSelectedImage(null);
    setLastGenerationMethod(null);
    setCurrentImageCategory(null);
    setCurrentImageAction(null);
    setSourceImage(null);
    setImageDescription('');
    setGenerationParams({ style: 'realistic', strength: 0.7, prompt: '' });
    setIsImageModalOpen(true);
  };

  return {
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
    showGallery,
    galleryImages,
    lastGenerationMethod,
    showParameterEditor,
    
    // Setters
    setWritingMode,
    setPostContent,
    setDescription,
    setIsGenerating,
    setSelectedImage,
    setIsImageModalOpen,
    setIsScheduleModalOpen,
    setViewMode,
    setCurrentImageCategory,
    setCurrentImageAction,
    setImageDescription,
    setIsGeneratingImage,
    setSourceImage,
    setSelectedSourceImages,
    setGenerationParams,
    setShowGallery,
    setGalleryImages,
    setLastGenerationMethod,
    setShowParameterEditor,
    
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
  };
}