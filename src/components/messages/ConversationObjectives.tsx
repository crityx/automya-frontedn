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
  Lock,
  TrendUp
} from 'phosphor-react';

const objectiveTypes = [
  { id: 'lead-gen', name: 'Génération de leads', icon: <Users size={20} />, color: 'text-blue-600' },
  { id: 'qualification', name: 'Qualification', icon: <Target size={20} />, color: 'text-green-600' },
  { id: 'nurturing', name: 'Nurturing', icon: <ChatCircle size={20} />, color: 'text-purple-600' },
  { id: 'conversion', name: 'Conversion', icon: <CheckCircle size={20} />, color: 'text-orange-600' }
];

interface ConversationStep {
  id: string;
  trigger: string;
  message: string;
  waitTime: number;
}

interface ConversationScenario {
  id: string;
  name: string;
  objective: string;
  active: boolean;
  steps: ConversationStep[];
  stats: {
    conversations: number;
    responses: number;
    conversions: number;
  };
}

export default function ConversationObjectives() {
  const [scenarios, setScenarios] = useState<ConversationScenario[]>([
    {
      id: '1',
      name: 'Première connexion LinkedIn',
      objective: 'lead-gen',
      active: true,
      steps: [
        { id: '1', trigger: 'Connexion acceptée', message: 'Merci pour la connexion ! Je serais ravi d\'échanger sur votre activité.', waitTime: 24 },
        { id: '2', trigger: 'Pas de réponse après 3 jours', message: 'J\'ai vu votre profil et je pense qu\'on pourrait avoir des synergies intéressantes. Avez-vous 15 minutes cette semaine ?', waitTime: 72 }
      ],
      stats: { conversations: 45, responses: 32, conversions: 8 }
    },
    {
      id: '2',
      name: 'Suivi prospect qualifié',
      objective: 'qualification',
      active: false,
      steps: [
        { id: '1', trigger: 'Lead qualifié', message: 'Suite à notre échange, j\'aimerais vous présenter notre solution. Êtes-vous disponible pour un call de 30 minutes ?', waitTime: 48 }
      ],
      stats: { conversations: 23, responses: 18, conversions: 12 }
    }
  ]);

  const [editingScenario, setEditingScenario] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newScenario, setNewScenario] = useState<Partial<ConversationScenario>>({
    name: '',
    objective: 'lead-gen',
    active: true,
    steps: []
  });

  const stats = {
    totalScenarios: scenarios.length,
    activeScenarios: scenarios.filter(s => s.active).length,
    totalConversations: scenarios.reduce((acc, s) => acc + s.stats.conversations, 0),
    averageResponseRate: Math.round(scenarios.reduce((acc, s) => acc + (s.stats.responses / s.stats.conversations * 100), 0) / scenarios.length)
  };

  const createScenario = () => {
    if (newScenario.name && newScenario.objective) {
      const scenario: ConversationScenario = {
        id: Date.now().toString(),
        name: newScenario.name,
        objective: newScenario.objective,
        active: true,
        steps: newScenario.steps || [],
        stats: { conversations: 0, responses: 0, conversions: 0 }
      };
      setScenarios([...scenarios, scenario]);
      setNewScenario({ name: '', objective: 'lead-gen', active: true, steps: [] });
      setIsCreating(false);
    }
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const toggleScenario = (id: string) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const addStep = () => {
    setNewScenario({
      ...newScenario,
      steps: [...(newScenario.steps || []), { id: Date.now().toString(), trigger: '', message: '', waitTime: 24 }]
    });
  };

  const updateStep = (index: number, field: keyof ConversationStep, value: string | number) => {
    const updatedSteps = [...(newScenario.steps || [])];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setNewScenario({ ...newScenario, steps: updatedSteps });
  };

  const removeStep = (index: number) => {
    setNewScenario({
      ...newScenario,
      steps: newScenario.steps?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Objectifs de conversation</h1>
        <p className="text-gray">Définissez vos stratégies conversationnelles pour maximiser les conversions</p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray/20">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-gray" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray mb-4">Bientôt disponible</h2>
          <p className="text-gray mb-8 max-w-2xl mx-auto">
            La configuration avancée des objectifs de conversation sera bientôt disponible pour optimiser vos stratégies conversationnelles.
          </p>
        </div>

        {/* Preview of existing features - grayed out */}
        <div className="opacity-60 pointer-events-none">
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
                  <CheckCircle size={24} color="#059669" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.activeScenarios}</p>
                <p className="text-sm text-gray">Scénarios actifs</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-purple-50">
                  <ChatCircle size={24} color="#7c3aed" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.totalConversations}</p>
                <p className="text-sm text-gray">Conversations</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-orange-50">
                  <TrendUp size={24} color="#ea580c" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-black mb-1">{stats.averageResponseRate}%</p>
                <p className="text-sm text-gray">Taux de réponse</p>
              </div>
            </div>
          </div>

          {/* Existing Scenarios */}
          <div className="bg-white rounded-2xl p-8 border border-gray/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">Scénarios de conversation</h2>
              <Button disabled className="opacity-50">
                <Plus size={16} className="mr-2" />
                Nouveau scénario
              </Button>
            </div>

            <div className="space-y-4">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="border border-gray/20 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-black">{scenario.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          objectiveTypes.find(t => t.id === scenario.objective)?.color || 'text-gray-600'
                        } bg-gray-100`}>
                          {objectiveTypes.find(t => t.id === scenario.objective)?.name}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray">Conversations:</span>
                          <span className="font-medium text-black ml-1">{scenario.stats.conversations}</span>
                        </div>
                        <div>
                          <span className="text-gray">Réponses:</span>
                          <span className="font-medium text-black ml-1">{scenario.stats.responses}</span>
                        </div>
                        <div>
                          <span className="text-gray">Conversions:</span>
                          <span className="font-medium text-black ml-1">{scenario.stats.conversions}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {scenario.steps.map((step, index) => (
                          <div key={step.id} className="text-sm bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-gray font-medium">Étape {index + 1}:</span>
                              <span className="text-primary text-xs">{step.trigger}</span>
                            </div>
                            <p className="text-gray">{step.message}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Clock size={12} className="text-gray" />
                              <span className="text-xs text-gray">Attendre {step.waitTime}h</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        disabled
                        className={`relative inline-flex w-11 h-6 rounded-full transition-colors opacity-50 ${
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
                        disabled
                        className="p-2 text-gray opacity-50 rounded-lg"
                      >
                        <PenNib size={16} />
                      </button>
                      
                      <button
                        disabled
                        className="p-2 text-red-600 opacity-50 rounded-lg"
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

        <div className="text-center mt-8">
          <Button disabled className="opacity-50 cursor-not-allowed">
            <Lock size={16} className="mr-2" />
            Configuration verrouillée
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">Comment ça fonctionnera ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-800">
          <div>
            <strong>1. Définition</strong><br />
            Configurez vos objectifs de conversation selon vos stratégies business
          </div>
          <div>
            <strong>2. Personnalisation</strong><br />
            L'IA adaptera ses réponses pour atteindre vos objectifs définis
          </div>
          <div>
            <strong>3. Optimisation</strong><br />
            Analysez les performances et optimisez vos stratégies conversationnelles
          </div>
        </div>
      </div>
    </div>
  );
}