import React from 'react';
import { useTheme } from '../context/ThemeContext';

const KasportalLogo = ({ size = 'medium', withText = true, animated = true, className = '' }) => {
    const { isDark } = useTheme();

    // Determine dimensions based on size prop
    let dimensions = {
        small: { width: 24, height: 24, textClass: 'text-lg' },
        medium: { width: 32, height: 32, textClass: 'text-xl' },
        large: { width: 48, height: 48, textClass: 'text-2xl' },
        xlarge: { width: 64, height: 64, textClass: 'text-3xl' }
    }[size] || { width: 32, height: 32, textClass: 'text-xl' };

    return (
        <div className={`flex items-center ${className}`}>
            <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
                {/* Hexagon shape */}
                <svg
                    width={dimensions.width}
                    height={dimensions.height}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Hexagon outline */}
                    <path
                        d="M50 5L95 30V70L50 95L5 70V30L50 5Z"
                        stroke="url(#portalGradient)"
                        strokeWidth="2"
                        fill="none"
                    />

                    {/* Inner vortex elements */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <g key={i} className={animated ? 'animate-spin-slow' : ''} style={{ animationDuration: `${10 + i * 5}s` }}>
                            {Array.from({ length: 8 }).map((_, j) => (
                                <rect
                                    key={`${i}-${j}`}
                                    x={50 + (20 - i * 3) * Math.cos(j * Math.PI / 4 + i * 0.4)}
                                    y={50 + (20 - i * 3) * Math.sin(j * Math.PI / 4 + i * 0.4)}
                                    width={3 - i * 0.4}
                                    height={3 - i * 0.4}
                                    rx="1"
                                    fill="url(#portalGradient)"
                                    opacity={0.7 - i * 0.1}
                                />
                            ))}
                        </g>
                    ))}

                    {/* Gradient definitions */}
                    <defs>
                        <linearGradient id="portalGradient" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--ks-primary)" />
                            <stop offset="100%" stopColor="var(--ks-secondary)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Optional pulsing effect */}
                {animated && (
                    <div
                        className="absolute inset-0 rounded-full animate-pulse-slow"
                        style={{
                            background: 'radial-gradient(circle, var(--ks-primary) 0%, transparent 70%)',
                            opacity: 0.3
                        }}
                    />
                )}
            </div>

            {withText && (
                <div className={`ml-2 font-bold ${dimensions.textClass}`}>
                    <span style={{ color: 'var(--ks-primary)' }}>Kas</span>
                    <span style={{ color: 'var(--ks-text-primary)' }}>portal</span>
                </div>
            )}
        </div>
    );
};

export default KasportalLogo;
