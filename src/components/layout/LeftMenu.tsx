'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

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
            <div className="flex items-start space-x-3">
              <PlayCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-black mb-1">
                  {videoTitle}
                </h4>
                <p className="text-xs text-gray mb-3">
                  Découvrez comment utiliser cette fonctionnalité
                </p>
                <button
                  onClick={() => videoUrl && window.open(videoUrl, '_blank')}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Regarder le tutoriel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}