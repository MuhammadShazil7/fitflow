import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  // ===== PUBLIC LINKS (Visible to EVERYONE) =====
  const publicLinks = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/community', icon: <Users className="w-5 h-5" />, label: 'Community' },
    { to: '/about', icon: <Info className="w-5 h-5" />, label: 'About' },
    { to: '/help', icon: <HelpCircle className="w-5 h-5" />, label: 'Help' },
  ];

  // ===== PRIVATE LINKS (Visible only when logged in) =====
  const privateLinks = [
    { to: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/workouts', icon: <Activity className="w-5 h-5" />, label: 'Workouts' },
    { to: '/nutrition', icon: <Droplet className="w-5 h-5" />, label: 'Nutrition' },
    { to: '/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progress' },
  ];

  // Combine links based on auth status
  const navLinks = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-lg border-b border-[#00ff00]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#00ff00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,0,0.3)]">
              <Dumbbell className="w-5 h-5 text-[#02020a]" />
            </div>
            <span className="text-xl font-extrabold text-white">
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
                  location.pathname === link.to
                    ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold border border-[#00ff00]/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Private Links (Only when logged in) */}
            {isAuthenticated && (
              <>
                <span className="w-px h-6 bg-[#00ff00]/20 mx-1"></span>
                {privateLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      location.pathname === link.to
                        ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold border border-[#00ff00]/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#12121e]'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#00ff00]/10">
              {isAuthenticated ? (
                // ===== Logged In =====
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:bg-[#12121e] p-2 rounded-xl transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00ff00] flex items-center justify-center text-[#02020a] font-bold text-sm shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                      {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium text-white hidden lg:inline">
                      {user?.name || user?.username}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // ===== Not Logged In =====
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-400 hover:text-white transition-colors px-4 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#00ff00] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
                  >
                    Get Started
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
          <div className="md:hidden py-4 border-t border-[#00ff00]/10">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                    : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Private Links (Only when logged in) */}
            {isAuthenticated && (
              <>
                <div className="border-t border-[#00ff00]/10 my-2"></div>
                {privateLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === link.to
                        ? 'bg-[#00ff00]/10 text-[#00ff00] font-semibold'
                        : 'text-gray-400 hover:bg-[#12121e] hover:text-white'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}

            {/* Auth Actions */}
            {isAuthenticated ? (
              <>
                <div className="border-t border-[#00ff00]/10 my-2"></div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-[#00ff00]/10 my-2"></div>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#12121e] hover:text-white transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Log In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00ff00] text-[#02020a] font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
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