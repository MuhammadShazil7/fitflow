const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
  },
  sets: {
    type: Number,
    required: [true, 'Sets are required'],
    min: [0, 'Sets cannot be negative'],
  },
  reps: {
    type: Number,
    required: [true, 'Reps are required'],
    min: [0, 'Reps cannot be negative'],
  },
  weight: {
    type: Number,
    default: 0,
    min: [0, 'Weight cannot be negative'],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
  },
}, { _id: true });

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Workout name is required'],
      trim: true,
      maxlength: [100, 'Workout name cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'endurance', 'hybrid'],
      required: [true, 'Category is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    exercises: {
      type: [ExerciseSchema],
      default: [],
    },
    duration: {
      type: Number,
      default: 0,
      min: [0, 'Duration cannot be negative'],
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: [0, 'Calories cannot be negative'],
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
WorkoutSchema.index({ user: 1, date: -1 });
WorkoutSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Workout', WorkoutSchema);