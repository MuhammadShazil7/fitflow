const Post = require('../models/Post');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    const post = await Post.create({
      user: req.user._id,
      content,
      tags: tags || [],
    });

    // Populate user info
    await post.populate('user', 'name username profilePicture');

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all posts (feed)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name username profilePicture')
      .populate('comments.user', 'name username profilePicture')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error('Get Posts Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Private
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name username profilePicture')
      .populate('comments.user', 'name username profilePicture');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, post });
  } catch (error) {
    console.error('Get Post Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this post' });
    }

    post.content = content || post.content;
    post.tags = tags || post.tags;
    await post.save();

    await post.populate('user', 'name username profilePicture');

    res.json({ success: true, post });
  } catch (error) {
    console.error('Update Post Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Post Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      likes: post.likes.length,
      liked: likeIndex === -1,
    });
  } catch (error) {
    console.error('Like Post Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate('comments.user', 'name username profilePicture');

    res.status(201).json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error('Add Comment Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
    }

    comment.deleteOne();
    await post.save();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete Comment Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get leaderboard (users ranked by activity)
// @route   GET /api/posts/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
  try {
    // Get all users with their post counts, like counts, and comment counts
    const posts = await Post.find()
      .populate('user', 'name username profilePicture')
      .lean();

    // Calculate stats per user
    const userStats = {};
    
    posts.forEach(post => {
      const userId = post.user._id.toString();
      
      if (!userStats[userId]) {
        userStats[userId] = {
          user: post.user,
          posts: 0,
          likes: 0,
          comments: 0,
          totalActivity: 0,
        };
      }
      
      userStats[userId].posts += 1;
      userStats[userId].likes += post.likes?.length || 0;
      userStats[userId].comments += post.comments?.length || 0;
    });

    // Calculate total activity score
    const leaderboard = Object.values(userStats).map(user => ({
      ...user,
      totalActivity: user.posts + user.likes + user.comments,
    }));

    // Sort by total activity (descending)
    leaderboard.sort((a, b) => b.totalActivity - a.totalActivity);

    // Add ranks
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({
      success: true,
      leaderboard: rankedLeaderboard.slice(0, 20), // Top 20 users
    });
  } catch (error) {
    console.error('Leaderboard Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user's rank
// @route   GET /api/posts/leaderboard/rank
// @access  Private
const getUserRank = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const posts = await Post.find()
      .populate('user', 'name username profilePicture')
      .lean();

    const userStats = {};
    
    posts.forEach(post => {
      const id = post.user._id.toString();
      
      if (!userStats[id]) {
        userStats[id] = {
          user: post.user,
          posts: 0,
          likes: 0,
          comments: 0,
          totalActivity: 0,
        };
      }
      
      userStats[id].posts += 1;
      userStats[id].likes += post.likes?.length || 0;
      userStats[id].comments += post.comments?.length || 0;
    });

    const leaderboard = Object.values(userStats).map(user => ({
      ...user,
      totalActivity: user.posts + user.likes + user.comments,
    }));

    leaderboard.sort((a, b) => b.totalActivity - a.totalActivity);

    const userRank = leaderboard.findIndex(u => u.user._id.toString() === userId.toString()) + 1;

    res.json({
      success: true,
      rank: userRank || 0,
      totalUsers: leaderboard.length,
    });
  } catch (error) {
    console.error('User Rank Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getLeaderboard,
  getUserRank
};