'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AutomyaAnimationProps {
  onComplete: () => void;
}

export default function AutomyaAnimation({ onComplete }: AutomyaAnimationProps) {
  const [currentLetter, setCurrentLetter] = useState(0);
  const letters = 'Automya'.split('');

  useEffect(() => {
    if (currentLetter < letters.length) {
      const timer = setTimeout(() => {
        setCurrentLetter(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLetter, letters.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-6xl md:text-8xl font-bold text-primary">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: index <= currentLetter ? 1 : 0,
              y: index <= currentLetter ? 0 : 50 
            }}
            transition={{ 
              duration: 0.1,
              ease: "easeOut"
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}