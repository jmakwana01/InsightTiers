import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BronzeContent from './BronzeContent';
import SilverContent from './SilverContent';
import GoldContent from './GoldContent';
import { TIER_INFO } from '../../constants/tiers';

const TierToggle = ({ userTier }) => {
  const [selectedTier, setSelectedTier] = useState(userTier);
  
  // Only show tiers that the user has access to
  const accessibleTiers = TIER_INFO.filter(tier => tier.id <= userTier);
  
  return (
    <div>
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {accessibleTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                selectedTier === tier.id 
                  ? `bg-gradient-to-r ${tier.color} text-white` 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tier.tier} Tier
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <motion.div
          key={selectedTier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTier === 0 && <BronzeContent />}
          {selectedTier === 1 && <SilverContent />}
          {selectedTier === 2 && <GoldContent />}
        </motion.div>
      </div>
    </div>
  );
};

export default TierToggle;