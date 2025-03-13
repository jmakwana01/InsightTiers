import React from 'react';

const SilverContent = () => {
  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Silver Tier Content</h3>
      <p className="text-gray-800 mb-4">
        Welcome to the Silver tier! Enjoy our exclusive video content.
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
        <h4 className="text-xl font-bold mb-4">Advanced Smart Contract Development</h4>
        
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe 
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/M576WGiDBdQ" 
            title="Advanced Smart Contract Development" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            This comprehensive tutorial walks you through advanced smart contract patterns,
            security best practices, and optimization techniques for Ethereum and EVM-compatible blockchains.
          </p>
          
          <h5 className="text-lg font-semibold mt-4 mb-2">Video Topics:</h5>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Advanced Solidity patterns</li>
            <li>Gas optimization techniques</li>
            <li>Security considerations and audit preparation</li>
            <li>Upgradeability strategies</li>
            <li>Testing and deployment workflows</li>
          </ul>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Published: February 28, 2025 | Instructor: DeFi Developer
        </div>
      </div>
    </div>
  );
};

export default SilverContent;
