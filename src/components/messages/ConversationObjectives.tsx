'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  Target, 
  CalendarBlank, 
  Users, 
  ChatCircle,
  Plus,
  Trash,
  PenNib,
  CheckCircle,
  Clock,
  TrendUp
} from 'phosphor-react';

const objectiveTypes = [
  {
    id: 'rdv',
    name: 'Prise de rendez-vous',
    description: 'Organiser des meetings et appels',
    icon: <CalendarBlank size={20} />,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    id: 'lead',
    name: 'Génération de leads',
    description: 'Capturer des prospects qualifiés',
    icon: <Users size={20} />,
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    id: 'info',
    name: 'Collecte d\'informations',
    description: 'Recueillir des données prospects',
    icon: <ChatCircle size={20} />,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    id: 'nurturing',
    name: 'Lead nurturing',
    description: 'Maintenir la relation prospect',
    icon: <TrendUp size={20} />,
    color: 'bg-orange-50 text-orange-600 border-orange-200'
  }
];

const defaultScenarios = [
  {
    id: '1',
    name: 'Première connexion',
    objective: 'rdv',
    description: 'Message de bienvenue pour nouvelle connexion',
    trigger: 'new_connection',
    steps: [
      'Remercier pour la connexion',
      'Présenter brièvement votre activité',
      'Proposer un échange téléphonique'
    ],
    active: true
  },
  {
    id: '2',
    name: 'Suivi lead chaud',
    objective: 'rdv',
    description: 'Relance pour prospect intéressé',
    trigger: 'engagement_high',
    steps: [
      'Référencer l\'interaction précédente',
      'Proposer une solution adaptée',
      'Planifier un rendez-vous'
    ],
    active: true
  },
  {
    id: '3',
    name: 'Collecte besoins',
    objective: 'info',
    description: 'Questionnaire pour qualifier le prospect',
    trigger: 'profile_view',
    steps: [
      'Poser des questions ouvertes',
      'Identifier les pain points',
      'Qualifier le budget'
    ],
    active: false
  }
];

export default function ConversationObjectives() {
  const [scenarios, setScenarios] = useState(defaultScenarios);
  const [selectedObjective, setSelectedObjective] = useState('rdv');
  const [isCreating, setIsCreating] = useState(false);
  const [editingScenario, setEditingScenario] = useState(null);

  const [newScenario, setNewScenario] = useState({
    name: '',
    description: '',
    objective: 'rdv',
    trigger: 'manual',
    steps: ['']
  });

  const stats = {
    totalScenarios: scenarios.length,
    activeScenarios: scenarios.filter(s => s.active).length,
    avgConversionRate: 24.5,
    totalConversations: 156
  };

  const handleCreateScenario = () => {
    if (newScenario.name && newScenario.description) {
      const scenario = {
        id: Date.now().toString(),
        ...newScenario,
        active: true
      };
      setScenarios([...scenarios, scenario]);
      setNewScenario({
        name: '',
        description: '',
        objective: 'rdv',
        trigger: 'manual',
        steps: ['']
      });
      setIsCreating(false);
    }
  };

  const toggleScenario = (id: string) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const addStep = () => {
    setNewScenario({
      ...newScenario,
      steps: [...newScenario.steps, '']
    });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...newScenario.steps];
    newSteps[index] = value;
    setNewScenario({ ...newScenario, steps: newSteps });
  };

  const removeStep = (index: number) => {
    setNewScenario({
      ...newScenario,
      steps: newScenario.steps.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Objectifs de conversation</h1>
        <p className="text-gray">Définissez vos stratégies conversationnelles pour maximiser les conversions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Target size={24} color="#2563eb" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalScenarios}</p>
            <p className="text-sm text-gray">Scénarios créés</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle size={24} color="#16a34a" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.activeScenarios}</p>
            <p className="text-sm text-gray">Scénarios actifs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary-light">
              <TrendUp size={24} className="text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.avgConversionRate}%</p>
            <p className="text-sm text-gray">Taux de conversion</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <ChatCircle size={24} color="#ea580c" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-black mb-1">{stats.totalConversations}</p>
            <p className="text-sm text-gray">Conversations ce mois</p>
          </div>
        </div>
      </div>

      {/* Objective Types */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
        <h2 className="text-xl font-semibold text-black mb-6">Types d'objectifs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {objectiveTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedObjective(type.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedObjective === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray/20 hover:border-gray/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${type.color}`}>
                {type.icon}
              </div>
              <h3 className="font-medium text-black mb-2">{type.name}</h3>
              <p className="text-sm text-gray">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div className="bg-white rounded-2xl border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Scénarios de conversation</h2>
            <Button onClick={() => setIsCreating(true)} size="sm">
              <Plus size={16} className="mr-2" />
              Nouveau scénario
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Create New Scenario */}
          {isCreating && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-black mb-4">Créer un nouveau scénario</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nom du scénario"
                    value={newScenario.name}
                    onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
                    placeholder="Ex: Première connexion"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Objectif</label>
                    <select
                      value={newScenario.objective}
                      onChange={(e) => setNewScenario({ ...newScenario, objective: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {objectiveTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  label="Description"
                  value={newScenario.description}
                  onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
                  placeholder="Décrivez l'objectif de ce scénario"
                />

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Déclencheur</label>
                  <select
                    value={newScenario.trigger}
                    onChange={(e) => setNewScenario({ ...newScenario, trigger: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="manual">Manuel</option>
                    <option value="new_connection">Nouvelle connexion</option>
                    <option value="profile_view">Visite de profil</option>
                    <option value="engagement_high">Forte interaction</option>
                    <option value="time_based">Basé sur le temps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Étapes de conversation</label>
                  <div className="space-y-2">
                    {newScenario.steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm text-gray w-8">{index + 1}.</span>
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          placeholder="Décrivez cette étape..."
                          className="flex-1 px-3 py-2 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        {newScenario.steps.length > 1 && (
                          <button
                            onClick={() => removeStep(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addStep}>
                      <Plus size={16} className="mr-2" />
                      Ajouter une étape
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleCreateScenario}>
                    Créer le scénario
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Scenarios List */}
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="border border-gray/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-black">{scenario.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        objectiveTypes.find(t => t.id === scenario.objective)?.color || 'bg-gray-100 text-gray-800'
                      }`}>
                        {objectiveTypes.find(t => t.id === scenario.objective)?.name}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        scenario.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {scenario.active ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                    <p className="text-gray mb-3">{scenario.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-medium text-black mb-2">Étapes :</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {scenario.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleScenario(scenario.id)}
                      className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                        scenario.active ? 'bg-primary' : 'bg-gray/30'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                          scenario.active ? 'translate-x-6' : 'translate-x-1'
                        } mt-1`}
                      />
                    </button>
                    
                    <button
                      onClick={() => setEditingScenario(scenario.id)}
                      className="p-2 text-gray hover:bg-gray/10 rounded-lg"
                    >
                      <PenNib size={16} />
                    </button>
                    
                    <button
                      onClick={() => deleteScenario(scenario.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}