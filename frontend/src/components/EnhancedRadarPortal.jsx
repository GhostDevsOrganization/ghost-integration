import { useState, useEffect, useRef } from 'react';

/**
 * Enhanced RadarPortal Component
 *
 * This component builds on your existing RadarPortal with improved mobile compatibility
 * and responsive design features.
 */
export const EnhancedRadarPortal = ({ onEnterPortal, isActive, mousePosition }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const portalRef = useRef(null);
  const [portalSize, setPortalSize] = useState(300); // Default size
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Set portal size based on screen width
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      // Adjust portal size based on screen width
      if (window.innerWidth <= 480) {
        setPortalSize(180); // Smaller for phones
      } else if (window.innerWidth <= 768) {
        setPortalSize(220); // Medium for tablets
      } else if (window.innerWidth <= 1024) {
        setPortalSize(260); // Larger for small laptops
      } else {
        setPortalSize(300); // Full size for desktops
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add touch event support
  useEffect(() => {
    const portalElement = portalRef.current;
    if (!portalElement) return;

    const handleTouchStart = () => setIsTouched(true);
    const handleTouchEnd = () => {
      // Delay to allow for tap detection
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
      return 4; // Reduced movement on mobile
    }
    return 15; // Full movement on desktop
  };

  // Calculate portal styles with parallax effect
  const getPortalStyles = () => {
    const parallaxAmount = getParallaxAmount();
    let translateX = 0;
    let translateY = 0;

    // Only apply parallax on non-touch devices or larger screens
    if (windowSize.width > 768) {
      translateX = mousePosition.x * parallaxAmount;
      translateY = mousePosition.y * parallaxAmount;
    }

    return {
      width: `${portalSize}px`,
      height: `${portalSize}px`,
      transform: `translate(${translateX}px, ${translateY}px)`,
    };
  };

  // Reduced animations for small screens
  const getAnimationDuration = () => {
    return windowSize.width <= 768 ? '3s' : '5s';
  };

  return (
    <div
      ref={portalRef}
      className="radar-portal relative"
      style={getPortalStyles()}
      onClick={onEnterPortal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Radar circles */}
      {[1, 2, 3, 4].map(index => (
        <div
          key={`circle-${index}`}
          className="absolute top-1/2 left-1/2 border border-green-400/30 rounded-full"
          style={{
            width: `${(portalSize * 0.8) * (index / 4)}px`,
            height: `${(portalSize * 0.8) * (index / 4)}px`,
            transform: 'translate(-50%, -50%)',
            animation: `spin ${getAnimationDuration()} linear infinite ${index % 2 === 0 ? 'reverse' : ''}`,
            opacity: isActive ? 0.7 : 0.3
          }}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full bg-green-400/20"
        style={{
          width: `${portalSize * 0.4}px`,
          height: `${portalSize * 0.4}px`,
          transform: 'translate(-50%, -50%)',
          filter: `blur(${portalSize * 0.05}px)`,
          animation: 'pulse 3s ease-in-out infinite',
          opacity: isActive || isHovered || isTouched ? 0.8 : 0.4
        }}
      />

      {/* Portal text */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium"
        style={{
          fontSize: windowSize.width <= 480 ? '14px' : '16px',
          opacity: isHovered || isTouched ? 1 : 0.8,
          transition: 'all 0.3s ease'
        }}
      >
        Enter Portal
      </div>

      {/* Touch indicator for mobile - only shows on smaller screens */}
      {windowSize.width <= 768 && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ opacity: isActive ? 0 : 0.6 }}
        >
          <div className="animate-ping absolute h-12 w-12 rounded-full bg-green-400/20"></div>
          <div className="relative text-xs text-green-400 mt-16">Tap to Enter</div>
        </div>
      )}

      {/* Optional loading indicator when active */}
      {isActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          <div className="w-full h-full rounded-full border-2 border-green-400/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-green-400 animate-spin"></div>
        </div>
      )}

      {/* Added CSS for animations */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default EnhancedRadarPortal;
