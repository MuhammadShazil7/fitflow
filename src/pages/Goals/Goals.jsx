import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Plus, 
  CheckCircle, 
  Circle, 
  Dumbbell,
  Weight,
  Ruler,
  TrendingUp,
  Edit2,
  Trash2,
  Zap
} from 'lucide-react';

const Goals = () => {
  const [activeTab, setActiveTab] = useState('active');

  const goals = [
    {
      id: 1,
      title: 'Reach 75kg body weight',
      target: '75 kg',
      current: '72.5 kg',
      progress: 70,
      deadline: '2024-02-01',
      category: 'weight',
      status: 'active'
    },
    {
      id: 2,
      title: 'Bench Press 100kg',
      target: '100 kg',
      current: '85 kg',
      progress: 85,
      deadline: '2024-03-15',
      category: 'strength',
      status: 'active'
    },
    {
      id: 3,
      title: 'Run 5km in under 25 minutes',
      target: '25:00',
      current: '27:30',
      progress: 60,
      deadline: '2024-02-28',
      category: 'cardio',
      status: 'active'
    },
    {
      id: 4,
      title: 'Complete 100 workouts',
      target: '100',
      current: '76',
      progress: 76,
      deadline: '2024-04-01',
      category: 'general',
      status: 'completed'
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'weight', label: 'Weight' },
    { id: 'strength', label: 'Strength' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'general', label: 'General' },
  ];

  const filteredGoals = activeTab === 'active' 
    ? goals.filter(g => g.status === 'active')
    : goals.filter(g => g.status === 'completed');

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-[#00ff00]" />
              Goals 🎯
            </h1>
            <p className="text-gray-400 text-sm">Set and track your fitness goals</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <Plus className="w-4 h-4" />
            New Goal
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#0a0a1a] rounded-xl p-1 border border-[#00ff00]/10">
          {['active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-[#00ff00] text-[#02020a]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {goal.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-[#00ff00]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#00ff00]" />
                    )}
                    <h3 className="text-white font-semibold">{goal.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full">
                      {goal.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-400">🎯 {goal.target}</span>
                    <span className="text-sm text-gray-400">📊 {goal.current}</span>
                    <span className="text-sm text-gray-400">📅 {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-[#00ff00]">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;