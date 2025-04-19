
import React from 'react';
import { Repeat, Send, Shield, CreditCard, BarChart3 } from 'lucide-react';

const TraditionalNav = ({ protocols, activeProtocol, onProtocolClick }) => {
  // Map protocol keys to icons if needed, or pass icons directly
  const iconMap = {
    swap: <Repeat size={18} />,
    send: <Send size={18} />,
    privacy: <Shield size={18} />,
    tokens: <CreditCard size={18} />,
    analytics: <BarChart3 size={18} />,
  };

  return (
    /* Applied traditional-nav-responsive */
    <nav className="traditional-nav-responsive absolute top-16 left-0 right-0 bg-green-900/80 backdrop-blur-md border-b border-green-700 p-2 z-40 flex justify-center">
      {Object.entries(protocols).map(([key, protocol]) => (
        <button
          key={key}
          onClick={() => onProtocolClick(key)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
                      ${activeProtocol === key 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-green-200 hover:bg-green-700/50 hover:text-white'}`}
        >
          {iconMap[key]}
          <span>{protocol.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default TraditionalNav;
