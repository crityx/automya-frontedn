# Automya Frontend - Development Guidelines

## Project Overview
Automya is a Next.js application for LinkedIn automation and lead generation. This document outlines the coding standards and conventions for maintaining consistency and scalability.

## 🏗️ Code Architecture

### Modular Development
- **Keep files focused**: Each file should have a single responsibility
- **Maximum file length**: 300 lines maximum per component
- **Break down large components**: Split complex components into smaller, reusable parts
- **Use composition over inheritance**: Prefer component composition patterns

### ✅ Component Decomposition Architecture (Applied)

Nous avons implémenté une architecture modulaire pour les gros composants suivant ces principes :

#### **Structure modulaire type :**
```
ComponentName/
├── ComponentName.tsx        # Composant principal (< 200 lignes)
├── SubComponent1.tsx        # Sous-composants spécialisés
├── SubComponent2.tsx        # (100-200 lignes chacun)
├── ComponentModal.tsx       # Modals séparés
├── types.ts                 # Types TypeScript dédiés
├── mockData.ts             # Données de test séparées
├── utils.ts                # Utilitaires spécifiques
└── index.ts                # Export centralisé
```

#### **Exemples d'implémentation réussie :**

**PostKanban** (675 → 197 lignes) :
```
PostKanban/
├── PostKanban.tsx          # Logique principale + DnD
├── PostCard.tsx            # Carte individuelle avec actions
├── KanbanColumn.tsx        # Colonne avec drop zone
├── CreatePostModal.tsx     # Modal création avec validation
├── PostDetailModal.tsx     # Détails avec métriques
├── SchedulePostModal.tsx   # Modal planification
├── types.ts               # Interfaces Post, NewPost, KanbanColumn
├── mockData.ts            # Données de démonstration
└── index.ts               # Exports publics
```

**SellersManagement** (463 → 142 lignes) :
```
SellersManagement/
├── SellersManagement.tsx   # Gestion principale + état
├── SellerCard.tsx         # Carte vendeur avec métriques
├── SellersStats.tsx       # Statistiques visuelles
├── CreateSellerModal.tsx  # Formulaire création
├── SellerDetailModal.tsx  # Vue détaillée + actions
├── types.ts              # Seller, NewSeller, Stats
├── mockData.ts           # Données vendeurs
└── index.ts              # Exports
```

**PlatformConfig** (446 → 142 lignes) :
```
PlatformConfig/
├── PlatformConfig.tsx     # Navigation + état global
├── GeneralSettings.tsx    # Paramètres généraux
├── CreditsSettings.tsx    # Système de crédits
├── LinkedInSettings.tsx   # Limites d'automation
├── SecuritySettings.tsx   # Sécurité et 2FA
├── ApiSettings.tsx        # Clés API sécurisées
├── MaintenanceSettings.tsx # Maintenance et monitoring
├── types.ts              # Configuration interfaces
├── defaultConfig.ts      # Valeurs par défaut
└── index.ts              # Exports
```

### **Principes de décomposition appliqués :**

1. **Single Responsibility** : Chaque fichier a une responsabilité unique
2. **Separation of Concerns** : UI, logique, types et données séparés
3. **Composition over Inheritance** : Composants composables
4. **Feature-based Organization** : Organisation par fonctionnalité
5. **Predictable Structure** : Structure cohérente entre modules

### File Naming Conventions
- **All files and folders**: Use English names only
- **Components**: PascalCase (e.g., `UserProfile.tsx`, `PostGeneration.tsx`)
- **Pages**: kebab-case (e.g., `user-profile`, `post-generation`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `apiHelpers.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Folder Structure (English Only)
```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── posts/          # Post-related components
│   ├── profile/        # User profile components
│   ├── dashboard/      # Dashboard analytics
│   ├── messages/       # Messaging system
│   ├── admin/          # Admin panel components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── pages/
│   ├── auth/           # Authentication pages
│   ├── post/           # Post management
│   ├── profile/        # User profile pages
│   ├── dashboard/      # Analytics dashboard
│   ├── messages/       # Messaging interface
│   └── admin/          # Administration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── constants/          # Application constants
```

## 🎨 Design System

### Colors
Always use Tailwind CSS custom colors defined in the design system:
- **Primary**: `bg-primary`, `text-primary`, `border-primary`
- **Secondary**: `bg-secondary`, `text-secondary`
- **Gray scales**: `text-gray`, `bg-gray/10`, `border-gray/20`
- **Success**: `text-green-600`, `bg-green-50`
- **Warning**: `text-orange-600`, `bg-orange-50`
- **Error**: `text-red-600`, `bg-red-50`

### Typography
- **Font family**: Use the default system font stack
- **Font weights**: `font-medium`, `font-semibold`, `font-bold`
- **Text sizes**: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- **Text colors**: Always use `text-gray-800` for main text, `text-gray` for secondary text
- **Consistency**: Maintain uniform text colors across all components
- **Headings hierarchy**: 
  - H1: `text-3xl font-bold` for page titles
  - H2: `text-xl font-semibold` for main sections  
  - H3: `text-lg font-semibold` for subsections and form labels

### Icons
- **Library**: Phosphor React (`phosphor-react`)
- **Usage**: Always use `size={XX}` prop instead of className
- **Consistency**: Use consistent icon sizes (16, 20, 24, 32, 48px)

```tsx
// ✅ Correct
import { User, Settings, Bell } from 'phosphor-react';
<User size={20} className="text-gray" />

// ❌ Avoid
import { User } from 'lucide-react';
<User className="w-5 h-5 text-gray" />
```

## 🚀 Performance Optimization

### Component Optimization
- **Use React.memo**: For components that receive stable props
- **Optimize re-renders**: Use useCallback and useMemo when appropriate
- **Lazy loading**: Use dynamic imports for large components
- **Code splitting**: Split routes and heavy components

### Bundle Optimization
- **Tree shaking**: Import only what you need
- **Image optimization**: Use Next.js Image component
- **Font optimization**: Use Next.js font optimization
- **Bundle analysis**: Regular bundle size monitoring

## 📝 Code Standards

### TypeScript
- **Strict mode**: Always use strict TypeScript
- **Interface definitions**: Define interfaces for all props and data structures
- **Type exports**: Export types from dedicated files
- **Generic types**: Use generics for reusable components

```tsx
// ✅ Good
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  isEditing?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate, isEditing = false }) => {
  // Component logic
};
```

### Component Structure
```tsx
'use client';

import { useState, useCallback } from 'react';
import { User, Settings } from 'phosphor-react';
import Button from '@/components/ui/Button';
import { User as UserType } from '@/types/user';

interface ComponentProps {
  // Props definition
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Callbacks
  const handleAction = useCallback(() => {
    // Logic
  }, []);
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 4. Render
  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines
- **Tailwind first**: Use Tailwind CSS utilities
- **Component variants**: Use className composition for variants
- **Responsive design**: Mobile-first approach
- **Consistent spacing**: Use standard spacing scale (4, 6, 8, 12, 16, 24px)

```tsx
// ✅ Good - Consistent spacing and responsive
<div className="p-6 md:p-8 bg-white rounded-2xl border border-gray/20">
  <h2 className="text-xl md:text-2xl font-bold text-black mb-4">
    Title
  </h2>
</div>
```

## 🔄 State Management

### Local State
- **useState**: For component-level state
- **useReducer**: For complex state logic
- **Custom hooks**: Extract reusable state logic

### Global State
- **Context API**: For theme, user authentication
- **URL state**: For filters, pagination, search

## 🧪 Testing Strategy

### Component Testing
- **Unit tests**: Test component logic
- **Integration tests**: Test component interactions
- **Accessibility tests**: Ensure WCAG compliance

### E2E Testing
- **Critical paths**: User authentication, post creation
- **Cross-browser**: Major browser compatibility

## 📁 File Organization

### Component Files
```
ComponentName/
├── index.ts              # Export file
├── ComponentName.tsx     # Main component
├── ComponentName.test.tsx # Tests
├── ComponentName.stories.tsx # Storybook (if applicable)
└── types.ts              # Component-specific types
```

### Feature-based Organization
Group related components by feature rather than type:
```
features/
├── authentication/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── posts/
    ├── components/
    ├── hooks/
    ├── utils/
    └── types/
```

## 🚨 Code Quality

### Linting Rules
- **ESLint**: Enforce coding standards
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Import ordering**: Consistent import organization

### Git Workflow
- **Conventional commits**: Use semantic commit messages
- **Feature branches**: One feature per branch
- **Pull requests**: Required for all changes
- **Code review**: Mandatory peer review

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:coverage   # Test coverage report
```

## 📋 Checklist for New Components

- [ ] English file and folder names
- [ ] TypeScript interfaces defined
- [ ] Phosphor React icons used
- [ ] Tailwind CSS for styling
- [ ] Responsive design implemented
- [ ] Accessibility considerations
- [ ] Performance optimized
- [ ] Tests written
- [ ] Documentation updated

## 🎯 Future Considerations

### Scalability
- **Micro-frontends**: Consider for large team scaling
- **Design system**: Maintain comprehensive component library
- **Performance monitoring**: Implement performance tracking
- **Internationalization**: Prepare for multi-language support

### Technology Evolution
- **Next.js updates**: Stay current with framework updates
- **React patterns**: Adopt new React features and patterns
- **Build optimization**: Continuous build performance improvement
- **Security**: Regular security audits and updates

---

**Remember**: Write code that your future self and team members will thank you for. Prioritize clarity, consistency, and maintainability over cleverness.