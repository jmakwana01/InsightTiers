import React from 'react';
import { motion } from 'framer-motion';

export const StatusCard = ({ title, value, icon }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md p-4"
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-gray-700 font-medium">{title}</h3>
      </div>
      <p className="text-xl font-bold text-indigo-900">{value}</p>
    </motion.div>
  );
};