import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import EnhancedFooter from './EnhancedFooter';
import FeatureCard from './FeatureCard';
import HolographicGrid from './3D/HolographicGrid';
import MEVProtectionVisual from './3D/MEVProtectionVisual';
import EnhancedIPhoneMockup from './EnhancedIPhoneMockup';
import BusinessInquiryForm from './BusinessInquiryForm';
import {
    SwapIcon,
    WalletIcon,
    LearnIcon,
    HomeIcon,
    CrossChainIcon,
    PaymentIcon,
    MobileIcon,
    SmartContractIcon,
    AIIcon,
    EmailIcon,
    DiscordIcon,
    DocsIcon,
} from './CryptoIcons';
import TelegramIcon from './TelegramIcon';
import {
    ApplePayIcon,
    VisaIcon,
    MastercardIcon,
} from './EnhancedPaymentIcons';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import USDTIcon from './USDTIcon';
import BNBIcon from './BNBIcon';
import KASIcon from './KASIcon';

// Enhanced Navbar Component with Kasportal theming
const Enhanced3DNavBar = ({ list, theme }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
            <nav className="relative">
                <ul className="flex items-center">
                    {list?.map((item) => {
                        return (
                            <li key={item.id} className="relative">
                                <a
                                    className={`
                    relative flex items-center justify-center rounded-xl px-6 py-3 transition-all duration-300
                    hover:bg-white/10 backdrop-blur-sm
                    ${hovered === item?.id ? 'bg-white/10' : ''}
                  `}
                                    style={{
                                        color: theme?.colors?.textPrimary || '#FFFFFF',
                                    }}
                                    onMouseEnter={() => setHovered(item.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    href={item?.url}
                                >
                                    {item?.title}
                                </a>
                                {hovered === item?.id && !item?.dropdown && (
                                    <motion.div
                                        layout
                                        layoutId="cursor"
                                        className="absolute h-0.5 w-full rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${theme?.colors?.accentPrimary || '#6EC7BB'}, ${theme?.colors?.accentSecondary || '#3dbba9'})`,
                                        }}
                                    />
                                )}
                                {item?.dropdown && hovered === item?.id && (
                                    <div
                                        className="absolute left-0 top-full z-50"
                                        onMouseEnter={() => setHovered(item.id)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <motion.div
                                            layout
                                            transition={{ bounce: 0 }}
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 10, opacity: 0 }}
                                            className="mt-4 flex w-64 flex-col rounded-xl border backdrop-blur-xl"
                                            style={{
                                                backgroundColor: theme?.colors?.secondaryBackground || '#0F2B24',
                                                borderColor: theme?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                            }}
                                            layoutId="cursor"
                                        >
                                            {item?.items?.map((nav) => {
                                                return (
                                                    <motion.a
                                                        key={`link-${nav?.id}`}
                                                        href={`${nav?.url}`}
                                                        className="w-full p-4 hover:bg-white/10 rounded-xl transition-all duration-300"
                                                        style={{
                                                            color: theme?.colors?.textSecondary || '#87C7B6',
                                                        }}
                                                    >
                                                        {nav?.title}
                                                    </motion.a>
                                                );
                                            })}
                                        </motion.div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </MotionConfig>
    );
};

// 3D Background Component (fallback for Spline)
function Enhanced3DBackground({ theme }) {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background: `
            radial-gradient(circle at 20% 50%, ${theme?.colors?.accentPrimary || '#6EC7BB'}20 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${theme?.colors?.accentSecondary || '#3dbba9'}20 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, ${theme?.colors?.accentPrimary || '#6EC7BB'}15 0%, transparent 50%),
            linear-gradient(135deg, ${theme?.colors?.primaryBackground || '#0A1F1A'} 0%, ${theme?.colors?.secondaryBackground || '#0F2B24'} 100%)
          `,
                }}
            />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-20"
                        style={{
                            background: `linear-gradient(45deg, ${theme?.colors?.accentPrimary || '#6EC7BB'}, ${theme?.colors?.accentSecondary || '#3dbba9'})`,
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Holographic grid overlay */}
            <div className="absolute inset-0 opacity-30">
                <HolographicGrid themeData={theme} performanceMode="high" />
            </div>
        </div>
    );
}

// Hero Content Component
function Enhanced3DHeroContent({ theme }) {
    const navigate = useNavigate();

    return (
        <div className="relative z-10 px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center py-16 min-h-screen">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-wide"
                        style={{ color: theme?.colors?.textPrimary || '#FFFFFF' }}
                    >
                        Building the Future of<br />
                        <span
                            className="bg-gradient-to-r bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(90deg, ${theme?.colors?.accentPrimary || '#6EC7BB'}, ${theme?.colors?.accentSecondary || '#3dbba9'})`,
                            }}
                        >
                            Decentralized Finance
                        </span>
                    </h1>
                    <div
                        className="text-sm opacity-90 mt-4 font-semibold tracking-wider"
                        style={{ color: theme?.colors?.textSecondary || '#87C7B6' }}
                    >
                        CROSS-CHAIN \ MEV PROTECTION \ INSTANT SWAPS \ DEFI
                    </div>
                </motion.div>
            </div>

            <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p
                        className="text-base sm:text-lg opacity-80 mb-8 max-w-md leading-relaxed"
                        style={{ color: theme?.colors?.textSecondary || '#87C7B6' }}
                    >
                        Bridging traditional payment systems with blockchain technology.
                        From Apple Pay to smart contract utilities, we're making crypto
                        accessible to everyone everywhere.
                    </p>
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="border-2 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto hover:scale-105 backdrop-blur-sm"
                            style={{
                                borderColor: theme?.colors?.accentPrimary || '#6EC7BB',
                                color: theme?.colors?.textPrimary || '#FFFFFF',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = theme?.colors?.accentPrimary || '#6EC7BB';
                                e.target.style.color = theme?.colors?.primaryBackground || '#0A1F1A';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.color = theme?.colors?.textPrimary || '#FFFFFF';
                            }}
                            onClick={() => navigate('/learn')}
                        >
                            Learn More
                        </button>
                        <button
                            className="font-semibold py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${theme?.colors?.accentPrimary || '#6EC7BB'}, ${theme?.colors?.accentSecondary || '#3dbba9'})`,
                                color: theme?.colors?.primaryBackground || '#0A1F1A',
                            }}
                            onClick={() => navigate('/features/token-swapping')}
                        >
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" />
                            Start Trading Now
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Enhanced Navbar for Hero Section
function Enhanced3DHeroNavbar({ theme }) {
    const navigate = useNavigate();

    const menus = [
        { id: 1, title: 'Home', url: '/', dropdown: false },
        { id: 2, title: 'Token Swapping', url: '/features/token-swapping', dropdown: false },
        { id: 3, title: 'Cross Chain', url: '/features/cross-chain-compatibility', dropdown: false },
        { id: 4, title: 'Learn', url: '/learn', dropdown: false },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
            style={{
                backgroundColor: `${theme?.colors?.primaryBackground || '#0A1F1A'}CC`,
                borderColor: theme?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
            }}
        >
            <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                        style={{ color: theme?.colors?.accentPrimary || '#6EC7BB' }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12.4306 9.70695C12.742 9.33317 13.2633 9.30058 13.6052 9.62118L19.1798 14.8165C19.4894 15.1054 19.4894 15.5841 19.1798 15.873L13.6052 21.0683C13.2633 21.3889 12.742 21.3563 12.4306 19.9991V9.70695Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>

                    <div className="hidden md:flex">
                        <Enhanced3DNavBar list={menus} theme={theme} />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        className="border font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                        style={{
                            borderColor: theme?.colors?.accentPrimary || '#6EC7BB',
                            color: theme?.colors?.textPrimary || '#FFFFFF',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = theme?.colors?.accentPrimary || '#6EC7BB';
                            e.target.style.color = theme?.colors?.primaryBackground || '#0A1F1A';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = theme?.colors?.textPrimary || '#FFFFFF';
                        }}
                        onClick={() => navigate('/learn')}
                    >
                        Let's Talk!
                    </button>
                </div>
            </div>
        </nav>
    );
}

// Main Enhanced 3D Landing Page Component
export default function Enhanced3DLandingPage() {
    const navigate = useNavigate();
    const { themeData } = useTheme();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const screenshotRef = useRef(null);
    const heroContentRef = useRef(null);

    const features = [
        {
            title: "Instant Cross-Chain Swaps",
            description: "Seamlessly exchange assets across multiple blockchains with near-instant finality",
            icon: <SwapIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            gradient: `from-[${themeData?.colors?.accentPrimary || '#6EC7BB'}] to-[${themeData?.colors?.accentSecondary || '#3dbba9'}]`,
        },
        {
            title: "MEV Protection",
            description: "Advanced transaction bundling to prevent front-running and sandwich attacks",
            icon: <SmartContractIcon size={32} style={{ color: themeData?.colors?.accentSecondary || '#3dbba9' }} />,
            gradient: `from-[${themeData?.colors?.accentSecondary || '#3dbba9'}] to-[${themeData?.colors?.accentPrimary || '#6EC7BB'}]`,
        },
        {
            title: "Multi-Chain Wallet",
            description: "Unified interface for managing assets across all supported networks",
            icon: <WalletIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            gradient: `from-[${themeData?.colors?.accentPrimary || '#6EC7BB'}] to-[${themeData?.colors?.accentSecondary || '#3dbba9'}]`,
        },
    ];

    const popularPairs = [
        {
            from: "BTC",
            to: "KAS",
            fromIcon: <BitcoinIcon size={48} style={{ color: "#F7931A" }} />,
            toIcon: <KASIcon size={48} style={{ color: themeData?.colors?.accentPrimary || "#70C7BA" }} />,
            color: "from-orange-400 to-teal-400",
            fromColor: "text-orange-500",
            toColor: "text-teal-400",
        },
        {
            from: "ETH",
            to: "KAS",
            fromIcon: <EthereumIcon size={48} style={{ color: "#627EEA" }} />,
            toIcon: <KASIcon size={48} style={{ color: themeData?.colors?.accentPrimary || "#70C7BA" }} />,
            color: "from-blue-400 to-teal-400",
            fromColor: "text-blue-500",
            toColor: "text-teal-400",
        },
        {
            from: "KAS",
            to: "BTC",
            fromIcon: <KASIcon size={48} style={{ color: themeData?.colors?.accentPrimary || "#70C7BA" }} />,
            toIcon: <BitcoinIcon size={48} style={{ color: "#F7931A" }} />,
            color: "from-teal-400 to-orange-500",
            fromColor: "text-teal-400",
            toColor: "text-orange-500",
        },
    ];

    const paymentMethods = [
        {
            name: "Apple Pay",
            icon: <ApplePayIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            status: "Coming Q2 2025",
        },
        {
            name: "Visa",
            icon: <VisaIcon size={32} style={{ color: themeData?.colors?.accentSecondary || '#3dbba9' }} />,
            status: "Coming Q2 2025",
        },
        {
            name: "Mastercard",
            icon: <MastercardIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            status: "Coming Q2 2025",
        },
    ];

    const contactMethods = [
        {
            title: "Email Support",
            description: "Get help with technical issues, account questions, or general inquiries",
            icon: <EmailIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            contact: "support@kasportal.com",
            action: "mailto:support@kasportal.com",
        },
        {
            title: "Telegram Documentation",
            description: "Access our comprehensive Telegram bot guides and integration docs",
            icon: <TelegramIcon size={32} style={{ color: themeData?.colors?.accentSecondary || '#3dbba9' }} />,
            contact: "View Telegram Docs",
            action: "/learn#telegram",
        },
        {
            title: "Community Discord",
            description: "Join our vibrant community for real-time discussions and updates",
            icon: <DiscordIcon size={32} style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }} />,
            contact: "Join Discord",
            action: "#",
        },
        {
            title: "Documentation",
            description: "Comprehensive guides and API documentation for developers",
            icon: <DocsIcon size={32} style={{ color: themeData?.colors?.accentSecondary || '#3dbba9' }} />,
            contact: "View Docs",
            action: "/learn",
        },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);

            if (screenshotRef.current && heroContentRef.current) {
                requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;

                    if (screenshotRef.current) {
                        screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.3}px)`;
                    }

                    const maxScroll = 400;
                    const opacity = 1 - Math.min(scrollPosition / maxScroll, 0.8);
                    if (heroContentRef.current) {
                        heroContentRef.current.style.opacity = opacity.toString();
                    }
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleContactClick = (action) => {
        if (action.startsWith("mailto:")) {
            window.location.href = action;
        } else if (action.startsWith("/")) {
            navigate(action);
        } else {
            window.open(action, "_blank");
        }
    };

    const handlePairSelect = (from, to) => {
        navigate("/features/token-swapping");
    };

    return (
        <div className="min-h-screen overflow-x-hidden relative">
            {/* Enhanced 3D Hero Section */}
            <div className="relative min-h-screen">
                <Enhanced3DHeroNavbar theme={themeData} />

                <div className="absolute inset-0 z-0">
                    <Enhanced3DBackground theme={themeData} />
                </div>

                <div ref={heroContentRef} className="relative z-10">
                    <Enhanced3DHeroContent theme={themeData} />
                </div>
            </div>

            {/* Content Sections */}
            <div
                className="relative z-10"
                style={{
                    backgroundColor: themeData?.colors?.primaryBackground || '#0A1F1A',
                    marginTop: '-10vh',
                }}
            >
                {/* Screenshot/Preview Section */}
                <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-16">
                    <div ref={screenshotRef} className="rounded-xl overflow-hidden shadow-2xl border w-full md:w-[80%] lg:w-[70%] mx-auto backdrop-blur-xl"
                        style={{
                            backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                            borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                        }}
                    >
                        <div className="p-4">
                            <EnhancedIPhoneMockup />
                        </div>
                    </div>
                </section>

                <main className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
                    {/* Core Features Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Core Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <FeatureCard key={index} {...feature} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Popular Swap Pairs Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Popular Swap Pairs
                            </h2>
                            <p
                                className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium drop-shadow-sm"
                                style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                            >
                                Effortless exchanges between leading cryptocurrencies
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4">
                            {popularPairs.map((pair, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative p-8 sm:p-10 backdrop-blur-xl border rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full cursor-pointer shadow-lg"
                                    style={{
                                        backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                                        borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                    }}
                                    onClick={() => handlePairSelect(pair.from, pair.to)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center justify-center mb-8">
                                        <div
                                            className="relative flex items-center justify-center w-24 h-24 rounded-full border shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}20, ${themeData?.colors?.accentSecondary || '#3dbba9'}20)`,
                                                borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                            }}
                                        >
                                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                                                {pair.fromIcon}
                                            </div>
                                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                                                {pair.toIcon}
                                            </div>
                                        </div>
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-6 text-center"
                                        style={{ color: themeData?.colors?.textPrimary || '#C1E1D7' }}
                                    >
                                        <span className={`${pair.fromColor}`}>{pair.from}</span> to{" "}
                                        <span className={`${pair.toColor}`}>{pair.to}</span>
                                    </h3>
                                    <p
                                        className="text-center leading-relaxed text-lg"
                                        style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                                    >
                                        Swap {pair.from} for {pair.to} instantly with competitive rates.
                                    </p>
                                    <div className="mt-6 text-center">
                                        <button
                                            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-base shadow-lg transition-all duration-300 transform hover:scale-105"
                                            style={{
                                                background: `linear-gradient(135deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                                color: themeData?.colors?.primaryBackground || '#0A1F1A',
                                            }}
                                        >
                                            Swap Now <ArrowRight className="ml-2 w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Enhanced Payment Gateway Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Enhanced Payment Gateway
                            </h2>
                            <p
                                className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium drop-shadow-sm"
                                style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                            >
                                Seamlessly bridge traditional finance with crypto
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4">
                            {paymentMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative p-8 sm:p-10 backdrop-blur-xl border rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full shadow-lg"
                                    style={{
                                        backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                                        borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div
                                        className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-3xl backdrop-blur-sm border"
                                        style={{
                                            background: `linear-gradient(135deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}20, ${themeData?.colors?.accentSecondary || '#3dbba9'}20)`,
                                            borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                        }}
                                    >
                                        {method.icon}
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-6 text-center"
                                        style={{ color: themeData?.colors?.textPrimary || '#C1E1D7' }}
                                    >
                                        {method.name}
                                    </h3>
                                    <p
                                        className="text-center leading-relaxed text-lg"
                                        style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                                    >
                                        {method.status}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Innovation Features Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Innovation Features
                            </h2>
                            <p
                                className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium drop-shadow-sm"
                                style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                            >
                                Driving the next generation of blockchain technology
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 px-4">
                            <motion.div
                                className="relative p-8 sm:p-10 backdrop-blur-xl border rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group"
                                style={{
                                    backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                                    borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3
                                    className="text-3xl font-bold mb-4"
                                    style={{ color: themeData?.colors?.textPrimary || '#C1E1D7' }}
                                >
                                    MEV Protection
                                </h3>
                                <p
                                    className="text-lg leading-relaxed mb-6"
                                    style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                                >
                                    Our advanced transaction bundling and ordering mechanisms protect users from malicious Maximal Extractable Value (MEV) attacks, ensuring fair and secure transactions.
                                </p>
                                <div
                                    className="relative h-64 w-full rounded-xl overflow-hidden border"
                                    style={{
                                        backgroundColor: `${themeData?.colors?.primaryBackground || '#0A1F1A'}80`,
                                        borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                    }}
                                >
                                    <MEVProtectionVisual />
                                </div>
                            </motion.div>

                            <motion.div
                                className="relative p-8 sm:p-10 backdrop-blur-xl border rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group"
                                style={{
                                    backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                                    borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3
                                    className="text-3xl font-bold mb-4"
                                    style={{ color: themeData?.colors?.textPrimary || '#C1E1D7' }}
                                >
                                    Cross-Chain Interoperability
                                </h3>
                                <p
                                    className="text-lg leading-relaxed mb-6"
                                    style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                                >
                                    Seamlessly interact with assets and applications across multiple blockchain networks, breaking down silos and fostering a truly interconnected crypto ecosystem.
                                </p>
                                <div
                                    className="relative h-64 w-full rounded-xl overflow-hidden border flex items-center justify-center"
                                    style={{
                                        backgroundColor: `${themeData?.colors?.primaryBackground || '#0A1F1A'}80`,
                                        borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                    }}
                                >
                                    <CrossChainIcon size={96} style={{ color: `${themeData?.colors?.accentPrimary || '#6EC7BB'}80` }} />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Contact Us Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Contact Us
                            </h2>
                            <p
                                className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium drop-shadow-sm"
                                style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                            >
                                We're here to help and connect
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative p-8 sm:p-10 backdrop-blur-xl border rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full cursor-pointer shadow-lg"
                                    style={{
                                        backgroundColor: `${themeData?.colors?.secondaryBackground || '#0F2B24'}CC`,
                                        borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                    }}
                                    onClick={() => handleContactClick(method.action)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div
                                        className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-3xl backdrop-blur-sm border"
                                        style={{
                                            background: `linear-gradient(135deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}20, ${themeData?.colors?.accentSecondary || '#3dbba9'}20)`,
                                            borderColor: themeData?.colors?.borderColor || 'rgba(110, 199, 187, 0.3)',
                                        }}
                                    >
                                        {method.icon}
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-6 text-center"
                                        style={{ color: themeData?.colors?.textPrimary || '#C1E1D7' }}
                                    >
                                        {method.title}
                                    </h3>
                                    <p
                                        className="text-center leading-relaxed text-lg mb-4"
                                        style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                                    >
                                        {method.description}
                                    </p>
                                    <div className="text-center">
                                        <span
                                            className="font-semibold text-lg hover:underline"
                                            style={{ color: themeData?.colors?.accentPrimary || '#6EC7BB' }}
                                        >
                                            {method.contact}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Business Inquiry Form Section */}
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="text-center mb-16 sm:mb-20 px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(90deg, ${themeData?.colors?.accentPrimary || '#6EC7BB'}, ${themeData?.colors?.accentSecondary || '#3dbba9'})`,
                                }}
                            >
                                Business Inquiries
                            </h2>
                            <p
                                className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium drop-shadow-sm"
                                style={{ color: themeData?.colors?.textSecondary || '#87C7B6' }}
                            >
                                Ready to partner with us? Let's discuss your business needs
                            </p>
                        </div>

                        <div className="flex justify-center items-center px-4">
                            <BusinessInquiryForm />
                        </div>
                    </section>
                </main>

                <EnhancedFooter />
            </div>
        </div>
    );
}
