import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, Activity, User, TrendingUp,
  Zap, Clock, ArrowRight, Award, 
  Flame, BarChart3, Calendar, Play,
  Heart, MessageCircle, Share2,
  Plus, Coffee, Sun, Moon, Utensils,
  ChevronRight, Circle, Sparkles, Crown,
  Target, Weight, Ruler, Medal, Star,
  Gift, Rocket, Battery, Zap as ZapIcon
} from 'lucide-react';
import { useAuth } from '../../Context/authContext';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useNutrition } from '../../hooks/useNutrition';
import { useProgress } from '../../hooks/useProgress';
import { useGame } from '../../Context/GameContext';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useAuth();
  const { workouts, loading: workoutsLoading } = useWorkouts();
  const { dailySummary, loading: nutritionLoading } = useNutrition();
  const { analytics, loading: progressLoading } = useProgress();
  const { xp, level, streak, achievements, totalWorkouts, getXpForLevel } = useGame();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 17) setGreeting('Good Afternoon 🌤️');
    else setGreeting('Good Evening 🌙');
  }, []);

  useEffect(() => {
    if (!workoutsLoading && !nutritionLoading && !progressLoading) {
      setLoading(false);
    }
  }, [workoutsLoading, nutritionLoading, progressLoading]);

  const totalWorkoutsCount = workouts?.length || 0;
  const totalCalories = workouts?.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0) || 0;
  const progress = analytics?.weightTrend || 0;
  const xpForNextLevel = getXpForLevel(level);
  const xpProgress = Math.min((xp / xpForNextLevel) * 100, 100);

  // Chart data for last 7 days
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return days;
  };

  const getWorkoutData = () => {
    const today = new Date();
    return getLast7Days().map((_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - index));
      const dateStr = date.toDateString();
      return workouts?.filter(w => new Date(w.date).toDateString() === dateStr).length || 0;
    });
  };

  const chartData = {
    labels: getLast7Days(),
    datasets: [{
      label: 'Workouts',
      data: getWorkoutData(),
      borderColor: '#00ff00',
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#00ff00',
      pointBorderColor: '#00ff00',
      pointRadius: 4,
      pointHoverRadius: 7,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0a0a1a',
        titleColor: '#00ff00',
        bodyColor: '#ffffff',
        borderColor: 'rgba(0, 255, 0, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af', font: { size: 11 }, stepSize: 1 },
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(0,255,0,0.2)]"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#00ff00]/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ff00] to-[#24cb24] flex items-center justify-center text-2xl font-bold text-[#02020a] shadow-[0_0_40px_rgba(0,255,0,0.3)]">
                {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#00ff00] rounded-full border-2 border-[#02020a] animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm text-gray-400">{greeting}</p>
              <h1 className="text-2xl font-bold text-white">
                {user?.name || user?.username} 👋
              </h1>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 bg-[#0a0a1a] px-4 py-2 rounded-full border border-[#00ff00]/20">
            <div className="relative">
              <ZapIcon className="w-4 h-4 text-[#00ff00]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ff00] rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-semibold text-[#00ff00]">{streak || 0} day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0a0a1a] px-4 py-2 rounded-full border border-[#00ff00]/20">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-white">Level {level}</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid - 4 Elegant Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-8">
        {[
          { 
            icon: <Dumbbell className="w-5 h-5 text-[#00ff00]" />,
            value: totalWorkoutsCount,
            label: 'Total Workouts',
            change: '+12%',
            color: 'from-[#00ff00]/20 to-[#00ff00]/5'
          },
          { 
            icon: <Flame className="w-5 h-5 text-orange-500" />,
            value: totalCalories.toLocaleString(),
            label: 'Calories Burned',
            change: '+8%',
            color: 'from-orange-500/20 to-orange-500/5'
          },
          { 
            icon: <Target className="w-5 h-5 text-purple-500" />,
            value: `${progress}%`,
            label: 'Progress',
            change: '+5%',
            color: 'from-purple-500/20 to-purple-500/5'
          },
          { 
            icon: <Medal className="w-5 h-5 text-yellow-500" />,
            value: achievements?.length || 0,
            label: 'Achievements',
            change: '+3',
            color: 'from-yellow-500/20 to-yellow-500/5'
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
                <p className="text-xs text-[#00ff00] mt-1">{stat.change}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions - Elegant Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        {[
          { to: '/workouts', icon: <Dumbbell className="w-5 h-5" />, label: 'Log Workout', color: '[#00ff00]' },
          { to: '/nutrition', icon: <Apple className="w-5 h-5" />, label: 'Log Meal', color: 'green-500' },
          { to: '/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Track Progress', color: 'orange-500' },
          { to: '/goals', icon: <Target className="w-5 h-5" />, label: 'Set Goals', color: 'purple-500' },
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={action.to}
              className={`bg-[#0a0a1a] hover:bg-[#12121e] p-4 rounded-2xl text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group flex items-center justify-center gap-3`}
            >
              <div className={`text-${action.color} group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-white">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Weekly Activity</h3>
                <p className="text-gray-400 text-sm">Your workout frequency this week</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 bg-[#00ff00] rounded-full"></span>
                <span>Workouts</span>
              </div>
            </div>
            <div className="h-48">
              <Line data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Recent Activity</h3>
                <p className="text-gray-400 text-sm">Your latest workouts</p>
              </div>
              <Link to="/workouts" className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors flex items-center gap-1">
                See All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {workouts?.slice(0, 3).map((workout, index) => (
                <motion.div
                  key={workout._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Dumbbell className="w-5 h-5 text-[#00ff00]" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{workout.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{workout.duration || 0} min</span>
                        <span>•</span>
                        <span>{workout.caloriesBurned || 0} kcal</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(workout.date).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
              {(!workouts || workouts.length === 0) && (
                <div className="text-center py-6 text-gray-400 text-sm">
                  No workouts yet. Start your fitness journey! 💪
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* XP Progress Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gradient-to-br from-[#00ff00]/15 to-[#24cb24]/5 rounded-2xl p-6 border border-[#00ff00]/20"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-bold">Level {level}</span>
              </div>
              <div className="flex items-center gap-1">
                <ZapIcon className="w-4 h-4 text-[#00ff00]" />
                <span className="text-white text-sm font-semibold">{xp}</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] rounded-full shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                />
              </div>
              <span className="text-xs text-gray-400 mt-1.5 block text-right">
                {xp} / {xpForNextLevel} XP to next level
              </span>
            </div>
          </motion.div>

          {/* Today's Nutrition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Today's Nutrition</h3>
              <Apple className="w-4 h-4 text-[#00ff00]" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Calories', current: dailySummary?.totalCalories || 0, target: 2000, color: '#00ff00' },
                { label: 'Protein', current: dailySummary?.totalProtein || 0, target: 150, color: '#24cb24' },
                { label: 'Carbs', current: dailySummary?.totalCarbs || 0, target: 250, color: '#50d650' },
                { label: 'Fat', current: dailySummary?.totalFat || 0, target: 70, color: '#7ce07c' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white">{item.current}g / {item.target}g</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 1 }}
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="bg-gradient-to-br from-[#00ff00]/5 to-[#24cb24]/5 rounded-2xl p-6 border border-[#00ff00]/10 text-center"
          >
            <Sparkles className="w-8 h-8 text-[#00ff00] mx-auto mb-3" />
            <p className="text-white text-sm font-medium leading-relaxed">
              "The only bad workout is the one that didn't happen."
            </p>
            <p className="text-gray-500 text-xs mt-2">— Fitness Motivation</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Apple icon (if not imported)
const Apple = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

export default Dashboard;