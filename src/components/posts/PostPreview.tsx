'use client';

import { 
  Plus, 
  Monitor, 
  DeviceMobile, 
  Heart, 
  ChatCircle, 
  Share,
  Palette,
  ArrowClockwise
} from 'phosphor-react';
import { ViewMode, GenerationMethod } from '@/types/post';

interface PostPreviewProps {
  postContent: string;
  writingMode: string | null;
  selectedImage: string | null;
  lastGenerationMethod: GenerationMethod;
  isGeneratingImage: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onImageClick: () => void;
  onEditImageParameters: () => void;
  onChangeImageMethod: () => void;
}

export default function PostPreview({
  postContent,
  writingMode,
  selectedImage,
  lastGenerationMethod,
  isGeneratingImage,
  viewMode,
  setViewMode,
  onImageClick,
  onEditImageParameters,
  onChangeImageMethod
}: PostPreviewProps) {
  return (
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
            onClick={onImageClick}
            disabled={isGeneratingImage}
            className="w-full border-2 border-dashed border-gray/20 rounded-lg p-6 text-center hover:border-primary transition-colors mb-4 flex items-center justify-center space-x-3"
          >
            {isGeneratingImage ? (
              <>
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <div className="text-left">
                  <p className="text-primary font-medium">Génération en cours...</p>
                  <p className="text-sm text-gray/60">Création de votre image</p>
                </div>
              </>
            ) : selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Image sélectionnée"
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="text-left flex-1">
                  <p className="text-gray font-medium">Image sélectionnée</p>
                  <p className="text-sm text-gray/60">
                    {lastGenerationMethod === 'generate-from-image' ? 'Générée avec transformation' :
                     lastGenerationMethod === 'generate-from-description' ? 'Générée depuis description' :
                     lastGenerationMethod === 'generate-from-post' ? 'Générée depuis le post' :
                     'Importée depuis fichiers/galerie'}
                  </p>
                </div>
                {lastGenerationMethod && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditImageParameters();
                    }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Modifier les paramètres"
                  >
                    <Palette size={16} />
                  </button>
                )}
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
              <div className="relative group">
                <img
                  src={selectedImage}
                  alt="Post image"
                  className="w-full rounded-lg object-cover max-h-80"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    {lastGenerationMethod && (
                      <button
                        onClick={onEditImageParameters}
                        className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                        title="Modifier les paramètres"
                      >
                        <Palette size={14} />
                      </button>
                    )}
                    <button
                      onClick={onChangeImageMethod}
                      className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                      title="Changer d'image"
                    >
                      <ArrowClockwise size={14} />
                    </button>
                  </div>
                </div>
              </div>
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
  );
}