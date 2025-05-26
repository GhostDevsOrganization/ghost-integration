import React from 'react';

const KASIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-teal-400/40 blur-xl animate-pulse" />
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="kas-c" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF" stopOpacity=".5" />
                        <stop offset="100%" stopOpacity=".5" />
                    </linearGradient>
                    <circle id="kas-b" cx="16" cy="15" r="15" />
                    <filter id="kas-a" width="111.7%" height="111.7%" x="-5.8%" y="-4.2%" filterUnits="objectBoundingBox">
                        <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".5" />
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
                        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0" />
                    </filter>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <use fill="#000" filter="url(#kas-a)" xlinkHref="#kas-b" />
                    <use fill="#70C7BA" xlinkHref="#kas-b" />
                    <use fill="url(#kas-c)" style={{ mixBlendMode: "soft-light" }} xlinkHref="#kas-b" />
                    <circle cx="16" cy="15" r="14.5" stroke="#000" strokeOpacity=".097" />
                    <text
                        x="16"
                        y="20"
                        fontSize="16"
                        fontWeight="bold"
                        fill="#FFF"
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        style={{ dominantBaseline: "middle" }}
                    >
                        𐤊
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default KASIcon;
