import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser } from '../Services/api';
import api from '../Services/api'; // ✅ Use the configured api instance
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Welcome back! 🎉');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Account created successfully! 🎉');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // ✅ FIX: Use api instance (has baseURL: http://localhost:5000/api)
  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Not authenticated');
        return { success: false };
      }
      
      console.log('🔵 Updating user with data:', data); // Debug log
      
      const response = await api.put('/auth/me', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('🔵 Update response:', response.data); // Debug log
      
      setUser(response.data.user);
      toast.success('Profile updated successfully! ✅');
      return { success: true };
    } catch (error) {
      console.error('🔴 Update error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Update failed');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
      loadUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};