const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutAnalytics,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createWorkout)
  .get(protect, getWorkouts);

router.get('/analytics', protect, getWorkoutAnalytics);
router.route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;