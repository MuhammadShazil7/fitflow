import { useState, useEffect } from 'react';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../services/api';
import toast from 'react-hot-toast';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getWorkouts(params);
      setWorkouts(response.data.workouts);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch workouts');
      toast.error('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const addWorkout = async (data) => {
    try {
      const response = await createWorkout(data);
      setWorkouts(prev => [response.data.workout, ...prev]);
      toast.success('Workout created successfully!');
      return { success: true, workout: response.data.workout };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create workout');
      return { success: false };
    }
  };

  const editWorkout = async (id, data) => {
    try {
      const response = await updateWorkout(id, data);
      setWorkouts(prev => prev.map(w => w._id === id ? response.data.workout : w));
      toast.success('Workout updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update workout');
      return { success: false };
    }
  };

  const removeWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(prev => prev.filter(w => w._id !== id));
      toast.success('Workout deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete workout');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return { workouts, loading, error, fetchWorkouts, addWorkout, editWorkout, removeWorkout };
};