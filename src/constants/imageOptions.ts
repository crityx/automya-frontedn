import { ImageOption } from '@/types/post';

// Base data without JSX icons
export const mainImageCategoriesData = [
  {
    id: 'generate-from-text',
    name: 'Générer à partir du texte',
    description: 'Créer une image avec l\'IA en utilisant du texte',
    iconType: 'MagicWand' as const
  },
  {
    id: 'from-existing-images',
    name: 'Depuis images existantes',
    description: 'Utiliser ou transformer vos images disponibles',
    iconType: 'ImageIcon' as const
  }
];

export const textGenerationOptionsData = [
  {
    id: 'generate-from-post',
    name: 'Générer à partir du post',
    description: 'IA crée une image basée sur le contenu de votre post',
    iconType: 'MagicWand' as const
  },
  {
    id: 'generate-from-description',
    name: 'Générer à partir d\'une description',
    description: 'Décrivez l\'image que vous voulez créer',
    iconType: 'Palette' as const
  }
];

export const existingImageOptionsData = [
  {
    id: 'upload-file',
    name: 'Importer depuis mes fichiers',
    description: 'Choisir une image de votre ordinateur',
    iconType: 'Upload' as const
  },
  {
    id: 'from-gallery',
    name: 'Choisir depuis la galerie',
    description: 'Sélectionner parmi vos images existantes',
    iconType: 'ImageIcon' as const
  },
  {
    id: 'generate-from-image',
    name: 'Générer à partir d\'une image',
    description: 'Transformer ou améliorer une image existante',
    iconType: 'ArrowClockwise' as const
  }
];