# InsightTiers

A decentralized platform for accessing premium content through token staking. Users stake INSIGHT tokens to unlock tiered content including blog posts, videos, and educational materials.

## Overview

InsightTiers connects content creators with audiences through a token-based access system. By staking INSIGHT tokens, users gain access to different tiers of content:

- **Bronze Tier**: Premium blog articles and written content
- **Silver Tier**: Video tutorials and educational webinars
- **Gold Tier**: Comprehensive guides and downloadable resources

The platform leverages blockchain technology to create a transparent ecosystem where users can directly support creators while gaining access to exclusive content.

## Technology Stack

- **Frontend**: React with Tailwind CSS
- **Animation**: Framer Motion and React Spring
- **Blockchain Integration**: ethers.js
- **Smart Contracts**: Solidity (ERC20, Staking, and Minter contracts)

## Smart Contracts

The platform uses three main contracts:

1. **BlogToken (INSIGHT)**: ERC20 token with custom features
   - Contract Address: `0xd61F910537Cb943Bd32CB679e69F700366080E78`

2. **Staking Contract**: Manages token staking and tier access
   - Contract Address: `0x14d05ad99132D9a0b3aE0f8b44642B05Aac38a42`
   - Implements tiered access based on staked amount
   - Handles rewards and staking periods

3. **Token Minter**: Allows users to purchase INSIGHT tokens
   - Contract Address: `0xF007af4d1e65a3A5Ffc85caA3Ce41833287aB822`
   - Accepts MATIC payment for tokens
   - Implements price feeds for accurate token pricing

## Features

### User Experience
- **Wallet Connection**: Seamless integration with MetaMask
- **Dashboard**: View token balances, staked amounts, and current tier
- **Content Access**: Tier-based content display
- **Token Purchase**: Buy INSIGHT tokens with MATIC
- **Token Staking**: Stake tokens to unlock premium tiers

### Technical Features
- **Debounced Inputs**: Prevent unnecessary blockchain calls
- **Loading States**: Animated loading indicators
- **Responsive Design**: Mobile and desktop compatibility
- **Component Modularity**: Organized structure for maintainability
- **Real-time Rate Calculation**: Dynamic token price calculation

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── StatusCard.jsx
│   │   ├── DebouncedInput.jsx
│   │   └── ImpressionLoader.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MintPage.jsx
│   │   └── StakePage.jsx
│   └── content/
│       ├── BronzeContent.jsx
│       ├── SilverContent.jsx
│       └── GoldContent.jsx
├── hooks/
│   ├── useWallet.js
│   └── useDebounce.js
├── constants/
│   ├── contracts.js
│   └── tiers.js
├── App.jsx
└── index.jsx
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MetaMask extension

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/insight-tiers.git
cd insight-tiers
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Testing and Deployment

The application can be tested locally with a MetaMask wallet connected to:
- Polygon amoy Testnet for testing
- Polygon Mainnet for production

To deploy your own version:
1. Deploy the smart contracts to your chosen network
2. Update the contract addresses in `constants/contracts.js`
3. Build the application: `npm run build`
4. Deploy the built assets to your hosting service

## Content Management

You can add your own content by modifying:
- `BronzeContent.jsx` for blog posts
- `SilverContent.jsx` for embedded videos
- `GoldContent.jsx` for downloadable resources

## Future Development

- Adding support for additional wallet providers
- Implementing content creator dashboard
- Adding community features for content discussion
- Expanding to additional blockchain networks

## License

MIT

## Acknowledgments

- OpenZeppelin for smart contract libraries
- Polygon for blockchain infrastructure
