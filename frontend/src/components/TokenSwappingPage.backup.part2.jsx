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
                style={{ animationDuration: '20s' }}></div>
            <div className="absolute top-1/2 left-1/2 h-px w-[150vh] bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                style={{ animationDuration: '20s' }}></div>

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
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Token Swapping</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Seamlessly swap between a wide range of cryptocurrencies directly within the Kaspa Portal. Our integration with a leading swapping service allows you to exchange assets across different blockchain networks quickly and securely.
            </p>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-4 pb-20">
            {/* Swap Component Integration */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Universal Token Swapping (Available Now)</h2>
                <div className="rounded-lg overflow-hidden">
                    <div className="bg-black border border-green-500/20 p-0 rounded-lg">
                        <SwapComponent onClose={() => { }} />
                    </div>
                </div>
            </section>

            {/* Interactive process visualization */}
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>

                {/* Steps Navigation */}
                <div className="flex justify-between items-center mb-8 relative">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative z-10 flex flex-col items-center cursor-pointer transition-all duration-300 ${index <= activeStep ? 'opacity-100' : 'opacity-40'}`}
                            onClick={() => setActiveStep(index)}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${index === activeStep
                                ? 'bg-green-500 text-black'
                                : index < activeStep
                                    ? 'bg-green-700 text-white'
                                    : 'bg-black border border-green-500/40 text-green-400'
                                }`}>
                                {index < activeStep ? (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                            <span className="text-xs text-center max-w-[80px] md:max-w-[120px] hidden md:block">{step.title}</span>
                        </div>
                    ))}

                    {/* Connecting line */}
                    <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-green-500 to-green-500 transform -translate-y-1/2 -z-0">
                        <div
                            className="h-full bg-green-400"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%`, transition: 'width 0.5s ease-in-out' }}
                        ></div>
                    </div>
                </div>

                {/* Current Step Details */}
                <div className="bg-black/40 border border-green-500/20 rounded-lg p-6 transition-all duration-500">
                    <div className="flex items-center mb-4">
                        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mr-4 text-green-400">
                            {steps[activeStep].icon}
                        </div>
                        <h3 className="text-xl font-bold text-green-400">{steps[activeStep].title}</h3>
                    </div>
                    <p className="text-gray-300">{steps[activeStep].description}</p>

                    {/* Step navigation buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            className={`px-4 py-2 rounded border border-green-500/40 text-sm ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500/10'}`}
                            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                            disabled={activeStep === 0}
                        >
                            Previous
                        </button>

                        <button
                            className={`px-4 py-2 rounded bg-green-500 text-black text-sm ${activeStep === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400'}`}
                            onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                            disabled={activeStep === steps.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">Available Trading Pairs</h3>
                    <p className="text-gray-300 mb-4">
                        Our token swapping feature provides access to a vast number of trading pairs, allowing you to exchange between:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                            <span>Popular cryptocurrencies (BTC, ETH, LTC, etc.)</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                            <span>Stablecoins (USDT, USDC, DAI, etc.)</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                            <span>Kaspa (KAS) and KRC-20 tokens</span>
                        </li>
                        <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                            <span>Various altcoins across multiple blockchain networks</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">Features & Benefits</h3>
                    <div className="space-y-4">
                        <div className="flex">
                            <div className="mr-3 text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Speed & Efficiency</h4>
                                <p className="text-gray-300 text-sm">Fast transactions with automatic rate calculations</p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mr-3 text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Security</h4>
                                <p className="text-gray-300 text-sm">No need to create accounts on external exchanges</p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mr-3 text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Simplicity</h4>
                                <p className="text-gray-300 text-sm">User-friendly interface without complex order books</p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mr-3 text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Variety</h4>
                                <p className="text-gray-300 text-sm">Access to numerous cryptocurrencies across multiple networks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to action */}
            <div className="text-center mt-16">
                <a
                    href="#"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20"
                >
                    Try Token Swapping
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                <p className="text-gray-400 mt-4">
                    Experience the easiest way to exchange cryptocurrencies on Kasportal
                </p>
            </div>
        </main>

        {/* Custom animations */}
        <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(3px, 3px); }
          50% { transform: translate(5px, -5px); }
        }
      `}</style>
    </div>
);
};

export default TokenSwappingPage;
