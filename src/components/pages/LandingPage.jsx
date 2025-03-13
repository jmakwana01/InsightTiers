import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { TIER_INFO } from '../../constants/tiers';
// import { ImpressionLoader } from '../ui/Loader';
const LandingPage = ({ appName, tagline, onConnect, loading }) => {
  const words = ["Knowledge", "Premium", "Content", "Insights"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-6">{appName}</h1>
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-light"
            >
              {words[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-xl mt-6 max-w-2xl mx-auto">
          {tagline}
        </p>
      </motion.div>
      
      <Button 
      onClick={onConnect} 
      disabled={loading}
      size="large"
      className="rounded-full"
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </div>
      ) : (
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Connect Wallet
        </div>
      )}
    </Button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {TIER_INFO.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`bg-gradient-to-br ${item.color} p-6 rounded-xl shadow-lg text-gray-900 text-center transform transition-all duration-300`}
          >
            <h3 className="text-2xl font-bold mb-2">{item.tier}</h3>
            <p className="text-white opacity-80">{item.requirement.replace("BLOG", "INSIGHT")}</p>
            <div className="bg-white bg-opacity-20 h-px my-3"></div>
            <p className="text-white">Exclusive content awaits</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPage;