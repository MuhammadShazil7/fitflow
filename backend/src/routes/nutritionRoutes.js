const express = require('express');
const router = express.Router();
const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  getDailySummary,
} = require('../controllers/nutritionController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createEntry)
  .get(protect, getEntries);

router.get('/summary/daily', protect, getDailySummary);
router.route('/:id')
  .get(protect, getEntry)
  .put(protect, updateEntry)
  .delete(protect, deleteEntry);

module.exports = router;