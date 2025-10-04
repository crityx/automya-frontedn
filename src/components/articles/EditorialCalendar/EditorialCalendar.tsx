'use client';

import { useState, useCallback, memo } from 'react';
import { Plus } from 'phosphor-react';
import Button from '@/components/ui/Button';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import UpcomingPosts from './components/UpcomingPosts';
import CreatePostModal from './components/CreatePostModal';
import { useCalendarData } from './hooks/useCalendarData';
import { CalendarPost, CreatePostFormData } from './types';
import './utils/initializeData'; // Auto-initialisation des données

const EditorialCalendar = memo(function EditorialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<CalendarPost | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');
  
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: '',
    content: '',
    date: '',
    time: '09:00',
    type: 'educational'
  });

  const {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    getPostsForDate,
    getUpcomingPosts
  } = useCalendarData();

  // Navigation handlers
  const handleNavigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const handleTodayClick = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Form handlers
  const handleFormChange = useCallback((field: keyof CreatePostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      content: '',
      date: '',
      time: '09:00',
      type: 'educational'
    });
    setEditingPost(null);
  }, []);

  // Modal handlers
  const handleOpenCreateModal = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  // Date click handler
  const handleDateClick = useCallback((date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setFormData(prev => ({ ...prev, date: dateStr }));
    setIsModalOpen(true);
  }, []);

  // Post handlers
  const handlePostClick = useCallback((post: CalendarPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      date: post.date,
      time: post.time,
      type: post.type
    });
    setIsModalOpen(true);
  }, []);

  const handleCreatePost = useCallback(() => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.date) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);
    
    addPost({
      title: formData.title,
      content: formData.content,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'scheduled',
      scheduledFor: scheduledDateTime.toISOString()
    });

    handleCloseModal();
  }, [formData, addPost, handleCloseModal]);

  const handleSaveAsDraft = useCallback(() => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Veuillez remplir le titre et le contenu');
      return;
    }

    addPost({
      title: formData.title,
      content: formData.content,
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time,
      type: formData.type,
      status: 'draft'
    });

    handleCloseModal();
  }, [formData, addPost, handleCloseModal]);

  const handleUpdatePost = useCallback(() => {
    if (!editingPost || !formData.title.trim() || !formData.content.trim() || !formData.date) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);

    updatePost(editingPost.id, {
      title: formData.title,
      content: formData.content,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'scheduled',
      scheduledFor: scheduledDateTime.toISOString()
    });

    handleCloseModal();
  }, [editingPost, formData, updatePost, handleCloseModal]);

  const handlePublishNow = useCallback(() => {
    if (!editingPost) return;

    updatePost(editingPost.id, {
      status: 'published',
      publishedAt: new Date().toISOString()
    });

    handleCloseModal();
  }, [editingPost, updatePost, handleCloseModal]);

  const handleViewPost = useCallback((post: CalendarPost) => {
    handlePostClick(post);
  }, [handlePostClick]);

  const handleEditPost = useCallback((post: CalendarPost) => {
    handlePostClick(post);
  }, [handlePostClick]);

  const handleDeletePost = useCallback((postId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      deletePost(postId);
    }
  }, [deletePost]);

  const upcomingPosts = getUpcomingPosts(5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      {/* Header */}
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
            
            <Button onClick={handleOpenCreateModal}>
              <Plus size={16} className="mr-2" />
              Nouveau post
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray/20 overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          onNavigateMonth={handleNavigateMonth}
          onTodayClick={handleTodayClick}
        />
        
        <CalendarGrid
          currentDate={currentDate}
          getPostsForDate={getPostsForDate}
          onDateClick={handleDateClick}
          onPostClick={handlePostClick}
        />
      </div>

      {/* Upcoming Posts */}
      <UpcomingPosts
        posts={upcomingPosts}
        onViewPost={handleViewPost}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />

      {/* Create/Edit Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onFormChange={handleFormChange}
        onCreatePost={handleCreatePost}
        onSaveAsDraft={handleSaveAsDraft}
        editingPost={editingPost}
        onUpdatePost={handleUpdatePost}
        onPublishNow={handlePublishNow}
      />
    </div>
  );
});

export default EditorialCalendar;