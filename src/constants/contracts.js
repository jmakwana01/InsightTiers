export const CONTRACT_ADDRESSES = {
    blogToken: "0xd61F910537Cb943Bd32CB679e69F700366080E78",
    staking: "0x14d05ad99132D9a0b3aE0f8b44642B05Aac38a42",
    minter: "0xF007af4d1e65a3A5Ffc85caA3Ce41833287aB822"
  };
  
  export const BlogTokenABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)"
  ];
  
  export const StakingABI = [
    "function stake(uint256 amount) external",
    "function getUserTier(address user) external view returns (uint256)",
    "function getStakedAmount(address user) external view returns (uint256)",
    "function getUserPrivileges(address user) external view returns (bool, bool, bool)"
  ];
  
  export const MinterABI = [
    "function purchaseTokens() public payable returns (uint256)",
    "function calculateTokenAmount(uint256 _maticAmount) external view returns (uint256)"
  ];