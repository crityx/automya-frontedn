'use client';

import Modal from './Modal';
import Button from './Button';
import { CalendarBlank, Check } from 'phosphor-react';

interface ScheduleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  scheduledDate: string;
  scheduledTime: string;
}

export default function ScheduleConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  scheduledDate,
  scheduledTime
}: ScheduleConfirmationModalProps) {
  const formatScheduledDate = (dateStr: string, time: string) => {
    const date = new Date(`${dateStr}T${time}`);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publication planifiée !"
      size="sm"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-black mb-2">
            Votre post a été planifié !
          </h3>
          
          <div className="p-4 bg-primary/5 rounded-lg mb-4">
            <div className="flex items-center justify-center mb-2">
              <CalendarBlank size={20} className="text-primary mr-2" />
              <span className="font-medium text-primary">Date de publication</span>
            </div>
            <p className="text-black font-semibold">
              {formatScheduledDate(scheduledDate, scheduledTime)}
            </p>
          </div>
          
          <p className="text-gray">
            Votre post sera automatiquement publié à la date et l'heure prévues. 
            Vous pouvez le modifier ou l'annuler depuis le calendrier éditorial.
          </p>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1"
          >
            Voir le calendrier
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
          >
            <Check size={16} className="mr-2" />
            Parfait !
          </Button>
        </div>
      </div>
    </Modal>
  );
}