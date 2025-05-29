import React, { useState, useEffect } from 'react';
import { ArrowLeft, Link2, Zap, Shield, Globe, CheckCircle, ArrowRight, Home, Repeat, BookOpen, Wallet, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import QuantumBackground from './3D/QuantumBackground';
import KASIcon from './KASIcon';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import BNBIcon from './BNBIcon';
import PolygonIcon from './PolygonIcon';
import SolanaIcon from './SolanaIcon';

const CrossChainCompatibilityPage = () => {
    const [activeProtocol, setActiveProtocol] = useState('crosschain');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [activePaymentMethod, setActivePaymentMethod] = useState('venmo');

    // Define navigation protocols
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    const supportedChains = [
        {
            name: 'Kaspa',
            symbol: 'KAS',
            description: 'Ultra-fast BlockDAG architecture with instant confirmations',
            status: 'live',
            color: 'from-teal-400 to-emerald-500',
            features: ['Instant Transactions', 'High Throughput', 'Low Fees'],
            icon: KASIcon
        },
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            description: 'The original cryptocurrency with proven security',
            status: 'live',
            color: 'from-orange-400 to-yellow-500',
            features: ['Store of Value', 'Network Security', 'Global Adoption'],
            icon: BitcoinIcon
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            description: 'Smart contract platform with extensive DeFi ecosystem',
            status: 'live',
            color: 'from-blue-400 to-purple-500',
            features: ['Smart Contracts', 'DeFi Ecosystem', 'NFT Support'],
            icon: EthereumIcon
        },
        {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
            description: 'Fast and low-cost alternative to Ethereum',
            status: 'live',
            color: 'from-yellow-400 to-orange-500',
            features: ['Low Fees', 'Fast Transactions', 'EVM Compatible'],
            icon: BNBIcon
        },
        {
            name: 'Polygon',
            symbol: 'MATIC',
            description: 'Layer 2 scaling solution for Ethereum',
            status: 'live',
            color: 'from-purple-400 to-pink-500',
            features: ['Layer 2 Scaling', 'Low Fees', 'Ethereum Compatible'],
            icon: PolygonIcon
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            description: 'High-performance blockchain for DeFi and Web3',
            status: 'live',
            color: 'from-green-400 to-teal-500',
            features: ['High Performance'],
            icon: SolanaIcon
        }
    ];

    const bridgeFeatures = [
        {
            title: 'Instant Cross-Chain Swaps',
            description: 'Execute cross-chain transactions in seconds, not minutes. Our advanced bridge technology ensures near-instantaneous asset transfers.',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-teal-400 to-purple-600'
        },
        {
            title: 'Military-Grade Security',
            description: 'Multi-signature validation and advanced encryption protect your assets during cross-chain transfers.',
            icon: <Shield className="w-8 h-8" />,
            color: 'from-teal-500 to-purple-500'
        },
        {
            title: 'Universal Compatibility',
            description: 'Connect any blockchain to any blockchain. Our universal adapter protocol supports 900+ cryptocurrencies.',
            icon: <Globe className="w-8 h-8" />,
            color: 'from-teal-300 to-purple-400'
        },
        {
            title: 'Automated Optimization',
            description: 'AI-powered routing finds the best path for your cross-chain transfers, optimizing for speed, cost, and security.',
            icon: <CheckCircle className="w-8 h-8" />,
            color: 'from-teal-600 to-purple-700'
        }
    ];

    const paymentMethods = {
        venmo: {
            name: 'Venmo',
            icon: <Smartphone className="w-6 h-6" />,
            color: 'from-blue-500 to-purple-600',
            benefits: [
                'Instant peer-to-peer transfers',
                'Social payment features',
                'Mobile-first experience',
                'Wide user adoption'
            ],
            steps: [
                'Hit the crypto button on mobile',
                'Select cryptocurrency to reci',
                'Send payment via Venmo',
                'Receive crypto instantly'
            ]
        },
        cashapp: {
            name: 'Cash App',
            icon: <DollarSign className="w-6 h-6" />,
            color: 'from-green-500 to-emerald-600',
            benefits: [
                'Built-in Bitcoin support',
                'Instant transfers',
                'Stock investment integration',
                'Cash Card compatibility'
            ],
            steps: [
                'Link your Cash App account',
                'Choose your crypto asset',
                'Complete payment via Cash App',
                'Assets transferred to wallet'
            ]
        },
        paypal: {
            name: 'PayPal',
            icon: <CreditCard className="w-6 h-6" />,
            color: 'from-blue-600 to-indigo-700',
            benefits: [
                'Global payment acceptance',
                'Buyer protection',
                'Multiple funding sources',
                'Established trust network'
            ],
            steps: [
                'Authorize PayPal connection',
                'Select desired cryptocurrency',
                'Process payment securely',
                'Crypto delivered to your wallet'
            ]
        }
    };


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

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
            {/* Add 3D Background */}
            <QuantumBackground />

            {/* Clean light background with subtle gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-teal-100 to-transparent"></div>
                    <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-bl from-purple-100 to-transparent" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-blue-100 to-transparent" style={{ animationDelay: '2s' }}></div>
                </div>
                <div
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05), transparent 70%)`,
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                    }}
                ></div>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float bg-teal-300/40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <FuturisticNav
                protocols={protocols}
                activeProtocol={activeProtocol}
            />

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
                {/* Page Header - Enhanced Typography */}
                <div className="mb-24 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up leading-tight">
                        Move Crypto Between Any Blockchain
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up-delay px-4 leading-relaxed font-medium">
                        Transfer your assets across Ethereum, Bitcoin, Solana, and 50+ other networks. 
                        One platform, every blockchain.
                    </p>
                </div>

                {/* Digital Payment Integrations - Clean White Cards */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Digital Payment Integrations
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Buy cryptocurrency directly with your favorite payment apps. Fast, secure, and convenient.
                        </p>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-3 flex gap-3 shadow-lg">
                            {Object.entries(paymentMethods).map(([key, method]) => (
                                <button
                                    key={key}
                                    onClick={() => setActivePaymentMethod(key)}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${activePaymentMethod === key
                                        ? `bg-gradient-to-r ${method.color} text-white shadow-lg`
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {method.icon}
                                    {method.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Payment Method Display */}
                    <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-10 hover:border-teal-300 hover:shadow-xl transition-all duration-500 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Benefits */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${paymentMethods[activePaymentMethod].color}`}>
                                        {paymentMethods[activePaymentMethod].icon}
                                    </div>
                                    {paymentMethods[activePaymentMethod].name} Benefits
                                </h3>
                                <div className="space-y-4">
                                    {paymentMethods[activePaymentMethod].benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                            <span className="text-gray-700 text-lg">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Steps */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h3>
                                <div className="space-y-6">
                                    {paymentMethods[activePaymentMethod].steps.map((step, index) => (
                                        <div key={index} className="flex items-start gap-5">
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${paymentMethods[activePaymentMethod].color} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700 pt-2 text-lg">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Supported Chains - Clean White Cards */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Supported Blockchain Networks
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Connect and transfer assets across the most popular blockchain networks with ease.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {supportedChains.map((chain, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-6 sm:p-8 hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in-up shadow-lg"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${chain.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <chain.icon size={40} glow={true} />
                                            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${chain.color} text-white text-sm font-bold`}>
                                                {chain.symbol}
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${chain.status === 'live'
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            {chain.status === 'live' ? 'Live' : 'Coming Soon'}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                                        {chain.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                        {chain.description}
                                    </p>

                                    <div className="space-y-3">
                                        {chain.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works - Clean Design */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            How Cross-Chain Exchange Works
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Our advanced exchange protocol makes cryptocurrency swaps simple and secure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
                        {[
                            {
                                step: '01',
                                title: 'Select Cryptocurrencies',
                                description: 'Choose your source and destination wallet, from cryptocurrencies in our supported list.',
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                step: '02',
                                title: 'Secure Exchange',
                                description: 'Our platform calculates the best rates and executes your exchange securely.',
                                color: 'from-teal-600 to-purple-600'
                            },
                            {
                                step: '03',
                                title: 'Direct Transfer',
                                description: 'Your exchanged cryptocurrency is transferred directly to your wallet --> from your wallet. You hold and control your funds.',
                                color: 'from-teal-400 to-purple-500'
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-8 sm:p-10 hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in-up shadow-lg"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10 text-center">
                                    <div className={`text-5xl sm:text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-6 sm:mb-8`}>
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-teal-700 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-16 sm:py-24">
                    <div className="relative px-4">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up">
                            Ready to Swap?
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up-delay font-medium leading-relaxed">

                        </p>
                        <Link
                            to="/portal/interdimensional"
                            className="group relative inline-flex items-center gap-4 px-12 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full font-bold text-white text-xl sm:text-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-">
                                Enter Portal
                                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        </Link>
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
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-fade-in-up-delay { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-up-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            `}</style>
        </div >
    );
};

export default CrossChainCompatibilityPage;
