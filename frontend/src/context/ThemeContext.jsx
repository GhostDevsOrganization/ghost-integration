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
      borderColor: 'rgba(79, 143, 255, 0.3)',
      primaryBgGradientStart: '#121225',
      primaryBgGradientVia: '#1A1A35',
      primaryBgGradientEnd: '#121225',
      accentPrimaryRgb: '79, 143, 255',
      accentSecondaryRgb: '0, 240, 255'
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
      borderColor: 'rgba(255, 111, 97, 0.3)',
      primaryBgGradientStart: '#1F120A',
      primaryBgGradientVia: '#2B1A0F',
      primaryBgGradientEnd: '#1F120A',
      accentPrimaryRgb: '255, 111, 97',
      accentSecondaryRgb: '255, 183, 77'
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
      borderColor: 'rgba(110, 199, 187, 0.3)',
      primaryBgGradientStart: '#0A1F1A',
      primaryBgGradientVia: '#0F2B24',
      primaryBgGradientEnd: '#0A1F1A',
      accentPrimaryRgb: '110, 199, 187',
      accentSecondaryRgb: '61, 187, 169'
    }
  },
  CLEAN_WHITE: {
    name: 'Clean White',
    colors: {
      primaryBackground: '#F0F2F5',
      secondaryBackground: '#FFFFFF',
      textPrimary: '#0f172a',  // slate-900 for better contrast
      textSecondary: '#475569', // slate-600
      accentPrimary: '#3B82F6',
      accentSecondary: '#2563EB',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      primaryBgGradientStart: '#F0F2F5',
      primaryBgGradientVia: '#FFFFFF',
      primaryBgGradientEnd: '#F0F2F5',
      accentPrimaryRgb: '59, 130, 246',
      accentSecondaryRgb: '37, 99, 235',
      // Typography enhancements
      fontWeightPrimary: 450,
      lineHeightPrimary: 1.6
    }
  },
  ANDROMEDA_GALAXY: {
    name: 'Andromeda Galaxy',
    colors: {
      primaryBackground: '#0A0A1A',
      secondaryBackground: '#150F25',
      textPrimary: '#E0E0FF',
      textSecondary: '#A0A0C0',
      accentPrimary: '#6A5ACD',
      accentSecondary: '#8A2BE2',
      glowColor: 'rgba(106, 90, 205, 0.7)',
      borderColor: 'rgba(106, 90, 205, 0.3)',
      primaryBgGradientStart: '#0A0A1A',
      primaryBgGradientVia: '#150F25',
      primaryBgGradientEnd: '#0A0A1A',
      accentPrimaryRgb: '106, 90, 205',
      accentSecondaryRgb: '138, 43, 226'
    }
  },
  MILKY_WAY_NEBULA: {
    name: 'Milky Way Nebula',
    colors: {
      primaryBackground: '#1A1A0A',
      secondaryBackground: '#25250F',
      textPrimary: '#FFFACD',
      textSecondary: '#DAA520',
      accentPrimary: '#8B4513',
      accentSecondary: '#D2691E',
      glowColor: 'rgba(139, 69, 19, 0.7)',
      borderColor: 'rgba(139, 69, 19, 0.3)',
      primaryBgGradientStart: '#1A1A0A',
      primaryBgGradientVia: '#25250F',
      primaryBgGradientEnd: '#1A1A0A',
      accentPrimaryRgb: '139, 69, 19',
      accentSecondaryRgb: '210, 105, 30'
    }
  },
  CRAB_NEBULA: {
    name: 'Crab Nebula',
    colors: {
      primaryBackground: '#200A0A',
      secondaryBackground: '#301010',
      textPrimary: '#FFD700',
      textSecondary: '#FFA500',
      accentPrimary: '#FF4500',
      accentSecondary: '#DC143C',
      glowColor: 'rgba(255, 69, 0, 0.7)',
      borderColor: 'rgba(255, 69, 0, 0.3)',
      primaryBgGradientStart: '#200A0A',
      primaryBgGradientVia: '#301010',
      primaryBgGradientEnd: '#200A0A',
      accentPrimaryRgb: '255, 69, 0',
      accentSecondaryRgb: '220, 20, 60'
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

  // Background animation preferences
  const [backgroundAnimation, setBackgroundAnimation] = useState(() => {
    const storedAnimation = localStorage.getItem('backgroundAnimation');
    return storedAnimation || 'advanced'; // 'advanced', 'quantum', 'blockchain', 'none'
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
    root.style.setProperty('--font-weight-primary', theme.fontWeightPrimary || 400);
    root.style.setProperty('--line-height-primary', theme.lineHeightPrimary || 1.5);

    // Save theme preference to localStorage
    localStorage.setItem('colorTheme', currentTheme);
  }, [currentTheme]);

  // Save background animation preference to localStorage
  useEffect(() => {
    localStorage.setItem('backgroundAnimation', backgroundAnimation);
  }, [backgroundAnimation]);

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

  // Set background animation type
  const setBackgroundAnimationType = (animationType) => {
    if (['advanced', 'quantum', 'blockchain', 'none'].includes(animationType)) {
      setBackgroundAnimation(animationType);
    }
  };

  // Toggle background animation
  const toggleBackgroundAnimation = () => {
    setBackgroundAnimation(prev => {
      const animations = ['advanced', 'quantum', 'blockchain', 'none'];
      const currentIndex = animations.indexOf(prev);
      const nextIndex = (currentIndex + 1) % animations.length;
      return animations[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      themeData: THEMES[currentTheme],
      allThemes: THEMES,
      toggleTheme,
      setTheme,
      backgroundAnimation,
      setBackgroundAnimation: setBackgroundAnimationType,
      toggleBackgroundAnimation
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
