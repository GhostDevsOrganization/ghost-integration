
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const TraditionalNav = ({ protocols, activeProtocol, onProtocolClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside or when the route changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu-button') && !event.target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu when route changes (protocol is clicked)
  useEffect(() => {
    setMenuOpen(false);
  }, [activeProtocol]);

  return (
    <>
      {/* Custom Menu Button - Always visible on mobile screens but with high z-index */}
      <button
        onClick={toggleMenu}
        className="mobile-menu-button md:hidden fixed top-4 right-4 z-[999] bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg shadow-lg transition-all duration-300"
        aria-label="Toggle menu"
        style={{ opacity: 1 }} // Ensure this is always visible
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
      <nav className="hidden md:flex traditional-nav-responsive fixed top-0 left-0 right-0 backdrop-blur-md border-b px-6 py-3 z-40 justify-center gap-6 transition-all duration-300"
        style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-color)' }}>
        {protocols.map((protocol) => (
          <Link
            key={protocol.key}
            to={protocol.path}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium text-sm whitespace-nowrap`}
            style={{
              backgroundColor: activeProtocol === protocol.key ? 'var(--accent-primary)' : 'transparent',
              color: activeProtocol === protocol.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeProtocol === protocol.key ? '0 4px 10px rgba(var(--accent-primary-rgb-values), 0.2)' : 'none',
              border: activeProtocol === protocol.key ? '1px solid var(--accent-primary)' : 'none',
              opacity: activeProtocol === protocol.key ? 1 : 0.8,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {protocol.icon}
            <span>{protocol.label}</span>
          </Link>
        ))}
        {/* Theme Switcher for Desktop */}
        <ThemeSwitcher className="ml-6 z-[1000]" dropdownPosition="bottom" />
      </nav>

      {/* Mobile Navigation (Only visible when menu is open) */}
      <nav
        className={`mobile-menu md:hidden fixed inset-0 backdrop-blur-md z-[990] transition-all duration-300 ${menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
        style={{ backgroundColor: 'rgba(var(--primary-bg-rgb-values), 0.95)' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 py-16 px-4 overflow-y-auto">
          {protocols.map((protocol) => (
            <Link
              key={protocol.key}
              to={protocol.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-center w-full max-w-xs px-6 py-4 rounded-lg transition-all duration-300`}
              style={{
                backgroundColor: activeProtocol === protocol.key ? 'rgba(var(--accent-primary-rgb-values), 0.3)' : 'transparent',
                color: activeProtocol === protocol.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: activeProtocol === protocol.key ? '0 4px 10px rgba(var(--accent-primary-rgb-values), 0.2)' : 'none',
                border: activeProtocol === protocol.key ? '1px solid var(--accent-primary)' : 'none',
                opacity: activeProtocol === protocol.key ? 1 : 0.8,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {protocol.icon}
              <span className="ml-2 text-xl">{protocol.label}</span>
            </Link>
          ))}
          {/* Theme Switcher for Mobile */}
          <ThemeSwitcher className="mt-6 z-[1000]" dropdownPosition="bottom" />
        </div>
      </nav>
    </>
  );
};

export default TraditionalNav;
