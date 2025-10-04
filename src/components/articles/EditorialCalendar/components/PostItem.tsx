'use client';

import { memo } from 'react';
import { Clock } from 'phosphor-react';
import { CalendarPost } from '../types';
import { POST_TYPES } from '../constants';

interface PostItemProps {
  post: CalendarPost;
  size?: 'small' | 'medium';
  onClick?: (post: CalendarPost) => void;
  showTime?: boolean;
}

const PostItem = memo(function PostItem({ 
  post, 
  size = 'small', 
  onClick,
  showTime = true 
}: PostItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(post);
  };

  const getStatusColor = () => {
    switch (post.status) {
      case 'scheduled':
        return 'bg-blue-100 border-blue-200 text-blue-700';
      case 'published':
        return 'bg-green-100 border-green-200 text-green-700';
      case 'draft':
        return 'bg-gray-100 border-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  };

  if (size === 'small') {
    return (
      <div
        onClick={handleClick}
        className={`text-xs p-2 rounded border-2 transition-all cursor-pointer hover:shadow-sm ${getStatusColor()}`}
        title={`${post.title} - ${post.status === 'scheduled' ? 'Planifié' : post.status === 'published' ? 'Publié' : 'Brouillon'}`}
      >
        {showTime && (
          <div className="flex items-center space-x-1 mb-1">
            <Clock size={10} />
            <span className="font-medium">{post.time}</span>
          </div>
        )}
        <div className="font-medium truncate">{post.title}</div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${getStatusColor()}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm">{post.title}</h4>
        {showTime && (
          <div className="flex items-center space-x-1 text-xs">
            <Clock size={12} />
            <span>{post.time}</span>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.content}</p>
      
      {post.engagement && (
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>👁 {post.engagement.views}</span>
          <span>❤️ {post.engagement.likes}</span>
        </div>
      )}
    </div>
  );
});

export default PostItem;