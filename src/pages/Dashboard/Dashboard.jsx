import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Activity, 
  User, 
  TrendingUp,
  Zap,
  Calendar,
  Clock,
  ArrowRight,
  Award,
  Users,
  Flame,
  BarChart3,
  ChevronRight,
  Circle,
  Play,
      
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Weekly activity data
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const activityData = [30, 45, 20, 60, 35, 50, 25];
  const maxActivity = Math.max(...activityData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm">Welcome back, {user?.name || user?.username}! 👋</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#009900] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <span className="text-[#02020a] font-bold text-sm">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Calorie Burn</p>
                <p className="text-2xl font-bold text-white">280<span className="text-sm text-gray-400">kcal</span></p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#00ff00]" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-[#00ff00] rounded-full shadow-[0_0_10px_rgba(0,255,0,0.3)]"></div>
              </div>
              <span className="text-xs text-[#00ff00]">60%</span>
            </div>
          </div>

          <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Progress</p>
                <p className="text-2xl font-bold text-white">76<span className="text-sm text-gray-400">%</span></p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#00ff00]" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                <div className="h-full w-[76%] bg-[#00ff00] rounded-full shadow-[0_0_10px_rgba(0,255,0,0.3)]"></div>
              </div>
              <span className="text-xs text-[#00ff00]">76%</span>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Weekly Activity</h3>
            <span className="text-xs text-gray-400">This Week</span>
          </div>
          <div className="flex items-end justify-between h-28 gap-1">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-[#00ff00] rounded-t-lg transition-all duration-500"
                  style={{ 
                    height: `${(activityData[i] / maxActivity) * 80}px`,
                    opacity: activityData[i] > 30 ? 1 : 0.4
                  }}
                ></div>
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Workout */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Today's Workout</h3>
            <Link to="/workouts" className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#00ff00]/20 to-[#009900]/20 p-5 border border-[#00ff00]/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff00]/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold text-lg">HIIT & Strength</p>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    Start up 10 min
                  </p>
                </div>
                <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community News */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Community News</h3>
            <Link to="/community" className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#12121e] rounded-xl border border-[#00ff00]/5">
              <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00ff00]" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">New Class: Neon Spin</p>
                <p className="text-gray-400 text-xs">New class is now available</p>
              </div>
              <Circle className="w-2 h-2 fill-[#00ff00] text-[#00ff00]" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#12121e] rounded-xl border border-[#00ff00]/5">
              <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#00ff00]" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Leaderboard Update</p>
                <p className="text-gray-400 text-xs">Check your rank this week</p>
              </div>
              <Circle className="w-2 h-2 fill-[#00ff00] text-[#00ff00]" />
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Dashboard;