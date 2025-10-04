'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Camera, LinkedinLogo, Link, LinkBreak } from 'phosphor-react';

export default function ProfileInfo() {
  const [profileData, setProfileData] = useState({
    name: 'Pierre Godard',
    bio: 'Expert en automatisation LinkedIn et génération de leads',
    writingStyle: 'Professionnel et engageant',
    globalObjective: 'Générer 50 leads qualifiés par mois',
    linkedinConnected: false
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: Implement profile save
    setIsEditing(false);
  };

  const handleLinkedInConnection = () => {
    if (profileData.linkedinConnected) {
      setProfileData(prev => ({ ...prev, linkedinConnected: false }));
    } else {
      // TODO: Implement LinkedIn connection
      setProfileData(prev => ({ ...prev, linkedinConnected: true }));
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Mes informations</h1>
        <p className="text-gray">Gérez vos informations personnelles et préférences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 bg-primary-light rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {profileData.name.charAt(0)}
              </span>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-gray text-center">
              Cliquez sur l'icône pour modifier votre photo
            </p>
          </div>

          {/* Profile Form */}
          <div className="flex-1 space-y-6">
            <Input
              label="Nom complet"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
            />

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Résumé du profil
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none disabled:bg-gray/5"
                placeholder="Décrivez-vous en quelques mots..."
              />
            </div>

            <Input
              label="Style d'écriture"
              value={profileData.writingStyle}
              onChange={(e) => setProfileData(prev => ({ ...prev, writingStyle: e.target.value }))}
              disabled={!isEditing}
              placeholder="Ex: Professionnel, décontracté, technique..."
            />

            <Input
              label="Objectif global"
              value={profileData.globalObjective}
              onChange={(e) => setProfileData(prev => ({ ...prev, globalObjective: e.target.value }))}
              disabled={!isEditing}
              placeholder="Ex: Générer 50 leads par mois..."
            />

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="px-6">
                    Sauvegarder
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="px-6"
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="px-6">
                  Modifier mes informations
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Connection */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LinkedinLogo size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">
                Connexion LinkedIn
              </h3>
              <p className="text-gray">
                {profileData.linkedinConnected 
                  ? 'Votre compte LinkedIn est connecté' 
                  : 'Connectez votre compte LinkedIn pour automatiser vos actions'
                }
              </p>
            </div>
          </div>

          <Button
            onClick={handleLinkedInConnection}
            variant={profileData.linkedinConnected ? 'outline' : 'primary'}
            className="px-6"
          >
            {profileData.linkedinConnected ? (
              <>
                <LinkBreak size={16} className="mr-2" />
                Déconnecter
              </>
            ) : (
              <>
                <Link size={16} className="mr-2" />
                Connecter LinkedIn
              </>
            )}
          </Button>
        </div>

        {profileData.linkedinConnected && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-700 font-medium">
                Connecté avec succès
              </p>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Automya peut maintenant automatiser vos actions LinkedIn
            </p>
          </div>
        )}
      </div>
    </div>
  );
}