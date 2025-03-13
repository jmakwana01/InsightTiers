import React from 'react';
import { Button } from '../ui/Button';


import pdfFile from '../../assets/bitcoin.pdf';

const GoldContent = () => {
    const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = 'bitcoin.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return (
    <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Gold Tier Content</h3>
      <p className="text-gray-800 mb-4">
        Welcome to the Gold tier! Access our premium course materials.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-6">
          <div className="mr-4 text-4xl">📚</div>
          <div>
            <h4 className="text-2xl font-bold">Advanced DeFi Strategies</h4>
            <p className="text-gray-600">Comprehensive Guide to DeFi Investing</p>
          </div>
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="mb-4">
            This comprehensive course covers advanced DeFi strategies, yield farming, liquidity provision,
            and risk management in the blockchain ecosystem.
          </p>
          
          <h5 className="text-xl font-semibold mt-6 mb-3">What You'll Learn:</h5>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Yield Optimization:</strong> Advanced strategies beyond simple staking</li>
            <li><strong>Risk Assessment:</strong> How to evaluate protocol risks and minimize exposure</li>
            <li><strong>Tax Implications:</strong> Understanding the tax landscape for DeFi</li>
            <li><strong>Portfolio Construction:</strong> Building a balanced DeFi portfolio</li>
            <li><strong>Automation Tools:</strong> Using bots and scripts to optimize returns</li>
          </ul>
          
          <h5 className="text-xl font-semibold mt-6 mb-3">Course Contents:</h5>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Introduction to Advanced DeFi</li>
            <li>Liquidity Mining Strategies</li>
            <li>Lending Protocols and Interest Rate Arbitrage</li>
            <li>Options and Derivatives in DeFi</li>
            <li>Risk Management and Insurance Protocols</li>
            <li>Tax Planning for DeFi Investors</li>
            <li>Building Your Strategy Blueprint</li>
            <li>Case Studies and Success Stories</li>
          </ol>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <p className="font-medium">
            This PDF course includes reference sheets, calculation tools, and strategy templates
            to help you implement these strategies immediately.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleDownloadPDF} 
            variant="secondary" 
            size="large"
            className="flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoldContent;