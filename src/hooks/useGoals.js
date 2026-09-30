import { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../Services/api';
import toast from 'react-hot-toast';

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getGoals(params);
      setGoals(response.data.goals || []);
    } catch (error) {
      console.error('Failed to load goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (data) => {
    try {
      const response = await createGoal(data);
      setGoals(prev => [response.data.goal, ...prev]);
      toast.success('Goal created successfully! 🎯');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create goal');
      return { success: false };
    }
  };

  const editGoal = async (id, data) => {
    try {
      const response = await updateGoal(id, data);
      setGoals(prev => prev.map(g => g._id === id ? response.data.goal : g));
      toast.success('Goal updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update goal');
      return { success: false };
    }
  };

  const removeGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(prev => prev.filter(g => g._id !== id));
      toast.success('Goal deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete goal');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return { goals, loading, fetchGoals, addGoal, editGoal, removeGoal };
};