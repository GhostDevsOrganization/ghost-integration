import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the color themes based on the provided specifications
export const THEMES = {
  NEON_BLUE: {
    name: 'Neon Blue',
    colors: {
      primaryBackground: '#121225',
      secondaryBackground: '#1A1A35',
      textPrimary: '#FFFFFF',
      textSecondary: '#B0B0C0',
      accentPrimary: '#4F8FFF',
      accentSecondary: '#00F0FF',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      borderColor: 'rgba(79, 143, 255, 0.3)'
    }
  },
  COSMIC_ORANGE: {
    name: 'Cosmic Orange',
    colors: {
      primaryBackground: '#1F120A',
      secondaryBackground: '#2B1A0F',
      textPrimary: '#FFDAB9',
      textSecondary: '#FFA07A',
      accentPrimary: '#FF6F61',
      accentSecondary: '#FFB74D',
      glowColor: 'rgba(255, 111, 97, 0.7)',
      borderColor: 'rgba(255, 111, 97, 0.3)'
    }
  },
  KASPA_GREEN: {
    name: 'Kaspa Green',
    colors: {
      primaryBackground: '#0A1F1A',
      secondaryBackground: '#0F2B24',
      textPrimary: '#C1E1D7',
      textSecondary: '#87C7B6',
      accentPrimary: '#6EC7BB',
      accentSecondary: '#3dbba9',
      glowColor: 'rgba(110, 199, 187, 0.7)',
      borderColor: 'rgba(110, 199, 187, 0.3)'
    }
  },
  CLEAN_WHITE: {
    name: 'Clean White',
    colors: {
      primaryBackground: '#F0F2F5',
      secondaryBackground: '#FFFFFF',
      textPrimary: '#1C1C28',
      textSecondary: '#555560',
      accentPrimary: '#3B82F6',
      accentSecondary: '#2563EB',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 0.3)'
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Default to 'KASPA_GREEN' theme, check localStorage
  const [currentTheme, setCurrentTheme] = useState(() => {
    const storedTheme = localStorage.getItem('colorTheme');
    return storedTheme && THEMES[storedTheme] ? storedTheme : 'KASPA_GREEN';
  });

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const theme = THEMES[currentTheme].colors;

    // Set CSS variables
    root.style.setProperty('--primary-bg', theme.primaryBackground);
    root.style.setProperty('--secondary-bg', theme.secondaryBackground);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent-primary', theme.accentPrimary);
    root.style.setProperty('--accent-secondary', theme.accentSecondary);
    root.style.setProperty('--glow-color', theme.glowColor);
    root.style.setProperty('--border-color', theme.borderColor);

    // Save theme preference to localStorage
    localStorage.setItem('colorTheme', currentTheme);
  }, [currentTheme]);

  // Toggle between themes in a cycle
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      const themeKeys = Object.keys(THEMES);
      const currentIndex = themeKeys.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themeKeys.length;
      return themeKeys[nextIndex];
    });
  };

  // Set a specific theme
  const setTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      themeData: THEMES[currentTheme],
      allThemes: THEMES,
      toggleTheme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
