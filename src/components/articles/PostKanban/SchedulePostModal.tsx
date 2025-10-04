'use client';

import { useState, memo } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (datetime: string) => void;
}

const SchedulePostModal = memo(function SchedulePostModal({ isOpen, onClose, onConfirm }: SchedulePostModalProps) {
  const [datetime, setDatetime] = useState<string>('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Planifier la publication" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Date et heure</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={() => {
              if (!datetime) return;
              onConfirm(datetime);
            }}
            className="flex-1"
          >
            Confirmer
          </Button>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default SchedulePostModal;