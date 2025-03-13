import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWallet } from './hooks/useWallet';

// Components
import LandingPage from './components/pages/LandingPage';
import Header from './components/layout/Header';
import { Card } from './components/ui/Card';
import { StatusCard } from './components/ui/StatusCard';
import TierToggle from './components/content/TierToggle';
import { Button } from './components/ui/Button';
import { DebouncedInput } from './components/ui/DebouncedInput';
import {  ImpressionLoader, TransactionLoader } from './components/ui/Loader';

// Constants
import { TIER_INFO, getTierName } from './constants/tiers';
import { CONTRACT_ADDRESSES, MinterABI } from './constants/contracts';

import { ethers } from 'ethers';

const APP_NAME = "InsightTiers"; 
const APP_TAGLINE = "Unlock Premium Knowledge Through Staking";

const App = () => {
  const { 
    connected, 
    loading, 
    dataLoading, 
    account, 
    provider, 
    signer, 
    walletBalance, 
    stakedAmount, 
    userTier, 
    privileges, 
    connectWallet, 
    disconnectWallet,
    fetchUserData 
  } = useWallet();
  
  
  const [page, setPage] = useState('landing');
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [expectedTokens, setExpectedTokens] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // For operations other than wallet connection
  const [isInitializing, setIsInitializing] = useState(true); // For initial app load
  const [isTransacting, setIsTransacting] = useState(false); // For transactions
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  // Initialize the app
  useEffect(() => {
    // Simulate checking for saved wallet connections
    const checkInitialState = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
      setIsInitializing(false);
    };
    
    checkInitialState();
  }, []);

  // Purchase tokens
  const purchaseTokens = async () => {
    if (!signer) return;
    
    setIsTransacting(true);
    try {
      const minterContract = new ethers.Contract(CONTRACT_ADDRESSES.minter, MinterABI, signer);
      const maticAmount = ethers.parseEther(purchaseAmount.toString());
      
      const tx = await minterContract.purchaseTokens({ value: maticAmount });
      await tx.wait();
      
      alert("Tokens purchased successfully!");
      await fetchUserData(provider, signer, account);
      setPage('dashboard');
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to purchase tokens.");
    } finally {
      setIsTransacting(false);
    }
  };
  

  // Get expected token amount for purchase
  const getExpectedTokens = async (amount) => {
    if (!provider || amount <= 0) return;
    
    setIsLoadingRate(true);
    try {
      const minterContract = new ethers.Contract(CONTRACT_ADDRESSES.minter, MinterABI, provider);
      const maticAmount = ethers.parseEther(amount.toString());
      
      const tokens = await minterContract.calculateTokenAmount(maticAmount);
      setExpectedTokens(ethers.formatUnits(tokens, 18));
    } catch (error) {
      console.error("Error calculating tokens:", error);
      setExpectedTokens("0");
    } finally {
      setIsLoadingRate(false);
    }
  };

  // Update expected tokens when purchase amount changes (using debounced input)
  useEffect(() => {
    if (provider && purchaseAmount > 0) {
      getExpectedTokens(purchaseAmount);
    }
  }, [purchaseAmount, provider]);
  // For persisting connection on refresh
  useEffect(() => {
    if (connected) {
      setPage('dashboard');
    } else if (!isInitializing) {
      setPage('landing');
    }
  }, [connected, isInitializing]);

  // Content display based on tier
  const ContentDisplay = () => {
    const hasAccess = userTier >= 0 && privileges.premium;

    if (!hasAccess) {
      return (
        <Card className="p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Premium Content Locked</h2>
          <p className="mb-6 text-gray-600 max-w-lg mx-auto">
            You need to stake INSIGHT tokens to access premium content. 
            Get tokens and stake them to unlock exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => setPage('mint')}
              variant="secondary"
              size="medium"
            >
              Buy Tokens
            </Button>
            <Button
              onClick={() => setPage('stake')}
              variant="primary"
              size="medium"
            >
              Stake Tokens
            </Button>
          </div>
        </Card>
      );
    }

    // Use the tier toggle component for tier switching
    return <TierToggle userTier={userTier} />;
  };

  // Dashboard Component
  const DashboardContent = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header 
          appName={APP_NAME}
          walletBalance={walletBalance} 
          setPage={setPage}
          disconnectWallet={disconnectWallet}
        />
        
        <div className="container mx-auto px-4 py-8">
          <Card title="Your Status" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard 
                title="Wallet Balance" 
                value={`${parseFloat(walletBalance).toFixed(2)} INSIGHT`} 
                icon="💰"
              />
              <StatusCard 
                title="Staked Amount" 
                value={`${parseFloat(stakedAmount).toFixed(2)} INSIGHT`} 
                icon="🔒"
              />
              <StatusCard 
                title="Current Tier" 
                value={getTierName(userTier)} 
                icon="⭐"
              />
            </div>
          </Card>
          
          <Card title="Premium Content">
            <ContentDisplay />
          </Card>
        </div>
      </div>
    );
  };

  // Mint Page Component
  const MintPageContent = () => {
    // Handling local input without invoking API on every keystroke
    const handlePurchaseAmountChange = (e) => {
      const value = Math.max(0.1, parseFloat(e.target.value) || 0);
      setPurchaseAmount(value);
    };
    
    return (
      <div className="min-h-screen bg-gray-100">
        {isTransacting && (
          <TransactionLoader message="Processing your purchase..." />
        )}
        
        <Header 
          appName={APP_NAME}
          walletBalance={walletBalance} 
          setPage={setPage}
          disconnectWallet={disconnectWallet}
        />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Purchase INSIGHT Tokens</h2>
            
            <DebouncedInput
              label="Amount in MATIC"
              type="number"
              value={purchaseAmount}
              onChange={handlePurchaseAmountChange}
              min="0.1"
              step="0.1"
              suffix="MATIC"
              debounceTime={500}
            />
            
            <div className="p-5 bg-gray-100 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">You'll receive:</span>
                {isLoadingRate ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-500">Calculating...</span>
                  </div>
                ) : (
                  <span className="font-bold">{parseFloat(expectedTokens).toFixed(2)} INSIGHT</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                {isLoadingRate ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-500">Calculating...</span>
                  </div>
                ) : (
                  <span>{(parseFloat(expectedTokens) / purchaseAmount).toFixed(2)} INSIGHT per MATIC</span>
                )}
              </div>
            </div>
            
            <Button
              onClick={purchaseTokens}
              disabled={isTransacting || isLoadingRate || purchaseAmount <= 0}
              fullWidth
              variant="secondary"
              size="large"
            >
              {isTransacting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Processing...
                </div>
              ) : "Purchase Tokens"}
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  // Stake Page Component
  const StakePageContent = () => {
    // Import necessary functions for staking
    const stakeTokens = async () => {
      if (!signer) return;
      
      setIsTransacting(true);
      try {
        const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES.blogToken, ["function approve(address spender, uint256 amount) returns (bool)"], signer);
        const stakingContract = new ethers.Contract(CONTRACT_ADDRESSES.staking, ["function stake(uint256 amount) external"], signer);
        
        const amount = ethers.parseEther(stakeAmount.toString());
        
        // Approve tokens first
        const approveTx = await tokenContract.approve(CONTRACT_ADDRESSES.staking, amount);
        await approveTx.wait();
        
        // Then stake
        const stakeTx = await stakingContract.stake(amount);
        await stakeTx.wait();
        
        alert("Tokens staked successfully!");
        await fetchUserData(provider, signer, account);
        setPage('dashboard');
      } catch (error) {
        console.error("Staking error:", error);
        alert("Failed to stake tokens.");
      }
      setIsTransacting(false);
    };
    
    // Handle input without triggering a recalculation
    const handleStakeAmountChange = (e) => {
      const value = Math.max(0, parseFloat(e.target.value) || 0);
      setStakeAmount(value);
    };
    
    return (
      <div className="min-h-screen bg-gray-100">
        <Header 
          appName={APP_NAME}
          walletBalance={walletBalance} 
          setPage={setPage}
          disconnectWallet={disconnectWallet}
        />
        
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Stake Your INSIGHT Tokens</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {TIER_INFO.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{item.tier}</h3>
                  <div className="text-white opacity-90 mb-4">
                    Requires: {item.requirement.replace("BLOG", "INSIGHT")}
                  </div>
                  <div className="bg-white bg-opacity-20 h-px mb-4"></div>
                  <ul className="text-white space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black bg-opacity-20 p-4 flex justify-center">
                  {userTier === index ? (
                    <span className="font-medium text-white">Current Tier</span>
                  ) : userTier > index ? (
                    <span className="font-medium text-white">Tier Unlocked</span>
                  ) : (
                    <span className="font-medium text-white">Tier Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Card className="max-w-xl mx-auto p-8">
            <h3 className="text-xl font-bold mb-6">Stake Your Tokens</h3>
            
            <DebouncedInput
              label="Amount to Stake"
              type="number"
              value={stakeAmount}
              onChange={handleStakeAmountChange}
              min="0"
              step="1"
              suffix="INSIGHT"
              helpText={`Available: ${parseFloat(walletBalance).toFixed(2)} INSIGHT`}
              error={stakeAmount > walletBalance ? "Amount exceeds available balance" : ""}
              debounceTime={300}
            />
            
            <div className="p-5 bg-gray-100 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Currently Staked:</span>
                <span className="font-medium">{parseFloat(stakedAmount).toFixed(2)} INSIGHT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">After Staking:</span>
                <span className="font-bold">
                  {(parseFloat(stakedAmount) + parseFloat(stakeAmount || 0)).toFixed(2)} INSIGHT
                </span>
              </div>
            </div>
            
            <Button
              onClick={stakeTokens}
              disabled={isLoading || stakeAmount <= 0 || stakeAmount > walletBalance}
              fullWidth
              variant="primary"
              size="large"
            >
              {isLoading ? "Processing..." : "Stake Tokens"}
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  // Show initial loading screen
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">{APP_NAME}</h1>
          <ImpressionLoader size="large" text="Initializing App..." />
        </div>
      </div>
    );
  }

  // Show fullscreen loader during long operations
  if (isLoading) {
    return <TransactionLoader fullScreen text="Processing Transaction..." />;
  }

  // Render the appropriate page
  return (
    <div className="font-sans">
    {dataLoading && <ImpressionLoader text="Loading Your Dashboard..." fullScreen />}
    {isTransacting && <TransactionLoader message="Processing Blockchain Transaction..." />}
    
    <AnimatePresence mode="wait">
      {page === 'landing' && !connected && (
        <LandingPage 
          appName={APP_NAME} 
          tagline={APP_TAGLINE}
          onConnect={connectWallet} 
          loading={loading} 
        />
      )}
      {page === 'dashboard' && connected && <DashboardContent />}
      {page === 'mint' && connected && <MintPageContent />}
      {page === 'stake' && connected && <StakePageContent />}
    </AnimatePresence>
  </div>
  );
};

export default App;