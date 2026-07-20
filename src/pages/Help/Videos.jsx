import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Video, 
  Play, 
  Clock, 
  Dumbbell,
  Apple,
  BarChart3,
  Users,
  Zap,
  Target,
  Home,
  User
} from 'lucide-react';


const Videos = () => {
  const tutorials = [
    {
      title: 'Getting Started with FitFlow',
      duration: '5:23',
      icon: <Dumbbell className="w-6 h-6 text-[#00ff00]" />,
      description: 'Learn how to set up your account and profile'
    },
    {
      title: 'How to Track Workouts',
      duration: '8:15',
      icon: <Dumbbell className="w-6 h-6 text-[#00ff00]" />,
      description: 'Complete guide to logging exercises and workouts'
    },
    {
      title: 'Nutrition Tracking Guide',
      duration: '6:45',
      icon: <Apple className="w-6 h-6 text-[#00ff00]" />,
      description: 'Log meals and track your daily nutrition'
    },
    {
      title: 'Progress Analytics',
      duration: '7:30',
      icon: <BarChart3 className="w-6 h-6 text-[#00ff00]" />,
      description: 'Understand your progress charts and metrics'
    },
    {
      title: 'Community Features',
      duration: '4:50',
      icon: <Users className="w-6 h-6 text-[#00ff00]" />,
      description: 'Connect with others and stay motivated'
    },
    {
      title: 'Goal Setting & Achievements',
      duration: '6:20',
      icon: <Target className="w-6 h-6 text-[#00ff00]" />,
      description: 'Learn how to set goals and unlock achievements'
    },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/help" 
            className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-[#00ff00]" />
              Video Tutorials
            </h1>
            <p className="text-gray-400 text-sm">Watch step-by-step guides</p>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="space-y-4">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#00ff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-[#00ff00]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-[#00ff00] transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{tutorial.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tutorial.duration}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full">
                      Watch Now
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-[#00ff00] transition-colors">
                  <Play className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Video */}
        <div className="mt-6 bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 text-center">
          <h3 className="text-white font-semibold mb-2">Don't see what you're looking for?</h3>
          <p className="text-gray-400 text-sm mb-4">Request a video tutorial on a specific topic</p>
          <Link 
            to="/contact"
            className="inline-block bg-[#00ff00] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
          >
            Request Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Videos;