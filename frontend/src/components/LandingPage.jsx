import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import QuantumPortal from './QuantumPortal';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import FeatureCard from './FeatureCard';
import HolographicGrid from './3D/HolographicGrid';
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
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import USDTIcon from './USDTIcon';
import BNBIcon from './BNBIcon';
import KASIcon from './KASIcon';

export default function LandingPage() {
  const navigate = useNavigate();
  const { themeData } = useTheme();
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
      title: "Instant Cross-Chain Swaps",
      description: "Seamlessly exchange assets across multiple blockchains with near-instant finality",
      icon: <SwapIcon size={32} className="text-teal-400" />,
      gradient: "from-teal-400 to-purple-500"
    },
    {
      title: "MEV Protection",
      description: "Advanced transaction bundling to prevent front-running and sandwich attacks",
      icon: <SmartContractIcon size={32} className="text-purple-400" />,
      gradient: "from-purple-400 to-teal-500"
    },
    {
      title: "Multi-Chain Wallet",
      description: "Unified interface for managing assets across all supported networks",
      icon: <WalletIcon size={32} className="text-cyan-400" />,
      gradient: "from-cyan-400 to-teal-500"
    }
  ];

  const protocols = [
    { key: 'home', label: 'Home', path: '/', icon: <HomeIcon size={18} className="drop-shadow-sm" /> },
    { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <SwapIcon size={18} className="drop-shadow-sm" /> },
    { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <CrossChainIcon size={18} className="drop-shadow-sm" /> },
    { key: 'learn', label: 'Learn', path: '/learn', icon: <LearnIcon size={18} className="drop-shadow-sm" /> }
  ];

  // Popular swap pairs with brand-specific colors
  const popularPairs = [
    {
      from: 'BTC',
      to: 'KAS',
      fromIcon: <BitcoinIcon size={48} style={{ color: '#F7931A' }} />,
      toIcon: <KASIcon size={48} style={{ color: '#70C7BA' }} />, // Official Kaspa primary color
      color: 'from-orange-400 to-teal-400',
      fromColor: 'text-orange-500',
      toColor: 'text-teal-400'
    },
    {
      from: 'ETH',
      to: 'KAS',
      fromIcon: <EthereumIcon size={48} style={{ color: '#627EEA' }} />,
      toIcon: <KASIcon size={48} style={{ color: '#70C7BA' }} />, // Official Kaspa primary color
      color: 'from-blue-400 to-teal-400',
      fromColor: 'text-blue-500',
      toColor: 'text-teal-400'
    },
    {
      from: 'KAS',
      to: 'BTC',
      fromIcon: <KASIcon size={48} style={{ color: '#70C7BA' }} />, // Official Kaspa primary color
      toIcon: <BitcoinIcon size={48} style={{ color: '#F7931A' }} />,
      color: 'from-teal-400 to-orange-500',
      fromColor: 'text-teal-400',
      toColor: 'text-orange-500'
    }
  ];
  const paymentMethods = [
    {
      name: 'Apple Pay',
      icon: <ApplePayIcon size={32} className="text-amber-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Visa',
      icon: <VisaIcon size={32} className="text-blue-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Mastercard',
      icon: <MastercardIcon size={32} className="text-red-400 drop-shadow-xl" />,
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
        navigate('/portal/interdimensional');
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

  const handlePairSelect = (from, to) => {
    navigate('/features/token-swapping');
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
      {/* Add 3D Background */}
      <HolographicGrid themeData={themeData} performanceMode="high" />

      {/* Clean light background with subtle gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-teal-100 to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-bl from-purple-100 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-blue-100 to-transparent" style={{ animationDelay: '2s' }}></div>
        </div>
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
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 hover:scale-105 transition-transform duration-500 drop-shadow-2xl relative z-10"
                    />
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl relative z-10 leading-tight overflow-visible py-2">
                  Kasportal
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text mb-4 sm:mb-6 animate-fade-in-up drop-shadow-lg relative z-10 leading-normal font-medium overflow-visible py-1">
                  Building the Future of Finance
                </p>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in-up-delay backdrop-blur-sm relative z-10 leading-relaxed px-2 sm:px-0 text-gray-600 font-medium overflow-visible">
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
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
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
        {/* Core Features Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Swap Pairs Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Popular Swap Pairs
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Effortless exchanges between leading cryptocurrencies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4">
            {popularPairs.map((pair, index) => (
              <div
                key={index}
                className={`group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full cursor-pointer`}
                onClick={() => handlePairSelect(pair.from, pair.to)}
              >
                <div className="flex items-center justify-center mb-8">
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-purple-100 border border-teal-200 shadow-lg">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                      {pair.fromIcon}
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                      {pair.toIcon}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  <span className={`${pair.fromColor}`}>{pair.from}</span> to <span className={`${pair.toColor}`}>{pair.to}</span>
                </h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg">
                  Swap {pair.from} for {pair.to} instantly with competitive rates.
                </p>
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-bold text-white text-base shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                    Swap Now <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Payment Gateway Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Enhanced Payment Gateway
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Seamlessly bridge traditional finance with crypto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">{method.name}</h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg">{method.status}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Innovation Features Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Innovation Features
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Driving the next generation of blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 px-4">
            <div className="relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl hover:border-teal-300 transition-all duration-500 group">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">MEV Protection</h3>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                Our advanced transaction bundling and ordering mechanisms protect users from malicious Maximal Extractable Value (MEV) attacks, ensuring fair and secure transactions.
              </p>
              <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <MEVProtectionVisual />
              </div>
            </div>
            <div className="relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl hover:border-teal-300 transition-all duration-500 group">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Cross-Chain Interoperability</h3>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                Seamlessly interact with assets and applications across multiple blockchain networks, breaking down silos and fostering a truly interconnected crypto ecosystem.
              </p>
              <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {/* Placeholder for Cross-Chain Visual */}
                <CrossChainIcon size={96} className="text-teal-400 opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Preview Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Mobile App Preview
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Your entire crypto world, in your pocket
            </p>
          </div>
          <div className="flex justify-center items-center px-4">
            <EnhancedIPhoneMockup />
          </div>
        </section>

        {/* Development Roadmap Section */}
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

        {/* Contact Us Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Contact Us
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              We're here to help and connect
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full cursor-pointer"
                onClick={() => handleContactClick(method.action)}
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">{method.title}</h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg mb-4">{method.description}</p>
                <div className="text-center">
                  <span className="text-teal-600 font-semibold text-lg hover:underline">
                    {method.contact}
                  </span>
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
