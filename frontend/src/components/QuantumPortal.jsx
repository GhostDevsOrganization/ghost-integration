import { useState, useEffect, useRef } from 'react';
import { CreditCard, DollarSign, Bitcoin } from 'lucide-react';

// Enhanced Payment Icons with Quantum Effects
const PaymentIcons = {
    Bitcoin: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl">
                <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-xl" />
            </div>
            <svg viewBox="0 0 24 24" className="relative w-full h-full p-2 text-white drop-shadow-lg">
                <path fill="currentColor" d="M11.5 11.5v-2c1.4-.2 2.5-.9 2.5-2.5 0-1.4-1.1-2.5-2.5-2.5v-.5h-1v.5c-1.4 0-2.5 1.1-2.5 2.5h1.5c0-.6.4-1 1-1v2c-1.4.2-2.5 1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5v.5h1v-.5c1.4 0 2.5-1.1 2.5-2.5h-1.5c0 .6-.4 1-1 1zm-1-5c.6 0 1 .4 1 1s-.4 1-1 1v-2zm0 3.5v2c-.6 0-1-.4-1-1s.4-1 1-1z" />
                <text x="12" y="16" textAnchor="middle" fontSize="4" fontWeight="bold">BTC</text>
            </svg>
        </div>
    ),
    Ethereum: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-2xl">
                <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-xl" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-5 h-7 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white/90" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-white/60" />
                </div>
            </div>
            <text x="12" y="20" textAnchor="middle" fontSize="3" fontWeight="bold" fill="white" className="absolute bottom-1 left-1/2 -translate-x-1/2">ETH</text>
        </div>
    ),
    Solana: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-600 to-pink-600 rounded-full shadow-2xl">
                <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-xl" />
            </div>
            <svg viewBox="0 0 24 24" className="relative w-full h-full p-3 text-white">
                <path fill="currentColor" d="M7 7h10l-2-2H7v2zm0 4h12l-2 2H7v-2zm0 4h10l2-2H9l-2 2z" />
                <text x="12" y="20" textAnchor="middle" fontSize="3" fontWeight="bold">SOL</text>
            </svg>
        </div>
    ),
    Visa: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl transform rotate-3">
                <div className="absolute inset-0 bg-blue-400/30 rounded-lg blur-xl" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
                <span className="text-white font-bold text-xs drop-shadow-lg">VISA</span>
            </div>
        </div>
    ),
    Mastercard: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl transform -rotate-3">
                <div className="absolute inset-0 bg-gray-600/30 rounded-lg blur-xl" />
            </div>
            <svg viewBox="0 0 24 24" className="relative w-full h-full p-2">
                <circle cx="9" cy="12" r="5" fill="#EB001B" />
                <circle cx="15" cy="12" r="5" fill="#F79E1B" fillOpacity="0.9" />
            </svg>
        </div>
    ),
    ApplePay: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl transform rotate-1">
                <div className="absolute inset-0 bg-gray-700/30 rounded-lg blur-xl" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍎</span>
            </div>
        </div>
    ),
    CashApp: ({ size = 40, glow = false }) => (
        <div className={`relative ${glow ? 'animate-pulse' : ''}`} style={{ width: size, height: size }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-2xl transform -rotate-2">
                <div className="absolute inset-0 bg-green-400/30 rounded-lg blur-xl" />
            </div>
            <DollarSign className="relative w-full h-full p-1 text-white" strokeWidth={3} />
        </div>
    )
};

// Floating icon data with orbital properties - all payment methods
const floatingIconsData = [
    { name: 'Bitcoin', component: PaymentIcons.Bitcoin, color: '#F7931A', orbit: { radius: 180, speed: 0.8, phase: 0 } },
    { name: 'Ethereum', component: PaymentIcons.Ethereum, color: '#627EEA', orbit: { radius: 200, speed: 0.6, phase: 45 } },
    { name: 'Solana', component: PaymentIcons.Solana, color: '#9945FF', orbit: { radius: 160, speed: 1.0, phase: 90 } },
    { name: 'Visa', component: PaymentIcons.Visa, color: '#1A1F71', orbit: { radius: 220, speed: 0.7, phase: 135 } },
    { name: 'Mastercard', component: PaymentIcons.Mastercard, color: '#EB001B', orbit: { radius: 190, speed: 0.9, phase: 180 } },
    { name: 'ApplePay', component: PaymentIcons.ApplePay, color: '#000000', orbit: { radius: 210, speed: 0.5, phase: 225 } },
    { name: 'CashApp', component: PaymentIcons.CashApp, color: '#00D632', orbit: { radius: 170, speed: 1.1, phase: 270 } }
];

export default function QuantumPortal({ onEnterPortal = () => { }, isActive = false, mousePosition = { x: 0, y: 0 } }) {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });
    const portalRef = useRef(null);
    const [portalSize, setPortalSize] = useState(350);
    const [isHovered, setIsHovered] = useState(false);
    const [floatingIcons, setFloatingIcons] = useState([]);
    const [suctionActive, setSuctionActive] = useState(false);
    const [suctionProgress, setSuctionProgress] = useState(0);

    // Responsive portal sizing
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            if (window.innerWidth <= 480) {
                setPortalSize(200);
            } else if (window.innerWidth <= 768) {
                setPortalSize(250);
            } else if (window.innerWidth <= 1024) {
                setPortalSize(300);
            } else {
                setPortalSize(350);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize floating payment icons
    useEffect(() => {
        const icons = floatingIconsData.map((icon, index) => ({
            ...icon,
            id: index,
            angle: icon.orbit.phase,
            x: 0,
            y: 0,
            z: (Math.random() - 0.5) * 100,
            scale: 1,
            opacity: 1,
            rotation: 0,
            glowing: false
        }));
        setFloatingIcons(icons);
    }, []);

    // Update floating icons positions
    useEffect(() => {
        if (suctionActive) return;

        const interval = setInterval(() => {
            setFloatingIcons(prev => prev.map(icon => {
                const newAngle = (icon.angle + icon.orbit.speed) % 360;
                const radian = (newAngle * Math.PI) / 180;
                const x = Math.cos(radian) * icon.orbit.radius;
                const y = Math.sin(radian) * icon.orbit.radius;
                const z = Math.sin(newAngle * 2 * Math.PI / 180) * 30;

                return {
                    ...icon,
                    angle: newAngle,
                    x,
                    y,
                    z,
                    rotation: (icon.rotation + icon.orbit.speed * 2) % 360,
                    scale: 1 + Math.sin(newAngle * Math.PI / 180) * 0.2,
                    glowing: Math.random() > 0.95
                };
            }));
        }, 16);

        return () => clearInterval(interval);
    }, [suctionActive]);

    // Enhanced 3D positioning
    const get3DIconPosition = (icon) => {
        const adjustedRadius = icon.orbit.radius * (portalSize / 350);
        const radian = (icon.angle * Math.PI) / 180;
        const x = Math.cos(radian) * adjustedRadius;
        const y = Math.sin(radian) * adjustedRadius;
        const z = icon.z;

        const perspectiveScale = 1 + (z / 400);
        const finalScale = Math.max(0.5, Math.min(1.3, perspectiveScale)) * icon.scale;
        const depthOpacity = Math.max(0.4, 1 - Math.abs(z) / 300);

        return {
            x: suctionActive ? icon.x : x,
            y: suctionActive ? icon.y : y,
            z: suctionActive ? icon.z : z,
            scale: finalScale,
            opacity: icon.opacity * depthOpacity,
            transform: `
        translate3d(${suctionActive ? icon.x : x}px, ${suctionActive ? icon.y : y}px, ${suctionActive ? icon.z : z}px)
        scale(${finalScale})
        rotate(${icon.rotation}deg)
      `,
            transition: suctionActive ? 'none' : 'all 0.05s linear',
            filter: `drop-shadow(0 0 ${icon.glowing ? 20 : 10}px ${icon.color})`,
            zIndex: Math.floor(1000 + z)
        };
    };

    // Clean portal activation
    const handlePortalClick = () => {
        setSuctionActive(true);
        setSuctionProgress(0);

        // Smooth animation timeline
        let startTime = Date.now();
        const duration = 1500; // 1.5 seconds

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setSuctionProgress(easeProgress);

            setFloatingIcons(prev => prev.map((icon, index) => {
                // Staggered animation for each icon
                const iconDelay = index * 0.05;
                const iconProgress = Math.max(0, Math.min(1, (progress - iconDelay) / (1 - iconDelay)));
                const iconEase = 1 - Math.pow(1 - iconProgress, 2);

                // Simple spiral into center
                const currentRadius = icon.orbit.radius * (1 - iconEase);
                const spiralAngle = icon.angle + (iconEase * 360);
                const radian = (spiralAngle * Math.PI) / 180;

                return {
                    ...icon,
                    x: Math.cos(radian) * currentRadius,
                    y: Math.sin(radian) * currentRadius,
                    z: icon.z * (1 - iconEase),
                    scale: 1 - (iconEase * 0.8),
                    opacity: 1 - (iconEase * 0.7),
                    rotation: icon.angle + (iconEase * 180)
                };
            }));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => onEnterPortal(), 200);
            }
        };

        requestAnimationFrame(animate);
    };

    const getPortalStyles = () => {
        const parallaxAmount = windowSize.width > 768 ? 20 : 5;
        const translateX = windowSize.width > 768 ? mousePosition.x * parallaxAmount : 0;
        const translateY = windowSize.width > 768 ? mousePosition.y * parallaxAmount : 0;

        return {
            width: `${portalSize}px`,
            height: `${portalSize}px`,
            transform: `translate(${translateX}px, ${translateY}px)`,
            perspective: '1200px',
            transformStyle: 'preserve-3d'
        };
    };

    return (
        <div className="relative flex items-center justify-center">
            <div className="relative" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
                {/* 3D Orbiting Icons */}
                {floatingIcons.map((icon) => {
                    const position = get3DIconPosition(icon);
                    const IconComponent = icon.component;

                    return (
                        <div
                            key={icon.name}
                            className="absolute pointer-events-none"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) ${position.transform}`,
                                opacity: position.opacity,
                                transition: position.transition,
                                filter: position.filter,
                                transformStyle: 'preserve-3d',
                                zIndex: position.zIndex
                            }}
                        >
                            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                                <IconComponent size={40} glow={icon.glowing} />
                                {/* Dynamic energy ring */}
                                <div
                                    className="absolute -inset-2 rounded-full"
                                    style={{
                                        background: `radial-gradient(circle, ${icon.color}40 0%, transparent 70%)`,
                                        animation: `energyPulse ${2 + icon.id * 0.3}s ease-in-out infinite`,
                                        animationDelay: `${icon.id * 0.1}s`,
                                        opacity: 0.6
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}

                {/* Main Portal */}
                <div
                    ref={portalRef}
                    className="relative cursor-pointer group"
                    style={getPortalStyles()}
                    onClick={handlePortalClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Portal base with gradient */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(20, 184, 166, 0.3) 50%, transparent 70%)',
                            animation: 'portalPulse 4s ease-in-out infinite',
                            filter: 'blur(30px)'
                        }}
                    />

                    {/* 3D Radar rings */}
                    {[1, 2, 3, 4, 5].map(index => (
                        <div
                            key={`ring-${index}`}
                            className="absolute top-1/2 left-1/2 border-2 rounded-full"
                            style={{
                                width: `${(portalSize * 0.9) * (index / 5)}px`,
                                height: `${(portalSize * 0.9) * (index / 5)}px`,
                                borderColor: `rgba(168, 85, 247, ${0.6 - index * 0.1})`,
                                transform: `translate(-50%, -50%) rotateX(${index * 15}deg) rotateY(${index * 10}deg)`,
                                animation: `ringRotate ${5 + index}s linear infinite ${index % 2 === 0 ? 'reverse' : ''}`,
                                boxShadow: `0 0 ${20 - index * 2}px rgba(168, 85, 247, 0.4)`,
                                transformStyle: 'preserve-3d'
                            }}
                        />
                    ))}

                    {/* Energy core */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="w-24 h-24 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(168, 85, 247, 0.6) 40%, transparent 70%)',
                                filter: 'blur(10px)',
                                animation: 'energyCore 2s ease-in-out infinite',
                                transform: `scale(${isHovered ? 1.3 : 1})`
                            }}
                        />
                    </div>

                    {/* Clean suction effect */}
                    {suctionActive && (
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Simple expanding ring */}
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400"
                                style={{
                                    width: `${portalSize * 0.8}px`,
                                    height: `${portalSize * 0.8}px`,
                                    opacity: 1 - suctionProgress,
                                    transform: `translate(-50%, -50%) scale(${1 + suctionProgress * 0.5})`
                                }}
                            />
                            {/* Center focus point */}
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    opacity: suctionProgress * 0.8,
                                    boxShadow: `0 0 ${20 + suctionProgress * 30}px rgba(255, 255, 255, 0.8)`
                                }}
                            />
                        </div>
                    )}

                    {/* Portal text */}
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center pointer-events-none"
                        style={{
                            fontSize: windowSize.width <= 480 ? '16px' : '20px',
                            textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.5)',
                            opacity: suctionActive ? 1 - suctionProgress : (isHovered ? 1 : 0.8),
                            transform: suctionActive ? `scale(${1 - suctionProgress * 0.5})` : 'scale(1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {suctionActive ? 'ENTERING...' : 'ENTER PORTAL'}
                    </div>

                    {/* Mobile tap indicator */}
                    {windowSize.width <= 768 && !suctionActive && !isActive && (
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-purple-300 text-sm animate-bounce">
                            Tap to Enter
                        </div>
                    )}
                </div>

                {/* Enhanced styles */}
                <style>{`
          @keyframes ringRotate {
            from { transform: translate(-50%, -50%) rotateX(var(--rx, 0deg)) rotateY(0deg) rotateZ(0deg); }
            to { transform: translate(-50%, -50%) rotateX(var(--rx, 0deg)) rotateY(360deg) rotateZ(360deg); }
          }

          @keyframes portalPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }

          @keyframes energyCore {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(180deg); }
          }

          @keyframes energyPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 0.3; }
          }

          @keyframes vortexSpin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
            </div>
        </div>
    );
}
