import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Award, 
  Users, 
  Flame,
  Star,
  TrendingUp
} from 'lucide-react';
import { getLeaderboard, getUserRank } from '../../services/api';
import Spinner from './Spinner';
import { useAuth } from '../../context/AuthContext';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const fetchLeaderboard = async () => {
    try {
      const [boardRes, rankRes] = await Promise.all([
        getLeaderboard(),
        getUserRank(),
      ]);
      setLeaderboard(boardRes.data.leaderboard || []);
      setUserRank(rankRes.data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-gray-500 text-sm font-bold">#{rank}</span>;
  };

  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30';
    return 'border-[#00ff00]/5 hover:border-[#00ff00]/20';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#00ff00]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-white font-semibold">Leaderboard 🏆</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Top 20</span>
          {userRank && userRank.rank > 0 && (
            <span className="text-[#00ff00] text-xs px-2 py-0.5 bg-[#00ff00]/10 rounded-full">
              Your rank: #{userRank.rank}
            </span>
          )}
        </div>
      </div>

      {/* User's Rank (if in top) */}
      {userRank && userRank.rank <= 20 && (
        <div className="px-6 py-3 bg-[#00ff00]/5 border-b border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#00ff00] font-bold">#{userRank.rank}</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm">
                {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <span className="text-white font-medium">{user?.name || user?.username}</span>
              <span className="text-xs text-gray-500">(You)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#00ff00]">🔥 {userRank.totalActivity || 0} activity</span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="max-h-[400px] overflow-y-auto">
        {leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <p>No activity yet. Be the first!</p>
          </div>
        ) : (
          leaderboard.map((item) => (
            <div
              key={item.user?._id || Math.random()}
              className={`flex items-center justify-between px-6 py-3 border-b border-[#00ff00]/5 hover:bg-[#12121e] transition-all duration-300 ${getRankBg(item.rank)}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 text-center">
                  {getRankIcon(item.rank)}
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm">
                  {item.user?.name?.charAt(0) || item.user?.username?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {item.user?.name || item.user?.username || 'Unknown User'}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>📝 {item.posts} posts</span>
                    <span>❤️ {item.likes} likes</span>
                    <span>💬 {item.comments} comments</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-white font-bold text-sm">{item.totalActivity || 0}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[#00ff00]/10 text-center">
        <p className="text-xs text-gray-500">
          💪 Activity score = Posts + Likes + Comments
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;