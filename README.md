# InsightTiers: Architecture & Implementation

## System Architecture

InsightTiers is built as a modern React application that communicates with smart contracts deployed on the Polygon network. The system follows a client-centric architecture with blockchain interaction.

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph TD
    User([User])
    Web[Web Application]
    WalletP[Wallet Provider]
    SC[Smart Contracts]
    Database[(Content Database)]
    
    User -->|Interacts with| Web
    Web -->|Connects via| WalletP
    WalletP -->|Interacts with| SC
    Web -->|Fetches content from| Database
    SC -->|Verifies access to| Database
    
    subgraph "Frontend"
        Web
    end
    
    subgraph "Web3 Layer"
        WalletP
    end
    
    subgraph "Blockchain"
        SC
        Database
    end
    
    style User stroke-width:2px
    style Web stroke-width:2px
    style WalletP stroke-width:2px
    style SC stroke-width:2px
    style Database stroke-width:2px
```

### Architecture Components

1. **Frontend Application (React)**
   - User interface for content access, token purchasing, and staking
   - Communicates with blockchain through ethers.js 
   - Manages application state and user session

2. **Smart Contracts (Solidity)**
   - Token Contract: ERC20 implementation with custom functionality
   - Staking Contract: Manages token staking and tier permissions
   - Minter Contract: Handles token sales for MATIC

3. **Web3 Provider Bridge**
   - Facilitates communication between frontend and blockchain
   - Handles wallet connections and transaction signing

4. **Content Delivery**
   - Tier-based content storage and delivery mechanism
   - Different content types (blogs, videos, PDFs) for different tiers

## Smart Contract Architecture

The three smart contracts work together to create the complete system:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph TD
    User([User])
    BlogToken[BlogToken Contract]
    Staking[Staking Contract]
    Minter[Minter Contract]
    
    User -->|Purchases tokens| Minter
    Minter -->|Mints| BlogToken
    User -->|Stakes tokens| Staking
    Staking -->|Verifies balance| BlogToken
    Staking -->|Locks tokens| BlogToken
    User -->|Checks tier| Staking
    
    style User stroke-width:2px
    style BlogToken stroke-width:2px,stroke-dasharray:5 5
    style Staking stroke-width:2px,stroke-dasharray:5 5
    style Minter stroke-width:2px,stroke-dasharray:5 5
```

## React Component Architecture

We designed the component structure following the Atomic Design methodology with a focus on reusability and separation of concerns:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph TD
    App[App.jsx]
    Pages[Page Components]
    Layout[Layout Components]
    UI[UI Components]
    Content[Content Components]
    
    App --> Pages
    Pages --> Layout
    Pages --> Content
    Layout --> UI
    Content --> UI
    
    subgraph "Pages/"
        Dashboard[Dashboard.jsx]
        LandingPage[LandingPage.jsx]
        MintPage[MintPage.jsx]
        StakePage[StakePage.jsx]
    end
    
    subgraph "Layout/"
        Header[Header.jsx]
        Footer[Footer.jsx]
    end
    
    subgraph "UI/"
        Button[Button.jsx]
        Card[Card.jsx]
        Input[DebouncedInput.jsx]
        Loader[ImpressionLoader.jsx]
    end
    
    subgraph "Content/"
        BronzeContent[BronzeContent.jsx]
        SilverContent[SilverContent.jsx]
        GoldContent[GoldContent.jsx]
    end
    
    Pages --> Dashboard
    Pages --> LandingPage
    Pages --> MintPage
    Pages --> StakePage
    
    Layout --> Header
    Layout --> Footer
    
    UI --> Button
    UI --> Card
    UI --> Input
    UI --> Loader
    
    Content --> BronzeContent
    Content --> SilverContent
    Content --> GoldContent
    
    style App stroke-width:2px
    style Pages stroke-width:2px
    style Layout stroke-width:2px
    style UI stroke-width:2px
    style Content stroke-width:2px
```

### Custom Hooks Flow

The application leverages several custom hooks to encapsulate and reuse logic:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
flowchart TD
    A[App Component] --> B[useWallet Hook]
    B --> C[connectWallet]
    B --> D[fetchUserData]
    B --> E[disconnectWallet]
    
    C --> F[ethers.BrowserProvider]
    F --> G[Set Connected State]
    G --> H[Fetch User Data]
    
    D --> I[Get Token Balance]
    D --> J[Get Staking Info]
    D --> K[Get User Tier]
    
    L[User Input] --> M[useDebounce Hook]
    M --> N[Delayed State Update]
    N --> O[API/Contract Call]
    
    style B stroke-width:2px,stroke-dasharray:5 5
    style M stroke-width:2px,stroke-dasharray:5 5
```

#### `useWallet`

This hook manages wallet connection and blockchain state:

```javascript
// src/hooks/useWallet.js
export function useWallet() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [userTier, setUserTier] = useState(0);
  
  // Connection logic
  const connectWallet = async () => {
    // Implementation details
  };
  
  // Data fetching logic
  const fetchUserData = async () => {
    // Implementation details
  };
  
  // Event listeners for wallet changes
  useEffect(() => {
    // Implementation details
  }, []);
  
  return {
    connected,
    loading,
    dataLoading,
    account,
    // other values and functions
  };
}
```

Key aspects:
- Maintains wallet connection state
- Provides methods for connecting/disconnecting wallet
- Fetches user blockchain data (balances, tiers)
- Handles wallet events (account changes, disconnections)

#### `useDebounce`

Used to prevent excessive blockchain calls when user input changes rapidly:

```javascript
// src/hooks/useDebounce.js
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

This hook is particularly important for blockchain applications as each call can be costly in terms of performance and potentially gas fees.

## State Management

We use React's built-in state management through hooks rather than external libraries like Redux or MobX. This decision was made because:

1. The application state is fairly hierarchical
2. Most state is scoped to specific components
3. Only a few pieces of state need to be shared globally (wallet connection, user tier)

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph TD
    App[App.jsx]
    DP[Dashboard Page]
    MP[Mint Page]
    SP[Stake Page]
    LP[Landing Page]
    
    subgraph "Global State"
        WS[Wallet State]
        TS[Tier State]
    end
    
    subgraph "Local States"
        MPS[Mint Page State]
        SPS[Stake Page State]
        LPS[Landing Page State]
    end
    
    App --> WS
    App --> TS
    WS --> DP
    WS --> MP
    WS --> SP
    WS --> LP
    TS --> DP
    MP --> MPS
    SP --> SPS
    LP --> LPS
    
    style App stroke-width:2px
    style WS stroke-width:2px,stroke-dasharray:5 5
    style TS stroke-width:2px,stroke-dasharray:5 5
    style MPS stroke-width:2px,stroke-dasharray:5 5
    style SPS stroke-width:2px,stroke-dasharray:5 5
    style LPS stroke-width:2px,stroke-dasharray:5 5
```

State management approach:
- Global states are lifted to the App component and passed down via props
- Component-specific states remain local to their components
- Custom hooks encapsulate related state and logic (e.g., wallet connection)

## Web3 Integration

### Transaction Flow

The application implements a robust transaction flow:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
sequenceDiagram
    participant User
    participant React App
    participant Wallet
    participant Blockchain
    
    User->>React App: Initiates transaction
    React App->>React App: Validate input
    React App->>React App: Set loading state
    React App->>Wallet: Request transaction
    Wallet->>User: Prompt for confirmation
    User->>Wallet: Confirm transaction
    Wallet->>Blockchain: Submit transaction
    React App->>React App: Show transaction pending
    Blockchain->>Wallet: Confirm transaction
    Wallet->>React App: Transaction result
    React App->>React App: Update UI with result
    React App->>React App: Clear loading state
    React App->>User: Show success/error
```

### Example Transaction Code

```javascript
const stakeTokens = async () => {
  setIsTransacting(true);
  try {
    // Pre-transaction validation
    if (stakeAmount > walletBalance) {
      throw new Error("Insufficient balance");
    }
    
    // Transaction submission
    const stakeTx = await stakingContract.stake(amount);
    
    // Waiting for confirmation
    await stakeTx.wait();
    
    // Post-transaction updates
    await fetchUserData(provider, signer, account);
    
  } catch (error) {
    // Error handling
    console.error("Staking error:", error);
    alert("Failed to stake tokens: " + error.message);
  } finally {
    setIsTransacting(false);
  }
};
```

## Tier-Based Content System

The application implements a tier-based content delivery system:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph TD
    User([User])
    CheckTier{Check User Tier}
    NoAccess[No Access Prompt]
    Bronze[Bronze Content]
    Silver[Silver Content]
    Gold[Gold Content]
    Toggle[Tier Toggle]
    
    User --> CheckTier
    CheckTier -->|No Tier| NoAccess
    CheckTier -->|Bronze| Bronze
    CheckTier -->|Silver| Silver
    CheckTier -->|Gold| Toggle
    
    Toggle -->|Select Bronze| Bronze
    Toggle -->|Select Silver| Silver
    Toggle -->|Select Gold| Gold
    
    style CheckTier stroke-width:2px
    style Toggle stroke-width:2px
    style Bronze stroke-width:2px
    style Silver stroke-width:2px
    style Gold stroke-width:2px
    style NoAccess stroke-width:2px,stroke-dasharray:5 5
```

```javascript
const ContentDisplay = ({ userTier }) => {
  // Content display logic based on tier
  if (userTier === 0) {
    return <BronzeContent />;
  } else if (userTier === 1) {
    return <SilverContent />;
  } else if (userTier >= 2) {
    return <TierToggle userTier={userTier} />;
  } else {
    return <NoAccessPrompt />;
  }
};
```

## Loading States Visual Flow

The application implements several loading states to provide clear feedback during blockchain operations:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
stateDiagram-v2
    [*] --> Idle
    
    Idle --> Connecting: Click Connect
    Connecting --> LoadingData: Connection Success
    Connecting --> Idle: Connection Failed
    
    LoadingData --> Dashboard: Data Loaded
    LoadingData --> Idle: Loading Failed
    
    Dashboard --> TransactionPending: Start Transaction
    TransactionPending --> Dashboard: Transaction Success
    TransactionPending --> Dashboard: Transaction Failed
    
    Dashboard --> RateCalculating: Change Amount
    RateCalculating --> Dashboard: Rate Calculated
    
    state Dashboard {
        [*] --> Viewing
        Viewing --> Purchasing: Go to Buy Page
        Viewing --> Staking: Go to Stake Page
        Purchasing --> Viewing: Return to Dashboard
        Staking --> Viewing: Return to Dashboard
    }
```

## UI Component Hierarchy

Visual representation of component relationships:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
classDiagram
    Component <|-- Button
    Component <|-- Card
    Component <|-- Input
    Component <|-- StatusCard
    Component <|-- Loader
    
    Card <|-- ContentCard
    Input <|-- DebouncedInput
    Loader <|-- TransactionLoader
    Loader <|-- ImpressionLoader
    
    class Component {
        +render()
    }
    
    class Button {
        +variant: string
        +size: string
        +disabled: boolean
        +onClick(): void
    }
    
    class Card {
        +title: string
        +children: ReactNode
        +animate: boolean
    }
    
    class Input {
        +label: string
        +value: any
        +onChange(): void
        +error: string
    }
    
    class DebouncedInput {
        +debounceTime: number
        +handleChange(): void
    }
    
    class StatusCard {
        +title: string
        +value: string
        +icon: string
    }
    
    class Loader {
        +text: string
        +fullScreen: boolean
    }
    
    class TransactionLoader {
        +message: string
    }
    
    class ImpressionLoader {
        +size: string
    }
```

## Responsive Design

The application uses Tailwind CSS for responsive design. Here's a visual representation of how components adapt to different screen sizes:

```
┌────────────────────────────────────┐
│             Mobile View            │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐   │
│ │        Status Card 1         │   │
│ └──────────────────────────────┘   │
│                                    │
│ ┌──────────────────────────────┐   │
│ │        Status Card 2         │   │
│ └──────────────────────────────┘   │
│                                    │
│ ┌──────────────────────────────┐   │
│ │        Status Card 3         │   │
│ └──────────────────────────────┘   │
│                                    │
│ ┌──────────────────────────────┐   │
│ │                              │   │
│ │                              │   │
│ │         Content Area         │   │
│ │                              │   │
│ │                              │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       Desktop View                          │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────┐  ┌────────────┐  ┌────────────┐              │
│ │Status Card1│  │Status Card2│  │Status Card3│              │
│ └────────────┘  └────────────┘  └────────────┘              │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │                                                         │ │
│ │                      Content Area                       │ │
│ │                                                         │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Implemented using Tailwind's responsive classes:

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatusCard title="Wallet Balance" value={walletBalance} />
  <StatusCard title="Staked Amount" value={stakedAmount} />
  <StatusCard title="Current Tier" value={getTierName(userTier)} />
</div>
```

## Development Workflow

The project uses a structured development workflow:

```mermaid
%%{init: {'theme':'neutral', 'themeVariables': {'primaryColor': '#f5f5f5', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#666666', 'fontFamily': 'arial'}}}%%
graph LR
    SC[Smart Contract Development]
    FE[Frontend Development]
    INT[Integration]
    TEST[Testing]
    DEPLOY[Deployment]
    
    SC --> FE
    FE --> INT
    SC --> INT
    INT --> TEST
    TEST --> DEPLOY
    
    style SC stroke-width:2px
    style FE stroke-width:2px
    style INT stroke-width:2px
    style TEST stroke-width:2px
    style DEPLOY stroke-width:2px
```

1. **Smart Contract Development**: Write, test, and deploy contracts using Solidity
2. **Frontend Development**: Build UI components and pages
3. **Integration**: Connect frontend to deployed contracts
4. **Testing**: Comprehensive testing in testnet environment
5. **Deployment**: Deploy to production environment

## Conclusion

InsightTiers demonstrates a modern approach to building decentralized applications with React. By leveraging custom hooks, component composition, and effective state management, it creates a seamless user experience despite the complexities of blockchain interactions.