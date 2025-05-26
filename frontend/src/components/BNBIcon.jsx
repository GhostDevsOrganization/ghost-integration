import React from 'react';

const BNBIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-xl animate-pulse" />
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="bnb-c" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF" stopOpacity=".5" />
                        <stop offset="100%" stopOpacity=".5" />
                    </linearGradient>
                    <circle id="bnb-b" cx="16" cy="15" r="15" />
                    <filter id="bnb-a" width="111.7%" height="111.7%" x="-5.8%" y="-4.2%" filterUnits="objectBoundingBox">
                        <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".5" />
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
                        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0" />
                    </filter>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <use fill="#000" filter="url(#bnb-a)" xlinkHref="#bnb-b" />
                    <use fill="#F3BA2F" xlinkHref="#bnb-b" />
                    <use fill="url(#bnb-c)" style={{ mixBlendMode: "soft-light" }} xlinkHref="#bnb-b" />
                    <circle cx="16" cy="15" r="14.5" stroke="#000" strokeOpacity=".097" />
                    <path
                        fill="#FFF"
                        d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
                    />
                </g>
            </svg>
        </div>
    );
};

export default BNBIcon;
