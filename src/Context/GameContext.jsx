import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import toast from 'react-hot-toast';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export const GameProvider = ({ children }) => {
  const { user } = useAuth();
  const { notifyAchievement, notifyStreak, notifyWorkout } = useNotifications();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lastWorkoutDate, setLastWorkoutDate] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGameData();
    }
  }, [user]);

  const loadGameData = () => {
    try {
      const saved = localStorage.getItem(`game_${user._id}`);
      if (saved) {
        const data = JSON.parse(saved);
        setXp(data.xp || 0);
        setLevel(data.level || 1);
        setStreak(data.streak || 0);
        setLastWorkoutDate(data.lastWorkoutDate || null);
        setAchievements(data.achievements || []);
        setTotalWorkouts(data.totalWorkouts || 0);
      }
    } catch (error) {
      console.error('Failed to load game data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGameData = () => {
    if (user) {
      localStorage.setItem(`game_${user._id}`, JSON.stringify({
        xp,
        level,
        streak,
        lastWorkoutDate,
        achievements,
        totalWorkouts,
      }));
    }
  };

  useEffect(() => {
    saveGameData();
  }, [xp, level, streak, lastWorkoutDate, achievements, totalWorkouts]);

  const getXpForLevel = (level) => {
    return Math.floor(100 * Math.pow(1.2, level - 1));
  };

  const addXp = (amount, source = 'workout') => {
    const newXp = xp + amount;
    const xpForNextLevel = getXpForLevel(level);
    
    if (newXp >= xpForNextLevel) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setXp(newXp - xpForNextLevel);
      
      if (newLevel === 5) unlockAchievement('⭐ Fitness Enthusiast');
      if (newLevel === 10) unlockAchievement('🏅 Dedicated Athlete');
      if (newLevel === 25) unlockAchievement('👑 Fitness Legend');
      if (newLevel === 50) unlockAchievement('🏆 Gym Master');
      
      toast.success(`🎉 LEVEL UP! You're now level ${newLevel}!`, {
        duration: 5000,
        icon: '🏆',
      });
    } else {
      setXp(newXp);
    }
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    
    if (lastWorkoutDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastWorkoutDate === yesterdayString) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      if (newStreak % 7 === 0) {
        addXp(25, 'streak_bonus');
        toast.success(`🔥 ${newStreak} day streak! +25 XP bonus!`);
      }
      
      if (newStreak === 7) {
        unlockAchievement('🔥 7 Day Streak');
        notifyStreak(7);
      }
      if (newStreak === 30) {
        unlockAchievement('🔥 30 Day Streak');
        notifyStreak(30);
        addXp(100, 'streak_achievement');
      }
      if (newStreak === 100) {
        unlockAchievement('🔥 100 Day Streak');
        notifyStreak(100);
        addXp(500, 'streak_achievement');
      }
    } else {
      setStreak(1);
    }
    
    setLastWorkoutDate(today);
  };

  const unlockAchievement = (name) => {
    if (!achievements.includes(name)) {
      setAchievements([...achievements, name]);
      console.log('🔔 Unlocking achievement, calling notifyAchievement:', name);
      notifyAchievement(name);
      toast.success(`🏆 Achievement Unlocked: ${name}!`, {
        duration: 4000,
      });
      addXp(50, 'achievement');
    }
  };

  const checkWorkoutAchievements = (count) => {
    if (count === 1) {
      unlockAchievement('💪 First Workout');
      addXp(50, 'first_workout');
    }
    if (count === 10) unlockAchievement('💪 10 Workouts');
    if (count === 25) unlockAchievement('💪 25 Workouts');
    if (count === 50) unlockAchievement('💪 50 Workouts');
    if (count === 100) unlockAchievement('💪 100 Workouts');
    if (count === 500) unlockAchievement('💪 500 Workouts');
  };

  // ✅ TRACK WORKOUT - THIS IS THE FIX
  const trackWorkout = (workoutName) => {
    console.log('🔔 trackWorkout called with:', workoutName);
    
    const newTotal = totalWorkouts + 1;
    setTotalWorkouts(newTotal);
    updateStreak();
    checkWorkoutAchievements(newTotal);
    addXp(20, 'workout');
    
    // ✅ CALL NOTIFICATION - THIS IS WHAT WAS MISSING
    console.log('🔔 About to call notifyWorkout with:', workoutName);
    notifyWorkout(workoutName || 'Workout');
    console.log('🔔 notifyWorkout called successfully');
  };

  const quickLog = (workoutName) => {
    const newTotal = totalWorkouts + 1;
    setTotalWorkouts(newTotal);
    updateStreak();
    checkWorkoutAchievements(newTotal);
    addXp(20, 'quick_log');
    notifyWorkout(workoutName || 'Quick Log');
    toast.success(`⚡ Quick workout logged! +20 XP`);
  };

  const value = {
    xp,
    level,
    streak,
    achievements,
    totalWorkouts,
    loading,
    addXp,
    trackWorkout,
    quickLog,
    getXpForLevel,
    loadGameData,
    unlockAchievement,
    updateStreak,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};