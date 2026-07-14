import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  ChevronDown,
  BarChart3,
  TrendingUp,
  Award,
  Dumbbell,
  Apple,
  Weight
} from 'lucide-react';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');

  const reports = [
    { 
      id: 1,
      title: 'Monthly Progress Report',
      type: 'progress',
      date: '2024-01-31',
      size: '2.4 MB',
      icon: <TrendingUp className="w-5 h-5 text-[#00ff00]" />
    },
    { 
      id: 2,
      title: 'Workout Summary',
      type: 'workout',
      date: '2024-01-28',
      size: '1.8 MB',
      icon: <Dumbbell className="w-5 h-5 text-[#00ff00]" />
    },
    { 
      id: 3,
      title: 'Nutrition Report',
      type: 'nutrition',
      date: '2024-01-25',
      size: '3.1 MB',
      icon: <Apple className="w-5 h-5 text-[#00ff00]" />
    },
    { 
      id: 4,
      title: 'Weight Tracking Report',
      type: 'weight',
      date: '2024-01-20',
      size: '1.2 MB',
      icon: <Weight className="w-5 h-5 text-[#00ff00]" />
    },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00ff00]" />
              Reports 📊
            </h1>
            <p className="text-gray-400 text-sm">Generate and export fitness reports</p>
          </div>
          <button className="bg-[#00ff00] text-[#02020a] px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300">
            <Download className="w-4 h-4" />
            Generate New
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-gray-400 text-sm focus:border-[#00ff00] outline-none">
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <select className="bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-gray-400 text-sm focus:border-[#00ff00] outline-none">
            <option value="all">All Types</option>
            <option value="progress">Progress</option>
            <option value="workout">Workout</option>
            <option value="nutrition">Nutrition</option>
            <option value="weight">Weight</option>
          </select>
          <button className="bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2 text-gray-400 text-sm hover:text-white hover:border-[#00ff00]/30 transition-all duration-300 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff00]/10 flex items-center justify-center">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{report.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{report.date}</span>
                      <span className="text-xs text-gray-400">• {report.size}</span>
                      <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full capitalize">
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#12121e] text-gray-400 px-3 py-1.5 rounded-xl text-sm hover:text-white hover:bg-[#1a1a2e] transition-all duration-300">
                    View
                  </button>
                  <button className="bg-[#00ff00] text-[#02020a] px-3 py-1.5 rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-white">4</p>
            <p className="text-xs text-gray-400">Total Reports</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-[#00ff00]">12</p>
            <p className="text-xs text-gray-400">This Month</p>
          </div>
          <div className="bg-[#0a0a1a] rounded-2xl p-4 text-center border border-[#00ff00]/10">
            <p className="text-2xl font-bold text-white">2.1 MB</p>
            <p className="text-xs text-gray-400">Avg. Size</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;