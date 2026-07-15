import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Apple, BarChart3, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/dashboard' },
    { icon: <Dumbbell className="w-6 h-6" />, label: 'Workouts', path: '/workouts' },
    { icon: <Apple className="w-6 h-6" />, label: 'Nutrition', path: '/nutrition' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Progress', path: '/progress' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a1a] border-t border-[#00ff00]/10 z-50 md:hidden">
      <div className="flex items-center justify-around py-1.5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'text-[#00ff00]' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {item.icon}
            <span className="text-[9px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;