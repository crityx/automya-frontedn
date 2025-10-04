'use client';

import { useState, memo } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { UserPlus } from 'phosphor-react';
import { NewSeller } from './types';

interface CreateSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSeller: (seller: NewSeller) => void;
}

const CreateSellerModal = memo(function CreateSellerModal({ 
  isOpen, 
  onClose, 
  onCreateSeller 
}: CreateSellerModalProps) {
  const [newSeller, setNewSeller] = useState<NewSeller>({
    name: '',
    email: '',
    company: '',
    commission: 15
  });

  const handleSubmit = () => {
    if (!newSeller.name.trim() || !newSeller.email.trim() || !newSeller.company.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (newSeller.commission < 0 || newSeller.commission > 100) {
      alert('La commission doit être comprise entre 0 et 100%');
      return;
    }

    onCreateSeller(newSeller);
    setNewSeller({
      name: '',
      email: '',
      company: '',
      commission: 15
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Créer un nouveau vendeur" size="md">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Nom complet *
          </label>
          <Input
            value={newSeller.name}
            onChange={(e) => setNewSeller(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Sophie Martin"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email professionnel *
          </label>
          <Input
            type="email"
            value={newSeller.email}
            onChange={(e) => setNewSeller(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Ex: sophie@digitalagency.com"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Entreprise *
          </label>
          <Input
            value={newSeller.company}
            onChange={(e) => setNewSeller(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Ex: Digital Growth Agency"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Taux de commission (%)
          </label>
          <div className="relative">
            <Input
              type="number"
              min="0"
              max="100"
              step="1"
              value={newSeller.commission}
              onChange={(e) => setNewSeller(prev => ({ 
                ...prev, 
                commission: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
              }))}
              className="w-full pr-8"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm">
              %
            </div>
          </div>
          <p className="text-xs text-gray mt-2">
            Commission sur les ventes générées par ce vendeur
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Informations importantes</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Le vendeur recevra un email d&apos;invitation</li>
            <li>• Il devra configurer son mot de passe au premier login</li>
            <li>• Son statut sera &quot;En attente&quot; jusqu&apos;à validation</li>
            <li>• Vous pourrez modifier sa commission plus tard</li>
          </ul>
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray/10">
          <Button onClick={handleSubmit} className="flex-1">
            <UserPlus size={16} className="mr-2" />
            Créer le vendeur
          </Button>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default CreateSellerModal;