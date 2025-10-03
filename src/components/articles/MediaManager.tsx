'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { 
  Upload, 
  Image as ImageIcon, 
  MagicWand, 
  Trash,
  Eye,
  X
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

const aiGenerationOptions = [
  {
    id: 'text-to-image',
    name: 'Texte vers image',
    description: 'Générez une image à partir d\'une description',
    icon: <MagicWand size={20} />
  },
  {
    id: 'image-to-image',
    name: 'Image vers image',
    description: 'Transformez une image existante avec l\'IA',
    icon: <ImageIcon size={20} />
  },
  {
    id: 'style-transfer',
    name: 'Transfert de style',
    description: 'Appliquez un style à une image existante',
    icon: <MagicWand size={20} />
  },
  {
    id: 'upscale',
    name: 'Amélioration qualité',
    description: 'Améliorez la résolution de vos images',
    icon: <Upload size={20} />
  }
];

export default function MediaManager() {
  const [medias, setMedias] = useState(mockMedias);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [selectedInputImages, setSelectedInputImages] = useState<{id: string, name: string, url: string}[]>([]);
  const [activeSection, setActiveSection] = useState<'import' | 'ai-generation'>('import');
  const [generationType, setGenerationType] = useState<'text-to-image' | 'image-to-image'>('text-to-image');
  const [showImageSelector, setShowImageSelector] = useState(false);

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

  // Fonction supprimée - plus d'import direct dans transformation

  const addExistingImage = (media: any) => {
    if (selectedInputImages.length < 8 && media.type === 'image') {
      const imageRef = { id: media.id, name: media.name, url: media.url };
      if (!selectedInputImages.some(img => img.id === media.id)) {
        setSelectedInputImages(prev => [...prev, imageRef]);
      }
    }
  };

  const removeSelectedImage = (index: number) => {
    setSelectedInputImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIGeneration = async () => {
    if (!generationPrompt.trim()) return;
    if (generationType === 'image-to-image' && selectedInputImages.length === 0) return;
    
    setIsGenerating(true);
    
    // Simuler la génération IA
    setTimeout(() => {
      const newMedia = {
        id: Date.now().toString(),
        name: `ai-generated-${Date.now()}.png`,
        type: 'image' as const,
        size: '1.2 MB',
        url: '/api/placeholder/400/400',
        uploadDate: new Date().toISOString().split('T')[0],
        tags: generationType === 'image-to-image' ? ['ai-generated', 'image-to-image', `${selectedInputImages.length}-images`] : ['ai-generated'],
        usedInPosts: 0
      };
      setMedias(prev => [newMedia, ...prev]);
      setGenerationPrompt('');
      setSelectedInputImages([]);
      setIsGenerating(false);
    }, 3000);
  };

  const deleteMedia = (mediaId: string) => {
    setMedias(medias.filter(m => m.id !== mediaId));
  };


  const filteredMedias = medias.filter(media => media.type === 'image');

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
      </div>

      {/* Main Sections */}
      <div className="bg-white rounded-2xl border border-gray/20 mb-8">
        {/* Section Tabs */}
        <div className="border-b border-gray/20">
          <div className="flex">
            <button
              onClick={() => setActiveSection('import')}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
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
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeSection === 'ai-generation'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray hover:text-black'
              }`}
            >
              <MagicWand size={20} />
              <span>Génération IA</span>
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-6">
          {activeSection === 'import' && (
            <label className="block border-2 border-dashed border-gray/20 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload size={48} className="text-gray mx-auto mb-4" />
              <p className="text-gray/60 text-sm">Importer vos photos</p>
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
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-black mb-2">Génération IA</h3>
                <p className="text-gray mb-6">Créez et transformez des images avec l'intelligence artificielle</p>
              </div>

              {/* AI Generation Type */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setGenerationType('text-to-image')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    generationType === 'text-to-image'
                      ? 'bg-primary text-white'
                      : 'bg-gray/10 text-gray hover:bg-gray/20'
                  }`}
                >
                  <MagicWand size={20} />
                  <span>Générer depuis texte</span>
                </button>
                
                <button
                  onClick={() => setGenerationType('image-to-image')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    generationType === 'image-to-image'
                      ? 'bg-primary text-white'
                      : 'bg-gray/10 text-gray hover:bg-gray/20'
                  }`}
                >
                  <ImageIcon size={20} />
                  <span>Transformer images</span>
                </button>
              </div>

              {/* Image Selection for transformation */}
              {generationType === 'image-to-image' && (
                <div className="space-y-4">
                  {/* Selected Images Display */}
                  {selectedInputImages.length > 0 && (
                    <div className="border border-gray/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-black">
                          Images sélectionnées ({selectedInputImages.length}/8)
                        </span>
                        <button
                          onClick={() => setSelectedInputImages([])}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Tout supprimer
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedInputImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                              <ImageIcon size={20} className="text-primary" />
                            </div>
                            <button
                              onClick={() => removeSelectedImage(index)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                            <p className="text-xs text-gray mt-1 truncate" title={image.name}>
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Select from Gallery */}
                  <button
                    onClick={() => setShowImageSelector(!showImageSelector)}
                    className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      selectedInputImages.length >= 8 
                        ? 'border-gray/20 text-gray/50 cursor-not-allowed' 
                        : 'border-gray/20 text-gray hover:border-primary hover:text-primary'
                    }`}
                    disabled={selectedInputImages.length >= 8}
                  >
                    <ImageIcon size={32} className="mx-auto mb-3" />
                    <p className="text-lg font-medium mb-1">
                      {selectedInputImages.length === 0 
                        ? 'Sélectionner des images à transformer'
                        : `${selectedInputImages.length}/8 images sélectionnées`
                      }
                    </p>
                    <p className="text-sm text-gray">
                      {selectedInputImages.length >= 8 
                        ? 'Limite atteinte (8 images maximum)' 
                        : 'Choisissez parmi vos images importées'
                      }
                    </p>
                  </button>

                  {/* Image Gallery Selector */}
                  {showImageSelector && (
                    <div className="border border-gray/20 rounded-lg p-4 bg-gray/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-black">Sélectionnez des images</span>
                        <button
                          onClick={() => setShowImageSelector(false)}
                          className="text-gray hover:text-black"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                        {medias.filter(media => media.type === 'image').length === 0 ? (
                          <div className="col-span-full text-center py-8">
                            <ImageIcon size={48} className="text-gray mx-auto mb-3" />
                            <p className="text-gray">Aucune image dans la galerie</p>
                            <p className="text-sm text-gray">Utilisez l'onglet "Importer" pour ajouter des images</p>
                          </div>
                        ) : (
                          medias.filter(media => media.type === 'image').map((media) => {
                            const isSelected = selectedInputImages.some(img => img.id === media.id);
                            return (
                              <button
                                key={media.id}
                                onClick={() => addExistingImage(media)}
                                disabled={selectedInputImages.length >= 8 && !isSelected}
                                className={`relative w-16 h-16 rounded-lg flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-primary/20 border-2 border-primary' 
                                    : selectedInputImages.length >= 8
                                    ? 'bg-gray/10 border border-gray/20 opacity-50 cursor-not-allowed'
                                    : 'bg-primary/10 border border-gray/20 hover:border-primary'
                                }`}
                              >
                                <ImageIcon size={20} className={isSelected ? 'text-primary' : 'text-gray'} />
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center">
                                    <span className="text-xs">✓</span>
                                  </div>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text Input for AI Generation */}
              <div className="relative">
                <textarea
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 pr-24 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                  placeholder={generationType === 'text-to-image' 
                    ? "Décrivez l'image que vous voulez générer..."
                    : "Comment voulez-vous transformer ces images ?"
                  }
                />
                <Button
                  onClick={handleAIGeneration}
                  loading={isGenerating}
                  size="sm"
                  className="absolute right-2 bottom-2"
                  disabled={(generationType === 'image-to-image' && selectedInputImages.length === 0) || !generationPrompt.trim()}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MagicWand size={16} />
                  )}
                </Button>
              </div>
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-red-600 hover:bg-gray-100 transition-colors"
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
    </div>
  );
}