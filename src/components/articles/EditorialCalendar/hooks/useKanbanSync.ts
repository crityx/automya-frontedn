'use client';

import { useEffect, useCallback } from 'react';
import { CalendarPost } from '../types';

export function useKanbanSync() {
  // Synchroniser un post du calendrier vers le Kanban
  const syncToKanban = useCallback((post: CalendarPost) => {
    try {
      // Convertir le post du calendrier au format Kanban
      const kanbanPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        type: post.type,
        status: post.status,
        createdAt: post.createdAt,
        scheduledFor: post.scheduledFor,
        publishedAt: post.publishedAt,
        engagement: post.engagement
      };

      // Mettre à jour ou ajouter dans le localStorage du Kanban
      const kanbanKey = 'kanbanPosts';
      const existing = JSON.parse(localStorage.getItem(kanbanKey) || '[]');
      
      const existingIndex = existing.findIndex((p: any) => p.id === post.id);
      
      if (existingIndex >= 0) {
        // Mettre à jour le post existant
        existing[existingIndex] = kanbanPost;
      } else {
        // Ajouter le nouveau post
        existing.push(kanbanPost);
      }
      
      localStorage.setItem(kanbanKey, JSON.stringify(existing));
      
      return true;
    } catch (error) {
      console.warn('Erreur lors de la synchronisation vers le Kanban:', error);
      return false;
    }
  }, []);

  // Synchroniser un post du Kanban vers le calendrier
  const syncFromKanban = useCallback((kanbanPost: any) => {
    try {
      // Vérifier si c'est un post planifié ou publié
      if (kanbanPost.status !== 'scheduled' && kanbanPost.status !== 'published') {
        return null;
      }

      // Convertir du format Kanban au format calendrier
      const calendarPost: CalendarPost = {
        id: kanbanPost.id,
        title: kanbanPost.title,
        content: kanbanPost.content,
        date: kanbanPost.scheduledFor 
          ? new Date(kanbanPost.scheduledFor).toISOString().split('T')[0]
          : kanbanPost.publishedAt
          ? new Date(kanbanPost.publishedAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        time: kanbanPost.scheduledFor
          ? new Date(kanbanPost.scheduledFor).toTimeString().slice(0, 5)
          : kanbanPost.publishedAt
          ? new Date(kanbanPost.publishedAt).toTimeString().slice(0, 5)
          : '09:00',
        status: kanbanPost.status,
        type: kanbanPost.type,
        scheduledFor: kanbanPost.scheduledFor,
        publishedAt: kanbanPost.publishedAt,
        createdAt: kanbanPost.createdAt,
        engagement: kanbanPost.engagement
      };

      return calendarPost;
    } catch (error) {
      console.warn('Erreur lors de la conversion depuis le Kanban:', error);
      return null;
    }
  }, []);

  // Supprimer un post du Kanban
  const removeFromKanban = useCallback((postId: string) => {
    try {
      const kanbanKey = 'kanbanPosts';
      const existing = JSON.parse(localStorage.getItem(kanbanKey) || '[]');
      const updated = existing.filter((p: any) => p.id !== postId);
      localStorage.setItem(kanbanKey, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.warn('Erreur lors de la suppression du Kanban:', error);
      return false;
    }
  }, []);

  // Écouter les changements dans le localStorage du Kanban
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kanbanPosts') {
        // Le Kanban a été modifié, déclencher une re-synchronisation
        window.dispatchEvent(new CustomEvent('kanbanPostsChanged'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    syncToKanban,
    syncFromKanban,
    removeFromKanban
  };
}