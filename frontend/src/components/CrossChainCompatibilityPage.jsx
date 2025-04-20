import React, { useState } from 'react';

const CrossChainCompatibilityPage = () => {
    const [activeFuture, setActiveFuture] = useState(0);
    const [activePaymentMethod, setActivePaymentMethod] = useState('venmo');

    const futureFeatures = [
        {
            title: "Interoperable Asset Transfers",
            description: "Enable the movement of assets between the Kaspa network and other supported blockchains.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 4H9C8.44772 4 8 4.44772 8 5V7H16V5C16 4.44772 15.5523 4 15 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 14L12 17L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Cross-Chain Swaps",
            description: "Facilitate direct swaps between cryptocurrencies on different networks without relying solely on centralized exchanges.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16L3 12L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Access to Broader Ecosystems",
            description: "Connect with decentralized applications and services on other blockchains using your Kaspa Portal.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 19C21 20.1046 19.6569 21 18 21C16.3431 21 15 20.1046 15 19C15 17.8954 16.3431 17 18 17C19.6569 17 21 17.8954 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 5C21 6.10457 19.6569 7 18 7C16.3431 7 15 6.10457 15 5C15 3.89543 16.3431 3 18 3C19.6569 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 5C9 6.10457 7.65685 7 6 7C4.34315 7 3 6.10457 3 5C3 3.89543 4.34315 3 6 3C7.65685 3 9 3.89543 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 7L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 17L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Enhanced Liquidity",
            description: "Improve liquidity for Kaspa and other supported assets through cross-chain interactions.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.63623 5.63623L8.46482 8.46482" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5355 15.5355L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.63623 18.364L8.46482 15.5355" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5355 8.46482L18.364 5.63623" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    // Example blockchain networks to be supported
    const supportedNetworks = [
        { name: "Ethereum", status: "In Development" },
        { name: "Solana", status: "Planned" },
        { name: "Binance Smart Chain", status: "Planned" },
        { name: "Polkadot", status: "Research" },
        { name: "Avalanche", status: "Research" },
        { name: "Cosmos", status: "Research" }
    ];

    // Payment methods
    const paymentMethods = [
        {
            id: 'venmo',
            name: 'Venmo',
            description: 'Connect your Venmo account to easily purchase or sell cryptocurrencies with minimal fees.',
            steps: [
                'Link your Venmo account to Kasportal',
                'Select the cryptocurrency you want to purchase',
                'Choose Venmo as your payment method',
                'Confirm the transaction',
                'Receive your cryptocurrency instantly'
            ]
        },
        {
            id: 'cashapp',
            name: 'Cash App',
            description: 'Use your Cash App balance to quickly acquire cryptocurrencies or cash out your crypto holdings.',
            steps: [
                'Connect your Cash App account to Kasportal',
                'Select buy or sell cryptocurrency',
                'Enter the amount you wish to exchange',
                'Confirm the transaction details',
                'Complete the purchase or sale with one tap'
            ]
        },
        {
            id: 'paypal',
            name: 'PayPal',
            description: 'Leverage your PayPal account for seamless crypto transactions with added buyer and seller protection.',
            steps: [
                'Link your PayPal account to Kasportal',
                'Choose cryptocurrency to buy or sell',
                'Select PayPal as your payment/receiving method',
                'Review and confirm the exchange rates and fees',
                'Complete the transaction securely'
            ]
        }
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
                    style={{ animationDuration: '30s' }}></div>
                <div className="absolute top-1/2 left-1/2 h-px w-[150vh] bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                    style={{ animationDuration: '30s' }}></div>

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

            {/* Header */}
            <header className="pt-20 pb-10 text-center">
                <div className="mb-4 w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-2 border-green-500/40 animate-pulse" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-4 rounded-full border border-green-500/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L12 3M12 3L15 6M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H3M3 12L6 15M3 12L6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 18L12 21M12 21L9 18M12 21L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 12H21M21 12L18 9M21 12L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Cross-Chain Compatibility</span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-6"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                    The Kaspa Portal enables seamless interactions and asset transfers between
                    the Kaspa network and virtually any other blockchain protocol or payment system. Our cross-chain
                    compatibility breaks down barriers and enhances interoperability within the entire financial ecosystem.
                </p>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 pb-20">
                {/* Universal Swap Feature Section - NEW */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Universal Token Swapping</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-green-400 mb-4">Swap Any Cryptocurrency</h3>
                                <p className="text-gray-300 mb-6">
                                    Kasportal's advanced cross-chain technology allows you to exchange virtually any cryptocurrency
                                    for any other cryptocurrency, regardless of their native blockchains. Our platform handles all
                                    the complex cross-chain operations behind the scenes, providing you with a seamless experience.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Support for 100+ cryptocurrencies across major blockchain networks</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Automated best-rate finding to ensure you get the most favorable exchange rates</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">No account creation required - connect your wallet and start swapping</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 text-green-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white">Minimal fees compared to traditional exchanges</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Swap Visualization */}
                            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-green-500/20 p-6 flex items-center justify-center">
                                <div className="w-full max-w-md">
                                    {/* Swap Interface Mockup */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-400">You send</span>
                                                <span className="text-sm text-gray-400">Balance: 0.42 BTC</span>
                                            </div>
                                            <div className="flex bg-black/60 border border-green-500/30 rounded-lg p-3">
                                                <input
                                                    type="text"
                                                    className="bg-transparent text-white flex-grow outline-none"
                                                    placeholder="0.0"
                                                    defaultValue="0.05"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                                                    <span className="font-medium">BTC</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Swap icon */}
                                        <div className="flex justify-center">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500/30 transition-colors">
                                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-400">You receive (estimated)</span>
                                                <span className="text-sm text-gray-400">1 BTC ≈ 64,280 KAS</span>
                                            </div>
                                            <div className="flex bg-black/60 border border-green-500/30 rounded-lg p-3">
                                                <input
                                                    type="text"
                                                    className="bg-transparent text-white flex-grow outline-none"
                                                    placeholder="0.0"
                                                    defaultValue="3,214"
                                                    readOnly
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                                    <span className="font-medium">KAS</span>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                <span>Exchange Rate</span>
                                                <span>1 BTC = 64,280 KAS</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                <span>Network Fee</span>
                                                <span>0.0001 BTC</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>Estimated Arrival</span>
                                                <span>~20 minutes</span>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition-colors">
                                            Swap Now
                                        </button>
                                    </div>
                                </div>

                                {/* Animated Particles */}
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={`swap-particle-${i}`}
                                        className="absolute rounded-full bg-green-400"
                                        style={{
                                            width: `${Math.random() * 4 + 2}px`,
                                            height: `${Math.random() * 4 + 2}px`,
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            opacity: Math.random() * 0.7 + 0.3,
                                            animation: `floatSwap ${Math.random() * 5 + 5}s infinite linear`
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payment Integrations Section - NEW */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Digital Payment Integrations</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                            Kasportal bridges the gap between traditional finance and cryptocurrencies by providing
                            direct integrations with popular payment platforms like Venmo, Cash App, and PayPal.
                            This allows you to easily move between fiat and crypto without leaving the Kasportal interface.
                        </p>

                        {/* Payment Method Selector */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {paymentMethods.map(method => (
                                <button
                                    key={method.id}
                                    className={`px-6 py-3 rounded-lg transition-colors ${activePaymentMethod === method.id
                                            ? 'bg-green-500/20 border border-green-500/50 text-white'
                                            : 'bg-black/40 border border-green-500/20 text-gray-300 hover:bg-black/60'
                                        }`}
                                    onClick={() => setActivePaymentMethod(method.id)}
                                >
                                    {method.name}
                                </button>
                            ))}
                        </div>

                        {/* Payment Method Details */}
                        {paymentMethods.map(method => (
                            <div
                                key={method.id}
                                className={`transition-opacity duration-300 ${activePaymentMethod === method.id ? 'opacity-100' : 'opacity-0 hidden'
                                    }`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Method Information */}
                                    <div>
                                        <h3 className="text-xl font-bold text-green-400 mb-4">{method.name} Integration</h3>
                                        <p className="text-gray-300 mb-6">{method.description}</p>

                                        <div className="bg-black/40 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-medium text-white mb-2">Benefits</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Instant transfers between {method.name} and cryptocurrencies</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Lower fees compared to traditional exchanges</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Secure and familiar payment method</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>No need to use traditional banking rails</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Process Steps */}
                                    <div className="bg-black/40 border border-green-500/20 rounded-lg p-6">
                                        <h4 className="font-medium text-white mb-4">How It Works</h4>
                                        <div className="relative">
                                            {/* Vertical line */}
                                            <div className="absolute left-4 top-0 bottom-0 w-px bg-green-500/30"></div>

                                            {/* Steps */}
                                            <div className="space-y-8">
                                                {method.steps.map((step, index) => (
                                                    <div key={index} className="relative flex items-start pl-12">
                                                        <div className="absolute left-0 rounded-full w-8 h-8 bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                                            {index + 1}
                                                        </div>
                                                        <p>{step}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-green-500/20">
                                            <p className="text-gray-400 text-sm mb-4">
                                                * {method.name} integration is subject to their terms and conditions.
                                                Transaction limits may apply based on your {method.name} account status.
                                            </p>
                                            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition-colors">
                                                Connect {method.name}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Future Possibilities Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Future Possibilities</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Future Feature Selector */}
                        <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                            <div className="space-y-4">
                                {futureFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center
                              ${activeFuture === index
                                                ? 'bg-green-500/10 border border-green-500/30'
                                                : 'hover:bg-black/50'}`}
                                        onClick={() => setActiveFuture(index)}
                                    >
                                        <div className={`mr-4 text-green-400 transition-all duration-300 ${activeFuture === index ? 'scale-110' : ''}`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{feature.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Visualization */}
                        <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 flex items-center justify-center">
                            <div className="py-8 px-6 text-center">
                                <div className="text-green-400 mb-6 transform transition-all duration-500 mx-auto" style={{ scale: 1.5 }}>
                                    {futureFeatures[activeFuture].icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-green-300">{futureFeatures[activeFuture].title}</h3>
                                <p className="text-gray-300 text-lg">{futureFeatures[activeFuture].description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Network Compatibility Map */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Planned Network Compatibility</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {supportedNetworks.map((network, index) => (
                                <div
                                    key={index}
                                    className="bg-black/60 border border-green-500/20 rounded-lg p-5 group hover:border-green-400/40 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">{network.name}</h3>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${network.status === 'In Development' ? 'bg-blue-400' :
                                                network.status === 'Planned' ? 'bg-purple-400' : 'bg-yellow-400'
                                            }`}></div>
                                        <span className="text-gray-400 text-sm">{network.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                                <span>In Development</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                                <span>Planned</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                                <span>Research</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Diagram */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">How Cross-Chain Will Work</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            {/* Kaspa Network */}
                            <div className="w-48 h-48 rounded-full border border-green-500/40 flex items-center justify-center bg-black/60 relative mb-8 md:mb-0">
                                <div className="absolute inset-0 rounded-full border-2 border-green-500/10 animate-ping" style={{ animationDuration: '3s' }}></div>
                                <div className="text-center">
                                    <div className="text-green-400 text-4xl mb-2">K</div>
                                    <div className="text-white font-bold">KASPA</div>
                                    <div className="text-gray-400 text-xs mt-1">Network</div>
                                </div>

                                {/* Connection lines to bridge - only visible on larger screens */}
                                <div className="hidden md:block absolute left-1/2 top-full w-px h-16 bg-gradient-to-b from-green-400/60 to-transparent"></div>
                            </div>

                            {/* Bridge - only visible on larger screens */}
                            <div className="hidden md:flex flex-col items-center justify-center mx-8">
                                <div className="w-32 h-16 border border-green-500/40 rounded-lg bg-black/60 flex items-center justify-center mb-2">
                                    <span className="text-green-300 font-bold">BRIDGE</span>
                                </div>
                                <div className="w-px h-16 bg-gradient-to-b from-green-400/60 to-transparent"></div>
                            </div>

                            {/* Other Networks */}
                            <div className="w-48 h-48 rounded-full border border-blue-500/40 flex items-center justify-center bg-black/60 relative">
                                <div className="absolute inset-0 rounded-full border-2 border-blue-500/10 animate-ping" style={{ animationDuration: '3s' }}></div>
                                <div className="text-center">
                                    <div className="text-blue-400 text-2xl mb-2">E / S / B</div>
                                    <div className="text-white font-bold">OTHER</div>
                                    <div className="text-gray-400 text-xs mt-1">Networks</div>
                                </div>

                                {/* Mobile bridge - only visible on smaller screens */}
                                <div className="md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-4 w-24 h-12 border border-green-500/40 rounded bg-black/60 flex items-center justify-center">
                                    <span className="text-green-300 text-xs font-bold">BRIDGE</span>
                                </div>
                                <div className="md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-green-400/60"></div>
                            </div>
                        </div>

                        {/* Explanation text */}
                        <div className="mt-12 text-gray-300 text-center">
                            <p>Cross-chain functionality is enabled through secure bridge protocols that allow assets to move between Kaspa and other networks. These bridges maintain the security and integrity of all connected blockchains while enabling seamless interoperability.</p>
                        </div>
                    </div>
                </section>

                {/* Development Roadmap */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 text-center">Development Timeline</h2>

                    <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-green-500/30"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                                        <h3 className="text-xl font-bold text-green-300">Research Phase</h3>
                                        <p className="text-gray-300 mt-2">Evaluation of cross-chain technologies and security protocols</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border-4 border-black flex items-center justify-center text-xs text-white">
                                        1
                                    </div>
                                    <div className="pl-12 md:pl-0 md:w-1/2 md:pl-12">
                                        <div className="font-medium text-white">Q2 2025</div>
                                    </div>
                                </div>

                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                                        <h3 className="text-xl font-bold text-green-300">Testnet Integration</h3>
                                        <p className="text-gray-300 mt-2">Initial implementation of cross-chain bridges on testnet with Ethereum</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border-4 border-black flex items-center justify-center text-xs text-white">
                                        2
                                    </div>
                                    <div className="pl-12 md:pl-0 md:w-1/2 md:pl-12">
                                        <div className="font-medium text-white">Q3 2025</div>
                                    </div>
                                </div>

                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                                        <h3 className="text-xl font-bold text-green-300">Beta Release</h3>
                                        <p className="text-gray-300 mt-2">Limited public beta of Ethereum-Kaspa asset transfers</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border-4 border-black flex items-center justify-center text-xs text-white">
                                        3
                                    </div>
                                    <div className="pl-12 md:pl-0 md:w-1/2 md:pl-12">
                                        <div className="font-medium text-white">Q4 2025</div>
                                    </div>
                                </div>

                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                                        <h3 className="text-xl font-bold text-green-300">Full Launch</h3>
                                        <p className="text-gray-300 mt-2">Full support for Ethereum and expansion to additional networks</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border-4 border-black flex items-center justify-center text-xs text-white">
                                        4
                                    </div>
                                    <div className="pl-12 md:pl-0 md:w-1/2 md:pl-12">
                                        <div className="font-medium text-white">Q1 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to action */}
                <div className="text-center mt-16">
                    <div className="mb-6 text-gray-300">
                        Want to stay updated on our cross-chain development progress?
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20"
                    >
                        Join the Developer Newsletter
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
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
        
        @keyframes floatSwap {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
        </div>
    );
};

export default CrossChainCompatibilityPage;