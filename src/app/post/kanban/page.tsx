'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PenNib, CalendarBlank, Image, Kanban } from 'phosphor-react';

const PostKanban = dynamic(() => import('@/components/articles/PostKanban'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false
});

const postMenuSections = [
  {
    title: 'Création de contenu',
    items: [
      {
        name: 'Génération de post',
        href: '/post',
        icon: <PenNib size={20} />
      },
      {
        name: 'Gestion des posts',
        href: '/post/kanban',
        icon: <Kanban size={20} />
      },
      {
        name: 'Calendrier éditorial',
        href: '/post/calendar',
        icon: <CalendarBlank size={20} />
      },
      {
        name: 'Médias',
        href: '/post/medias',
        icon: <Image size={20} />
      }
    ]
  }
];

export default function PostPage() {
  return (
    <DashboardLayout 
      leftMenuSections={postMenuSections}
    >
      <PostKanban />
    </DashboardLayout>
  );
}