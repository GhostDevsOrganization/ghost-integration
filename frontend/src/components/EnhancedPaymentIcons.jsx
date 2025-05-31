import React from 'react';
export const ApplePayIcon = ({ size = 120, className = "", glow = false }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
        <img
            src="/icons/ApplePayIcon.svg"
            width={size}
            height={size}
            alt="Apple"
        />
    </div>
);
// Venmo Icon - Transparent design based on provided image
export const VenmoIcon = ({ size = 32, className = "" }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
        <img
            src="/icons/VenmoIcon.png"
            width={size}
            height={size}
            alt="Venmo"
        />
    </div>
);

// Kaspa Icon - Using official Kaspa SVG (Best approach)
export const KaspaIcon = ({ size = 120, className = "", glow = false }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
        <img
            src="/icons/kaspa-official.svg"
            width={size}
            height={size}
            alt="Kaspa"
            className={`${glow ? 'drop-shadow-lg' : ''}`}
            style={{ filter: glow ? 'drop-shadow(0 0 8px rgba(112, 199, 186, 0.5))' : 'none' }}
        />
    </div>
);

// Visa Icon
export const VisaIcon = ({ size = 32, className = "", glow = false }) => (
    <div>
         <img
            src="/icons/VisaIcon.png"
            width={size}
            height={size}
            alt="Visa"
        />
    </div>
);

// Mastercard Icon - Simple CSS approach (No dependencies)
export const MastercardIcon = ({ size = 32, className = "", glow = false }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
         <img
            src="/icons/MastercardIcon.png"
            width={size}
            height={size}
            alt="Mastercard"
        />
    </div>
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

// CashApp Icon - Professional brand accurate design
export const CashAppIcon = ({ size = 32, className = "", glow = false }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <defs>
            <filter id="cashappGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Background */}
        <rect
            width="32"
            height="32"
            rx="6"
            fill="#00D632"
            filter={glow ? "url(#cashappGlow)" : "none"}
        />

        {/* Cash App $ symbol */}
        <g transform="translate(16, 16)">
            <circle cx="0" cy="0" r="12" fill="white" />
            {/* Stylized $ symbol */}
            <path
                d="M-2 -8 L2 -8 C4 -8 6 -6 6 -4 C6 -2 4 0 2 0 L-2 0 L-2 2 L2 2 C4 2 6 4 6 6 C6 8 4 8 2 8 L-2 8 M0 -10 L0 10"
                stroke="#00D632"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </g>

        {/* Subtle highlight */}
        <rect
            x="1"
            y="1"
            width="30"
            height="1"
            rx="0.5"
            fill="rgba(255,255,255,0.2)"
        />
    </svg>
);

// PayPal Icon - Professional brand accurate design
export const PayPalIcon = ({ size = 32, className = "", glow = false }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <defs>
            <filter id="paypalGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Background */}
        <rect
            width="32"
            height="32"
            rx="6"
            fill="#003087"
            filter={glow ? "url(#paypalGlow)" : "none"}
        />

        {/* PayPal P symbols */}
        <g transform="translate(4, 6)">
            {/* Front P (light blue) */}
            <path
                d="M8.5 2h4.8c2.8 0 4.7 1.8 4.7 4.5 0 3.2-2.1 5.5-5.2 5.5H10l-.8 4H6.5L8.5 2z"
                fill="#009CDE"
            />
            {/* Back P (dark blue) */}
            <path
                d="M6 6h4.8c2.8 0 4.7 1.8 4.7 4.5 0 3.2-2.1 5.5-5.2 5.5H7.5l-.8 4H4L6 6z"
                fill="#012169"
            />
        </g>

        {/* Subtle highlight */}
        <rect
            x="1"
            y="1"
            width="30"
            height="1"
            rx="0.5"
            fill="rgba(255,255,255,0.1)"
        />
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
    VenmoIcon,
    KaspaIcon,
    VisaIcon,
    MastercardIcon,
    MobileWalletIcon,
    CashAppIcon,
    PayPalIcon,
    PaymentCard
};
