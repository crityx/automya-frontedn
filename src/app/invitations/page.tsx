'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LinkedInInvitations from '@/components/invitations/LinkedInInvitations';
import { UserPlus, MagnifyingGlass } from 'phosphor-react';

const invitationsMenuSections = [
  {
    title: 'Invitations',
    items: [
      {
        name: 'Invitations',
        href: '/invitations',
        icon: <UserPlus size={20} />
      },
      {
        name: 'Prospection',
        href: '/invitations/prospecting',
        icon: <MagnifyingGlass size={20} />
      }
    ]
  }
];

export default function InvitationsPage() {
  return (
    <DashboardLayout 
      leftMenuSections={invitationsMenuSections}
    >
      <LinkedInInvitations />
    </DashboardLayout>
  );
}