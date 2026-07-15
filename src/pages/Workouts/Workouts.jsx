import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Dumbbell, 
  Clock, 
  ChevronRight, 
  Play, 
  Flame, 
  Search,
  Filter,
  Plus,
  Calendar,
  TrendingUp,
  Zap,
   Home, BarChart3, User
} from 'lucide-react';


const Workouts = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const workouts = [
    { 
      id: 1,
      name: 'HIIT & Strength',
      duration: '10 min',
      calories: 280,
      level: 'Intermediate',
      category: 'strength',
      exercises: 8,
      color: '#00ff00'
    },
    { 
      id: 2,
      name: 'Morning Run',
      duration: '45 min',
      calories: 400,
      level: 'Beginner',
      category: 'cardio',
      exercises: 5,
      color: '#24cb24'
    },
    { 
      id: 3,
      name: 'Yoga Flow',
      duration: '30 min',
      calories: 180,
      level: 'All Levels',
      category: 'flexibility',
      exercises: 12,
      color: '#50d650'
    },
    { 
      id: 4,
      name: 'Upper Body Blast',
      duration: '25 min',
      calories: 320,
      level: 'Advanced',
      category: 'strength',
      exercises: 10,
      color: '#7ce07c'
    },
    { 
      id: 5,
      name: 'Core Crusher',
      duration: '15 min',
      calories: 200,
      level: 'Intermediate',
      category: 'strength',
      exercises: 6,
      color: '#a8eba8'
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'strength', label: 'Strength' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'flexibility', label: 'Flexibility' },
  ];

  const filteredWorkouts = activeFilter === 'all' 
    ? workouts 
    : workouts.filter(w => w.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Workouts 💪</h1>
            <p className="text-gray-400 text-sm">Track your workouts and progress</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <Plus className="w-4 h-4" />
            New Workout
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search workouts..."
            className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
          />
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

        {/* Workout List */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <Link
              key={workout.id}
              to={`/workouts/${workout.id}`}
              className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 hover:shadow-[0_0_30px_rgba(0,255,0,0.05)] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${workout.color}20` }}
                  >
                    <Dumbbell className="w-6 h-6" style={{ color: workout.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-[#00ff00] transition-colors">
                      {workout.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {workout.duration}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#00ff00]" /> {workout.calories} kcal
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full">
                        {workout.level}
                      </span>
                      <span className="text-xs text-gray-400">
                        {workout.exercises} exercises
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Start
                </button>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};



export default Workouts;