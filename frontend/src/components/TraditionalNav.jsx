
import React from 'react';
import { Home, Repeat, Link2, Wallet, BarChart3, BookOpen } from 'lucide-react';

const TraditionalNav = ({ protocols, activeProtocol, onProtocolClick }) => {
  // Map protocol keys to icons if needed, or pass icons directly
  const iconMap = {
    home: <Home size={18} />,
    swap: <Repeat size={18} />,
    crosschain: <Link2 size={18} />,
    wallet: <Wallet size={18} />,
    analytics: <BarChart3 size={18} />,
    learn: <BookOpen size={18} />
  };

  return (
    /* Updated navigation structure */
    <nav className="traditional-nav-responsive fixed top-0 left-0 right-0 bg-green-900/80 backdrop-blur-md border-b border-green-700 p-2 z-50 flex justify-center space-x-8 transition-all duration-300">
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
          <span>{{
            home: 'Home',
            swap: 'Token Swapping',
            crosschain: 'Cross-Chain',
            wallet: 'Multi-Wallet',
            analytics: 'Advanced Analytics',
            learn: 'Learn'
          }[key]}</span>
        </button>
      ))}
    </nav>
  );
};

export default TraditionalNav;
