'use client';

import { useState, useCallback } from 'react';
import Modal from './Modal';
import Button from './Button';
import TimeSelector from './TimeSelector';
import CalendarHeader from '../articles/EditorialCalendar/components/CalendarHeader';
import CalendarGrid from '../articles/EditorialCalendar/components/CalendarGrid';
import { useCalendarData } from '../articles/EditorialCalendar/hooks/useCalendarData';
import { CalendarBlank, Check, ArrowLeft } from 'phosphor-react';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: string, time: string) => void;
  postContent: string;
}

export default function SchedulePostModal({
  isOpen,
  onClose,
  onSchedule,
  postContent
}: SchedulePostModalProps) {
  // Initialize to October 2025 to show demo posts
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [step, setStep] = useState<'calendar' | 'time'>('calendar');

  const { getPostsForDate } = useCalendarData();

  // Reset state when modal opens/closes
  const handleClose = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime('09:00');
    setStep('calendar');
    onClose();
  }, [onClose]);

  // Navigation handlers
  const handleNavigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const handleTodayClick = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Date selection handler
  const handleDateClick = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Prevent selecting past dates
    if (date < today) {
      return;
    }

    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setStep('time');
  }, []);

  // Schedule confirmation
  const handleConfirmSchedule = useCallback(() => {
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime);
      handleClose();
    }
  }, [selectedDate, selectedTime, onSchedule, handleClose]);


  const getModalTitle = () => {
    if (step === 'calendar') {
      return 'Choisir une date';
    }
    return 'Choisir l\'heure';
  };

  const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      size="xl"
    >
      <div className="space-y-6">
        {step === 'calendar' && (
          <>
            {/* Instructions */}
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <CalendarBlank size={32} className="text-primary mx-auto mb-2" />
              <p className="text-gray">
                Cliquez sur une date pour planifier votre publication
              </p>
            </div>

            {/* Calendar - Format Paysage */}
            <div className="bg-white border border-gray/20 rounded-lg overflow-hidden">
              <CalendarHeader
                currentDate={currentDate}
                onNavigateMonth={handleNavigateMonth}
                onTodayClick={handleTodayClick}
              />
              
              <div className="p-2">
                <CalendarGrid
                  currentDate={currentDate}
                  getPostsForDate={getPostsForDate}
                  onDateClick={handleDateClick}
                  onPostClick={() => {}} // Pas de clic sur les posts dans ce contexte
                  isSelectionMode={true}
                />
              </div>
            </div>
          </>
        )}

        {step === 'time' && selectedDate && (
          <>
            {/* Selected date display */}
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <CalendarBlank size={32} className="text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-black mb-1">
                {formatSelectedDate(selectedDate)}
              </h3>
              <p className="text-gray">
                Choisissez l'heure de publication
              </p>
            </div>

            {/* Time selection */}
            <TimeSelector
              value={selectedTime}
              onChange={setSelectedTime}
            />

            {/* Action buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => setStep('calendar')}
                variant="ghost"
                className="flex-1"
              >
                <ArrowLeft size={16} className="mr-2" />
                Retour
              </Button>
              <Button
                onClick={handleConfirmSchedule}
                className="flex-1"
              >
                <Check size={16} className="mr-2" />
                Planifier
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}