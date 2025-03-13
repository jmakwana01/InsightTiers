import React from 'react';
import { motion } from 'framer-motion';

export const ImpressionLoader = ({ text = 'Loading...', fullScreen = false }) => {
  return fullScreen ? (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center">
          <HexagonLoader />
          <p className="mt-6 text-gray-700 font-medium text-center">{text}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-8">
      <HexagonLoader />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

const HexagonLoader = () => {
  // Animation variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
      }
    }
  };

  const hexVariants = {
    initial: { 
      opacity: 0.3,
      scale: 0.8
    },
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Hexagon coordinates (6 hexagons arranged in a circle)
  const hexagons = [
    { cx: 50, cy: 15, color: "#8b5cf6" },  // Violet
    { cx: 85, cy: 50, color: "#ec4899" },  // Pink
    { cx: 50, cy: 85, color: "#3b82f6" },  // Blue
    { cx: 15, cy: 50, color: "#10b981" },  // Green
    { cx: 32, cy: 32, color: "#f59e0b" },  // Amber
    { cx: 68, cy: 68, color: "#ef4444" }   // Red
  ];

  return (
    <div className="w-32 h-32 relative">
      {/* Central pulse */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* SVG for hexagons */}
      <svg viewBox="0 0 100 100" className="absolute inset-0">
        <motion.g
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {hexagons.map((hex, index) => (
            <motion.path
              key={index}
              d={`M ${hex.cx + 15 * Math.cos(0)} ${hex.cy + 15 * Math.sin(0)} 
                  L ${hex.cx + 15 * Math.cos(Math.PI/3)} ${hex.cy + 15 * Math.sin(Math.PI/3)} 
                  L ${hex.cx + 15 * Math.cos(2*Math.PI/3)} ${hex.cy + 15 * Math.sin(2*Math.PI/3)} 
                  L ${hex.cx + 15 * Math.cos(Math.PI)} ${hex.cy + 15 * Math.sin(Math.PI)} 
                  L ${hex.cx + 15 * Math.cos(4*Math.PI/3)} ${hex.cy + 15 * Math.sin(4*Math.PI/3)} 
                  L ${hex.cx + 15 * Math.cos(5*Math.PI/3)} ${hex.cy + 15 * Math.sin(5*Math.PI/3)} Z`}
              fill={hex.color}
              variants={hexVariants}
              custom={index}
              style={{ originX: hex.cx, originY: hex.cy }}
            />
          ))}
        </motion.g>
        
        {/* Central circle */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="10" 
          fill="white"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Pulsing particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            initial={{
              x: 50,
              y: 50,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              x: 50 + Math.cos(i * Math.PI/3) * 40,
              y: 50 + Math.sin(i * Math.PI/3) * 40,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const TransactionLoader = ({ message = "Processing Transaction..." }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Chain effect */}
            <svg viewBox="0 0 100 100" className="absolute inset-0">
              <defs>
                <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              
              <motion.g
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI/4);
                  const x = 50 + 30 * Math.cos(angle);
                  const y = 50 + 30 * Math.sin(angle);
                  
                  return (
                    <motion.circle 
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="url(#chainGrad)"
                      stroke="#fff"
                      strokeWidth="1"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </motion.g>
              
              {/* Connection lines */}
              <motion.g
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {[...Array(8)].map((_, i) => {
                  const angle1 = (i * Math.PI/4);
                  const x1 = 50 + 30 * Math.cos(angle1);
                  const y1 = 50 + 30 * Math.sin(angle1);
                  
                  const angle2 = ((i+1) % 8 * Math.PI/4);
                  const x2 = 50 + 30 * Math.cos(angle2);
                  const y2 = 50 + 30 * Math.sin(angle2);
                  
                  return (
                    <motion.line 
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#chainGrad)"
                      strokeWidth="2"
                      strokeDasharray="5,3"
                      animate={{
                        strokeDashoffset: [0, -8]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  );
                })}
              </motion.g>
              
              {/* Central icon */}
              <motion.path
                d="M50,35 L60,50 L50,65 L40,50 Z"
                fill="#fff"
                stroke="url(#chainGrad)"
                strokeWidth="2"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{ transformOrigin: '50px 50px' }}
              />
            </svg>
          </div>
          
          <motion.p 
            className="mt-6 text-gray-700 font-medium text-center"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {message}
          </motion.p>
          
          <motion.p 
            className="mt-2 text-sm text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Please confirm in your wallet and wait for blockchain confirmation
          </motion.p>
        </div>
      </div>
    </div>
  );
};