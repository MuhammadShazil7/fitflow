import { useState, useEffect } from 'react';
import { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost, 
  likePost, 
  addComment, 
  deleteComment 
} from '../Services/api'; // ✅ Now these exports exist
import toast from 'react-hot-toast';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data.posts || []);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (content, tags = []) => {
    try {
      const response = await createPost({ content, tags });
      setPosts(prev => [response.data.post, ...prev]);
      toast.success('Post created! 🎉');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
      return { success: false };
    }
  };

  const editPost = async (id, content, tags) => {
    try {
      const response = await updatePost(id, { content, tags });
      setPosts(prev => prev.map(p => p._id === id ? response.data.post : p));
      toast.success('Post updated!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post');
      return { success: false };
    }
  };

  const removePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p._id !== id));
      toast.success('Post deleted');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
      return { success: false };
    }
  };

  const toggleLike = async (id) => {
    try {
      const response = await likePost(id);
      setPosts(prev => prev.map(p => {
        if (p._id === id) {
          return {
            ...p,
            likes: response.data.liked ? [...p.likes, { _id: 'temp' }] : p.likes.filter(l => l._id !== 'temp'),
          };
        }
        return p;
      }));
      return { success: true };
    } catch (error) {
      toast.error('Failed to like post');
      return { success: false };
    }
  };

  const addCommentToPost = async (postId, text) => {
    try {
      const response = await addComment(postId, text);
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          return { ...p, comments: response.data.comments };
        }
        return p;
      }));
      toast.success('Comment added!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment');
      return { success: false };
    }
  };

  const removeComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          return { ...p, comments: p.comments.filter(c => c._id !== commentId) };
        }
        return p;
      }));
      toast.success('Comment deleted');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete comment');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    fetchPosts,
    addPost,
    editPost,
    removePost,
    toggleLike,
    addCommentToPost,
    removeComment,
  };
};