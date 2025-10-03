export interface ImageOption {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export interface GenerationParams {
  style: string;
  strength: number;
  prompt: string;
}

export interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

export interface SelectedImage extends GalleryImage {
  selected: boolean;
}

export type WritingMode = 'ai' | 'manual' | null;
export type ViewMode = 'desktop' | 'mobile';
export type GenerationMethod = 'generate-from-post' | 'generate-from-description' | 'generate-from-image' | null;