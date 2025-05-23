import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Shield, Book, Home, Repeat, Link2, BookOpen, Zap, Brain, Atom, GraduationCap } from 'lucide-react';
import { EnhancedRadarPortal as RadarPortal } from './EnhancedRadarPortal';
import TraditionalNav from './TraditionalNav';
import EnhancedFooter from './EnhancedFooter';
import FeatureCard from './FeatureCard';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const portalRef = useRef(null);
  const [portalActive, setPortalActive] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  const handleProtocolChange = (protocolKey) => {
    setActiveProtocol(protocolKey);
    const protocol = protocols.find(p => p.key === protocolKey);
    if (protocol) {
      navigate(protocol.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: "Multi-Wallet Support",
      route: "/features/multi-wallet-support",
      description: "Unified wallet management system enabling simultaneous control of multiple blockchain assets with enterprise-grade security.",
      icon: <Layers size={24} />,
      comingSoon: true,
      color: "from-teal-400 to-purple-600"
    },
    {
      title: "Cross-Chain Compatibility",
      route: "/features/cross-chain-compatibility",
      description: "Revolutionary interoperability protocol connecting diverse blockchain ecosystems through advanced bridging technology.",
      icon: <Link2 size={24} />,
      comingSoon: true,
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Advanced Analytics",
      route: "/features/advanced-analytics",
      description: "AI-powered portfolio intelligence delivering real-time insights and predictive analytics for strategic decision-making.",
      icon: <Shield size={24} />,
      comingSoon: true,
      color: "from-teal-300 to-purple-400"
    },
    {
      title: "Learn",
      route: "/learn",
      description: "Comprehensive educational platform exploring Kaspa's revolutionary BlockDAG architecture and cutting-edge innovations.",
      icon: <Book size={24} />,
      color: "from-teal-600 to-purple-700"
    }
  ];

  const protocols = [
    { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
    { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
    { key: 'crosschain', label: 'Cross-Chain Compatibility', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
    { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Parallel Execution Revolution",
      timeline: "Q2-Q3 2025",
      description: "Multi-Path AMM and Temporal Arbitrage Engine for 10x throughput improvement",
      icon: <Zap className="w-8 h-8" />,
      color: "from-teal-400 to-purple-600",
      delay: "0s"
    },
    {
      phase: "Phase 2",
      title: "AI-Powered Blockchain Innovation",
      timeline: "Q4 2025 - Q1 2026",
      description: "Conversational Evolution NFTs and Autonomous Agent Framework",
      icon: <Brain className="w-8 h-8" />,
      color: "from-teal-500 to-purple-500",
      delay: "0.2s"
    },
    {
      phase: "Phase 3",
      title: "Quantum-Inspired Protocols",
      timeline: "Q2-Q3 2026",
      description: "Quantum Entangled Bridges and Holographic Smart Contracts",
      icon: <Atom className="w-8 h-8" />,
      color: "from-teal-300 to-purple-400",
      delay: "0.4s"
    },
    {
      phase: "Phase 4",
      title: "Academic Research Institute",
      timeline: "Q4 2026 onwards",
      description: "Kasportal Research Labs with PhD fellowship program",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-teal-600 to-purple-700",
      delay: "0.6s"
    }
  ];

  useEffect(() => {
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
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEnterPortal = () => {
    if (!portalActive) {
      setPortalActive(true);
      setTimeout(() => {
        navigate('/portal');
      }, 1800);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black overflow-hidden">
        <div className="relative">
          {/* Animated background */}
          <div className="absolute inset-0 w-screen h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-purple-900/20 to-blue-900/20 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.3),transparent_50%)] animate-spin-slow"></div>
          </div>

          <div className="flex flex-col items-center relative z-10">
            <div className="relative mb-8">
              {/* Outer rotating ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-teal-400/30 animate-spin-slow"></div>
              {/* Inner rotating ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-purple-400/50 animate-spin-reverse"></div>
              {/* Loading ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-t-2 border-teal-400 animate-spin"></div>

              <div className="text-6xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                KAS
              </div>
              <div className="mt-4 text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                PORTAL
              </div>
            </div>

            <div className="text-sm text-teal-400/80 animate-pulse">
              Initializing quantum connection...
            </div>

            {/* Loading progress bar */}
            <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-purple-400 rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <TraditionalNav
        protocols={protocols}
        activeProtocol={activeProtocol}
        onProtocolClick={handleProtocolChange}
      />

      {/* Hero Section - Two Column Layout */}
      <section className="relative flex min-h-screen items-center justify-center px-4 z-10">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/5 to-transparent"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Kasportal Branding and Text */}
            <div className="text-center lg:text-left relative z-10 order-2 lg:order-1">
              {/* Logo */}
              <div className="flex justify-center lg:justify-start mb-8 animate-fade-in-up">
                <img
                  src="/kasportal-logo.svg"
                  alt="Kasportal Logo"
                  className="w-24 h-24 md:w-32 md:h-32 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                />
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                Kasportal
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text mb-4 animate-fade-in-up">
                Advanced Blockchain Research Institute
              </p>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up-delay">
                Pioneering Next-Generation DeFi Through Scientific Innovation. Experience the future of blockchain technology with our revolutionary portal system that connects traditional finance with cutting-edge cryptocurrency solutions.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-fade-in-up-delay">
                <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800/50">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Multi-Chain Support</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800/50">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">AI-Powered Analytics</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800/50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Quantum Security</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800/50">
                  <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Research Institute</span>
                </div>
              </div>

              {/* Glowing CTA button */}
              <button
                className="mt-4 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-semibold text-white shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up-delay-2 group relative overflow-hidden"
                onClick={handleEnterPortal}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enter Portal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Right Column - Portal Animation */}
            <div className="flex items-center justify-center relative order-1 lg:order-2">
              <div className="relative">
                {/* Enhanced portal container with more space */}
                <div className="relative w-full max-w-lg mx-auto">
                  <RadarPortal
                    onEnterPortal={handleEnterPortal}
                    isActive={portalActive}
                    mousePosition={mousePosition}
                  />
                </div>

                {/* Additional visual elements around the portal */}
                <div className="absolute -inset-20 pointer-events-none">
                  {/* Floating data streams */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-16 bg-gradient-to-t from-transparent via-teal-400/30 to-transparent animate-float"
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${10 + (i * 12)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + (i * 0.3)}s`
                      }}
                    />
                  ))}

                  {/* Orbiting data points */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`data-${i}`}
                      className="absolute w-1 h-1 bg-purple-400/50 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg) translateX(200px) translateY(-50%)`,
                        animation: `orbit ${8 + i}s linear infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
        {/* Innovation Roadmap */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Innovation Roadmap
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up-delay">
              Kasportal transcends conventional DeFi boundaries—pioneering breakthrough technologies
              that will define the future of blockchain research and academic study.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: phase.delay }}
              >
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${phase.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                {/* 3D floating icon */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${phase.color} shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110`}>
                    <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                      {phase.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      {phase.timeline}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                  {phase.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${phase.color} p-[1px]`}>
                    <div className="w-full h-full bg-gray-900/90 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up-delay">
              Built for scale with advanced features that power the next generation of blockchain applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glowing background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`text-white mb-4 p-3 rounded-full bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  {feature.comingSoon && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 text-teal-300 text-xs rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Success Metrics
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100x", label: "Performance Gain", color: "from-teal-400 to-blue-500" },
              { value: "50+", label: "Research Papers", color: "from-teal-500 to-purple-500" },
              { value: "$10B+", label: "TVL Target", color: "from-teal-300 to-purple-400" },
              { value: "5+", label: "Patent Innovations", color: "from-teal-600 to-purple-700" }
            ].map((metric, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {metric.value}
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Shape the Future of DeFi
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
              Join the forefront of blockchain innovation and contribute to revolutionary technologies that will transform decentralized finance forever
            </p>
            <button className="group relative px-12 py-6 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                <div className="w-full h-full bg-black rounded-full"></div>
              </div>
            </button>
          </div>
        </section>
      </main>

      <EnhancedFooter />

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(200px) translateY(-50%); }
          to { transform: rotate(360deg) translateX(200px) translateY(-50%); }
        }
        
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-up-delay { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-loading-bar { animation: loading-bar 2s ease-out forwards; }
      `}</style>
    </div>
  );
}
