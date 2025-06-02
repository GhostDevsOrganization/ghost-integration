import React from 'react';

const BNBIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-xl animate-pulse" />
            )}
            <div className="relative z-10 rounded-full border-2 border-yellow-300 bg-white shadow-xl hover:border-yellow-400 transition-colors duration-300 overflow-hidden" style={{ width: size, height: size }}>
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500">
                    <span 
                        className="text-white font-bold"
                        style={{ fontSize: `${size * 0.6}px` }}
                    >
                        ?
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BNBIcon;
