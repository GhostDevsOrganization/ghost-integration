import React from 'react';

// Venmo Icon - Transparent design based on provided image
export const VenmoIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 120 40" fill="none" className={className}>
        {/* Venmo text with blue gradient */}
        <text x="10" y="30" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold" fill="url(#venmoGradient)">
            venmo
        </text>
        <defs>
            <linearGradient id="venmoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E90FF" />
                <stop offset="50%" stopColor="#0080FF" />
                <stop offset="100%" stopColor="#0066CC" />
            </linearGradient>
        </defs>
    </svg>
);

// Kaspa Icon - Transparent design with teal circle and white arrows
export const KaspaIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 80 40" fill="none" className={className}>
        {/* Teal circular background */}
        <circle cx="20" cy="20" r="16" fill="#4FD1C7" />

        {/* White arrow symbols inside circle */}
        <g transform="translate(20, 20)">
            {/* Right-pointing arrow */}
            <path d="M-4 -6 L4 0 L-4 6 L-2 6 L6 0 L-2 -6 Z" fill="white" />
            {/* Left-pointing arrow overlay */}
            <path d="M4 -4 L-2 0 L4 4 L2 4 L-4 0 L2 -4 Z" fill="white" opacity="0.8" />
        </g>

        {/* Kaspa text */}
        <text x="45" y="26" fontSize="16" fill="#2D3748" fontFamily="Arial, sans-serif" fontWeight="600">
            Kaspa
        </text>
    </svg>
);

// Visa Icon - Transparent design with blue VISA text
export const VisaIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 100 40" fill="none" className={className}>
        {/* VISA text in blue */}
        <g transform="translate(10, 8)">
            {/* V */}
            <path d="M0 0 L6 0 L12 24 L18 0 L24 0 L15 32 L9 32 Z" fill="#1434CB" />
            {/* I */}
            <path d="M26 0 L32 0 L32 32 L26 32 Z" fill="#1434CB" />
            {/* S */}
            <path d="M36 0 L60 0 L60 6 L42 6 L42 11 L58 11 L58 17 L42 17 L42 26 L60 26 L60 32 L36 32 Z" fill="#1434CB" />
            {/* A */}
            <path d="M64 0 L70 0 L84 32 L78 32 L75 24 L67 24 L64 32 L58 32 Z M69 18 L73 18 L71 12 Z" fill="#1434CB" />
        </g>
    </svg>
);

// Mastercard Icon - Brand accurate design
export const MastercardIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 48 32" fill="none" className={className}>
        <rect width="48" height="32" rx="6" fill="#000000" />
        <g transform="translate(12, 8)">
            {/* Left circle (red) */}
            <circle cx="8" cy="8" r="8" fill="#EB001B" />
            {/* Right circle (yellow) */}
            <circle cx="16" cy="8" r="8" fill="#F79E1B" />
            {/* Intersection (orange) */}
            <path d="M12 2.5c1.5 1.2 2.5 3.1 2.5 5.5s-1 4.3-2.5 5.5c-1.5-1.2-2.5-3.1-2.5-5.5s1-4.3 2.5-5.5z" fill="#FF5F00" />
        </g>
    </svg>
);

// Mobile Wallet Icon - Generic mobile payment design
export const MobileWalletIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect x="8" y="4" width="16" height="24" rx="3" fill="#14B8A6" stroke="#0D9488" strokeWidth="1" />
        <rect x="10" y="6" width="12" height="1" rx="0.5" fill="white" opacity="0.8" />
        <rect x="10" y="24" width="12" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="11" y="9" width="10" height="12" rx="2" fill="white" opacity="0.9" />
        <circle cx="16" cy="15" r="2" fill="#14B8A6" />
        <path d="M14 13l2 2 2-2" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// CashApp Icon - Brand accurate design
export const CashAppIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#00D632" />
        <g transform="translate(6, 6)">
            <path d="M10 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" fill="white" />
            <path d="M12.5 6.5c-.3-.3-.7-.5-1.2-.5H8.7c-.8 0-1.5.7-1.5 1.5v.5h1.5v-.5h2.6l-3.8 3.8c-.3.3-.5.7-.5 1.2v.5c0 .8.7 1.5 1.5 1.5h2.6c.5 0 .9-.2 1.2-.5l.5-.5-1.1-1.1-.5.5H8.7v-.5l3.8-3.8c.3-.3.5-.7.5-1.2V7c0-.2-.1-.4-.2-.5l-.3-.5z" fill="#00D632" />
        </g>
    </svg>
);

// PayPal Icon - Brand accurate design
export const PayPalIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#003087" />
        <g transform="translate(4, 6)">
            <path d="M8.5 2h4.8c2.8 0 4.7 1.8 4.7 4.5 0 3.2-2.1 5.5-5.2 5.5H10l-.8 4H6.5L8.5 2z" fill="#009CDE" />
            <path d="M6 6h4.8c2.8 0 4.7 1.8 4.7 4.5 0 3.2-2.1 5.5-5.2 5.5H7.5l-.8 4H4L6 6z" fill="#012169" />
        </g>
    </svg>
);

// Enhanced Payment Card Component
export const PaymentCard = ({ icon, title, status, gradient, delay = 0 }) => (
    <div
        className="group text-center p-6 bg-[var(--secondary-bg)] backdrop-blur-2xl border border-[var(--text-secondary)]/20 rounded-3xl hover:border-[var(--accent-primary)]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl shadow-[var(--primary-bg)]/30 hover:shadow-[var(--accent-primary)]/30 w-full max-w-xs animate-fade-in-up"
        style={{ animationDelay: `${delay}s` }}
    >
        {/* Glowing background effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 bg-gradient-to-r ${gradient}`}></div>

        <div className="flex justify-center mb-4 relative z-10">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 relative z-10 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
            {title}
        </h3>

        <div className="relative z-10">
            <p className="text-sm text-gray-400 mb-2">{status}</p>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 group-hover:w-full`}
                    style={{ width: status.includes('Q2') ? '75%' : '45%' }}
                ></div>
            </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r ${gradient}`}>
                <div className="w-full h-full rounded-3xl bg-[var(--secondary-bg)]"></div>
            </div>
        </div>
    </div>
);

export default {
    VenmoIcon,
    KaspaIcon,
    VisaIcon,
    MastercardIcon,
    MobileWalletIcon,
    CashAppIcon,
    PayPalIcon,
    PaymentCard
};
