'use client';

import { useState } from 'react';
import { X, Bell, CheckCircle, Info, Warning, Clock, User, Coins, ChatCircle, Image, TrendUp } from 'phosphor-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: '1',
    type: 'success',
    title: 'Post publié avec succès',
    message: 'Votre post "5 secrets pour automatiser LinkedIn" a été publié sur LinkedIn.',
    time: '2024-10-03 14:30',
    read: false,
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '2',
    type: 'info',
    title: 'Nouveaux crédits ajoutés',
    message: 'Vous avez reçu 25 crédits gratuits pour votre fidélité.',
    time: '2024-10-03 12:15',
    read: false,
    icon: <Coins className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Crédits bientôt expirés',
    message: '15 crédits expireront dans 7 jours. Utilisez-les avant le 10 octobre.',
    time: '2024-10-03 10:45',
    read: true,
    icon: <Warning className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: '4',
    type: 'info',
    title: 'Nouveau message LinkedIn',
    message: '3 nouvelles réponses à vos messages automatisés.',
    time: '2024-10-03 09:20',
    read: true,
    icon: <ChatCircle className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '5',
    type: 'success',
    title: 'Images générées',
    message: '5 nouvelles images IA ont été générées pour vos posts.',
    time: '2024-10-02 16:30',
    read: true,
    icon: <Image className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '6',
    type: 'info',
    title: 'Rapport hebdomadaire disponible',
    message: 'Votre rapport de performance de la semaine est prêt.',
    time: '2024-10-02 08:00',
    read: true,
    icon: <TrendUp className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: '7',
    type: 'info',
    title: 'Nouvelles connexions LinkedIn',
    message: '12 nouvelles demandes de connexion acceptées.',
    time: '2024-10-01 14:20',
    read: true,
    icon: <User className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '8',
    type: 'warning',
    title: 'Limite quotidienne atteinte',
    message: 'Vous avez atteint votre limite de 50 messages par jour.',
    time: '2024-10-01 11:30',
    read: true,
    icon: <Warning className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getTimeAgo = (time: string) => {
    const now = new Date();
    const notificationTime = new Date(time);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes}min`;
    } else if (diffInMinutes < 1440) {
      return `il y a ${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `il y a ${Math.floor(diffInMinutes / 1440)}j`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray/20">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-black">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between p-4 border-b border-gray/10">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'text-gray hover:bg-gray/10'
              }`}
            >
              Toutes ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-primary text-white'
                  : 'text-gray hover:bg-gray/10'
              }`}
            >
              Non lues ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Tout marquer lu
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray/10">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`p-4 hover:bg-gray/5 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                      <div className={notification.color}>
                        {notification.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-black' : 'text-gray'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="w-3 h-3 text-gray" />
                            <span className="text-xs text-gray">
                              {getTimeAgo(notification.time)}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1 ml-2 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray/30 mx-auto mb-3" />
              <p className="text-gray">
                {filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray/10 bg-gray/5">
          <div className="text-center">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}