const User = require('../models/User');

// @desc    Get user game data
// @route   GET /api/game
// @access  Private
const getGameData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      gameData: user.gameData || {
        xp: 0,
        level: 1,
        streak: 0,
        lastWorkoutDate: null,
        achievements: [],
        totalWorkouts: 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update game data
// @route   PUT /api/game
// @access  Private
const updateGameData = async (req, res) => {
  try {
    const { xp, level, streak, lastWorkoutDate, achievements, totalWorkouts } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Update game data
    user.gameData = {
      xp: xp !== undefined ? xp : user.gameData.xp,
      level: level !== undefined ? level : user.gameData.level,
      streak: streak !== undefined ? streak : user.gameData.streak,
      lastWorkoutDate: lastWorkoutDate !== undefined ? lastWorkoutDate : user.gameData.lastWorkoutDate,
      achievements: achievements !== undefined ? achievements : user.gameData.achievements,
      totalWorkouts: totalWorkouts !== undefined ? totalWorkouts : user.gameData.totalWorkouts,
    };
    
    await user.save();
    
    res.json({
      success: true,
      gameData: user.gameData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Add XP and check level up
// @route   POST /api/game/add-xp
// @access  Private
const addXp = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);
    
    const xpForNextLevel = Math.floor(100 * Math.pow(1.2, user.gameData.level - 1));
    let newXp = user.gameData.xp + amount;
    let newLevel = user.gameData.level;
    let leveledUp = false;
    
    if (newXp >= xpForNextLevel) {
      newLevel = user.gameData.level + 1;
      newXp = newXp - xpForNextLevel;
      leveledUp = true;
    }
    
    user.gameData.xp = newXp;
    user.gameData.level = newLevel;
    await user.save();
    
    res.json({
      success: true,
      leveledUp,
      gameData: user.gameData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Track workout (adds XP, updates streak, checks achievements)
// @route   POST /api/game/track-workout
// @access  Private
const trackWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Update total workouts
    const newTotal = (user.gameData.totalWorkouts || 0) + 1;
    user.gameData.totalWorkouts = newTotal;
    
    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (user.gameData.lastWorkoutDate) {
      const lastDate = new Date(user.gameData.lastWorkoutDate).toDateString();
      
      if (lastDate === today) {
        // Already logged today
      } else if (lastDate === yesterday.toDateString()) {
        user.gameData.streak = (user.gameData.streak || 0) + 1;
      } else {
        user.gameData.streak = 1;
      }
    } else {
      user.gameData.streak = 1;
    }
    
    user.gameData.lastWorkoutDate = new Date();
    
    // Check achievements
    const achievements = user.gameData.achievements || [];
    
    // First workout
    if (newTotal === 1 && !achievements.includes('💪 First Workout')) {
      achievements.push('💪 First Workout');
    }
    if (newTotal === 10 && !achievements.includes('💪 10 Workouts')) {
      achievements.push('💪 10 Workouts');
    }
    if (newTotal === 25 && !achievements.includes('💪 25 Workouts')) {
      achievements.push('💪 25 Workouts');
    }
    if (newTotal === 50 && !achievements.includes('💪 50 Workouts')) {
      achievements.push('💪 50 Workouts');
    }
    if (newTotal === 100 && !achievements.includes('💪 100 Workouts')) {
      achievements.push('💪 100 Workouts');
    }
    if (newTotal === 500 && !achievements.includes('💪 500 Workouts')) {
      achievements.push('💪 500 Workouts');
    }
    
    // Streak achievements
    if (user.gameData.streak === 7 && !achievements.includes('🔥 7 Day Streak')) {
      achievements.push('🔥 7 Day Streak');
    }
    if (user.gameData.streak === 30 && !achievements.includes('🔥 30 Day Streak')) {
      achievements.push('🔥 30 Day Streak');
    }
    if (user.gameData.streak === 100 && !achievements.includes('🔥 100 Day Streak')) {
      achievements.push('🔥 100 Day Streak');
    }
    
    // Level achievements
    if (user.gameData.level >= 5 && !achievements.includes('⭐ Fitness Enthusiast')) {
      achievements.push('⭐ Fitness Enthusiast');
    }
    if (user.gameData.level >= 10 && !achievements.includes('🏅 Dedicated Athlete')) {
      achievements.push('🏅 Dedicated Athlete');
    }
    if (user.gameData.level >= 25 && !achievements.includes('👑 Fitness Legend')) {
      achievements.push('👑 Fitness Legend');
    }
    if (user.gameData.level >= 50 && !achievements.includes('🏆 Gym Master')) {
      achievements.push('🏆 Gym Master');
    }
    
    user.gameData.achievements = achievements;
    
    // Add XP
    const xpForNextLevel = Math.floor(100 * Math.pow(1.2, user.gameData.level - 1));
    let newXp = user.gameData.xp + 20;
    
    if (newXp >= xpForNextLevel) {
      user.gameData.level = user.gameData.level + 1;
      user.gameData.xp = newXp - xpForNextLevel;
    } else {
      user.gameData.xp = newXp;
    }
    
    await user.save();
    
    res.json({
      success: true,
      gameData: user.gameData,
      newAchievements: achievements.filter(a => !user.gameData.achievements.includes(a)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getGameData,
  updateGameData,
  addXp,
  trackWorkout,
};