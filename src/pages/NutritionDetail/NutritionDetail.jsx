import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Apple, 
  Coffee, 
  Sun, 
  Moon, 
  Utensils,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  Plus,
  Minus
} from 'lucide-react';

const NutritionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servings, setServings] = useState(1);

  const meal = {
    id: 1,
    type: 'breakfast',
    label: 'Breakfast',
    time: '8:00 AM',
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 15,
    foods: [
      { name: 'Oatmeal', amount: '50g', calories: 190, protein: 7, carbs: 32, fat: 3 },
      { name: 'Banana', amount: '1 medium', calories: 105, protein: 1, carbs: 27, fat: 0.5 },
      { name: 'Almond Milk', amount: '200ml', calories: 30, protein: 1, carbs: 0, fat: 0 },
      { name: 'Honey', amount: '1 tbsp', calories: 60, protein: 0, carbs: 17, fat: 0 },
      { name: 'Chia Seeds', amount: '10g', calories: 35, protein: 1, carbs: 3, fat: 2 },
    ]
  };

  const totalCalories = meal.foods.reduce((sum, f) => sum + f.calories, 0) * servings;
  const totalProtein = meal.foods.reduce((sum, f) => sum + f.protein, 0) * servings;
  const totalCarbs = meal.foods.reduce((sum, f) => sum + f.carbs, 0) * servings;
  const totalFat = meal.foods.reduce((sum, f) => sum + f.fat, 0) * servings;

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/nutrition')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#00ff00] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Nutrition
        </button>

        {/* Meal Header */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                <h1 className="text-2xl font-bold text-white">{meal.label}</h1>
              </div>
              <p className="text-gray-400 text-sm mt-1">Logged at {meal.time}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Serving Size */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-400">Servings:</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="p-1 rounded-full bg-[#12121e] text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-semibold w-8 text-center">{servings}</span>
              <button 
                onClick={() => setServings(servings + 1)}
                className="p-1 rounded-full bg-[#12121e] text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-[#0a0a1a] rounded-xl p-3 text-center border border-[#00ff00]/10">
            <p className="text-gray-400 text-xs">Calories</p>
            <p className="text-lg font-bold text-white">{totalCalories}</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-3 text-center border border-[#00ff00]/10">
            <p className="text-gray-400 text-xs">Protein</p>
            <p className="text-lg font-bold text-[#00ff00]">{totalProtein}g</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-3 text-center border border-[#00ff00]/10">
            <p className="text-gray-400 text-xs">Carbs</p>
            <p className="text-lg font-bold text-[#24cb24]">{totalCarbs}g</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-3 text-center border border-[#00ff00]/10">
            <p className="text-gray-400 text-xs">Fat</p>
            <p className="text-lg font-bold text-[#50d650]">{totalFat}g</p>
          </div>
        </div>

        {/* Food List */}
        <h2 className="text-lg font-bold text-white mb-4">Food Items</h2>
        <div className="space-y-3">
          {meal.foods.map((food, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{food.name}</p>
                  <p className="text-sm text-gray-400">{food.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{food.calories * servings} kcal</p>
                  <p className="text-xs text-gray-400">
                    💪{food.protein * servings}g • 🍞{food.carbs * servings}g • 🥑{food.fat * servings}g
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Food Button */}
        <button className="w-full bg-[#12121e] border border-[#00ff00]/20 text-white py-3 rounded-xl font-semibold hover:bg-[#1a1a2e] hover:border-[#00ff00]/40 transition-all duration-300 flex items-center justify-center gap-2 mt-4">
          <Plus className="w-5 h-5 text-[#00ff00]" />
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default NutritionDetail;