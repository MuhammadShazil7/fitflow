const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    bodyMeasurements: {
      chest: { type: Number, min: 0 },
      waist: { type: Number, min: 0 },
      hips: { type: Number, min: 0 },
      biceps: { type: Number, min: 0 },
      thighs: { type: Number, min: 0 },
      calves: { type: Number, min: 0 },
    },
    performanceMetrics: {
      maxBenchPress: { type: Number, min: 0 },
      maxSquat: { type: Number, min: 0 },
      maxDeadlift: { type: Number, min: 0 },
      runTime: { type: Number, min: 0 },
      distance: { type: Number, min: 0 },
      maxPullups: { type: Number, min: 0 },
    },
    bodyFat: {
      type: Number,
      min: [0, 'Body fat cannot be negative'],
      max: [100, 'Body fat cannot exceed 100'],
    },
    bmi: {
      type: Number,
      min: [0, 'BMI cannot be negative'],
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'tired', 'exhausted'],
    },
    sleepHours: {
      type: Number,
      min: [0, 'Sleep hours cannot be negative'],
      max: [24, 'Sleep hours cannot exceed 24'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

ProgressSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Progress', ProgressSchema);