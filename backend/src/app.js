const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const goalRoutes = require('./routes/goalRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/goals', goalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FitFlow API is running',
    version: '1.0.0',
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;