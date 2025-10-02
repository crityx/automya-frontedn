'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Bell, ChevronDown, Gem, Menu, X } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    avatar?: string;
    credits: number;
  };
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Profil', href: '/profil' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Post', href: '/post' },
    { name: 'Messages', href: '/messages' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white border-b border-gray/20 sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-black">Automya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray hover:text-primary hover:bg-primary/10'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Credits */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-primary-light rounded-lg">
              <Gem className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{user.credits}</span>
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray/10 transition-colors relative">
              <Bell className="w-5 h-5 text-gray" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray/10 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray/20 py-2">
                  <div className="px-4 py-2 border-b border-gray/20">
                    <p className="text-sm font-medium text-black">{user.name}</p>
                    <p className="text-xs text-gray">Gérer votre compte</p>
                  </div>
                  <Link
                    href="/profil"
                    className="block px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <Link
                    href="/profil/abonnement"
                    className="block px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Abonnement
                  </Link>
                  <Link
                    href="/profil/parametres"
                    className="block px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Paramètres
                  </Link>
                  <hr className="my-2 border-gray/20" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray/10 transition-colors"
                    onClick={() => {
                      setIsProfileOpen(false);
                      console.log('Logout');
                    }}
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray" />
              ) : (
                <Menu className="w-5 h-5 text-gray" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray/20 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-lg font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray hover:text-primary hover:bg-primary/10'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Credits */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary-light rounded-lg mt-4 w-fit">
              <Gem className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{user.credits} crédits</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}