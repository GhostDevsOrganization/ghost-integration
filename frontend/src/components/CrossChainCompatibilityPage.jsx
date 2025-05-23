import React, { useState, useEffect } from 'react';
import { ArrowLeft, Link2, Zap, Shield, Globe, CheckCircle, ArrowRight, Home, Repeat, BookOpen, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';

const CrossChainCompatibilityPage = () => {
    const [activeProtocol, setActiveProtocol] = useState('crosschain');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    // Define navigation protocols
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'analytics', label: 'Analytics', path: '/features/advanced-analytics', icon: <Wallet size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    const supportedChains = [
        {
            name: 'Kaspa',
            symbol: 'KAS',
            description: 'Ultra-fast BlockDAG architecture with instant confirmations',
            status: 'live',
            color: 'from-teal-400 to-emerald-500',
            features: ['Instant Transactions', 'High Throughput', 'Low Fees']
        },
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            description: 'The original cryptocurrency with proven security',
            status: 'live',
            color: 'from-orange-400 to-yellow-500',
            features: ['Store of Value', 'Network Security', 'Global Adoption']
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            description: 'Smart contract platform with extensive DeFi ecosystem',
            status: 'live',
            color: 'from-blue-400 to-purple-500',
            features: ['Smart Contracts', 'DeFi Ecosystem', 'NFT Support']
        },
        {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
            description: 'Fast and low-cost alternative to Ethereum',
            status: 'live',
            color: 'from-yellow-400 to-orange-500',
            features: ['Low Fees', 'Fast Transactions', 'EVM Compatible']
        },
        {
            name: 'Polygon',
            symbol: 'MATIC',
            description: 'Layer 2 scaling solution for Ethereum',
            status: 'live',
            color: 'from-purple-400 to-pink-500',
            features: ['Layer 2 Scaling', 'Low Fees', 'Ethereum Compatible']
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            description: 'High-performance blockchain for DeFi and Web3',
            status: 'coming-soon',
            color: 'from-green-400 to-teal-500',
            features: ['High Performance', 'Low Latency', 'Web3 Ready']
        }
    ];

    const bridgeFeatures = [
        {
            title: 'Instant Cross-Chain Swaps',
            description: 'Execute cross-chain transactions in seconds, not minutes. Our quantum-inspired bridge technology ensures near-instantaneous asset transfers.',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-teal-400 to-purple-600'
        },
        {
            title: 'Military-Grade Security',
            description: 'Multi-signature validation and quantum-resistant encryption protect your assets during cross-chain transfers.',
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

            <FuturisticNav
                protocols={protocols}
                activeProtocol={activeProtocol}
            />

            <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-12">
                {/* Page Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                        Cross Chain Compatibility
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up-delay">
                        Bridge the gap between blockchains with our revolutionary cross-chain infrastructure.
                        Seamlessly transfer assets across multiple networks with quantum-level security.
                    </p>
                </div>

                {/* Bridge Features */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            Next-Generation Bridge Technology
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Experience the future of cross-chain interoperability with our cutting-edge bridge protocol.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {bridgeFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} p-[1px]`}>
                                        <div className="w-full h-full bg-gray-900/90 rounded-2xl"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supported Chains */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            Supported Blockchain Networks
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Connect and transfer assets across the most popular blockchain networks with ease.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supportedChains.map((chain, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${chain.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${chain.color} text-white text-sm font-medium`}>
                                            {chain.symbol}
                                        </div>
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${chain.status === 'live'
                                            ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                                            }`}>
                                            {chain.status === 'live' ? 'Live' : 'Coming Soon'}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                                        {chain.name}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                                        {chain.description}
                                    </p>

                                    <div className="space-y-2">
                                        {chain.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                                                <span className="text-xs text-gray-400">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            How Cross-Chain Bridging Works
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Our advanced bridge protocol makes cross-chain transfers simple and secure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Select Networks',
                                description: 'Choose your source and destination blockchain networks from our supported list.',
                                color: 'from-teal-400 to-blue-500'
                            },
                            {
                                step: '02',
                                title: 'Lock & Verify',
                                description: 'Your assets are securely locked on the source chain and verified by our validator network.',
                                color: 'from-teal-500 to-purple-500'
                            },
                            {
                                step: '03',
                                title: 'Mint & Transfer',
                                description: 'Equivalent assets are minted on the destination chain and transferred to your wallet.',
                                color: 'from-teal-300 to-purple-400'
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10 text-center">
                                    <div className={`text-4xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-20">
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Ready to Bridge the Future?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Experience seamless cross-chain transfers with our revolutionary bridge technology.
                        </p>
                        <Link
                            to="/features/token-swapping"
                            className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Start Bridging
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                                <div className="w-full h-full bg-black rounded-full"></div>
                            </div>
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
        </div>
    );
};

export default CrossChainCompatibilityPage;
