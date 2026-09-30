import { useState, useEffect } from 'react';
import { getProgress, createProgress, updateProgress, deleteProgress, getProgressAnalytics } from '../Services/api';
import toast from 'react-hot-toast';

export const useProgress = () => {
  const [entries, setEntries] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getProgress(params);
      setEntries(response.data.entries);
    } catch (error) {
      toast.error('Failed to load progress entries');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (period = 'month') => {
    try {
      const response = await getProgressAnalytics({ period });
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Failed to load analytics');
    }
  };

  const addEntry = async (data) => {
    try {
      const response = await createProgress(data);
      setEntries(prev => [response.data.progress, ...prev]);
      toast.success('Progress logged successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to log progress');
      return { success: false };
    }
  };

  const editEntry = async (id, data) => {
    try {
      const response = await updateProgress(id, data);
      setEntries(prev => prev.map(e => e._id === id ? response.data.entry : e));
      toast.success('Progress updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update progress');
      return { success: false };
    }
  };

  const removeEntry = async (id) => {
    try {
      await deleteProgress(id);
      setEntries(prev => prev.filter(e => e._id !== id));
      toast.success('Progress entry deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete entry');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchAnalytics();
  }, []);

  return { entries, analytics, loading, fetchEntries, fetchAnalytics, addEntry, editEntry, removeEntry };
};