import React from 'react';
import { Lecture } from '../types';
import { TrashIcon } from './Icons';
import { useTranslation } from '../i18n/LanguageContext';

interface LectureCardProps {
  lecture: Lecture;
  onDelete: (id: string) => void;
}

const LectureCard: React.FC<LectureCardProps> = ({ lecture, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg hover:border-indigo-500 border-2 border-transparent transition-all duration-300">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{lecture.name}</h3>
            <button onClick={() => onDelete(lecture.id)} className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 -mt-1 -me-1">
                <TrashIcon className="w-5 h-5"/>
            </button>
        </div>
        <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mb-2">{t(`lectureTypes.${lecture.type}`)}</p>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">
          <span className="font-medium">{t('lectureCard.professor')}</span> {lecture.professor || 'N/A'}
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          <span className="font-medium">{t('lectureCard.location')}</span> {lecture.location}
        </p>
      </div>
      <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-700 text-end">
        <p className="text-xl font-mono font-semibold text-slate-700 dark:text-slate-200">{lecture.startTime}</p>
      </div>
    </div>
  );
};

export default LectureCard;