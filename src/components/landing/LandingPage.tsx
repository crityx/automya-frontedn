'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import RegistrationModal from '@/components/auth/RegistrationModal';
import LoginModal from '@/components/auth/LoginModal';
import { Lightning, TrendUp, ChatCircle, CalendarBlank, Target, Users } from 'phosphor-react';

interface LandingPageProps {
  onRegister: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function LandingPage({ onRegister, onLogin }: LandingPageProps) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const features = [
    {
      icon: <Lightning size={32} className="text-primary" />,
      title: "Automatisation complète",
      description: "Automatisez vos publications, réponses et interactions LinkedIn"
    },
    {
      icon: <TrendUp size={32} className="text-primary" />,
      title: "Analytics avancés",
      description: "Suivez vos performances et optimisez votre stratégie"
    },
    {
      icon: <ChatCircle size={32} className="text-primary" />,
      title: "IA conversationnelle",
      description: "Conversations intelligentes pour capturer plus de leads"
    },
    {
      icon: <CalendarBlank size={32} className="text-primary" />,
      title: "Planification de contenu",
      description: "Calendrier éditorial intelligent avec génération IA"
    },
    {
      icon: <Target size={32} className="text-primary" />,
      title: "Génération de leads",
      description: "Captez et convertissez automatiquement vos prospects"
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: "Gestion d'équipe",
      description: "Collaborez efficacement avec votre équipe commerciale"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-black">Automya</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setIsLoginModalOpen(true)}
              variant="outline" 
              size="lg" 
              className="text-primary border-primary hover:bg-primary-light hover:text-primary focus:outline-none focus:ring-0"
            >
              Connexion
            </Button>
            <Button onClick={() => setIsRegisterModalOpen(true)} size="lg">
              S'inscrire
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Automatisez votre
          <span className="text-primary"> LinkedIn</span>
          <br />
          comme un pro
        </h1>
        <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
          Générez des leads qualifiés, automatisez vos publications et engagez votre audience 
          avec l'IA la plus avancée du marché.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setIsRegisterModalOpen(true)}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Commencer gratuitement
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Voir la démo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray max-w-2xl mx-auto">
            Une suite complète d'outils pour transformer votre présence LinkedIn 
            en machine à générer des opportunités.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-white border border-gray/20 hover:border-primary/30 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-light py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">300%</h3>
              <p className="text-black font-medium">Augmentation des leads</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">85%</h3>
              <p className="text-black font-medium">Temps économisé</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
              <p className="text-black font-medium">Utilisateurs actifs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-black mb-6">
          Prêt à transformer votre LinkedIn ?
        </h2>
        <p className="text-xl text-gray mb-8 max-w-xl mx-auto">
          Rejoignez des milliers de professionnels qui génèrent plus de leads 
          avec moins d'effort.
        </p>
        <Button 
          onClick={() => setIsRegisterModalOpen(true)}
          size="lg"
          className="px-12 py-4 text-lg"
        >
          Commencer maintenant
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-black">Automya</span>
            </div>
            <div className="flex space-x-8 text-gray">
              <a href="#" className="hover:text-primary transition-colors">Conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray/20 text-center text-gray">
            <p>&copy; 2024 Automya. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={onRegister}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={onLogin}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
    </div>
  );
}