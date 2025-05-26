import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import QuantumPortal from './QuantumPortal';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import FeatureCard from './FeatureCard';
import HolographicStats from './HolographicStats';
import QuantumBackground from './3D/QuantumBackground';
import MEVProtectionVisual from './3D/MEVProtectionVisual';
import EnhancedIPhoneMockup from './EnhancedIPhoneMockup';
import {
  SwapIcon,
  WalletIcon,
  LearnIcon,
  HomeIcon,
  CrossChainIcon,
  PaymentIcon,
  MobileIcon,
  SmartContractIcon,
  AIIcon,
  EmailIcon,
  DiscordIcon,
  DocsIcon,
  BusinessIcon
} from './CryptoIcons';
import {
  ApplePayIcon,
  VisaIcon,
  MastercardIcon,
  MobileWalletIcon
} from './EnhancedPaymentIcons';

export default function LandingPage() {
  const navigate = useNavigate();
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
      description: "Cross-chain token exchanges with best-rate routing and minimal fees through our advanced swap aggregator.",
      icon: <SwapIcon size={24} className="drop-shadow-lg" />,
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Cross-Chain Support",
      route: "/features/cross-chain-compatibility",
      description: "Unified wallet management system enabling simultaneous control of multiple blockchain assets with enterprise-grade security.",
      icon: <WalletIcon size={24} className="drop-shadow-lg" />,
      comingSoon: true,
      color: "from-teal-400 to-purple-600"
    },
    {
      title: "Learn",
      route: "/learn",
      description: "Comprehensive educational platform exploring Kaspa's revolutionary BlockDAG architecture and cutting-edge innovations.",
      icon: <LearnIcon size={24} className="drop-shadow-lg" />,
      color: "from-teal-600 to-purple-700"
    }
  ];

  const protocols = [
    { key: 'home', label: 'Home', path: '/', icon: <HomeIcon size={18} className="drop-shadow-sm" /> },
    { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <SwapIcon size={18} className="drop-shadow-sm" /> },
    { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <CrossChainIcon size={18} className="drop-shadow-sm" /> },
    { key: 'learn', label: 'Learn', path: '/learn', icon: <LearnIcon size={18} className="drop-shadow-sm" /> }
  ];

  const paymentMethods = [
    {
      name: 'Apple Pay',
      icon: <PaymentIcon size={32} className="text-amber-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Visa',
      icon: <PaymentIcon size={32} className="text-blue-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Mastercard',
      icon: <PaymentIcon size={32} className="text-red-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-red-400 to-pink-500'
    },
    {
      name: 'Mobile Wallet',
      icon: <MobileIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      status: 'Coming Q3 2025',
      gradient: 'from-teal-400 to-cyan-500'
    }
  ];

  const roadmapPhases = [
    {
      phase: "Q2 2025",
      title: "Payment Gateway Launch",
      description: "Apple Pay, Visa, and Mastercard integration goes live. One-click crypto purchases with traditional payment methods.",
      icon: <PaymentIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      color: "from-teal-400 to-purple-600",
      delay: "0s"
    },
    {
      phase: "Q3 2025",
      title: "Mobile App Release",
      description: "Full-featured mobile app with instant on-ramping, portfolio management, and seamless swapping.",
      icon: <MobileIcon size={32} className="text-purple-400 drop-shadow-xl" />,
      color: "from-teal-500 to-purple-500",
      delay: "0.2s"
    },
    {
      phase: "Q4 2025",
      title: "Smart Contract Utilities",
      description: "Token utilization framework launches, enabling advanced DeFi interactions and governance features.",
      icon: <SmartContractIcon size={32} className="text-cyan-400 drop-shadow-xl" />,
      color: "from-teal-300 to-purple-400",
      delay: "0.4s"
    },
    {
      phase: "Q1 2026",
      title: "AI NFT Ecosystem",
      description: "Machine learning NFTs and token-bound NFT platform goes live with full marketplace integration.",
      icon: <AIIcon size={32} className="text-pink-400 drop-shadow-xl" />,
      color: "from-teal-600 to-purple-700",
      delay: "0.6s"
    }
  ];

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help with technical issues, account questions, or general inquiries",
      icon: <EmailIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      contact: "support@kasportal.com",
      action: "mailto:support@kasportal.com",
      color: "from-teal-400 to-blue-500"
    },
    {
      title: "Community Discord",
      description: "Join our vibrant community for real-time discussions and updates",
      icon: <DiscordIcon size={32} className="text-purple-400 drop-shadow-xl" />,
      contact: "Join Discord",
      action: "#",
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and API documentation for developers",
      icon: <DocsIcon size={32} className="text-cyan-400 drop-shadow-xl" />,
      contact: "View Docs",
      action: "/learn",
      color: "from-teal-300 to-purple-400"
    },
    {
      title: "Business Inquiries",
      description: "Partnership opportunities and enterprise solutions",
      icon: <BusinessIcon size={32} className="text-indigo-400 drop-shadow-xl" />,
      contact: "business@kasportal.com",
      action: "mailto:business@kasportal.com",
      color: "from-teal-600 to-purple-700"
    }
  ];

  useEffect(() => {
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

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
      {/* Add 3D Background */}
      <QuantumBackground />

      {/* Clean light background with subtle gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-teal-100 to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-bl from-purple-100 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-blue-100 to-transparent" style={{ animationDelay: '2s' }}></div>
        </div>
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.03), transparent 70%)`,
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full animate-float bg-teal-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <FuturisticNav
        protocols={protocols}
        activeProtocol={activeProtocol}
        onProtocolClick={handleProtocolChange}
      />

      <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left relative z-10 order-2 lg:order-1">
              <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12 rounded-3xl bg-white backdrop-blur-2xl border border-gray-200 shadow-2xl hover:shadow-xl hover:border-teal-300 transition-all duration-700 group">
                <div className="flex justify-center lg:justify-start mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up">
                  <div className="relative group">
                    <img
                      src="/kasportal-logo.svg"
                      alt="Kasportal Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 hover:scale-110 transition-transform duration-500 drop-shadow-2xl relative z-10"
                    />
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl relative z-10 leading-tight">
                  Kasportal
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text mb-4 sm:mb-6 animate-fade-in-up drop-shadow-lg relative z-10 leading-tight font-medium">
                  Building the Future of Finance
                </p>
                <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in-up-delay backdrop-blur-sm relative z-10 leading-relaxed px-2 sm:px-0 text-gray-600 font-medium">
                  Bridging traditional payment systems with blockchain technology. From Apple Pay to smart contract utilities, we're making crypto accessible via web browser.
                </p>

                <button
                  className="mt-4 sm:mt-6 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-bold text-white text-lg sm:text-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 animate-fade-in-up-delay-2 group relative overflow-hidden border border-white/30 backdrop-blur-sm w-full sm:w-auto"
                  onClick={handleEnterPortal}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
                    Enter Portal
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center relative order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                <div className="relative w-full">
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
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up drop-shadow-xl">
              Seamless Payment Integration
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto animate-fade-in-up-delay leading-relaxed text-gray-600 font-medium">
              Buy crypto with the payment methods you already use every day
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 px-4">
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <ApplePayIcon size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-xl" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Apple Pay</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <VisaIcon size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-xl" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Visa</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <MastercardIcon size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-xl" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Mastercard</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <MobileWalletIcon size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-xl" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Mobile Wallet</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q3 2025</p>
            </div>
          </div>
        </section>

        {/* Enhanced iPhone Mockup Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up drop-shadow-xl">
              🚀 Mobile Experience - Coming Soon!
            </h2>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-lg sm:text-xl lg:text-2xl shadow-lg animate-pulse">
                FEATURE IN DEVELOPMENT
              </span>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto animate-fade-in-up-delay leading-relaxed text-gray-600 font-medium">
              Track our progress building the future of mobile DeFi with KAS Coin integration, Apple Pay, Visa, and Mastercard support. Expected launch Q3 2025.
            </p>
          </div>

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 mx-4 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center overflow-hidden">
              <div className="w-full max-w-4xl">
                <EnhancedIPhoneMockup />
              </div>
            </div>
          </div>
        </section>

        <HolographicStats />

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Core Features
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Explore our comprehensive suite of blockchain tools and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4">
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

        {/* Add MEV Protection Visual */}
        <MEVProtectionVisual />

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Development Roadmap
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Our journey to revolutionize decentralized finance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200">
                  {phase.icon}
                </div>
                <div className="text-lg text-teal-600 font-bold mb-3 text-center">{phase.phase}</div>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">{phase.title}</h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Need help or have questions? We're here to support you on your crypto journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer w-full"
                onClick={() => handleContactClick(method.action)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200 relative z-10">
                  <div className="text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                    {method.icon}
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-teal-700 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6 text-lg">
                    {method.description}
                  </p>
                  <div className="text-teal-600 font-bold group-hover:text-teal-700 transition-colors duration-300 text-lg">
                    {method.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <EnhancedFooter />

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-up-delay { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}</style>
    </div>
  );
}
