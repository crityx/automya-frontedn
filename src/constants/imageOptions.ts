import { ImageOption } from '@/types/post';

// Base data without JSX icons
export const mainImageCategoriesData = [
  {
    id: 'use-existing-images',
    name: 'Utiliser vos images',
    description: 'Importer ou sélectionner une de vos images existantes',
    iconType: 'ImageIcon' as const
  },
  {
    id: 'generate-with-ai',
    name: 'Générer avec IA',
    description: 'Créer ou transformer des images avec l\'intelligence artificielle',
    iconType: 'MagicWand' as const
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
    name: 'Générer à partir d\'une à 8 images',
    description: 'Transformer ou améliorer une image existante',
    iconType: 'ArrowClockwise' as const
  }
];

// Options pour "Utiliser vos images"
export const useExistingImagesOptionsData = [
  {
    id: 'upload-single-file',
    name: 'Importer une image',
    description: 'Choisir une image de votre ordinateur',
    iconType: 'Upload' as const
  },
  {
    id: 'from-gallery-single',
    name: 'Choisir depuis la galerie',
    description: 'Sélectionner une image dans vos médias',
    iconType: 'ImageIcon' as const
  }
];

// Options pour "Générer avec IA"
export const aiGenerationOptionsData = [
  {
    id: 'generate-from-text',
    name: 'Générer à partir du texte',
    description: 'Créer une image avec l\'IA en utilisant du texte',
    iconType: 'MagicWand' as const
  },
  {
    id: 'generate-from-image',
    name: 'Générer à partir d\'une à 8 images',
    description: 'Transformer ou améliorer une image existante',
    iconType: 'ArrowClockwise' as const
  }
];