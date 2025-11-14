import React, { useState, useMemo, useEffect } from 'react';
import { Lecture } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './services/notificationService';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import AddLectureForm from './components/AddLectureForm';
import Footer from './components/Footer';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';

function AppContent() {
  const [lectures, setLectures] = useLocalStorage<Lecture[]>('jamati-lectures', []);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dailySummaryTime] = useLocalStorage('jamati-summary-time', '06:00');
  const { t } = useTranslation();
  
  // First time entry check
  useEffect(() => {
    const isFirstTime = localStorage.getItem('jamati-first-time-visit') === null;
    if (isFirstTime && lectures.length === 0) {
      setIsFormVisible(true);
      localStorage.setItem('jamati-first-time-visit', 'false');
    }
  }, [lectures.length]);

  // The notification hook initializes the scheduling logic
  useNotifications(lectures, dailySummaryTime);

  const addLecture = (lecture: Omit<Lecture, 'id'>) => {
    const newLecture = { ...lecture, id: crypto.randomUUID() };
    setLectures([...lectures, newLecture]);
  };

  const deleteLecture = (id: string) => {
    if (window.confirm(t('app.deleteConfirm'))) {
        setLectures(lectures.filter(l => l.id !== id));
    }
  };

  const filteredLectures = useMemo(() => {
    if (!searchQuery) return lectures;
    const lowercasedQuery = searchQuery.toLowerCase();
    return lectures.filter(
      l =>
        t(`lectureTypes.${l.type}`).toLowerCase().includes(lowercasedQuery) ||
        t(`days.${l.day}`).toLowerCase().includes(lowercasedQuery) ||
        l.name.toLowerCase().includes(lowercasedQuery) ||
        (l.professor && l.professor.toLowerCase().includes(lowercasedQuery)) ||
        l.location.toLowerCase().includes(lowercasedQuery)
    );
  }, [lectures, searchQuery, t]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <Header 
        onAddLecture={() => setIsFormVisible(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {lectures.length > 0 ? (
          <ScheduleView lectures={filteredLectures} onDeleteLecture={deleteLecture} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-300">{t('app.welcome')}</h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">{t('app.emptySchedule')}</p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              {t('app.addFirstLecture')}
            </button>
          </div>
        )}
      </main>
      {isFormVisible && (
        <AddLectureForm
          onClose={() => setIsFormVisible(false)}
          onAddLecture={addLecture}
        />
      )}
      <Footer />
    </div>
  );
}

function App() {
    return (
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    )
}

export default App;