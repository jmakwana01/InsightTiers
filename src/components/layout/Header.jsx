import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const Header = ({ appName = "InsightTiers", walletBalance, setPage, disconnectWallet }) => {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="mr-3 text-2xl"
          >
            💎
          </motion.div>
          <h1 className="text-xl font-bold">{appName}</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center">
            <span className="mr-2">Balance:</span>
            <span className="font-medium">{parseFloat(walletBalance).toFixed(2)} INSIGHT</span>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => setPage('dashboard')}
              size="small"
              variant="primary"
            >
              Dashboard
            </Button>
            <Button 
              onClick={() => setPage('mint')}
              size="small"
              variant="secondary"
            >
              Buy
            </Button>
            <Button 
              onClick={() => setPage('stake')}
              size="small"
              variant="primary"
            >
              Stake
            </Button>
            <Button 
              onClick={disconnectWallet}
              size="small"
              variant="outline"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
