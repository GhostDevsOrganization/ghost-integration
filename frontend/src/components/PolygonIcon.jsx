import React from 'react';

const PolygonIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-purple-400/40 blur-xl animate-pulse" />
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="polygon-c" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF" stopOpacity=".5" />
                        <stop offset="100%" stopOpacity=".5" />
                    </linearGradient>
                    <circle id="polygon-b" cx="16" cy="15" r="15" />
                    <filter id="polygon-a" width="111.7%" height="111.7%" x="-5.8%" y="-4.2%" filterUnits="objectBoundingBox">
                        <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".5" />
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
                        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0" />
                    </filter>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <use fill="#000" filter="url(#polygon-a)" xlinkHref="#polygon-b" />
                    <use fill="#8247E5" xlinkHref="#polygon-b" />
                    <use fill="url(#polygon-c)" style={{ mixBlendMode: "soft-light" }} xlinkHref="#polygon-b" />
                    <circle cx="16" cy="15" r="14.5" stroke="#000" strokeOpacity=".097" />

                    {/* Polygon logo paths */}
                    <g transform="translate(6, 5)">
                        <path
                            d="M14.5 7.5L12 6L9.5 7.5L7 6L4.5 7.5L2 6V14L4.5 15.5L7 14L9.5 15.5L12 14L14.5 15.5L17 14V6L14.5 7.5Z"
                            fill="#FFF"
                            fillOpacity="0.9"
                        />
                        <path
                            d="M12 8.5L14.5 10L12 11.5L9.5 10L12 8.5Z"
                            fill="#8247E5"
                        />
                        <path
                            d="M7 8.5L9.5 10L7 11.5L4.5 10L7 8.5Z"
                            fill="#8247E5"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default PolygonIcon;
