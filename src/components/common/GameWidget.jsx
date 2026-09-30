import React from 'react';
import { Trophy, Zap, Award, Flame } from 'lucide-react';
import { useGame } from '../../Context/GameContext';

const GameWidget = () => {
  const { xp, level, streak, achievements, getXpForLevel } = useGame();
  
  const xpForNextLevel = getXpForLevel(level);
  const progress = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-bold">Level {level}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-[#00ff00]" />
            <span className="text-white text-sm font-semibold">{xp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-white text-sm font-semibold">{streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-purple-500" />
            <span className="text-white text-sm font-semibold">{achievements.length}</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 mt-1 block text-right">
          {xp} / {xpForNextLevel} XP to next level
        </span>
      </div>
    </div>
  );
};

export default GameWidget;