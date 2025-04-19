import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BlackPortfolioChart from './BlackPortfolioChart';
import NetworkStatsTicker from './NetworkStatsTicker';
import FAQModal from './FAQModal';
// Removed WalletConnectModal import as it is no longer used

// Crisp Chatbot embed
// Crisp Chatbot embed removed

// (Crisp chat integration removed)









export default function KaspaLandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const portalRef = useRef(null);
  const [portalActive, setPortalActive] = useState(false);
  // Add new state for enhanced animations
  const [portalPulse, setPortalPulse] = useState(false);
  const [portalIntensity, setPortalIntensity] = useState(0);
  const particlesRef = useRef([]);

  // Removed walletBalance state as BlackPortfolioChart is commented out in JSX
  // const [walletBalance, setWalletBalance] = useState(0); 

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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

    // Start gentle portal pulsing
    const pulseTiming = setInterval(() => {
      setPortalPulse(prev => !prev);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTiming);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhance portal with gradual intensity increase when active
  useEffect(() => {
    if (portalActive) {
      let intensity = 0;
      const intensityInterval = setInterval(() => {
        intensity += 0.1;
        setPortalIntensity(intensity);
        if (intensity >= 1) clearInterval(intensityInterval);
      }, 150);
      
      return () => clearInterval(intensityInterval);
    } else {
        // Reset intensity when portal deactivates (e.g., on page load or navigation away)
        // Although in this flow, navigation happens, so reset might not be strictly needed here
        // but good practice if portal could be closed without navigation.
         setPortalIntensity(0);
    }
  }, [portalActive]);

  const handleEnterPortal = () => {
    if (!portalActive) { // Prevent multiple clicks
      if (portalRef.current) {
        // Initialize particles for portal activation (already happening in handleEnterPortal)
        // particlesRef.current = Array(40).fill().map(() => ({...}));
        
        // Activate portal animation
        setPortalActive(true);
        
        // Play portal sound if we had audio capabilities
        // const portalSound = new Audio('/sounds/portal.mp3');
        // portalSound.play();
        
        // Delay navigation to show animation
        setTimeout(() => {
          navigate('/portal');
        }, 2000);
      } else {
        // Fallback if ref is not set (shouldn't happen in this structure)
        navigate('/portal');
      }
    }
  };

  // Dynamic styles based on mouse position for parallax effect
  const getParallaxStyle = (factor = 1) => {
    return {
      transform: `translate(${mousePosition.x * 20 * factor}px, ${mousePosition.y * 20 * factor}px)`
    };
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-pulse text-6xl font-bold text-green-400">KAS</div>
          <div className="mt-4 animate-pulse text-3xl font-bold text-green-400">PORTAL</div>
          
          {/* Enhanced loading animation */}
          <div className="mt-8 relative">
            <div className="absolute h-12 w-12 rounded-full border-4 border-green-400/20"></div>
            <div className="absolute h-12 w-12 rounded-full border-4 border-green-400 border-t-transparent animate-spin"></div>
            <div className="h-12 w-12 rounded-full bg-green-400/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-black/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-green-400">Kas</span><span className="text-white">portal</span>
          </span>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleEnterPortal}
            // Style the button in the nav slightly differently if desired
            className="rounded-md bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20"
          >
            Enter Portal
          </button>
        </div>
      </nav>

      {/* Removed WalletConnectModal toggle as the button is removed */}
      {/* {showAnalytics && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
          <div className="flex justify-end p-2">
            <button
              onClick={() => setShowAnalytics(false)}
              className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-600"
            >
              Close
            </button>
          </div>
          <div className="flex-grow overflow-auto p-4">
            <BlackPortfolioChart balance={walletBalance} />
          </div>
        </div>
      )} */}

      {/* Hero Section with Enhanced Portal Animation */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* ENHANCED: Dimensional Rift Background Effect */}
        <div 
          className={`absolute inset-0 pointer-events-none overflow-hidden ${portalActive ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            transition: 'opacity 1s ease-in-out',
            perspective: '1000px',
          }}
        >
          {/* Ripple effect circles */}
          {[...Array(7)].map((_, i) => (
            <div 
              key={`ripple-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border border-green-400/30"
              style={{
                height: `${(i+1) * 40}vh`,
                width: `${(i+1) * 40}vh`,
                transform: 'translate(-50%, -50%)',
                opacity: portalActive ? (0.5 - i * 0.06) : 0,
                animation: `rippleGalaxy ${6 + i * 2}s cubic-bezier(0.4,0,0.2,1) infinite`,
                transitionDelay: `${i * 0.3}s`,
                transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: `0 0 ${80 + i * 40}px ${40 + i * 20}px rgba(74,222,128,${0.12 - i * 0.01})`
              }}
            />
          ))}
          
          {/* Random floating fractals */}
          {[...Array(12)].map((_, i) => (
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

        {/* ENHANCED: Interdimensional Portal Container */}
        <div 
          ref={portalRef}
          className={`relative w-64 h-64 md:w-96 md:h-96 mb-12 transition-all duration-1500 ease-in-out
                      ${portalActive ? 'scale-150 opacity-100' : 'scale-100 opacity-80'}`}
          style={{
            transition: portalActive ? 'all 2s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...getParallaxStyle(0.2),
            filter: portalActive ? `blur(${portalIntensity * 2}px) brightness(${1 + portalIntensity * 0.5})` : 'none',
          }}
        >
          {/* Portal Outer Rings with rotational direction and speed variance */}
          {[...Array(8)].map((_, i) => (
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
                filter: portalActive ? `blur(${portalIntensity * 2}px)` : 'none',
                boxShadow: portalActive ? 
                  `0 0 ${10 + portalIntensity * 15}px ${portalIntensity * 8}px rgba(74, 222, 128, ${0.1 + portalIntensity * 0.2})` : 
                  'none',
              }}
            />
          ))}

          {/* Portal Middle Rings with different rotation parameters */}
          {[...Array(4)].map((_, i) => (
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
              }}
            />
          ))}

          {/* Portal Inner Rings with vibration */}
          {[...Array(3)].map((_, i) => (
            <div 
              key={`inner-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border-2 border-green-400/50"
              style={{
                height: `${30 + i * 5}%`,
                width: `${30 + i * 5}%`,
                transform: 'translate(-50%, -50%)',
                animation: portalActive ? 
                  `spinVibrate ${2 + i}s ease-in-out infinite` : 
                  `spin ${8 + i * 2}s linear infinite`,
                opacity: portalActive ? 
                  (0.8 + portalIntensity * 0.2) : 
                  (0.5 * (portalPulse ? 1.4 : 1)),
              }}
            />
          ))}

          {/* Portal Core with enhanced glow and "PORTAL" text logo */}
          <div 
            className="absolute top-1/2 left-1/2 rounded-full bg-green-400 transition-all duration-1500 ease-in-out flex items-center justify-center overflow-hidden"
            style={{
              height: portalActive ? '70%' : (portalPulse ? '28%' : '25%'),
              width: portalActive ? '70%' : (portalPulse ? '28%' : '25%'),
              transform: 'translate(-50%, -50%)',
              boxShadow: portalActive ? 
                `0 0 ${60 + portalIntensity * 40}px ${30 + portalIntensity * 30}px rgba(74, 222, 128, ${0.6 + portalIntensity * 0.4}),
                 0 0 ${100 + portalIntensity * 50}px ${60 + portalIntensity * 40}px rgba(74, 222, 128, ${0.4 + portalIntensity * 0.3}),
                 0 0 ${140 + portalIntensity * 60}px ${90 + portalIntensity * 50}px rgba(74, 222, 128, ${0.2 + portalIntensity * 0.2})` : 
                (portalPulse ? 
                  '0 0 35px 20px rgba(74, 222, 128, 0.5), 0 0 55px 35px rgba(74, 222, 128, 0.3), 0 0 75px 50px rgba(74, 222, 128, 0.15)' : 
                  '0 0 30px 15px rgba(74, 222, 128, 0.4), 0 0 50px 30px rgba(74, 222, 128, 0.2), 0 0 70px 45px rgba(74, 222, 128, 0.1)'),
              animation: portalActive ? 'pulseRapid 1s ease-in-out infinite' : 'pulse 3s ease-in-out infinite'
            }}
          >
            {/* PORTAL text inside the core when active */}
            {portalActive && (
              <span
                style={{
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '3.5rem', // Adjust size as needed for visual fit
                  letterSpacing: '0.1em',
                  textShadow: '0 0 60px #22d3a5, 0 0 120px #22d3a5, 0 0 200px #22d3a5',
                  filter: 'blur(0.2px)',
                  fontFamily: 'Montserrat, Impact, Arial Black, sans-serif',
                  WebkitTextStroke: '2px #22d3a5',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  lineHeight: 1,
                  userSelect: 'none'
                }}
              >
                PORTAL
              </span>
            )}
          </div>

          {/* Energy Beams shooting from the center when portal is active */}
          {portalActive && [...Array(12)].map((_, i) => (
            <div 
              key={`beam-${i}`}
              className="absolute top-1/2 left-1/2 bg-green-300"
              style={{
                height: '2px',
                width: `${50 + Math.random() * 150}%`,
                transform: `translate(-50%, -50%) rotate(${i * 30 + Math.random() * 15}deg)`,
                opacity: 0.6 + Math.random() * 0.4,
                filter: 'blur(2px)',
                animation: `beamPulse ${1 + Math.random() * 1.5}s ease-in-out infinite ${Math.random() * 0.5}s`
              }}
            />
          ))}

          {/* ENHANCED: Dynamic Portal Particles */}
          {/* Using particlesRef data for active state */}
          {portalActive && particlesRef.current.map((particle, i) => (
            <div 
              key={`particle-${i}`}
              className="absolute rounded-full bg-green-300"
              style={{
                height: `${particle.size}px`,
                width: `${particle.size}px`,
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                opacity: particle.opacity * (1 + portalIntensity), // Scale opacity with intensity
                filter: `blur(${particle.size / 3}px)`, // Blur scales with size
                animation: `particleToCenterIntense ${particle.speed}s infinite ${particle.delay}s ease-in-out`,
                transform: `scale(${1 + portalIntensity * 0.5})` // Scale particles slightly with intensity
              }}
            />
          ))}


          {/* Vortex spiral lines */}
          {portalActive && [...Array(8)].map((_, i) => (
            <div 
              key={`vortex-${i}`}
              className="absolute top-1/2 left-1/2 opacity-70"
              style={{
                height: '140%',
                width: '140%',
                backgroundImage: 'radial-gradient(circle, rgba(74, 222, 128, 0) 50%, rgba(74, 222, 128, 0.6) 55%, rgba(74, 222, 128, 0) 60%)',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                animation: `vortexSpin ${5 + Math.random() * 2}s linear infinite ${i * 0.1}s`
              }}
            />
          ))}

          {/* --- ENTER PORTAL BUTTON - PLACED INSIDE THE PORTAL DIV --- */}
          {/* Styled with white text and a subtle black/border background */}
          <button
            onClick={handleEnterPortal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-md border border-green-400/40 px-6 py-3 font-semibold text-white bg-black/60 hover:bg-green-400/10 transition-all duration-300"
            style={{ 
                pointerEvents: portalActive ? 'none' : 'auto', 
                opacity: portalActive ? 0 : 1, 
                transition: 'opacity 0.5s, transform 0.3s', 
                transform: `translate(-50%, -50%) scale(${portalPulse ? 1.05 : 1})`, // Subtle scale pulse when inactive
             }}
          >
              Enter Portal
          </button>
          {/* --- END ENTER PORTAL BUTTON --- */}

        </div> {/* End portalRef div */}

        {/* ENHANCED: Portal Atmosphere Effect */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${portalActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle at center, rgba(74, 222, 128, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            backgroundSize: '150% 150%',
            animation: 'pulseBackground 4s ease-in-out infinite'
          }}
        />

        {/* Removed Coming Soon label */}

        <h1
          className="mb-6 text-4xl font-bold md:text-6xl"
          style={getParallaxStyle(0.3)}
        >
          Kasportal: Fast, Secure, Scalable Token Management
        </h1>
        
        <p
          className="mb-8 max-w-2xl text-lg opacity-80"
          style={getParallaxStyle(0.4)}
        >
          Experience the power of the fastest UTXO-based Layer 1 blockchain.
        </p>
        
        {/* Removed the duplicate "Enter Portal" button that was previously here */}

        <button
          onClick={() => setFaqOpen(true)}
          className="mt-6 rounded-md border border-green-400/40 px-4 py-2 font-semibold text-green-400 bg-black/60 hover:bg-green-400/10 transition-all duration-300"
        >
          FAQ
        </button>

        <FAQModal isOpen={faqOpen} onClose={() => setFaqOpen(false)} />
      </section>

      {/* Rest of the page content remains the same */}
      {/* Stats Section */}
      {/* Included NetworkStatsTicker */}
      <section id="stats" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-green-400/5 to-black/0 pointer-events-none"></div>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8 px-4">
           {/* Integrate NetworkStatsTicker here or keep static ones - using static for simplicity */}
          <div className="flex w-64 flex-col items-center rounded-lg bg-black/50 p-6 text-center shadow-lg shadow-green-400/5 transition-all duration-300 hover:scale-105 hover:shadow-green-400/10 border border-green-400/10 backdrop-blur-sm">
            <h3 className="mb-2 text-3xl font-bold text-green-400 counter-effect">250,000+</h3>
            <p className="text-lg opacity-80">Active Addresses</p>
          </div>
          
          <div className="flex w-64 flex-col items-center rounded-lg bg-black/50 p-6 text-center shadow-lg shadow-green-400/5 transition-all duration-300 hover:scale-105 hover:shadow-green-400/10 border border-green-400/10 backdrop-blur-sm">
            <h3 className="mb-2 text-3xl font-bold text-green-400 counter-effect">500+</h3>
            <p className="text-lg opacity-80">TPS Capacity</p>
          </div>
          
          <div className="flex w-64 flex-col items-center rounded-lg bg-black/50 p-6 text-center shadow-lg shadow-green-400/5 transition-all duration-300 hover:scale-105 hover:shadow-green-400/10 border border-green-400/10 backdrop-blur-sm">
            <h3 className="mb-2 text-3xl font-bold text-green-400 counter-effect">1s</h3>
            <p className="text-lg opacity-80">Block Time</p>
          </div>
          {/* Example of where NetworkStatsTicker might go if fetching live data */}
          {/* <NetworkStatsTicker /> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 relative">
          <h2 className="mb-16 text-center text-4xl font-bold">
            Upcoming <span className="text-green-400">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>,
                title: "Token Swapping",
                description: "Seamlessly swap between KAS and KRC-20 tokens with minimal fees and instant confirmation times."
              },
              {
                icon: <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>,
                secondIcon: <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>,
                thirdIcon: <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>,
                title: "Multi-Wallet Support",
                description: "Connect and manage multiple wallets with a clean, intuitive interface designed for both beginners and power users."
              },
              {
                icon: <path d="M12 2v20"></path>,
                secondIcon: <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>,
                title: "DeFi Integration",
                description: "Access the growing Kaspa DeFi ecosystem with staking, farming, and liquidity pool opportunities all in one place."
              },
              {
                icon: <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>,
                secondIcon: <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>,
                title: "Enhanced Security",
                description: "Hardware wallet support, multi-signature options, and advanced security features to keep your assets protected."
              },
              {
                icon: <path d="M5 12h14"></path>,
                secondIcon: <path d="M12 5v14"></path>,
                title: "Cross-Chain Bridges",
                description: "Connect to other blockchain ecosystems through secure and efficient cross-chain bridges."
              },
              {
                icon: <path d="M3 3v18h18"></path>,
                secondIcon: <path d="m19 9-5 5-4-4-3 3"></path>,
                title: "Analytics Dashboard",
                description: "Comprehensive portfolio tracking, market data, and performance analytics all in an easy-to-read dashboard."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group rounded-lg bg-black/50 p-6 shadow-lg shadow-green-400/5 transition-all duration-300 hover:scale-105 hover:shadow-green-400/10 border border-green-400/10 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 transition-all duration-300 group-hover:bg-green-400/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 transition-all duration-500 group-hover:scale-110">
                    {feature.icon}
                    {feature.secondIcon}
                    {feature.thirdIcon}
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/5 to-black pointer-events-none"></div>
        <div className="mx-auto max-w-6xl px-4 relative">
          <h2 className="mb-16 text-center text-4xl font-bold">
            Development <span className="text-green-400">Roadmap</span>
          </h2>
          
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-green-400/20 md:block hidden"></div>
            
            {/* Roadmap phases */}
            {[
              {
                phase: "PHASE 1",
                title: "Portal Launch",
                description: "Official launch of the Kaspa Portal with core wallet and token management features."
              },
              {
                phase: "PHASE 2",
                title: "Kaspa DEX Integration",
                description: "Integration of decentralized exchange functionality for seamless token swaps."
              },
              {
                phase: "PHASE 3",
                title: "Smart Contract Toolkit",
                description: "Release of developer tools and smart contract support for advanced use cases."
              },
              {
                phase: "PHASE 4",
                title: "Mobile App Support",
                description: "Launch of mobile applications for iOS and Android to manage tokens on the go."
              }
            ].map((phase, index) => (
              <div 
                key={index}
                className={`mb-16 flex flex-col md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} last:mb-0`}
              >
                {/* Desktop: show on md+ screens, left/right aligned */}
                <div className={`mb-4 md:mb-0 md:w-1/2 ${index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'} hidden md:block`}>
                  <h3 className="text-md font-semibold text-green-400">{phase.phase}</h3>
                  <h4 className="mb-2 text-2xl font-bold">{phase.title}</h4>
                  <p className="opacity-80">{phase.description}</p>
                </div>

                <div className="relative flex justify-center md:w-0">
                  <div className="hidden h-4 w-4 rounded-full bg-green-400 md:block animate-pulse"></div>
                </div>

                {/* Mobile: show on small screens only, full width */}
                <div className="md:hidden w-full mb-4">
                  <h3 className="text-md font-semibold text-green-400">{phase.phase}</h3>
                  <h4 className="mb-2 text-2xl font-bold">{phase.title}</h4>
                  <p className="opacity-80">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-black to-black/80 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated particle system */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-green-400/40 animate-float"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-4xl px-4 text-center relative">
          <h2 className="mb-6 text-4xl font-bold">
            Join the <span className="text-green-400">Future</span> of Kaspa
          </h2>
          
          <p className="mb-8 text-lg opacity-80">
            Be among the first to experience the most advanced Kaspa ecosystem portal. 
            Enter now for early access and exclusive updates.
          </p>
          
          {/* This CTA button remains as is, separate from the main portal button */}
          <button 
            onClick={handleEnterPortal}
            className="relative group rounded-md overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-green-600 group-hover:scale-105 transition-transform duration-300"></div>
            <div className="absolute -inset-px rounded-md bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-green-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative px-8 py-3 font-semibold text-white block">
              Enter Portal
            </span>
          </button>
        </div>
      </section>

      {/* Wallet Connect Modal removed */}

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-green-400/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-400">Kaspa</span>
            <span className="text-xl font-bold text-white"> Portal</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#features" className="hover:text-green-400 transition-colors duration-300">Features</a>
            <a href="#roadmap" className="hover:text-green-400 transition-colors duration-300">Roadmap</a>
            <a href="#stats" className="hover:text-green-400 transition-colors duration-300">Statistics</a>
            <a href="https://kaspa.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-300">Kaspa.org</a>
          </div>
          
          <div className="flex space-x-4">
            {[
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>, // X (Twitter)
              <g><path d="M9 12h6"></path><path d="M15 9a3 3 0 1 1-3 3"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect></g>, // GitHub
              <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9z"></path>, // Telegram circle background
              <path d="M10.5 15.5l1.5-4.5 4-1.5-6 6z"></path>, // Telegram paper plane
            ].map((icon, index) => {
              const hrefs = [
                "https://x.com/PORTAL_KAS", // X (Twitter)
                "https://github.com/kaspanet",
                "https://t.me/+LJanxsRyV645OWUx",
                "mailto:support@kasportal.com"
              ];
              const ariaLabels = [
                "Twitter",
                "GitHub",
                "Telegram",
                "Telegram", // Redundant but safe
                "Email", // This one is for mailto
                "Email" // Redundant but safe
              ];
               // Map index to correct href/ariaLabel, handling potential multiple paths per icon index
              const effectiveIndex = index === 2 || index === 3 ? 2 : index; // Use index 2 for both telegram paths
              
              return (
                <a
                  key={index}
                  href={hrefs[effectiveIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabels[effectiveIndex]}
                  className="text-white opacity-80 hover:opacity-100 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </footer>
      
      {/* Global animations - ENHANCED */}
      <style jsx>{`
        @keyframes particleToCenterIntense {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          50% { transform: translate(calc(-50% + ${Math.random() * 20 - 10}px), calc(-50% + ${Math.random() * 20 - 10}px)) scale(1.2); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
        }
        
        @keyframes pulseRapid {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes beamPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.3); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleX(0.3); }
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
          25% { transform: translate(-50%, -50%) rotate(90deg) scale(1.05); }
          50% { transform: translate(-50%, -50%) rotate(180deg); }
          75% { transform: translate(-50%, -50%) rotate(270deg) scale(0.95); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spinVibrate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)) rotate(90deg); }
          50% { transform: translate(-50%, -50%) rotate(180deg); }
          75% { transform: translate(calc(-50% - 2px), calc(-50% + 2px)) rotate(270deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes pulseBackground {
          0% { background-position: center center; }
          50% { background-position: 48% 48%; }
          100% { background-position: center center; }
        }
        
        @keyframes rippleGalaxy {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.5;
            box-shadow: 0 0 80px 40px rgba(74,222,128,0.12), 0 0 0 0 transparent;
          }
          60% {
            opacity: 0.3;
            box-shadow: 0 0 200px 120px rgba(74,222,128,0.10), 0 0 0 0 transparent;
          }
          80% {
            opacity: 0.15;
            box-shadow: 0 0 400px 200px rgba(74,222,128,0.08), 0 0 0 0 transparent;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
            box-shadow: 0 0 800px 400px rgba(74,222,128,0.04), 0 0 0 0 transparent;
          }
        }
        
        @keyframes floatFractals {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -15px) rotate(120deg); }
          66% { transform: translate(-15px, 10px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateX(20px) translateY(-15px); }
          50% { transform: translateY(30px) translateX(-20px); }
          75% { transform: translateX(15px) translateY(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        // Add pulse animation for the button when inactive
         @keyframes subtlePulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.02); }
            100% { transform: translate(-50%, -50%) scale(1); }
         }


        .animate-pulse-fast {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .counter-effect {
          /* This animation should be triggered when the element appears, not just always */
          /* A simple fade-in can be added with a transition */
           transition: opacity 1.5s ease;
           opacity: 1; /* Default state after loading */
        }
         /* Initial state before it's visible */
         .counter-effect.initial-hidden {
             opacity: 0;
         }


      `}</style>
    </div>
  );
}