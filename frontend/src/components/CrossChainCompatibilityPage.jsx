import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ChangeNowWidget from './ChangeNowWidget';

const CrossChainCompatibilityPage = () => {
    const [activeFuture, setActiveFuture] = useState(0);
    const [activePaymentMethod, setActivePaymentMethod] = useState('venmo'); // Default to Venmo

    // Removed futureFeatures as the section is now "Future Enhancements"
    // Removed supportedNetworks as the section is now "Current Network Compatibility"

    // Payment methods - Updated to reflect current functionality
    const paymentMethods = [
        {
            id: 'venmo',
            name: 'Venmo',
            description: 'Leverage the crypto features within the Venmo app to purchase crypto, which you can then send to Kasportal for swapping.',
            steps: [
                'Purchase crypto using the crypto feature in the Venmo app.',
                'Send the purchased crypto from your Venmo account to your Kasportal wallet address.',
                'Use our universal swap router within Kasportal to exchange your crypto for any supported cryptocurrency.',
                'Send the swapped crypto to any address on any supported blockchain network.'
            ]
        },
        {
            id: 'cashapp',
            name: 'Cash App',
            description: 'Utilize the crypto features within the Cash App to buy crypto, which can then be transferred to Kasportal for seamless swapping.',
            steps: [
                'Purchase crypto using the crypto feature in the Cash App.',
                'Send the purchased crypto from your Cash App account to your Kasportal wallet address.',
                'Use our universal swap router within Kasportal to exchange your crypto for any supported cryptocurrency.',
                'Send the swapped crypto to any address on any supported blockchain network.'
            ]
        },
        {
            id: 'paypal',
            name: 'PayPal',
            description: 'Use the crypto features available in the PayPal app to buy crypto, which you can then send to Kasportal for cross-chain swaps.',
            steps: [
                'Purchase crypto using the crypto feature in the PayPal app.',
                'Send the purchased crypto from your PayPal account to your Kasportal wallet address.',
                'Use our universal swap router within Kasportal to exchange your crypto for any supported cryptocurrency.',
                'Send the swapped crypto to any address on any supported blockchain network.'
            ]
        }
    ];

    // Current Networks - Reflecting what is already operational via ChangeNow integration
    const currentNetworks = [
        { name: "Ethereum", status: "Fully Operational" },
        { name: "Solana", status: "Fully Operational" },
        { name: "Binance Smart Chain", status: "Fully Operational" },
        { name: "Polkadot", status: "Fully Operational" },
        { name: "Avalanche", status: "Fully Operational" },
        { name: "Cosmos", status: "Fully Operational" }
        // Note: This list represents networks supported by the integrated swap service (ChangeNow).
        // Direct Kaspa smart contract compatibility is a future goal.
    ];

    const location = useLocation();

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
                {/* Updated Description */}
                <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                    The Kaspa Portal already provides seamless cross-chain functionality today, enabling you to swap between Kaspa and virtually any other cryptocurrency with our fully operational cross-chain technology. Our platform breaks down barriers between blockchains, allowing for effortless asset transfers across the crypto ecosystem.
                </p>
            </header>

            {/* Cross-Chain Swap Integration - NEW */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Universal Cross-Chain Swapping (Available Now)</h2>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-green-400 mb-4">Swap Any Cryptocurrency</h3>
                            <p className="text-gray-300 mb-6">
                                Kasportal's advanced cross-chain technology is already implemented and fully functional, allowing you to exchange virtually any cryptocurrency for any other cryptocurrency, regardless of their native blockchains. Our integration handles all the complex cross-chain operations behind the scenes.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="mt-1 mr-3 text-green-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white">Already Supporting 900+ cryptocurrencies across all major blockchain networks</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mt-1 mr-3 text-green-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white">Automated best-rate finding ensures you get the most favorable exchange rates</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mt-1 mr-3 text-green-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white">No account creation required - connect your wallet and start swapping immediately</p>
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

                        {/* Live Swap Widget */}
                        <div className="relative rounded-xl overflow-hidden bg-black/50 border border-green-500/20 p-6 flex items-center justify-center">
                            <ChangeNowWidget
                                from="btc"
                                to="kas"
                                amount="0.1"
                                darkMode={true}
                                backgroundColor="000000"
                                primaryColor="22C55E"
                                height="400px"
                                width="100%"
                            />

                            {/* Animated Particles */}
                            {[...Array(8)].map((_, i) => (
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

                    <p className="text-center text-gray-300">
                        Experience cross-chain swapping right now - no additional setup required.
                        Simply specify the cryptocurrencies you want to exchange and provide your wallet addresses.
                    </p>
                </div>
            </section>


            {/* Digital Payment Integration Section - NEW */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Digital Payment Integration (Available Now)</h2>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                    <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                        Kasportal already bridges traditional finance and cryptocurrencies through the crypto features of popular payment platforms. By using the crypto sections of apps like Venmo, Cash App, and PayPal, you can:
                    </p>
                    <div className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Purchase crypto through these platforms</li>
                            <li>Use our swap router to send your crypto to any blockchain</li>
                            <li>Complete the entire process with just input and output addresses</li>
                        </ol>
                    </div>


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
                                    <h3 className="text-xl font-bold text-green-400 mb-4">How It Works Today with {method.name}</h3>
                                    <p className="text-gray-300 mb-6">{method.description}</p>

                                    {/* Removed Benefits section as it's less about direct integration benefits */}
                                </div>

                                {/* Process Steps */}
                                <div className="bg-black/40 border border-green-500/20 rounded-lg p-6">
                                    <h4 className="font-medium text-white mb-4">Steps</h4>
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
                                            * This process utilizes the existing crypto features within the {method.name} app and Kasportal's universal swap. It is not a direct API integration with {method.name}'s payment system.
                                        </p>
                                        {/* Removed Connect button as it's not a direct connection */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="text-gray-300 mt-8 text-center max-w-3xl mx-auto">
                        Our system enables true cross-chain functionality while utilizing familiar payment interfaces, making the process simple and accessible for everyone.
                    </p>
                </div>
            </section>


            {/* Current Network Compatibility Section - NEW */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Current Network Compatibility</h2>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentNetworks.map((network, index) => (
                            <div
                                key={index}
                                className="bg-black/60 border border-green-500/20 rounded-lg p-5 group hover:border-green-400/40 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">{network.name}</h3>
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2 ${network.status === 'Fully Operational' ? 'bg-green-400' : ''}`}></div>
                                    <span className="text-gray-400 text-sm">{network.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-gray-400 text-center text-sm">
                        <p>Compatibility with these networks is currently facilitated through our integrated universal swap technology. Direct smart contract level bridging with Kaspa is a future development goal.</p>
                    </div>

                    {/* Visual showing all connected networks with "Connected" status indicators - Placeholder */}
                    <div className="mt-8 text-center text-gray-500">
                        [Visual showing all connected networks with "Connected" status indicators - Placeholder]
                    </div>
                </div>
            </section>


            {/* How Our Cross-Chain Technology Works Section - NEW */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">How Our Cross-Chain Technology Works</h2>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                    <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                        Our implemented cross-chain technology utilizes a sophisticated routing system to ensure seamless asset transfers:
                    </p>
                    <div className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                        <ol className="list-decimal list-inside space-y-2">
                            <li>User initiates a cross-chain transaction in Kasportal</li>
                            <li>Our router identifies the optimal path between chains</li>
                            <li>Transaction processing happens behind the scenes</li>
                            <li>Recipient receives the funds in their desired cryptocurrency</li>
                        </ol>
                    </div>
                    <p className="text-gray-300 mt-8 text-center max-w-3xl mx-auto">
                        This technology maintains the security and integrity of all connected blockchains while enabling true interoperability today.
                    </p>
                </div>
            </section>


            {/* Future Enhancements Section - NEW */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Future Enhancements</h2>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                    <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                        While our cross-chain capabilities are already robust and functional, we're continuing to enhance the technology with:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Re-purposing the old futureFeatures data for this section */}
                        <div className="text-center">
                            <div className="text-green-400 mb-3">
                                <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 4H9C8.44772 4 8 4.44772 8 5V7H16V5C16 4.44772 15.5523 4 15 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 14L12 17L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-white mb-2">Faster Transaction Processing</h3>
                            <p className="text-gray-400 text-sm">Through optimized routing and integration improvements.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 mb-3">
                                <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 16L3 12L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-white mb-2">Expanded Asset Support</h3>
                            <p className="text-gray-400 text-sm">For emerging tokens and chains as they become available.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 mb-3">
                                <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 19C21 20.1046 19.6569 21 18 21C16.3431 21 15 20.1046 15 19C15 17.8954 16.3431 17 18 17C19.6569 17 21 17.8954 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 5C21 6.10457 19.6569 7 18 7C16.3431 7 15 6.10457 15 5C15 3.89543 16.3431 3 18 3C19.6569 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 5C9 6.10457 7.65685 7 6 7C4.34315 7 3 6.10457 3 5C3 3.89543 4.34315 3 6 3C7.65685 3 9 3.89543 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 7L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 17L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-white mb-2">Lower Fees</h3>
                            <p className="text-gray-400 text-sm">Through continued routing optimizations and partnerships.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 mb-3">
                                <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.63623 5.63623L8.46482 8.46482" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.5355 15.5355L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.63623 18.364L8.46482 15.5355" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.5355 8.46482L18.364 5.63623" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-white mb-2">Advanced Analytics</h3>
                            <p className="text-gray-400 text-sm">For detailed insights into cross-chain transaction flows.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Call to action */}
            <div className="text-center mt-16 mb-16">
                <div className="mb-6 text-gray-300">
                    Ready to experience seamless cross-chain interactions?
                </div>
                <Link
                    to="/portal" // Assuming /portal is the path to the swap interface
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20"
                >
                    Enter the Portal
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

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
