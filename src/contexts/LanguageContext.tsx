'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Charger la langue depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('automya-language') as Language;
    if (savedLanguage && ['fr', 'en', 'de', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Charger les traductions quand la langue change
  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const loadTranslations = async (lang: Language) => {
    try {
      const response = await import(`@/locales/${lang}.json`);
      setTranslations(response.default);
    } catch (error) {
      console.warn(`Impossible de charger les traductions pour ${lang}:`, error);
      // Fallback vers le français si erreur
      if (lang !== 'fr') {
        const fallback = await import('@/locales/fr.json');
        setTranslations(fallback.default);
      }
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('automya-language', lang);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  }
  return context;
}