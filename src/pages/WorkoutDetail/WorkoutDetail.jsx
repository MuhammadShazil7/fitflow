import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Dumbbell, 
  CheckCircle,
  Circle,
  Play,
  Share2,
  Heart,
  Zap
} from 'lucide-react';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);

  const workout = {
    id: 1,
    name: 'HIIT & Strength',
    duration: '10 min',
    calories: 280,
    level: 'Intermediate',
    description: 'High-intensity interval training combined with strength exercises for maximum results.',
    exercises: [
      { id: 1, name: 'Jump Squats', sets: 3, reps: 12, rest: '30s' },
      { id: 2, name: 'Push-ups', sets: 3, reps: 15, rest: '30s' },
      { id: 3, name: 'Lunges', sets: 3, reps: 10, rest: '30s' },
      { id: 4, name: 'Plank', sets: 3, reps: '45s', rest: '30s' },
      { id: 5, name: 'Mountain Climbers', sets: 3, reps: 20, rest: '30s' },
    ]
  };

  const toggleExercise = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(c => c !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/workouts')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#00ff00] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Workouts
        </button>

        {/* Workout Header */}
        <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full">
                  {workout.level}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {workout.duration}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#00ff00]" /> {workout.calories} kcal
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">{workout.name}</h1>
              <p className="text-gray-400 text-sm mt-1">{workout.description}</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <button className="w-full bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 mt-4">
            <Play className="w-5 h-5" />
            Start Workout
          </button>
        </div>

        {/* Exercises */}
        <h2 className="text-lg font-bold text-white mb-4">Exercises</h2>
        <div className="space-y-3">
          {workout.exercises.map((exercise) => (
            <div 
              key={exercise.id}
              className={`bg-[#0a0a1a] rounded-xl p-4 border transition-all duration-300 cursor-pointer ${
                completed.includes(exercise.id) 
                  ? 'border-[#00ff00]/50 bg-[#00ff00]/5' 
                  : 'border-[#00ff00]/10 hover:border-[#00ff00]/30'
              }`}
              onClick={() => toggleExercise(exercise.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {completed.includes(exercise.id) ? (
                    <CheckCircle className="w-5 h-5 text-[#00ff00]" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <p className={`text-white font-medium ${completed.includes(exercise.id) ? 'line-through text-gray-400' : ''}`}>
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {exercise.sets} sets × {exercise.reps} reps • Rest {exercise.rest}
                    </p>
                  </div>
                </div>
                <Dumbbell className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-6 bg-[#0a0a1a] rounded-xl p-4 border border-[#00ff00]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-[#00ff00]">
              {completed.length}/{workout.exercises.length} completed
            </span>
          </div>
          <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / workout.exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;