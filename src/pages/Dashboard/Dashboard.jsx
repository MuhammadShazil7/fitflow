import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, Activity, User, TrendingUp,
  Zap, Clock, ArrowRight, Award, 
  Flame, BarChart3, Calendar, Play,
  Heart, MessageCircle, Share2,
  Plus, Coffee, Sun, Moon, Utensils
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useNutrition } from '../../hooks/useNutrition';
import { useProgress } from '../../hooks/useProgress';
import { useGame } from '../../context/GameContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { workouts, loading: workoutsLoading } = useWorkouts();
  const { dailySummary, loading: nutritionLoading } = useNutrition();
  const { analytics, loading: progressLoading } = useProgress();
  const { xp, level, streak, achievements, getXpForLevel } = useGame();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workoutsLoading && !nutritionLoading && !progressLoading) {
      setLoading(false);
    }
  }, [workoutsLoading, nutritionLoading, progressLoading]);

  const totalWorkouts = workouts?.length || 0;
  const totalCalories = dailySummary?.totalCalories || 0;
  const progress = analytics?.weightTrend || 0;

  const xpForNextLevel = getXpForLevel(level);
  const xpProgress = Math.min((xp / xpForNextLevel) * 100, 100);

  const recentActivities = workouts?.slice(0, 3).map(w => ({
    name: w.name,
    time: new Date(w.date).toLocaleDateString(),
    icon: <Dumbbell className="w-4 h-4 text-[#00ff00]" />
  })) || [];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="text-[#00ff00]">{user?.name || user?.username}</span>! 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">Here's your fitness overview</p>
        </div>
        <div className="flex items-center gap-2 bg-[#00ff00]/10 px-4 py-2 rounded-full border border-[#00ff00]/20">
          <Zap className="w-4 h-4 text-[#00ff00]" />
          <span className="text-sm font-semibold text-[#00ff00]">{streak || 0} day streak</span>
        </div>
      </div>

      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Workouts</p>
              <p className="text-2xl font-bold text-white">{totalWorkouts}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[#00ff00]" />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Calories</p>
              <p className="text-2xl font-bold text-white">{totalCalories}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Progress</p>
              <p className="text-2xl font-bold text-white">{progress}%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Achievements</p>
              <p className="text-2xl font-bold text-white">{achievements?.length || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/workouts" className="bg-[#0a0a1a] hover:bg-[#12121e] p-4 rounded-2xl text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">💪</div>
              <p className="text-sm font-medium text-white">Log Workout</p>
            </Link>
            <Link to="/nutrition" className="bg-[#0a0a1a] hover:bg-[#12121e] p-4 rounded-2xl text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🍎</div>
              <p className="text-sm font-medium text-white">Log Meal</p>
            </Link>
            <Link to="/progress" className="bg-[#0a0a1a] hover:bg-[#12121e] p-4 rounded-2xl text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">📊</div>
              <p className="text-sm font-medium text-white">Track Progress</p>
            </Link>
            <Link to="/profile" className="bg-[#0a0a1a] hover:bg-[#12121e] p-4 rounded-2xl text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">👤</div>
              <p className="text-sm font-medium text-white">Profile</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Recent Activity</h3>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              {recentActivities.length > 0 ? (
                recentActivities.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-white text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No recent workouts</p>
              )}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-gradient-to-br from-[#00ff00]/10 to-[#24cb24]/5 rounded-2xl p-5 border border-[#00ff00]/20">
            <h3 className="text-white font-semibold text-sm mb-4">Today's Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Calories</span>
                  <span className="text-[#00ff00]">{dailySummary?.totalCalories || 0}/2000</span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-[#00ff00] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((dailySummary?.totalCalories || 0) / 2000 * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Protein</span>
                  <span className="text-[#00ff00]">{dailySummary?.totalProtein || 0}g/150g</span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-[#24cb24] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((dailySummary?.totalProtein || 0) / 150 * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* XP Progress */}
          <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-bold">Level {level}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-[#00ff00]" />
                <span className="text-white text-sm font-semibold">{xp}</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] rounded-full transition-all duration-1000"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-1 block text-right">
                {xp} / {xpForNextLevel} XP to next level
              </span>
            </div>
          </div>

          {/* Quick Log */}
          <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#00ff00]" />
              <h3 className="text-white font-semibold text-sm">Quick Log ⚡</h3>
              <span className="text-xs text-gray-400 ml-auto">One-tap</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Push-ups', duration: '5min', calories: '50kcal' },
                { name: 'Squats', duration: '5min', calories: '45kcal' },
                { name: 'Run', duration: '10min', calories: '80kcal' },
                { name: 'Abs', duration: '5min', calories: '40kcal' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="bg-[#12121e] hover:bg-[#1a1a2e] border border-[#00ff00]/10 hover:border-[#00ff00]/30 rounded-xl p-2.5 text-center transition-all duration-300 group"
                >
                  <Dumbbell className="w-4 h-4 text-[#00ff00] mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-xs font-medium">{item.name}</p>
                  <p className="text-[10px] text-gray-500">{item.duration} • {item.calories}</p>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-2">
              ⚡ +20 XP • Streak count
            </p>
          </div>

          {/* Social Feed Preview */}
          <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Community Feed</h3>
              <Link to="/community" className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors">
                See All
              </Link>
            </div>
            <div className="space-y-3">
              <div className="bg-[#12121e] rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-xs">
                    SJ
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">Sarah Johnson</p>
                    <p className="text-gray-400 text-xs mt-0.5">Just crushed my 50th workout! 💪</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="flex items-center gap-0.5 text-gray-500 hover:text-[#00ff00] transition-colors">
                        <Heart className="w-3 h-3" />
                        <span className="text-[10px]">24</span>
                      </button>
                      <button className="flex items-center gap-0.5 text-gray-500 hover:text-[#00ff00] transition-colors">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-[10px]">8</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121e] rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-xs">
                    MC
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">Mike Chen</p>
                    <p className="text-gray-400 text-xs mt-0.5">New PR on bench press! 100kg x 5 🏋️</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="flex items-center gap-0.5 text-gray-500 hover:text-[#00ff00] transition-colors">
                        <Heart className="w-3 h-3" />
                        <span className="text-[10px]">18</span>
                      </button>
                      <button className="flex items-center gap-0.5 text-gray-500 hover:text-[#00ff00] transition-colors">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-[10px]">5</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;