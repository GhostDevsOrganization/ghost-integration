import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { ArrowRight, Twitter, Github, Send, BarChart2, Shield, Layers, RefreshCw } from 'lucide-react';
import { EnhancedRadarPortal as RadarPortal } from './EnhancedRadarPortal'; // Import the enhanced version
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

// Feature Card Component
const FeatureCard = ({ icon, title, description, comingSoon }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-green-900/20 to-black border border-green-400/10 p-6 transition-all duration-300 hover:border-green-400/30 hover:shadow-lg hover:shadow-green-400/5">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-green-400 to-transparent group-hover:w-full transition-all duration-700"></div>
      <div className="absolute bottom-0 right-0 h-px w-0 bg-gradient-to-l from-green-400 to-transparent group-hover:w-full transition-all duration-700"></div>
      
      <div className="mb-4 text-green-400 p-3 bg-green-400/10 rounded-lg inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
        {title} {comingSoon && <span className="ml-2 text-xs text-green-500">(Coming Soon)</span>}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </div>
  );
};

// Token Swapping Section Component
const TokenSwappingSection = () => {
  const steps = [
    { number: 1, text: "Initiate Swap" },
    { number: 2, text: "Provide Destination Address" },
    { number: 3, text: "Receive Deposit Address" },
    { number: 4, text: "Send Funds" },
    { number: 5, text: "Exchange Processed" },
    { number: 6, text: "Receive Swapped Tokens" }
  ];

  const benefits = [
    { title: "Speed & Efficiency", description: "Fast transactions with automatic rate calculations" },
    { title: "Security", description: "No need to create accounts on external exchanges" },
    { title: "Simplicity", description: "User-friendly interface without complex order books" },
    { title: "Variety", description: "Access to numerous cryptocurrencies across multiple networks" }
  ];

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Token Swapping</h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Seamlessly swap between a wide range of cryptocurrencies directly within the Kaspa Portal. Our integration with a leading swapping service allows you to exchange assets across different blockchain networks quickly and securely.
        </p>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">How It Works</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="w-full sm:w-40 p-4 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm text-center"
                style={{ minHeight: '100px' }} // Ensure consistent height on mobile
              >
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 font-bold">{step.number}</span>
                </div>
                <p className="text-gray-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Features & Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold mb-2 text-green-400">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-8 py-3 rounded-md bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors duration-300">
            Try Token Swapping
          </button>
          <p className="mt-2 text-gray-400">Experience the easiest way to exchange cryptocurrencies on Kasportal</p>
        </div>
      </div>
    </section>
  );
};

// Multi-Wallet Support Section Component
const MultiWalletSection = () => {
  const keyBenefits = [
    "Unified Cross-Chain View",
    "Seamless Cross-Chain Operations",
    "Enhanced Security & Control",
    "Kasware Integration (Current)",
    "Expanded Wallet Support (Coming Soon)"
  ];

  const supportedWallets = [
    { emoji: "💼", name: "Kasware" },
    { emoji: "🦊", name: "Metamask" },
    { emoji: "💰", name: "Kaspium" },
    { emoji: "☀️", name: "Raydium" },
    { emoji: "🔒", name: "Hardware Wallets" },
    { emoji: "⏳", name: "More Coming Soon" }
  ];

  const howItWorks = [
    {
      title: "1. Connect Securely",
      description: "Connect your Kasware wallet (and more coming soon) using secure, non-custodial methods."
    },
    {
      title: "2. View & Simulate",
      description: "See your combined assets and interact with DeFi simulations using your connected wallets."
    },
    {
      title: "3. Prepare for Native DeFi",
      description: "Your connected wallets will be ready for seamless interaction with native Kaspa DeFi when smart contracts are available."
    }
  ];

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Multi-Wallet Support</h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Kasportal's multi-wallet support is a core component of our Phase 1 roadmap, enabling a unified view and management of your assets across different chains. Connect your wallets securely to interact with our growing suite of DeFi simulations and future native protocols.
        </p>

        {/* Key Benefits */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Key Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {keyBenefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm text-center"
              >
                <p className="text-green-400 font-bold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Cross-Chain View */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Unified Cross-Chain View</h3>
          <div className="bg-green-900/10 rounded-xl p-8 border border-green-400/20">
            <p className="text-gray-300 text-center">
              See the total value and distribution of your assets across all connected wallets and supported chains in one place.
            </p>
          </div>
        </div>

        {/* Supported Wallets */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Supported Wallets</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {supportedWallets.map((wallet, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2">{wallet.emoji}</div>
                <p className="text-white font-medium text-sm sm:text-base">{wallet.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-6">
            We currently support Kasware wallet integration. More wallets are being added regularly as part of our roadmap!
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-green-400/20 bg-black/80 backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold mb-4 text-green-400">{step.title}</h4>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-8 py-3 rounded-md bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors duration-300">
            Connect Your Kasware Wallet
          </button>
          <p className="mt-2 text-gray-400">Start managing your Kaspa assets and prepare for the future of DeFi</p>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
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

  // Define features with their routes and enhanced descriptions
  const features = [
    { 
      title: "Token Swapping", 
      route: "/features/token-swapping",
      description: "Fast, secure token swaps with minimal slippage and optimal routing across liquidity pools.",
      icon: <RefreshCw size={24} />
    },
    { 
      title: "Multi-Wallet Support", 
      route: "/features/multi-wallet-support",
      description: "Connect and manage multiple wallets simultaneously for seamless asset management.",
      icon: <Layers size={24} />,
      comingSoon: true
    },
    { 
      title: "Advanced Analytics", 
      route: "/features/advanced-analytics",
      description: "Real-time data visualization and insights for informed trading decisions.",
      icon: <BarChart2 size={24} />,
      comingSoon: true
    },
    { 
      title: "Cross-Chain Compatibility", 
      route: "/features/cross-chain-compatibility",
      description: "Seamless transactions across multiple blockchains with enhanced security and low fees.",
      icon: <Shield size={24} />
    }
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
        {/* This will be added by MobileResponsiveWrapper */}
        {/* <MobileMenuButton /> */}

        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl font-bold relative group">
            <span className="text-green-400 group-hover:text-green-300 transition-colors duration-300">Kas</span>
            <span className="text-white group-hover:text-green-100 transition-colors duration-300">portal</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-500"></span>
          </span>
        </div>

        {/* Mobile-friendly navigation links */}
        <div className="nav-links flex justify-center space-x-4 md:space-x-6 mb-4 md:mb-0">
          <Link to="/" className="px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold text-sm md:text-base transition-colors duration-300 text-gray-300 border border-transparent hover:border-green-400 hover:text-green-400">
            Home
          </Link>
          <button
            onClick={handleEnterPortal}
            className="px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold text-sm md:text-base transition-colors duration-300 text-gray-300 border border-transparent hover:border-green-400 hover:text-green-400"
          >
            Enter Portal
          </button>
          {/* Only show the first feature on mobile, all on desktop */}
          {features.map((feature, index) => (
            (window.innerWidth > 768 || index === 0) && (
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
            )
          ))}
        </div>

        <div className="flex space-x-4 items-center">
          <button
            onClick={handleEnterPortal}
            className="relative overflow-hidden rounded-md bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:from-green-400 hover:to-green-500 hover:shadow-lg hover:shadow-green-400/20 group"
          >
            <span className="relative z-10 flex items-center">
              Connect Wallet
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

      {/* Enterprise Features Section */}
      <section id="features" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Enterprise-Grade Features</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Built for scale with advanced features that power the next generation of blockchain applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                comingSoon={feature.comingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Token Swapping Section */}
      <TokenSwappingSection />

      {/* Multi-Wallet Support Section */}
      <MultiWalletSection />

      {/* Roadmap Section */}
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
