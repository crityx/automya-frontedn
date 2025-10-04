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
import PostDetailModal from './PostDetailModal';
import { Post, NewPost, KanbanColumn as KanbanColumnType } from './types';
import { mockPosts } from './mockData';

function PostKanban() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);

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
      title: 'Brouillons',
      status: 'draft',
      posts: posts.filter(post => post.status === 'draft'),
      color: 'bg-gray-100 text-gray-700'
    },
    {
      id: 'scheduled',
      title: 'Programmés',
      status: 'scheduled',
      posts: posts.filter(post => post.status === 'scheduled'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'published',
      title: 'Publiés',
      status: 'published',
      posts: posts.filter(post => post.status === 'published'),
      color: 'bg-green-100 text-green-700'
    }
  ], [posts]);

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
    }
  }, [posts]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActivePost(null);
  }, []);

  const handleCreatePost = useCallback((newPostData: NewPost) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostData.title,
      content: newPostData.content,
      type: newPostData.type,
      status: newPostData.scheduledFor ? 'scheduled' : 'draft',
      createdAt: new Date().toISOString(),
      ...(newPostData.scheduledFor ? { scheduledFor: newPostData.scheduledFor } : {})
    };

    setPosts(prev => [newPost, ...prev]);
  }, []);

  const handleEditPost = useCallback((post: Post) => {
    // TODO: Implement edit functionality
    console.log('Edit post:', post);
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
          <h1 className="text-3xl font-bold text-black mb-2">Kanban des Posts</h1>
          <p className="text-gray">Gérez vos contenus LinkedIn par glisser-déposer</p>
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
    </>
  );
}

export default memo(PostKanban);