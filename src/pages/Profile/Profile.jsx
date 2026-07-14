import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
   BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Workouts', value: '24', icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'Calories', value: '8,432', icon: <Flame className="w-5 h-5" /> },
    { label: 'Streak', value: '12', icon: <Zap className="w-5 h-5" /> },
    { label: 'Achievements', value: '8', icon: <Award className="w-5 h-5" /> },
  ];

  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: 'Personal Information', path: '/profile/edit' },
    { icon: <Activity className="w-5 h-5" />, label: 'Fitness Goals', path: '/profile/goals' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Activity History', path: '/profile/history' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-3xl font-bold text-[#02020a] shadow-[0_0_30px_rgba(0,255,0,0.3)]">
                {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 bg-[#00ff00] p-1.5 rounded-full border-2 border-[#02020a]">
                <Camera className="w-3 h-3 text-[#02020a]" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{user?.name || user?.username}</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full">
                  Premium Member
                </span>
                <span className="text-xs text-gray-400">
                  Joined {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#00ff00] transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-xl p-3 text-center border border-[#00ff00]/10">
              <div className="flex justify-center text-[#00ff00] mb-1">
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
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
                <span className="text-[#00ff00]">{item.icon}</span>
                <span className="text-white">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 hover:bg-[#12121e] border-t border-[#00ff00]/5 text-red-500 hover:text-red-400"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/dashboard' },
    { icon: <Dumbbell className="w-6 h-6" />, label: 'Workouts', path: '/workouts' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Progress', path: '/progress' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a1a] border-t border-[#00ff00]/10 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'text-[#00ff00]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Profile;