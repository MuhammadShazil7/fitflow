import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Star, 
  Crown, 
  Zap, 
  Flame,
  Dumbbell,
  TrendingUp,
  Target,
  Lock,
  CheckCircle
} from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { 
      id: 1,
      title: 'First Workout',
      description: 'Complete your first workout',
      icon: <Dumbbell className="w-8 h-8" />,
      unlocked: true,
      date: '2024-01-01'
    },
    { 
      id: 2,
      title: '7 Day Streak',
      description: 'Workout for 7 days in a row',
      icon: <Zap className="w-8 h-8" />,
      unlocked: true,
      date: '2024-01-07'
    },
    { 
      id: 3,
      title: 'Iron Warrior',
      description: 'Complete 50 workouts total',
      icon: <Dumbbell className="w-8 h-8" />,
      unlocked: false,
      progress: 76
    },
    { 
      id: 4,
      title: 'Weight Loss',
      description: 'Lose 5kg of body weight',
      icon: <TrendingUp className="w-8 h-8" />,
      unlocked: false,
      progress: 60
    },
    { 
      id: 5,
      title: 'Streak Master',
      description: 'Maintain a 30-day streak',
      icon: <Flame className="w-8 h-8" />,
      unlocked: false,
      progress: 40
    },
    { 
      id: 6,
      title: 'Goal Achiever',
      description: 'Achieve your first fitness goal',
      icon: <Target className="w-8 h-8" />,
      unlocked: false,
      progress: 20
    },
  ];

  const unlocked = achievements.filter(a => a.unlocked);
  const total = achievements.length;

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-[#00ff00]" />
              Achievements 🏆
            </h1>
            <p className="text-gray-400 text-sm">Track your fitness milestones</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#00ff00]">{unlocked.length}</p>
            <p className="text-xs text-gray-400">of {total} unlocked</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Achievement Progress</span>
            <span className="text-[#00ff00]">{Math.round((unlocked.length / total) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
              style={{ width: `${(unlocked.length / total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`bg-[#0a0a1a] rounded-2xl p-4 text-center border transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-[#00ff00]/30 hover:border-[#00ff00]/60 shadow-[0_0_20px_rgba(0,255,0,0.05)]' 
                  : 'border-[#1a1a2e] opacity-60'
              }`}
            >
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                achievement.unlocked 
                  ? 'bg-[#00ff00]/20 text-[#00ff00]' 
                  : 'bg-[#12121e] text-gray-500'
              }`}>
                {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8" />}
              </div>
              <h3 className={`text-sm font-semibold mt-3 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                {achievement.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
              {achievement.unlocked ? (
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-[#00ff00]">
                  <CheckCircle className="w-3 h-3" />
                  Unlocked {new Date(achievement.date).toLocaleDateString()}
                </div>
              ) : (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{achievement.progress || 0}% complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;