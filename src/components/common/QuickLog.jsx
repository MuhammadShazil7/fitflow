import React, { useState } from 'react';
import { Zap, Dumbbell } from 'lucide-react';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useGame } from '../../Context/GameContext';
import toast from 'react-hot-toast';

const QuickLog = () => {
  const { addWorkout } = useWorkouts();
  const { trackWorkout } = useGame();
  const [loading, setLoading] = useState(false);

  const quickWorkouts = [
    { name: 'Quick Push-ups', duration: 5, calories: 50 },
    { name: 'Quick Squats', duration: 5, calories: 45 },
    { name: 'Quick Run', duration: 10, calories: 80 },
    { name: 'Quick Abs', duration: 5, calories: 40 },
  ];

  const handleQuickLog = async (workout) => {
    setLoading(true);
    
    const workoutData = {
      name: workout.name,
      category: 'cardio',
      duration: workout.duration,
      caloriesBurned: workout.calories,
      exercises: [{ name: workout.name, sets: 1, reps: 1, weight: 0 }],
      intensity: 'medium',
      notes: 'Quick logged workout ⚡',
    };

    const result = await addWorkout(workoutData);
    
    if (result.success) {
      // ✅ Pass workout name to trackWorkout
      trackWorkout(workout.name);
      toast.success(`✅ ${workout.name} logged! ⚡ +20 XP`);
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-[#00ff00]" />
        <h3 className="text-white font-semibold text-sm">Quick Log ⚡</h3>
        <span className="text-xs text-gray-400 ml-auto">One-tap</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {quickWorkouts.map((item, index) => (
          <button
            key={index}
            onClick={() => handleQuickLog(item)}
            disabled={loading}
            className="bg-[#12121e] hover:bg-[#1a1a2e] border border-[#00ff00]/10 hover:border-[#00ff00]/30 rounded-xl p-2.5 text-center transition-all duration-300 group disabled:opacity-50"
          >
            <Dumbbell className="w-4 h-4 text-[#00ff00] mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
            <p className="text-white text-xs font-medium">{item.name.replace('Quick ', '')}</p>
            <p className="text-[10px] text-gray-500">{item.duration}min • {item.calories}kcal</p>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-2">
        ⚡ +20 XP • Streak count • Achievements
      </p>
    </div>
  );
};

export default QuickLog;