import { mockPosts } from '../../PostKanban/mockData';
import { initializeDemoData } from './demoData';

export function initializeCalendarData() {
  try {
    // Vérifier si les données existent déjà
    const existingKanban = localStorage.getItem('kanbanPosts');
    
    if (!existingKanban) {
      // Initialiser avec les données de mock du Kanban
      localStorage.setItem('kanbanPosts', JSON.stringify(mockPosts));
      console.log('✅ Données Kanban initialisées pour le calendrier');
    }
    
    // Initialiser les données de démo du calendrier
    initializeDemoData();
    
    return true;
  } catch (error) {
    console.warn('Erreur lors de l\'initialisation des données:', error);
    return false;
  }
}

// Auto-initialisation au chargement du module
if (typeof window !== 'undefined') {
  initializeCalendarData();
}