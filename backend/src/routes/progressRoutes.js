const express = require('express');
const router = express.Router();
const {
  createProgress,
  getProgress,
  getProgressEntry,
  updateProgress,
  deleteProgress,
  getProgressAnalytics,
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createProgress)
  .get(protect, getProgress);

router.get('/analytics', protect, getProgressAnalytics);
router.route('/:id')
  .get(protect, getProgressEntry)
  .put(protect, updateProgress)
  .delete(protect, deleteProgress);

module.exports = router;