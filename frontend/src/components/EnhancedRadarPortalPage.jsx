import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedRadarPortal from './EnhancedRadarPortal';

const EnhancedRadarPortalPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    // Track mouse position for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleEnterPortal = () => {
        setIsActive(true);
        // Navigate to the swap interface after the portal animation
        setTimeout(() => {
            navigate('/swap');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-blue-900/20 to-purple-900/20"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Main portal container */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                        Enhanced Radar Portal
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Experience the next generation of cross-chain swapping with our advanced 3D radar portal interface
                    </p>
                </div>

                {/* Enhanced Radar Portal Component */}
                <EnhancedRadarPortal
                    onEnterPortal={handleEnterPortal}
                    isActive={isActive}
                    mousePosition={mousePosition}
                />

                {/* Instructions */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm md:text-base">
                        Click the portal to enter the advanced trading interface
                    </p>
                </div>
            </div>

            {/* Loading overlay when portal is active */}
            {isActive && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-teal-400/20 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-lg">Entering Enhanced Portal...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancedRadarPortalPage;
