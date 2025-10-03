'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import CommentsAutomation from '@/components/comments/CommentsAutomation';
import { Robot } from 'phosphor-react';

const commentsMenuSections = [
  {
    title: 'Réponses aux commentaires',
    items: [
      {
        name: 'Configuration',
        href: '/comments',
        icon: <Robot size={20} />
      }
    ]
  }
];

export default function CommentsPage() {
  return (
    <DashboardLayout 
      leftMenuSections={commentsMenuSections}
    >
      <CommentsAutomation />
    </DashboardLayout>
  );
}