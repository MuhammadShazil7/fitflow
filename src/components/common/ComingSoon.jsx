import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Construction, 
  Clock, 
  Zap,
  Dumbbell,
  Home
} from 'lucide-react';

const ComingSoon = ({ pageName, icon }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-[#00ff00]/10 flex items-center justify-center mx-auto mb-6 border border-[#00ff00]/20">
          {icon || <Construction className="w-10 h-10 text-[#00ff00]" />}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">
          {pageName || 'Coming Soon'}
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6">
          We're working hard to bring you this feature. 
          Stay tuned for updates! 🚀
        </p>

        {/* Progress Bar */}
        <div className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Development Progress</span>
            <span className="text-[#00ff00]">75%</span>
          </div>
          <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div className="h-full bg-[#00ff00] rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            { icon: <Zap className="w-4 h-4" />, label: 'Fast & Responsive' },
            { icon: <Dumbbell className="w-4 h-4" />, label: 'Fitness Focused' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a1a] rounded-xl p-2 border border-[#00ff00]/10 flex items-center justify-center gap-2 text-xs text-gray-400">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/dashboard" 
            className="flex-1 bg-[#00ff00] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex-1 border border-[#00ff00] text-[#00ff00] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Notify me */}
        <div className="mt-6">
          <button className="text-xs text-gray-500 hover:text-[#00ff00] transition-colors">
            🔔 Notify me when ready
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;