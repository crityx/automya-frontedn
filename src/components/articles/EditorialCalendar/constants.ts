import { PostTypeConfig, StatusTypeConfig } from './types';

export const POST_TYPES: Record<string, PostTypeConfig> = {
  educational: { name: 'Éducatif', color: 'bg-blue-100 text-blue-800' },
  strategy: { name: 'Stratégie', color: 'bg-green-100 text-green-800' },
  testimonial: { name: 'Témoignage', color: 'bg-purple-100 text-purple-800' },
  personal: { name: 'Personnel', color: 'bg-orange-100 text-orange-800' }
};

export const STATUS_TYPES: Record<string, StatusTypeConfig> = {
  draft: { name: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
  scheduled: { name: 'Planifié', color: 'bg-blue-100 text-blue-700' },
  published: { name: 'Publié', color: 'bg-green-100 text-green-800' }
};

export const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export const STORAGE_KEY = 'calendarPosts';