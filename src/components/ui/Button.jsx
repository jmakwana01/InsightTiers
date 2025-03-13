import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  fullWidth = false,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  className = ''
}) => {
  // Base classes
  let classes = `rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ${fullWidth ? 'w-full' : ''}`;
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-8 py-3 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600',
    secondary: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600',
    outline: 'border-2 border-purple-500 text-purple-500 bg-transparent hover:bg-purple-50',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600'
  };
  
  classes += ` ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${classes} ${className}`}
    >
      {children}
    </motion.button>
  );
};