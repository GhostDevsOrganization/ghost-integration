import React from 'react';

export default function HexagonalLogo({ className = "w-32 h-32", animate = false }) {
    return (
        <div className={`${className} ${animate ? 'animate-pulse' : ''}`}>
            <svg
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Main gradient from purple to teal */}
                    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>

                    {/* Inner swirl gradient */}
                    <radialGradient id="swirlGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#F8FAFC" stopOpacity="0.7" />
                        <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.3" />
                    </radialGradient>

                    {/* Glow effect */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer hexagon */}
                <path
                    d="M200 20 L340 110 L340 290 L200 380 L60 290 L60 110 Z"
                    fill="url(#mainGradient)"
                    stroke="#1E293B"
                    strokeWidth="4"
                    filter="url(#glow)"
                />

                {/* Middle hexagon */}
                <path
                    d="M200 40 L320 120 L320 280 L200 360 L80 280 L80 120 Z"
                    fill="#FFFFFF"
                    fillOpacity="0.9"
                />

                {/* Inner hexagon */}
                <path
                    d="M200 60 L300 130 L300 270 L200 340 L100 270 L100 130 Z"
                    fill="url(#mainGradient)"
                    fillOpacity="0.8"
                />

                {/* Swirl pattern - creating the spiral effect */}
                <g fill="url(#swirlGradient)">
                    {/* Main swirl arms */}
                    <path d="M200 200 Q280 150 320 200 Q280 250 200 200" fillOpacity="0.8" />
                    <path d="M200 200 Q150 120 200 80 Q250 120 200 200" fillOpacity="0.8" />
                    <path d="M200 200 Q120 250 80 200 Q120 150 200 200" fillOpacity="0.8" />
                    <path d="M200 200 Q250 280 200 320 Q150 280 200 200" fillOpacity="0.8" />

                    {/* Secondary swirl arms */}
                    <path d="M200 200 Q260 170 290 200 Q260 230 200 200" fillOpacity="0.6" />
                    <path d="M200 200 Q170 140 200 110 Q230 140 200 200" fillOpacity="0.6" />
                    <path d="M200 200 Q140 230 110 200 Q140 170 200 200" fillOpacity="0.6" />
                    <path d="M200 200 Q230 260 200 290 Q170 260 200 200" fillOpacity="0.6" />

                    {/* Inner swirl core */}
                    <circle cx="200" cy="200" r="25" fillOpacity="0.9" />
                </g>

                {/* Highlight effects */}
                <path
                    d="M200 20 L340 110 L340 150"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                />
                <path
                    d="M60 110 L200 20 L240 40"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                />
            </svg>
        </div>
    );
}
