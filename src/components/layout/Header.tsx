'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import CreditsModal from '@/components/ui/CreditsModal';
import NotificationsModal from '@/components/ui/NotificationsModal';
import { 
  Bell, 
  CaretDown, 
  List, 
  X, 
  User, 
  CreditCard, 
  Gift, 
  Gear, 
  Globe, 
  Users,
  Coins 
} from 'phosphor-react';

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
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Posts', href: '/post' },
    { name: 'Commentaires', href: '/comments' },
    { name: 'Invitations', href: '/invitations' },
    { name: 'Messages', href: '/messages' },
  ];

  const isActive = (href: string) => {
    if (href === '/post') {
      return pathname.startsWith('/post');
    }
    if (href === '/invitations') {
      return pathname.startsWith('/invitations');
    }
    if (href === '/messages') {
      return pathname.startsWith('/messages');
    }
    if (href === '/comments') {
      return pathname.startsWith('/comments');
    }
    return pathname === href;
  };

  return (
    <header className="bg-white border-b border-gray/20 sticky top-0 z-40">
      <div className="w-full px-6">
        <div className="flex items-center h-16 w-full">
          {/* Section 1: Logo */}
          <div className="flex items-center flex-1">
            <Link href="/post" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-black">Automya</span>
            </Link>
          </div>

          {/* Section 2: Navigation centrale */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg font-medium transition-colors relative',
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray hover:text-primary hover:bg-primary/10'
                )}
              >
                {item.name}
                {item.isBeta && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    β
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Section 3: Utilitaires */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {/* Credits */}
            <button 
              onClick={() => setIsCreditsModalOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 hover:bg-gray/10 rounded-lg transition-colors"
            >
              <Coins size={16} className="text-primary" />
              <span className="text-primary font-medium">{user.credits}</span>
            </button>

            {/* Notifications */}
            <button 
              onClick={() => setIsNotificationsModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray/10 transition-colors relative"
            >
              <Bell size={24} className="text-gray" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">2</span>
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center p-2 rounded-lg hover:bg-gray/10 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={`Photo de profil de ${user.name}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray/20 py-2">
                  <div className="px-4 py-2 border-b border-gray/20">
                    <p className="text-sm font-medium text-black">{user.name}</p>
                    <p className="text-xs text-gray">Gérer votre compte</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} />
                    Mes infos
                  </Link>
                  <Link
                    href="/profile/subscription"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <CreditCard size={16} />
                    Abonnement
                  </Link>
                  <Link
                    href="/profile/credits"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Gift size={16} />
                    Acheter des crédits
                  </Link>
                  <Link
                    href="/profile/referral"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Gift size={16} />
                    Parrainage
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Gear size={16} />
                    Paramètres
                  </Link>
                  <Link
                    href="/profile/language"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Globe size={16} />
                    Langue
                  </Link>
                  <Link
                    href="/profile/team"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray hover:bg-gray/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Users size={16} />
                    Équipe
                  </Link>
                  <hr className="my-2 border-gray/20" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray/10 transition-colors"
                    onClick={() => {
                      setIsProfileOpen(false);
                      // TODO: Implement logout logic
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
                <X size={20} className="text-gray" />
              ) : (
                <List size={20} className="text-gray" />
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
                    'block px-3 py-2 rounded-lg font-medium transition-colors relative',
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray hover:text-primary hover:bg-primary/10'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.isBeta && (
                    <span className="absolute top-1 right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                      β
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Credits */}
            <button 
              onClick={() => setIsCreditsModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray/10 rounded-lg mt-4 w-fit transition-colors"
            >
              <Coins size={16} className="text-primary" />
              <span className="text-primary font-medium">{user.credits} crédits</span>
            </button>
          </div>
        )}
      </div>

      {/* Credits Modal */}
      <CreditsModal 
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        currentCredits={user.credits}
        expiringCredits={2}
        expirationDate="3 mois"
      />

      {/* Notifications Modal */}
      <NotificationsModal 
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />
    </header>
  );
}