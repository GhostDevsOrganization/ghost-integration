// Icon Configuration - The ONE place to swap icons easily!
// Change any icon by simply changing the string value below

export const iconMapping = {
  // Core Features Section
  coreFeatures: {
    wallet: 'payment',       // SWAPPED! Was 'wallet', now 'payment'
    trading: 'ai',           // SWAPPED! Was 'swap', now 'ai'
    learning: 'docs',        // SWAPPED! Was 'learn', now 'docs'
    crosschain: 'mobile',    // SWAPPED! Was 'crosschain', now 'mobile'
  },

  // Navigation Icons
  navigation: {
    home: 'home',
    swap: 'swap',
    learn: 'learn',
    wallet: 'wallet',
  },

  // Roadmap Section
  roadmap: {
    q2_2025: 'payment',      // Try: 'mobile', 'wallet', 'business'
    q3_2025: 'mobile',       // Try: 'ai', 'contract', 'docs'
    q4_2025: 'contract',     // Try: 'payment', 'crosschain', 'business'
    q1_2026: 'ai',           // Try: 'learn', 'docs', 'mobile'
  },

  // Communication & Community
  community: {
    email: 'email',
    discord: 'discord',
    docs: 'docs',
    business: 'business',
  },

  // Action buttons
  actions: {
    primary: 'swap',         // Main action icon
    secondary: 'wallet',     // Secondary action icon
    learn: 'learn',          // Learn more icon
  }
};

// Theme variations - easily switch entire icon themes
export const iconThemes = {
  default: iconMapping,
  
  // Business theme - more professional icons
  business: {
    ...iconMapping,
    coreFeatures: {
      wallet: 'business',
      trading: 'payment',
      learning: 'docs',
      crosschain: 'contract',
    },
    actions: {
      primary: 'business',
      secondary: 'payment',
      learn: 'docs',
    }
  },

  // Tech theme - more technical/AI focused
  tech: {
    ...iconMapping,
    coreFeatures: {
      wallet: 'contract',
      trading: 'ai',
      learning: 'docs',
      crosschain: 'mobile',
    },
    roadmap: {
      q2_2025: 'ai',
      q3_2025: 'contract',
      q4_2025: 'mobile',
      q1_2026: 'docs',
    }
  },

  // Community theme - more social/communication focused
  community: {
    ...iconMapping,
    coreFeatures: {
      wallet: 'discord',
      trading: 'email',
      learning: 'docs',
      crosschain: 'business',
    }
  }
};

// Current active theme - change this to switch themes instantly!
export const currentTheme = 'default'; // Try: 'business', 'tech', 'community'

// Get the current icon mapping based on selected theme
export const getCurrentIconMapping = () => {
  return iconThemes[currentTheme] || iconThemes.default;
};

// Helper function to get an icon name from the current theme
export const getIcon = (section, iconKey) => {
  const mapping = getCurrentIconMapping();
  return mapping[section]?.[iconKey] || iconKey;
};

// Quick icon swapper - swap two icons across the entire config
export const swapIcons = (icon1, icon2) => {
  const mapping = getCurrentIconMapping();
  const newMapping = JSON.parse(JSON.stringify(mapping));
  
  // Recursively swap icons in all sections
  const swapInObject = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        swapInObject(obj[key]);
      } else if (obj[key] === icon1) {
        obj[key] = icon2;
      } else if (obj[key] === icon2) {
        obj[key] = icon1;
      }
    });
  };
  
  swapInObject(newMapping);
  return newMapping;
};

export default getCurrentIconMapping();
