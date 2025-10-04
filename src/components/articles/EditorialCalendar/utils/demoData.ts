import { CalendarPost } from '../types';

export const demoCalendarPosts: CalendarPost[] = [
  {
    id: 'demo-1',
    title: 'Stratégie LinkedIn pour octobre',
    content: '🚀 Ma stratégie LinkedIn pour ce mois d\'octobre :\n\n✅ 3 posts par semaine\n✅ Engagement quotidien\n✅ Stories et sondages\n✅ Networking ciblé\n\nObjectif : +500 connexions ! 💪\n\n#LinkedIn #Strategy #Growth',
    date: '2025-10-08',
    time: '09:00',
    status: 'scheduled',
    type: 'strategy',
    createdAt: '2025-10-04T10:00:00.000Z',
    scheduledFor: '2025-10-08T09:00:00.000Z'
  },
  {
    id: 'demo-2',
    title: 'Tips automation LinkedIn',
    content: '💡 Mes 5 tips pour une automation LinkedIn réussie :\n\n1️⃣ Personnaliser chaque message\n2️⃣ Respecter les limites quotidiennes\n3️⃣ Analyser les performances\n4️⃣ Tester différents créneaux\n5️⃣ Maintenir l\'authenticité\n\nQuel est votre tip favori ? 👇\n\n#LinkedInTips #Automation #BestPractices',
    date: '2025-10-12',
    time: '14:30',
    status: 'scheduled',
    type: 'educational',
    createdAt: '2025-10-04T10:15:00.000Z',
    scheduledFor: '2025-10-12T14:30:00.000Z'
  },
  {
    id: 'demo-3',
    title: 'Résultats client exceptionnel',
    content: '🎉 Résultats exceptionnels de notre client Thomas :\n\n📈 +400% de vues sur ses posts\n👥 +250 nouvelles connexions\n💼 15 opportunités business\n🚀 +180% d\'engagement\n\n"Automya a révolutionné ma présence LinkedIn !" - Thomas\n\n#Success #Testimonial #Results',
    date: '2025-10-18',
    time: '11:15',
    status: 'scheduled',
    type: 'testimonial',
    createdAt: '2025-10-04T10:30:00.000Z',
    scheduledFor: '2025-10-18T11:15:00.000Z'
  },
  {
    id: 'demo-4',
    title: 'Mon histoire entrepreneuriale',
    content: '📖 Il y a 3 ans, je rêvais de créer ma startup...\n\nAujourd\'hui, Automya aide +1000 entrepreneurs à développer leur présence LinkedIn ! 🚀\n\nCe qui m\'a appris le plus :\n→ L\'échec fait partie du succès\n→ Le réseau est crucial\n→ La persévérance paye\n→ Aider les autres nous fait grandir\n\nQuelle leçon vous a le plus marqué ? 💭\n\n#Entrepreneurship #Journey #Startup',
    date: '2025-10-25',
    time: '16:00',
    status: 'scheduled',
    type: 'personal',
    createdAt: '2025-10-04T10:45:00.000Z',
    scheduledFor: '2025-10-25T16:00:00.000Z'
  },
  {
    id: 'demo-5',
    title: 'Webinar gratuit automation',
    content: '🎯 WEBINAR GRATUIT le 30 octobre !\n\n"Comment automatiser LinkedIn en 2025 ?"\n\n📅 30 octobre 2025\n🕒 14h00 - 15h30\n💻 100% en ligne\n🎁 Bonus : Templates exclusifs\n\nAu programme :\n✅ Les nouvelles règles LinkedIn\n✅ Outils recommandés 2025\n✅ Stratégies qui fonctionnent\n✅ Session Q&A\n\nInscription gratuite (lien en bio)\n\n#Webinar #LinkedIn #Automation #Formation',
    date: '2025-10-30',
    time: '10:00',
    status: 'scheduled',
    type: 'educational',
    createdAt: '2025-10-04T11:00:00.000Z',
    scheduledFor: '2025-10-30T10:00:00.000Z'
  },
  {
    id: 'demo-published-1',
    title: 'Bilan Q3 2025 - Incroyable !',
    content: '📊 BILAN Q3 2025 - Résultats incroyables ! 🎉\n\n🚀 Automya en chiffres :\n📈 +250% de croissance\n👥 1,247 clients actifs\n💡 97% de satisfaction\n🌍 Expansion en Europe\n\nMerci à toute notre communauté ! 🙏\n\nQ4 va être encore plus fort ! 💪\n\n#Bilan #Growth #Merci #Q3 #Automya',
    date: '2025-10-01',
    time: '09:00',
    status: 'published',
    type: 'personal',
    createdAt: '2025-09-30T15:00:00.000Z',
    publishedAt: '2025-10-01T09:00:00.000Z',
    engagement: {
      views: 4500,
      likes: 312,
      comments: 89,
      shares: 45
    }
  }
];

export function initializeDemoData() {
  try {
    // Ajouter les posts de démo au localStorage du calendrier
    const existing = JSON.parse(localStorage.getItem('calendarPosts') || '[]');
    
    // Éviter les doublons
    const newPosts = demoCalendarPosts.filter(demoPost => 
      !existing.find((existingPost: CalendarPost) => existingPost.id === demoPost.id)
    );
    
    if (newPosts.length > 0) {
      const updated = [...existing, ...newPosts];
      localStorage.setItem('calendarPosts', JSON.stringify(updated));
      console.log(`✅ ${newPosts.length} posts de démo ajoutés au calendrier`);
    }
    
    return true;
  } catch (error) {
    console.warn('Erreur lors de l\'initialisation des données de démo:', error);
    return false;
  }
}