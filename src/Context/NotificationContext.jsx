import React, { createContext, useState, useContext, useEffect } from 'react';
import notificationService from '../services/notificationService';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    console.log('🔔 NotificationProvider mounted');

    // Initial load
    const initialNotifs = notificationService.getAll();
    const initialCount = notificationService.getUnreadCount();
    console.log('🔔 Initial notifications:', initialNotifs);
    console.log('🔔 Initial unread count:', initialCount);
    
    setNotifications(initialNotifs || []);
    setUnreadCount(initialCount || 0);

    // Subscribe to changes
    const unsubscribe = notificationService.subscribe((notifs, count) => {
      console.log('🔔 Notification update received:', { 
        notifs: notifs || [], 
        count: count || 0 
      });
      setNotifications(notifs || []);
      setUnreadCount(count || 0);
    });

    return () => {
      console.log('🔔 NotificationProvider unmounting');
      unsubscribe();
    };
  }, []);

  // Wrapper functions
  const addNotification = (type, title, message, link = null) => {
    return notificationService.add(type, title, message, link);
  };

  const markAsRead = (id) => {
    notificationService.markAsRead(id);
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  const deleteNotification = (id) => {
    notificationService.delete(id);
  };

  const clearAll = () => {
    notificationService.clearAll();
  };

  const notifyWorkout = (name) => {
    console.log('🔔 Context notifyWorkout called with:', name);
    return notificationService.notifyWorkout(name);
  };

  const notifyAchievement = (name) => {
    console.log('🔔 Context notifyAchievement called with:', name);
    return notificationService.notifyAchievement(name);
  };

  const notifyStreak = (days) => {
    console.log('🔔 Context notifyStreak called with:', days);
    return notificationService.notifyStreak(days);
  };

  const notifyGoal = (name) => {
    return notificationService.notifyGoal(name);
  };

  const notifyReminder = (message) => {
    return notificationService.notifyReminder(message);
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    notifyWorkout,
    notifyAchievement,
    notifyStreak,
    notifyGoal,
    notifyReminder,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};