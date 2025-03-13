export const TIER_INFO = [
    { 
      id: 0,
      tier: "Bronze", 
      color: "from-yellow-600 to-yellow-700", 
      bgColor: "from-yellow-100 to-yellow-200",
      requirement: "100 BLOG", 
      requiredAmount: 100,
      features: ["Access to premium blog posts"] 
    },
    { 
      id: 1,
      tier: "Silver", 
      color: "from-gray-300 to-gray-400", 
      bgColor: "from-gray-200 to-gray-300",
      requirement: "500 BLOG", 
      requiredAmount: 500,
      features: ["Access to premium blog posts", "Exclusive webinar content"] 
    },
    { 
      id: 2,
      tier: "Gold", 
      color: "from-yellow-300 to-yellow-400", 
      bgColor: "from-yellow-300 to-yellow-400",
      requirement: "1000 BLOG", 
      requiredAmount: 1000,
      features: ["Access to premium blog posts", "Exclusive webinar content", "Priority support"] 
    }
  ];
  
  export const getTierName = (tier) => {
    switch(tier) {
      case 0: return "Bronze";
      case 1: return "Silver";
      case 2: return "Gold";
      default: return "None";
    }
  };