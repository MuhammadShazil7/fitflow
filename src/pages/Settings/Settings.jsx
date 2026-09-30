import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun,
  User,
  LogOut,
  User as UserIcon,
  Edit2,
  Save,
  Download,
  Trash2,
  AlertTriangle,
  Mail,
  Ruler,
  X
} from 'lucide-react';
import { useAuth } from '../../Context/authContext';
import { useTheme } from '../../Context/ThemeContext';
import { useGame } from '../../Context/GameContext';
import { useNotifications } from '../../Context/NotificationContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, logout, updateUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { xp, level, streak, achievements } = useGame();
  const { clearAll } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Profile form
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  // Simple settings
  const [settings, setSettings] = useState({
    units: 'metric',
    notifications: true,
  });

  // Load settings from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`settings_${user._id}`);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setSettings(prev => ({
            units: data.units || 'metric',
            notifications: data.notifications !== undefined ? data.notifications : true,
          }));
        } catch (e) {
          console.error('Failed to load settings');
        }
      }
    }
  }, [user]);

  // Save settings to localStorage
  const saveSettings = () => {
    if (!user) return;
    localStorage.setItem(`settings_${user._id}`, JSON.stringify(settings));
    toast.success('Settings saved! ✅');
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    const result = await updateUser(formData);
    setLoading(false);
    if (result.success) {
      setEditMode(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  // Export data
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
      settings,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitflow_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported! 📥');
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Delete your account? This cannot be undone!')) {
      localStorage.removeItem(`settings_${user._id}`);
      localStorage.removeItem(`game_${user._id}`);
      clearAll();
      logout();
      toast.success('Account deleted');
      navigate('/');
    }
  };

  // Toggle Switch
  const ToggleSwitch = ({ enabled, onChange }) => (
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-6 h-6 text-[#00ff00]" />
        <h1 className="text-2xl font-bold text-white">Settings</h1>
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
              <p className="text-gray-400 text-sm">Update your personal info</p>
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
              {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Update</>}
            </button>
          )}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <h3 className="text-white font-semibold mb-4">Preferences</h3>

        {/* Theme */}
        <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl mb-3">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-[#00ff00]" /> : <Sun className="w-5 h-5 text-yellow-500" />}
            <div>
              <p className="text-white text-sm font-medium">Dark Mode</p>
              <p className="text-gray-400 text-xs">{darkMode ? 'On' : 'Off'}</p>
            </div>
          </div>
          <ToggleSwitch enabled={darkMode} onChange={toggleTheme} />
        </div>

        {/* Units */}
        <div className="flex items-center justify-between p-3 bg-[#12121e] rounded-xl">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-[#00ff00]" />
            <div>
              <p className="text-white text-sm font-medium">Units</p>
              <p className="text-gray-400 text-xs">{settings.units === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lb, ft)'}</p>
            </div>
          </div>
          <select
            value={settings.units}
            onChange={(e) => {
              setSettings({ ...settings, units: e.target.value });
              saveSettings();
            }}
            className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-1.5 text-white text-sm focus:border-[#00ff00] outline-none"
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#00ff00]" />
            <div>
              <p className="text-white text-sm font-medium">Notifications</p>
              <p className="text-gray-400 text-xs">{settings.notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={settings.notifications}
            onChange={() => {
              setSettings({ ...settings, notifications: !settings.notifications });
              saveSettings();
            }}
          />
        </div>
      </div>

      {/* Data */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <h3 className="text-white font-semibold mb-4">Data</h3>

        <button
          onClick={handleExportData}
          className="w-full flex items-center justify-between p-3 bg-[#12121e] rounded-xl hover:bg-[#1a1a2e] transition-all duration-300 group mb-3"
        >
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-[#00ff00]" />
            <div>
              <p className="text-white text-sm font-medium">Export Data</p>
              <p className="text-gray-400 text-xs">Download all your data</p>
            </div>
          </div>
          <span className="text-gray-500 group-hover:text-[#00ff00] transition-colors">→</span>
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-between p-3 bg-red-500/5 rounded-xl hover:bg-red-500/10 transition-all duration-300 group border border-red-500/10"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-white text-sm font-medium">Delete Account</p>
              <p className="text-red-400/70 text-xs">Permanently delete all data</p>
            </div>
          </div>
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* Logout */}
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

export default Settings;