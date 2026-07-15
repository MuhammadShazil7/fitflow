import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Heatmap = () => {
  const { user } = useAuth();
  const [workoutData, setWorkoutData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await getWorkouts();
        const workouts = response.data.workouts;
        
        // Group workouts by date
        const data = {};
        workouts.forEach(w => {
          const date = new Date(w.date).toDateString();
          data[date] = (data[date] || 0) + 1;
        });
        
        setWorkoutData(data);
      } catch (error) {
        console.error('Error fetching workouts for heatmap:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchWorkouts();
  }, [user]);

  // Generate last 90 days
  const getLast90Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getColor = (count) => {
    if (count === 0) return 'bg-[#1a1a2e]';
    if (count <= 2) return 'bg-[#00ff00]/30';
    if (count <= 4) return 'bg-[#00ff00]/50';
    if (count <= 6) return 'bg-[#00ff00]/70';
    return 'bg-[#00ff00]';
  };

  const getTooltip = (date, count) => {
    if (count === 0) return 'No workouts';
    if (count === 1) return `${count} workout`;
    return `${count} workouts`;
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-400">Loading heatmap...</div>;
  }

  const days = getLast90Days();

  return (
    <div className="bg-[#0a0a1a] rounded-2xl p-4 border border-[#00ff00]/10">
      <h3 className="text-white font-semibold mb-3 text-sm">Activity Heatmap</h3>
      <div className="grid grid-cols-15 gap-1">
        {days.map((date, index) => {
          const key = date.toDateString();
          const count = workoutData[key] || 0;
          return (
            <div
              key={index}
              className={`w-4 h-4 rounded-sm ${getColor(count)} transition-all duration-300 hover:scale-150 hover:z-10 cursor-pointer relative group`}
              title={`${date.toLocaleDateString()}: ${getTooltip(date, count)}`}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#1a1a2e] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#00ff00]/20">
                {date.toLocaleDateString()}: {getTooltip(date, count)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[#1a1a2e]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#00ff00]/30"></div>
          <div className="w-3 h-3 rounded-sm bg-[#00ff00]/50"></div>
          <div className="w-3 h-3 rounded-sm bg-[#00ff00]/70"></div>
          <div className="w-3 h-3 rounded-sm bg-[#00ff00]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;