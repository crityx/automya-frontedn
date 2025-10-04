'use client';

import { memo } from 'react';
import PostItem from './PostItem';
import { CalendarPost } from '../types';

interface CalendarDayProps {
  date: Date | null;
  posts: CalendarPost[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onDateClick: (date: Date) => void;
  onPostClick: (post: CalendarPost) => void;
  maxVisiblePosts?: number;
  isSelectionMode?: boolean;
}

const CalendarDay = memo(function CalendarDay({
  date,
  posts,
  isToday,
  isCurrentMonth,
  onDateClick,
  onPostClick,
  maxVisiblePosts = 2,
  isSelectionMode = false
}: CalendarDayProps) {
  if (!date) {
    return (
      <div className="min-h-[100px] p-2 border border-gray/10 rounded-lg bg-gray-50/50"></div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastDate = date < today;
  const isDisabled = isSelectionMode && isPastDate;

  const handleDateClick = () => {
    if (!isDisabled) {
      onDateClick(date);
    }
  };

  const visiblePosts = posts.slice(0, maxVisiblePosts);
  const hiddenPostsCount = Math.max(0, posts.length - maxVisiblePosts);

  const getDateStyles = () => {
    if (isDisabled) {
      return 'bg-gray-50 border-gray/10 opacity-50 cursor-not-allowed';
    }
    if (isToday) {
      return 'bg-primary/5 border-primary/30 shadow-sm';
    }
    if (isSelectionMode) {
      return 'border-gray/20 hover:bg-primary/5 hover:border-primary/30';
    }
    return 'border-gray/20 hover:bg-gray/5';
  };

  return (
    <div
      onClick={handleDateClick}
      className={`min-h-[100px] p-2 border rounded-lg transition-all hover:shadow-sm ${
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${getDateStyles()} ${!isCurrentMonth ? 'opacity-50' : ''}`}
    >
      {/* Date number */}
      <div className={`text-sm font-semibold mb-2 ${
        isToday ? 'text-primary' : 'text-black'
      }`}>
        {date.getDate()}
      </div>
      
      {/* Posts for this day */}
      <div className="space-y-1">
        {visiblePosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            size="small"
            onClick={onPostClick}
            showTime={true}
          />
        ))}
        
        {/* Show count of hidden posts */}
        {hiddenPostsCount > 0 && (
          <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 rounded">
            +{hiddenPostsCount} autre{hiddenPostsCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
});

export default CalendarDay;