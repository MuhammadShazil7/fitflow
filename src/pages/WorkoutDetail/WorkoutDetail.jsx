import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Zap,
  Edit2,
  Trash2,
  Calendar
} from 'lucide-react';
import { getWorkout, deleteWorkout, updateWorkout } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackWorkout } = useGame();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await getWorkout(id);
      setWorkout(response.data.workout);
      // Load completed exercises from localStorage if any
      const saved = localStorage.getItem(`workout_${id}_completed`);
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error fetching workout:', error);
      toast.error('Workout not found');
      navigate('/workouts');
    } finally {
      setLoading(false);
    }
  };

  const toggleExercise = (exerciseId) => {
    setCompleted(prev => {
      const newCompleted = prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId];
      
      // Save to localStorage
      localStorage.setItem(`workout_${id}_completed`, JSON.stringify(newCompleted));
      
      // Check if all exercises are completed
      if (newCompleted.length === workout.exercises.length) {
        toast.success('🎉 All exercises completed! Great job!');
      }
      
      return newCompleted;
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(id);
        toast.success('Workout deleted');
        navigate('/workouts');
      } catch (error) {
        toast.error('Failed to delete workout');
      }
    }
  };

  const handleStartWorkout = () => {
    // Track workout for XP
    trackWorkout(workout.name);
    toast.success(`💪 Started "${workout.name}"!`);
    // Reset completed exercises when starting
    setCompleted([]);
    localStorage.removeItem(`workout_${id}_completed`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400">Workout not found</p>
      </div>
    );
  }

  const progress = workout.exercises?.length > 0 
    ? (completed.length / workout.exercises.length) * 100 
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 bg-[#00ff00]/10 text-[#00ff00] rounded-full capitalize">
                {workout.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {workout.duration || 0} min
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#00ff00]" /> {workout.caloriesBurned || 0} kcal
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {new Date(workout.date).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{workout.name}</h1>
            {workout.notes && (
              <p className="text-gray-400 text-sm mt-1">{workout.notes}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartWorkout}
          className="w-full bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
        >
          <Play className="w-5 h-5" />
          Start Workout
        </button>
      </div>

      {/* Progress */}
      <div className="bg-[#0a0a1a] rounded-2xl p-5 border border-[#00ff00]/10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-[#00ff00]">
            {completed.length}/{workout.exercises?.length || 0} completed
          </span>
        </div>
        <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00ff00] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercises */}
      <h2 className="text-lg font-bold text-white mb-4">Exercises</h2>
      <div className="space-y-3">
        {workout.exercises?.map((exercise, index) => {
          const isCompleted = completed.includes(exercise._id || index);
          return (
            <div 
              key={exercise._id || index}
              className={`bg-[#0a0a1a] rounded-xl p-4 border transition-all duration-300 cursor-pointer ${
                isCompleted 
                  ? 'border-[#00ff00]/50 bg-[#00ff00]/5' 
                  : 'border-[#00ff00]/10 hover:border-[#00ff00]/30'
              }`}
              onClick={() => toggleExercise(exercise._id || index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-[#00ff00]" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <p className={`text-white font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {exercise.sets} sets × {exercise.reps} reps 
                      {exercise.weight > 0 && ` • ${exercise.weight}kg`}
                      {exercise.notes && ` • ${exercise.notes}`}
                    </p>
                  </div>
                </div>
                <Dumbbell className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutDetail;