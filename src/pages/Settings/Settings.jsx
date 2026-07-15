import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  User,
  ChevronRight,
  Volume2,
  Shield,
  Database,
  Home,
  HelpCircle,
  LogOut,
  Dumbbell,
  BarChart3,
  User as UserIcon
} from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { 
          icon: <Sun className="w-5 h-5" />,
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onChange: () => setDarkMode(!darkMode)
        },
        { 
          icon: <Bell className="w-5 h-5" />,
          label: 'Notifications',
          type: 'toggle',
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
        { 
          icon: <Globe className="w-5 h-5" />,
          label: 'Language',
          type: 'select',
          value: 'English'
        },
        { 
          icon: <Volume2 className="w-5 h-5" />,
          label: 'Sound Effects',
          type: 'toggle',
          value: true
        },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: <Lock className="w-5 h-5" />, label: 'Privacy Settings', type: 'link', path: '/settings/privacy' },
        { icon: <Shield className="w-5 h-5" />, label: 'Security', type: 'link', path: '/settings/security' },
        { icon: <Database className="w-5 h-5" />, label: 'Data Export', type: 'link', path: '/settings/export' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle className="w-5 h-5" />, label: 'Help Center', type: 'link', path: '/settings/help' },
        { icon: <User className="w-5 h-5" />, label: 'About', type: 'link', path: '/settings/about' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-[#00ff00]" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10 overflow-hidden">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between px-4 py-3 ${
                      itemIndex < group.items.length - 1 ? 'border-b border-[#00ff00]/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#00ff00]">{item.icon}</span>
                      <span className="text-white">{item.label}</span>
                    </div>
                    <div>
                      {item.type === 'toggle' && (
                        <button
                          onClick={item.onChange}
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            item.value ? 'bg-[#00ff00]' : 'bg-[#1a1a2e]'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${
                              item.value ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          ></div>
                        </button>
                      )}
                      {item.type === 'select' && (
                        <span className="text-gray-400 text-sm">{item.value}</span>
                      )}
                      {item.type === 'link' && (
                        <Link to={item.path} className="text-gray-400 hover:text-[#00ff00] transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};



export default Settings;