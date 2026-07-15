import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Mail,
  MessageCircle,
  Book,
  Video,
  ArrowRight,
  Home,
  Dumbbell,
  BarChart3,
  User
} from 'lucide-react';

const Help = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I track my workouts?',
      answer: 'Go to the Workouts page, click on "New Workout", and fill in your exercise details including sets, reps, and weight. You can also view your workout history and progress.'
    },
    {
      id: 2,
      question: 'How do I log my meals?',
      answer: 'Navigate to the Nutrition page, click "Log Meal", select the meal type (breakfast, lunch, dinner, snack), and add your food items with their nutritional information.'
    },
    {
      id: 3,
      question: 'How do I set fitness goals?',
      answer: 'Visit the Goals page and click "New Goal". You can set goals for weight, strength, cardio, or general fitness. Track your progress and celebrate when you achieve them!'
    },
    {
      id: 4,
      question: 'How does the community feature work?',
      answer: 'The Community page lets you connect with other fitness enthusiasts. You can share posts, view the leaderboard, and participate in challenges to stay motivated.'
    },
    {
      id: 5,
      question: 'How do I export my data?',
      answer: 'Go to Settings → Data Export. You can export your workout, nutrition, and progress data in PDF or CSV format for your records.'
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <HelpCircle className="w-12 h-12 text-[#00ff00] mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-white">How can we help you? 🤔</h1>
          <p className="text-gray-400 mt-2">Find answers to common questions and get support</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full bg-[#0a0a1a] border border-[#00ff00]/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
          />
        </div>

        {/* Quick Links - Updated with correct paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/help/guide" className="bg-[#0a0a1a] rounded-2xl p-5 text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
            <Book className="w-8 h-8 text-[#00ff00] mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold">User Guide</h3>
            <p className="text-gray-400 text-sm">Learn how to use FitFlow</p>
          </Link>
          <Link to="/help/videos" className="bg-[#0a0a1a] rounded-2xl p-5 text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
            <Video className="w-8 h-8 text-[#00ff00] mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold">Video Tutorials</h3>
            <p className="text-gray-400 text-sm">Watch step-by-step guides</p>
          </Link>
          <Link to="/contact" className="bg-[#0a0a1a] rounded-2xl p-5 text-center border border-[#00ff00]/10 hover:border-[#00ff00]/30 transition-all duration-300 group">
            <MessageCircle className="w-8 h-8 text-[#00ff00] mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold">Contact Support</h3>
            <p className="text-gray-400 text-sm">Get help from our team</p>
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-[#0a0a1a] rounded-2xl border border-[#00ff00]/10 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#12121e] transition-colors duration-300"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {expanded === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-[#00ff00]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#00ff00]" />
                )}
              </button>
              {expanded === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#00ff00]/10 to-[#24cb24]/10 rounded-2xl p-6 border border-[#00ff00]/20 text-center">
          <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-400 text-sm mb-4">Our support team is here to help</p>
          <Link 
            to="/contact"
            className="inline-block bg-[#00ff00] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>

       
      </div>
    </div>
  );
};



export default Help;