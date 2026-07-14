import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Apple, 
  Plus, 
  Search, 
  Calendar, 
  TrendingUp,
  Droplet,
  Utensils,
  Coffee,
  Sun,
  Moon,
  ArrowRight,
   Home, Dumbbell, BarChart3, User
} from 'lucide-react';

const Nutrition = () => {
  const [date, setDate] = useState(new Date());

  const meals = [
    { 
      id: 1,
      type: 'breakfast',
      label: 'Breakfast',
      icon: <Coffee className="w-5 h-5" />,
      time: '8:00 AM',
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 15,
      items: ['Oatmeal', 'Banana', 'Almond Milk']
    },
    { 
      id: 2,
      type: 'lunch',
      label: 'Lunch',
      icon: <Sun className="w-5 h-5" />,
      time: '12:30 PM',
      calories: 580,
      protein: 35,
      carbs: 55,
      fat: 20,
      items: ['Grilled Chicken', 'Brown Rice', 'Broccoli']
    },
    { 
      id: 3,
      type: 'snack',
      label: 'Snack',
      icon: <Utensils className="w-5 h-5" />,
      time: '4:00 PM',
      calories: 180,
      protein: 10,
      carbs: 20,
      fat: 5,
      items: ['Greek Yogurt', 'Berries']
    },
    { 
      id: 4,
      type: 'dinner',
      label: 'Dinner',
      icon: <Moon className="w-5 h-5" />,
      time: '7:30 PM',
      calories: 520,
      protein: 40,
      carbs: 35,
      fat: 25,
      items: ['Salmon', 'Quinoa', 'Asparagus']
    },
  ];

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

  const dailyGoal = 2000;

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Nutrition 🍎</h1>
            <p className="text-gray-400 text-sm">Track your daily meals and nutrition</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <Plus className="w-4 h-4" />
            Log Meal
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-4 mb-4">
          <button className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-white font-medium">
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <button className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Summary */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Calories</p>
              <p className="text-xl font-bold text-white">{totalCalories}</p>
              <p className="text-xs text-gray-500">Goal: {dailyGoal}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Protein</p>
              <p className="text-xl font-bold text-[#00ff00]">{totalProtein}g</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Carbs</p>
              <p className="text-xl font-bold text-[#24cb24]">{totalCarbs}g</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Fat</p>
              <p className="text-xl font-bold text-[#50d650]">{totalFat}g</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
                style={{ width: `${(totalCalories / dailyGoal) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                    {meal.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{meal.label}</h3>
                    <p className="text-xs text-gray-400">{meal.time}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{meal.calories} kcal</span>
                      <span className="text-xs text-[#00ff00]">💪 {meal.protein}g</span>
                      <span className="text-xs text-[#24cb24]">🍞 {meal.carbs}g</span>
                      <span className="text-xs text-[#50d650]">🥑 {meal.fat}g</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {meal.items.map((item, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-[#12121e] text-gray-400 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-[#00ff00] transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

// Bottom Navigation Component (reuse from Workouts)
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