import React, { useState, useEffect } from 'react';
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
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useNutrition } from '../../hooks/useNutrition';
import { useProgress } from '../../hooks/useProgress';
import { useGame } from '../../context/GameContext';
import { 
  TrendingUp, 
  Calendar, 
  Dumbbell, 
  Apple, 
  Flame,
  Download,
  Filter,
  Award,
  Zap
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Analytics = () => {
  const { workouts, loading: workoutsLoading } = useWorkouts();
  const { dailySummary } = useNutrition();
  const { analytics } = useProgress();
  const { xp, level, streak, achievements } = useGame();
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workoutsLoading && workouts) {
      prepareChartData();
      setLoading(false);
    }
  }, [workouts, workoutsLoading, timeRange]);

  const prepareChartData = () => {
    // Sort workouts by date
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get last 7 days
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }

    // Group workouts by date
    const workoutCounts = days.map((_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - index));
      const dateStr = date.toDateString();
      return workouts.filter(w => new Date(w.date).toDateString() === dateStr).length;
    });

    // Calories per day
    const caloriesData = days.map((_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - index));
      const dateStr = date.toDateString();
      const dayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === dateStr);
      return dayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    });

    // Category distribution
    const categories = {};
    workouts.forEach(w => {
      categories[w.category] = (categories[w.category] || 0) + 1;
    });

    setChartData({
      labels: days,
      workouts: workoutCounts,
      calories: caloriesData,
      categories: categories,
    });
  };

  // Calculate stats
  const totalWorkouts = workouts?.length || 0;
  const totalCalories = workouts?.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0) || 0;
  const avgDuration = totalWorkouts > 0 
    ? Math.round(workouts.reduce((sum, w) => sum + (w.duration || 0), 0) / totalWorkouts) 
    : 0;
  const categoryData = chartData?.categories || {};

  // Chart data
  const workoutChartData = {
    labels: chartData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workouts',
        data: chartData?.workouts || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00ff00',
        pointBorderColor: '#00ff00',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const caloriesChartData = {
    labels: chartData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Burned',
        data: chartData?.calories || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 165, 0, 0.7)',
        borderColor: '#ff8c00',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(categoryData).length > 0 ? Object.keys(categoryData) : ['No Data'],
    datasets: [
      {
        data: Object.keys(categoryData).length > 0 ? Object.values(categoryData) : [1],
        backgroundColor: [
          'rgba(0, 255, 0, 0.7)',
          'rgba(255, 165, 0, 0.7)',
          'rgba(0, 191, 255, 0.7)',
          'rgba(255, 0, 128, 0.7)',
          'rgba(128, 0, 255, 0.7)',
        ],
        borderColor: [
          '#00ff00',
          '#ff8c00',
          '#00bfff',
          '#ff0080',
          '#8000ff',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#d1d5db',
          font: { size: 12 },
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#00ff00]" />
            Analytics 📊
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your fitness insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-white focus:border-[#00ff00] outline-none text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-1">
            <Dumbbell className="w-5 h-5 text-[#00ff00]" />
          </div>
          <p className="text-2xl font-bold text-white">{totalWorkouts}</p>
          <p className="text-xs text-gray-400">Total Workouts</p>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-1">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-white">{totalCalories}</p>
          <p className="text-xs text-gray-400">Calories Burned</p>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-1">
            <Zap className="w-5 h-5 text-[#00ff00]" />
          </div>
          <p className="text-2xl font-bold text-white">{streak || 0}</p>
          <p className="text-xs text-gray-400">Day Streak</p>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-1">
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-white">{achievements?.length || 0}</p>
          <p className="text-xs text-gray-400">Achievements</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Frequency */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <h3 className="text-white font-semibold mb-4">Workout Frequency</h3>
          <div className="h-64">
            <Line data={workoutChartData} options={chartOptions} />
          </div>
        </div>

        {/* Calories Burned */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <h3 className="text-white font-semibold mb-4">Calories Burned</h3>
          <div className="h-64">
            <Bar data={caloriesChartData} options={chartOptions} />
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <h3 className="text-white font-semibold mb-4">Workout Categories</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={categoryChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#d1d5db',
                      padding: 15,
                      font: { size: 12 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-[#12121e] rounded-xl">
              <span className="text-gray-400 text-sm">Avg. Duration</span>
              <span className="text-white font-semibold">{avgDuration} min</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#12121e] rounded-xl">
              <span className="text-gray-400 text-sm">Level</span>
              <span className="text-white font-semibold">{level}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#12121e] rounded-xl">
              <span className="text-gray-400 text-sm">Total XP</span>
              <span className="text-white font-semibold">{xp}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#12121e] rounded-xl">
              <span className="text-gray-400 text-sm">Achievements</span>
              <span className="text-white font-semibold">{achievements?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;