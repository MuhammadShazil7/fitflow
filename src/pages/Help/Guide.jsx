import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Book, 
  Dumbbell, 
  Apple, 
  BarChart3, 
  Users, 
  Target,
  Settings,
  Award,
  Zap
} from 'lucide-react';

const Guide = () => {
  const sections = [
    {
      icon: <Dumbbell className="w-6 h-6 text-[#00ff00]" />,
      title: 'Getting Started',
      description: 'Learn the basics of FitFlow and set up your profile',
      steps: [
        'Create your account with email or Google',
        'Complete your fitness profile (height, weight, goals)',
        'Explore the dashboard to see your overview'
      ]
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-[#00ff00]" />,
      title: 'Tracking Workouts',
      description: 'Log your exercises and monitor progress',
      steps: [
        'Go to Workouts page and click "New Workout"',
        'Add exercises with sets, reps, and weight',
        'View your workout history and analytics'
      ]
    },
    {
      icon: <Apple className="w-6 h-6 text-[#00ff00]" />,
      title: 'Nutrition Tracking',
      description: 'Log meals and track your daily intake',
      steps: [
        'Navigate to Nutrition page',
        'Click "Log Meal" and select meal type',
        'Add food items with nutritional information'
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#00ff00]" />,
      title: 'Progress Tracking',
      description: 'Monitor your fitness journey with charts',
      steps: [
        'Go to Progress page',
        'Log your weight, measurements, and performance',
        'View progress charts and analytics'
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/help" 
            className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">User Guide</h1>
            <p className="text-gray-400 text-sm">Learn how to use FitFlow</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00ff00]/10 flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{section.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{section.description}</p>
                  <ul className="mt-3 space-y-1">
                    {section.steps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-[#00ff00] mt-0.5">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-gradient-to-r from-[#00ff00]/10 to-[#24cb24]/10 rounded-2xl p-6 border border-[#00ff00]/20">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00ff00]" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#00ff00]">💡</span>
              Log your workouts consistently for better progress tracking
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff00]">💡</span>
              Set realistic goals and track them weekly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff00]">💡</span>
              Join the community to stay motivated
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guide;