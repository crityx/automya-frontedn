'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { 
  CalendarBlank as CalendarIcon, 
  Plus, 
  Clock, 
  PenNib, 
  Trash,
  CaretLeft,
  CaretRight,
  Eye
} from 'phosphor-react';

const mockPosts = [
  {
    id: '1',
    title: 'Comment automatiser LinkedIn',
    content: 'Découvrez mes 5 astuces pour automatiser efficacement...',
    date: '2024-10-15',
    time: '09:00',
    status: 'scheduled',
    type: 'educational'
  },
  {
    id: '2',
    title: 'Ma stratégie lead generation',
    content: 'Voici comment j\'ai généré 100 leads ce mois...',
    date: '2024-10-17',
    time: '14:30',
    status: 'scheduled',
    type: 'strategy'
  },
  {
    id: '3',
    title: 'Retour d\'expérience client',
    content: 'Témoignage incroyable de Marie, qui a triplé...',
    date: '2024-10-20',
    time: '11:15',
    status: 'draft',
    type: 'testimonial'
  }
];

const postTypes = {
  educational: { name: 'Éducatif', color: 'bg-blue-100 text-blue-800' },
  strategy: { name: 'Stratégie', color: 'bg-green-100 text-green-800' },
  testimonial: { name: 'Témoignage', color: 'bg-purple-100 text-purple-800' },
  personal: { name: 'Personnel', color: 'bg-orange-100 text-orange-800' }
};

const statusTypes = {
  draft: { name: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
  scheduled: { name: 'Planifié', color: 'bg-primary-light text-primary' },
  published: { name: 'Publié', color: 'bg-green-100 text-green-800' }
};

export default function EditorialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [view, setView] = useState<'month' | 'week'>('month');

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    date: '',
    time: '09:00',
    type: 'educational'
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return posts.filter(post => post.date === dateStr);
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setNewPost({ ...newPost, date: dateStr });
    setIsModalOpen(true);
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content && newPost.date) {
      const post = {
        id: Date.now().toString(),
        ...newPost,
        status: 'scheduled' as const
      };
      setPosts([...posts, post]);
      setNewPost({
        title: '',
        content: '',
        date: '',
        time: '09:00',
        type: 'educational'
      });
      setIsModalOpen(false);
    }
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Calendrier éditorial</h1>
            <p className="text-gray">Planifiez et organisez vos publications LinkedIn</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'month' ? 'bg-white text-black shadow' : 'text-gray'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'week' ? 'bg-white text-black shadow' : 'text-gray'
                }`}
              >
                Semaine
              </button>
            </div>
            
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={16} className="mr-2" />
              Nouveau post
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-2xl border border-gray/20 overflow-hidden">
        <div className="p-6 border-b border-gray/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
                >
                  <CaretLeft size={16} className="text-gray" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray/10 rounded-lg transition-colors"
                >
                  <CaretRight size={16} className="text-gray" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {days.map((date, index) => {
              const dayPosts = getPostsForDate(date);
              const isToday = date && date.toDateString() === new Date().toDateString();
              const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`min-h-[100px] p-2 border border-gray/20 rounded-lg cursor-pointer transition-colors hover:bg-gray/5 ${
                    isToday ? 'bg-primary/10 border-primary/30' : ''
                  } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${
                        isToday ? 'text-primary' : 'text-black'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayPosts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            className="text-xs p-2 bg-primary/10 text-primary rounded border border-primary/20 truncate"
                            title={post.title}
                          >
                            <div className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{post.time}</span>
                            </div>
                            <div className="font-medium truncate">{post.title}</div>
                          </div>
                        ))}
                        {dayPosts.length > 2 && (
                          <div className="text-xs text-gray text-center">
                            +{dayPosts.length - 2} autres
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
        <h2 className="text-xl font-semibold text-black mb-6">Prochaines publications</h2>
        
        <div className="space-y-4">
          {posts
            .filter(post => new Date(post.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-black">{post.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${postTypes[post.type as keyof typeof postTypes]?.color}`}>
                      {postTypes[post.type as keyof typeof postTypes]?.name}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusTypes[post.status as keyof typeof statusTypes]?.color}`}>
                      {statusTypes[post.status as keyof typeof statusTypes]?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray">
                    <span>📅 {new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    <span>🕒 {post.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray hover:bg-gray/10 rounded-lg transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray hover:bg-gray/10 rounded-lg transition-colors">
                    <PenNib size={16} />
                  </button>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Planifier un nouveau post"
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Titre du post"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Titre accrocheur pour votre post"
          />

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Contenu
            </label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Rédigez votre post..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date de publication"
              type="date"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
            />
            
            <Input
              label="Heure"
              type="time"
              value={newPost.time}
              onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-black mb-2">Type</label>
              <select
                value={newPost.type}
                onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="educational">Éducatif</option>
                <option value="strategy">Stratégie</option>
                <option value="testimonial">Témoignage</option>
                <option value="personal">Personnel</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleCreatePost} className="flex-1">
              <CalendarIcon size={16} className="mr-2" />
              Planifier le post
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}