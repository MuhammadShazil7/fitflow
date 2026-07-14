const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    enum: ['g', 'kg', 'ml', 'l', 'oz', 'lb', 'cup', 'tbsp', 'tsp', 'piece'],
    default: 'g',
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: [0, 'Calories cannot be negative'],
  },
  protein: {
    type: Number,
    default: 0,
    min: [0, 'Protein cannot be negative'],
  },
  carbs: {
    type: Number,
    default: 0,
    min: [0, 'Carbs cannot be negative'],
  },
  fat: {
    type: Number,
    default: 0,
    min: [0, 'Fat cannot be negative'],
  },
  fiber: {
    type: Number,
    default: 0,
    min: [0, 'Fiber cannot be negative'],
  },
}, { _id: true });

const NutritionSchema = new mongoose.Schema(
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
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack', 'pre-workout', 'post-workout'],
      required: [true, 'Meal type is required'],
    },
    foodItems: {
      type: [FoodItemSchema],
      default: [],
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalProtein: {
      type: Number,
      default: 0,
    },
    totalCarbs: {
      type: Number,
      default: 0,
    },
    totalFat: {
      type: Number,
      default: 0,
    },
    totalFiber: {
      type: Number,
      default: 0,
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

// Calculate totals before saving
NutritionSchema.pre('save', function (next) {
  this.totalCalories = this.foodItems.reduce((sum, item) => sum + (item.calories || 0), 0);
  this.totalProtein = this.foodItems.reduce((sum, item) => sum + (item.protein || 0), 0);
  this.totalCarbs = this.foodItems.reduce((sum, item) => sum + (item.carbs || 0), 0);
  this.totalFat = this.foodItems.reduce((sum, item) => sum + (item.fat || 0), 0);
  this.totalFiber = this.foodItems.reduce((sum, item) => sum + (item.fiber || 0), 0);
  next();
});

NutritionSchema.index({ user: 1, date: -1 });
NutritionSchema.index({ user: 1, mealType: 1 });

module.exports = mongoose.model('Nutrition', NutritionSchema);