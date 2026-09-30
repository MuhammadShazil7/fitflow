import React, { createContext, useState, useContext, useEffect } from 'react';
import notificationService from '../Services/notificationService';

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

  // ===== WRAPPER FUNCTIONS =====
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

  // ===== NOTIFICATION TRIGGERS =====
  const notifyWorkout = (name) => {
    console.log('🔔 Context notifyWorkout called with:', name);
    return notificationService.notifyWorkout(name);
  };

  const notifyWorkoutComplete = (workoutName) => {
    return notificationService.notifyWorkoutComplete(workoutName);
  };

  const notifyAchievement = (name) => {
    console.log('🔔 Context notifyAchievement called with:', name);
    return notificationService.notifyAchievement(name);
  };

  const notifyStreak = (days) => {
    console.log('🔔 Context notifyStreak called with:', days);
    return notificationService.notifyStreak(days);
  };

  // ✅ FIX: Single notifyGoal function with optional status
  const notifyGoal = (goalName, status = 'progress') => {
    return notificationService.notifyGoal(goalName, status);
  };

  const notifyNutrition = (name) => {
    return notificationService.notifyNutrition(name);
  };

  const notifyMealLogged = (foodName) => {
    return notificationService.notifyMealLogged(foodName);
  };

  const notifyProgress = (metric, value) => {
    return notificationService.notifyProgress(metric, value);
  };

  const notifyReminder = (message) => {
    return notificationService.notifyReminder(message);
  };

  // ===== EXPOSE ALL =====
  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    notifyWorkout,
    notifyWorkoutComplete,
    notifyAchievement,
    notifyStreak,
    notifyGoal,
    notifyNutrition,
    notifyMealLogged,
    notifyProgress,
    notifyReminder,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};