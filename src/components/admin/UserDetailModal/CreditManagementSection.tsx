'use client';

import { useState, useCallback, memo } from 'react';
import Button from '@/components/ui/Button';
import { 
  CreditCard, 
  Plus,
  Minus,
  TrendUp,
  Clock
} from 'phosphor-react';
import { CreditHistoryItem } from './types';

interface CreditManagementSectionProps {
  user: any;
  creditHistory: CreditHistoryItem[];
  onCreditAction: (action: 'add' | 'remove', amount: number, reason: string) => void;
}

const CreditManagementSection = memo(function CreditManagementSection({ 
  user, 
  creditHistory, 
  onCreditAction 
}: CreditManagementSectionProps) {
  const [creditAmount, setCreditAmount] = useState(50);
  const [creditReason, setCreditReason] = useState('');
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [creditAction, setCreditAction] = useState<'add' | 'remove'>('add');

  const handleCreditSubmit = useCallback(() => {
    if (creditAmount > 0 && creditReason.trim()) {
      onCreditAction(creditAction, creditAmount, creditReason);
      setShowCreditForm(false);
      setCreditReason('');
      setCreditAmount(50);
    }
  }, [creditAmount, creditReason, creditAction, onCreditAction]);

  const getTypeIcon = (type: string) => {
    return type === 'added' ? (
      <TrendUp size={16} className="text-green-600" />
    ) : (
      <Minus size={16} className="text-red-600" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'added' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Solde actuel et actions */}
      <div className="bg-primary/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <CreditCard size={20} className="text-primary" />
              Gestion des crédits
            </h3>
            <p className="text-sm text-gray">Solde actuel: {user.credits} crédits</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setCreditAction('add');
                setShowCreditForm(true);
              }}
            >
              <Plus size={16} className="mr-2" />
              Ajouter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCreditAction('remove');
                setShowCreditForm(true);
              }}
            >
              <Minus size={16} className="mr-2" />
              Retirer
            </Button>
          </div>
        </div>

        {/* Formulaire d'ajustement */}
        {showCreditForm && (
          <div className="bg-white rounded-lg p-4 border border-gray/20">
            <h4 className="font-semibold text-black mb-3">
              {creditAction === 'add' ? 'Ajouter des crédits' : 'Retirer des crédits'}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Nombre de crédits
                </label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                  min="1"
                  max="5000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Raison
                </label>
                <textarea
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                  rows={3}
                  placeholder="Expliquez la raison de cet ajustement..."
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreditSubmit}
                  disabled={!creditReason.trim() || creditAmount <= 0}
                >
                  Confirmer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreditForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Historique des crédits */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Historique des crédits
        </h4>
        
        <div className="space-y-3">
          {creditHistory.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getTypeIcon(item.type)}
                <div>
                  <p className="font-medium text-black">{item.activity}</p>
                  <p className="text-sm text-gray">{new Date(item.date).toLocaleString('fr-FR')}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold ${getTypeColor(item.type)}`}>
                  {item.type === 'added' ? '+' : ''}{item.amount} crédits
                </p>
                <p className="text-sm text-gray">Solde: {item.balance}</p>
              </div>
            </div>
          ))}
        </div>
        
        {creditHistory.length === 0 && (
          <p className="text-center text-gray py-8">Aucun historique de crédits</p>
        )}
      </div>
    </div>
  );
});

export default CreditManagementSection;