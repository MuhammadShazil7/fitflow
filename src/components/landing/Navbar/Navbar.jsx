import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Dumbbell, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Activity, 
  Droplet, 
  TrendingUp, 
  User,
  Info,
  HelpCircle,
  Users,
  ChevronDown,
  Target,
  Award,
  BarChart3,
  Sparkles,
  Apple,
  Settings,
  Bell,
  FileText,
  Book,
  Video,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Zap,
  Flame,
  Heart
} from 'lucide-react';
import { useAuth } from '../../../Context/authContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const analyticsRef = useRef(null);
  const helpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          analyticsRef.current && !analyticsRef.current.contains(event.target) &&
          helpRef.current && !helpRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // ===== PUBLIC LINKS =====
  const publicLinks = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/community', icon: <Users className="w-5 h-5" />, label: 'Community' },
    { to: '/about', icon: <Info className="w-5 h-5" />, label: 'About' },
  ];

  // ===== HELP DROPDOWN LINKS =====
  const helpLinks = [
    { to: '/help', icon: <HelpCircle className="w-5 h-5" />, label: 'Help Center' },
    { to: '/help/guide', icon: <Book className="w-5 h-5" />, label: 'User Guide' },
    { to: '/help/videos', icon: <Video className="w-5 h-5" />, label: 'Video Tutorials' },
    { to: '/contact', icon: <Mail className="w-5 h-5" />, label: 'Contact Support' },
  ];

  // ===== PRIVATE LINKS =====
  const fitnessLinks = [
    { to: '/workouts', icon: <Activity className="w-5 h-5" />, label: 'Workouts' },
    { to: '/nutrition', icon: <Apple className="w-5 h-5" />, label: 'Nutrition' },
    { to: '/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progress' },
  ];

  const analyticsLinks = [
    { to: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { to: '/goals', icon: <Target className="w-5 h-5" />, label: 'Goals' },
    { to: '/achievements', icon: <Award className="w-5 h-5" />, label: 'Achievements' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-[#00ff00]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff00] to-[#24cb24] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,255,0,0.2)] group-hover:shadow-[0_0_50px_rgba(0,255,0,0.4)]">
                <Dumbbell className="w-5 h-5 text-[#02020a]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff00] rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Fit<span className="text-[#00ff00]">Flow</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold border border-[#00ff00]/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}

            {/* Help Dropdown */}
            <div className="relative" ref={helpRef}>
              <button
                onClick={() => toggleDropdown('help')}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  openDropdown === 'help'
                    ? 'bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm">Help</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'help' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'help' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a1a] border border-[#00ff00]/20 rounded-2xl shadow-2xl shadow-[#00ff00]/5 overflow-hidden animate-slide-down">
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      Support
                    </div>
                    {helpLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                          isActive(link.to)
                            ? 'bg-[#00ff00]/10 text-[#00ff00]'
                            : 'text-gray-300 hover:bg-[#12121e] hover:text-white'
                        }`}
                      >
                        {link.icon}
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Private Links */}
            {isAuthenticated && (
              <>
                <span className="w-px h-6 bg-[#00ff00]/20 mx-1"></span>
                
                {/* Dashboard - Direct Link */}
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold border border-[#00ff00]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                
                {/* Fitness Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => toggleDropdown('fitness')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                      openDropdown === 'fitness'
                        ? 'bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                    }`}
                  >
                    <Activity className="w-5 h-5" />
                    <span className="text-sm">Fitness</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'fitness' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'fitness' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a1a] border border-[#00ff00]/20 rounded-2xl shadow-2xl shadow-[#00ff00]/5 overflow-hidden animate-slide-down">
                      <div className="p-2">
                        <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                          Fitness
                        </div>
                        {fitnessLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                              isActive(link.to)
                                ? 'bg-[#00ff00]/10 text-[#00ff00]'
                                : 'text-gray-300 hover:bg-[#12121e] hover:text-white'
                            }`}
                          >
                            {link.icon}
                            <span className="text-sm">{link.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Analytics Dropdown */}
                <div className="relative" ref={analyticsRef}>
                  <button
                    onClick={() => toggleDropdown('analytics')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                      openDropdown === 'analytics'
                        ? 'bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm">Analytics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'analytics' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'analytics' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a1a] border border-[#00ff00]/20 rounded-2xl shadow-2xl shadow-[#00ff00]/5 overflow-hidden animate-slide-down">
                      <div className="p-2">
                        <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                          Analytics & Goals
                        </div>
                        {analyticsLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                              isActive(link.to)
                                ? 'bg-[#00ff00]/10 text-[#00ff00]'
                                : 'text-gray-300 hover:bg-[#12121e] hover:text-white'
                            }`}
                          >
                            {link.icon}
                            <span className="text-sm">{link.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#00ff00]/10">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:bg-[#12121e] p-1.5 rounded-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00ff00] to-[#24cb24] flex items-center justify-center text-[#02020a] font-bold text-sm shadow-[0_0_20px_rgba(0,255,0,0.2)] group-hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] transition-all duration-300">
                        {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00ff00] rounded-full border-2 border-[#0a0a1a]"></div>
                    </div>
                    <span className="font-medium text-white hidden lg:inline text-sm">
                      {user?.name || user?.username}
                    </span>
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#12121e] rounded-xl transition-all duration-300"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/notifications"
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#12121e] rounded-xl transition-all duration-300 relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-gray-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl hover:bg-[#12121e]"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-[#00ff00] to-[#24cb24] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:bg-[#12121e] rounded-xl transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-[#00ff00]/10 max-h-[80vh] overflow-y-auto">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                    : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                }`}
                onClick={handleLinkClick}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Help Links */}
            <div className="border-t border-[#00ff00]/10 my-2"></div>
            <div className="px-4 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </div>
            {helpLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                    : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                }`}
                onClick={handleLinkClick}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="border-t border-[#00ff00]/10 my-2"></div>
                
                {/* Dashboard - Mobile */}
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                      : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                
                <div className="px-4 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  Fitness
                </div>
                {fitnessLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(link.to)
                        ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                        : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                <div className="border-t border-[#00ff00]/10 my-2"></div>
                <div className="px-4 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  Analytics & Goals
                </div>
                {analyticsLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(link.to)
                        ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                        : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                <div className="border-t border-[#00ff00]/10 my-2"></div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <div className="border-t border-[#00ff00]/10 my-2"></div>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  <span>Log In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00ff00] text-[#02020a] font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  <span>Get Started Free</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;