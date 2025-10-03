'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { 
  Plus, 
  CalendarBlank, 
  PenNib, 
  Trash,
  Clock,
  CheckCircle,
  MagicWand,
  Eye,
  DotsThreeVertical,
  Copy,
  Share
} from 'phosphor-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';

interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  type: 'educational' | 'strategy' | 'testimonial' | 'personal';
  engagement?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '5 secrets pour automatiser LinkedIn sans risque',
    content: '🚀 LinkedIn Automation\n\nVoici mes 5 secrets pour automatiser LinkedIn en toute sécurité...\n\n• Secret #1: Respecter les limites\n• Secret #2: Personnaliser les messages\n• Secret #3: Analyser les métriques\n• Secret #4: Tester progressivement\n• Secret #5: Rester authentique\n\nEt vous, utilisez-vous l\'automation ? 👇\n\n#LinkedIn #Automation #Growth',
    status: 'draft',
    createdAt: '2024-10-02 14:30',
    type: 'educational'
  },
  {
    id: '2',
    title: 'Ma stratégie lead generation qui fonctionne',
    content: '💡 Lead Generation Strategy\n\nComment j\'ai généré 100 leads qualifiés ce mois...\n\nMa méthode en 4 étapes:\n1. Ciblage précis\n2. Contenu de valeur\n3. Suivi personnalisé\n4. Mesure et optimisation\n\nRésultats: +300% de conversions!\n\n#LeadGeneration #Strategy #Results',
    status: 'scheduled',
    createdAt: '2024-10-01 16:45',
    scheduledFor: '2024-10-03 09:00',
    type: 'strategy'
  },
  {
    id: '3',
    title: 'Témoignage client incroyable de Marie',
    content: '⭐ Success Story\n\n"Grâce à Automya, j\'ai triplé mon réseau LinkedIn en 3 mois !"\n\n- Marie Dubois, CEO TechCorp\n\nRésultats de Marie:\n✅ +250% de connexions\n✅ +400% d\'engagement\n✅ 50 leads qualifiés/mois\n\nVous aussi, lancez-vous! 🚀\n\n#Testimonial #Success #Growth',
    status: 'published',
    createdAt: '2024-09-30 11:20',
    publishedAt: '2024-10-01 14:00',
    type: 'testimonial',
    engagement: {
      views: 2100,
      likes: 156,
      comments: 42,
      shares: 18
    }
  },
  {
    id: '4',
    title: 'Mon parcours entrepreneurial',
    content: '📖 Personal Journey\n\nIl y a 5 ans, j\'étais développeur dans une PME...\n\nAujourd\'hui, je dirige une startup qui aide 1000+ entrepreneurs.\n\nCe qui a tout changé:\n→ Sortir de ma zone de confort\n→ Apprendre en continu\n→ Construire un réseau\n→ Prendre des risques calculés\n\nQuel a été votre déclic ? 💭\n\n#Entrepreneur #Journey #Inspiration',
    status: 'draft',
    createdAt: '2024-10-02 09:15',
    type: 'personal'
  },
  {
    id: '5',
    title: 'Les erreurs à éviter sur LinkedIn',
    content: '⚠️ LinkedIn Mistakes\n\nTop 5 des erreurs que je vois tout le temps:\n\n❌ Profil incomplet\n❌ Messages de vente directe\n❌ Pas d\'engagement authentique\n❌ Contenu purement promotionnel\n❌ Négliger les analytics\n\n✅ Voici comment les éviter...\n\n#LinkedIn #Tips #Mistakes',
    status: 'scheduled',
    createdAt: '2024-09-29 15:30',
    scheduledFor: '2024-10-04 11:00',
    type: 'educational'
  },
  {
    id: '6',
    title: 'Retour sur le salon Marketing Paris',
    content: '🎯 Event Recap\n\nJuste de retour du salon Marketing Paris 2024!\n\n3 tendances qui vont dominer 2025:\n\n1. IA conversationnelle\n2. Hyper-personnalisation\n3. Marketing automation éthique\n\nMerci à tous ceux qui sont venus échanger! 🤝\n\n#Marketing #Events #Trends2025',
    status: 'published',
    createdAt: '2024-09-28 18:45',
    publishedAt: '2024-09-29 10:30',
    type: 'personal',
    engagement: {
      views: 890,
      likes: 67,
      comments: 23,
      shares: 12
    }
  }
];

const statusConfig = {
  draft: { 
    title: 'Brouillons', 
    color: 'bg-gray-100 text-gray-800', 
    icon: <PenNib size={16} />,
    bgColor: 'bg-gray-50'
  },
  scheduled: { 
    title: 'Planifiés', 
    color: 'bg-blue-100 text-blue-800', 
    icon: <Clock size={16} />,
    bgColor: 'bg-blue-50'
  },
  published: { 
    title: 'Publiés', 
    color: 'bg-green-100 text-green-800', 
    icon: <CheckCircle size={16} />,
    bgColor: 'bg-green-50'
  }
};

const postTypeConfig = {
  educational: { name: 'Éducatif', color: 'bg-purple-100 text-purple-800' },
  strategy: { name: 'Stratégie', color: 'bg-blue-100 text-blue-800' },
  testimonial: { name: 'Témoignage', color: 'bg-green-100 text-green-800' },
  personal: { name: 'Personnel', color: 'bg-orange-100 text-orange-800' }
};

interface DroppableColumnProps {
  status: Post['status'];
  config: {
    title: string;
    color: string;
    icon: JSX.Element;
    bgColor: string;
  };
  posts: Post[];
  onPostClick: (post: Post) => void;
  onStatusChange: (postId: string, newStatus: Post['status']) => void;
  onDeletePost: (postId: string) => void;
  onCopyPost: (content: string) => void;
}

function DroppableColumn({ status, config, posts, onPostClick, onStatusChange, onDeletePost, onCopyPost }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-2xl border border-gray/20 transition-colors ${
        isOver ? 'border-primary bg-primary/5' : ''
      }`}
    >
      <div className={`p-4 ${config.bgColor} border-b border-gray/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {config.icon}
            <h2 className="font-semibold text-black">{config.title}</h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
              {posts.length}
            </span>
          </div>
        </div>
      </div>
      
      <SortableContext
        items={posts.map(post => post.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto min-h-32">
          {posts.map((post) => (
            <DraggablePost
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
              onStatusChange={onStatusChange}
              onDeletePost={onDeletePost}
              onCopyPost={onCopyPost}
            />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                {config.icon}
              </div>
              <p className="text-sm text-gray">Aucun post {config.title.toLowerCase()}</p>
              <p className="text-xs text-gray mt-1">Glissez un post ici</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

interface DraggablePostProps {
  post: Post;
  onClick: () => void;
  onStatusChange: (postId: string, newStatus: Post['status']) => void;
  onDeletePost: (postId: string) => void;
  onCopyPost: (content: string) => void;
}

function DraggablePost({ post, onClick, onStatusChange, onDeletePost, onCopyPost }: DraggablePostProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border border-gray/20 rounded-lg hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${postTypeConfig[post.type].color}`}>
              {postTypeConfig[post.type].name}
            </span>
          </div>
          <h3 className="font-medium text-black line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray line-clamp-3 mb-3">
            {post.content}
          </p>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 hover:bg-gray/10 rounded"
          >
            <DotsThreeVertical size={16} className="text-gray" />
          </button>
        </div>
      </div>

      <div className="text-xs text-gray space-y-1">
        <div>Créé: {formatDate(post.createdAt)}</div>
        {post.scheduledFor && (
          <div className="text-blue-600">📅 Planifié: {formatDate(post.scheduledFor)}</div>
        )}
        {post.publishedAt && (
          <div className="text-green-600">✅ Publié: {formatDate(post.publishedAt)}</div>
        )}
      </div>

      {post.engagement && (
        <div className="mt-3 pt-3 border-t border-gray/10">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium text-black">{post.engagement.views}</div>
              <div className="text-gray">Vues</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-black">{post.engagement.likes}</div>
              <div className="text-gray">Likes</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-black">{post.engagement.comments}</div>
              <div className="text-gray">Comm.</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-black">{post.engagement.shares}</div>
              <div className="text-gray">Partages</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {post.status === 'draft' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(post.id, 'scheduled');
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Planifier
            </button>
          )}
          {post.status === 'scheduled' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(post.id, 'published');
              }}
              className="text-xs text-green-600 hover:text-green-800"
            >
              Publier
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyPost(post.content);
            }}
            className="p-1 text-gray hover:text-black rounded"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeletePost(post.id);
            }}
            className="p-1 text-red-600 hover:text-red-800 rounded"
          >
            <Trash size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostKanban() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'educational' as Post['type'],
    scheduledFor: ''
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getPostsByStatus = (status: Post['status']) => {
    return posts.filter(post => post.status === status);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      type: newPost.type,
      status: newPost.scheduledFor ? 'scheduled' : 'draft',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      scheduledFor: newPost.scheduledFor || undefined
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', type: 'educational', scheduledFor: '' });
    setIsCreateModalOpen(false);
    alert('Post créé avec succès !');
  };

  const handleStatusChange = (postId: string, newStatus: Post['status']) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : post.publishedAt
          }
        : post
    ));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activePost = posts.find(post => post.id === activeId);
    if (!activePost) return;

    if (overId === 'draft' || overId === 'scheduled' || overId === 'published') {
      const newStatus = overId as Post['status'];
      if (activePost.status !== newStatus) {
        handleStatusChange(activeId, newStatus);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activePost = posts.find(post => post.id === activeId);
    if (!activePost) return;

    if (overId === 'draft' || overId === 'scheduled' || overId === 'published') {
      const newStatus = overId as Post['status'];
      if (activePost.status !== newStatus) {
        handleStatusChange(activeId, newStatus);
      }
    }
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleCopyPost = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Contenu copié !');
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Gestion des posts</h1>
              <p className="text-gray">Organisez vos contenus par statut - Glissez-déposez pour changer de catégorie</p>
            </div>
            
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus size={16} className="mr-2" />
              Nouveau post
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const statusPosts = getPostsByStatus(status as Post['status']);
            
            return (
              <DroppableColumn
                key={status}
                status={status as Post['status']}
                config={config}
                posts={statusPosts}
                onPostClick={handlePostClick}
                onStatusChange={handleStatusChange}
                onDeletePost={handleDeletePost}
                onCopyPost={handleCopyPost}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="p-4 border border-primary rounded-lg bg-white shadow-lg opacity-75">
              <div className="font-medium text-black line-clamp-2">
                {posts.find(post => post.id === activeId)?.title}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>

      {/* Post Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Détails du post"
        size="lg"
      >
        {selectedPost && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${postTypeConfig[selectedPost.type].color}`}>
                {postTypeConfig[selectedPost.type].name}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusConfig[selectedPost.status].color}`}>
                {statusConfig[selectedPost.status].title}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">{selectedPost.title}</h3>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="whitespace-pre-wrap text-black">{selectedPost.content}</div>
              </div>
            </div>

            {selectedPost.engagement && (
              <div className="grid grid-cols-4 gap-4 p-4 bg-green-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedPost.engagement.views}</div>
                  <div className="text-sm text-gray">Vues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedPost.engagement.likes}</div>
                  <div className="text-sm text-gray">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedPost.engagement.comments}</div>
                  <div className="text-sm text-gray">Commentaires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedPost.engagement.shares}</div>
                  <div className="text-sm text-gray">Partages</div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button onClick={() => handleCopyPost(selectedPost.content)} className="flex-1">
                <Copy size={16} className="mr-2" />
                Copier le contenu
              </Button>
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer un nouveau post"
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Titre du post"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Titre accrocheur pour votre post"
            required
          />

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Contenu du post
            </label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Rédigez votre post..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Type de contenu</label>
              <select
                value={newPost.type}
                onChange={(e) => setNewPost({ ...newPost, type: e.target.value as Post['type'] })}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="educational">Éducatif</option>
                <option value="strategy">Stratégie</option>
                <option value="testimonial">Témoignage</option>
                <option value="personal">Personnel</option>
              </select>
            </div>

            <Input
              label="Planifier pour (optionnel)"
              type="datetime-local"
              value={newPost.scheduledFor}
              onChange={(e) => setNewPost({ ...newPost, scheduledFor: e.target.value })}
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleCreatePost} className="flex-1">
              <Plus size={16} className="mr-2" />
              Créer le post
            </Button>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </DndContext>
  );
}