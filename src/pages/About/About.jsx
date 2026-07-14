import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Heart, 
  Users, 
  Award,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Mail,
  
  Apple,          // ✅ Added Apple
  BarChart3       // ✅ Added BarChart3
} from 'lucide-react';
import { FiGithub, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const About = () => {
  const features = [
    { icon: <Dumbbell className="w-6 h-6 text-[#00ff00]" />, label: 'Track Workouts' },
    { icon: <Apple className="w-6 h-6 text-[#00ff00]" />, label: 'Monitor Nutrition' },
    { icon: <BarChart3 className="w-6 h-6 text-[#00ff00]" />, label: 'View Progress' },
    { icon: <Award className="w-6 h-6 text-[#00ff00]" />, label: 'Achieve Goals' },
    { icon: <Users className="w-6 h-6 text-[#00ff00]" />, label: 'Community' },
    { icon: <Shield className="w-6 h-6 text-[#00ff00]" />, label: 'Secure & Private' },
  ];

  const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', avatar: 'AJ' },
    { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC' },
    { name: 'Mike Rodriguez', role: 'Product Designer', avatar: 'MR' },
    { name: 'Emily Kim', role: 'Fitness Expert', avatar: 'EK' },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-2xl bg-[#00ff00] flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(0,255,0,0.3)]">
            <Dumbbell className="w-10 h-10 text-[#02020a]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">About FitFlow</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-lg">
            Empowering people to transform their fitness journey with modern technology
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#0a0a1a] rounded-2xl p-8 border border-[#00ff00]/10 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission 💚</h2>
              <p className="text-gray-400 leading-relaxed">
                At FitFlow, we believe everyone deserves to live a healthy and active lifestyle. 
                Our mission is to make fitness tracking accessible, engaging, and effective for 
                people of all fitness levels.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-[#00ff00]">
                <Zap className="w-4 h-4" />
                <span>Join 10,000+ users</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#12121e] rounded-xl p-3 flex items-center gap-2 border border-[#00ff00]/10">
                  {feature.icon}
                  <span className="text-sm text-white">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-[#00ff00]">10K+</p>
            <p className="text-xs text-gray-400">Active Users</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-[#00ff00]">50K+</p>
            <p className="text-xs text-gray-400">Workouts Logged</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-[#00ff00]">4.9★</p>
            <p className="text-xs text-gray-400">User Rating</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-[#00ff00]">100+</p>
            <p className="text-xs text-gray-400">Countries</p>
          </div>
        </div>

        {/* Team */}
        <h2 className="text-2xl font-bold text-white mb-4">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {team.map((member, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-xl mx-auto mb-3">
                {member.avatar}
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-xs text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Connect */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
          <h2 className="text-white font-semibold text-center mb-4">Connect With Us</h2>
          <div className="flex justify-center gap-4">
            {[
              { icon: <Mail className="w-6 h-6" />, label: 'Email', color: 'text-[#00ff00]' },
              { icon: <FiGithub className="w-6 h-6" />, label: 'GitHub', color: 'text-white' },
              { icon: <FiTwitter className="w-6 h-6" />, label: 'Twitter', color: 'text-[#00ff00]' },
              { icon: <FiInstagram className="w-6 h-6" />, label: 'Instagram', color: 'text-[#00ff00]' },
              { icon: <FiYoutube className="w-6 h-6" />, label: 'YouTube', color: 'text-[#00ff00]' },
            ].map((social, index) => (
              <button
                key={index}
                className="p-3 bg-[#12121e] rounded-xl hover:bg-[#1a1a2e] transition-all duration-300 text-gray-400 hover:text-[#00ff00]"
              >
                {social.icon}
              </button>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Made with 💚 by the FitFlow Team
          </p>
          <p className="text-center text-gray-500 text-xs mt-1">
            © 2024 FitFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;