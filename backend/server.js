const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('🚀'.repeat(20));
  console.log(`🏃‍♂️ FitFlow Server Running!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log('🚀'.repeat(20));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});