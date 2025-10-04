export interface PostContent {
  id: string;
  content: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  mediaIds: string[];
  tags: string[];
  engagement: PostEngagement;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface PostEngagement {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clickThroughRate: number;
  impressions: number;
}

export interface PostGeneration {
  method: 'ai' | 'manual' | 'template';
  prompt?: string;
  sourceImageId?: string;
  sourcePostId?: string;
  parameters: GenerationParameters;
}

export interface GenerationParameters {
  tone: 'professional' | 'casual' | 'educational' | 'promotional';
  length: 'short' | 'medium' | 'long';
  includeHashtags: boolean;
  includeEmojis: boolean;
  targetAudience: string;
  callToAction?: string;
}

export interface PostTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  parameters: GenerationParameters;
  previewImage?: string;
  usageCount: number;
}

export interface PostKanbanColumn {
  id: string;
  title: string;
  status: PostContent['status'];
  posts: PostContent[];
  color: string;
}