import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp, User, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SocialFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate fetching posts
  useEffect(() => {
    // In production, this would fetch from an API
    const mockPosts = [
      {
        id: 1,
        user: 'Sarah Johnson',
        avatar: 'SJ',
        content: 'Just crushed my 50th workout! 💪 Feeling unstoppable! 🚀',
        time: '2 hours ago',
        likes: 24,
        comments: 8,
        liked: false,
      },
      {
        id: 2,
        user: 'Mike Chen',
        avatar: 'MC',
        content: 'New PR on bench press! 100kg x 5 reps 🏋️‍♂️',
        time: '4 hours ago',
        likes: 18,
        comments: 5,
        liked: false,
      },
      {
        id: 3,
        user: 'Emma Wilson',
        avatar: 'EW',
        content: '5km run in 22:30! New personal best 🏃‍♀️',
        time: '6 hours ago',
        likes: 32,
        comments: 12,
        liked: false,
      },
    ];
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      user: user?.name || user?.username || 'Anonymous',
      avatar: user?.name?.charAt(0) || 'U',
      content: newPost,
      time: 'Just now',
      likes: 0,
      comments: 0,
      liked: false,
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-400">Loading feed...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <input
            type="text"
            placeholder="Share your fitness journey..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
          />
          <button 
            onClick={handlePost}
            className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/20 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm">
              {post.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{post.user}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.time}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1">{post.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${post.liked ? 'text-[#00ff00]' : 'text-gray-400 hover:text-[#00ff00]'}`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? 'fill-[#00ff00]' : ''}`} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00ff00] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00ff00] transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;