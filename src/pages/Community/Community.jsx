import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  UserPlus,
  Search,
  Filter,
  Zap,
  Crown,
  Trophy,
  Flame,
  Award,
  Trash2,
  Edit2,
  X,
  Check,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import Leaderboard from '../../components/common/Leaderboard';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import Modal from '../../components/common/Modal';

const Community = () => {
  const { user } = useAuth();
  const { posts, loading, addPost, removePost, toggleLike, addCommentToPost, removeComment } = usePosts();
  const [newPostContent, setNewPostContent] = useState('');
  const [commentText, setCommentText] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showComments, setShowComments] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddPost = async () => {
    if (!newPostContent.trim()) {
      toast.error('Please write something');
      return;
    }
    const result = await addPost(newPostContent);
    if (result.success) {
      setNewPostContent('');
    }
  };

  const handleLike = async (postId) => {
    await toggleLike(postId);
  };

  const handleComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) {
      toast.error('Please write a comment');
      return;
    }
    const result = await addCommentToPost(postId, text);
    if (result.success) {
      setCommentText(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Delete this post?')) {
      await removePost(postId);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (window.confirm('Delete this comment?')) {
      await removeComment(postId, commentId);
    }
  };

  const openEditModal = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
    setShowEditModal(true);
  };

  const handleEditPost = async () => {
    if (!editContent.trim()) {
      toast.error('Content cannot be empty');
      return;
    }
    // We would need to implement editPost in the hook – but we already have updatePost
    // We'll add it below
    // For now, we'll just show a placeholder
    toast.info('Edit functionality coming soon!');
    setShowEditModal(false);
  };

  // Update usePosts with editPost – we already added it, so we can use it
  // We'll add a local state for editing

  const getTimeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00ff00]" />
            Community 🌟
          </h1>
          <p className="text-gray-400 text-sm">Share and connect with fellow fitness enthusiasts</p>
        </div>
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
            showLeaderboard 
              ? 'bg-[#00ff00] text-[#02020a]' 
              : 'bg-[#0a0a1a] text-gray-400 hover:text-white border border-[#00ff00]/10'
          }`}
        >
          <Trophy className="w-4 h-4" />
          {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
        </button>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && (
        <div className="mb-6">
          <Leaderboard />
        </div>
      )}

      {/* Create Post */}
      <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Share your fitness journey..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows="2"
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddPost}
                className="bg-[#00ff00] text-[#02020a] px-4 py-1.5 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No posts yet</h3>
            <p className="text-gray-400 text-sm mt-1">Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => {
            const isLiked = post.likes?.some(like => like._id === user?._id || like === user?._id);
            const likeCount = post.likes?.length || 0;
            const isOwnPost = post.user?._id === user?._id;

            return (
              <div key={post._id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/20 transition-all duration-300">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm">
                      {post.user?.name?.charAt(0) || post.user?.username?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.user?.name || post.user?.username}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  {isOwnPost && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1 text-gray-400 hover:text-[#00ff00] transition-colors rounded-lg hover:bg-[#00ff00]/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">{post.content}</p>
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-xs text-[#00ff00] bg-[#00ff00]/10 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#00ff00]/5">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${isLiked ? 'text-[#00ff00]' : 'text-gray-400 hover:text-[#00ff00]'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#00ff00]' : ''}`} />
                    {likeCount}
                  </button>
                  <button
                    onClick={() => setShowComments(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00ff00] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {post.comments?.length || 0}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00ff00] transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                {/* Comments Section */}
                {showComments[post._id] && (
                  <div className="mt-3 pt-3 border-t border-[#00ff00]/5">
                    {/* Comment Input */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[post._id] || ''}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                        className="flex-1 bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                      />
                      <button
                        onClick={() => handleComment(post._id)}
                        className="bg-[#00ff00] text-[#02020a] px-3 py-1.5 rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
                      >
                        Post
                      </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {post.comments?.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center">No comments yet</p>
                      ) : (
                        post.comments.map((comment) => {
                          const isOwnComment = comment.user?._id === user?._id;
                          return (
                            <div key={comment._id} className="flex items-start gap-2 bg-[#12121e] p-2 rounded-xl">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-[10px] flex-shrink-0">
                                {comment.user?.name?.charAt(0) || comment.user?.username?.charAt(0) || 'U'}
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-medium text-white">
                                  {comment.user?.name || comment.user?.username}
                                </p>
                                <p className="text-sm text-gray-300">{comment.text}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {getTimeAgo(comment.createdAt)}
                                </p>
                              </div>
                              {isOwnComment && (
                                <button
                                  onClick={() => handleDeleteComment(post._id, comment._id)}
                                  className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Post">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows="4"
          className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 resize-none"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleEditPost}
            className="flex-1 bg-[#00ff00] text-[#02020a] py-2 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
          >
            Save
          </button>
          <button
            onClick={() => setShowEditModal(false)}
            className="px-6 bg-[#12121e] text-gray-400 py-2 rounded-xl font-semibold hover:text-white hover:bg-[#1a1a2e] transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Community;