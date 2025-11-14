import React from 'react';
import { BellIcon, PlusIcon, SearchIcon } from './Icons';
import { requestNotificationPermission } from '../services/notificationService';
import { useTranslation } from '../i18n/LanguageContext';

interface HeaderProps {
  onAddLecture: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddLecture, searchQuery, setSearchQuery }) => {
  const { t, language, setLanguage } = useTranslation();

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
        alert(t('notifications.enabled'));
    } else if (permission === 'denied') {
        alert(t('notifications.denied'));
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-10 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          JAM<span className="text-indigo-500">A</span>ti
        </h1>
        <div className="flex-1 max-w-lg relative">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 w-10 h-10 flex items-center justify-center font-bold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle Language"
          >
            {t('header.language')}
          </button>
          <button
            onClick={handleEnableNotifications}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title={t('header.enableNotifications')}
          >
            <BellIcon className="w-6 h-6"/>
          </button>
          <button
            onClick={onAddLecture}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5"/>
            <span className="hidden md:inline">{t('header.addLecture')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;