import React from 'react';
import { Lecture } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import LectureCard from './LectureCard';
import { useTranslation } from '../i18n/LanguageContext';

interface ScheduleViewProps {
  lectures: Lecture[];
  onDeleteLecture: (id: string) => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ lectures, onDeleteLecture }) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-4">
      {DAYS_OF_WEEK.map(day => {
        const lecturesForDay = lectures
          .filter(lecture => lecture.day === day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return (
          <div key={day} className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-bold text-center mb-4 text-slate-700 dark:text-slate-200 border-b-2 border-indigo-500 pb-2">{t(`days.${day}`)}</h2>
            <div className="flex-grow space-y-4">
              {lecturesForDay.length > 0 ? (
                lecturesForDay.map(lecture => (
                  <LectureCard key={lecture.id} lecture={lecture} onDelete={onDeleteLecture} />
                ))
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 h-full flex items-center justify-center">
                  <p>{t('schedule.noLectures')}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleView;