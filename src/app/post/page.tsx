'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import PostGeneration from '@/components/posts/PostGeneration';
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

export default function PostPage() {
  return (
    <DashboardLayout 
      leftMenuSections={postMenuSections}
      videoTitle="Générer du contenu avec l'IA"
      videoUrl="https://example.com/post-generation-tutorial"
    >
      <PostGeneration />
    </DashboardLayout>
  );
}