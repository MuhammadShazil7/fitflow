import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getCurrentUser = () => api.get('/auth/me');
export const updateUser = (data) => api.put('/auth/me', data);

// Workout APIs
export const createWorkout = (data) => api.post('/workouts', data);
export const getWorkouts = (params) => api.get('/workouts', { params });
export const getWorkout = (id) => api.get(`/workouts/${id}`);
export const updateWorkout = (id, data) => api.put(`/workouts/${id}`, data);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);
export const getWorkoutAnalytics = (params) => api.get('/workouts/analytics', { params });

// Nutrition APIs
export const createNutrition = (data) => api.post('/nutrition', data);
export const getNutrition = (params) => api.get('/nutrition', { params });
export const getNutritionEntry = (id) => api.get(`/nutrition/${id}`);
export const updateNutrition = (id, data) => api.put(`/nutrition/${id}`, data);
export const deleteNutrition = (id) => api.delete(`/nutrition/${id}`);
export const getDailyNutrition = (params) => api.get('/nutrition/summary/daily', { params });

// Progress APIs
export const createProgress = (data) => api.post('/progress', data);
export const getProgress = (params) => api.get('/progress', { params });
export const getProgressEntry = (id) => api.get(`/progress/${id}`);
export const updateProgress = (id, data) => api.put(`/progress/${id}`, data);
export const deleteProgress = (id) => api.delete(`/progress/${id}`);
export const getProgressAnalytics = (params) => api.get('/progress/analytics', { params });

export default api;