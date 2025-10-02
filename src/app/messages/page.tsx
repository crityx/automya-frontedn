'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AIConfiguration from '@/components/messages/AIConfiguration';
import { Bot, Target, BarChart3 } from 'lucide-react';

const messagesMenuSections = [
  {
    title: 'IA Conversationnelle',
    items: [
      {
        name: 'Configuration IA',
        href: '/messages',
        icon: <Bot className="w-5 h-5" />
      },
      {
        name: 'Objectif de conversation',
        href: '/messages/objectifs',
        icon: <Target className="w-5 h-5" />
      },
      {
        name: 'Dashboard des messages',
        href: '/messages/dashboard',
        icon: <BarChart3 className="w-5 h-5" />
      }
    ]
  }
];

export default function MessagesPage() {
  return (
    <DashboardLayout 
      leftMenuSections={messagesMenuSections}
      videoTitle="Configurer l'IA conversationnelle"
      videoUrl="https://example.com/ai-configuration-tutorial"
    >
      <AIConfiguration />
    </DashboardLayout>
  );
}