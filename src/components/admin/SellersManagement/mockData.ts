import { Seller } from './types';

export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie@vendeur1.com',
    company: 'Digital Growth',
    usersCount: 45,
    monthlyRevenue: 2890,
    totalRevenue: 28900,
    commission: 15,
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-10-02 14:30',
    performance: 'excellent'
  },
  {
    id: '2',
    name: 'Marc Dubois',
    email: 'marc@leadpro.fr',
    company: 'LeadPro Solutions',
    usersCount: 67,
    monthlyRevenue: 4200,
    totalRevenue: 42000,
    commission: 18,
    status: 'active',
    joinDate: '2024-02-20',
    lastLogin: '2024-10-02 09:15',
    performance: 'excellent'
  },
  {
    id: '3',
    name: 'Julie Moreau',
    email: 'julie@autolinkedin.com',
    company: 'AutoLinkedIn',
    usersCount: 23,
    monthlyRevenue: 1450,
    totalRevenue: 8700,
    commission: 12,
    status: 'active',
    joinDate: '2024-06-10',
    lastLogin: '2024-10-01 16:45',
    performance: 'good'
  },
  {
    id: '4',
    name: 'Pierre Rousseau',
    email: 'pierre@networker.fr',
    company: 'Networker Pro',
    usersCount: 8,
    monthlyRevenue: 320,
    totalRevenue: 1920,
    commission: 10,
    status: 'pending',
    joinDate: '2024-09-25',
    lastLogin: '2024-10-01 11:20',
    performance: 'new'
  }
];