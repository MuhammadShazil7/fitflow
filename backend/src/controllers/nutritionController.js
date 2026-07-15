const Nutrition = require('../models/Nutrition');

// @desc    Create nutrition entry
// @route   POST /api/nutrition
// @access  Private
const createEntry = async (req, res) => {
  try {
    const entry = await Nutrition.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error('Create Nutrition Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all nutrition entries
// @route   GET /api/nutrition
// @access  Private
const getEntries = async (req, res) => {
  try {
    const { mealType, startDate, endDate, limit = 50 } = req.query;

    const query = { user: req.user._id };

    if (mealType) query.mealType = mealType;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const entries = await Nutrition.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (error) {
    console.error('Get Nutrition Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single nutrition entry
// @route   GET /api/nutrition/:id
// @access  Private
const getEntry = async (req, res) => {
  try {
    const entry = await Nutrition.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition entry not found',
      });
    }

    res.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error('Get Nutrition Entry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update nutrition entry
// @route   PUT /api/nutrition/:id
// @access  Private
const updateEntry = async (req, res) => {
  try {
    let entry = await Nutrition.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition entry not found',
      });
    }

    entry = await Nutrition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error('Update Nutrition Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete nutrition entry
// @route   DELETE /api/nutrition/:id
// @access  Private
const deleteEntry = async (req, res) => {
  try {
    const entry = await Nutrition.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition entry not found',
      });
    }

    await entry.deleteOne();

    res.json({
      success: true,
      message: 'Nutrition entry deleted successfully',
    });
  } catch (error) {
    console.error('Delete Nutrition Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get daily summary
// @route   GET /api/nutrition/summary/daily
// @access  Private
const getDailySummary = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await Nutrition.find({
      user: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const summary = {
      date: targetDate,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      meals: {},
    };

    entries.forEach(entry => {
      summary.totalCalories += entry.totalCalories || 0;
      summary.totalProtein += entry.totalProtein || 0;
      summary.totalCarbs += entry.totalCarbs || 0;
      summary.totalFat += entry.totalFat || 0;
      summary.totalFiber += entry.totalFiber || 0;

      if (!summary.meals[entry.mealType]) {
        summary.meals[entry.mealType] = {
          count: 0,
          calories: 0,
          items: [],
        };
      }

      summary.meals[entry.mealType].count += 1;
      summary.meals[entry.mealType].calories += entry.totalCalories || 0;
      summary.meals[entry.mealType].items.push(entry);
    });

    res.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('Get Daily Summary Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  getDailySummary,
};