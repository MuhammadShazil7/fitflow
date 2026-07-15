import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Zap,
  Shield,
  Award,
  Users
} from 'lucide-react';
import { FiFacebook, FiInstagram, FiGithub, FiYoutube, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Progress', path: '/progress' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, label: 'Facebook', url: '#' },
    { icon: <FiTwitter className="w-5 h-5" />, label: 'Twitter', url: '#' },
    { icon: <FiInstagram className="w-5 h-5" />, label: 'Instagram', url: '#' },
    { icon: <FiYoutube className="w-5 h-5" />, label: 'YouTube', url: '#' },
    { icon: <FiGithub className="w-5 h-5" />, label: 'GitHub', url: '#' },
  ];

  const features = [
    { icon: <Zap className="w-4 h-4" />, text: 'Real-time Tracking' },
    { icon: <Shield className="w-4 h-4" />, text: 'Secure & Private' },
    { icon: <Award className="w-4 h-4" />, text: 'Premium Quality' },
    { icon: <Users className="w-4 h-4" />, text: 'Community Support' },
  ];

  return (
    <footer className="bg-[#0a0a1a] border-t border-[#00ff00]/10 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#00ff00] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,0,0.2)] group-hover:shadow-[0_0_40px_rgba(0,255,0,0.4)] transition-all duration-300">
                <Dumbbell className="w-6 h-6 text-[#02020a]" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Fit<span className="text-[#00ff00]">Flow</span>
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transform your fitness journey with our all-in-one tracking platform. 
              Track workouts, monitor nutrition, and achieve your goals.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-[#00ff00]">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-[#12121e] flex items-center justify-center text-gray-400 hover:text-[#00ff00] hover:bg-[#00ff00]/10 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00ff00] rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#00ff00] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00ff00]/30 group-hover:bg-[#00ff00] transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00ff00] rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#00ff00] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00ff00]/30 group-hover:bg-[#00ff00] transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00ff00] rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Get the latest fitness tips and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#12121e] border border-[#00ff00]/10 rounded-l-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 text-sm"
              />
              <button className="bg-[#00ff00] text-[#02020a] px-4 py-2.5 rounded-r-xl hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#00ff00]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} FitFlow. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-xs">
              <Link to="/privacy" className="text-gray-500 hover:text-[#00ff00] transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="w-px h-3 bg-gray-700"></span>
              <Link to="/terms" className="text-gray-500 hover:text-[#00ff00] transition-colors duration-300">
                Terms of Service
              </Link>
              <span className="w-px h-3 bg-gray-700"></span>
              <Link to="/cookies" className="text-gray-500 hover:text-[#00ff00] transition-colors duration-300">
                Cookies
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Heart className="w-3 h-3 text-[#00ff00] animate-pulse" />
              <span>Made with passion for fitness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;