import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeAwareBackground from './3D/ThemeAwareBackground';

const BackgroundManager = () => {
    const { backgroundAnimation } = useTheme();

    // Don't render anything if animation is disabled
    if (backgroundAnimation === 'none') {
        return null;
    }

    // Render the appropriate background animation
    return <ThemeAwareBackground animationType={backgroundAnimation} />;
};

export default BackgroundManager;
