'use client';

import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { CalendarBlank, CaretDown, FloppyDisk, PaperPlaneTilt } from 'phosphor-react';

interface PublishButtonWithDropdownProps {
  onSchedule: () => void;
  onSaveDraft: () => void;
  onPublishNow: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PublishButtonWithDropdown({
  onSchedule,
  onSaveDraft,
  onPublishNow,
  disabled = false,
  className = ''
}: PublishButtonWithDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMainButtonClick = () => {
    onSchedule();
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex">
        {/* Main button */}
        <Button
          onClick={handleMainButtonClick}
          disabled={disabled}
          className="flex-1 rounded-r-none border-r-0"
        >
          <CalendarBlank size={16} className="mr-2" />
          Planifier la publication
        </Button>
        
        {/* Dropdown trigger */}
        <button
          onClick={handleDropdownToggle}
          disabled={disabled}
          className={`
            px-3 py-2 bg-primary text-white border border-primary rounded-r-lg
            hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20
            transition-colors duration-200 flex items-center justify-center
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${isDropdownOpen ? 'bg-primary/90' : ''}
          `}
        >
          <CaretDown 
            size={16} 
            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray/20 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleOptionClick(onSaveDraft)}
              className="w-full px-4 py-3 text-left hover:bg-gray/5 transition-colors flex items-center space-x-3"
            >
              <FloppyDisk size={16} className="text-gray" />
              <span className="text-black">Enregistrer comme brouillon</span>
            </button>
            <button
              onClick={() => handleOptionClick(onPublishNow)}
              className="w-full px-4 py-3 text-left hover:bg-gray/5 transition-colors flex items-center space-x-3"
            >
              <PaperPlaneTilt size={16} className="text-gray" />
              <span className="text-black">Publier maintenant</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}