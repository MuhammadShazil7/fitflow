import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  HelpCircle,
  LogOut,
  Dumbbell,
  BarChart3,
  Home,
  User as UserIcon,
  Check,
  X,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Zap,
  Award,
  TrendingUp,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
//import { useTheme } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, logout, updateUser } = useAuth();
  //const { darkMode, toggleTheme } = useTheme();
  const { xp, level, streak, achievements } = useGame();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    workoutReminders: true,
    achievements: true,
    community: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
  });
  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    units: 'metric',
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem(`settings_${user?._id}`);
    if (savedSettings) {
      const data = JSON.parse(savedSettings);
      setNotifications(data.notifications || notifications);
      setPrivacy(data.privacy || privacy);
      setPreferences(data.preferences || preferences);
    }
  }, [user]);

  // Save settings to localStorage
  const saveSettings = () => {
    const data = {
      notifications,
      privacy,
      preferences,
    };
    localStorage.setItem(`settings_${user?._id}`, JSON.stringify(data));
    toast.success('Settings saved successfully!');
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    const result = await updateUser(formData);
    setLoading(false);
    if (result.success) {
      setEditMode(false);
      toast.success('Profile updated successfully!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setNotifications({
        email: true,
        push: true,
        workoutReminders: true,
        achievements: true,
        community: false,
      });
      setPrivacy({
        profileVisibility: 'public',
        showProgress: true,
        showAchievements: true,
      });
      setPreferences({
        language: 'English',
        timezone: 'UTC-5',
        dateFormat: 'MM/DD/YYYY',
        units: 'metric',
      });
      toast.success('Settings reset to default!');
      saveSettings();
    }
  };

  const handleExportData = () => {
    const data = {
      user: {
        name: user?.name,
        username: user?.username,
        email: user?.email,
      },
      stats: {
        xp,
        level,
        streak,
        achievements,
      },
      settings: {
        notifications,
        privacy,
        preferences,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitflow_settings_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone!')) {
      if (window.confirm('Really? All your data will be permanently lost!')) {
        toast.error('Account deletion request submitted.');
        // In production, this would call an API
      }
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? 'bg-[#00ff00]' : 'bg-[#1a1a2e]'
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        } shadow-md`}
      />
    </button>
  );

  const settingsSections = [
    {
      title: 'Profile',
      icon: <User className="w-5 h-5 text-[#00ff00]" />,
      description: 'Manage your personal information',
    },
    {
      title: 'Preferences',
      icon: <SettingsIcon className="w-5 h-5 text-[#00ff00]" />,
      description: 'Customize your app experience',
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5 text-[#00ff00]" />,
      description: 'Control your notification preferences',
    },
    {
      title: 'Privacy',
      icon: <Shield className="w-5 h-5 text-[#00ff00]" />,
      description: 'Manage your privacy settings',
    },
    {
      title: 'Data & Storage',
      icon: <Database className="w-5 h-5 text-[#00ff00]" />,
      description: 'Export, import, or delete your data',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#00ff00]" />
            Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage your account and preferences</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={saveSettings}
            className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All
          </button>
          <button 
            onClick={handleResetAll}
            className="border border-[#00ff00]/20 text-gray-400 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#00ff00]/10 hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#00ff00]" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Profile</h3>
              <p className="text-gray-400 text-sm">Manage your personal information</p>
            </div>
          </div>
          <button 
            onClick={() => setEditMode(!editMode)}
            className="text-[#00ff00] text-sm hover:text-[#24cb24] transition-colors flex items-center gap-1"
          >
            {editMode ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editMode}
                className={`w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 pl-12 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 ${
                  !editMode ? 'cursor-not-allowed opacity-70' : ''
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={!editMode}
                className={`w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 pl-12 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 ${
                  !editMode ? 'cursor-not-allowed opacity-70' : ''
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editMode}
                className={`w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 pl-12 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 ${
                  !editMode ? 'cursor-not-allowed opacity-70' : ''
                }`}
              />
            </div>
          </div>
          {editMode && (
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full bg-[#00ff00] text-[#02020a] py-2.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Update Profile</>}
            </button>
          )}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-[#00ff00]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Preferences</h3>
            <p className="text-gray-400 text-sm">Customize your app experience</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Theme */}
          {/* <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-[#00ff00]" /> : <Sun className="w-5 h-5 text-yellow-500" />}
              <div>
                <p className="text-white text-sm font-medium">Theme</p>
                <p className="text-gray-400 text-xs">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
              </div>
            </div>
            <ToggleSwitch enabled={darkMode} onChange={toggleTheme} />
          </div> */}

          {/* Language */}
          <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#00ff00]" />
              <div>
                <p className="text-white text-sm font-medium">Language</p>
                <p className="text-gray-400 text-xs">{preferences.language}</p>
              </div>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-1.5 text-white text-sm focus:border-[#00ff00] outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>

          {/* Units */}
          <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-[#00ff00]" />
              <div>
                <p className="text-white text-sm font-medium">Units</p>
                <p className="text-gray-400 text-xs">{preferences.units === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lb, ft)'}</p>
              </div>
            </div>
            <select
              value={preferences.units}
              onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
              className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-1.5 text-white text-sm focus:border-[#00ff00] outline-none"
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#00ff00]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Notifications</h3>
            <p className="text-gray-400 text-sm">Control your notification preferences</p>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
              <div>
                <p className="text-white text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-gray-400 text-xs">
                  {value ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <ToggleSwitch
                enabled={value}
                onChange={() => setNotifications({ ...notifications, [key]: !value })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#00ff00]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Privacy</h3>
            <p className="text-gray-400 text-sm">Manage your privacy settings</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Profile Visibility</p>
              <p className="text-gray-400 text-xs capitalize">{privacy.profileVisibility}</p>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
              className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-1.5 text-white text-sm focus:border-[#00ff00] outline-none"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Show Progress</p>
              <p className="text-gray-400 text-xs">{privacy.showProgress ? 'Visible' : 'Hidden'}</p>
            </div>
            <ToggleSwitch
              enabled={privacy.showProgress}
              onChange={() => setPrivacy({ ...privacy, showProgress: !privacy.showProgress })}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Show Achievements</p>
              <p className="text-gray-400 text-xs">{privacy.showAchievements ? 'Visible' : 'Hidden'}</p>
            </div>
            <ToggleSwitch
              enabled={privacy.showAchievements}
              onChange={() => setPrivacy({ ...privacy, showAchievements: !privacy.showAchievements })}
            />
          </div>
        </div>
      </div>

      {/* Data & Storage Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-[#00ff00]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Data & Storage</h3>
            <p className="text-gray-400 text-sm">Export, import, or delete your data</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-3 bg-[#12121e] rounded-xl hover:bg-[#1a1a2e] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#00ff00]" />
              <div>
                <p className="text-white text-sm font-medium">Export Data</p>
                <p className="text-gray-400 text-xs">Download all your data as JSON</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#00ff00] transition-colors" />
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-between p-3 bg-red-500/5 rounded-xl hover:bg-red-500/10 transition-all duration-300 group border border-red-500/10"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-white text-sm font-medium">Delete Account</p>
                <p className="text-red-400/70 text-xs">Permanently delete all your data</p>
              </div>
            </div>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Logout Section */}
      <button
        onClick={handleLogout}
        className="w-full bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 flex items-center justify-center gap-2 text-red-500 font-semibold"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

// Ruler icon (add if missing)
const Ruler = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 3m0 0l3-3m-3 3V3m0 12l3 3m0 0l3-3m-3 3v6m6-18l3 3m0 0l3-3m-3 3V3m0 12l3 3m0 0l3-3m-3 3v6" />
  </svg>
);

export default Settings;