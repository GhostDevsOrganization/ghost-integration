import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import QuantumPortal from './QuantumPortal';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import FeatureCard from './FeatureCard';

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
import TwitterIcon from './TwitterIcon';
import TelegramIcon from './TelegramIcon';
import {
  ApplePayIcon,
  VisaIcon,
  MastercardIcon,
  MobileWalletIcon,
  VenmoIcon,
  CashAppIcon,
  PayPalIcon
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
      title: "Swap",
      route: "/features/token-swapping",
      description: "Send assets from and to your wallets accross any network. \n Enterprise-grade security. \n Wrap and unwrap with ease.",
      icon: <SwapIcon size={24} className="drop-shadow-lg" />,
      color: "from-teal-500 to-purple-500"
    },

    {
      title: "Learn",
      route: "/learn",
      description: "Educational platform exploring Kaspa's revolutionary BlockDAG technology and Projects to follow.",

      icon: <LearnIcon size={24} className="drop-shadow-lg" />,
      color: "from-teal-600 to-purple-700"
    },
    {
      title: "Explore",
      route: "/portal",
      description: "Our interactive portal. \n Discover the future of blockchain technology.",
      icon: <WalletIcon size={24} className="drop-shadow-lg" />,
      comingSoon: false,
      color: "from-teal-400 to-purple-600"
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
      toIcon: <KASIcon size={48} style={{ color: '#00D632' }} />,
      color: 'from-orange-400 to-green-500',
      fromColor: 'text-orange-500',
      toColor: 'text-green-500'
    },
    {
      from: 'ETH',
      to: 'KAS',
      fromIcon: <EthereumIcon size={48} style={{ color: '#627EEA' }} />,
      toIcon: <KASIcon size={48} style={{ color: '#00D632' }} />,
      color: 'from-blue-400 to-green-500',
      fromColor: 'text-blue-500',
      toColor: 'text-green-500'
    },
    {
      from: 'KAS',
      to: 'BTC',
      fromIcon: <KASIcon size={48} style={{ color: '#00D632' }} />,
      toIcon: <BitcoinIcon size={48} style={{ color: '#F7931A' }} />,
      color: 'from-green-400 to-orange-500',
      fromColor: 'text-green-500',
      toColor: 'text-orange-500'
    }
  ];

  const paymentMethods = [
    {
      name: 'Your Wallet',
      icon: <MobileIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      status: 'Any Wallet, Available Now',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      name: 'Apple Pay',
      icon: <PaymentIcon size={32} className="text-amber-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Visa',
      icon: <PaymentIcon size={320} className="text-blue-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Mastercard',
      icon: <PaymentIcon size={200} className="text-red-400 drop-shadow-xl" />,
      status: 'Coming Q2 2025',
      gradient: 'from-red-400 to-pink-500'
    }
  ]; const roadmapPhases = [
    {
      phase: "Q2 2025",
      title: "Payment Gateway Launch",
      description: "Apple Pay, Visa, and Mastercard integration. Simply purchase with tradfi payment methods.",

      icon: <PaymentIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      color: "from-teal-400 to-purple-600",
      delay: "0s"
    },
    {
      phase: "Q3 2025",
      title: "Mobile App Release",
      description: "Mobile app to simplify your portal experience and seamless swapping.",

      icon: <MobileIcon size={32} className="text-purple-400 drop-shadow-xl" />,
      color: "from-teal-500 to-purple-500",
      delay: "0.2s"
    },
    {
      phase: "Q4 2025",
      title: "Smart Contract Utilities",
      description: "Tokenization, DeFi interactions and governance features.",
      icon: <SmartContractIcon size={32} className="text-cyan-400 drop-shadow-xl" />,
      color: "from-teal-300 to-purple-400",
      delay: "0.4s"
    },
    {
      phase: "Q1 2026",
      title: "NFT Expansion",
      description: " Launch portal to new worlds of NFT projects and possibilities.",

      icon: <AIIcon size={32} className="text-pink-400 drop-shadow-xl" />,
      color: "from-teal-600 to-purple-700",
      delay: "0.6s"
    }
  ];

  const contactMethods = [
    {
      title: "Follow Us",
      description: "The latest news and public announcements",
      icon: <TwitterIcon size={32} className="text-blue-400 drop-shadow-xl" />,
      contact: "@Kasportal",
      action: "https://x.com/kasportal",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Find Community",
      description: "Join us for real-time discussions and updates",
      icon: <TelegramIcon size={32} className="text-purple-400 drop-shadow-xl" />,
      contact: "Telegram",
      action: "https://t.me/+ogluJ3Srnr83MmJh",
      color: "from-teal-500 to-purple-500"
    },
    {
      title: "Need Something?",
      description: "Technical issues or general inquiries",
      icon: <EmailIcon size={32} className="text-teal-400 drop-shadow-xl" />,
      contact: "Email",
      action: "mailto:support@ghostdevlabs.com",
      color: "from-teal-400 to-blue-500"
    },
    {
      title: "Team Up",
      description: "You want it? Lets build a portal to it",
      icon: <BusinessIcon size={32} className="text-indigo-400 drop-shadow-xl" />,
      contact: "Lets build",
      action: "mailto:buildtech@ghostdevlabs.com",
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

                  </div>
                </div>


                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl relative z-10 leading-tight overflow-visible py-2">
                  Kasportal
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text mb-4 sm:mb-6 animate-fade-in-up drop-shadow-lg relative z-10 leading-normal font-medium overflow-visible py-1">
                  Crypto Exploration. On-Chain and Beyond.
                </p>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in-up-delay backdrop-blur-sm relative z-10 leading-relaxed px-2 sm:px-0 text-gray-600 font-medium overflow-visible">
                  Your portal from traditional finance to blockchain technology, making crypto accessible to everyone

                </p>

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
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Send, Swap, Discover
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 auto-rows-fr">
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

        {/* Soon Come Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up drop-shadow-xl">
              🚀 Coming Soon!
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto animate-fade-in-up-delay leading-relaxed text-gray-600 font-medium">
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 px-4">
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <MobileWalletIcon size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-xl" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Your Wallet</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium"> Every Wallet, Supported Now.  </p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <div className="w-8 h-8 flex items-center justify-center">
                  <ApplePayIcon size={32} className="drop-shadow-xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">ApplePay</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <div className="w-8 h-8 flex items-center justify-center">
                  <VisaIcon size={32} className="drop-shadow-xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Visa</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
            <div className="group text-center p-6 sm:p-8 lg:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <div className="w-8 h-8 flex items-center justify-center">
                  <MastercardIcon size={32} className="drop-shadow-xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10 text-gray-900">Mastercard</h3>
              <p className="text-base sm:text-lg relative z-10 text-gray-600 font-medium">Coming Q2 2025</p>
            </div>
          </div>

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 mx-4 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center overflow-hidden">
              <div className="w-full max-w-4xl">
                <EnhancedIPhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* Development Roadmap Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Development Roadmap
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              Our journey toward decentralized finance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4 auto-rows-fr">
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full flex flex-col"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200">
                  {phase.icon}
                </div>
                <div className="text-lg text-teal-600 font-bold mb-3 text-center">{phase.phase}</div>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">{phase.title}</h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg flex-grow">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-600 font-medium">
              We're here to help you navigate the transition from centralized finance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={() => handleContactClick(method.action)}
                className="group relative p-8 sm:p-10 bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer w-full flex flex-col"
              >
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${method.color}`}></div>

                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl backdrop-blur-sm border border-teal-200">
                  {method.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">{method.title}</h3>
                <p className="text-center leading-relaxed text-gray-600 text-lg mb-6 flex-grow">{method.description}</p>

                <div className="text-center mt-auto">
                  <span className={`inline-block px-6 py-3 bg-gradient-to-r ${method.color} text-white font-bold rounded-full text-lg shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {method.contact}
                  </span>
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
