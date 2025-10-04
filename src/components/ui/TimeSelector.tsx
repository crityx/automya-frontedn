'use client';

import { useState } from 'react';
import { Clock, CaretUp, CaretDown } from 'phosphor-react';

interface TimeSelectorProps {
  value: string; // Format "HH:MM"
  onChange: (time: string) => void;
  className?: string;
  label?: string;
}

export default function TimeSelector({ value, onChange, className = '', label = 'Heure de publication' }: TimeSelectorProps) {
  const [hours, minutes] = value.split(':').map(Number);

  const updateTime = (newHours: number, newMinutes: number) => {
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');
    onChange(`${formattedHours}:${formattedMinutes}`);
  };

  const handleHourChange = (increment: boolean) => {
    let newHours = increment ? hours + 1 : hours - 1;
    if (newHours >= 24) newHours = 0;
    if (newHours < 0) newHours = 23;
    updateTime(newHours, minutes);
  };

  const handleMinuteChange = (increment: boolean) => {
    let newMinutes = increment ? minutes + 5 : minutes - 5; // Increment by 5 minutes
    if (newMinutes >= 60) newMinutes = 0;
    if (newMinutes < 0) newMinutes = 55;
    updateTime(hours, newMinutes);
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = parseInt(e.target.value) || 0;
    if (newHours >= 0 && newHours <= 23) {
      updateTime(newHours, minutes);
    }
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value) || 0;
    if (newMinutes >= 0 && newMinutes <= 59) {
      updateTime(hours, newMinutes);
    }
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-black mb-3">
        <Clock size={16} className="inline mr-2" />
        {label}
      </label>
      
      <div className="flex items-center justify-center space-x-4 p-6 bg-gray-50 rounded-xl">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleHourChange(true)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <CaretUp size={20} className="text-gray" />
          </button>
          
          <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm min-w-[80px]">
            <input
              type="number"
              min="0"
              max="23"
              value={String(hours).padStart(2, '0')}
              onChange={handleHourInputChange}
              className="text-3xl font-bold text-center text-black bg-transparent border-none outline-none w-full"
            />
            <span className="text-xs text-gray mt-1">heures</span>
          </div>
          
          <button
            onClick={() => handleHourChange(false)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <CaretDown size={20} className="text-gray" />
          </button>
        </div>

        {/* Separator */}
        <div className="text-3xl font-bold text-black">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleMinuteChange(true)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <CaretUp size={20} className="text-gray" />
          </button>
          
          <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm min-w-[80px]">
            <input
              type="number"
              min="0"
              max="59"
              step="5"
              value={String(minutes).padStart(2, '0')}
              onChange={handleMinuteInputChange}
              className="text-3xl font-bold text-center text-black bg-transparent border-none outline-none w-full"
            />
            <span className="text-xs text-gray mt-1">minutes</span>
          </div>
          
          <button
            onClick={() => handleMinuteChange(false)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <CaretDown size={20} className="text-gray" />
          </button>
        </div>
      </div>

    </div>
  );
}