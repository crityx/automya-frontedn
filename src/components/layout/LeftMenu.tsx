'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PlayCircle, Crown } from 'phosphor-react';

interface MenuSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon?: ReactNode;
  }[];
}

interface LeftMenuProps {
  sections: MenuSection[];
  videoTitle?: string;
  videoUrl?: string;
}

export default function LeftMenu({ sections, videoTitle, videoUrl }: LeftMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-white border-r border-gray/20 min-h-screen">
      <div className="p-6 space-y-8">
        {/* Menu Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-3">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray hover:text-primary hover:bg-primary/10'
                  )}
                >
                  {item.icon && (
                    <span className="w-5 h-5 flex-shrink-0">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}

        {/* Video Tutorial Section */}
        {videoTitle && (
          <div className="bg-primary-light rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <PlayCircle size={24} className="text-primary flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-black">
                  {videoTitle}
                </h4>
              </div>
            </div>
          </div>
        )}

        {/* Upsell Section */}
        <div className="bg-white border border-gray/20 rounded-lg p-4">
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              <div className="absolute top-0 -right-12 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded text-xs font-medium shadow-sm">
                Gratuit
              </div>
            </div>
            <h4 className="text-sm font-medium text-black mb-1">Baptiste Li Mandri</h4>
            <p className="text-xs text-gray mb-3">14 jours restants</p>
            <button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-1">
              <Crown className="w-3 h-3" />
              <span>Passer Pro</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}