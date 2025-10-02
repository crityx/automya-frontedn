'use client';

import { useState } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import AutomyaAnimation from '@/components/auth/AutomyaAnimation';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegister = async (email: string, password: string) => {
    console.log('Register:', { email, password });
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setIsAuthenticated(true);
  };

  if (showAnimation) {
    return <AutomyaAnimation onComplete={handleAnimationComplete} />;
  }

  if (isAuthenticated) {
    // Redirect to dashboard
    window.location.href = '/dashboard';
    return null;
  }

  return <LandingPage onRegister={handleRegister} />;
}
