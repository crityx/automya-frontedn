'use client';

import { memo } from 'react';
import { Eye, PenNib, Trash } from 'phosphor-react';
import { CalendarPost } from '../types';
import { POST_TYPES, STATUS_TYPES } from '../constants';

interface UpcomingPostsProps {
  posts: CalendarPost[];
  onViewPost: (post: CalendarPost) => void;
  onEditPost: (post: CalendarPost) => void;
  onDeletePost: (postId: string) => void;
}

const UpcomingPosts = memo(function UpcomingPosts({
  posts,
  onViewPost,
  onEditPost,
  onDeletePost
}: UpcomingPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Prochaines publications</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Aucune publication programmée pour les prochains jours.</p>
          <p className="text-sm mt-2">Cliquez sur une date du calendrier pour planifier un nouveau post.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
      <h2 className="text-xl font-semibold text-black mb-6">
        Prochaines publications ({posts.length})
      </h2>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="flex items-center justify-between p-4 border border-gray/20 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-medium text-black">{post.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  STATUS_TYPES[post.status]?.color || 'bg-gray-100'
                }`}>
                  {STATUS_TYPES[post.status]?.name || post.status}
                </span>
              </div>
              
              <p className="text-sm text-gray mb-2 line-clamp-2">{post.content}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray">
                <span>📅 {new Date(post.date).toLocaleDateString('fr-FR')}</span>
                <span>🕒 {post.time}</span>
                {post.engagement && (
                  <>
                    <span>👁 {post.engagement.views}</span>
                    <span>❤️ {post.engagement.likes}</span>
                    <span>💬 {post.engagement.comments}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button 
                onClick={() => onViewPost(post)}
                className="p-2 text-gray hover:bg-gray/10 rounded-lg transition-colors"
                title="Voir le post"
              >
                <Eye size={16} />
              </button>
              <button 
                onClick={() => onEditPost(post)}
                className="p-2 text-gray hover:bg-gray/10 rounded-lg transition-colors"
                title="Modifier le post"
              >
                <PenNib size={16} />
              </button>
              <button 
                onClick={() => onDeletePost(post.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer le post"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default UpcomingPosts;