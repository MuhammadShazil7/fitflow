import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  UserPlus,
  Bell,
  Search,
  Filter,
  Zap,
  Crown,
  Flame,
  Award,
  ArrowUp,
  ArrowDown,
  Lock,
  LogIn,
  Home,           // ✅ Added Home
  Dumbbell,       // ✅ Added Dumbbell
  BarChart3,      // ✅ Added BarChart3
  User            // ✅ Added User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Community = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'SJ',
      time: '2 hours ago',
      content: 'Just completed my 50th workout! 💪 Feeling amazing! #FitFlow',
      likes: 24,
      comments: 8,
      liked: true
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar: 'MC',
      time: '4 hours ago',
      content: 'New PR on bench press! 100kg x 5 reps 🏋️‍♂️',
      likes: 18,
      comments: 5,
      liked: false
    },
    {
      id: 3,
      user: 'Emma Wilson',
      avatar: 'EW',
      time: '6 hours ago',
      content: '5km run in 22:30! New personal best 🏃‍♀️',
      likes: 32,
      comments: 12,
      liked: true
    },
  ];

  const leaderboard = [
    { name: 'Alex Rivera', score: 2840, avatar: 'AR', rank: 1 },
    { name: 'Jamie Lee', score: 2670, avatar: 'JL', rank: 2 },
    { name: 'Taylor Smith', score: 2490, avatar: 'TS', rank: 3 },
    { name: 'Jordan Brown', score: 2310, avatar: 'JB', rank: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Community 🌟</h1>
            <p className="text-gray-400 text-sm">Connect with fellow fitness enthusiasts</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <UserPlus className="w-4 h-4" />
            Connect
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#0a0a1a] rounded-xl p-1 border border-[#00ff00]/10">
          {[
            { id: 'feed', label: 'Feed', icon: <MessageCircle className="w-4 h-4" /> },
            { id: 'leaderboard', label: 'Leaderboard', icon: <Crown className="w-4 h-4" /> },
            { id: 'challenges', label: 'Challenges', icon: <Zap className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#00ff00] text-[#02020a]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'feed' && (
          <>
            {/* Create Post */}
            <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00ff00]/20 flex items-center justify-center text-[#00ff00] font-bold text-sm">
                  U
                </div>
                <input
                  type="text"
                  placeholder="Share your fitness journey..."
                  className="flex-1 bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                />
                <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm">
                  Post
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/20 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{post.user}</span>
                        <span className="text-xs text-gray-500">• {post.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className={`flex items-center gap-1 text-sm transition-colors ${post.liked ? 'text-[#00ff00]' : 'text-gray-400 hover:text-[#00ff00]'}`}>
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
          </>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#00ff00]/10 flex items-center justify-between">
              <span className="text-white font-semibold">This Week's Leaders</span>
              <span className="text-xs text-gray-400">Top 10</span>
            </div>
            {leaderboard.map((person) => (
              <div key={person.rank} className="flex items-center justify-between px-4 py-3 border-b border-[#00ff00]/5 last:border-0 hover:bg-[#12121e] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    person.rank === 1 ? 'bg-yellow-500 text-[#02020a]' :
                    person.rank === 2 ? 'bg-gray-400 text-[#02020a]' :
                    person.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-[#12121e] text-gray-500'
                  }`}>
                    {person.rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#00ff00]/20 flex items-center justify-center text-[#00ff00] font-bold text-xs">
                    {person.avatar}
                  </div>
                  <span className="text-white">{person.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#00ff00]" />
                  <span className="text-white font-semibold">{person.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#00ff00]" />
                    7-Day Streak Challenge
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Complete a workout every day for 7 days</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6,7].map((day) => (
                        <div key={day} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          day <= 5 ? 'bg-[#00ff00] text-[#02020a]' : 'bg-[#1a1a2e] text-gray-500'
                        }`}>
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="bg-[#00ff00] text-[#02020a] px-4 py-1.5 rounded-xl font-semibold text-sm">
                  Join
                </button>
              </div>
            </div>

            <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#00ff00]" />
                    50 Workouts Challenge
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Complete 50 workouts total</p>
                  <div className="mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00ff00] rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm text-[#00ff00]">30/50</span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#00ff00] text-[#02020a] px-4 py-1.5 rounded-xl font-semibold text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};



export default Community;