import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('jamati-lang', 'en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>(language === 'ar' ? 'rtl' : 'ltr');
  const [translations, setTranslations] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enResponse, arResponse] = await Promise.all([
          fetch('./i18n/locales/en.json'),
          fetch('./i18n/locales/ar.json')
        ]);
        if (!enResponse.ok || !arResponse.ok) {
            throw new Error('Failed to fetch translation files');
        }
        const en = await enResponse.json();
        const ar = await arResponse.json();
        setTranslations({ en, ar });
      } catch (error) {
        console.error("Failed to load translation files:", error);
        // Fallback to empty objects to prevent the app from crashing
        setTranslations({ en: {}, ar: {} });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslations();
  }, []);

  useEffect(() => {
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.lang = language;
    document.documentElement.dir = newDir;
  }, [language]);

  const t = (key: string): string => {
    if (!translations) return key; // Return key if translations are not loaded
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Fallback to the key itself
      }
    }
    return result as string;
  };

  if (isLoading) {
    // Render a simple loading state or a spinner
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
