import React, { useState } from 'react';
import { Lecture, DayOfWeek } from '../types';
import { DAYS_OF_WEEK, LECTURE_TYPES } from '../constants';
import { useTranslation } from '../i18n/LanguageContext';

interface AddLectureFormProps {
  onClose: () => void;
  onAddLecture: (lecture: Omit<Lecture, 'id'>) => void;
}

const AddLectureForm: React.FC<AddLectureFormProps> = ({ onClose, onAddLecture }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [type, setType] = useState(LECTURE_TYPES[0]);
  const [professor, setProfessor] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState<DayOfWeek>(DayOfWeek.Sunday);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !startTime || !day || !type) {
      setError(t('addLectureForm.error'));
      return;
    }
    setError('');
    onAddLecture({ name, type, professor, startTime, location, day });
    onClose();
  };

  const renderInput = (label: string, id: string, type: string, value: string, onChange: (val: string) => void, required: boolean = true) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
  );

  const renderDaySelect = () => (
    <div>
        <label htmlFor="day" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('addLectureForm.day')}</label>
        <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value as DayOfWeek)}
            className="mt-1 block w-full ps-3 pe-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
            {DAYS_OF_WEEK.map(opt => <option key={opt} value={opt}>{t(`days.${opt}`)}</option>)}
        </select>
    </div>
  );

  const renderTypeSelect = () => (
    <div>
        <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('addLectureForm.type')}</label>
        <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full ps-3 pe-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
            {LECTURE_TYPES.map(opt => <option key={opt} value={opt}>{t(`lectureTypes.${opt}`)}</option>)}
        </select>
    </div>
  );


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('addLectureForm.title')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput(t('addLectureForm.name'), 'name', 'text', name, setName)}
          {renderTypeSelect()}
          {renderInput(t('addLectureForm.professor'), 'professor', 'text', professor, setProfessor, false)}
          {renderInput(t('addLectureForm.startTime'), 'startTime', 'time', startTime, setStartTime)}
          {renderInput(t('addLectureForm.location'), 'location', 'text', location, setLocation)}
          {renderDaySelect()}
          
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition">
              {t('addLectureForm.cancel')}
            </button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition">
              {t('addLectureForm.add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureForm;