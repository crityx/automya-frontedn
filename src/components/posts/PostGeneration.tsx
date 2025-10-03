'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { 
  MagicWand, 
  CalendarBlank, 
  Copy, 
  ArrowClockwise,
  Plus,
  Image as ImageIcon,
  Heart,
  ChatCircle,
  Share,
  Upload,
  Palette,
  Monitor,
  DeviceMobile,
  FloppyDisk
} from 'phosphor-react';

interface ImageOption {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

const mainImageCategories: ImageOption[] = [
  {
    id: 'generate-from-text',
    name: 'Générer à partir du texte',
    description: 'Créer une image avec l\'IA en utilisant du texte',
    icon: <MagicWand size={20} />
  },
  {
    id: 'from-existing-images',
    name: 'Depuis images existantes',
    description: 'Utiliser ou transformer vos images disponibles',
    icon: <ImageIcon size={20} />
  }
];

const textGenerationOptions: ImageOption[] = [
  {
    id: 'generate-from-post',
    name: 'Générer à partir du post',
    description: 'IA crée une image basée sur le contenu de votre post',
    icon: <MagicWand size={20} />
  },
  {
    id: 'generate-from-description',
    name: 'Générer à partir d\'une description',
    description: 'Décrivez l\'image que vous voulez créer',
    icon: <Palette size={20} />
  }
];

const existingImageOptions: ImageOption[] = [
  {
    id: 'upload-file',
    name: 'Importer depuis mes fichiers',
    description: 'Choisir une image de votre ordinateur',
    icon: <Upload size={20} />
  },
  {
    id: 'from-gallery',
    name: 'Choisir depuis la galerie',
    description: 'Sélectionner parmi vos images existantes',
    icon: <ImageIcon size={20} />
  },
  {
    id: 'generate-from-image',
    name: 'Générer à partir d\'une image',
    description: 'Transformer ou améliorer une image existante',
    icon: <ArrowClockwise size={20} />
  }
];

export default function PostGeneration() {
  const [writingMode, setWritingMode] = useState<'ai' | 'manual' | null>(null);
  const [postContent, setPostContent] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [currentImageCategory, setCurrentImageCategory] = useState<string | null>(null);
  const [currentImageAction, setCurrentImageAction] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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

  const handleCopyPost = () => {
    navigator.clipboard.writeText(postContent);
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
        // Génération directe sans étape supplémentaire
        handleGenerateImage();
        break;
      case 'generate-from-description':
        setCurrentImageAction('generate-from-description');
        break;
      case 'upload-file':
        setIsImageModalOpen(false);
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
          }
        };
        input.click();
        break;
      case 'from-gallery':
        setCurrentImageAction('from-gallery');
        break;
      case 'generate-from-image':
        setCurrentImageAction('generate-from-image');
        break;
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    
    setTimeout(() => {
      const mockImageUrl = '/api/placeholder/400/300';
      setSelectedImage(mockImageUrl);
      setIsGeneratingImage(false);
      setCurrentImageAction(null);
      setImageDescription('');
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
          {!writingMode ? (
            /* Mode Selection */
            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <h2 className="text-lg font-semibold text-black mb-4">Comment souhaitez-vous créer votre post ?</h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => setWritingMode('ai')}
                  className="w-full p-4 rounded-lg border-2 border-gray/20 hover:border-primary hover:bg-primary/5 text-left transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <MagicWand size={20} className="text-gray" />
                    <h3 className="font-medium text-black">Générer avec l'IA</h3>
                  </div>
                  <p className="text-sm text-gray">Décrivez votre sujet et laissez l'IA créer le post</p>
                </button>
                
                <button
                  onClick={() => setWritingMode('manual')}
                  className="w-full p-4 rounded-lg border-2 border-gray/20 hover:border-primary hover:bg-primary/5 text-left transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Copy size={20} className="text-gray" />
                    <h3 className="font-medium text-black">Rédiger manuellement</h3>
                  </div>
                  <p className="text-sm text-gray">Écrivez votre post vous-même</p>
                </button>
              </div>
            </div>
          ) : (
            /* Content Input */
            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {writingMode === 'ai' ? (
                    <>
                      <MagicWand size={20} className="text-primary" />
                      <h2 className="text-lg font-semibold text-black">Générer avec l'IA</h2>
                    </>
                  ) : (
                    <>
                      <Copy size={20} className="text-primary" />
                      <h2 className="text-lg font-semibold text-black">Rédiger manuellement</h2>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    setWritingMode(null);
                    setPostContent('');
                    setDescription('');
                  }}
                  className="text-sm text-gray hover:text-black transition-colors"
                >
                  Changer de mode
                </button>
              </div>
              
              {writingMode === 'ai' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Description du sujet
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                      placeholder="Décrivez le sujet de votre post (ex: L'importance de l'automatisation sur LinkedIn)"
                    />
                  </div>
                  
                  <Button
                    onClick={handleGenerateFromDescription}
                    loading={isGenerating}
                    disabled={!description.trim()}
                    className="w-full"
                  >
                    <MagicWand size={16} className="mr-2" />
                    {isGenerating ? 'Génération en cours...' : 'Générer le post'}
                  </Button>
                  
                  {postContent && (
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Post généré - Personnalisez si nécessaire
                      </label>
                      <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={12}
                        className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                        placeholder="Votre post généré apparaîtra ici..."
                      />
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  {(postContent || writingMode === 'manual') && (
                    <div className="pt-4 border-t border-gray/10 space-y-3">
                      <Button
                        onClick={() => setIsScheduleModalOpen(true)}
                        className="w-full"
                      >
                        <CalendarBlank size={16} className="mr-2" />
                        Planifier la publication
                      </Button>
                      <Button
                        onClick={() => {
                          console.log('Enregistrer comme brouillon');
                        }}
                        variant="ghost"
                        className="w-full text-gray hover:text-black"
                      >
                        <FloppyDisk size={16} className="mr-2" />
                        Enregistrer comme brouillon
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    placeholder="Rédigez votre post LinkedIn..."
                  />
                  
                  {/* Action Buttons */}
                  {postContent && (
                    <div className="pt-4 border-t border-gray/10 space-y-3">
                      <Button
                        onClick={() => setIsScheduleModalOpen(true)}
                        className="w-full"
                      >
                        <CalendarBlank size={16} className="mr-2" />
                        Planifier la publication
                      </Button>
                      <Button
                        onClick={() => {
                          console.log('Enregistrer comme brouillon');
                        }}
                        variant="ghost"
                        className="w-full text-gray hover:text-black"
                      >
                        <FloppyDisk size={16} className="mr-2" />
                        Enregistrer comme brouillon
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black">Aperçu LinkedIn</h2>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'desktop'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray hover:text-black'
                }`}
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'mobile'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray hover:text-black'
                }`}
              >
                <DeviceMobile size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
              {/* LinkedIn Post Preview */}
              <div className={`border border-gray/20 rounded-lg p-4 bg-white transition-all ${
                viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">B</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Baptiste Li Mandri</h4>
                    <p className="text-sm text-gray">Entrepreneur • Expert LinkedIn • 2h</p>
                  </div>
                </div>
                
                <div className="whitespace-pre-wrap text-black leading-relaxed mb-4 min-h-16">
                  {postContent || (
                    <span className="text-gray/50 italic">
                      {!writingMode 
                        ? 'Choisissez un mode de création pour voir votre post ici...'
                        : writingMode === 'ai' 
                        ? 'Votre post généré par l\'IA apparaîtra ici...'
                        : 'Votre post apparaîtra ici au fur et à mesure que vous écrivez...'
                      }
                    </span>
                  )}
                </div>

                {/* Image Section */}
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="w-full border-2 border-dashed border-gray/20 rounded-lg p-6 text-center hover:border-primary transition-colors mb-4 flex items-center justify-center space-x-3"
                >
                  {selectedImage ? (
                    <>
                      <img
                        src={selectedImage}
                        alt="Image sélectionnée"
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="text-left">
                        <p className="text-gray font-medium">Modifier l'image</p>
                        <p className="text-sm text-gray/60">Cliquez pour changer</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Plus size={24} className="text-gray" />
                      <div className="text-left">
                        <p className="text-gray font-medium">Ajouter une image</p>
                        <p className="text-sm text-gray/60">Cliquez pour choisir une option</p>
                      </div>
                    </>
                  )}
                </button>
                
                {selectedImage && (
                  <div className="mb-4">
                    <img
                      src={selectedImage}
                      alt="Post image"
                      className="w-full rounded-lg object-cover max-h-80"
                    />
                  </div>
                )}

                {/* LinkedIn Interactions */}
                <div className="border-t border-gray/10 pt-3">
                  <div className="flex items-center justify-between text-sm text-gray mb-3">
                    <span>156 réactions • 24 commentaires</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray/10 pt-3">
                    <button className="flex items-center space-x-2 text-gray hover:text-primary transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">J'aime</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray hover:text-primary transition-colors">
                      <ChatCircle size={16} />
                      <span className="text-sm">Commenter</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray hover:text-primary transition-colors">
                      <Share size={16} />
                      <span className="text-sm">Partager</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>

      {/* Image Options Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setCurrentImageAction(null);
          setImageDescription('');
        }}
        title={
          currentImageAction 
            ? currentImageAction === 'generate-from-post' 
              ? 'Générer à partir du post'
              : currentImageAction === 'generate-from-description'
              ? 'Générer à partir d\'une description'
              : currentImageAction === 'from-gallery'
              ? 'Choisir depuis la galerie'
              : currentImageAction === 'generate-from-image'
              ? 'Générer à partir d\'une image'
              : 'Ajouter une image'
            : 'Ajouter une image'
        }
        size="md"
      >
        {!currentImageCategory ? (
          /* Main Categories */
          <div className="space-y-4">
            <p className="text-gray mb-6">Choisissez comment vous souhaitez ajouter une image à votre post :</p>
            
            {mainImageCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">{category.name}</h3>
                    <p className="text-sm text-gray">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : !currentImageAction ? (
          /* Sub-options */
          <div className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray mb-4">
              <button
                onClick={handleBackToCategories}
                className="hover:text-black transition-colors"
              >
                Ajouter une image
              </button>
              <span>›</span>
              <span className="text-primary font-medium">
                {currentImageCategory === 'generate-from-text' 
                  ? 'Générer à partir du texte'
                  : 'Depuis images existantes'
                }
              </span>
            </div>
            
            {(currentImageCategory === 'generate-from-text' ? textGenerationOptions : existingImageOptions).map((option) => (
              <button
                key={option.id}
                onClick={() => handleImageOptionSelect(option.id)}
                className="w-full p-4 border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">{option.name}</h3>
                    <p className="text-sm text-gray">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : currentImageAction === 'generate-from-post' ? (
          /* Generate from Post */
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Contenu du post :</h4>
              <p className="text-sm text-blue-800 line-clamp-4">{postContent}</p>
            </div>
            <p className="text-gray">L'IA va créer une image basée sur le contenu de votre post.</p>
            <div className="flex space-x-3">
              <Button
                onClick={handleGenerateImage}
                loading={isGeneratingImage}
                className="flex-1"
              >
                <MagicWand size={16} className="mr-2" />
                {isGeneratingImage ? 'Génération...' : 'Générer l\'image'}
              </Button>
              <Button
                variant="outline"
                onClick={handleBackToCategories}
              >
                Retour
              </Button>
            </div>
          </div>
        ) : currentImageAction === 'generate-from-description' ? (
          /* Generate from Description */
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Décrivez l'image que vous souhaitez
              </label>
              <textarea
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Ex: Une illustration moderne montrant des graphiques de croissance avec des couleurs bleues et vertes"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleGenerateImage}
                loading={isGeneratingImage}
                disabled={!imageDescription.trim()}
                className="flex-1"
              >
                <MagicWand size={16} className="mr-2" />
                {isGeneratingImage ? 'Génération...' : 'Générer l\'image'}
              </Button>
              <Button
                variant="outline"
                onClick={handleBackToCategories}
              >
                Retour
              </Button>
            </div>
          </div>
        ) : currentImageAction === 'from-gallery' ? (
          /* Gallery Selection */
          <div className="space-y-4">
            <div className="text-center py-8">
              <ImageIcon size={48} className="text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">Galerie de médias</h3>
              <p className="text-gray mb-4">Sélectionnez une image depuis votre galerie</p>
              <Button variant="outline" onClick={handleBackToImageOptions}>
                Retour aux options
              </Button>
            </div>
          </div>
        ) : currentImageAction === 'generate-from-image' ? (
          /* Generate from Image */
          <div className="space-y-4">
            <div className="text-center py-8">
              <ArrowClockwise size={48} className="text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">Générer à partir d'une image</h3>
              <p className="text-gray mb-4">Transformez ou améliorez une image existante</p>
              <Button variant="outline" onClick={handleBackToImageOptions}>
                Retour aux options
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}