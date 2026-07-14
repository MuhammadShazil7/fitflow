import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/landing/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Help from './pages/Help/Help';
import Community from './pages/Community/Community';
import Contact from './pages/Contact/Contact';
import Guide from './pages/Help/Guide';
import Videos from './pages/Help/Videos';

// Private Pages (Require Login)
import Dashboard from './pages/Dashboard/Dashboard';
import Workouts from './pages/Workouts/Workouts';
import WorkoutDetail from './pages/WorkoutDetail/WorkoutDetail';
import Nutrition from './pages/Nutrition/Nutrition';
import NutritionDetail from './pages/NutritionDetail/NutritionDetail';
import Progress from './pages/Progress/Progress';
import ProgressDetail from './pages/ProgressDetail/ProgressDetail';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import Settings from './pages/Settings/Settings';
import Goals from './pages/Goals/Goals';
import Achievements from './pages/Achievements/Achievements';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';

// Route Guards
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02020a]">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,255,0,0.3)]"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Guard (Redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02020a]">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,255,0,0.3)]"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            {/* ===== PUBLIC ROUTES (No Login Required) ===== */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/community" element={<Community />} />
            
            {/* ===== AUTH ROUTES (Redirect to dashboard if logged in) ===== */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* ===== PRIVATE ROUTES (Require Login) ===== */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            
            {/* Workout Routes */}
            <Route path="/workouts" element={<PrivateRoute><Workouts /></PrivateRoute>} />
            <Route path="/workouts/:id" element={<PrivateRoute><WorkoutDetail /></PrivateRoute>} />
            
            {/* Nutrition Routes */}
            <Route path="/nutrition" element={<PrivateRoute><Nutrition /></PrivateRoute>} />
            <Route path="/nutrition/:id" element={<PrivateRoute><NutritionDetail /></PrivateRoute>} />
            
            {/* Progress Routes */}
            <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
            <Route path="/progress/:id" element={<PrivateRoute><ProgressDetail /></PrivateRoute>} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/profile/edit" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
            
            {/* Other Private Routes */}
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
            <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
            <Route path="/help/guide" element={<PublicRoute><Guide /></PublicRoute>} />
            <Route path="/help/videos" element={<PublicRoute><Videos /></PublicRoute>} />
          </Routes>
        </main>
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            duration: 4000, 
            style: { 
              background: '#0a0a1a', 
              color: '#00ff00', 
              borderRadius: '12px', 
              padding: '16px',
              border: '1px solid rgba(0, 255, 0, 0.2)',
            },
          }} 
        />
      </AuthProvider>
    </Router>
  );
}

export default App;