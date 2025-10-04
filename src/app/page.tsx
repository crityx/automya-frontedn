'use client';

import { useState } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import AutomyaAnimation from '@/components/auth/AutomyaAnimation';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegister = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // TODO: Implement registration logic
    setShowAnimation(true);
  };

  const handleLogin = async (email: string, password: string) => {
    // TODO: Implement login logic
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
    // Redirect to posts page
    window.location.href = '/post';
    return null;
  }

  return <LandingPage onRegister={handleRegister} onLogin={handleLogin} />;
}
