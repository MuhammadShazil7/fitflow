import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-[#00ff00]" />, label: 'Email', value: 'support@fitflow.com' },
    { icon: <Phone className="w-5 h-5 text-[#00ff00]" />, label: 'Phone', value: '+92 313 1267143' },
    { icon: <MapPin className="w-5 h-5 text-[#00ff00]" />, label: 'Address', value: '123 Fitness St, Karachi' },
    { icon: <Clock className="w-5 h-5 text-[#00ff00]" />, label: 'Hours', value: 'Mon-Fri 9AM - 6PM EST' },
  ];

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-[#0a0a1a] rounded-2xl p-8 border border-[#00ff00]/20">
          <div className="w-20 h-20 rounded-full bg-[#00ff00]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#00ff00]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Message Sent! ✅</h2>
          <p className="text-gray-400 text-sm mb-6">
            Thank you for reaching out! We'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-[#00ff00] text-[#02020a] px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              Send Another Message
            </button>
            <Link 
              to="/help" 
              className="border border-[#00ff00] text-[#00ff00] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#00ff00] hover:text-[#02020a] transition-all duration-300"
            >
              Back to Help
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02020a] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/help" 
            className="p-2 text-gray-400 hover:text-[#00ff00] transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Contact Support</h1>
            <p className="text-gray-400 text-sm">We're here to help you 24/7</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00ff00]" />
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00ff00]/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10 text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="text-white font-semibold text-sm">Live Chat Available</h4>
              <p className="text-gray-400 text-xs mt-1">Mon-Fri 9AM - 6PM EST</p>
              <button className="mt-3 text-[#00ff00] text-sm font-medium hover:text-[#24cb24] transition-colors">
                Start Chat →
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-[#00ff00]/10">
              <h3 className="text-white font-semibold mb-4">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-[#12121e] border border-[#00ff00]/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00]/20 outline-none transition-all duration-300 resize-none"
                    placeholder="Describe your issue or question..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00ff00] text-[#02020a] py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-[#02020a] border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;