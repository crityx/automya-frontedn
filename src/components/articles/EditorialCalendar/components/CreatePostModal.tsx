'use client';

import { memo } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import TimeSelector from '@/components/ui/TimeSelector';
import { CalendarBlank as CalendarIcon } from 'phosphor-react';
import { CreatePostFormData, CalendarPost } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreatePostFormData;
  onFormChange: (field: keyof CreatePostFormData, value: string) => void;
  onCreatePost: () => void;
  onSaveAsDraft: () => void;
  editingPost?: CalendarPost | null;
  onUpdatePost?: () => void;
  onPublishNow?: () => void;
}

const CreatePostModal = memo(function CreatePostModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onCreatePost,
  onSaveAsDraft,
  editingPost,
  onUpdatePost,
  onPublishNow
}: CreatePostModalProps) {
  const isEditing = !!editingPost;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier le post' : 'Planifier un nouveau post'}
      size="lg"
    >
      <div className="space-y-6">
        {/* Title Input */}
        <Input
          label="Titre du post *"
          value={formData.title}
          onChange={(e) => onFormChange('title', e.target.value)}
          placeholder="Ex: 5 secrets pour automatiser LinkedIn..."
          className="w-full"
        />

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Contenu du post *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => onFormChange('content', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
            placeholder="Rédigez votre post LinkedIn..."
          />
          <div className="flex justify-between items-center mt-2 text-xs text-gray">
            <span>Utilisez des emojis et hashtags pour plus d&apos;engagement</span>
            <span>{formData.content.length}/3000</span>
          </div>
        </div>

        {/* Date, Time, and Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Date de publication *"
            type="date"
            value={formData.date}
            onChange={(e) => onFormChange('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          
          <div>
            <label className="block text-sm font-medium text-black mb-3">Heure de publication *</label>
            <TimeSelector
              value={formData.time}
              onChange={(time) => onFormChange('time', time)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Type de contenu *
            </label>
            <select
              value={formData.type}
              onChange={(e) => onFormChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            >
              <option value="educational">Éducatif</option>
              <option value="strategy">Stratégie</option>
              <option value="testimonial">Témoignage</option>
              <option value="personal">Personnel</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray/10">
          {isEditing ? (
            <>
              {onPublishNow && (
                <Button
                  onClick={onPublishNow}
                  className="flex-1"
                >
                  Publier maintenant
                </Button>
              )}
              {onUpdatePost && (
                <Button
                  onClick={onUpdatePost}
                  variant="outline"
                  className="flex-1"
                >
                  <CalendarIcon size={16} className="mr-2" />
                  Mettre à jour
                </Button>
              )}
            </>
          ) : (
            <>
              <Button 
                onClick={onCreatePost} 
                className="flex-1"
                disabled={!formData.title.trim() || !formData.content.trim() || !formData.date}
              >
                <CalendarIcon size={16} className="mr-2" />
                Planifier le post
              </Button>
              <Button
                onClick={onSaveAsDraft}
                variant="outline"
                className="flex-1"
                disabled={!formData.title.trim() || !formData.content.trim()}
              >
                Enregistrer comme brouillon
              </Button>
            </>
          )}
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default CreatePostModal;