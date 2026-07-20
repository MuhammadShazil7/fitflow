import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, BarChart3, Calendar, Award, Target, 
  Weight, Ruler, Dumbbell, Plus, Edit2, Trash2, 
  Check, Home, User
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useNotifications } from '../../context/NotificationContext';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';

const Progress = () => {
  const { entries, analytics, loading, addEntry, editEntry, removeEntry } = useProgress();
  const { notifyProgress } = useNotifications();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    maxBenchPress: '',
    maxSquat: '',
    runTime: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        weight: entry.weight || '',
        bodyFat: entry.bodyFat || '',
        chest: entry.bodyMeasurements?.chest || '',
        waist: entry.bodyMeasurements?.waist || '',
        hips: entry.bodyMeasurements?.hips || '',
        biceps: entry.bodyMeasurements?.biceps || '',
        thighs: entry.bodyMeasurements?.thighs || '',
        maxBenchPress: entry.performanceMetrics?.maxBenchPress || '',
        maxSquat: entry.performanceMetrics?.maxSquat || '',
        runTime: entry.performanceMetrics?.runTime || '',
        notes: entry.notes || '',
      });
    } else {
      setEditingEntry(null);
      setFormData({
        weight: '',
        bodyFat: '',
        chest: '',
        waist: '',
        hips: '',
        biceps: '',
        thighs: '',
        maxBenchPress: '',
        maxSquat: '',
        runTime: '',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const entryData = {
      weight: parseFloat(formData.weight) || undefined,
      bodyFat: parseFloat(formData.bodyFat) || undefined,
      bodyMeasurements: {
        chest: parseFloat(formData.chest) || undefined,
        waist: parseFloat(formData.waist) || undefined,
        hips: parseFloat(formData.hips) || undefined,
        biceps: parseFloat(formData.biceps) || undefined,
        thighs: parseFloat(formData.thighs) || undefined,
      },
      performanceMetrics: {
        maxBenchPress: parseFloat(formData.maxBenchPress) || undefined,
        maxSquat: parseFloat(formData.maxSquat) || undefined,
        runTime: parseFloat(formData.runTime) || undefined,
      },
      notes: formData.notes || undefined,
    };

    let result;
    if (editingEntry) {
      result = await editEntry(editingEntry._id, entryData);
    } else {
      result = await addEntry(entryData);
    }

    if (result.success) {
      // ✅ Send notification
      const metric = formData.weight ? 'weight' : 'body measurements';
      const value = formData.weight || 'updated';
      notifyProgress(metric, value);
      handleCloseModal();
    }
    
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress entry?')) {
      await removeEntry(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00ff00]" />
            Progress 📊
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your fitness journey</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00ff00] text-[#02020a] px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Log Progress
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Entries</p>
              <p className="text-2xl font-bold text-white">{entries?.length || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00ff00]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#00ff00]" />
            </div>
          </div>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Weight Trend</p>
              <p className="text-2xl font-bold text-white">{analytics?.weightTrend || 0}%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Latest Weight</p>
              <p className="text-2xl font-bold text-white">{entries?.[0]?.weight || 0} kg</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Weight className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Body Fat</p>
              <p className="text-2xl font-bold text-white">{entries?.[0]?.bodyFat || 0}%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {entries?.length === 0 ? (
          <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
            <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No progress entries</h3>
            <p className="text-gray-400 text-sm mt-1">Start tracking your progress</p>
            <button 
              onClick={() => handleOpenModal()}
              className="mt-4 bg-[#00ff00] text-[#02020a] px-6 py-2 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Log Your First Progress
            </button>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {new Date(entry.date).toLocaleDateString()}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {entry.weight && (
                        <span className="text-xs text-gray-400">⚖️ Weight: {entry.weight}kg</span>
                      )}
                      {entry.bodyFat && (
                        <span className="text-xs text-gray-400">📊 Body Fat: {entry.bodyFat}%</span>
                      )}
                      {entry.bodyMeasurements?.chest && (
                        <span className="text-xs text-gray-400">📏 Chest: {entry.bodyMeasurements.chest}cm</span>
                      )}
                      {entry.bodyMeasurements?.waist && (
                        <span className="text-xs text-gray-400">📏 Waist: {entry.bodyMeasurements.waist}cm</span>
                      )}
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(entry)}
                    className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors rounded-xl hover:bg-[#00ff00]/10"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(entry._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingEntry ? 'Edit Progress' : 'Log New Progress'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="72.5"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Body Fat (%)</label>
              <input
                type="number"
                name="bodyFat"
                value={formData.bodyFat}
                onChange={handleChange}
                step="0.1"
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="15.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Body Measurements (cm)</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                name="chest"
                value={formData.chest}
                onChange={handleChange}
                placeholder="Chest"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="waist"
                value={formData.waist}
                onChange={handleChange}
                placeholder="Waist"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="hips"
                value={formData.hips}
                onChange={handleChange}
                placeholder="Hips"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="biceps"
                value={formData.biceps}
                onChange={handleChange}
                placeholder="Biceps"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="thighs"
                value={formData.thighs}
                onChange={handleChange}
                placeholder="Thighs"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Performance Metrics</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                name="maxBenchPress"
                value={formData.maxBenchPress}
                onChange={handleChange}
                placeholder="Bench (kg)"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="maxSquat"
                value={formData.maxSquat}
                onChange={handleChange}
                placeholder="Squat (kg)"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
              <input
                type="number"
                name="runTime"
                value={formData.runTime}
                onChange={handleChange}
                placeholder="Run (min)"
                className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 resize-none"
              placeholder="Any notes about this progress..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Spinner size="sm" />
                  {editingEntry ? 'Updating...' : 'Logging...'}
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  {editingEntry ? 'Update Progress' : 'Log Progress'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 bg-[#12121e] text-gray-400 py-3 rounded-xl font-semibold hover:text-white hover:bg-[#1a1a2e] transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/dashboard' },
    { icon: <Dumbbell className="w-6 h-6" />, label: 'Workouts', path: '/workouts' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Progress', path: '/progress' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a1a] border-t border-[#00ff00]/10 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'text-[#00ff00]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Progress;