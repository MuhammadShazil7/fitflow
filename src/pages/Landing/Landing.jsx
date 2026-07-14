import React from 'react';
import { Link } from 'react-router-dom';
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
  CheckCircle
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-[#00ff00]" />,
      title: 'Track Workouts',
      desc: 'Track your workouts and progress',
      action: 'Achieve your goals',
      link: 'Get started for free',
    },
    {
      icon: <Droplet className="w-8 h-8 text-[#00ff00]" />,
      title: 'Monitor Nutrition',
      desc: 'Track your calories, macros, and nutrition intake',
      action: 'Achieve your nutrition goals',
      link: 'Get started for free',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#00ff00]" />,
      title: 'View Progress',
      desc: 'Track your progress and see how far you\'ve come',
      action: 'Achieve your goals',
      link: 'Get started for free',
    },
    {
      icon: <Award className="w-8 h-8 text-[#00ff00]" />,
      title: 'Achieve Goals',
      desc: 'Set your goals and track your progress',
      action: 'Achieve your goals',
      link: 'Get started for free',
    },
  ];

  return (
    <div className="min-h-screen bg-[#02020a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#00ff00]/10 text-[#00ff00] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#00ff00]/20">
              <Zap className="w-4 h-4 animate-pulse" />
              Start Your Journey Today
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
              Transform Your
              <span className="block bg-gradient-to-r from-[#00ff00] to-[#24cb24] bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
              Track workouts, monitor nutrition, and achieve your fitness goals with our all-in-one platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 bg-[#00ff00] text-[#02020a] px-8 py-3.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center border-2 border-[#00ff00] text-[#00ff00] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.2)]"
              >
                Log In
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
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
              <div className="text-center sm:text-left">
                <p className="font-semibold text-white flex items-center gap-2 justify-center sm:justify-start">
                  <Users className="w-5 h-5 text-[#00ff00]" />
                  10,000+ Active Users
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  4.9/5 Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 border-y border-[#00ff00]/10 bg-[#0a0a1a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
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
                <div className="mt-3 flex items-center gap-2 text-[#00ff00] text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>{feature.action}</span>
                </div>
                <Link 
                  to="/register" 
                  className="mt-4 inline-flex items-center gap-1 text-[#00ff00] text-sm font-medium hover:gap-2 transition-all duration-300"
                >
                  {feature.link} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '50K+', label: 'Workouts Logged' },
              { number: '4.9★', label: 'User Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-[#00ff00] to-[#24cb24] bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-gray-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 text-center bg-gradient-to-br from-[#0a0a1a] to-[#12121e] border border-[#00ff00]/20 shadow-[0_0_60px_rgba(0,255,0,0.05)]">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ff00]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;