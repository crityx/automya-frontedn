'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import ImageSelectionModal from './ImageSelectionModal';
import { 
  Upload, 
  Image as ImageIcon, 
  MagicWand, 
  Trash,
  Eye
} from 'phosphor-react';

const mockMedias = [
  {
    id: '1',
    name: 'automation-workflow.png',
    type: 'image',
    size: '8.7 MB',
    url: '/api/placeholder/400/300',
    uploadDate: '2024-10-01',
    tags: ['automation', 'workflow'],
    usedInPosts: 3
  },
  {
    id: '2',
    name: 'linkedin-tips-infographic.jpg',
    type: 'image',
    size: '6.2 MB',
    url: '/api/placeholder/400/600',
    uploadDate: '2024-09-28',
    tags: ['linkedin', 'tips'],
    usedInPosts: 5
  }
];

export default function MediaManager() {
  const [medias, setMedias] = useState(mockMedias);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'import' | 'ai-generation'>('import');
  
  // États pour le modal de génération d'images
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageCategory, setCurrentImageCategory] = useState<string | null>(null);
  const [currentImageAction, setCurrentImageAction] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedSourceImages, setSelectedSourceImages] = useState<string[]>([]);
  const [generationParams, setGenerationParams] = useState({
    style: 'realistic',
    strength: 0.7,
    prompt: ''
  });
  

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const newMedia = {
            id: Date.now().toString(),
            name: file.name,
            type: 'image' as const,
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            url: URL.createObjectURL(file),
            uploadDate: new Date().toISOString().split('T')[0],
            tags: [],
            usedInPosts: 0
          };
          setMedias(prev => [newMedia, ...prev]);
        }
      });
    }
  };

  // Handlers pour le modal de génération d'images
  const handleCategorySelect = (category: string) => {
    setCurrentImageCategory(category);
  };

  const handleImageOptionSelect = (action: string) => {
    if (action === 'generate-from-image') {
      // Même logique que dans usePostGeneration
      setCurrentImageAction('generate-from-image');
    } else {
      setCurrentImageAction(action);
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    
    // Simuler la génération d'image
    setTimeout(() => {
      const newMedia = {
        id: Date.now().toString(),
        name: `ai-generated-${Date.now()}.png`,
        type: 'image' as const,
        size: '1.2 MB',
        url: '/api/placeholder/400/400',
        uploadDate: new Date().toISOString().split('T')[0],
        tags: ['ai-generated'],
        usedInPosts: 0
      };
      setMedias(prev => [newMedia, ...prev]);
      setIsGeneratingImage(false);
      setIsImageModalOpen(false);
      setImageDescription('');
    }, 2000);
  };

  const handleGenerateFromImage = () => {
    handleGenerateImage();
  };

  const handleImageSelect = (imageUrl: string) => {
    // Pour MediaManager, on peut simplement fermer le modal
    setIsImageModalOpen(false);
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
            const newMedia = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              type: 'image' as const,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              url: url,
              uploadDate: new Date().toISOString().split('T')[0],
              tags: ['imported'],
              usedInPosts: 0
            };
            
            setMedias(prev => [newMedia, ...prev]);
            newImages.push(url);
          }
        });
        
        // Auto-sélectionner les nouvelles images pour la génération
        setSelectedSourceImages(prev => [...prev, ...newImages]);
      }
    };
    input.click();
  };

  const clearSelectedSourceImages = () => {
    setSelectedSourceImages([]);
  };

  const handleBackToImageOptions = () => {
    setCurrentImageAction(null);
  };

  const handleBackToCategories = () => {
    setCurrentImageCategory(null);
    setCurrentImageAction(null);
  };

  const deleteMedia = (mediaId: string) => {
    setMedias(medias.filter(m => m.id !== mediaId));
  };

  const filteredMedias = medias.filter(media => media.type === 'image');
  
  // Convertir les médias en format GalleryImage pour compatibilité
  const galleryImages = filteredMedias.map(media => ({
    id: media.id,
    name: media.name,
    url: media.url
  }));

  const stats = {
    totalMedias: medias.length,
    totalSize: medias.reduce((sum, media) => sum + parseFloat(media.size), 0).toFixed(1),
    imagesCount: medias.filter(m => m.type === 'image').length,
    videosCount: medias.filter(m => m.type === 'video').length
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Gestionnaire de médias</h1>
        <p className="text-gray">Importez et générez vos images pour LinkedIn</p>
      </div>

      {/* Main Sections */}
      <div className="bg-white rounded-2xl border border-gray/20 mb-8">
        {/* Section Tabs */}
        <div className="border-b border-gray/20">
          <div className="flex">
            <button
              onClick={() => setActiveSection('import')}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeSection === 'import'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray hover:text-black'
              }`}
            >
              <Upload size={20} />
              <span>Importer</span>
            </button>
            <button
              onClick={() => setActiveSection('ai-generation')}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeSection === 'ai-generation'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray hover:text-black'
              }`}
            >
              <MagicWand size={20} />
              <span>Générer</span>
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-6">
          {activeSection === 'import' && (
            <label className="block border-2 border-dashed border-gray/20 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload size={48} className="text-gray mx-auto mb-4" />
              <p className="text-lg font-medium text-black mb-2">Cliquez pour importer vos images</p>
              <p className="text-gray/60 text-sm">Formats supportés: JPG, PNG, WebP (Max 10MB)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          )}

          {activeSection === 'ai-generation' && (
            <div className="text-center">
              <Button
                onClick={() => setIsImageModalOpen(true)}
                className="px-8 py-4 text-lg"
              >
                <MagicWand size={20} className="mr-3" />
                Générer une image
              </Button>
            </div>
          )}
        </div>
      </div>


      {/* Media Gallery */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <h2 className="text-xl font-semibold text-black">Galerie des médias</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMedias.map((media) => (
              <div key={media.id} className="group relative bg-gray-50 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                    <ImageIcon size={32} className="text-primary" />
                  </div>
                </div>

                {/* Media Info */}
                <div className="p-3">
                  <p className="text-xs font-medium text-black truncate" title={media.name}>
                    {media.name}
                  </p>
                  <p className="text-xs text-gray">{media.size}</p>
                  <p className="text-xs text-gray">Utilisé {media.usedInPosts} fois</p>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
                      title="Voir l'image"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-red-600 hover:bg-gray-100 transition-colors"
                      title="Supprimer"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedias.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon size={64} className="text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">Aucun média trouvé</h3>
              <p className="text-gray">Importez ou générez vos premiers médias</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Selection Modal */}
      <ImageSelectionModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImageCategory={currentImageCategory}
        currentImageAction={currentImageAction}
        postContent={null} // Pas de contenu de post dans MediaManager
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
        context="media"
      />
    </div>
  );
}