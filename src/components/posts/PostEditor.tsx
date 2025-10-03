'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { 
  MagicWand, 
  CalendarBlank, 
  Copy, 
  FloppyDisk
} from 'phosphor-react';
import { WritingMode } from '@/types/post';

interface PostEditorProps {
  writingMode: WritingMode;
  setWritingMode: (mode: WritingMode) => void;
  postContent: string;
  setPostContent: (content: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onSchedule: () => void;
}

export default function PostEditor({
  writingMode,
  setWritingMode,
  postContent,
  setPostContent,
  description,
  setDescription,
  isGenerating,
  onGenerate,
  onSchedule
}: PostEditorProps) {
  if (!writingMode) {
    return (
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
    );
  }

  return (
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
            onClick={onGenerate}
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
          
          {(postContent || writingMode === 'manual') && (
            <div className="pt-4 border-t border-gray/10 space-y-3">
              <Button
                onClick={onSchedule}
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
          
          {postContent && (
            <div className="pt-4 border-t border-gray/10 space-y-3">
              <Button
                onClick={onSchedule}
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
  );
}