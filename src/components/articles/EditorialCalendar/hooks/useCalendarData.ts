'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarPost } from '../types';
import { STORAGE_KEY } from '../constants';
import { useKanbanSync } from './useKanbanSync';

export function useCalendarData() {
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { syncToKanban, syncFromKanban, removeFromKanban } = useKanbanSync();

  // Charger les posts depuis localStorage et depuis le Kanban
  useEffect(() => {
    const loadPosts = () => {
      setLoading(true);
      try {
        // Charger depuis le calendrier
        const calendarPosts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        // Charger depuis le Kanban (posts planifiés et publiés)
        // Note: Pour la démo, on utilise les mockPosts du Kanban
        const kanbanPosts = JSON.parse(localStorage.getItem('kanbanPosts') || '[]');
        
        // Convertir les posts du Kanban au format calendrier
        const convertedKanbanPosts: CalendarPost[] = kanbanPosts
          .filter((post: any) => post.status === 'scheduled' || post.status === 'published')
          .map((post: any) => syncFromKanban(post))
          .filter((post: CalendarPost | null): post is CalendarPost => post !== null);

        // Fusionner les posts (éviter les doublons)
        const allPosts = [...calendarPosts];
        convertedKanbanPosts.forEach(kanbanPost => {
          if (!allPosts.find(p => p.id === kanbanPost.id)) {
            allPosts.push(kanbanPost);
          }
        });

        console.log('📅 Calendrier - Posts chargés:', {
          calendarPosts: calendarPosts.length,
          kanbanPosts: kanbanPosts.length,
          convertedKanbanPosts: convertedKanbanPosts.length,
          totalPosts: allPosts.length,
          posts: allPosts
        });

        setPosts(allPosts);
      } catch (error) {
        console.warn('Erreur lors du chargement des posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [syncFromKanban]);

  const addPost = useCallback((newPost: Omit<CalendarPost, 'id' | 'createdAt'>) => {
    const post: CalendarPost = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [...prev, post]);

    // Sauvegarder dans localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = [...existing, post];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde:', error);
    }

    // Synchroniser vers le Kanban si c'est un post planifié ou publié
    if (post.status === 'scheduled' || post.status === 'published') {
      syncToKanban(post);
    }

    return post;
  }, [syncToKanban]);

  const updatePost = useCallback((postId: string, updates: Partial<CalendarPost>) => {
    let updatedPost: CalendarPost | null = null;
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        updatedPost = { ...post, ...updates };
        return updatedPost;
      }
      return post;
    }));

    // Mettre à jour dans localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = existing.map((post: CalendarPost) => 
        post.id === postId ? { ...post, ...updates } : post
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Erreur lors de la mise à jour:', error);
    }

    // Synchroniser vers le Kanban si c'est un post planifié ou publié
    if (updatedPost && (updatedPost.status === 'scheduled' || updatedPost.status === 'published')) {
      syncToKanban(updatedPost);
    }
  }, [syncToKanban]);

  const deletePost = useCallback((postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));

    // Supprimer de localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = existing.filter((post: CalendarPost) => post.id !== postId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Erreur lors de la suppression:', error);
    }

    // Supprimer aussi du Kanban
    removeFromKanban(postId);
  }, [removeFromKanban]);

  const getPostsForDate = useCallback((date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return posts.filter(post => post.date === dateStr);
  }, [posts]);

  const getUpcomingPosts = useCallback((limit: number = 5) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return posts
      .filter(post => new Date(post.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  }, [posts]);

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    getPostsForDate,
    getUpcomingPosts
  };
}