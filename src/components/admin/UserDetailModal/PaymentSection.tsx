'use client';

import { memo, useMemo } from 'react';
import { 
  Receipt,
  CheckCircle,
  XCircle,
  CreditCard
} from 'phosphor-react';
import { PaymentHistoryItem } from './types';

interface PaymentSectionProps {
  paymentHistory: PaymentHistoryItem[];
}

const PaymentSection = memo(function PaymentSection({ paymentHistory }: PaymentSectionProps) {
  const paymentStats = useMemo(() => {
    const completed = paymentHistory.filter(p => p.status === 'completed');
    const failed = paymentHistory.filter(p => p.status === 'failed');
    
    return {
      totalSpent: completed.reduce((sum, p) => sum + p.amount, 0),
      totalCredits: completed.reduce((sum, p) => sum + p.credits, 0),
      completedCount: completed.length,
      failedCount: failed.length
    };
  }, [paymentHistory]);

  const getStatusIcon = useMemo(() => (status: string) => {
    return status === 'completed' ? (
      <CheckCircle size={16} className="text-green-600" />
    ) : (
      <XCircle size={16} className="text-red-600" />
    );
  }, []);

  const getStatusColor = useMemo(() => (status: string) => {
    return status === 'completed' ? 'text-green-600' : 'text-red-600';
  }, []);

  const getStatusText = useMemo(() => (status: string) => {
    return status === 'completed' ? 'Réussi' : 'Échoué';
  }, []);

  const getTypeText = useMemo(() => (type: string) => {
    return type === 'subscription' ? 'Abonnement' : 'Achat crédits';
  }, []);

  const getTypeBadgeColor = useMemo(() => (type: string) => {
    return type === 'subscription' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Receipt size={20} className="text-primary" />
          Historique des paiements
        </h4>
        
        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="border border-gray/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-black">{payment.description}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadgeColor(payment.type)}`}>
                      {getTypeText(payment.type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray">{new Date(payment.date).toLocaleString('fr-FR')}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(payment.status)}
                    <span className={`font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-black">
                    {payment.amount.toFixed(2)} {payment.currency}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray">Méthode:</span>
                  <span className="ml-2 font-medium text-black">{payment.paymentMethod}</span>
                </div>
                
                <div>
                  <span className="text-gray">Transaction:</span>
                  <span className="ml-2 font-mono text-black">{payment.transactionId}</span>
                </div>
                
                <div>
                  <span className="text-gray">Crédits:</span>
                  <span className="ml-2 font-medium text-black">{payment.credits}</span>
                </div>
              </div>
              
              {payment.failureReason && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">
                    <span className="font-medium">Raison de l'échec:</span> {payment.failureReason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {paymentHistory.length === 0 && (
          <p className="text-center text-gray py-8">Aucun historique de paiement</p>
        )}
      </div>

      {/* Résumé financier */}
      <div className="bg-primary/10 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-primary" />
          Résumé financier
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray/20">
            <p className="text-sm text-gray mb-1">Total dépensé</p>
            <p className="text-xl font-bold text-black">
              {paymentStats.totalSpent.toFixed(2)} EUR
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray/20">
            <p className="text-sm text-gray mb-1">Crédits achetés</p>
            <p className="text-xl font-bold text-black">
              {paymentStats.totalCredits} crédits
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray/20">
            <p className="text-sm text-gray mb-1">Transactions</p>
            <p className="text-xl font-bold text-black">
              {paymentStats.completedCount} réussies
            </p>
            {paymentStats.failedCount > 0 && (
              <p className="text-sm text-red-600">
                {paymentStats.failedCount} échouées
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PaymentSection;