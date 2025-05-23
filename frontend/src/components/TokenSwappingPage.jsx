import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Info, ExternalLink, RefreshCw, ChevronDown, Home, Repeat, Wallet, Link2, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChangeNowWidget from './ChangeNowWidget';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeSwitcher from './ThemeSwitcher';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';

const TokenSwappingPage = ({ isWidgetMode = false }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const { theme, themeData } = useTheme();

    const [recentSwaps, setRecentSwaps] = useState([
        { id: 'SW-289341', from: 'BTC', to: 'KAS', status: 'completed', time: '12m ago', amount: '0.012', received: '4389.52' },
        { id: 'SW-289216', from: 'ETH', to: 'KAS', status: 'completed', time: '2h ago', amount: '0.35', received: '12492.81' },
        { id: 'SW-288917', from: 'USDT', to: 'KAS', status: 'completed', time: '5h ago', amount: '250.00', received: '9873.45' },
    ]);

    // Popular swap pairs
    const popularPairs = [
        { from: 'BTC', to: 'KAS', color: 'from-orange-400 to-yellow-500' },
        { from: 'ETH', to: 'KAS', color: 'from-blue-400 to-purple-500' },
        { from: 'USDT', to: 'KAS', color: 'from-green-400 to-emerald-500' },
        { from: 'BNB', to: 'KAS', color: 'from-yellow-400 to-orange-500' },
        { from: 'KAS', to: 'BTC', color: 'from-teal-400 to-purple-500' }
    ];

    // Widget config state
    const [widgetConfig, setWidgetConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01',
        backgroundColor: '121212',
        darkMode: true,
        primaryColor: '2DD4BF'
    });

    // Define navigation protocols for FuturisticNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'analytics', label: 'Analytics', path: '/features/advanced-analytics', icon: <Wallet size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    const [activeProtocol, setActiveProtocol] = useState('swap');

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

        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const handlePairSelect = (from, to) => {
        setWidgetConfig(prev => ({
            ...prev,
            from,
            to
        }));
    };

    if (isWidgetMode) {
        return (
            <div className="w-full h-full p-0">
                <div className="relative w-full h-full">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded-xl z-20">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-2 border-teal-400/20 border-t-teal-400 rounded-full animate-spin mb-4"></div>
                                <p className="text-teal-400">Loading exchange rates...</p>
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
                        height="600px"
                        width="100%"
                    />
                </div>
            </div>
        );
    }

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
                        Token Swapping
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up-delay">
                        Seamlessly exchange cryptocurrencies with our quantum-powered swap engine.
                        Fast, secure, and with no registration required.
                    </p>
                </div>

                {/* Popular Pairs Section */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            Popular Trading Pairs
                        </h2>
                        <p className="text-lg text-gray-400 animate-fade-in-up-delay">
                            Quick access to the most traded cryptocurrency pairs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4">
                        {popularPairs.map((pair, index) => (
                            <button
                                key={index}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handlePairSelect(pair.from.toLowerCase(), pair.to.toLowerCase())}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${pair.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10 text-center">
                                    <div className={`text-lg font-bold bg-gradient-to-r ${pair.color} bg-clip-text text-transparent mb-2`}>
                                        {pair.from}
                                    </div>
                                    <div className="text-gray-400 text-sm mb-2">→</div>
                                    <div className="text-lg font-bold text-teal-400">
                                        {pair.to}
                                    </div>
                                </div>

                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pair.color} p-[1px]`}>
                                        <div className="w-full h-full bg-gray-900/90 rounded-2xl"></div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Swap Widget Section */}
                <section className="mb-20">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-500 relative overflow-hidden">
                        {/* Corner decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-400/10 rounded-full"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-400/5 rounded-full"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                                    Quantum Swap Engine
                                </h2>

                                <div className="flex items-center space-x-4">
                                    <button
                                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 p-3 rounded-full hover:bg-teal-400/10"
                                        title="Refresh rates"
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                    <button
                                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 p-3 rounded-full hover:bg-teal-400/10"
                                        title="Swap information"
                                    >
                                        <Info size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Widget */}
                            <div className="relative mb-6 min-h-96">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded-xl z-20">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 border-2 border-teal-400/20 border-t-teal-400 rounded-full animate-spin mb-4"></div>
                                            <p className="text-teal-400">Initializing quantum swap engine...</p>
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
                </section>

                {/* Features Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            Why Choose Our Swap Engine?
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Experience the next generation of cryptocurrency trading with our advanced features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Quantum Speed',
                                description: 'Lightning-fast swaps completed in under 15 minutes with our quantum-inspired routing algorithms.',
                                icon: <RefreshCw className="w-8 h-8" />,
                                color: 'from-teal-400 to-blue-500'
                            },
                            {
                                title: 'Zero Registration',
                                description: 'No KYC, no accounts, no hassle. Just connect your wallet and start swapping instantly.',
                                icon: <Wallet className="w-8 h-8" />,
                                color: 'from-teal-500 to-purple-500'
                            },
                            {
                                title: 'Best Rates Guaranteed',
                                description: 'Our AI aggregates rates from 50+ exchanges to ensure you always get the best deal.',
                                icon: <ArrowRight className="w-8 h-8" />,
                                color: 'from-teal-300 to-purple-400'
                            },
                            {
                                title: '900+ Cryptocurrencies',
                                description: 'Swap between any of 900+ supported cryptocurrencies including all major coins and tokens.',
                                icon: <Link2 className="w-8 h-8" />,
                                color: 'from-teal-600 to-purple-700'
                            },
                            {
                                title: 'Military-Grade Security',
                                description: 'Non-custodial swaps with multi-signature validation and quantum-resistant encryption.',
                                icon: <HelpCircle className="w-8 h-8" />,
                                color: 'from-teal-400 to-purple-600'
                            },
                            {
                                title: '24/7 Support',
                                description: 'Round-the-clock customer support via live chat to help with any questions or issues.',
                                icon: <Info className="w-8 h-8" />,
                                color: 'from-teal-500 to-purple-500'
                            }
                        ].map((feature, index) => (
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

                {/* How It Works */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            How Quantum Swapping Works
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Our advanced swap protocol makes cryptocurrency trading simple and secure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Select Tokens',
                                description: 'Choose your source and destination cryptocurrencies from our extensive list of 900+ supported tokens.',
                                color: 'from-teal-400 to-blue-500'
                            },
                            {
                                step: '02',
                                title: 'AI Rate Discovery',
                                description: 'Our quantum AI scans 50+ exchanges in real-time to find the best possible exchange rate for your trade.',
                                color: 'from-teal-500 to-purple-500'
                            },
                            {
                                step: '03',
                                title: 'Instant Execution',
                                description: 'Complete your swap in under 15 minutes with our lightning-fast execution engine and receive your tokens.',
                                color: 'from-teal-300 to-purple-400'
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10 text-center">
                                    <div className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-6`}>
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

                {/* FAQ Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Everything you need to know about our quantum swap engine.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "How long does a swap take to complete?",
                                answer: "Most swaps are completed within 5-15 minutes thanks to our quantum-inspired routing algorithms. Kaspa transactions are typically even faster due to the network's high throughput capabilities."
                            },
                            {
                                question: "Are there any swap limits?",
                                answer: "Basic swaps have no upper limits. However, very large transactions may require additional verification steps in accordance with regulatory requirements."
                            },
                            {
                                question: "What fees are associated with swapping?",
                                answer: "The exchange rate you see includes all fees. There are no hidden fees or additional charges. The rate includes network transaction fees and a small service fee."
                            },
                            {
                                question: "Is my personal information required?",
                                answer: "For basic swaps, only your receiving wallet address is required. No personal information or account creation is needed."
                            },
                            {
                                question: "What if my swap is taking longer than expected?",
                                answer: "Transactions may occasionally take longer due to network congestion. You can check the status of your swap using the transaction ID provided. If a swap is pending for over 2 hours, please contact our 24/7 support."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-500">
                                <details className="group">
                                    <summary className="flex justify-between items-center p-6 cursor-pointer">
                                        <h3 className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">{faq.question}</h3>
                                        <ChevronDown size={20} className="text-teal-400 group-open:transform group-open:rotate-180 transition-transform duration-300" />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-400 border-t border-gray-800/50">
                                        <p className="pt-4">{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-20">
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Ready to Experience Quantum Trading?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
                            Join thousands of traders who trust our quantum-powered swap engine for their cryptocurrency exchanges.
                        </p>
                        <Link
                            to="/features/cross-chain-compatibility"
                            className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Explore Cross-Chain
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

export default TokenSwappingPage;
