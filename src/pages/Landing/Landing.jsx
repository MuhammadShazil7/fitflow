import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Activity, 
  BarChart3, 
  Award, 
  ArrowRight, 
  Users, 
  Star, 
  Droplet,
  Zap,
  CheckCircle,
  TrendingUp,
  Flame,
  Target,
  Crown,
  Sparkles,
  Clock,
  Calendar,
  Heart,
  Shield,
  Zap as Lightning,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { FiInstagram, FiGithub, FiTwitter } from 'react-icons/fi';
import { useAuth } from '../../Context/authContext';
import { useGame } from '../../Context/GameContext';
import { useWorkouts } from '../../hooks/useWorkouts';

const Landing = () => {
  const { isAuthenticated, user } = useAuth();
  const { level, streak, achievements } = useGame();
  const { workouts } = useWorkouts();
  const navigate = useNavigate();

  const totalWorkouts = workouts?.length || 0;
  const totalAchievements = achievements?.length || 0;

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-[#00ff00]" />,
      title: 'Track Workouts',
      desc: 'Log exercises, sets, reps, and weights with ease',
      color: 'border-[#00ff00]/20',
    },
    {
      icon: <Droplet className="w-8 h-8 text-[#00ff00]" />,
      title: 'Monitor Nutrition',
      desc: 'Track your calories, macros, and nutrition intake',
      color: 'border-[#00ff00]/20',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#00ff00]" />,
      title: 'View Progress',
      desc: 'Track your progress with beautiful charts',
      color: 'border-[#00ff00]/20',
    },
    {
      icon: <Award className="w-8 h-8 text-[#00ff00]" />,
      title: 'Achieve Goals',
      desc: 'Set goals and earn achievements',
      color: 'border-[#00ff00]/20',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      text: 'FitFlow completely transformed my fitness journey! The XP system keeps me motivated every day.',
      avatar: 'SJ',
      color: '#00ff00',
    },
    {
      name: 'Mike Chen',
      role: 'Personal Trainer',
      text: 'Best fitness tracker I have ever used. My clients love the gamification features!',
      avatar: 'MC',
      color: '#24cb24',
    },
    {
      name: 'Emma Wilson',
      role: 'Marathon Runner',
      text: 'The progress tracking and analytics are absolutely amazing. Highly recommended!',
      avatar: 'EW',
      color: '#50d650',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
    { number: '50K+', label: 'Workouts Logged', icon: <Dumbbell className="w-6 h-6" /> },
    { number: '4.9★', label: 'User Rating', icon: <Star className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-[#02020a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {isAuthenticated ? (
                <div className="inline-flex items-center gap-2 bg-[#00ff00]/10 text-[#00ff00] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#00ff00]/20">
                  <Zap className="w-4 h-4 animate-pulse" />
                  Welcome back, {user?.name || user?.username}! 👋
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#00ff00]/10 text-[#00ff00] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#00ff00]/20">
                  <Sparkles className="w-4 h-4" />
                  Start Your Journey Today
                </div>
              )}
              
              {isAuthenticated ? (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
                  Continue Your
                  <span className="block bg-gradient-to-r from-[#00ff00] to-[#24cb24] bg-clip-text text-transparent">
                    Fitness Journey
                  </span>
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
                  Transform Your
                  <span className="block bg-gradient-to-r from-[#00ff00] to-[#24cb24] bg-clip-text text-transparent">
                    Fitness Journey
                  </span>
                </h1>
              )}
              
              <p className="text-lg md:text-xl text-gray-400 max-w-lg mt-4 leading-relaxed">
                {isAuthenticated 
                  ? `You've completed ${totalWorkouts} workouts! Keep pushing towards your goals. 💪`
                  : 'Track workouts, monitor nutrition, and achieve your fitness goals with our all-in-one platform.'
                }
              </p>

              {/* Quick Stats for Logged In Users */}
              {isAuthenticated && (
                <div className="grid grid-cols-4 gap-3 mt-6 max-w-lg">
                  <div className="bg-[#0a0a1a] rounded-xl p-3 border border-[#00ff00]/10 text-center">
                    <p className="text-xs text-gray-400">Workouts</p>
                    <p className="text-lg font-bold text-white">{totalWorkouts}</p>
                  </div>
                  <div className="bg-[#0a0a1a] rounded-xl p-3 border border-[#00ff00]/10 text-center">
                    <p className="text-xs text-gray-400">Level</p>
                    <p className="text-lg font-bold text-[#00ff00]">{level}</p>
                  </div>
                  <div className="bg-[#0a0a1a] rounded-xl p-3 border border-[#00ff00]/10 text-center">
                    <p className="text-xs text-gray-400">Streak</p>
                    <p className="text-lg font-bold text-orange-500">{streak}🔥</p>
                  </div>
                  <div className="bg-[#0a0a1a] rounded-xl p-3 border border-[#00ff00]/10 text-center">
                    <p className="text-xs text-gray-400">Achievements</p>
                    <p className="text-lg font-bold text-yellow-500">{totalAchievements}</p>
                  </div>
                </div>
              )}
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center gap-2 bg-[#00ff00] text-[#02020a] px-6 py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105"
                    >
                      Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                      to="/workouts" 
                      className="inline-flex items-center border-2 border-[#00ff00] text-[#00ff00] px-6 py-3 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300"
                    >
                      Log Workout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="inline-flex items-center gap-2 bg-[#00ff00] text-[#02020a] px-6 py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center border-2 border-[#00ff00] text-[#00ff00] px-6 py-3 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>

              {/* Social Proof */}
              {!isAuthenticated && (
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex -space-x-2">
                    {['#00ff00', '#24cb24', '#50d650', '#7ce07c', '#a8eba8'].map((color, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#02020a] flex items-center justify-center text-[#02020a] text-xs font-bold"
                        style={{ backgroundColor: color }}
                      >
                        {['SJ', 'MC', 'EW', 'AK', 'TR'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#00ff00]" />
                      10,000+ Active Users
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      4.9/5 Rating
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Content - Feature Preview */}
            <div className="hidden lg:block">
              <div className="bg-[#0a0a1a] rounded-3xl p-6 border border-[#00ff00]/20 shadow-[0_0_60px_rgba(0,255,0,0.05)]">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-[#12121e] rounded-xl p-4 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#00ff00]/10 flex items-center justify-center mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{feature.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-[#00ff00]/5 rounded-xl border border-[#00ff00]/10">
                  <p className="text-center text-sm text-gray-300">
                    {isAuthenticated ? (
                      <span className="flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 text-[#00ff00]" />
                        You're on a {streak} day streak! Keep going! 🔥
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00ff00]" />
                        Join 10,000+ users today!
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 border-y border-[#00ff00]/10 bg-[#0a0a1a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00ff00] text-sm font-semibold uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 hover:border-[#00ff00]/30 hover:shadow-[0_0_30px_rgba(0,255,0,0.05)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00ff00]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                <Link 
                  to={isAuthenticated ? '/dashboard' : '/register'}
                  className="mt-4 inline-flex items-center gap-1 text-[#00ff00] text-sm font-medium hover:gap-2 transition-all duration-300"
                >
                  {isAuthenticated ? 'Continue' : 'Learn More'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00ff00] text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#02020a] font-bold text-sm"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.text}"</p>
                <div className="flex mt-3 text-yellow-400">
                  {'★★★★★'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Only for non-logged in */}
      {!isAuthenticated && (
        <section className="py-12 bg-[#0a0a1a]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center text-[#00ff00] mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-[#00ff00] to-[#24cb24] bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Logged In - Motivation Section */}
      {isAuthenticated && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-[#24cb24]/5 rounded-3xl p-8 border border-[#00ff00]/20 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                You're on fire! 🔥
              </h3>
              <p className="text-gray-400">
                Keep pushing towards your fitness goals. Every workout counts!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-[#00ff00]" />
                  <span className="text-white">{totalWorkouts} workouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00ff00]" />
                  <span className="text-white">Level {level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-white">{streak} day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-white">{totalAchievements} achievements</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 text-center bg-gradient-to-br from-[#0a0a1a] to-[#12121e] border border-[#00ff00]/20 shadow-[0_0_60px_rgba(0,255,0,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {isAuthenticated ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    Ready for Your Next Workout? 💪
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    You've come this far, don't stop now! Every workout brings you closer to your goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/workouts" 
                      className="inline-flex items-center justify-center gap-2 bg-[#00ff00] text-[#02020a] px-8 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105"
                    >
                      Log Workout
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center justify-center border-2 border-[#00ff00] text-[#00ff00] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300"
                    >
                      View Dashboard
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of users who have transformed their fitness journey with FitFlow.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/register" 
                      className="inline-flex items-center justify-center gap-2 bg-[#00ff00] text-[#02020a] px-8 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center justify-center border-2 border-[#00ff00] text-[#00ff00] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300"
                    >
                      Log In
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">No credit card required. Free forever.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;