export interface CalendarPost {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'draft' | 'scheduled' | 'published';
  type: 'educational' | 'strategy' | 'testimonial' | 'personal';
  scheduledFor?: string; // ISO string for compatibility with Kanban
  publishedAt?: string; // ISO string for published posts
  createdAt: string; // ISO string
  engagement?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface PostTypeConfig {
  name: string;
  color: string;
}

export interface StatusTypeConfig {
  name: string;
  color: string;
}

export interface CalendarViewMode {
  type: 'month' | 'week';
}

export interface CalendarDay {
  date: Date | null;
  posts: CalendarPost[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface CreatePostFormData {
  title: string;
  content: string;
  date: string;
  time: string;
  type: CalendarPost['type'];
}