import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Settings, LogOut, Mail, Calendar, Activity,
  Award, TrendingUp, Edit2, Camera, ChevronRight,
  Dumbbell, Apple, Flame, Zap, Home, BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useNutrition } from '../../hooks/useNutrition';

const Profile = () => {
  const { user, logout } = useAuth();
  const { workouts } = useWorkouts();
  const { dailySummary } = useNutrition();

  const stats = [
    { label: 'Workouts', value: workouts?.length || 0, icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'Calories', value: dailySummary?.totalCalories || 0, icon: <Flame className="w-5 h-5" /> },
    { label: 'Streak', value: '12', icon: <Zap className="w-5 h-5" /> },
    { label: 'Achievements', value: '8', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <Link to="/profile/edit" className="text-gray-400 hover:text-[#00ff00] transition-colors">
            <Edit2 className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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
        <Link to="/settings" className="flex items-center justify-between px-4 py-3 transition-all duration-300 hover:bg-[#12121e] border-b border-[#00ff00]/5">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#00ff00]" />
            <span className="text-white">Settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </Link>
        <button
          onClick={logout}
          className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 hover:bg-[#12121e] text-red-500 hover:text-red-400"
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