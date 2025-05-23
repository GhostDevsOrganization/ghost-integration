import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Shield, Book, Home, Repeat, Link2, BookOpen, Zap, Brain, Atom, GraduationCap, Wallet, Smartphone, CreditCard, Users, TrendingUp, Code, MessageSquare, FileText, Mail, Phone, MapPin, Send } from 'lucide-react';
import QuantumPortal from './QuantumPortal';
import FuturisticNav from './FuturisticNav';
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
      title: "Token Swapping",
      route: "/features/token-swapping",
      description: "Instant cross-chain token exchanges with best-rate routing and minimal fees through our advanced swap aggregator.",
      icon: <Repeat size={24} />,
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Multi-Wallet Support",
      route: "/features/multi-wallet-support",
      description: "Unified wallet management system enabling simultaneous control of multiple blockchain assets with enterprise-grade security.",
      icon: <Wallet size={24} />,
      comingSoon: true,
      color: "from-teal-400 to-purple-600"
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
    { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
    { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
  ];

  const paymentMethods = [
    { name: 'Apple Pay', icon: '🍎', status: 'Coming Q2 2025' },
    { name: 'Visa', icon: '💳', status: 'Coming Q2 2025' },
    { name: 'Mastercard', icon: '💳', status: 'Coming Q2 2025' },
    { name: 'Mobile Wallet', icon: '📱', status: 'Coming Q3 2025' }
  ];

  const roadmapPhases = [
    {
      phase: "Q2 2025",
      title: "Payment Gateway Launch",
      description: "Apple Pay, Visa, and Mastercard integration goes live. One-click crypto purchases with traditional payment methods.",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-teal-400 to-purple-600",
      delay: "0s"
    },
    {
      phase: "Q3 2025",
      title: "Mobile App Release",
      description: "Full-featured mobile app with instant on-ramping, portfolio management, and seamless swapping.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-teal-500 to-purple-500",
      delay: "0.2s"
    },
    {
      phase: "Q4 2025",
      title: "Smart Contract Utilities",
      description: "Token utilization framework launches, enabling advanced DeFi interactions and governance features.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-teal-300 to-purple-400",
      delay: "0.4s"
    },
    {
      phase: "Q1 2026",
      title: "AI NFT Ecosystem",
      description: "Machine learning NFTs and token-bound NFT platform goes live with full marketplace integration.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-teal-600 to-purple-700",
      delay: "0.6s"
    }
  ];

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help with technical issues, account questions, or general inquiries",
      icon: <Mail className="w-8 h-8" />,
      contact: "support@kasportal.com",
      action: "mailto:support@kasportal.com",
      color: "from-teal-400 to-blue-500"
    },
    {
      title: "Community Discord",
      description: "Join our vibrant community for real-time discussions and updates",
      icon: <MessageSquare className="w-8 h-8" />,
      contact: "Join Discord",
      action: "#",
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and API documentation for developers",
      icon: <FileText className="w-8 h-8" />,
      contact: "View Docs",
      action: "/learn",
      color: "from-teal-300 to-purple-400"
    },
    {
      title: "Business Inquiries",
      description: "Partnership opportunities and enterprise solutions",
      icon: <Send className="w-8 h-8" />,
      contact: "business@kasportal.com",
      action: "mailto:business@kasportal.com",
      color: "from-teal-600 to-purple-700"
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

  const handleContactClick = (action) => {
    if (action.startsWith('mailto:')) {
      window.location.href = action;
    } else if (action.startsWith('/')) {
      navigate(action);
    } else {
      window.open(action, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 w-screen h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-purple-900/30 to-blue-900/30 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.4),transparent_50%)] animate-spin-slow"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="flex flex-col items-center relative z-10">
            <div className="relative mb-8">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-teal-400/40 animate-spin-slow shadow-2xl shadow-teal-400/30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-purple-400/60 animate-spin-reverse shadow-2xl shadow-purple-400/30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-t-2 border-teal-400 animate-spin shadow-2xl shadow-teal-400/50"></div>

              <div className="text-6xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                KAS
              </div>
              <div className="mt-4 text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
                PORTAL
              </div>
            </div>

            <div className="text-sm text-teal-400/90 animate-pulse font-medium tracking-wider">
              Initializing quantum connection...
            </div>

            <div className="mt-4 w-64 h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 shadow-lg">
              <div className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-400 rounded-full animate-loading-bar shadow-lg shadow-teal-400/50"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-purple-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.15),transparent_70%)] transition-all duration-500 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
          }}
        ></div>
      </div>

      <FuturisticNav
        protocols={protocols}
        activeProtocol={activeProtocol}
        onProtocolClick={handleProtocolChange}
      />

      <section className="relative flex min-h-screen items-center justify-center px-4 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left relative z-10 order-2 lg:order-1">
              <div className="relative p-8 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20 group hover:bg-white/10 transition-all duration-700">
                <div className="flex justify-center lg:justify-start mb-8 animate-fade-in-up">
                  <div className="relative group">
                    <img
                      src="/kasportal-logo.svg"
                      alt="Kasportal Logo"
                      className="w-24 h-24 md:w-32 md:h-32 hover:scale-110 transition-transform duration-500 drop-shadow-2xl relative z-10"
                    />
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl relative z-10">
                  Kasportal
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text mb-4 animate-fade-in-up drop-shadow-lg relative z-10">
                  Building the Future of Finance
                </p>
                <p className="text-base md:text-lg text-gray-200/90 max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up-delay backdrop-blur-sm relative z-10 leading-relaxed">
                  Bridging traditional payment systems with blockchain technology. From Apple Pay to smart contract utilities, we're making crypto accessible to everyone.
                </p>

                <button
                  className="mt-4 px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 group relative overflow-hidden border border-white/30 backdrop-blur-sm"
                  onClick={handleEnterPortal}
                >
                  <span className="relative z-10 flex items-center gap-3 text-lg">
                    Enter Portal
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center relative order-1 lg:order-2">
              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <QuantumPortal
                    onEnterPortal={handleEnterPortal}
                    isActive={portalActive}
                    mousePosition={mousePosition}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up drop-shadow-xl">
              Seamless Payment Integration
            </h2>
            <p className="text-xl text-gray-200/90 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
              Buy crypto with the payment methods you already use every day
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl hover:border-teal-400/60 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-2xl shadow-black/30 hover:shadow-teal-500/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 relative z-10 drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500">{method.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{method.name}</h3>
                <p className="text-sm text-gray-400 relative z-10">{method.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-200/90 max-w-3xl mx-auto">
              Explore our comprehensive suite of blockchain tools and services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                route={feature.route}
                color={feature.color}
                comingSoon={feature.comingSoon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Development Roadmap
            </h2>
            <p className="text-xl text-gray-200/90 max-w-3xl mx-auto">
              Our journey to revolutionize decentralized finance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl hover:border-teal-400/60 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-2xl shadow-black/30 hover:shadow-teal-500/30"
                style={{ animationDelay: phase.delay }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  {phase.icon}
                </div>
                <div className="text-sm text-teal-400 font-semibold mb-2 text-center">{phase.phase}</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{phase.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-200/90 max-w-3xl mx-auto">
              Need help or have questions? We're here to support you on your crypto journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl hover:border-teal-400/60 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-2xl shadow-black/30 hover:shadow-teal-500/30 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleContactClick(method.action)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <div className="text-teal-400 group-hover:text-white transition-colors duration-300">
                    {method.icon}
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed mb-4">
                    {method.description}
                  </p>
                  <div className="text-teal-400 font-semibold group-hover:text-white transition-colors duration-300">
                    {method.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  );
}
