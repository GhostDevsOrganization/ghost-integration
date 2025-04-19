import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PortalComponent = () => {
  const portalRef = useRef(null);
  const [portalActive, setPortalActive] = useState(false);
  const [portalPulse, setPortalPulse] = useState(false);
  const [portalIntensity, setPortalIntensity] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const pulseTiming = setInterval(() => {
      setPortalPulse(prev => !prev);
    }, 5000);

    return () => {
      clearInterval(pulseTiming);
    };
  }, []);

  useEffect(() => {
    if (portalActive) {
      let intensity = 0;
      const intensityInterval = setInterval(() => {
        intensity += 0.05;
        setPortalIntensity(intensity);
        if (intensity >= 1) {
          clearInterval(intensityInterval);
        }
      }, 100);
      return () => clearInterval(intensityInterval);
    } else {
      setPortalIntensity(0);
    }
  }, [portalActive]);

  const handleEnterPortal = () => {
    if (portalRef.current) {
      setPortalActive(true);
      setTimeout(() => {
        navigate('/portal');
      }, 2000);
    } else {
      navigate('/portal');
    }
  };

  const getParallaxStyle = (factor = 1) => {
    return {
      transform: `translate(${mousePosition.x * 20 * factor}px, ${mousePosition.y * 20 * factor}px)`
    };
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${portalActive ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: 'opacity 1s ease-in-out',
          perspective: '1000px',
          zIndex: 0
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div 
            key={`ripple-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full border border-green-400/30"
            style={{
              height: `${(i+1) * 25}vh`,
              width: `${(i+1) * 25}vh`,
              transform: 'translate(-50%, -50%)',
              opacity: portalActive ? (0.4 - i * 0.05) : 0,
              animation: `rippleEffect ${5 + i}s linear infinite`,
              transitionDelay: `${i * 0.2}s`,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`fractal-${i}`}
            className="absolute opacity-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}vh`,
              height: `${Math.random() * 10 + 5}vh`,
              background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
              borderRadius: '50%',
              filter: 'blur(8px)',
              opacity: portalActive ? (Math.random() * 0.5 + 0.1) : 0,
              animation: `floatFractals ${Math.random() * 10 + 15}s ease-in-out infinite`,
              transition: 'opacity 1s ease-in-out',
              transitionDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div 
        ref={portalRef}
        className={`relative w-64 h-64 md:w-96 md:h-96 mb-12 z-10
                    ${portalActive ? 'scale-150' : (portalPulse ? 'scale-105' : 'scale-100')}`}
        style={{
          transition: portalActive ? 
            'all 2s cubic-bezier(0.2, 0.8, 0.2, 1)' : 
            'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...getParallaxStyle(0.2),
          opacity: portalActive ? 1 : 0.8,
          filter: portalActive ? `blur(${portalIntensity * 2}px) brightness(${1 + portalIntensity * 0.5})` : 'none',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute top-1/2 left-1/2 rounded-full ${i % 2 === 0 ? 'border-2' : 'border'} border-green-400/30`}
            style={{
              height: `${(i + 1) * 12}%`,
              width: `${(i + 1) * 12}%`,
              transform: 'translate(-50%, -50%)',
              animation: `${i % 2 === 0 ? 'spinCW' : 'spinCCW'} ${10 + i * 4}s linear infinite`,
              opacity: portalActive ? 
                (1 - i * 0.05) * (1 + portalIntensity * 0.5) : 
                (0.3 + i * 0.08) * (portalPulse ? 1.2 : 1),
              boxShadow: portalActive ? 
                `0 0 ${10 + portalIntensity * 15}px ${portalIntensity * 8}px rgba(74, 222, 128, ${0.1 + portalIntensity * 0.2})` : 
                'none',
              transition: 'opacity 0.5s ease-out, box-shadow 1s ease-in-out',
            }}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`middle-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full border border-green-400/40"
            style={{
              height: `${50 + i * 5}%`,
              width: `${50 + i * 5}%`,
              transform: 'translate(-50%, -50%) rotate(45deg)',
              animation: `spinFluctuate ${15 + i * 3}s cubic-bezier(0.3, 0, 0.7, 1) infinite`,
              opacity: portalActive ? 
                (0.6 + portalIntensity * 0.4) : 
                (0.4 * (portalPulse ? 1.3 : 1)),
              borderWidth: portalActive ? '2px' : '1px',
              transition: 'opacity 0.8s ease-out, border-width 0.5s ease-in-out',
            }}
          />
        ))}
        <div 
          className="absolute top-1/2 left-1/2 rounded-full bg-green-400"
          style={{
            height: portalActive ? '70%' : (portalPulse ? '28%' : '25%'),
            width: portalActive ? '70%' : (portalPulse ? '28%' : '25%'),
            transform: 'translate(-50%, -50%)',
            boxShadow: portalActive ? 
              `0 0 ${30 + portalIntensity * 30}px ${20 + portalIntensity * 20}px rgba(74, 222, 128, ${0.6 + portalIntensity * 0.4})` : 
              (portalPulse ? 
                '0 0 30px 15px rgba(74, 222, 128, 0.5)' : 
                '0 0 25px 12px rgba(74, 222, 128, 0.4)'),
            animation: portalActive ? 'pulseRapid 1s ease-in-out infinite' : 'pulse 3s ease-in-out infinite',
            transition: 'height 1.2s ease-out, width 1.2s ease-out, box-shadow 1s ease-in-out',
          }}
        />
        {portalActive && [...Array(8)].map((_, i) => (
          <div 
            key={`beam-${i}`}
            className="absolute top-1/2 left-1/2 bg-green-300"
            style={{
              height: '2px',
              width: `${50 + (i * 15)}%`,
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              opacity: 0.6 + (i % 3) * 0.1,
              filter: 'blur(2px)',
              animation: `beamPulse ${1 + (i % 3) * 0.5}s ease-in-out infinite ${(i % 4) * 0.2}s`,
              '--rotation': `${i * 45}deg`
            }}
          />
        ))}
        {portalActive && [...Array(50)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute rounded-full bg-green-300"
            style={{
              height: `${Math.random() * 3 + 1}px`,
              width: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: (Math.random() * 0.7 + 0.3) * (1 + portalIntensity * 0.3),
              filter: `blur(${Math.random() * 1}px)`,
              animation: `particleToCenterIntense ${Math.random() * 1.5 + 1}s infinite ${Math.random() * 0.5}s ease-in-out`,
              transform: `scale(${1 + portalIntensity * 0.5})`,
            }}
          />
        ))}
        {portalActive && [...Array(6)].map((_, i) => (
          <div 
            key={`vortex-${i}`}
            className="absolute top-1/2 left-1/2 opacity-70"
            style={{
              height: '140%',
              width: '140%',
              backgroundImage: 'radial-gradient(circle, rgba(74, 222, 128, 0) 50%, rgba(74, 222, 128, 0.6) 55%, rgba(74, 222, 128, 0) 60%)',
              transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
              animation: `vortexSpin ${6 + i * 0.5}s linear infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <button 
        onClick={handleEnterPortal}
        className={`relative rounded-md overflow-hidden group ${portalActive ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        style={{
          ...getParallaxStyle(0.6),
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 20
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-green-600 group-hover:scale-105 transition-transform duration-300"></div>
        <div className="absolute -inset-px rounded-md bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="absolute inset-0 w-3/4 h-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <span className="relative px-6 py-3 font-semibold text-white block">
          Enter Portal
        </span>
      </button>

      <style jsx>{`
        @keyframes particleToCenterIntense {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          50% { transform: translate(calc(-50% + ${Math.random() * 10 - 5}px), calc(-50% + ${Math.random() * 10 - 5}px)); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
        }
        @keyframes pulseRapid {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.03); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes beamPulse {
          0% { opacity: 0.2; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.5); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(1); }
          100% { opacity: 0.2; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.5); }
        }
        @keyframes vortexSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinCW {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinCCW {
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes spinFluctuate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.03); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rippleEffect {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PortalComponent;
