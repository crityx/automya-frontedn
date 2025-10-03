'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MagicWand, CalendarBlank, Eye, Copy, ArrowClockwise } from 'phosphor-react';

const writingStyles = [
  { id: 'professional', name: 'Professionnel', description: 'Ton formel et expertise' },
  { id: 'casual', name: 'Décontracté', description: 'Approche amicale et accessible' },
  { id: 'inspirational', name: 'Inspirant', description: 'Motivant et engageant' },
  { id: 'educational', name: 'Éducatif', description: 'Informatif et pédagogique' },
  { id: 'storytelling', name: 'Storytelling', description: 'Narratif et captivant' }
];

export default function PostGeneration() {
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPost = `🚀 ${topic}

Voici une réflexion que je voulais partager avec vous...

${selectedStyle === 'professional' ? 
  'Dans un environnement professionnel en constante évolution, il est crucial de...' :
  selectedStyle === 'casual' ?
  'Hey LinkedIn ! 👋 Alors, parlons un peu de...' :
  selectedStyle === 'inspirational' ?
  '✨ Chaque défi est une opportunité déguisée. Aujourd\'hui, je veux vous parler de...' :
  selectedStyle === 'educational' ?
  '📚 Apprenons ensemble ! Voici 3 points clés sur...' :
  '📖 Laissez-moi vous raconter une histoire qui va changer votre perspective sur...'
}

Les principales leçons à retenir :
• Point important n°1
• Point important n°2  
• Point important n°3

Et vous, qu'en pensez-vous ? Partagez votre expérience en commentaire ! 👇

#LinkedIn #Inspiration #Croissance #Professionnel`;
      
      setGeneratedPost(mockPost);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(generatedPost);
  };

  const handleSchedule = () => {
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Génération de post</h1>
        <p className="text-gray">Créez du contenu engageant avec l'IA en quelques clics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Form */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <MagicWand size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-black">Configuration du post</h2>
          </div>

          {/* Writing Style Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-3">
              Style d'écriture
            </label>
            <div className="space-y-3">
              {writingStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedStyle === style.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray/20 hover:border-gray/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-black">{style.name}</h3>
                    {selectedStyle === style.id && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray">{style.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div className="mb-6">
            <Input
              label="Sujet du post"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: L'importance de l'automatisation sur LinkedIn"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            loading={isGenerating}
            disabled={!topic.trim()}
            className="w-full"
            size="lg"
          >
            <MagicWand size={20} className="mr-2" />
            {isGenerating ? 'Génération en cours...' : 'Générer le post'}
          </Button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Eye size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-black">Aperçu du post</h2>
            </div>
            {generatedPost && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                className="p-2"
              >
                <ArrowClockwise size={16} />
              </Button>
            )}
          </div>

          {generatedPost ? (
            <div className="space-y-6">
              {/* LinkedIn Post Preview */}
              <div className="border border-gray/20 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">PG</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Pierre Godard</h4>
                    <p className="text-sm text-gray">Expert en automatisation LinkedIn</p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-black leading-relaxed">
                  {generatedPost}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSchedule}
                  className="flex-1"
                >
                  <CalendarBlank size={16} className="mr-2" />
                  Planifier
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyPost}
                  className="flex-1"
                >
                  <Copy size={16} className="mr-2" />
                  Copier
                </Button>
              </div>

              {/* Post Stats Prediction */}
              <div className="p-4 bg-primary-light rounded-lg">
                <h4 className="font-medium text-black mb-3">Prédictions IA</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">25-35</p>
                    <p className="text-xs text-gray">Réactions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">8-12</p>
                    <p className="text-xs text-gray">Commentaires</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">3-5</p>
                    <p className="text-xs text-gray">Partages</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MagicWand size={32} className="text-gray" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                Prêt à créer du contenu ?
              </h3>
              <p className="text-gray">
                Sélectionnez un style et décrivez votre sujet pour commencer
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Suggestions de sujets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Tendances LinkedIn 2024',
            'Conseils networking efficace',
            'Stratégies content marketing',
            'Growth hacking B2B',
            'Personal branding tips',
            'Automatisation marketing'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setTopic(suggestion)}
              className="p-4 text-left border border-gray/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-black font-medium">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}