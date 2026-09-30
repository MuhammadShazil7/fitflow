import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Apple, Plus, Search, Coffee, Sun, Moon, 
  Utensils, Edit2, Trash2, X, Check, 
  Home, Dumbbell, BarChart3, User
} from 'lucide-react';
import { useNutrition } from '../../hooks/useNutrition';
import { useNotifications } from '../../Context/NotificationContext';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const Nutrition = () => {
  const { entries, dailySummary, loading, addEntry, editEntry, removeEntry } = useNutrition();
  const { notifyNutrition, notifyMealLogged } = useNotifications();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    mealType: 'breakfast',
    foodItems: [{ name: '', quantity: '', unit: 'g', calories: '', protein: '', carbs: '', fat: '' }],
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const mealTypes = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'pre-workout', 'post-workout'];
  
  const mealIcons = {
    breakfast: <Coffee className="w-5 h-5" />,
    lunch: <Sun className="w-5 h-5" />,
    dinner: <Moon className="w-5 h-5" />,
    snack: <Utensils className="w-5 h-5" />,
    'pre-workout': <Sun className="w-5 h-5" />,
    'post-workout': <Moon className="w-5 h-5" />,
  };

  const filteredEntries = entries?.filter(e => {
    const matchesSearch = e.foodItems?.some(f => f.name.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || e.mealType === filter;
    return matchesSearch && matchesFilter;
  }) || [];

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        mealType: entry.mealType,
        foodItems: entry.foodItems || [{ name: '', quantity: '', unit: 'g', calories: '', protein: '', carbs: '', fat: '' }],
        notes: entry.notes || '',
      });
    } else {
      setEditingEntry(null);
      setFormData({
        mealType: 'breakfast',
        foodItems: [{ name: '', quantity: '', unit: 'g', calories: '', protein: '', carbs: '', fat: '' }],
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

  const handleFoodChange = (index, field, value) => {
    const updatedItems = [...formData.foodItems];
    updatedItems[index][field] = value;
    setFormData({ ...formData, foodItems: updatedItems });
  };

  const addFoodItem = () => {
    setFormData({
      ...formData,
      foodItems: [...formData.foodItems, { name: '', quantity: '', unit: 'g', calories: '', protein: '', carbs: '', fat: '' }],
    });
  };

  const removeFoodItem = (index) => {
    if (formData.foodItems.length > 1) {
      const updatedItems = formData.foodItems.filter((_, i) => i !== index);
      setFormData({ ...formData, foodItems: updatedItems });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const entryData = {
      mealType: formData.mealType,
      foodItems: formData.foodItems.map(item => ({
        name: item.name,
        quantity: parseFloat(item.quantity) || 0,
        unit: item.unit || 'g',
        calories: parseFloat(item.calories) || 0,
        protein: parseFloat(item.protein) || 0,
        carbs: parseFloat(item.carbs) || 0,
        fat: parseFloat(item.fat) || 0,
      })),
      notes: formData.notes,
    };

    let result;
    if (editingEntry) {
      result = await editEntry(editingEntry._id, entryData);
    } else {
      result = await addEntry(entryData);
    }

    if (result.success) {
      // ✅ Send notification
      const mealName = formData.foodItems[0]?.name || formData.mealType;
      notifyMealLogged(mealName);
      handleCloseModal();
    }
    
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
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
            <Apple className="w-6 h-6 text-[#00ff00]" />
            Nutrition 🍎
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your daily meals and nutrition</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00ff00] text-[#02020a] px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Log Meal
        </button>
      </div>

      {/* Daily Summary */}
      <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
        <h3 className="text-white font-semibold mb-4">Today's Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-[#12121e] rounded-xl">
            <p className="text-gray-400 text-sm">Calories</p>
            <p className="text-2xl font-bold text-white">{dailySummary?.totalCalories || 0}</p>
          </div>
          <div className="text-center p-3 bg-[#12121e] rounded-xl">
            <p className="text-gray-400 text-sm">Protein</p>
            <p className="text-2xl font-bold text-[#00ff00]">{dailySummary?.totalProtein || 0}g</p>
          </div>
          <div className="text-center p-3 bg-[#12121e] rounded-xl">
            <p className="text-gray-400 text-sm">Carbs</p>
            <p className="text-2xl font-bold text-[#24cb24]">{dailySummary?.totalCarbs || 0}g</p>
          </div>
          <div className="text-center p-3 bg-[#12121e] rounded-xl">
            <p className="text-gray-400 text-sm">Fat</p>
            <p className="text-2xl font-bold text-[#50d650]">{dailySummary?.totalFat || 0}g</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === type
                  ? 'bg-[#00ff00] text-[#02020a]'
                  : 'bg-[#0a0a1a] text-gray-400 hover:text-white border border-[#00ff00]/10'
              }`}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10">
            <Apple className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No meals logged</h3>
            <p className="text-gray-400 text-sm mt-1">Start tracking your nutrition</p>
            <button 
              onClick={() => handleOpenModal()}
              className="mt-4 bg-[#00ff00] text-[#02020a] px-6 py-2 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Log Your First Meal
            </button>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry._id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                    {mealIcons[entry.mealType] || <Utensils className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold capitalize">{entry.mealType}</h3>
                    <p className="text-xs text-gray-400">{new Date(entry.date).toLocaleString()}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{entry.totalCalories || 0} kcal</span>
                      <span className="text-xs text-[#00ff00]">💪 {entry.totalProtein || 0}g</span>
                      <span className="text-xs text-[#24cb24]">🍞 {entry.totalCarbs || 0}g</span>
                      <span className="text-xs text-[#50d650]">🥑 {entry.totalFat || 0}g</span>
                    </div>
                    {entry.foodItems?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {entry.foodItems.slice(0, 3).map((item, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-[#12121e] text-gray-400 rounded-full">
                            {item.name}
                          </span>
                        ))}
                        {entry.foodItems.length > 3 && (
                          <span className="text-xs text-gray-500">+{entry.foodItems.length - 3} more</span>
                        )}
                      </div>
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
        title={editingEntry ? 'Edit Meal' : 'Log New Meal'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Meal Type</label>
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="pre-workout">Pre-Workout</option>
              <option value="post-workout">Post-Workout</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-300">Food Items</label>
              <button
                type="button"
                onClick={addFoodItem}
                className="text-xs text-[#00ff00] hover:text-[#24cb24] transition-colors font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Food
              </button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {formData.foodItems.map((item, index) => (
                <div key={index} className="bg-[#12121e] rounded-xl p-3 border border-[#00ff00]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400">Item {index + 1}</span>
                    {formData.foodItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFoodItem(index)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Food name"
                    value={item.name}
                    onChange={(e) => handleFoodChange(index, 'name', e.target.value)}
                    className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 mb-2"
                  />
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleFoodChange(index, 'quantity', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <select
                      value={item.unit}
                      onChange={(e) => handleFoodChange(index, 'unit', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white focus:border-[#00ff00] outline-none transition-all duration-300"
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="cup">cup</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="piece">piece</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Calories"
                      value={item.calories}
                      onChange={(e) => handleFoodChange(index, 'calories', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Protein"
                      value={item.protein}
                      onChange={(e) => handleFoodChange(index, 'protein', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Carbs"
                      value={item.carbs}
                      onChange={(e) => handleFoodChange(index, 'carbs', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Fat"
                      value={item.fat}
                      onChange={(e) => handleFoodChange(index, 'fat', e.target.value)}
                      className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#00ff00] outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
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
              placeholder="Any notes about this meal..."
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
                  {editingEntry ? 'Update Meal' : 'Log Meal'}
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

export default Nutrition;