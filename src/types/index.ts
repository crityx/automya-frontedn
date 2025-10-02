export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'seller' | 'admin';
  credits: number;
  subscription: 'free' | 'basic' | 'premium';
  linkedinConnected: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ProfileInfo {
  name: string;
  bio: string;
  writingStyle: string;
  globalObjective: string;
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  mediaIds: string[];
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  createdAt: string;
}

export interface Analytics {
  period: 'day' | 'week' | 'month' | 'year';
  data: {
    date: string;
    comments: number;
    reactions: number;
    shares: number;
    peopleAdded: number;
    leadsCaptured: number;
  }[];
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  createdAt: string;
}

export interface ConversationConfig {
  tone: string;
  objectives: string[];
  autoResponse: boolean;
  responseDelay: number;
}