'use client';

import { ReactNode } from 'react';
import Header from './Header';
import LeftMenu from './LeftMenu';

interface DashboardLayoutProps {
  children: ReactNode;
  leftMenuSections: any[];
}

const mockUser = {
  name: 'Pierre Godard',
  avatar: undefined,
  credits: 150,
  role: 'admin' as 'user' | 'seller' | 'admin'
};

export default function DashboardLayout({ 
  children, 
  leftMenuSections 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray/5">
      <Header user={mockUser} />
      <div className="flex">
        <LeftMenu 
          sections={leftMenuSections}
        />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}