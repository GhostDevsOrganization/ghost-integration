import React from 'react';

// Custom crypto-style SVG icons
export const SwapIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="swapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16M21 12H3"
            stroke="url(#swapGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="url(#swapGradient)" opacity="0.3" />
    </svg>
);

export const WalletIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <rect x="3" y="6" width="18" height="12" rx="3" stroke="url(#walletGradient)" strokeWidth="2" fill="url(#walletGradient)" fillOpacity="0.1" />
        <path d="M3 10H21" stroke="url(#walletGradient)" strokeWidth="2" />
        <circle cx="17" cy="14" r="1.5" fill="url(#walletGradient)" />
        <path d="M7 6V4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4V6" stroke="url(#walletGradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const LearnIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="learnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
        </defs>
        <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="url(#learnGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#learnGradient)"
            fillOpacity="0.2"
        />
        <path
            d="M2 17L12 22L22 17"
            stroke="url(#learnGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M2 12L12 17L22 12"
            stroke="url(#learnGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const HomeIcon = ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z"
            stroke="url(#homeGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#homeGradient)"
            fillOpacity="0.1"
        />
        <path
            d="M9 21V12H15V21"
            stroke="url(#homeGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const CrossChainIcon = ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="crosschainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <circle cx="6" cy="6" r="3" stroke="url(#crosschainGradient)" strokeWidth="2" fill="url(#crosschainGradient)" fillOpacity="0.2" />
        <circle cx="18" cy="6" r="3" stroke="url(#crosschainGradient)" strokeWidth="2" fill="url(#crosschainGradient)" fillOpacity="0.2" />
        <circle cx="6" cy="18" r="3" stroke="url(#crosschainGradient)" strokeWidth="2" fill="url(#crosschainGradient)" fillOpacity="0.2" />
        <circle cx="18" cy="18" r="3" stroke="url(#crosschainGradient)" strokeWidth="2" fill="url(#crosschainGradient)" fillOpacity="0.2" />
        <path d="M9 6H15" stroke="url(#crosschainGradient)" strokeWidth="2" />
        <path d="M9 18H15" stroke="url(#crosschainGradient)" strokeWidth="2" />
        <path d="M6 9V15" stroke="url(#crosschainGradient)" strokeWidth="2" />
        <path d="M18 9V15" stroke="url(#crosschainGradient)" strokeWidth="2" />
    </svg>
);

export const PaymentIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="paymentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <rect x="2" y="6" width="20" height="12" rx="3" stroke="url(#paymentGradient)" strokeWidth="2" fill="url(#paymentGradient)" fillOpacity="0.1" />
        <path d="M2 10H22" stroke="url(#paymentGradient)" strokeWidth="2" />
        <rect x="6" y="14" width="4" height="2" rx="1" fill="url(#paymentGradient)" />
        <circle cx="18" cy="15" r="1" fill="url(#paymentGradient)" />
    </svg>
);

export const MobileIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
        </defs>
        <rect x="6" y="2" width="12" height="20" rx="3" stroke="url(#mobileGradient)" strokeWidth="2" fill="url(#mobileGradient)" fillOpacity="0.1" />
        <path d="M10 18H14" stroke="url(#mobileGradient)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="6" r="1" fill="url(#mobileGradient)" />
        <rect x="9" y="8" width="6" height="6" rx="1" stroke="url(#mobileGradient)" strokeWidth="1.5" fill="url(#mobileGradient)" fillOpacity="0.2" />
    </svg>
);

export const SmartContractIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="contractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="url(#contractGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#contractGradient)"
            fillOpacity="0.2"
        />
        <circle cx="12" cy="12" r="2" stroke="url(#contractGradient)" strokeWidth="1.5" fill="url(#contractGradient)" fillOpacity="0.5" />
    </svg>
);

export const AIIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="3" stroke="url(#aiGradient)" strokeWidth="2" fill="url(#aiGradient)" fillOpacity="0.2" />
        <path d="M12 1V3" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 21V23" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 4.22L5.64 5.64" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 18.36L19.78 19.78" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 12H3" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 12H23" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 19.78L5.64 18.36" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 5.64L19.78 4.22" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1" fill="url(#aiGradient)" />
    </svg>
);

export const EmailIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
        </defs>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#emailGradient)" strokeWidth="2" fill="url(#emailGradient)" fillOpacity="0.1" />
        <path d="M22 6L12 13L2 6" stroke="url(#emailGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="8" r="2" stroke="url(#emailGradient)" strokeWidth="1.5" fill="url(#emailGradient)" fillOpacity="0.3" />
    </svg>
);

export const DiscordIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="discordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
            fill="url(#discordGradient)"
        />
    </svg>
);

export const DocsIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="docsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="url(#docsGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#docsGradient)"
            fillOpacity="0.1"
        />
        <path d="M14 2V8H20" stroke="url(#docsGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" stroke="url(#docsGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" stroke="url(#docsGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H9H8" stroke="url(#docsGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const BusinessIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="businessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M12 2L2 7V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V7L12 2Z"
            stroke="url(#businessGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#businessGradient)"
            fillOpacity="0.1"
        />
        <path d="M12 22V12" stroke="url(#businessGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="8" r="2" stroke="url(#businessGradient)" strokeWidth="1.5" fill="url(#businessGradient)" fillOpacity="0.3" />
    </svg>
);
