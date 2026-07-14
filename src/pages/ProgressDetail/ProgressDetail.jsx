import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Weight, 
  Ruler, 
  Dumbbell,
  Target,
  Calendar,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const ProgressDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const entry = {
    date: '2024-01-15',
    weight: 72.5,
    bodyFat: 15.5,
    muscleMass: 35.2,
    bmi: 22.4,
    measurements: {
      chest: 105,
      waist: 82,
      hips: 100,
      biceps: 35,
      thighs: 55
    },
    notes: 'Feeling great! Making steady progress.'
  };

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/progress')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#00ff00] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Progress
        </button>

        {/* Header */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Progress Details</h1>
              <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center gap-2">
              <Weight className="w-5 h-5 text-[#00ff00]" />
              <span className="text-gray-400 text-sm">Weight</span>
            </div>
            <p className="text-2xl font-bold text-white">{entry.weight} kg</p>
            <span className="text-xs text-[#00ff00] flex items-center gap-1">
              <ArrowDown className="w-3 h-3" /> -0.5 kg from last week
            </span>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#00ff00]" />
              <span className="text-gray-400 text-sm">Body Fat</span>
            </div>
            <p className="text-2xl font-bold text-white">{entry.bodyFat}%</p>
            <span className="text-xs text-[#00ff00] flex items-center gap-1">
              <ArrowDown className="w-3 h-3" /> -0.3% from last week
            </span>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[#00ff00]" />
              <span className="text-gray-400 text-sm">Muscle Mass</span>
            </div>
            <p className="text-2xl font-bold text-white">{entry.muscleMass} kg</p>
            <span className="text-xs text-[#00ff00] flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> +0.3 kg from last week
            </span>
          </div>
          <div className="bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#00ff00]" />
              <span className="text-gray-400 text-sm">BMI</span>
            </div>
            <p className="text-2xl font-bold text-white">{entry.bmi}</p>
            <span className="text-xs text-gray-400">Normal range: 18.5 - 24.9</span>
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#00ff00]" />
            Body Measurements (cm)
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(entry.measurements).map(([key, value]) => (
              <div key={key} className="bg-[#12121e] rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs capitalize">{key}</p>
                <p className="text-lg font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {entry.notes && (
          <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10">
            <h3 className="text-white font-semibold mb-2">Notes</h3>
            <p className="text-gray-400 text-sm">{entry.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDetail;