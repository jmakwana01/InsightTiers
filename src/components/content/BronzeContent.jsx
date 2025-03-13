import React from 'react';

const BronzeContent = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Bronze Tier Content</h3>
      <p className="text-gray-800 mb-4">
        Welcome to the Bronze tier! Here's your exclusive blog post.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-2xl font-bold mb-3">Getting Started with Blockchain</h4>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Blockchain technology has revolutionized how we think about digital ownership and transactions.
            This comprehensive guide will walk you through the basics and help you understand the fundamentals.
          </p>
          
          <h5 className="text-xl font-semibold mt-6 mb-3">What is Blockchain?</h5>
          <p className="mb-4">
            At its core, a blockchain is a distributed database or ledger shared among computer network nodes. 
            As a database, a blockchain stores information electronically in digital format. Blockchains are best 
            known for their crucial role in cryptocurrency systems for maintaining a secure and decentralized 
            record of transactions, but they are not limited to cryptocurrency uses.
          </p>
          
          <h5 className="text-xl font-semibold mt-6 mb-3">Key Features of Blockchain</h5>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Decentralization:</strong> No single entity has control over the network</li>
            <li><strong>Transparency:</strong> All transactions are visible to anyone on the network</li>
            <li><strong>Immutability:</strong> Once data is recorded, it cannot be altered</li>
            <li><strong>Security:</strong> Cryptographic principles ensure data integrity</li>
          </ul>
          
          <p>
            This is just the beginning of your blockchain journey. In future articles, we'll explore smart 
            contracts, different consensus mechanisms, and how to build your first decentralized application.
          </p>
        </div>
        
        {/* Replace this with your actual blog content */}
        <div className="mt-6 text-sm text-gray-500">
          Published: March 10, 2025 | Author: Blockchain Expert
        </div>
      </div>
    </div>
  );
};

export default BronzeContent;