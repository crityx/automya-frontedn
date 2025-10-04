'use client';

import { memo } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { 
  CalendarBlank, 
  PenNib, 
  Trash,
  Clock,
  CheckCircle,
  Eye,
  Copy,
  Share
} from 'phosphor-react';
import { Post } from './types';

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostDetailModal = memo(function PostDetailModal({ 
  post, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}: PostDetailModalProps) {
  if (!post) return null;

  const getStatusInfo = () => {
    switch (post.status) {
      case 'draft':
        return {
          icon: <PenNib size={16} className="text-gray" />,
          label: 'Brouillon',
          color: 'bg-gray-100 text-gray-700'
        };
      case 'scheduled':
        return {
          icon: <Clock size={16} className="text-blue-600" />,
          label: 'Programmé',
          color: 'bg-blue-100 text-blue-700'
        };
      case 'published':
        return {
          icon: <CheckCircle size={16} className="text-green-600" />,
          label: 'Publié',
          color: 'bg-green-100 text-green-700'
        };
      default:
        return {
          icon: <PenNib size={16} className="text-gray" />,
          label: post.status,
          color: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const getTypeLabel = () => {
    switch (post.type) {
      case 'educational':
        return 'Éducatif';
      case 'strategy':
        return 'Stratégie';
      case 'testimonial':
        return 'Témoignage';
      case 'personal':
        return 'Personnel';
      default:
        return post.type;
    }
  };

  const getTypeColor = () => {
    switch (post.type) {
      case 'educational':
        return 'bg-purple-100 text-purple-700';
      case 'strategy':
        return 'bg-blue-100 text-blue-700';
      case 'testimonial':
        return 'bg-green-100 text-green-700';
      case 'personal':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const statusInfo = getStatusInfo();

  const handleCopyContent = () => {
    navigator.clipboard.writeText(post.content);
    // TODO: Show notification
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du post" size="xl">
      <div className="space-y-6">
        {/* Header avec statut */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {statusInfo.icon}
              <span className={`text-sm px-3 py-1 rounded-full ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${getTypeColor()}`}>
              {getTypeLabel()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyContent}
              className="flex items-center space-x-2"
            >
              <Copy size={16} />
              <span>Copier</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share size={16} />
              <span>Partager</span>
            </Button>
          </div>
        </div>

        {/* Titre */}
        <div>
          <h2 className="text-xl font-bold text-black mb-2">{post.title}</h2>
        </div>

        {/* Contenu */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-black mb-3">Contenu du post</h3>
          <div className="whitespace-pre-wrap text-black leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Métadonnées */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray/10">
          <div>
            <h4 className="text-sm font-medium text-black mb-2">Informations</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray">
                <CalendarBlank size={14} />
                <span>Créé le {new Date(post.createdAt).toLocaleString('fr-FR')}</span>
              </div>
              {post.scheduledFor && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <Clock size={14} />
                  <span>Programmé pour le {new Date(post.scheduledFor).toLocaleString('fr-FR')}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle size={14} />
                  <span>Publié le {new Date(post.publishedAt).toLocaleString('fr-FR')}</span>
                </div>
              )}
            </div>
          </div>

          {post.engagement && (
            <div>
              <h4 className="text-sm font-medium text-black mb-2">Engagement</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="font-bold text-lg text-black">{post.engagement.views}</div>
                  <div className="text-xs text-gray">Vues</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="font-bold text-lg text-black">{post.engagement.likes}</div>
                  <div className="text-xs text-gray">J&apos;aime</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="font-bold text-lg text-black">{post.engagement.comments}</div>
                  <div className="text-xs text-gray">Commentaires</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="font-bold text-lg text-black">{post.engagement.shares}</div>
                  <div className="text-xs text-gray">Partages</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4 border-t border-gray/10">
          <Button
            onClick={() => onEdit(post)}
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <PenNib size={16} />
            <span>Modifier</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
                onDelete(post.id);
                onClose();
              }
            }}
            className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash size={16} />
            <span>Supprimer</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default PostDetailModal;