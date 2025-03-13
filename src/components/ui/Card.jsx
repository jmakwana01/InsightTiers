import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  title,
  className = '',
  animate = true
}) => {
  const CardComponent = animate ? motion.div : 'div';
  
  return (
    <CardComponent
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.4 } : undefined}
      className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}
    >
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
    </CardComponent>
  );
};
