const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    console.log('📝 Registration attempt:', { username, email });

    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      });
    }

    // Create user
    const user = await User.create({
      username,
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    console.log('✅ User registered:', user.username);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('❌ Get User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, username, profilePicture, preferences } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (username) user.username = username;
    if (profilePicture) user.profilePicture = profilePicture;
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }

    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('❌ Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
};