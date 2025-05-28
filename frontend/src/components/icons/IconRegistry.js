import React from 'react';
import {
  SwapIcon,
  WalletIcon,
  LearnIcon,
  HomeIcon,
  CrossChainIcon,
  PaymentIcon,
  MobileIcon,
  SmartContractIcon,
  AIIcon,
  EmailIcon,
  DiscordIcon,
  DocsIcon,
  BusinessIcon
} from '../CryptoIcons';

// Central icon library - wraps your existing beautiful icons
const IconLibrary = {
  // Core feature icons
  swap: SwapIcon,
  wallet: WalletIcon,
  learn: LearnIcon,
  home: HomeIcon,
  crosschain: CrossChainIcon,
  
  // Roadmap icons
  payment: PaymentIcon,
  mobile: MobileIcon,
  contract: SmartContractIcon,
  ai: AIIcon,
  
  // Communication icons
  email: EmailIcon,
  discord: DiscordIcon,
  docs: DocsIcon,
  business: BusinessIcon,
  
  // Aliases for easy swapping
  bridge: CrossChainIcon,
  smartcontract: SmartContractIcon,
  documentation: DocsIcon,
  community: DiscordIcon,
  contact: EmailIcon,
  enterprise: BusinessIcon,
};

// Universal Icon Component
export const Icon = ({ name, size = 24, className = "", ...props }) => {
  const IconComponent = IconLibrary[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in IconLibrary. Available icons:`, Object.keys(IconLibrary));
    // Fallback icon
    return (
      <div 
        className={`inline-flex items-center justify-center bg-gray-300 rounded text-gray-600 text-xs font-bold ${className}`}
        style={{ width: size, height: size }}
        title={`Missing icon: ${name}`}
      >
        ?
      </div>
    );
  }
  
  return <IconComponent size={size} className={className} {...props} />;
};

// Export available icon names for TypeScript/autocomplete
export const availableIcons = Object.keys(IconLibrary);

// Helper function to get random icon (useful for testing)
export const getRandomIcon = () => {
  const icons = availableIcons;
  return icons[Math.floor(Math.random() * icons.length)];
};

// Helper function to check if icon exists
export const iconExists = (name) => {
  return IconLibrary.hasOwnProperty(name);
};

export default Icon;
