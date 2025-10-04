export interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  type: 'educational' | 'strategy' | 'testimonial' | 'personal';
  engagement?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface NewPost {
  title: string;
  content: string;
  type: Post['type'];
  scheduledFor: string;
  publishNow?: boolean;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: Post['status'];
  posts: Post[];
  color: string;
}