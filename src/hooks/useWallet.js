import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, BlogTokenABI, StakingABI } from '../constants/contracts';

export function useWallet() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false); // New state for data loading
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [userTier, setUserTier] = useState(0);
  const [privileges, setPrivileges] = useState({ premium: false, webinars: false, support: false });

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        connectWallet();
      }
    };
    
    checkConnection();
    
    // Event listener for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected
          setConnected(false);
          setAccount(null);
        } else {
          // Account changed
          setAccount(accounts[0]);
          fetchUserData(provider, signer, accounts[0]);
        }
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setConnected(true);
        
        // Start data loading
        setDataLoading(true);
        
        // Get user data
        await fetchUserData(provider, signer, address);
        
        // End data loading
        setDataLoading(false);
      } else {
        alert("Please install MetaMask to use this dApp!");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect wallet.");
      setDataLoading(false); // Make sure to reset if there's an error
    }
    setLoading(false);
  };

  const fetchUserData = async (provider, signer, address) => {
    setDataLoading(true); // Show loading when refreshing data
    try {
      // Get token balance
      const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES.blogToken, BlogTokenABI, provider);
      const balance = await tokenContract.balanceOf(address);
      setWalletBalance(ethers.formatUnits(balance, 18));
      
      // Get staking info
      const stakingContract = new ethers.Contract(CONTRACT_ADDRESSES.staking, StakingABI, provider);
      const tier = await stakingContract.getUserTier(address);
      const staked = await stakingContract.getStakedAmount(address);
      const userPrivileges = await stakingContract.getUserPrivileges(address);
      
      setUserTier(Number(ethers.getBigInt(tier)));
      setStakedAmount(ethers.formatUnits(staked, 18));
      setPrivileges({
        premium: userPrivileges[0],
        webinars: userPrivileges[1],
        support: userPrivileges[2]
      });
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setDataLoading(false); // Hide loading when done
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setWalletBalance(0);
    setStakedAmount(0);
    setUserTier(0);
    setPrivileges({ premium: false, webinars: false, support: false });
  };

  return {
    connected,
    loading,
    dataLoading, // expose the new loading state
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
  };
}