import { useState, useEffect } from 'react';
import { getNutrition, createNutrition, updateNutrition, deleteNutrition, getDailyNutrition } from '../Services/api';
import toast from 'react-hot-toast';

export const useNutrition = () => {
  const [entries, setEntries] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getNutrition(params);
      setEntries(response.data.entries);
    } catch (error) {
      toast.error('Failed to load nutrition entries');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailySummary = async (date) => {
    try {
      const response = await getDailyNutrition({ date });
      setDailySummary(response.data.summary);
    } catch (error) {
      console.error('Failed to load daily summary');
    }
  };

  const addEntry = async (data) => {
    try {
      const response = await createNutrition(data);
      setEntries(prev => [response.data.entry, ...prev]);
      toast.success('Meal logged successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to log meal');
      return { success: false };
    }
  };

  const editEntry = async (id, data) => {
    try {
      const response = await updateNutrition(id, data);
      setEntries(prev => prev.map(e => e._id === id ? response.data.entry : e));
      toast.success('Entry updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update entry');
      return { success: false };
    }
  };

  const removeEntry = async (id) => {
    try {
      await deleteNutrition(id);
      setEntries(prev => prev.filter(e => e._id !== id));
      toast.success('Entry deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete entry');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchDailySummary();
  }, []);

  return { entries, dailySummary, loading, fetchEntries, fetchDailySummary, addEntry, editEntry, removeEntry };
};