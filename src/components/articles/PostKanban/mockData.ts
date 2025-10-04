import { Post } from './types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: '5 secrets pour automatiser LinkedIn sans risque',
    content: '🚀 LinkedIn Automation\n\nVoici mes 5 secrets pour automatiser LinkedIn en toute sécurité...\n\n• Secret #1: Respecter les limites\n• Secret #2: Personnaliser les messages\n• Secret #3: Analyser les métriques\n• Secret #4: Tester progressivement\n• Secret #5: Rester authentique\n\nEt vous, utilisez-vous l\'automation ? 👇\n\n#LinkedIn #Automation #Growth',
    status: 'draft',
    createdAt: '2025-10-02T14:30:00.000Z',
    type: 'educational'
  },
  {
    id: '2',
    title: 'Ma stratégie lead generation qui fonctionne',
    content: '💡 Lead Generation Strategy\n\nComment j\'ai généré 100 leads qualifiés ce mois...\n\nMa méthode en 4 étapes:\n1. Ciblage précis\n2. Contenu de valeur\n3. Suivi personnalisé\n4. Mesure et optimisation\n\nRésultats: +300% de conversions!\n\n#LeadGeneration #Strategy #Results',
    status: 'scheduled',
    createdAt: '2025-10-01T16:45:00.000Z',
    scheduledFor: '2025-10-15T09:00:00.000Z',
    type: 'strategy'
  },
  {
    id: '3',
    title: 'Témoignage client incroyable de Marie',
    content: '⭐ Success Story\n\n"Grâce à Automya, j\'ai triplé mon réseau LinkedIn en 3 mois !"\n\n- Marie Dubois, CEO TechCorp\n\nRésultats de Marie:\n✅ +250% de connexions\n✅ +400% d\'engagement\n✅ 50 leads qualifiés/mois\n\nVous aussi, lancez-vous! 🚀\n\n#Testimonial #Success #Growth',
    status: 'published',
    createdAt: '2025-09-30T11:20:00.000Z',
    publishedAt: '2025-10-01T14:00:00.000Z',
    type: 'testimonial',
    engagement: {
      views: 2100,
      likes: 156,
      comments: 42,
      shares: 18
    }
  },
  {
    id: '4',
    title: 'Mon parcours entrepreneurial',
    content: '📖 Personal Journey\n\nIl y a 5 ans, j\'étais développeur dans une PME...\n\nAujourd\'hui, je dirige une startup qui aide 1000+ entrepreneurs.\n\nCe qui a tout changé:\n→ Sortir de ma zone de confort\n→ Apprendre en continu\n→ Construire un réseau\n→ Prendre des risques calculés\n\nQuel a été votre déclic ? 💭\n\n#Entrepreneur #Journey #Inspiration',
    status: 'draft',
    createdAt: '2025-10-02T09:15:00.000Z',
    type: 'personal'
  },
  {
    id: '5',
    title: 'Guide complet de l\'automation LinkedIn',
    content: '📚 Complete Guide\n\nTout ce que vous devez savoir sur l\'automation LinkedIn:\n\n🔸 Les bonnes pratiques\n🔸 Les outils recommandés\n🔸 Les erreurs à éviter\n🔸 Les métriques à suivre\n\nTéléchargez le guide complet (lien en bio)\n\n#Guide #LinkedIn #Automation',
    status: 'scheduled',
    createdAt: '2025-10-02T08:30:00.000Z',
    scheduledFor: '2025-10-20T15:00:00.000Z',
    type: 'educational'
  },
  {
    id: '6',
    title: 'Automatisation intelligente des invitations',
    content: '🎯 Smart Invitations\n\nComment j\'automatise mes invitations LinkedIn de façon intelligente :\n\n✅ Ciblage précis par secteur\n✅ Messages personnalisés\n✅ Follow-up automatique\n✅ Tracking des résultats\n\nRésultat : 85% de taux d\'acceptation !\n\n#LinkedIn #Networking #Automation',
    status: 'scheduled',
    createdAt: '2025-10-03T10:00:00.000Z',
    scheduledFor: '2025-10-08T10:30:00.000Z',
    type: 'strategy'
  },
  {
    id: '7',
    title: 'Analyse de performance octobre',
    content: '📊 Monthly Report\n\nBilan de mes performances LinkedIn en octobre :\n\n📈 +45% d\'engagement\n👥 +230 nouvelles connexions\n💬 +180% de commentaires\n🔄 +65% de partages\n\nLa clé ? Régularité et valeur ajoutée !\n\n#Analytics #Performance #LinkedIn',
    status: 'published',
    createdAt: '2025-10-03T16:20:00.000Z',
    publishedAt: '2025-10-25T11:00:00.000Z',
    type: 'personal',
    engagement: {
      views: 3200,
      likes: 245,
      comments: 67,
      shares: 28
    }
  }
];