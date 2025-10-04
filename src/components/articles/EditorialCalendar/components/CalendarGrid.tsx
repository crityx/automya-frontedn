'use client';

import { memo } from 'react';
import CalendarDay from './CalendarDay';
import { CalendarPost } from '../types';
import { DAY_NAMES } from '../constants';

interface CalendarGridProps {
  currentDate: Date;
  getPostsForDate: (date: Date) => CalendarPost[];
  onDateClick: (date: Date) => void;
  onPostClick: (post: CalendarPost) => void;
  isSelectionMode?: boolean;
}

const CalendarGrid = memo(function CalendarGrid({
  currentDate,
  getPostsForDate,
  onDateClick,
  onPostClick,
  isSelectionMode = false
}: CalendarGridProps) {
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div className="p-6">
      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {DAY_NAMES.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => {
          const posts = date ? getPostsForDate(date) : [];
          const isToday = date ? date.toDateString() === today.toDateString() : false;
          const isCurrentMonth = date ? date.getMonth() === currentDate.getMonth() : false;

          return (
            <CalendarDay
              key={index}
              date={date}
              posts={posts}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
              onDateClick={onDateClick}
              onPostClick={onPostClick}
              maxVisiblePosts={2}
              isSelectionMode={isSelectionMode}
            />
          );
        })}
      </div>
    </div>
  );
});

export default CalendarGrid;