import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Palette, ChevronDown, Sparkles, Zap, X, Network } from 'lucide-react';

const ThemeSwitcher = ({ dropdownPosition = 'bottom', className = '' }) => {
  const { theme, themeData, allThemes, setTheme, backgroundAnimation, setBackgroundAnimation, toggleBackgroundAnimation } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
        console.log('Closing dropdown: Click outside detected');
        setShowDropdown(false);
      }
    };

    // Add event listener only when dropdown is open
    if (showDropdown) {
      // Use a timeout to allow the click event that opened the dropdown to complete
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0); // A very short delay

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown, dropdownPosition]); // Re-run effect when showDropdown or dropdownPosition changes

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const style = {
        position: 'fixed', // Use fixed positioning to break out of overflow
        right: `${window.innerWidth - rect.right}px`, // Align right edge with button's right edge
        zIndex: 1000 // Ensure it's on top
      };

      if (dropdownPosition === 'top') {
        style.bottom = `${window.innerHeight - rect.top + 8}px`; // Position above the button with offset
      } else { // 'bottom'
        style.top = `${rect.bottom + 8}px`; // Position below the button with offset
      }

      setDropdownStyle(style);
      console.log('Dropdown opened. Calculated style:', style);
      console.log('Button rect:', rect);
    }
  }, [showDropdown, dropdownPosition]); // Re-run effect when showDropdown or dropdownPosition changes

  // Handle theme selection
  const handleSelectTheme = (themeName) => {
    console.log('Attempting to set theme:', themeName);
    setTheme(themeName);
    setShowDropdown(false);
  };

  // Handle background animation selection
  const handleSelectAnimation = (animationType) => {
    console.log('Setting background animation:', animationType);
    setBackgroundAnimation(animationType);
  };

  // Get animation icon
  const getAnimationIcon = (animationType) => {
    switch (animationType) {
      case 'advanced':
        return <Sparkles size={16} />;
      case 'quantum':
        return <Zap size={16} />;
      case 'blockchain':
        return <Network size={16} />;
      case 'none':
        return <X size={16} />;
      default:
        return <Sparkles size={16} />;
    }
  };

  // Get animation display name
  const getAnimationName = (animationType) => {
    switch (animationType) {
      case 'advanced':
        return 'Advanced 3D';
      case 'quantum':
        return 'Quantum Wave';
      case 'blockchain':
        return 'Blockchain Network';
      case 'none':
        return 'No Animation';
      default:
        return 'Advanced 3D';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Theme selector dropdown button */}
      <button
        onClick={(event) => {
          event.stopPropagation(); // Prevent event from bubbling up and closing dropdown immediately
          console.log('Theme switcher button clicked. Current showDropdown:', showDropdown);
          setShowDropdown(!showDropdown);
        }}
        className="bg-sky-900/30 backdrop-blur-md border border-sky-700/50 text-white p-2 rounded-lg hover:bg-sky-800/30 focus:outline-none focus:border-sky-500/50 transition-all duration-200 flex items-center"
        title={`Current theme: ${themeData.name} | Animation: ${getAnimationName(backgroundAnimation)}`}
        ref={buttonRef}
      >
        <Palette size={18} className="text-sky-400" />
        <span className="ml-2 hidden md:inline">{themeData.name}</span>
        <ChevronDown size={18} className={`ml-1 text-sky-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Theme dropdown */}
      {showDropdown && (
        <div
          className="w-64 py-2 bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-sky-700/50 z-[1000]"
          style={dropdownStyle}
        >
          {/* Theme Selection Section */}
          <div className="px-4 py-2 text-sm font-medium border-b border-sky-700/50 text-sky-300">
            Color Themes
          </div>
          {Object.entries(allThemes).map(([key, value]) => (
            <button
              key={key}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${theme === key
                ? 'bg-sky-900/40 text-sky-300'
                : 'hover:bg-sky-900/30 text-gray-300 hover:text-sky-300'
                }`}
              onClick={() => handleSelectTheme(key)}
            >
              <span
                className="w-3 h-3 mr-3 rounded-full"
                style={{ backgroundColor: value.colors.accentPrimary }}
              ></span>
              {value.name}
            </button>
          ))}

          {/* Background Animation Section */}
          <div className="px-4 py-2 text-sm font-medium border-b border-t border-sky-700/50 text-sky-300 mt-2">
            Background Animation
          </div>
          {['advanced', 'quantum', 'blockchain', 'none'].map((animationType) => (
            <button
              key={animationType}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${backgroundAnimation === animationType
                ? 'bg-sky-900/40 text-sky-300'
                : 'hover:bg-sky-900/30 text-gray-300 hover:text-sky-300'
                }`}
              onClick={() => handleSelectAnimation(animationType)}
            >
              <span className="mr-3 text-sky-400">
                {getAnimationIcon(animationType)}
              </span>
              {getAnimationName(animationType)}
            </button>
          ))}

          {/* Quick Toggle Button */}
          <div className="px-4 py-2 border-t border-sky-700/50 mt-2">
            <button
              onClick={toggleBackgroundAnimation}
              className="w-full px-3 py-2 text-sm bg-sky-800/30 hover:bg-sky-700/40 text-sky-300 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <Sparkles size={16} className="mr-2" />
              Toggle Animation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
