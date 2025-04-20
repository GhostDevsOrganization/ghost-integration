import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MultiWalletSupportPage = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const location = useLocation();

    const features = [
        {
            title: "Unified Cross-Chain View",
            description: "See the total value and distribution of your assets across all connected wallets and supported chains in one place.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3H3V10H10V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 3H14V10H21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 14H14V21H21V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 14H3V21H10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Seamless Cross-Chain Operations",
            description: "Initiate swaps and manage assets across different chains directly from the integrated multi-wallet dashboard.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Enhanced Security & Control",
            description: "Connect your wallets using secure and widely supported methods, maintaining full control of your private keys at all times.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Kasware Integration (Current)",
            description: "We currently support seamless integration with the Kasware wallet, providing a direct connection to the Kaspa network.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.09998 8.00001L14.9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.9 8L9.09998 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Expanded Wallet Support (Coming Soon)",
            description: "We are actively working to integrate support for a growing list of popular cryptocurrency wallets to enhance cross-chain capabilities.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H8V20H16V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    // Supported wallets with example logos/names
    const supportedWallets = [
        { name: "Kasware", icon: "💼" },
        { name: "Metamask", icon: "🦊" },
        { name: "Kaspium", icon: "💰" },
        { name: "Raydium", icon: "☀️" },
        { name: "Hardware Wallets", icon: "🔒" },
        { name: "More Coming Soon", icon: "⏳" }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Radar-style background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-green-500/10"></div>

                {/* Scanning line */}
                <div className="absolute top-1/2 left-1/2 h-[150vh] w-px bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                    style={{ animationDuration: '25s' }}></div>
                <div className="absolute top-1/2 left-1/2 h-px w-[150vh] bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                    style={{ animationDuration: '25s' }}></div>

                {/* Small particles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-green-400"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5,
                            animation: `float ${Math.random() * 10 + 10}s infinite linear`
                        }}
                    ></div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-4 pt-4 z-20 relative">
                <Link to="/" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Home</Link>
                <Link to="/portal" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/portal' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Enter Portal</Link>
                <Link to="/features/token-swapping" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/token-swapping' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Token Swapping</Link>
                <Link to="/features/multi-wallet-support" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/multi-wallet-support' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Multi-Wallet Support</Link>
                <Link to="/features/advanced-analytics" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/advanced-analytics' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Advanced Analytics</Link>
                <Link to="/features/cross-chain-compatibility" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/cross-chain-compatibility' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Cross-Chain Compatibility</Link>
            </div>

            {/* Header */}
            <header className="pt-10 pb-10 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Multi-Wallet Support</span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-6"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                    Kasportal's multi-wallet support is a core component of our Phase 1 roadmap, enabling a unified view and management of your assets across different chains. Connect your wallets securely to interact with our growing suite of DeFi simulations and future native protocols.
                </p>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 pb-20">
                {/* Feature highlights section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Key Benefits</h2>

                    {/* Interactive feature selector */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Feature Selector */}
                        <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 h-full">
                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                              ${activeFeature === index
                                                ? 'bg-green-500/10 border border-green-500/30'
                                                : 'hover:bg-black/50'}`}
                                        onClick={() => setActiveFeature(index)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`mr-3 text-green-400 transition-all duration-300 ${activeFeature === index ? 'scale-110' : ''}`}>
                                                {feature.icon}
                                            </div>
                                            <h3 className="font-bold">{feature.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Details */}
                        <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 flex items-center">
                            <div className="py-8 px-6">
                                <div className="text-green-400 mb-6 transform transition-all duration-500" style={{ scale: 1.5 }}>
                                    {features[activeFeature].icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-green-300">{features[activeFeature].title}</h3>
                                <p className="text-gray-300 text-lg">{features[activeFeature].description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wallet Visualization */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Supported Wallets</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {supportedWallets.map((wallet, index) => (
                                <div
                                    key={index}
                                    className="bg-black/60 border border-green-500/20 rounded-lg p-4 flex items-center transition-all duration-300 hover:border-green-400/40 hover:transform hover:scale-105 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-xl mr-4 transition-all duration-300 group-hover:bg-green-500/20">
                                        {wallet.icon}
                                    </div>
                                    <span className="font-medium">{wallet.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center text-gray-400 text-sm">
                            We currently support Kasware wallet integration. More wallets are being added regularly as part of our roadmap!
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">1. Connect Securely</h3>
                                <p className="text-gray-300">Connect your Kasware wallet (and more coming soon) using secure, non-custodial methods.</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 17L12 20L6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 7L12 4L6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">2. View & Simulate</h3>
                                <p className="text-gray-300">See your combined assets and interact with DeFi simulations using your connected wallets.</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">3. Prepare for Native DeFi</h3>
                                <p className="text-gray-300">Your connected wallets will be ready for seamless interaction with native Kaspa DeFi when smart contracts are available.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to action */}
                <div className="text-center mt-16">
                    <a
                        href="#"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20"
                    >
                        Connect Your Kasware Wallet
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <p className="text-gray-400 mt-4">
                        Start managing your Kaspa assets and prepare for the future of DeFi
                    </p>
                </div>
            </main>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(3px, 3px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-3px, 5px); }
        }
      `}</style>
        </div>
    );
};

export default MultiWalletSupportPage;
