const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getLeaderboard,   
  getUserRank, 
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// ===== LEADERBOARD ROUTES (MUST come before /:id) =====
router.get('/leaderboard', protect, getLeaderboard);
router.get('/leaderboard/rank', protect, getUserRank);

// ===== POST ROUTES =====
router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/:id')
  .get(protect, getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
router.post('/:id/comments', protect, addComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

module.exports = router;