const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    target: {
      type: String,
      required: [true, 'Target is required'],
    },
    current: {
      type: String,
      default: '0',
    },
    category: {
      type: String,
      enum: ['weight', 'strength', 'cardio', 'general', 'nutrition'],
      required: [true, 'Category is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

GoalSchema.index({ user: 1, status: 1 });
GoalSchema.index({ user: 1, deadline: 1 });

module.exports = mongoose.model('Goal', GoalSchema);