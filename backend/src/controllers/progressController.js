const Progress = require('../models/Progress');

// @desc    Create progress entry
// @route   POST /api/progress
// @access  Private
const createProgress = async (req, res) => {
  try {
    const progress = await Progress.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('Create Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all progress entries
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const { startDate, endDate, limit = 50 } = req.query;

    const query = { user: req.user._id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const entries = await Progress.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (error) {
    console.error('Get Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single progress entry
// @route   GET /api/progress/:id
// @access  Private
const getProgressEntry = async (req, res) => {
  try {
    const entry = await Progress.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Progress entry not found',
      });
    }

    res.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error('Get Progress Entry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update progress entry
// @route   PUT /api/progress/:id
// @access  Private
const updateProgress = async (req, res) => {
  try {
    let entry = await Progress.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Progress entry not found',
      });
    }

    entry = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error('Update Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete progress entry
// @route   DELETE /api/progress/:id
// @access  Private
const deleteProgress = async (req, res) => {
  try {
    const entry = await Progress.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Progress entry not found',
      });
    }

    await entry.deleteOne();

    res.json({
      success: true,
      message: 'Progress entry deleted successfully',
    });
  } catch (error) {
    console.error('Delete Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get progress analytics
// @route   GET /api/progress/analytics
// @access  Private
const getProgressAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const now = new Date();
    let startDate = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const entries = await Progress.find({
      user: req.user._id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    const weightData = entries
      .filter(e => e.weight)
      .map(e => ({
        date: e.date,
        weight: e.weight,
      }));

    const bodyFatData = entries
      .filter(e => e.bodyFat)
      .map(e => ({
        date: e.date,
        bodyFat: e.bodyFat,
      }));

    const weightTrend = weightData.length > 1
      ? ((weightData[weightData.length - 1].weight - weightData[0].weight) / weightData[0].weight * 100).toFixed(1)
      : 0;

    res.json({
      success: true,
      analytics: {
        totalEntries: entries.length,
        weightTrend,
        weightData,
        bodyFatData,
        latestEntry: entries[entries.length - 1] || null,
        period,
      },
    });
  } catch (error) {
    console.error('Get Progress Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  createProgress,
  getProgress,
  getProgressEntry,
  updateProgress,
  deleteProgress,
  getProgressAnalytics,
};