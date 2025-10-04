'use client';

import { memo } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { MONTH_NAMES } from '../constants';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
}

const CalendarHeader = memo(function CalendarHeader({
  currentDate,
  onNavigateMonth,
  onTodayClick
}: CalendarHeaderProps) {
  return (
    <div className="p-6 border-b border-gray/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateMonth('prev')}
              className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
              aria-label="Mois précédent"
            >
              <CaretLeft size={16} className="text-gray" />
            </button>
            
            <button
              onClick={onTodayClick}
              className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Aujourd&apos;hui
            </button>
            
            <button
              onClick={() => onNavigateMonth('next')}
              className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
              aria-label="Mois suivant"
            >
              <CaretRight size={16} className="text-gray" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CalendarHeader;