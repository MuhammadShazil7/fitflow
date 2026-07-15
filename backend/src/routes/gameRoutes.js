const express = require('express');
const router = express.Router();
const {
  getGameData,
  updateGameData,
  addXp,
  trackWorkout,
} = require('../controllers/gameController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getGameData);
router.put('/', protect, updateGameData);
router.post('/add-xp', protect, addXp);
router.post('/track-workout', protect, trackWorkout);

module.exports = router;