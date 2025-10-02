'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Download,
  Trash2,
  Eye,
  Copy,
  Search,
  Filter,
  Plus
} from 'lucide-react';

const mockMedias = [
  {
    id: '1',
    name: 'automation-workflow.png',
    type: 'image',
    size: '2.4 MB',
    url: '/api/placeholder/400/300',
    uploadDate: '2024-10-01',
    tags: ['automation', 'workflow'],
    usedInPosts: 3
  },
  {
    id: '2',
    name: 'linkedin-tips-infographic.jpg',
    type: 'image',
    size: '1.8 MB',
    url: '/api/placeholder/400/600',
    uploadDate: '2024-09-28',
    tags: ['linkedin', 'tips'],
    usedInPosts: 5
  },
  {
    id: '3',
    name: 'demo-video.mp4',
    type: 'video',
    size: '15.2 MB',
    url: '/api/placeholder/400/300',
    uploadDate: '2024-09-25',
    tags: ['demo', 'tutorial'],
    usedInPosts: 1
  }
];

const aiGenerationOptions = [
  {
    id: 'text-to-image',
    name: 'Texte vers image',
    description: 'Générez une image à partir d\'une description',
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'style-transfer',
    name: 'Transfert de style',
    description: 'Appliquez un style à une image existante',
    icon: <ImageIcon className="w-5 h-5" />
  },
  {
    id: 'upscale',
    name: 'Amélioration qualité',
    description: 'Améliorez la résolution de vos images',
    icon: <Upload className="w-5 h-5" />
  }
];

export default function MediaManager() {
  const [medias, setMedias] = useState(mockMedias);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState('');

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newMedia = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          url: URL.createObjectURL(file),
          uploadDate: new Date().toISOString().split('T')[0],
          tags: [],
          usedInPosts: 0
        };
        setMedias(prev => [newMedia, ...prev]);
      });
    }
  };

  const handleAIGeneration = async () => {
    if (!generationPrompt.trim()) return;
    
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
        tags: ['ai-generated'],
        usedInPosts: 0
      };
      setMedias(prev => [newMedia, ...prev]);
      setGenerationPrompt('');
      setIsGenerating(false);
    }, 3000);
  };

  const deleteMedia = (mediaId: string) => {
    setMedias(medias.filter(m => m.id !== mediaId));
  };

  const copyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const filteredMedias = medias.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || media.type === filterType;
    return matchesSearch && matchesType;
  });

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
        <p className="text-gray">Organisez et générez vos images et vidéos pour LinkedIn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalMedias}</p>
            <p className="text-sm text-gray">Médias totaux</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <ImageIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.imagesCount}</p>
            <p className="text-sm text-gray">Images</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.videosCount}</p>
            <p className="text-sm text-gray">Vidéos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <Upload className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalSize} MB</p>
            <p className="text-sm text-gray">Espace utilisé</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <h2 className="text-xl font-semibold text-black mb-6">Ajouter des médias</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Upload */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Importer depuis l'ordinateur</h3>
            <div className="border-2 border-dashed border-gray/30 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <Upload className="w-12 h-12 text-gray mx-auto mb-4" />
              <h4 className="text-lg font-medium text-black mb-2">Glissez vos fichiers ici</h4>
              <p className="text-gray mb-4">ou cliquez pour sélectionner</p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button variant="outline">
                  Choisir des fichiers
                </Button>
              </label>
              <p className="text-xs text-gray mt-4">
                Formats supportés: JPG, PNG, GIF, MP4, MOV (max 50MB)
              </p>
            </div>
          </div>

          {/* AI Generation */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Génération par IA</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Décrivez l'image à générer
                </label>
                <textarea
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                  placeholder="Ex: Un graphique moderne montrant l'évolution des ventes avec des couleurs bleues et violettes"
                />
              </div>

              <Button
                onClick={handleAIGeneration}
                loading={isGenerating}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? 'Génération en cours...' : 'Générer avec l\'IA'}
              </Button>

              <div className="grid grid-cols-1 gap-3">
                {aiGenerationOptions.map((option) => (
                  <div key={option.id} className="p-3 border border-gray/20 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-light rounded-lg text-primary">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{option.name}</h4>
                        <p className="text-xs text-gray">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-black">Galerie des médias</h2>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray/30 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tous les types</option>
                <option value="image">Images</option>
                <option value="video">Vidéos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedias.map((media) => (
              <div key={media.id} className="group relative bg-gray-50 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  {media.type === 'image' ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-primary" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Video className="w-12 h-12 text-purple-600" />
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyMediaUrl(media.url)}
                      className="p-2 bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="p-2 bg-white rounded-lg text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Media Info */}
                <div className="p-4">
                  <h3 className="font-medium text-black truncate" title={media.name}>
                    {media.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray">
                    <span>{media.size}</span>
                    <span>{media.usedInPosts} posts</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {media.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedias.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">Aucun média trouvé</h3>
              <p className="text-gray">Importez ou générez vos premiers médias</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}