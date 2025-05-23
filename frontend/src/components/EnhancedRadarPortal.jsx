import { useState, useEffect, useRef } from 'react';
import { CreditCard, DollarSign, Bitcoin } from 'lucide-react';

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
 * Enhanced 3D RadarPortal Component with Spectacular Suction Effect
 */
export const EnhancedRadarPortal = ({ onEnterPortal, isActive, mousePosition }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const portalRef = useRef(null);
  const [portalSize, setPortalSize] = useState(300);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [orbitingIcons, setOrbitingIcons] = useState([]);
  const [suctionActive, setSuctionActive] = useState(false);
  const [suctionProgress, setSuctionProgress] = useState(0);

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

  // Handle spectacular 3D suction effect
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
          setTimeout(() => onEnterPortal(), 500);
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

  return (
    <div className="relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
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
              opacity: isActive ? 0.7 : 0.3,
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
            opacity: isActive || isHovered || isTouched ? 0.8 : 0.4,
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
            style={{ opacity: isActive ? 0 : 0.6 }}
          >
            <div className="animate-ping absolute h-12 w-12 rounded-full bg-teal-400/20"></div>
            <div className="relative text-xs text-teal-400 mt-16">Tap to Enter</div>
          </div>
        )}

        {/* Loading indicator when active */}
        {isActive && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
            <div className="w-full h-full rounded-full border-2 border-teal-400/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-teal-400 animate-spin"></div>
          </div>
        )}

        {/* Enhanced CSS for 3D animations */}
        <style>{`
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

          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
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
    </div>
  );
};

export default EnhancedRadarPortal;
