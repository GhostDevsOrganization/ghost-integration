import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Palette, ChevronDown } from 'lucide-react';

const ThemeSwitcher = ({ showLabel = false, dropdownPosition = 'bottom', className = '' }) => {
  const { theme, themeData, allThemes, toggleTheme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get the appropriate icon based on the current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'CLEAN_WHITE':
        return <Sun size={18} className="text-sky-500" />;
      case 'NEON_BLUE':
        return <Moon size={18} className="text-blue-400" />;
      case 'COSMIC_ORANGE':
        return <Palette size={18} className="text-orange-400" />;
      case 'KASPA_GREEN':
      default:
        return <Palette size={18} className="text-emerald-400" />;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle theme selection
  const handleSelectTheme = (themeName) => {
    setTheme(themeName);
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Simple toggle button (cycles through themes) */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="bg-sky-900/30 backdrop-blur-md border border-sky-700/50 text-white p-2 rounded-lg hover:bg-sky-800/30 focus:outline-none focus:border-sky-500/50 transition-all duration-200 flex items-center"
          title={`Current theme: ${themeData.name}`}
        >
          {getThemeIcon()}
          {showLabel && <span className="ml-2">{themeData.name}</span>}
        </button>

        {/* Advanced theme selector dropdown */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="ml-1 bg-sky-900/30 backdrop-blur-md border border-sky-700/50 text-white p-2 rounded-lg hover:bg-sky-800/30 focus:outline-none focus:border-sky-500/50 transition-all duration-200"
        >
          <ChevronDown size={18} className={`text-sky-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Theme dropdown */}
      {showDropdown && (
        <div
          className="absolute z-50 w-48 py-2 mt-2 bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-sky-700/50"
          style={{
            [dropdownPosition]: '100%',
            right: 0
          }}
        >
          <div className="px-4 py-2 text-sm font-medium border-b border-sky-700/50 text-sky-300">
            Select Theme
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
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
