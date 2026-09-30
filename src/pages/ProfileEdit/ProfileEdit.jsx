import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, X, User, Mail, UserPlus } from 'lucide-react';
import { useAuth } from '../../Context/authContext';
import Spinner from '../../components/common/Spinner';

const ProfileEdit = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateUser(formData);
    setLoading(false);
    
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-gray-400 text-sm">Update your personal information</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
            <div className="relative">
              <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="Your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          {/* Optional: Password field - only if you want to allow password change */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="Leave blank to keep current"
              />
            </div>
          </div> */}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 bg-[#12121e] text-gray-400 py-3 rounded-xl font-semibold hover:text-white hover:bg-[#1a1a2e] transition-all duration-300 flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;