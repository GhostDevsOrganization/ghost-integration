import React from 'react';

// Apple Pay Icon - Brand accurate design
export const ApplePayIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 48 32" fill="none" className={className}>
        <rect width="48" height="32" rx="6" fill="#000000" />
        <g transform="translate(8, 8)">
            {/* Apple logo */}
            <path d="M8.5 2.5c0-1.1.9-2 2-2 .7 0 1.3.4 1.7.9.3.4.5.9.5 1.4 0 .1 0 .2-.1.2-.9.1-1.8-.5-2.1-1.3-.2-.4-.3-.8-.3-1.2 0-.1 0-.1.3 0z" fill="white" />
            <path d="M13.2 6.8c-.8-.9-1.9-1.4-3.1-1.4-1.5 0-2.7.9-3.4.9-.7 0-1.8-.9-3-.9-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.7 1.1 1.6 2.4 2.7 2.4 1.1 0 1.4-.7 2.7-.7 1.3 0 1.5.7 2.7.7 1.1 0 1.9-1.2 2.6-2.3.5-.7.9-1.5 1.1-2.3 0-.1-.1-.1-.1-.1-2.2-.8-2.2-3.8 0-4.6.1-.1.1-.2 0-.2z" fill="white" />
        </g>
        <text x="24" y="22" fontSize="8" fill="white" fontFamily="Arial, sans-serif" fontWeight="500">Pay</text>
    </svg>
);

// Visa Icon - Brand accurate design
export const VisaIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 48 32" fill="none" className={className}>
        <rect width="48" height="32" rx="6" fill="#1A1F71" />
        <g transform="translate(6, 10)">
            <path d="M14.5 0L11.8 12h-2.4L7.8 3.2c-.2-.7-.3-1-.8-1.3C6.4 1.5 5.5 1.1 4.5.8L4.7 0h4.1c.5 0 1 .4 1.1.9L11.3 8l2.8-8h2.4z" fill="white" />
            <path d="M21.8 0L19.6 12h-2.3L19.5 0h2.3z" fill="white" />
            <path d="M28.5 3.2c0-.5.4-.9.9-.9.8 0 1.4.2 1.9.4l.3-2.1C31.1.4 30.3.2 29.4.2c-2.3 0-3.9 1.2-3.9 2.9 0 1.3 1.1 2 2 2.4.9.5 1.2.8 1.2 1.2 0 .6-.7.9-1.4.9-.9 0-1.8-.2-2.6-.6l-.4 2.1c.6.3 1.7.5 2.8.5 2.4 0 4-1.2 4-3 0-2.3-3.2-2.4-3.2-3.4z" fill="white" />
            <path d="M36 0c-.5 0-.9.3-1.1.8L31.5 12h2.4l.5-1.3h2.9l.3 1.3H40L38.4 0H36zm-.4 3.2l.7 4.5h-1.9l1.2-4.5z" fill="white" />
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
    ApplePayIcon,
    VisaIcon,
    MastercardIcon,
    MobileWalletIcon,
    CashAppIcon,
    PayPalIcon,
    PaymentCard
};
