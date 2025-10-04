'use client';

import { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'phosphor-react';
import PostCard from './PostCard';
import { Post, KanbanColumn as KanbanColumnType } from './types';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onViewPost: (post: Post) => void;
  onCreatePost: () => void;
}

const KanbanColumn = memo(function KanbanColumn({ 
  column, 
  onEditPost, 
  onDeletePost, 
  onViewPost,
  onCreatePost 
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const getColumnIcon = () => {
    switch (column.status) {
      case 'draft':
        return '📝';
      case 'scheduled':
        return '📅';
      case 'published':
        return '✅';
      default:
        return '📄';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getColumnIcon()}</span>
          <h3 className="font-semibold text-black">{column.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${column.color} font-medium`}>
            {column.posts.length}
          </span>
        </div>
        {column.status === 'draft' && (
          <button
            onClick={onCreatePost}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            title="Créer un nouveau post"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className="space-y-3 min-h-[500px]"
      >
        <SortableContext 
          items={column.posts.map(post => post.id)} 
          strategy={verticalListSortingStrategy}
        >
          {column.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              onView={onViewPost}
            />
          ))}
        </SortableContext>

        {column.posts.length === 0 && (
          <div className="text-center py-12 text-gray/60">
            <p className="mb-2">Aucun post {column.status === 'draft' ? 'en brouillon' : 
                                              column.status === 'scheduled' ? 'programmé' : 'publié'}</p>
            {column.status === 'draft' && (
              <button
                onClick={onCreatePost}
                className="text-primary hover:text-primary/80 text-sm"
              >
                Créer votre premier post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default KanbanColumn;