import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Award, 
  CheckCircle, 
  Lock, 
  Zap,
  Flame,
  Dumbbell,
  Target,
  TrendingUp,
  Crown,
  Star,
  Medal,
  Trophy,
  Home,
  BarChart3,
  User
} from 'lucide-react';
import { useGame } from '../../Context/GameContext';

const Achievements = () => {
  const { achievements, level, streak, totalWorkouts } = useGame();

  // ✅ Achievement definitions with NAMES that match what's saved
  const allAchievements = [
    { 
      id: '💪 First Workout',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 First Workout',
      description: 'Complete your first workout',
      category: 'workout'
    },
    { 
      id: '🔥 7 Day Streak',
      icon: <Flame className="w-8 h-8" />, 
      title: '🔥 7 Day Streak',
      description: 'Workout 7 days in a row',
      category: 'streak'
    },
    { 
      id: '🔥 30 Day Streak',
      icon: <Flame className="w-8 h-8" />, 
      title: '🔥 30 Day Streak',
      description: 'Workout 30 days in a row',
      category: 'streak'
    },
    { 
      id: '🔥 100 Day Streak',
      icon: <Flame className="w-8 h-8" />, 
      title: '🔥 100 Day Streak',
      description: 'Workout 100 days in a row',
      category: 'streak'
    },
    { 
      id: '💪 10 Workouts',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 10 Workouts',
      description: 'Complete 10 total workouts',
      category: 'workout'
    },
    { 
      id: '💪 25 Workouts',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 25 Workouts',
      description: 'Complete 25 total workouts',
      category: 'workout'
    },
    { 
      id: '💪 50 Workouts',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 50 Workouts',
      description: 'Complete 50 total workouts',
      category: 'workout'
    },
    { 
      id: '💪 100 Workouts',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 100 Workouts',
      description: 'Complete 100 total workouts',
      category: 'workout'
    },
    { 
      id: '💪 500 Workouts',
      icon: <Dumbbell className="w-8 h-8" />, 
      title: '💪 500 Workouts',
      description: 'Complete 500 total workouts',
      category: 'workout'
    },
    { 
      id: '⭐ Fitness Enthusiast',
      icon: <Star className="w-8 h-8" />, 
      title: '⭐ Fitness Enthusiast',
      description: 'Reach level 5',
      category: 'level'
    },
    { 
      id: '🏅 Dedicated Athlete',
      icon: <Medal className="w-8 h-8" />, 
      title: '🏅 Dedicated Athlete',
      description: 'Reach level 10',
      category: 'level'
    },
    { 
      id: '👑 Fitness Legend',
      icon: <Crown className="w-8 h-8" />, 
      title: '👑 Fitness Legend',
      description: 'Reach level 25',
      category: 'level'
    },
    { 
      id: '🏆 Gym Master',
      icon: <Trophy className="w-8 h-8" />, 
      title: '🏆 Gym Master',
      description: 'Reach level 50',
      category: 'level'
    },
  ];

  const isUnlocked = (id) => {
    return achievements?.includes(id) || false;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      workout: '💪 Workouts',
      streak: '🔥 Streaks',
      level: '🏆 Levels',
    };
    return labels[category] || 'Other';
  };

  const unlockedCount = allAchievements.filter(a => isUnlocked(a.id)).length;
  const totalCount = allAchievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  // Group achievements by category
  const groupedAchievements = allAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-[#00ff00]" />
          Achievements 🏆
        </h1>
        <p className="text-gray-400 text-sm mt-1">Track your fitness milestones</p>
      </div>

      {/* Progress */}
      <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-[#00ff00]">{unlockedCount}/{totalCount}</span>
        </div>
        <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span>🎯 {unlockedCount} Unlocked</span>
          <span>🔒 {totalCount - unlockedCount} Locked</span>
          <span>📊 {progress}% Complete</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-gray-400 mb-3">{getCategoryLabel(category)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map((achievement) => {
                const unlocked = isUnlocked(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`bg-[#0a0a1a] rounded-2xl p-4 border transition-all duration-300 ${
                      unlocked 
                        ? `border-[#00ff00]/30 hover:border-[#00ff00]/60 hover:shadow-[0_0_30px_rgba(0,255,0,0.05)]` 
                        : `border-[#1a1a2e] opacity-60`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        unlocked ? 'bg-[#00ff00]/10 text-[#00ff00]' : 'bg-[#12121e] text-gray-500'
                      }`}>
                        {unlocked ? achievement.icon : <Lock className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-sm font-semibold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-xs ${unlocked ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                          {achievement.description}
                        </p>
                        {unlocked && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <CheckCircle className="w-3 h-3 text-[#00ff00]" />
                            <span className="text-[10px] text-[#00ff00]">Unlocked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;