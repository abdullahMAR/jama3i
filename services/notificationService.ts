
import { useEffect, useState, useCallback } from 'react';
import { Lecture } from '../types';

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return 'denied';
  }
  return Notification.requestPermission();
};

const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    // NOTE: In a real PWA, this would be `navigator.serviceWorker.ready.then(registration => registration.showNotification(title, options));`
    new Notification(title, options);
  }
};

export const useNotifications = (lectures: Lecture[], dailySummaryTime: string) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const checkAndSendNotifications = useCallback(() => {
    if (Notification.permission !== 'granted') return;

    const now = new Date();
    const today = now.toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof import('../types').DayOfWeek;
    const todayLectures = lectures.filter(l => l.day === today);

    // Daily summary notification
    const [summaryHour, summaryMinute] = dailySummaryTime.split(':').map(Number);
    if (now.getHours() === summaryHour && now.getMinutes() === summaryMinute) {
      if (todayLectures.length > 0) {
        showNotification(
          `Today's Schedule`,
          { body: `You have ${todayLectures.length} lecture(s) today. Good luck!` }
        );
      } else {
        showNotification(
          `Today's Schedule`,
          { body: `You have no lectures today. Enjoy your day!` }
        );
      }
    }

    // Pre-lecture reminders
    todayLectures.forEach(lecture => {
      const [hour, minute] = lecture.startTime.split(':').map(Number);
      const lectureTime = new Date();
      lectureTime.setHours(hour, minute, 0, 0);
      
      const diffInMinutes = (lectureTime.getTime() - now.getTime()) / 60000;

      if (diffInMinutes > 29.5 && diffInMinutes < 30.5) {
        showNotification(
          `Upcoming: ${lecture.name}`,
          {
            body: `Starts at ${lecture.startTime} in ${lecture.location}.\nProfessor: ${lecture.professor || 'N/A'}`,
          }
        );
      }
    });
  }, [lectures, dailySummaryTime]);

  useEffect(() => {
    // This interval simulates a background check. For true offline notifications, a Service Worker is required.
    const intervalId = setInterval(checkAndSendNotifications, 60 * 1000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [checkAndSendNotifications]);

  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermission(status);
  };
  
  return { permission, handleRequestPermission };
};
