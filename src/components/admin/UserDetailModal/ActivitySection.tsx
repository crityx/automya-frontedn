'use client';

import { memo, useMemo } from 'react';
import { 
  Activity,
  Eye,
  ChatCircle,
  Pen,
  CheckCircle,
  XCircle,
  Clock
} from 'phosphor-react';
import { ActivityLogItem, RecentPost, RecentMessage } from './types';

interface ActivitySectionProps {
  activityLogs: ActivityLogItem[];
  recentPosts: RecentPost[];
  recentMessages: RecentMessage[];
}

const ActivitySection = memo(function ActivitySection({ 
  activityLogs, 
  recentPosts, 
  recentMessages 
}: ActivitySectionProps) {
  const getStatusIcon = useMemo(() => (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'error':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-blue-600" />;
    }
  }, []);

  const getStatusColor = useMemo(() => (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Posts récents */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Pen size={20} className="text-primary" />
          Posts récents
        </h4>
        
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border border-gray/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-black">{post.title}</h5>
                  <p className="text-sm text-gray">{new Date(post.date).toLocaleString('fr-FR')}</p>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {post.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-gray" />
                    {post.engagement.views}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {post.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChatCircle size={14} className="text-gray" />
                    {post.engagement.comments}
                  </span>
                </div>
                <span className="text-sm text-gray">{post.credits} crédits</span>
              </div>
            </div>
          ))}
        </div>
        
        {recentPosts.length === 0 && (
          <p className="text-center text-gray py-8">Aucun post récent</p>
        )}
      </div>

      {/* Messages récents */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <ChatCircle size={20} className="text-primary" />
          Messages récents
        </h4>
        
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div key={message.id} className="border border-gray/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-black">{message.scenario}</h5>
                  <p className="text-sm text-gray">{new Date(message.date).toLocaleString('fr-FR')}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {message.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <span className="text-gray">Envoyés:</span>
                    <span className="font-medium text-black ml-1">{message.count}</span>
                  </span>
                  <span>
                    <span className="text-gray">Succès:</span>
                    <span className="font-medium text-green-600 ml-1">{message.success}</span>
                  </span>
                </div>
                <span className="text-sm text-gray">{message.credits} crédits</span>
              </div>
            </div>
          ))}
        </div>
        
        {recentMessages.length === 0 && (
          <p className="text-center text-gray py-8">Aucun message récent</p>
        )}
      </div>

      {/* Logs d'activité */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Activity size={20} className="text-primary" />
          Logs d'activité
        </h4>
        
        <div className="space-y-3">
          {activityLogs.map((log, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(log.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-black">{log.action}</p>
                  <span className="text-sm text-gray">{new Date(log.date).toLocaleString('fr-FR')}</span>
                </div>
                <p className="text-sm text-gray">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
        
        {activityLogs.length === 0 && (
          <p className="text-center text-gray py-8">Aucune activité récente</p>
        )}
      </div>
    </div>
  );
});

export default ActivitySection;