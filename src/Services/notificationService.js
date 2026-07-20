import toast from 'react-hot-toast';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = [];
    this.unreadCount = 0;
    this.loadFromStorage();
    console.log('🔔 NotificationService initialized');
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('notifications');
      if (saved) {
        const data = JSON.parse(saved);
        this.notifications = data.notifications || [];
        this.unreadCount = data.unreadCount || 0;
        console.log('🔔 Loaded notifications from storage:', this.notifications.length);
      } else {
        this.notifications = [];
        this.unreadCount = 0;
        this.saveToStorage();
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
      this.notifications = [];
      this.unreadCount = 0;
      this.saveToStorage();
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('notifications', JSON.stringify({
        notifications: this.notifications,
        unreadCount: this.unreadCount,
      }));
      console.log('🔔 Saved notifications to storage:', this.notifications.length);
    } catch (e) {
      console.error('Failed to save notifications:', e);
    }
  }

  add(type, title, message, link = null) {
    console.log('🔔 ADDING NOTIFICATION:', { type, title, message, link });
    
    const notification = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      type: type || 'system',
      title: title || 'Notification',
      message: message || 'You have a new notification',
      link: link || null,
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.notifications = [notification, ...this.notifications];
    this.unreadCount += 1;
    this.saveToStorage();
    this.notifyListeners();
    this.showToast(notification);
    
    console.log('🔔 Notification added! Total now:', this.notifications.length);
    return notification;
  }

  showToast(notification) {
    console.log('🔔 SHOWING TOAST:', notification.title);
    
    const icons = {
      workout: '💪',
      achievement: '🏆',
      streak: '🔥',
      goal: '🎯',
      nutrition: '🍎',
      progress: '📊',
      system: '⚡',
      reminder: '⏰',
    };

    toast.success(notification.message, {
      icon: icons[notification.type] || '🔔',
      duration: 5000,
      style: {
        background: '#0a0a1a',
        color: '#00ff00',
        border: '1px solid rgba(0, 255, 0, 0.2)',
        borderRadius: '12px',
        padding: '16px',
      },
    });
  }

  getAll() {
    console.log('🔔 getAll() called, returning:', this.notifications.length);
    return this.notifications;
  }

  getUnread() {
    return this.notifications.filter(n => !n.read);
  }

  getUnreadCount() {
    console.log('🔔 getUnreadCount():', this.unreadCount);
    return this.unreadCount;
  }

  markAsRead(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.unreadCount -= 1;
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.unreadCount = 0;
    this.saveToStorage();
    this.notifyListeners();
  }

  delete(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      this.unreadCount -= 1;
    }
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  clearAll() {
    this.notifications = [];
    this.unreadCount = 0;
    this.saveToStorage();
    this.notifyListeners();
  }

  subscribe(callback) {
    console.log('🔔 New listener subscribed');
    this.listeners.push(callback);
    callback(this.notifications, this.unreadCount);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    console.log('🔔 Notifying listeners, count:', this.listeners.length);
    this.listeners.forEach(callback => {
      try {
        callback(this.notifications, this.unreadCount);
      } catch (e) {
        console.error('Error in listener:', e);
      }
    });
  }

  // ===== NOTIFICATION TRIGGERS =====

  notifyWorkout(workoutName) {
    console.log('🔔 NOTIFY WORKOUT CALLED:', workoutName);
    return this.add(
      'workout',
      '💪 Workout Logged',
      `You logged "${workoutName || 'Workout'}"! Keep pushing! 💪`,
      '/workouts'
    );
  }

  notifyWorkoutComplete(workoutName) {
    return this.add(
      'workout',
      '🏆 Workout Complete!',
      `You completed "${workoutName}"! Great job! 💪`,
      '/workouts'
    );
  }

  notifyAchievement(name) {
    console.log('🔔 NOTIFY ACHIEVEMENT CALLED:', name);
    return this.add(
      'achievement',
      '🏆 Achievement Unlocked!',
      `You unlocked "${name}"! 🎉`,
      '/achievements'
    );
  }

  notifyStreak(days) {
    console.log('🔔 NOTIFY STREAK CALLED:', days);
    return this.add(
      'streak',
      '🔥 Streak Update',
      `You're on a ${days} day streak! Keep going! 🔥`,
      '/dashboard'
    );
  }

  notifyGoal(goalName, status = 'progress') {
    const title = status === 'completed' ? '🎯 Goal Achieved!' : '🎯 Goal Updated';
    const message = status === 'completed'
      ? `You completed "${goalName}"! Amazing! 🎉`
      : `You made progress on "${goalName}"! Keep it up!`;
    return this.add('goal', title, message, '/goals');
  }

  notifyNutrition(mealName) {
    return this.add(
      'nutrition',
      '🍎 Meal Logged',
      `You logged "${mealName || 'a meal'}"! Keep eating healthy! 🥗`,
      '/nutrition'
    );
  }

  notifyMealLogged(foodName) {
    return this.add(
      'nutrition',
      '🍽️ Food Logged',
      `You logged "${foodName || 'a food item'}"! 🥗`,
      '/nutrition'
    );
  }

  notifyProgress(metric, value) {
    return this.add(
      'progress',
      '📊 Progress Updated',
      `You updated ${metric} to ${value}! Keep going! 💪`,
      '/progress'
    );
  }

  notifyReminder(message) {
    return this.add(
      'reminder',
      '⏰ Reminder',
      message || 'Time for your workout!',
      '/workouts'
    );
  }

  notifySystem(message) {
    return this.add(
      'system',
      '⚡ System Update',
      message || 'System update available',
      null
    );
  }
}

// Singleton instance
const notificationService = new NotificationService();
export default notificationService;