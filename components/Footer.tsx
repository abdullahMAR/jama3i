import React from 'react';
import { FacebookIcon, TelegramIcon } from './Icons';
import { useTranslation } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner mt-8 py-6 text-center text-slate-600 dark:text-slate-400">
      <div className="container mx-auto">
        <p className="mb-4">
          {t('footer.credits')}{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">{t('footer.creators')}</span>.
        </p>
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://www.facebook.com/profile.php?id=615790976970"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-500 transition-colors"
          >
            <FacebookIcon className="w-6 h-6" />
            {t('footer.follow')}
          </a>
          <a
            href="https://t.me/mar01abdullah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-500 transition-colors"
          >
            <TelegramIcon className="w-6 h-6" />
            {t('footer.contact')}
          </a>
        </div>
        <p className="text-sm mt-4 text-slate-500">{t('footer.notifications_note')}</p>
      </div>
    </footer>
  );
};

export default Footer;