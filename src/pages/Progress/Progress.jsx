import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  LineChart,
  Calendar,
  Award,
  Target,
  Weight,
  Ruler,
  Dumbbell,
  ChevronDown,
  Plus,
  ArrowUp,
  ArrowDown,
   Home,
   User
} from 'lucide-react';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    { label: 'Weight', value: '72.5 kg', change: '-1.2', icon: <Weight className="w-5 h-5" /> },
    { label: 'Body Fat', value: '15.5%', change: '-0.8', icon: <Target className="w-5 h-5" /> },
    { label: 'Muscle Mass', value: '35.2 kg', change: '+0.6', icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'BMI', value: '22.4', change: '-0.3', icon: <Ruler className="w-5 h-5" /> },
  ];

  const weeklyData = [
    { day: 'Mon', weight: 73.2, bodyFat: 16.0 },
    { day: 'Tue', weight: 72.8, bodyFat: 15.8 },
    { day: 'Wed', weight: 73.0, bodyFat: 15.9 },
    { day: 'Thu', weight: 72.5, bodyFat: 15.5 },
    { day: 'Fri', weight: 72.6, bodyFat: 15.6 },
    { day: 'Sat', weight: 72.3, bodyFat: 15.4 },
    { day: 'Sun', weight: 72.5, bodyFat: 15.5 },
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, label: '10 Workouts', progress: 100, completed: true },
    { icon: <Target className="w-5 h-5" />, label: '5kg Lost', progress: 60, completed: false },
    { icon: <TrendingUp className="w-5 h-5" />, label: '7 Day Streak', progress: 85, completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Progress 📊</h1>
            <p className="text-gray-400 text-sm">Track your fitness journey</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <Plus className="w-4 h-4" />
            Log Progress
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                  {stat.icon}
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-1 text-sm ${stat.change.startsWith('+') ? 'text-[#00ff00]' : 'text-red-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                <span>{stat.change}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weight Chart */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Weight Tracking</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#12121e] text-gray-400 text-sm rounded-xl px-3 py-1.5 border border-[#00ff00]/10 focus:border-[#00ff00] outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-[#00ff00] rounded-t-lg transition-all duration-500"
                  style={{ 
                    height: `${(data.weight / 75) * 80}px`,
                    opacity: data.weight > 72 ? 1 : 0.5
                  }}
                ></div>
                <span className="text-xs text-gray-500">{data.day}</span>
                <span className="text-xs text-gray-400">{data.weight}kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
          <h3 className="text-white font-semibold mb-4">Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${achievement.completed ? 'bg-[#00ff00]/20' : 'bg-[#12121e]'} flex items-center justify-center ${achievement.completed ? 'text-[#00ff00]' : 'text-gray-500'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{achievement.label}</p>
                  <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{achievement.progress}%</span>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};



export default Progress;