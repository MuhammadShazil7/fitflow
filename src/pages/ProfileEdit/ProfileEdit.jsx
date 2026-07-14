import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Camera, 
  Save,
  X,
  Dumbbell,
  Target,
  Ruler,
  Weight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    height: '175',
    weight: '72.5',
    goal: 'Muscle Gain',
    fitnessLevel: 'Intermediate',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully! 🎉');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        {/* Avatar */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-3xl font-bold text-[#02020a] mx-auto shadow-[0_0_30px_rgba(0,255,0,0.3)]">
              {formData.name?.charAt(0) || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 bg-[#00ff00] p-2 rounded-full border-2 border-[#02020a]">
              <Camera className="w-4 h-4 text-[#02020a]" />
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-3">Tap to change profile picture</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
            <h3 className="text-white font-semibold mb-4">Personal Information</h3>
            
            <div className="space-y-4">
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
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                    placeholder="Username"
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
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
            <h3 className="text-white font-semibold mb-4">Fitness Profile</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                    placeholder="Height"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Weight (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                    placeholder="Weight"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Fitness Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              >
                <option value="Muscle Gain">💪 Muscle Gain</option>
                <option value="Weight Loss">🔥 Weight Loss</option>
                <option value="Maintenance">⚖️ Maintenance</option>
                <option value="Endurance">🏃 Endurance</option>
                <option value="Flexibility">🧘 Flexibility</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Fitness Level</label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              >
                <option value="Beginner">🌱 Beginner</option>
                <option value="Intermediate">🌿 Intermediate</option>
                <option value="Advanced">🌳 Advanced</option>
                <option value="Expert">🔥 Expert</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
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