'use client';

import { useState, memo } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, CalendarBlank } from 'phosphor-react';
import { NewPost, Post } from './types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: NewPost) => void;
}

const CreatePostModal = memo(function CreatePostModal({ 
  isOpen, 
  onClose, 
  onCreatePost 
}: CreatePostModalProps) {
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
    type: 'educational',
    scheduledFor: ''
  });

  const handleSubmit = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onCreatePost(newPost);
    setNewPost({
      title: '',
      content: '',
      type: 'educational',
      scheduledFor: ''
    });
    onClose();
  };

  const handlePublishNow = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onCreatePost({ ...newPost, publishNow: true, scheduledFor: '' });
    setNewPost({
      title: '',
      content: '',
      type: 'educational',
      scheduledFor: ''
    });
    onClose();
  };

  const handleSaveDraft = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onCreatePost({ ...newPost, scheduledFor: '' });
    setNewPost({
      title: '',
      content: '',
      type: 'educational',
      scheduledFor: ''
    });
    onClose();
  };

  const postTypes: Array<{ value: Post['type']; label: string; description: string }> = [
    { value: 'educational', label: 'Éducatif', description: 'Contenu informatif et pédagogique' },
    { value: 'strategy', label: 'Stratégie', description: 'Conseils et méthodes business' },
    { value: 'testimonial', label: 'Témoignage', description: 'Retours clients et success stories' },
    { value: 'personal', label: 'Personnel', description: 'Partage d\'expérience personnelle' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Créer un nouveau post" size="lg">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Titre du post *
          </label>
          <Input
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: 5 secrets pour automatiser LinkedIn..."
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Type de contenu *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {postTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setNewPost(prev => ({ ...prev, type: type.value }))}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  newPost.type === type.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray/20 hover:border-gray/40'
                }`}
              >
                <div className="font-medium text-black">{type.label}</div>
                <div className="text-xs text-gray mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Contenu du post *
          </label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
            placeholder="Rédigez votre post LinkedIn..."
          />
          <div className="flex justify-between items-center mt-2 text-xs text-gray">
            <span>Utilisez des emojis et hashtags pour plus d&apos;engagement</span>
            <span>{newPost.content.length}/3000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Programmer la publication (optionnel)
          </label>
          <div className="relative">
            <CalendarBlank className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray" />
            <input
              type="datetime-local"
              value={newPost.scheduledFor}
              onChange={(e) => setNewPost(prev => ({ ...prev, scheduledFor: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <p className="text-xs text-gray mt-2">
            Laissez vide pour créer un brouillon
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray/10">
          <Button onClick={handlePublishNow} className="flex-1">
            Publier maintenant
          </Button>
          <Button onClick={handleSubmit} className="flex-1" variant="outline">
            Planifier
          </Button>
          <Button onClick={handleSaveDraft} className="flex-1" variant="outline">
            Enregistrer comme brouillon
          </Button>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default CreatePostModal;