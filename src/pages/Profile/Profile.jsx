import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Mail, 
  Calendar, 
  Activity,
  Award,
  TrendingUp,
  Edit2,
  Camera,
  ChevronRight,
  Dumbbell,
  Apple,
  Flame,
  Zap,
  Home,
  BarChart3,
  Target,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useNutrition } from '../../hooks/useNutrition';
import { useGame } from '../../context/GameContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { workouts } = useWorkouts();
  const { dailySummary } = useNutrition();
  const { xp, level, streak, achievements, totalWorkouts } = useGame();

  const stats = [
    { 
      label: 'Workouts', 
      value: workouts?.length || 0, 
      icon: <Dumbbell className="w-5 h-5 text-[#00ff00]" />,
      color: 'bg-[#00ff00]/10'
    },
    { 
      label: 'Calories Burned', 
      value: workouts?.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0) || 0, 
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      color: 'bg-orange-500/10'
    },
    { 
      label: 'Level', 
      value: level || 1, 
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      color: 'bg-purple-500/10'
    },
    { 
      label: 'Streak', 
      value: streak || 0, 
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      color: 'bg-yellow-500/10'
    },
    { 
      label: 'Achievements', 
      value: achievements?.length || 0, 
      icon: <Award className="w-5 h-5 text-[#00ff00]" />,
      color: 'bg-[#00ff00]/10'
    },
    { 
      label: 'Total XP', 
      value: xp || 0, 
      icon: <Target className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10'
    },
  ];

  const menuItems = [
    { 
      icon: <User className="w-5 h-5 text-[#00ff00]" />, 
      label: 'Edit Profile', 
      path: '/profile/edit' 
    },
    { 
      icon: <Settings className="w-5 h-5 text-[#00ff00]" />, 
      label: 'Settings', 
      path: '/settings' 
    },
    { 
      icon: <Activity className="w-5 h-5 text-[#00ff00]" />, 
      label: 'Activity Log', 
      path: '/progress' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00ff00] to-[#24cb24] flex items-center justify-center text-4xl font-bold text-[#02020a] shadow-[0_0_30px_rgba(0,255,0,0.3)]">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 bg-[#00ff00] p-1.5 rounded-full border-2 border-[#02020a]">
              <Camera className="w-4 h-4 text-[#02020a]" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{user?.name || user?.username}</h2>
            <p className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {user?.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full border border-[#00ff00]/20">
                🏆 Level {level}
              </span>
              <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded-full border border-orange-500/20">
                🔥 {streak} day streak
              </span>
              <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-gray-400 rounded-full border border-[#00ff00]/10">
                <Calendar className="w-3 h-3 inline mr-1" />
                Joined {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link 
            to="/profile/edit" 
            className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-2xl p-4 border border-[#00ff00]/10`}>
            <div className="flex items-center justify-between">
              {stat.icon}
              <span className="text-lg font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10 overflow-hidden">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 transition-all duration-300 hover:bg-[#12121e] ${
              index < menuItems.length - 1 ? 'border-b border-[#00ff00]/5' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-white">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </Link>
        ))}
        
        <button
          onClick={logout}
          className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 hover:bg-[#12121e] text-red-500 hover:text-red-400 border-t border-[#00ff00]/5"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Profile;