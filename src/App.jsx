import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';

// ===== COMPONENTS =====
import Navbar from './components/landing/Navbar/Navbar';
import Footer from './components/common/Footer';
import MobileBottomNav from './components/common/MobileBottomNav';

// ===== PUBLIC PAGES =====
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Help from './pages/Help/Help';
import Contact from './pages/Contact/Contact';
import Community from './pages/Community/Community';

// ===== PRIVATE PAGES (Require Login) =====
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
import Analytics from './pages/Analytics/Analytics';
import Goals from './pages/Goals/Goals';
import Achievements from './pages/Achievements/Achievements';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';
import Videos from './pages/Help/Videos'
import Guide from './pages/Help/Guide';
// ===== ROUTE GUARDS =====
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

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02020a]">
        <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
      <ThemeProvider>
    <NotificationProvider>
    <Router>
      <AuthProvider>
       <NotificationProvider>
        <GameProvider>
          <div className="min-h-screen flex flex-col bg-[#02020a]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* ===== PUBLIC ROUTES (No Login Required) ===== */}
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/guide" element={<Guide />} />
                <Route path="/help/videos" element={<Videos />} />
                <Route path="/contact" element={<Contact />} />
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
                
                {/* Analytics Routes */}
                <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
                <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
                
                {/* Settings & Others */}
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
            <MobileBottomNav />
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
          </div>
        </GameProvider>
       </NotificationProvider>
      </AuthProvider>
    </Router>
    </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;