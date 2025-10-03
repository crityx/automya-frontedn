'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Plus, Mail, User, Crown, Shield, Trash2, MoreVertical, Users } from 'lucide-react';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  lastActive: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'owner',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-10-03 14:30'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '2024-10-03 09:15'
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@example.com',
    role: 'member',
    status: 'pending',
    joinDate: '2024-10-01',
    lastActive: 'N/A'
  }
];

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');
  const [loading, setLoading] = useState(false);

  const handleInviteMember = async () => {
    setLoading(true);
    
    // Simulation d'invitation
    setTimeout(() => {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        firstName: 'Nouveau',
        lastName: 'Membre',
        email: inviteEmail,
        role: inviteRole,
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'N/A'
      };
      
      setTeamMembers([...teamMembers, newMember]);
      setInviteEmail('');
      setInviteRole('member');
      setIsInviteModalOpen(false);
      setLoading(false);
    }, 1000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-blue-500" />;
      default:
        return <User className="w-4 h-4 text-gray" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner':
        return 'Propriétaire';
      case 'admin':
        return 'Administrateur';
      default:
        return 'Membre';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Actif</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">En attente</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactif</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Gestion d'équipe</h1>
          <p className="text-gray mt-1">Invitez et gérez les membres de votre équipe</p>
        </div>
        <Button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Inviter un membre
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Total membres</p>
              <p className="text-2xl font-bold text-black">{teamMembers.length}</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Membres actifs</p>
              <p className="text-2xl font-bold text-black">{teamMembers.filter(m => m.status === 'active').length}</p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Invitations en attente</p>
              <p className="text-2xl font-bold text-black">{teamMembers.filter(m => m.status === 'pending').length}</p>
            </div>
            <Mail className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-lg border border-gray/20">
        <div className="p-6 border-b border-gray/20">
          <h2 className="text-lg font-semibold text-black">Membres de l'équipe</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray/5">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Membre</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Rôle</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Statut</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Rejoint le</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Dernière activité</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray/20">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-black">{member.firstName} {member.lastName}</p>
                        <p className="text-sm text-gray">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(member.role)}
                      <span className="text-sm text-black">{getRoleLabel(member.role)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray">
                    {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    {member.role !== 'owner' && (
                      <button className="p-2 rounded-lg hover:bg-gray/10 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        title="Inviter un membre"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Adresse email"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="exemple@email.com"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Rôle
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member')}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray/30 bg-gray/5 text-black focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="member">Membre</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsInviteModalOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleInviteMember}
              loading={loading}
              disabled={!inviteEmail}
              className="flex-1"
            >
              Envoyer l'invitation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}