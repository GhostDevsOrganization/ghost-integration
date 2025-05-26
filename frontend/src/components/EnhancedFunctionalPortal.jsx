import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, DollarSign, Bitcoin, Repeat, Send, Home, MessageCircle, Copy, Wallet } from 'lucide-react';
import TokenSwappingPage from './TokenSwappingPage';
import { connectKasware, disconnectKasware, signTransaction } from '../services/kaswareService';
import { isMobile } from '../utils/walletDetect';

// Transaction type constants
export const TxType = {
    SIGN_TX: 0,
    SEND_KASPA: 1,
    SIGN_KRC20_DEPLOY: 2,
    SIGN_KRC20_MINT: 3,
    SIGN_KRC20_TRANSFER: 4
};

// Custom SVG Icons for Payment Methods and Cryptocurrencies
const PaymentIcons = {
    Visa: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="15" x="0" y="4.5" rx="2" fill="#1A1F71" />
            <text x="12" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">VISA</text>
        </svg>
    ),
    Mastercard: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="9" cy="12" r="7" fill="#EB001B" />
            <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
        </svg>
    ),
    AmericanExpress: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="15" x="0" y="4.5" rx="2" fill="#006FCF" />
            <text x="12" y="13" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">AMEX</text>
        </svg>
    ),
    Venmo: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="24" height="15" x="0" y="4.5" rx="2" fill="#3D95CE" />
            <path d="M8 8h2l2 6h-2l-2-6z M14 8v6h2V8h-2z" fill="white" />
        </svg>
    ),
    CashApp: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#00D632" />
            <text x="12" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">$</text>
        </svg>
    ),
    PayPal: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.859.859 0 0 1 5.79 2h8.263c.734 0 1.434.155 2.029.428 1.295.595 2.016 1.787 1.816 3.401-.404 3.252-1.746 5.515-4.045 6.286-.664.223-1.315.33-1.97.33h-1.704a.859.859 0 0 0-.847.736l-.707 4.157z" fill="#003087" />
            <path d="M18.904 8.582c.466-2.981-.835-5.016-2.756-5.016H8.285a.859.859 0 0 0-.847.736L5.72 14.736a.641.641 0 0 0 .633.74h4.606a.859.859 0 0 0 .847-.736l.707-4.157h1.704c.655 0 1.306-.107 1.97-.33 2.299-.771 3.641-3.034 4.045-6.286.2-1.614-.521-2.806-1.816-3.401z" fill="#0070BA" />
        </svg>
    ),
    Bitcoin: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" fill="#F7931A" />
            <path d="M15.5 10.5c.3-.8-.5-1.2-1.3-1.5l.3-1.1-1-.2-.3 1.1c-.3-.1-.6-.1-.9-.2l.3-1.1-1-.2-.3 1.1c-.2 0-.5-.1-.7-.1v0l-1.4-.3-.3 1s.7.2.7.2c.4.1.5.3.4.5l-.4 1.6v0l-.6 2.3c0 .1-.1.2-.3.2 0 0-.7-.2-.7-.2l-.5 1.1 1.3.3c.2 0 .5.1.7.1l-.3 1.1 1 .2.3-1.1c.3.1.6.1.9.2l-.3 1.1 1 .2.3-1.1c1.3.2 2.3.1 2.7-1 .3-.9 0-1.4-.7-1.7.5-.1.9-.5 1-1.2zm-1.8 2.5c-.2 1-1.8.5-2.3.3l.4-1.6c.5.1 2.2.4 1.9 1.3zm.2-2.5c-.2.9-1.5.4-1.9.3l.4-1.4c.4.1 1.8.3 1.5 1.1z" fill="white" />
        </svg>
    ),
    Ethereum: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" fill="#627EEA" />
            <path d="M12 3v6.5l5.5 2.5L12 3z" fill="white" fillOpacity="0.6" />
            <path d="M12 3L6.5 12L12 9.5V3z" fill="white" />
            <path d="M12 16.5v4.5l5.5-7.5L12 16.5z" fill="white" fillOpacity="0.6" />
            <path d="M12 21v-4.5L6.5 13.5L12 21z" fill="white" />
            <path d="M12 15.5l5.5-3.5L12 9.5v6z" fill="white" fillOpacity="0.2" />
            <path d="M6.5 12L12 15.5V9.5L6.5 12z" fill="white" fillOpacity="0.6" />
        </svg>
    ),
    Solana: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" fill="#9945FF" />
            <path d="M6 8h10l-2-2H6v2zm0 4h12l-2 2H6v-2zm0 4h10l2-2H8l-2 2z" fill="white" />
        </svg>
    )
};

// Define orbiting icons with their 3D properties
const iconData = [
    { name: 'Visa', component: PaymentIcons.Visa, angle: 0, radius: 180, speed: 1, zOffset: 0, tilt: 15, orbitTilt: 0 },
    { name: 'Mastercard', component: PaymentIcons.Mastercard, angle: 40, radius: 200, speed: 0.8, zOffset: 50, tilt: -10, orbitTilt: 20 },
    { name: 'AmericanExpress', component: PaymentIcons.AmericanExpress, angle: 80, radius: 160, speed: 1.2, zOffset: -30, tilt: 20, orbitTilt: -15 },
    { name: 'Venmo', component: PaymentIcons.Venmo, angle: 120, radius: 220, speed: 0.9, zOffset: 80, tilt: -5, orbitTilt: 30 },
    { name: 'CashApp', component: PaymentIcons.CashApp, angle: 160, radius: 170, speed: 1.1, zOffset: -60, tilt: 25, orbitTilt: -25 },
    { name: 'PayPal', component: PaymentIcons.PayPal, angle: 200, radius: 190, speed: 0.7, zOffset: 40, tilt: -15, orbitTilt: 10 },
    { name: 'Bitcoin', component: PaymentIcons.Bitcoin, angle: 240, radius: 210, speed: 1.3, zOffset: -20, tilt: 10, orbitTilt: -35 },
    { name: 'Ethereum', component: PaymentIcons.Ethereum, angle: 280, radius: 180, speed: 0.6, zOffset: 70, tilt: -20, orbitTilt: 25 },
    { name: 'Solana', component: PaymentIcons.Solana, angle: 320, radius: 200, speed: 1.0, zOffset: -40, tilt: 30, orbitTilt: -10 }
];

/**
 * Enhanced Functional Portal with 3D visuals and Kasware wallet integration
 */
const EnhancedFunctionalPortal = () => {
    // Enhanced starfield state for controlled movement with teal/purple theme
    const STAR_COUNT = 150;
    const createStars = () =>
        Array.from({ length: STAR_COUNT }).map(() => ({
            size: Math.random() * 3 + 1,
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity: Math.random() * 0.3 + 0.1,
            color: Math.random() > 0.5 ? 'teal' : 'purple'
        }));
    const [stars, setStars] = useState(createStars);

    // Window and mouse position for responsive design and parallax
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Portal visual state
    const portalRef = useRef(null);
    const [portalSize, setPortalSize] = useState(300);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [orbitingIcons, setOrbitingIcons] = useState([]);
    const [suctionActive, setSuctionActive] = useState(false);
    const [suctionProgress, setSuctionProgress] = useState(0);
    const [portalActive, setPortalActive] = useState(false);

    // Portal UI state
    const [activeProtocol, setActiveProtocol] = useState(null);

    // Wallet state
    const [kaswareInstalled, setKaswareInstalled] = useState(false);
    const [connected, setConnected] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState({
        confirmed: 0,
        unconfirmed: 0,
        total: 0,
    });
    const [network, setNetwork] = useState("kaspa_mainnet");
    const [krc20Balances, setKrc20Balances] = useState([]);

    // Form states for various protocols (excluding privacy)
    const [recipientAddress, setRecipientAddress] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [deployTicker, setDeployTicker] = useState('');
    const [deploySupply, setDeploySupply] = useState(100000000);
    const [deployLimit, setDeployLimit] = useState(1000);
    const [mintTicker, setMintTicker] = useState('');
    const [transferTicker, setTransferTicker] = useState('');
    const [transferAmount, setTransferAmount] = useState(1);
    const [transferAddress, setTransferAddress] = useState('');

    // Loading states for actions
    const [isSendingKas, setIsSendingKas] = useState(false);
    const [isDeployingToken, setIsDeployingToken] = useState(false);
    const [isMintingToken, setIsMintingToken] = useState(false);
    const [isSendingToken, setIsSendingToken] = useState(false);

    // Protocol definitions for the portal UI (excluding privacy)
    const protocols = {
        swap: {
            name: "Swap",
            icon: <Repeat className="text-teal-200" />,
            description: "Token exchange protocol",
            position: { top: '30%', left: '75%' },
            color: "from-teal-400 to-purple-600"
        },
        send: {
            name: "Send",
            icon: <Send className="text-teal-200" />,
            description: "Send KAS or KRC-20 tokens",
            position: { top: '30%', left: '25%' },
            color: "from-teal-500 to-purple-500"
        },
        tokens: {
            name: "Tokens",
            icon: <CreditCard className="text-teal-200" />,
            description: "Manage KRC-20 tokens",
            position: { top: '70%', left: '50%' },
            color: "from-teal-600 to-purple-700"
        }
    };

    // Set portal size based on screen width
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            if (window.innerWidth <= 480) {
                setPortalSize(180);
            } else if (window.innerWidth <= 768) {
                setPortalSize(220);
            } else if (window.innerWidth <= 1024) {
                setPortalSize(260);
            } else {
                setPortalSize(300);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse movement tracking for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Initialize orbiting icons with 3D properties
    useEffect(() => {
        setOrbitingIcons(iconData.map(icon => ({
            ...icon,
            currentAngle: icon.angle,
            currentTilt: icon.tilt,
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: icon.zOffset,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            suctionStartTime: 0
        })));
    }, []);

    // Animate orbiting icons in 3D space
    useEffect(() => {
        if (suctionActive) return;

        const interval = setInterval(() => {
            setOrbitingIcons(prev => prev.map(icon => ({
                ...icon,
                currentAngle: (icon.currentAngle + icon.speed) % 360,
                currentTilt: icon.tilt + Math.sin(Date.now() * 0.001 + icon.angle) * 5, // Subtle tilt oscillation
                rotationY: (icon.rotationY + icon.speed * 2) % 360 // Icon self-rotation
            })));
        }, 50);

        return () => clearInterval(interval);
    }, [suctionActive]);

    // Check for Kasware installation
    useEffect(() => {
        const checkKasware = () => {
            setKaswareInstalled(!!window.kasware);
        };

        checkKasware();
        // Check again after a delay in case the extension loads slowly
        setTimeout(checkKasware, 1000);
    }, []);

    // Handle protocol selection
    const handleProtocolClick = (key) => {
        if (key === 'swap') {
            window.location.href = '/swap';
            return;
        }
        setActiveProtocol(activeProtocol === key ? null : key);
    };

    // Connect to wallet
    const connectWallet = async () => {
        try {
            if (window.kasware) {
                const accounts = await window.kasware.requestAccounts();
                setAccounts(accounts);
                setConnected(true);
                setAddress(accounts[0]);

                const balance = await window.kasware.getBalance();
                setBalance(balance);

                const krc20Balances = await window.kasware.getKRC20Balance();
                setKrc20Balances(krc20Balances);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    // Disconnect from wallet
    const disconnectWallet = async () => {
        try {
            setConnected(false);
            setAccounts([]);
            setAddress("");
            setBalance({ confirmed: 0, unconfirmed: 0, total: 0 });
            setKrc20Balances([]);
        } catch (error) {
            console.error("Error disconnecting from wallet:", error);
        }
    };

    // Handle spectacular 3D suction effect when entering portal
    const handlePortalClick = () => {
        setSuctionActive(true);
        setSuctionProgress(0);

        // Stagger the suction start times for dramatic effect
        setOrbitingIcons(prev => prev.map((icon, index) => ({
            ...icon,
            suctionStartTime: Date.now() + (index * 100) // Stagger by 100ms each
        })));

        // Animate the suction progress
        const suctionInterval = setInterval(() => {
            setSuctionProgress(prev => {
                const newProgress = prev + 0.02;
                if (newProgress >= 1) {
                    clearInterval(suctionInterval);
                    setTimeout(() => setPortalActive(true), 500);
                    return 1;
                }
                return newProgress;
            });
        }, 16); // 60fps

        // Update icon positions during suction
        const iconInterval = setInterval(() => {
            setOrbitingIcons(prev => prev.map(icon => {
                const timeSinceStart = Date.now() - icon.suctionStartTime;
                if (timeSinceStart < 0) return icon; // Not started yet

                const progress = Math.min(timeSinceStart / 1500, 1); // 1.5 second suction per icon
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

                // Calculate spiral path to center
                const spiralAngle = icon.currentAngle + (progress * 720); // 2 full rotations during suction
                const spiralRadius = icon.radius * (1 - easeProgress);
                const spiralZ = icon.zOffset * (1 - easeProgress);

                return {
                    ...icon,
                    x: Math.cos(spiralAngle * Math.PI / 180) * spiralRadius,
                    y: Math.sin(spiralAngle * Math.PI / 180) * spiralRadius,
                    z: spiralZ,
                    scale: 1 - (easeProgress * 0.9), // Shrink to 10% of original size
                    opacity: 1 - (easeProgress * 0.8), // Fade to 20% opacity
                    rotationX: progress * 360 * 2, // Tumble during suction
                    rotationY: progress * 360 * 3,
                    rotationZ: progress * 360
                };
            }));
        }, 16);

        // Clean up intervals
        setTimeout(() => {
            clearInterval(iconInterval);
        }, 2000);
    };

    // Add touch event support
    useEffect(() => {
        const portalElement = portalRef.current;
        if (!portalElement) return;

        const handleTouchStart = () => setIsTouched(true);
        const handleTouchEnd = () => {
            setTimeout(() => setIsTouched(false), 300);
        };

        portalElement.addEventListener('touchstart', handleTouchStart);
        portalElement.addEventListener('touchend', handleTouchEnd);

        return () => {
            portalElement.removeEventListener('touchstart', handleTouchStart);
            portalElement.removeEventListener('touchend', handleTouchEnd);
        };
    }, [portalRef.current]);

    // Calculate appropriate movement amount based on screen size
    const getParallaxAmount = () => {
        if (windowSize.width <= 768) {
            return 4;
        }
        return 15;
    };

    // Calculate portal styles with parallax effect and 3D perspective
    const getPortalStyles = () => {
        const parallaxAmount = getParallaxAmount();
        let translateX = 0;
        let translateY = 0;

        if (windowSize.width > 768) {
            translateX = mousePosition.x * parallaxAmount;
            translateY = mousePosition.y * parallaxAmount;
        }

        return {
            width: `${portalSize}px`,
            height: `${portalSize}px`,
            transform: `translate(${translateX}px, ${translateY}px)`,
            perspective: '1000px',
            transformStyle: 'preserve-3d'
        };
    };

    // Calculate 3D icon position and transforms
    const get3DIconPosition = (icon) => {
        const adjustedRadius = icon.radius * (portalSize / 300);
        const radian = (icon.currentAngle * Math.PI) / 180;
        const tiltRadian = (icon.currentTilt * Math.PI) / 180;

        // Calculate 3D position
        const x = Math.cos(radian) * adjustedRadius;
        const y = Math.sin(radian) * adjustedRadius * Math.cos(tiltRadian);
        const z = Math.sin(radian) * adjustedRadius * Math.sin(tiltRadian) + icon.z;

        // Calculate scale based on Z position (perspective effect)
        const perspectiveScale = 1 + (z / 500);
        const finalScale = Math.max(0.3, Math.min(1.5, perspectiveScale)) * icon.scale;

        // Calculate opacity based on Z position
        const depthOpacity = Math.max(0.3, 1 - Math.abs(z) / 200);

        return {
            x: suctionActive ? icon.x : x,
            y: suctionActive ? icon.y : y,
            z: suctionActive ? icon.z : z,
            scale: finalScale,
            opacity: icon.opacity * depthOpacity,
            transform: `
        translate3d(${suctionActive ? icon.x : x}px, ${suctionActive ? icon.y : y}px, ${suctionActive ? icon.z : z}px)
        scale(${finalScale})
        rotateX(${icon.rotationX}deg)
        rotateY(${icon.rotationY}deg)
        rotateZ(${icon.rotationZ}deg)
      `,
            transition: suctionActive ? 'none' : 'all 0.1s ease-out',
            filter: `
        drop-shadow(0 0 ${10 + Math.abs(z) / 10}px rgba(45, 212, 191, ${0.3 + Math.abs(z) / 500}))
        blur(${Math.abs(z) / 200}px)
      `
        };
    };

    const getAnimationDuration = () => {
        return windowSize.width <= 768 ? '3s' : '5s';
    };

    // Copy address to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    // Only show swap functionality on mobile
    if (isMobile()) {
        return (
            <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start pt-4">
                <TokenSwappingPage />
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Enhanced animated background with teal/purple theme */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]"
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
                    }}
                ></div>

                {/* Enhanced floating particles with teal/purple colors */}
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full ${star.color === 'teal' ? 'bg-teal-400/30' : 'bg-purple-400/30'} animate-float`}
                        style={{
                            width: star.size,
                            height: star.size,
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            opacity: star.opacity,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Top navigation bar with updated theme */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-[100]">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> Portal
                </div>
                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => window.open('https://t.me/+LJanxsRyV645OWUx', '_blank')}
                        className="flex items-center bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 rounded transition-colors"
                    >
                        <MessageCircle size={16} className="mr-1" />
                        Telegram
                    </button>
                </div>

                {connected ? (
                    <button
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                        onClick={disconnectWallet}
                    >
                        Disconnect Wallet
                    </button>
                ) : (
                    <button
                        className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>

            {/* Main portal interface */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                {/* 3D Orbiting Payment Icons */}
                {orbitingIcons.map((icon, index) => {
                    const position = get3DIconPosition(icon);
                    const IconComponent = icon.component;

                    return (
                        <div
                            key={icon.name}
                            className="absolute pointer-events-none z-10"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) ${position.transform}`,
                                opacity: position.opacity,
                                transition: position.transition,
                                filter: position.filter,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                                <IconComponent />
                                {/* 3D Glowing ring around icon */}
                                <div
                                    className="absolute inset-0 rounded-full border border-teal-400/30"
                                    style={{
                                        animation: `pulse 2s ease-in-out infinite`,
                                        animationDelay: `${index * 0.2}s`,
                                        transform: `rotateX(${icon.currentTilt}deg)`
                                    }}
                                ></div>
                                {/* Particle trail effect during suction */}
                                {suctionActive && (
                                    <div
                                        className="absolute inset-0 rounded-full bg-teal-400/20"
                                        style={{
                                            transform: `scale(${2 + suctionProgress})`,
                                            opacity: 1 - suctionProgress,
                                            filter: 'blur(2px)'
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Enhanced 3D Portal */}
                <div
                    ref={portalRef}
                    className="radar-portal relative cursor-pointer"
                    style={getPortalStyles()}
                    onClick={handlePortalClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* 3D Radar circles with depth */}
                    {[1, 2, 3, 4].map(index => (
                        <div
                            key={`circle-${index}`}
                            className="absolute top-1/2 left-1/2 border border-teal-400/30 rounded-full"
                            style={{
                                width: `${(portalSize * 0.8) * (index / 4)}px`,
                                height: `${(portalSize * 0.8) * (index / 4)}px`,
                                transform: `translate(-50%, -50%) rotateX(${index * 10}deg) rotateY(${index * 5}deg)`,
                                animation: `spin3D ${getAnimationDuration()} linear infinite ${index % 2 === 0 ? 'reverse' : ''}`,
                                opacity: portalActive ? 0.7 : 0.3,
                                transformStyle: 'preserve-3d'
                            }}
                        />
                    ))}

                    {/* Enhanced center glow with 3D depth */}
                    <div
                        className="absolute top-1/2 left-1/2 rounded-full bg-gradient-to-r from-teal-400/20 to-purple-400/20"
                        style={{
                            width: `${portalSize * 0.4}px`,
                            height: `${portalSize * 0.4}px`,
                            transform: 'translate(-50%, -50%)',
                            filter: `blur(${portalSize * 0.05}px)`,
                            animation: 'pulse3D 3s ease-in-out infinite',
                            opacity: portalActive || isHovered || isTouched ? 0.8 : 0.4,
                            transformStyle: 'preserve-3d'
                        }}
                    />

                    {/* Spectacular 3D suction vortex effect */}
                    {suctionActive && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            {/* Multiple vortex rings */}
                            {[1, 2, 3, 4, 5].map(ring => (
                                <div
                                    key={ring}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-400"
                                    style={{
                                        width: `${ring * 20}px`,
                                        height: `${ring * 20}px`,
                                        animation: `vortex ${0.5 + ring * 0.1}s linear infinite`,
                                        opacity: 1 - (ring * 0.15),
                                        transform: `translate(-50%, -50%) rotateX(${ring * 15}deg) scale(${1 + suctionProgress * ring})`
                                    }}
                                />
                            ))}
                            {/* Central energy core */}
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal-400 to-purple-500"
                                style={{
                                    width: `${16 + suctionProgress * 32}px`,
                                    height: `${16 + suctionProgress * 32}px`,
                                    animation: 'energyPulse 0.3s ease-in-out infinite',
                                    filter: `blur(${suctionProgress * 4}px)`
                                }}
                            />
                        </div>
                    )}

                    {/* Portal text with 3D effect */}
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium"
                        style={{
                            fontSize: windowSize.width <= 480 ? '14px' : '16px',
                            opacity: isHovered || isTouched ? 1 : 0.8,
                            transition: 'all 0.3s ease',
                            textShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
                            transform: suctionActive ? `scale(${1 + suctionProgress * 0.5}) rotateX(${suctionProgress * 10}deg)` : 'none'
                        }}
                    >
                        {suctionActive ? 'Entering Portal...' : 'Enter Portal'}
                    </div>

                    {/* Touch indicator for mobile */}
                    {windowSize.width <= 768 && !suctionActive && (
                        <div
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                            style={{ opacity: portalActive ? 0 : 0.6 }}
                        >
                            <div className="animate-ping absolute h-12 w-12 rounded-full bg-teal-400/20"></div>
                            <div className="relative text-xs text-teal-400 mt-16">Tap to Enter</div>
                        </div>
                    )}

                    {/* Loading indicator when active */}
                    {portalActive && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                            <div className="w-full h-full rounded-full border-2 border-teal-400/20 animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-teal-400 animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* Protocol nodes around the portal */}
                {Object.entries(protocols).map(([key, protocol]) => (
                    <React.Fragment key={key}>
                        {/* Energy beam connection line */}
                        <div
                            className="absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"
                            style={{
                                width: '180px',
                                transformOrigin: 'left center',
                                transform: `translateX(-50%) translateY(-50%) rotate(${Object.keys(protocols).indexOf(key) * 120}deg)`,
                                opacity: activeProtocol === key ? 0.9 : 0.6,
                                filter: activeProtocol === key ? 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.7))' : 'none'
                            }}
                        ></div>

                        {/* Protocol node */}
                        <div
                            id={`protocol-${key}`}
                            className="absolute group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-20"
                            style={{
                                ...protocol.position,
                                transform: 'translate(-50%, -50%)',
                                width: '80px',
                                height: 'auto'
                            }}
                            onClick={() => handleProtocolClick(key)}
                        >
                            {/* Icon container */}
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center
                                        bg-gradient-to-br ${protocol.color}
                                        border-2 ${activeProtocol === key ? 'border-teal-400 shadow-teal-500/60' : 'border-teal-600/50'}
                                        shadow-lg shadow-teal-900/50
                                        transition-all duration-300
                                        hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40
                                        ${activeProtocol === key ? 'scale-110 shadow-xl' : 'scale-100'}`}>
                                {protocol.icon}
                            </div>

                            {/* Label */}
                            <span className="text-teal-200 text-xs mt-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                {protocol.name}
                            </span>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Protocol panels */}
            {activeProtocol && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-6 w-96 z-50">
                    <h3 className="text-teal-400 text-lg font-bold mb-4">{protocols[activeProtocol].name}</h3>

                    {activeProtocol === 'send' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Recipient Address"
                                value={recipientAddress}
                                onChange={(e) => setRecipientAddress(e.target.value)}
                                className="w-full bg-gray-800 border border-teal-600/50 rounded px-3 py-2 text-white"
                            />
                            <input
                                type="number"
                                placeholder="Amount (KAS)"
                                value={sendAmount}
                                onChange={(e) => setSendAmount(e.target.value)}
                                className="w-full bg-gray-800 border border-teal-600/50 rounded px-3 py-2 text-white"
                            />
                            <button
                                className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white py-2 rounded transition-all"
                                disabled={isSendingKas}
                            >
                                {isSendingKas ? 'Sending...' : 'Send KAS'}
                            </button>
                        </div>
                    )}

                    {activeProtocol === 'tokens' && (
                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <p>Deploy, mint, or transfer KRC-20 tokens</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Token Ticker"
                                value={deployTicker}
                                onChange={(e) => setDeployTicker(e.target.value)}
                                className="w-full bg-gray-800 border border-teal-600/50 rounded px-3 py-2 text-white"
                            />
                            <button
                                className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white py-2 rounded transition-all"
                                disabled={isDeployingToken}
                            >
                                {isDeployingToken ? 'Deploying...' : 'Deploy Token'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Wallet info panel */}
            {connected && (
                <div className="absolute top-20 right-6 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 w-64 z-50">
                    <h3 className="text-teal-400 font-bold mb-2">Wallet</h3>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm">Address:</span>
                        <button
                            onClick={() => copyToClipboard(address)}
                            className="flex items-center text-teal-400 hover:text-teal-300 text-sm"
                        >
                            {address.slice(0, 8)}...{address.slice(-8)}
                            <Copy size={12} className="ml-1" />
                        </button>
                    </div>
                    <p className="text-white text-sm">Balance: {(balance.total / 100000000).toFixed(4)} KAS</p>
                </div>
            )}

            {/* CSS animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes spin3D {
                    from { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    to { transform: translate(-50%, -50%) rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
                }
                @keyframes pulse3D {
                    0%, 100% { 
                        opacity: 0.4; 
                        transform: translate(-50%, -50%) scale(1) rotateX(0deg); 
                    }
                    50% { 
                        opacity: 0.8; 
                        transform: translate(-50%, -50%) scale(1.1) rotateX(10deg); 
                    }
                }
                @keyframes vortex {
                    0% { 
                        transform: translate(-50%, -50%) rotateZ(0deg) scale(1);
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotateZ(360deg) scale(0.1);
                        opacity: 0;
                    }
                }
                @keyframes energyPulse {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1);
                        filter: brightness(1);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.2);
                        filter: brightness(1.5);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .radar-portal * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .radar-portal {
                        perspective: 500px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default EnhancedFunctionalPortal;
