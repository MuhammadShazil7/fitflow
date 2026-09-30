import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, Clock, Play, Flame, Search, Filter, 
  Plus, Edit2, Trash2, X, Check, Calendar,
  Home, BarChart3, User
} from 'lucide-react';
import { useWorkouts } from '../../hooks/useWorkouts';
import { useGame } from '../../Context/GameContext';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const Workouts = () => {
  const { workouts, loading, addWorkout, editWorkout, removeWorkout } = useWorkouts();
  const { trackWorkout } = useGame(); // ✅ Get trackWorkout from GameContext
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'strength',
    duration: '',
    caloriesBurned: '',
    exercises: [{ name: '', sets: '', reps: '', weight: '', notes: '' }],
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = ['all', 'strength', 'cardio', 'flexibility', 'endurance', 'hybrid'];

  const filteredWorkouts = workouts?.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || w.category === filter;
    return matchesSearch && matchesFilter;
  }) || [];

  const handleOpenModal = (workout = null) => {
    if (workout) {
      setEditingWorkout(workout);
      setFormData({
        name: workout.name,
        category: workout.category,
        duration: workout.duration || '',
        caloriesBurned: workout.caloriesBurned || '',
        exercises: workout.exercises?.length ? workout.exercises : [{ name: '', sets: '', reps: '', weight: '', notes: '' }],
      });
    } else {
      setEditingWorkout(null);
      setFormData({
        name: '',
        category: 'strength',
        duration: '',
        caloriesBurned: '',
        exercises: [{ name: '', sets: '', reps: '', weight: '', notes: '' }],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][field] = value;
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', sets: '', reps: '', weight: '', notes: '' }],
    });
  };

  const removeExercise = (index) => {
    if (formData.exercises.length > 1) {
      const updatedExercises = formData.exercises.filter((_, i) => i !== index);
      setFormData({ ...formData, exercises: updatedExercises });
    }
  };

  // ✅ This is the function that should trigger notifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const workoutData = {
      name: formData.name,
      category: formData.category,
      duration: parseInt(formData.duration) || 0,
      caloriesBurned: parseInt(formData.caloriesBurned) || 0,
      exercises: formData.exercises.map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets) || 0,
        reps: parseInt(ex.reps) || 0,
        weight: parseFloat(ex.weight) || 0,
        notes: ex.notes || '',
      })),
    };

    let result;
    if (editingWorkout) {
      result = await editWorkout(editingWorkout._id, workoutData);
    } else {
      result = await addWorkout(workoutData);
    }

    if (result.success) {
      // ✅ CRITICAL: This is where the notification is triggered
      console.log('🔔 Workout added, calling trackWorkout with:', formData.name);
      trackWorkout(formData.name);
      handleCloseModal();
    }
    
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await removeWorkout(id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      strength: 'bg-primary-500',
      cardio: 'bg-green-500',
      flexibility: 'bg-orange-500',
      endurance: 'bg-purple-500',
      hybrid: 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
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
            <Dumbbell className="w-6 h-6 text-[#00ff00]" />
            Workouts 💪
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your workouts and exercises</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00ff00] text-[#02020a] px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Log Workout
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === cat
                  ? 'bg-[#00ff00] text-[#02020a]'
                  : 'bg-[#0a0a1a] text-gray-400 hover:text-white border border-[#00ff00]/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
            <Dumbbell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No workouts yet</h3>
            <p className="text-gray-400 text-sm mt-1">Start tracking your fitness journey</p>
            <button 
              onClick={() => handleOpenModal()}
              className="mt-4 bg-[#00ff00] text-[#02020a] px-6 py-2 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Log Your First Workout
            </button>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div key={workout._id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl ${getCategoryColor(workout.category)} flex items-center justify-center text-white`}>
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{workout.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {workout.duration || 0} min
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#00ff00]" /> {workout.caloriesBurned || 0} kcal
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full capitalize">
                        {workout.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {workout.exercises?.length || 0} exercises
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/workouts/${workout._id}`}
                    className="bg-[#00ff00]/10 text-[#00ff00] px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-[#00ff00]/20 transition-all duration-300 flex items-center gap-1"
                  >
                    <Play className="w-4 h-4" />
                    View
                  </Link>
                  <button 
                    onClick={() => handleOpenModal(workout)}
                    className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors rounded-xl hover:bg-[#00ff00]/10"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(workout._id)}
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
        title={editingWorkout ? 'Edit Workout' : 'Log New Workout'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Workout Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              placeholder="e.g., Morning Push Day"
              required
            />
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
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
                <option value="endurance">Endurance</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Duration (min)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                placeholder="45"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Calories Burned</label>
            <input
              type="number"
              name="caloriesBurned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
              placeholder="350"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-300">Exercises</label>
              <button
                type="button"
                onClick={addExercise}
                className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Exercise
              </button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {formData.exercises.map((exercise, index) => (
                <div key={index} className="bg-[#12121e] rounded-xl p-3 border border-[#00ff00]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400">Exercise {index + 1}</span>
                    {formData.exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 mb-2"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    <input
                      type="number"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Weight"
                      value={exercise.weight}
                      onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Notes"
                      value={exercise.notes}
                      onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
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
                  {editingWorkout ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  {editingWorkout ? 'Update Workout' : 'Create Workout'}
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
    </div>
  );
};

export default Workouts;