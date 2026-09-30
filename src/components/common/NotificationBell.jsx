import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, X, Dumbbell, Trophy, Flame, Zap, Clock } from 'lucide-react';
import { useNotifications } from '../../Context/NotificationContext';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    const icons = {
      workout: <Dumbbell className="w-4 h-4 text-[#00ff00]" />,
      achievement: <Trophy className="w-4 h-4 text-yellow-500" />,
      streak: <Flame className="w-4 h-4 text-orange-500" />,
      nutrition: <Apple className="w-5 h-5 text-green-500" />,    //
      progress: <TrendingUp className="w-5 h-5 text-blue-500" />, 
      goal: <Zap className="w-4 h-4 text-[#00ff00]" />,
      reminder: <Clock className="w-4 h-4 text-purple-500" />,
    };
    return icons[type] || <Bell className="w-4 h-4 text-gray-500" />;
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
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString();
  };

  const recentNotifications = notifications?.slice(0, 5) || [];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white hover:bg-[#12121e] rounded-xl transition-all duration-300"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0a0a1a]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0a0a1a] border border-[#00ff00]/20 rounded-2xl shadow-2xl shadow-[#00ff00]/5 overflow-hidden z-50 animate-slide-down">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#00ff00]/10">
            <span className="text-white font-semibold text-sm">
              Notifications {unreadCount > 0 && `(${unreadCount} new)`}
            </span>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => { markAllAsRead(); setIsOpen(false); }}
                  className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors"
                >
                  Mark all read
                </button>
              )}
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                View all
              </Link>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No notifications</p>
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-[#00ff00]/5 transition-all duration-300 ${
                    notification.read ? 'opacity-70' : 'bg-[#00ff00]/5'
                  } hover:bg-[#12121e] cursor-pointer`}
                  onClick={() => {
                    if (!notification.read) markAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                    setIsOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#12121e] flex items-center justify-center flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-white'} font-medium`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                    <span className="text-[10px] text-gray-600">
                      {getTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#00ff00] rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications && notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-[#00ff00]/10 text-center">
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                See all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;