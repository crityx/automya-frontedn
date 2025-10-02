'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import MediaManager from '@/components/posts/MediaManager';
import { PenTool, Calendar, Image, BarChart3, Kanban } from 'lucide-react';

const postMenuSections = [
  {
    title: 'Création de contenu',
    items: [
      {
        name: 'Génération de post',
        href: '/post',
        icon: <PenTool className="w-5 h-5" />
      },
      {
        name: 'Gestion des posts',
        href: '/post/kanban',
        icon: <Kanban className="w-5 h-5" />
      },
      {
        name: 'Calendrier éditorial',
        href: '/post/calendar',
        icon: <Calendar className="w-5 h-5" />
      },
      {
        name: 'Médias',
        href: '/post/medias',
        icon: <Image className="w-5 h-5" />
      },
      {
        name: 'Dashboard des posts',
        href: '/post/dashboard',
        icon: <BarChart3 className="w-5 h-5" />
      }
    ]
  }
];

export default function MediasPage() {
  return (
    <DashboardLayout 
      leftMenuSections={postMenuSections}
      videoTitle="Gérer vos médias"
      videoUrl="https://example.com/media-tutorial"
    >
      <MediaManager />
    </DashboardLayout>
  );
}