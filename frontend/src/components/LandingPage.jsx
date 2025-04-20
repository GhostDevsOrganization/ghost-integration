import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { ArrowRight, Twitter, Github, Send } from 'lucide-react';
import { RadarPortal } from './RadarPortal';
import RoadmapSection from './RoadmapSection'; // Import RoadmapSection

// Enhanced Footer component
const EnhancedFooter = () => {
  const socialLinks = [
    { name: "Twitter", icon: <Twitter size={20} />, href: "https://x.com/PORTAL_KAS", ariaLabel: "Follow us on Twitter" },
    { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/GhostDevs", ariaLabel: "View our GitHub" },
    { name: "Telegram", icon: <Send size={20} />, href: "https://t.me/+LJanxsRyV645OWUx", ariaLabel: "Join our Telegram group" }
  ];

  return (
    <footer className="bg-black py-12 border-t border-green-400/10 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>

      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center space-y-8 md:flex-row md:justify-between md:space-y-0">
        <div className="flex items-center group">
          <span className="text-2xl font-bold text-green-400">Kaspa</span>
          <span className="text-2xl font-bold text-white ml-2">Portal</span>
          <div className="ml-2 h-4 w-4 rounded-full bg-green-400/20 group-hover:bg-green-400/40 transition-all duration-300"></div>
        </div>

        <nav className="flex flex-wrap justify-center gap-8" aria-label="Footer navigation">
          <a href="#features" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Features</a>
          <a href="#roadmap" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Roadmap</a>
          <a href="#stats" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Statistics</a>
          <a href="https://kaspa.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Kaspa.org</a>
        </nav>

        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-white opacity-80 hover:opacity-100 hover:text-green-400 transition-all duration-300 transform hover:scale-110 p-2 bg-green-900/30 rounded-full"
            >
              <span className="sr-only">{link.name}</span>
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Ghost Devs. All rights reserved.</p>
        <p className="mt-1">Not affiliated with the Kaspa Foundation.</p>
      </div>
    </footer>
  );
};

export default function KaspaLandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const portalRef = useRef(null);
  const [portalActive, setPortalActive] = useState(false);
  const [portalPulse, setPortalPulse] = useState(false);
  const [portalIntensity, setPortalIntensity] = useState(0);
  const particlesRef = useRef([]);

  // Define features with their routes
  const features = [
    { title: "Token Swapping", route: "/features/token-swapping" },
    { title: "Multi-Wallet Support", route: "/features/multi-wallet-support" },
    { title: "Advanced Analytics", route: "/features/advanced-analytics" },
    { title: "Cross-Chain Compatibility", route: "/features/cross-chain-compatibility" }
  ];

  const [faqOpen, setFaqOpen] = useState(false);

  // Create an array of particles with random properties
  const [particles, setParticles] = useState(() =>
    Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      direction: Math.random() * 360
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Slightly faster loading for better UX

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const pulseTiming = setInterval(() => {
      setPortalPulse(prev => !prev);
    }, 3000); // Slower pulse for more subtle effect

    // Update particle positions
    const particleInterval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + Math.cos(particle.direction * Math.PI / 180) * particle.speed * 0.1) % 100,
          y: (particle.y + Math.sin(particle.direction * Math.PI / 180) * particle.speed * 0.1) % 100,
        }))
      );
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTiming);
      clearInterval(particleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (portalActive) {
      let intensity = 0;
      const intensityInterval = setInterval(() => {
        intensity += 0.08; // Slower intensity increase
        setPortalIntensity(intensity);
        if (intensity >= 1) clearInterval(intensityInterval);
      }, 150);

      return () => clearInterval(intensityInterval);
    } else {
      setPortalIntensity(0);
    }
  }, [portalActive]);

  const handleEnterPortal = () => {
    if (!portalActive) {
      if (portalRef.current) {
        setPortalActive(true);
        setTimeout(() => {
          navigate('/portal');
        }, 1800); // Slightly faster transition
      } else {
        navigate('/portal');
      }
    }
  };

  const getParallaxStyle = (factor = 1) => ({
    transform: `translate(${mousePosition.x * 15 * factor}px, ${mousePosition.y * 15 * factor}px)`
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          {/* Enhanced loading animation */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-green-400/20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-t-2 border-green-400 animate-spin"></div>

            <div className="animate-pulse text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">KAS</div>
            <div className="mt-4 animate-pulse text-3xl font-bold text-white">PORTAL</div>
          </div>

          <div className="mt-8 text-sm text-green-400/60">Initializing secure connection...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-green-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
      </div>

      {/* Navbar - Enhanced with glass effect */}
      <nav className="sticky top-0 z-50 flex flex-col items-center bg-black/80 px-6 py-4 backdrop-blur-md border-b border-green-400/10 md:flex-row md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl font-bold relative group">
            <span className="text-green-400 group-hover:text-green-300 transition-colors duration-300">Kas</span>
            <span className="text-white group-hover:text-green-100 transition-colors duration-300">portal</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-500"></span>
          </span>
        </div>
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 md:space-x-6 mb-4 md:mb-0">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.route}
              className="px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold text-sm md:text-base transition-colors duration-300 text-gray-300 border border-transparent hover:border-green-400 hover:text-green-400"
            >
              {feature.title}{" "}
              {(feature.title === "Multi-Wallet Support" || feature.title === "Advanced Analytics") && (
                <span className="ml-1 text-xs text-green-500">(Coming Soon)</span>
              )}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleEnterPortal}
            className="relative overflow-hidden rounded-md bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:from-green-400 hover:to-green-500 hover:shadow-lg hover:shadow-green-400/20 group"
          >
            <span className="relative z-10 flex items-center">
              Enter Portal
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-green-300 group-hover:w-full transition-all duration-500"></span>
          </button>
        </div>
      </nav>

      {/* Hero Section - Radar Portal */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Enhanced dimensional rift background effect */}
        <div
          className={`absolute inset-0 pointer-events-none overflow-hidden ${portalActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transition: 'opacity 1s ease-in-out',
            perspective: '1000px',
          }}
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={`ripple-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border border-green-400/30"
              style={{
                height: `${(i + 1) * 40}vh`,
                width: `${(i + 1) * 40}vh`,
                transform: 'translate(-50%, -50%)',
                opacity: portalActive ? (0.5 - i * 0.05) : 0,
                animation: `rippleGalaxy ${5 + i * 1}s cubic-bezier(0.4,0,0.2,1) infinite`,
                transitionDelay: `${i * 0.2}s`,
                transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: `0 0 ${60 + i * 30}px ${30 + i * 15}px rgba(74,222,128,${0.15 - i * 0.01})`
              }}
            />
          ))}

          {[...Array(20)].map((_, i) => (
            <div
              key={`fractal-${i}`}
              className="absolute opacity-0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 12 + 8}vh`,
                height: `${Math.random() * 12 + 8}vh`,
                background: 'radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
                opacity: portalActive ? (Math.random() * 0.6 + 0.2) : 0,
                animation: `floatFractals ${Math.random() * 8 + 12}s ease-in-out infinite`,
                transition: 'opacity 1s ease-in-out',
                transitionDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Radar Portal Component */}
        <RadarPortal
          onEnterPortal={handleEnterPortal}
          isActive={portalActive}
          mousePosition={mousePosition}
        />

        {/* Minimal Text */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-green-400">Kasportal</h1>
          <p className="text-lg text-white/80 mt-2">Unlock the Speed of Kaspa.</p>
        </div>

      </section>

      {/* Add RoadmapSection here */}
      <RoadmapSection />

      {/* Enhanced Footer */}
      <EnhancedFooter />

      {/* Custom animations and styles */}
      <style jsx global>{`
        @keyframes rippleGalaxy {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
        }

        @keyframes floatFractals {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, 15px); }
          50% { transform: translate(20px, -10px); }
          75% { transform: translate(-10px, 20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes pulseOpacity {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes counter-effect {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Grid background for footer */
        .grid-bg {
          background-image:
            linear-gradient(to right, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Particle animation */
        .particle {
          animation: float 60s infinite linear;
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, 10px); }
          50% { transform: translate(20px, 0px); }
          75% { transform: translate(10px, -10px); }
          100% { transform: translate(0, 0); }
        }

        /* Optimize transitions for performance */
        .transition-all {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
