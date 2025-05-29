import React from 'react';

const KaspaIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/40 to-cyan-400/40 blur-xl animate-pulse" />
            )}
            <img
                src="/icons/kaspa-official.svg"
                width={size}
                height={size}
                alt="Kaspa"
                className="relative z-10 drop-shadow-2xl"
                style={{ filter: glow ? 'drop-shadow(0 0 8px rgba(112, 199, 186, 0.5))' : 'none' }}
            />
        </div>
    );
};

export default KaspaIcon;
