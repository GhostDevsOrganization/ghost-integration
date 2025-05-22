import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Info, ExternalLink, RefreshCw, ChevronDown, Home, Repeat, Wallet, Link2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChangeNowWidget from './ChangeNowWidget';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeSwitcher from './ThemeSwitcher';
import TraditionalNav from './TraditionalNav';

const TokenSwappingPage = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [loading, setLoading] = useState(true);
    const { theme, themeData } = useTheme();
    const [recentSwaps, setRecentSwaps] = useState([
        { id: 'SW-289341', from: 'BTC', to: 'KAS', status: 'completed', time: '12m ago', amount: '0.012', received: '4389.52' },
        { id: 'SW-289216', from: 'ETH', to: 'KAS', status: 'completed', time: '2h ago', amount: '0.35', received: '12492.81' },
        { id: 'SW-288917', from: 'USDT', to: 'KAS', status: 'completed', time: '5h ago', amount: '250.00', received: '9873.45' },
    ]);

    // Popular swap pairs
    const popularPairs = [
        { from: 'BTC', to: 'KAS' },
        { from: 'ETH', to: 'KAS' },
        { from: 'USDT', to: 'KAS' },
        { from: 'BNB', to: 'KAS' },
        { from: 'KAS', to: 'BTC' }
    ];

    // Widget config state
    // Define theme-specific colors
    const themeColors = {
        accentColor: theme === 'dark' ? 'green' : 'blue',
        accentHex: theme === 'dark' ? '4ADE80' : '3B82F6',
        glowColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        borderColor: theme === 'dark' ? 'border-green-400/10' : 'border-blue-400/10',
        textAccent: theme === 'dark' ? 'text-green-400' : 'text-blue-400',
        hoverAccent: theme === 'dark' ? 'hover:text-green-400' : 'hover:text-blue-400',
        bgAccent: theme === 'dark' ? 'bg-green-400' : 'bg-blue-400',
        bgAccentHover: theme === 'dark' ? 'hover:bg-green-500/20' : 'hover:bg-blue-500/20',
        bgAccentTransparent: theme === 'dark' ? 'bg-green-500/10' : 'bg-blue-500/10',
        gradientFrom: theme === 'dark' ? 'from-green-400' : 'from-blue-400',
        gradientTo: theme === 'dark' ? 'to-emerald-500' : 'to-cyan-500'
    };

    // Widget config state
    const [widgetConfig, setWidgetConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01',
        backgroundColor: '121212',
        darkMode: theme === 'dark',
        primaryColor: themeColors.accentHex
    });

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handlePairSelect = (from, to) => {
        setWidgetConfig(prev => ({
            ...prev,
            from,
            to
        }));
    };

    // Define navigation protocols for TraditionalNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'wallet', label: 'Multi-Wallet Support', path: '/features/multi-wallet-support', icon: <Wallet size={18} /> },
        { key: 'crosschain', label: 'Cross-Chain Compatibility', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    const [activeProtocol, setActiveProtocol] = useState(protocols[0].key);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Glow effect */}
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30"
                    style={{ background: themeColors.glowColor }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full filter blur-3xl opacity-20"
                    style={{ background: themeColors.glowColor }}
                ></div>

                {/* Grid overlay */}
                <div className="absolute inset-0 grid-bg opacity-10"></div>
            </div>

            {/* Consistent Navigation Bar */}
            <TraditionalNav
                protocols={protocols}
                activeProtocol={activeProtocol}
            />

            {/* Page-specific sub-navigation */}
            <div className="bg-black/60 backdrop-blur-sm px-6 py-2 border-b border-green-400/10">
                <div className="max-w-6xl mx-auto flex justify-end">
                    <div className="flex items-center space-x-6">
                        <a href="#faq" className="text-gray-400 hover:text-green-400 transition-colors duration-200">FAQ</a>
                        <Link to="/portal" className="token-swapping-portal-link px-4 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-400/30 rounded-md text-green-400 transition-colors duration-200">
                            Enter Portal
                        </Link>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-12">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 inline-block mb-4">
                        Token Swapping
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Seamlessly exchange Kaspa with other cryptocurrencies. Fast, secure, and with no registration required.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column - Widget */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/40 rounded-2xl p-6 backdrop-blur-sm border border-green-400/10 shadow-lg shadow-black/40 relative overflow-hidden">
                            {/* Corner decoration */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400/10 rounded-full"></div>
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-green-400/5 rounded-full"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold text-white">Swap Tokens</h2>

                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="text-gray-400 hover:text-green-400 transition-colors duration-200 p-2"
                                            title="Refresh rates"
                                        >
                                            <RefreshCw size={18} />
                                        </button>
                                        <button
                                            className="text-gray-400 hover:text-green-400 transition-colors duration-200 p-2"
                                            title="Swap information"
                                        >
                                            <Info size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Popular pairs section */}
                                <div className="mb-6">
                                    <div className="flex items-center mb-3">
                                        <span className="text-sm text-gray-400">Popular Pairs</span>
                                        <div className="ml-2 h-px flex-grow bg-gray-700"></div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {popularPairs.map((pair, index) => (
                                            <button
                                                key={index}
                                                className="px-3 py-1.5 bg-green-900/20 hover:bg-green-900/30 rounded-md border border-green-400/20 text-sm flex items-center transition-colors duration-200"
                                                onClick={() => handlePairSelect(pair.from.toLowerCase(), pair.to.toLowerCase())}
                                            >
                                                <span>{pair.from}</span>
                                                <span className="mx-1 text-gray-500">→</span>
                                                <span>{pair.to}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Widget */}
                                <div className="relative mb-6 min-h-80">
                                    {loading ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded-xl z-20">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin mb-4"></div>
                                                <p className="text-green-400">Loading exchange rates...</p>
                                            </div>
                                        </div>
                                    ) : null}

                                    <ChangeNowWidget
                                        from={widgetConfig.from}
                                        to={widgetConfig.to}
                                        amount={widgetConfig.amount}
                                        backgroundColor={widgetConfig.backgroundColor}
                                        darkMode={widgetConfig.darkMode}
                                        primaryColor={widgetConfig.primaryColor}
                                        height="520px"
                                        width="100%"
                                    />
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info and Status */}
                    <div className="space-y-6">
                        {/* Real-time status */}
                        <div className="bg-gray-900/40 rounded-xl p-5 backdrop-blur-sm border border-green-400/10 overflow-hidden relative">
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-green-400/10 rounded-full"></div>

                            <h3 className="text-lg font-semibold mb-4 text-white">Exchange Status</h3>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">All Systems Operational</span>
                                            <span className="text-green-400 text-sm">100%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-green-400 h-full w-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">KAS Network</span>
                                            <span className="text-green-400 text-sm">100%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-green-400 h-full w-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">BTC Network</span>
                                            <span className="text-green-400 text-sm">100%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-green-400 h-full w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-gray-900/40 rounded-xl p-5 backdrop-blur-sm border border-green-400/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <HelpCircle size={18} className="mr-2 text-green-400" />
                                <span>Why Use Our Swap?</span>
                            </h3>

                            <div className="space-y-5">
                                {/* Enhanced Existing Benefits */}
                                <div>
                                    <h4 className="text-sm font-medium text-green-300 mb-2">Enhanced Existing Benefits</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">No registration or KYC required - Swap instantly with complete privacy and skip time-consuming verification processes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Best aggregated rates guaranteed - Our system automatically compares multiple exchanges to find you the most favorable exchange rate</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Fast transactions under 15 minutes - Complete swaps in a fraction of the time compared to traditional exchanges that can take hours</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Support for 900+ cryptocurrencies - Including all major coins and KRC20 tokens for maximum flexibility</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">24/7 customer support via live chat - Get help whenever you need it</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* New Core Benefits */}
                                <div>
                                    <h4 className="text-sm font-medium text-green-300 mb-2">New Core Benefits</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Streamlined swapping process - Complete complex trades in just 2-3 clicks instead of 10+ steps on traditional exchanges</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">100% non-custodial operation - You maintain full control of your funds throughout the entire swapping process</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Seamless bridging capability - Bridge any of 900+ currencies to Kaspa and KRC20 tokens all within one intuitive interface</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Advanced Platform Features */}
                                <div>
                                    <h4 className="text-sm font-medium text-green-300 mb-2">Advanced Platform Features</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Fintech integration - Connect with Venmo, Cash App, and PayPal crypto sections for seamless fiat-to-crypto onboarding</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Multi-wallet compatibility - Use MetaMask, Raydium, and other popular wallets directly within our portal for maximum flexibility</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Complete on-ramping & off-ramping - Buy crypto with fiat and cash out to traditional currencies all in one platform</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                                <span className="text-green-400 text-xs">✓</span>
                                            </div>
                                            <span className="text-gray-300 text-sm">Blockchain ecosystem gateway - Navigate from point A to Z across any blockchain faster, cheaper, and more securely than traditional methods</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* FAQ Section */}
                <section id="faq" className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 inline-block">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                question: "How long does a swap take to complete?",
                                answer: "Most swaps are completed within 5-30 minutes depending on network congestion. Kaspa transactions are typically faster due to the network's high throughput capabilities."
                            },
                            {
                                question: "Are there any swap limits?",
                                answer: "Basic swaps have no upper limits. However, very large transactions may require additional verification steps in accordance with regulatory requirements."
                            },
                            {
                                question: "What fees are associated with swapping?",
                                answer: "The exchange rate you see includes all fees. There are no hidden fees or additional charges. The rate includes the network transaction fees and a small service fee."
                            },
                            {
                                question: "Is my personal information required?",
                                answer: "For basic swaps, only your receiving wallet address is required. No personal information or account creation is needed."
                            },
                            {
                                question: "What if my swap is taking longer than expected?",
                                answer: "Transactions may occasionally take longer due to network congestion. You can check the status of your swap using the transaction ID provided. If a swap is pending for over 2 hours, please contact support."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-900/20 border border-green-400/10 rounded-lg overflow-hidden">
                                <details className="group">
                                    <summary className="flex justify-between items-center p-5 cursor-pointer">
                                        <h3 className="font-medium text-white">{faq.question}</h3>
                                        <ChevronDown size={18} className="text-green-400 group-open:transform group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="p-5 pt-0 text-gray-400 text-sm border-t border-gray-800">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-green-400/10 mt-24 py-12 bg-black/80 backdrop-blur-sm relative">
                <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex justify-center items-center mb-6">
                        <div className="text-2xl font-bold">
                            <span className="text-green-400">Kas</span>
                            <span className="text-white">portal</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">
                        Kasportal is a community-built platform for Kaspa token management and exchange.
                        Not affiliated with the Kaspa Foundation. All trades are executed via third-party providers.
                    </p>

                    <div className="flex justify-center space-x-8 text-sm">
                        <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</Link>
                        <a href="https://kaspa.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors flex items-center">
                            Kaspa.org
                            <ExternalLink size={14} className="ml-1" />
                        </a>
                    </div>

                    <div className="mt-8 text-gray-600 text-xs">
                        © {new Date().getFullYear()} Ghost Devs. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Global styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 10px); }
        }
        
        .grid-bg {
          background-image:
            linear-gradient(to right, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}} />
        </div>
    );
};

export default TokenSwappingPage;
