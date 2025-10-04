'use client';

import Modal from './Modal';
import Button from './Button';
import { PaperPlaneTilt, X } from 'phosphor-react';

interface PublishConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPublishing?: boolean;
}

export default function PublishConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isPublishing = false
}: PublishConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publier maintenant"
      size="sm"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <PaperPlaneTilt size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Confirmer la publication
          </h3>
          <p className="text-gray">
            Êtes-vous sûr de vouloir publier ce post immédiatement sur LinkedIn ?
          </p>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1"
            disabled={isPublishing}
          >
            <X size={16} className="mr-2" />
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
            loading={isPublishing}
            disabled={isPublishing}
          >
            <PaperPlaneTilt size={16} className="mr-2" />
            {isPublishing ? 'Publication...' : 'Publier maintenant'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}