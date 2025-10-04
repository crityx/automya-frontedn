'use client';

import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

const CommentsAutomation = dynamic(() => import('@/components/comments/CommentsAutomation'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
});
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