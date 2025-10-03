'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import EditorialCalendar from '@/components/posts/EditorialCalendar';
import { PenTool, Calendar, Image, Kanban } from 'lucide-react';

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
      }
    ]
  }
];

export default function CalendrierPage() {
  return (
    <DashboardLayout 
      leftMenuSections={postMenuSections}
      videoTitle="Planifier vos publications"
      videoUrl="https://example.com/calendar-tutorial"
    >
      <EditorialCalendar />
    </DashboardLayout>
  );
}