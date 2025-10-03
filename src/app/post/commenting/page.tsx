'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import PostCommenting from '@/components/articles/PostCommenting';
import { PenNib, CalendarBlank, Image, Kanban, ChatCircle } from 'phosphor-react';

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
      },
      {
        name: 'Commenter des postes',
        href: '/post/commenting',
        icon: <ChatCircle size={20} />
      }
    ]
  }
];

export default function PostCommentingPage() {
  return (
    <DashboardLayout 
      leftMenuSections={postMenuSections}
    >
      <PostCommenting />
    </DashboardLayout>
  );
}