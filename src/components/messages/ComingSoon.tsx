'use client';

import { ReactNode } from 'react';
import { Clock } from 'phosphor-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

export default function ComingSoon({ title, description, icon, features }: ComingSoonProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray">{description}</p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Bientôt disponible</h2>
          <p className="text-gray">Cette fonctionnalité sera disponible prochainement</p>
        </div>

        {/* Preview Features */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <Clock size={16} className="inline mr-2" />
            Fonctionnalités à venir
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-800">En développement</h4>
                <p className="text-sm text-blue-700">
                  Notre équipe travaille activement sur ces fonctionnalités. 
                  Elles seront disponibles dans une prochaine mise à jour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}