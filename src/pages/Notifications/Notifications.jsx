import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Check, 
  X, 
  Dumbbell,
  Trophy,
  Flame,
  Zap,
  Clock,
  Trash2,
  CheckCircle,
  Apple,
  TrendingUp,
  Target
} from 'lucide-react';
import { useNotifications } from '../../Context/NotificationContext';

const Notifications = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [filter, setFilter] = useState('all');

  // Debug log to see what's coming in
  useEffect(() => {
    console.log('🔔 Notifications page - notifications:', notifications);
    console.log('🔔 Notifications page - unreadCount:', unreadCount);
  }, [notifications, unreadCount]);

  const getIcon = (type) => {
    const icons = {
      workout: <Dumbbell className="w-5 h-5 text-[#00ff00]" />,
      achievement: <Trophy className="w-5 h-5 text-yellow-500" />,
      streak: <Flame className="w-5 h-5 text-orange-500" />,
      goal: <Zap className="w-5 h-5 text-[#00ff00]" />,
      nutrition: <Apple className="w-5 h-5 text-green-500" />,
      progress: <TrendingUp className="w-5 h-5 text-blue-500" />,
      system: <Bell className="w-5 h-5 text-blue-500" />,
      reminder: <Clock className="w-5 h-5 text-purple-500" />,
    };
    return icons[type] || <Bell className="w-5 h-5 text-gray-500" />;
  };

  const getTypeLabel = (type) => {
    const labels = {
      workout: '💪 Workout',
      achievement: '🏆 Achievement',
      streak: '🔥 Streak',
      goal: '🎯 Goal',
      nutrition: '🍎 Nutrition',
      progress: '📊 Progress',
      system: '⚡ System',
      reminder: '⏰ Reminder',
    };
    return labels[type] || type;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const filteredNotifications = filter === 'all' 
    ? notifications || [] 
    : (notifications || []).filter(n => n.type === filter);

  const types = ['all', 'workout', 'achievement', 'streak', 'goal', 'reminder'];

  // If no notifications, show empty state
  if (!notifications || notifications.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#00ff00]" />
              Notifications
            </h1>
            <p className="text-gray-400 text-sm mt-1">Stay updated with your fitness journey</p>
          </div>
        </div>
        <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
          <Bell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">No notifications</h3>
          <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          <p className="text-gray-500 text-xs mt-2">Log a workout to get started 💪</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#00ff00]" />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-[#00ff00] text-[#02020a] text-xs px-2 py-0.5 rounded-full font-semibold">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Stay updated with your fitness journey</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all read
            </button>
          )}
          <button
            onClick={clearAll}
            className="text-sm text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              filter === type
                ? 'bg-[#00ff00] text-[#02020a]'
                : 'bg-[#0a0a1a] text-gray-400 hover:text-white border border-[#00ff00]/10'
            }`}
          >
            {type === 'all' ? 'All' : getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-[#0a0a1a] rounded-2xl p-4 border transition-all duration-300 ${
              notification.read 
                ? 'border-[#00ff00]/10 opacity-70' 
                : 'border-[#00ff00]/30 hover:border-[#00ff00]/50'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notification.read ? 'bg-[#12121e]' : 'bg-[#00ff00]/10'
              }`}>
                {getIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-300'} mt-0.5`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-[#12121e] text-gray-400 rounded-full">
                        {getTypeLabel(notification.type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 text-gray-400 hover:text-[#00ff00] transition-colors rounded-lg hover:bg-[#00ff00]/10"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Link Action */}
                {notification.link && (
                  <Link
                    to={notification.link}
                    className="inline-block mt-2 text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors font-medium"
                    onClick={() => markAsRead(notification.id)}
                  >
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;