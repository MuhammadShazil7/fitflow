import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Check, 
  X, 
  Dumbbell,
  Trophy,
  Users,
  MessageCircle,
  Calendar,
  Zap,
  Flame
} from 'lucide-react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'workout',
      title: 'Workout Complete!',
      message: 'You completed "HIIT & Strength" workout. Great job!',
      icon: <Dumbbell className="w-5 h-5 text-[#00ff00]" />,
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Achievement! 🏆',
      message: 'You unlocked the "7 Day Streak" achievement!',
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      time: '4 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'community',
      title: 'New Community Post',
      message: 'Sarah Johnson shared a new workout milestone.',
      icon: <Users className="w-5 h-5 text-[#00ff00]" />,
      time: '6 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Workout Reminder',
      message: 'Don\'t forget your morning workout! ☀️',
      icon: <Calendar className="w-5 h-5 text-[#00ff00]" />,
      time: '1 day ago',
      read: true
    },
    {
      id: 5,
      type: 'goal',
      title: 'Goal Progress',
      message: 'You\'re 70% towards your weight loss goal! Keep going!',
      icon: <Target className="w-5 h-5 text-[#00ff00]" />,
      time: '2 days ago',
      read: true
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'workout', label: 'Workouts' },
    { id: 'achievement', label: 'Achievements' },
    { id: 'community', label: 'Community' },
    { id: 'reminder', label: 'Reminders' },
  ];

  const filtered = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#00ff00]" />
              Notifications
            </h1>
            <p className="text-gray-400 text-sm">Stay updated with your fitness journey</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="bg-[#00ff00] text-[#02020a] px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} new
              </span>
            )}
            <button className="text-gray-400 hover:text-[#00ff00] text-sm transition-colors">
              Mark all read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-[#00ff00] text-[#02020a]'
                  : 'bg-[#0a0a1a] text-gray-400 hover:text-white border border-[#00ff00]/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.map((notification) => (
            <div 
              key={notification.id}
              className={`bg-[#0a0a1a] rounded-2xl p-4 border transition-all duration-300 ${
                notification.read 
                  ? 'border-[#00ff00]/10 opacity-70' 
                  : 'border-[#00ff00]/30 hover:border-[#00ff00]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center flex-shrink-0 ${
                  notification.read ? 'opacity-50' : ''
                }`}>
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-300'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Mark as read
                      </button>
                      <button className="text-xs text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-1">
                        <X className="w-3 h-3" />
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;