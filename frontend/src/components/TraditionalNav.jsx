
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TraditionalNav = ({ protocols, activeProtocol, onProtocolClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button (only visible on small screens) */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-2 right-2 z-50 bg-green-700 text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:grid traditional-nav-responsive fixed top-0 left-0 right-0 bg-green-900/80 backdrop-blur-md border-b border-green-700 p-2 z-40 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 overflow-y-auto max-h-[calc(100vh-var(--header-height))] scrollbar-thin transition-all duration-300">
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

      {/* Mobile Navigation (Only visible when menu is open) */}
      <nav className={`md:hidden fixed inset-0 bg-green-900/95 backdrop-blur-md z-40 transition-all duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-4 py-12 px-4 overflow-y-auto">
          {protocols.map((protocol) => (
            <Link
              key={protocol.key}
              to={protocol.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-center w-full max-w-xs px-6 py-3 rounded-lg transition-all duration-300
                          ${activeProtocol === protocol.key
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-green-200 hover:bg-green-700/50 hover:text-white'}`}
            >
              {protocol.icon}
              <span className="ml-2 text-lg">{protocol.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default TraditionalNav;
