'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';
import SchedulePostModal from './SchedulePostModal';
import PostDetailModal from './PostDetailModal';
import { Post, NewPost, KanbanColumn as KanbanColumnType } from './types';
import { mockPosts } from './mockData';
import { useLanguage } from '@/contexts/LanguageContext';

function PostKanban() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [postToScheduleId, setPostToScheduleId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: KanbanColumnType[] = useMemo(() => [
    {
      id: 'draft',
      title: t('posts.drafts'),
      status: 'draft',
      posts: posts.filter(post => post.status === 'draft'),
      color: 'bg-gray-100 text-gray-700'
    },
    {
      id: 'scheduled',
      title: t('posts.scheduled'),
      status: 'scheduled',
      posts: posts.filter(post => post.status === 'scheduled'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'published',
      title: t('posts.published'),
      status: 'published',
      posts: posts.filter(post => post.status === 'published'),
      color: 'bg-green-100 text-green-700'
    }
  ], [posts, t]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activePost = posts.find(post => post.id === event.active.id);
    setActivePost(activePost || null);
  }, [posts]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activePostId = active.id as string;
    const overColumnId = over.id as string;

    // Trouve le post actif
    const activePost = posts.find(post => post.id === activePostId);
    if (!activePost) return;

    // Détermine le nouveau statut basé sur la colonne
    let newStatus: Post['status'];
    switch (overColumnId) {
      case 'draft':
        newStatus = 'draft';
        break;
      case 'scheduled':
        newStatus = 'scheduled';
        break;
      case 'published':
        newStatus = 'published';
        break;
      default:
        return;
    }

    // Si le statut change, met à jour le post
    if (activePost.status !== newStatus) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === activePostId 
            ? { 
                ...post, 
                status: newStatus,
                ...(newStatus === 'published' && !post.publishedAt ? 
                  { publishedAt: new Date().toISOString() } : {}
                )
              }
            : post
        )
      );

      // Demander la date/heure lorsqu'on passe en Programmé
      if (newStatus === 'scheduled') {
        setPostToScheduleId(activePostId);
        setIsScheduleModalOpen(true);
      }
    }
  }, [posts]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActivePost(null);
  }, []);

  const syncToCalendar = useCallback((post: Post) => {
    if (typeof window === 'undefined') return;
    try {
      const key = 'calendarPosts';
      const existing = JSON.parse(window.localStorage.getItem(key) || '[]');
      const dateISO = post.scheduledFor ? new Date(post.scheduledFor) : null;
      if (!dateISO) return;
      const date = dateISO.toISOString().split('T')[0];
      const time = dateISO.toTimeString().slice(0,5);
      const record = {
        id: post.id,
        title: post.title,
        content: post.content,
        date,
        time,
        status: 'scheduled',
        type: post.type
      };
      const updated = Array.isArray(existing)
        ? [...existing.filter((p: any) => p.id !== post.id), record]
        : [record];
      window.localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      // TODO: Implement proper error handling for calendar sync failures
    }
  }, []);

  const handleCreatePost = useCallback((newPostData: NewPost) => {
    const publishNow = !!newPostData.publishNow;
    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostData.title,
      content: newPostData.content,
      type: newPostData.type,
      status: publishNow ? 'published' : (newPostData.scheduledFor ? 'scheduled' : 'draft'),
      createdAt: new Date().toISOString(),
      ...(newPostData.scheduledFor ? { scheduledFor: newPostData.scheduledFor } : {}),
      ...(publishNow ? { publishedAt: new Date().toISOString() } : {})
    };

    setPosts(prev => [newPost, ...prev]);
    if (newPost.status === 'scheduled' && newPost.scheduledFor) {
      syncToCalendar(newPost);
    }
  }, [syncToCalendar]);

  const handleEditPost = useCallback((post: Post) => {
    // TODO: Implement edit functionality for post editing
  }, []);

  const handleDeletePost = useCallback((postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  const handleViewPost = useCallback((post: Post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  }, []);

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedPost(null);
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{t('posts.kanban_title')}</h1>
          <p className="text-gray">{t('posts.manage_content_drag_drop')}</p>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                onViewPost={handleViewPost}
                onCreatePost={handleOpenCreateModal}
              />
            ))}
          </div>

          <DragOverlay>
            {activePost ? (
              <div className="rotate-5 opacity-90">
                <PostCard
                  post={activePost}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onView={handleViewPost}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <PostDetailModal
        post={selectedPost}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />

      <SchedulePostModal
        isOpen={isScheduleModalOpen}
        onClose={() => { setIsScheduleModalOpen(false); setPostToScheduleId(null); }}
        onConfirm={(datetime) => {
          if (!postToScheduleId) return;
          setPosts(prev => prev.map(p => p.id === postToScheduleId ? { ...p, scheduledFor: datetime, status: 'scheduled' } : p));
          const scheduledPost = posts.find(p => p.id === postToScheduleId);
          if (scheduledPost) {
            syncToCalendar({ ...scheduledPost, scheduledFor: datetime, status: 'scheduled' });
          }
          setIsScheduleModalOpen(false);
          setPostToScheduleId(null);
        }}
      />
    </>
  );
}

export default memo(PostKanban);