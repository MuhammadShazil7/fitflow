import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH =====
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getCurrentUser = () => api.get('/auth/me');
export const updateUser = (data) => api.put('/auth/me', data);

// ===== WORKOUTS =====
export const createWorkout = (data) => api.post('/workouts', data);
export const getWorkouts = (params) => api.get('/workouts', { params });
export const getWorkout = (id) => api.get(`/workouts/${id}`);
export const updateWorkout = (id, data) => api.put(`/workouts/${id}`, data);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);
export const getWorkoutAnalytics = (params) => api.get('/workouts/analytics', { params });

// ===== NUTRITION =====
export const createNutrition = (data) => api.post('/nutrition', data);
export const getNutrition = (params) => api.get('/nutrition', { params });
export const getNutritionEntry = (id) => api.get(`/nutrition/${id}`);
export const updateNutrition = (id, data) => api.put(`/nutrition/${id}`, data);
export const deleteNutrition = (id) => api.delete(`/nutrition/${id}`);
export const getDailyNutrition = (params) => api.get('/nutrition/summary/daily', { params });

// ===== PROGRESS =====
export const createProgress = (data) => api.post('/progress', data);
export const getProgress = (params) => api.get('/progress', { params });
export const getProgressEntry = (id) => api.get(`/progress/${id}`);
export const updateProgress = (id, data) => api.put(`/progress/${id}`, data);
export const deleteProgress = (id) => api.delete(`/progress/${id}`);
export const getProgressAnalytics = (params) => api.get('/progress/analytics', { params });

// ===== GOALS =====
export const createGoal = (data) => api.post('/goals', data);
export const getGoals = (params) => api.get('/goals', { params });
export const getGoal = (id) => api.get(`/goals/${id}`);
export const updateGoal = (id, data) => api.put(`/goals/${id}`, data);
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

// ===== POSTS (Community) =====
export const createPost = (data) => api.post('/posts', data);
export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id) => api.post(`/posts/${id}/like`);
export const addComment = (id, text) => api.post(`/posts/${id}/comments`, { text });
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);

// ===== LEADERBOARD =====
export const getLeaderboard = () => api.get('/posts/leaderboard');
export const getUserRank = () => api.get('/posts/leaderboard/rank');

export default api;