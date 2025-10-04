'use client';

import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  CalendarBlank, 
  PenNib, 
  Trash,
  Clock,
  CheckCircle,
  Eye,
  DotsThreeVertical
} from 'phosphor-react';
import { Post } from './types';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onView: (post: Post) => void;
}

const PostCard = memo(function PostCard({ post, onEdit, onDelete, onView }: PostCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusIcon = () => {
    switch (post.status) {
      case 'draft':
        return <PenNib size={16} className="text-gray" />;
      case 'scheduled':
        return <Clock size={16} className="text-blue-600" />;
      case 'published':
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'published':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = () => {
    switch (post.type) {
      case 'educational':
        return 'bg-purple-100 text-purple-700';
      case 'strategy':
        return 'bg-blue-100 text-blue-700';
      case 'testimonial':
        return 'bg-green-100 text-green-700';
      case 'personal':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = () => {
    switch (post.type) {
      case 'educational':
        return 'Éducatif';
      case 'strategy':
        return 'Stratégie';
      case 'testimonial':
        return 'Témoignage';
      case 'personal':
        return 'Personnel';
      default:
        return post.type;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white border border-gray/20 rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {post.status === 'draft' ? 'Brouillon' : 
             post.status === 'scheduled' ? 'Programmé' : 'Publié'}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(post);
            }}
            className="p-1 hover:bg-gray/10 rounded transition-colors"
          >
            <Eye size={16} className="text-gray" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
            className="p-1 hover:bg-gray/10 rounded transition-colors"
          >
            <PenNib size={16} className="text-gray" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
            className="p-1 hover:bg-gray/10 rounded transition-colors text-red-500"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <h4 className="font-medium text-black mb-2 line-clamp-2">{post.title}</h4>
      
      <p className="text-sm text-gray mb-3 line-clamp-3">
        {post.content.replace(/[#@]/g, '').substring(0, 120)}...
      </p>

      <div className="flex items-center justify-between text-xs text-gray">
        <span className={`px-2 py-1 rounded-full ${getTypeColor()}`}>
          {getTypeLabel()}
        </span>
        <div className="flex items-center space-x-1">
          <CalendarBlank size={12} />
          <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {post.status === 'scheduled' && post.scheduledFor && (
        <div className="mt-2 text-xs text-blue-600 flex items-center space-x-1">
          <Clock size={12} />
          <span>Programmé pour le {new Date(post.scheduledFor).toLocaleString('fr-FR')}</span>
        </div>
      )}

      {post.engagement && (
        <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium text-black">{post.engagement.views}</div>
            <div className="text-gray">Vues</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-black">{post.engagement.likes}</div>
            <div className="text-gray">J'aime</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-black">{post.engagement.comments}</div>
            <div className="text-gray">Comm.</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-black">{post.engagement.shares}</div>
            <div className="text-gray">Partages</div>
          </div>
        </div>
      )}
    </div>
  );
});

export default PostCard;