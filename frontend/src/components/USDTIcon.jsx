import React from 'react';

const USDTIcon = ({ size = 32, className = "", glow = false }) => {
    return (
        <div className={`relative ${glow ? 'animate-pulse' : ''} ${className}`} style={{ width: size, height: size }}>
            {glow && (
                <div className="absolute inset-0 rounded-full bg-green-400/40 blur-xl animate-pulse" />
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                className="relative z-10 drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="usdt-c" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF" stopOpacity=".5" />
                        <stop offset="100%" stopOpacity=".5" />
                    </linearGradient>
                    <circle id="usdt-b" cx="16" cy="15" r="15" />
                    <filter id="usdt-a" width="111.7%" height="111.7%" x="-5.8%" y="-4.2%" filterUnits="objectBoundingBox">
                        <feOffset dy=".5" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation=".5" />
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
                        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0" />
                    </filter>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <use fill="#000" filter="url(#usdt-a)" xlinkHref="#usdt-b" />
                    <use fill="#26A17B" xlinkHref="#usdt-b" />
                    <use fill="url(#usdt-c)" style={{ mixBlendMode: "soft-light" }} xlinkHref="#usdt-b" />
                    <circle cx="16" cy="15" r="14.5" stroke="#000" strokeOpacity=".097" />
                    <path
                        fill="#FFF"
                        d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
                    />
                </g>
            </svg>
        </div>
    );
};

export default USDTIcon;
