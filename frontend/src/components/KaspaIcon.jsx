import React from 'react';

const KaspaIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/40 to-cyan-400/40 blur-xl animate-pulse" />
            )}
            <svg
                viewBox="0 0 32 32"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="kaspaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#70C7BA" />
                        <stop offset="50%" stopColor="#4FD1C7" />
                        <stop offset="100%" stopColor="#2DD4BF" />
                    </linearGradient>
                    <linearGradient id="kaspaInner" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                    {/* Outer circle */}
                    <circle cx="16" cy="16" r="15" fill="url(#kaspaGradient)" />
                    <circle cx="16" cy="16" r="14.5" stroke="#000" strokeOpacity="0.1" />

                    {/* Kaspa "K" symbol - stylized geometric design */}
                    <g transform="translate(6, 6)">
                        {/* Main vertical line */}
                        <rect x="2" y="2" width="3" height="16" fill="url(#kaspaInner)" rx="1.5" />

                        {/* Upper diagonal */}
                        <path
                            d="M5 8 L14 2 L16 4 L8 9 Z"
                            fill="url(#kaspaInner)"
                        />

                        {/* Lower diagonal */}
                        <path
                            d="M5 12 L14 18 L16 16 L8 11 Z"
                            fill="url(#kaspaInner)"
                        />

                        {/* Center connection */}
                        <circle cx="6.5" cy="10" r="1.5" fill="url(#kaspaInner)" />
                    </g>

                    {/* Subtle inner glow */}
                    <circle cx="16" cy="16" r="12" fill="none" stroke="url(#kaspaInner)" strokeWidth="0.5" strokeOpacity="0.3" />
                </g>
            </svg>
        </div>
    );
};

export default KaspaIcon;
