'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenEmailPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    console.log('Email submitted:', email);
    localStorage.setItem('hasSeenEmailPopup', 'true');
    setIsVisible(false);
    alert('Thank you! Check your email for the discount code.');
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenEmailPopup', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="text-white" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Get 20% Off!</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and get exclusive discount codes & deals!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-md hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Get My Discount Code
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            No spam, unsubscribe anytime. We care about your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}