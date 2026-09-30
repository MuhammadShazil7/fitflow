import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Target, 
  Plus, 
  CheckCircle, 
  Circle, 
  Dumbbell,
  Weight,
  TrendingUp,
  Edit2,
  Trash2,
  Zap,
  Calendar,
  Home,
  BarChart3,
  User
} from 'lucide-react';
import { useGoals } from '../../hooks/useGoals';
import { useNotifications } from '../../Context/NotificationContext';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const Goals = () => {
  const { goals, loading, addGoal, editGoal, removeGoal } = useGoals();
  const { notifyGoal } = useNotifications();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    current: '0',
    category: 'general',
    deadline: '',
    progress: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleOpenModal = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setFormData({
        title: goal.title,
        description: goal.description || '',
        target: goal.target,
        current: goal.current || '0',
        category: goal.category || 'general',
        deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : '',
        progress: goal.progress || 0,
      });
    } else {
      setEditingGoal(null);
      setFormData({
        title: '',
        description: '',
        target: '',
        current: '0',
        category: 'general',
        deadline: '',
        progress: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const goalData = {
      title: formData.title,
      description: formData.description,
      target: formData.target,
      current: formData.current || '0',
      category: formData.category,
      deadline: formData.deadline,
      progress: formData.progress || 0,
    };

    let result;
    if (editingGoal) {
      result = await editGoal(editingGoal._id, goalData);
    } else {
      result = await addGoal(goalData);
    }

    if (result.success) {
      // ✅ Send notification
      const status = formData.progress >= 100 ? 'completed' : 'progress';
      notifyGoal(formData.title, status);
      handleCloseModal();
    }
    
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await removeGoal(id);
    }
  };

  const handleProgressUpdate = async (goal) => {
    const newProgress = prompt(`Update progress for "${goal.title}" (0-100):`, goal.progress || 0);
    if (newProgress !== null) {
      const progress = parseInt(newProgress);
      if (!isNaN(progress) && progress >= 0 && progress <= 100) {
        const updatedGoal = { ...goal, progress };
        const result = await editGoal(goal._id, updatedGoal);
        if (result.success) {
          // ✅ Send notification on progress update
          notifyGoal(goal.title, progress >= 100 ? 'completed' : 'progress');
          toast.success('Progress updated! 🎯');
        }
      } else {
        toast.error('Please enter a number between 0 and 100');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      weight: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      strength: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      cardio: 'bg-green-500/20 text-green-500 border-green-500/30',
      nutrition: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      general: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[category] || colors.general;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      weight: <Weight className="w-4 h-4" />,
      strength: <Dumbbell className="w-4 h-4" />,
      cardio: <TrendingUp className="w-4 h-4" />,
      nutrition: <Zap className="w-4 h-4" />,
      general: <Target className="w-4 h-4" />,
    };
    return icons[category] || icons.general;
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
            <Target className="w-6 h-6 text-[#00ff00]" />
            Goals 🎯
          </h1>
          <p className="text-gray-400 text-sm mt-1">Set and track your fitness goals</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00ff00] text-[#02020a] px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals?.length === 0 ? (
          <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
            <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No goals set yet</h3>
            <p className="text-gray-400 text-sm mt-1">Set your first fitness goal</p>
            <button 
              onClick={() => handleOpenModal()}
              className="mt-4 bg-[#00ff00] text-[#02020a] px-6 py-2 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Create Your First Goal
            </button>
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal._id} className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${getCategoryColor(goal.category)} border`}>
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-semibold">{goal.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${goal.status === 'completed' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                          {goal.status === 'completed' ? '✅ Completed' : 'In Progress'}
                        </span>
                      </div>
                      {goal.description && (
                        <p className="text-gray-400 text-sm mt-1">{goal.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">🎯 Target: {goal.target}</span>
                        <span className="text-xs text-gray-500">📊 Current: {goal.current}</span>
                        {goal.deadline && (
                          <span className="text-xs text-gray-500">📅 {new Date(goal.deadline).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 w-full">
                    <span className="text-xs text-gray-400">{goal.progress || 0}%</span>
                    <div className="w-20 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#00ff00] rounded-full transition-all duration-1000"
                        style={{ width: `${goal.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleProgressUpdate(goal)}
                      className="p-1.5 text-gray-400 hover:text-[#00ff00] transition-colors rounded-lg hover:bg-[#00ff00]/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleOpenModal(goal)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-500/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(goal._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Goal Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              placeholder="e.g., Lose 5kg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 resize-none"
              placeholder="Describe your goal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Target</label>
              <input
                type="text"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="e.g., 75kg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Current</label>
              <input
                type="text"
                name="current"
                value={formData.current}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="e.g., 80kg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              >
                <option value="weight">Weight</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="nutrition">Nutrition</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              />
            </div>
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
                  {editingGoal ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
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

export default Goals;