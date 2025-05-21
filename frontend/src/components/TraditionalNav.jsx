
import React from 'react';
import { Link } from 'react-router-dom';

const TraditionalNav = ({ protocols, activeProtocol, onProtocolClick }) => {
  return (
    <nav className="traditional-nav-responsive fixed top-0 left-0 right-0 bg-green-900/80 backdrop-blur-md border-b border-green-700 p-2 z-50 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 overflow-y-auto max-h-[calc(100vh-var(--header-height))] scrollbar-thin transition-all duration-300">
      {protocols.map((protocol) => (
        <Link
          key={protocol.key}
          to={protocol.path}
          className={`flex items-center justify-center min-w-fit px-4 py-2 rounded-lg transition-all duration-300 overflow-hidden text-ellipsis
                      ${activeProtocol === protocol.key
              ? 'bg-green-600 text-white shadow-md'
              : 'text-green-200 hover:bg-green-700/50 hover:text-white'}`}
        >
          {protocol.icon}
          <span>{protocol.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default TraditionalNav;
