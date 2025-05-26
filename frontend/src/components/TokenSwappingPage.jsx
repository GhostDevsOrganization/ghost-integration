import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Info, ExternalLink, RefreshCw, ChevronDown, Home, Repeat, Wallet, Link2, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChangeNowWidget from './ChangeNowWidget';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeSwitcher from './ThemeSwitcher';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import QuantumBackground from './3D/QuantumBackground';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import USDTIcon from './USDTIcon';
import BNBIcon from './BNBIcon';
import KASIcon from './KASIcon';

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

    // Widget config state
    const [widgetConfig, setWidgetConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01',
        backgroundColor: 'ffffff',
        darkMode: false,
        primaryColor: '2DD4BF'
    });

    // Define navigation protocols for FuturisticNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
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
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl z-20">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-2 border-teal-400/20 border-t-teal-400 rounded-full animate-spin mb-4"></div>
                                <p className="text-teal-600 font-medium">Loading exchange rates...</p>
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

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Page Header - Enhanced Typography */}
                <div className="mb-24 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up leading-tight">
                        Token Swapping
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up-delay px-4 leading-relaxed font-medium">
                        Seamlessly exchange cryptocurrencies with our advanced swap engine.
                        Fast, secure, and with no registration required.
                    </p>
                </div>

                {/* Popular Pairs Section - Clean White Cards */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Popular Trading Pairs
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 animate-fade-in-up-delay px-4 font-medium">
                            Quick access to the most traded cryptocurrency pairs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                        {popularPairs.map((pair, index) => (
                            <button
                                key={index}
                                className="group relative bg-white/95 backdrop-blur-lg border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-teal-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in-up shadow-xl grid place-items-center"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handlePairSelect(pair.from.toLowerCase(), pair.to.toLowerCase())}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${pair.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    {/* From Token */}
                                    <div className="flex flex-col items-center mb-4">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            {pair.fromIcon}
                                        </div>
                                        <div className={`text-lg sm:text-xl font-bold ${pair.fromColor}`}>
                                            {pair.from}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="text-gray-400 text-sm mb-4 group-hover:text-teal-500 transition-colors duration-300">
                                        <ArrowRight size={16} className="mx-auto" />
                                    </div>

                                    {/* To Token */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            {pair.toIcon}
                                        </div>
                                        <div className={`text-lg sm:text-xl font-bold ${pair.toColor}`}>
                                            {pair.to}
                                        </div>
                                    </div>
                                </div>

                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${pair.color} p-[2px]`}>
                                        <div className="w-full h-full bg-white rounded-3xl"></div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Advanced Swap Engine Section - Prominent Separation */}
                <section className="mb-32">
                    <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-8 sm:p-12 hover:border-teal-300 hover:shadow-2xl transition-all duration-500 relative overflow-hidden shadow-xl">
                        {/* Corner decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-100/50 rounded-full"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-100/30 rounded-full"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12 gap-6">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        Advanced Swap Engine
                                    </h2>
                                    <p className="text-lg text-gray-600 font-medium">
                                        Experience lightning-fast cryptocurrency exchanges with our cutting-edge technology
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button
                                        className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-4 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                                        title="Refresh rates"
                                    >
                                        <RefreshCw size={24} />
                                    </button>
                                    <button
                                        className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-4 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                                        title="Swap information"
                                    >
                                        <Info size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Widget */}
                            <div className="relative mb-8 min-h-96 bg-gray-50/50 rounded-2xl p-4">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl z-20">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6"></div>
                                            <p className="text-teal-600 text-lg font-semibold">Initializing advanced swap engine...</p>
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

                {/* Features Section - Clean White Cards */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Why Choose Our Swap Engine?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Experience the next generation of cryptocurrency trading with our advanced features.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        {[
                            {
                                title: 'Lightning Speed',
                                description: 'Lightning-fast swaps completed in under 15 minutes with our advanced routing algorithms.',
                                icon: <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                title: 'Zero Registration',
                                description: 'No KYC, no accounts, no hassle. Just connect your wallet and start swapping instantly.',
                                icon: <Wallet className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-600 to-purple-600'
                            },
                            {
                                title: 'Best Rates Guaranteed',
                                description: 'Our AI aggregates rates from 50+ exchanges to ensure you always get the best deal.',
                                icon: <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-400 to-purple-500'
                            },
                            {
                                title: '900+ Cryptocurrencies',
                                description: 'Swap between any of 900+ supported cryptocurrencies including all major coins and tokens.',
                                icon: <Link2 className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-700 to-purple-700'
                            },
                            {
                                title: 'Military-Grade Security',
                                description: 'Non-custodial swaps with multi-signature validation and advanced encryption.',
                                icon: <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-500 to-purple-600'
                            },
                            {
                                title: '24/7 Support',
                                description: 'Round-the-clock customer support via live chat to help with any questions or issues.',
                                icon: <Info className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-600 to-purple-600'
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-8 sm:p-10 hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in-up shadow-lg"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${feature.color} w-fit mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-teal-700 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works - Clean Design */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            How Token Swapping Works
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Our advanced swap protocol makes cryptocurrency trading simple and secure.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                        {[
                            {
                                title: 'Select Tokens',
                                description: 'Choose your source and destination cryptocurrencies from our extensive list of 900+ supported tokens.',
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                title: 'AI Rate Discovery',
                                description: 'Our advanced AI scans 50+ exchanges in real-time to find the best possible exchange rate for your trade.',
                                color: 'from-teal-600 to-purple-600'
                            },
                            {
                                title: 'Instant Execution',
                                description: 'Complete your swap in under 15 minutes with our lightning-fast execution engine and receive your tokens.',
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

                {/* FAQ Section - Clean White Design */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Everything you need to know about our advanced swap engine.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            {
                                question: "How long does a swap take to complete?",
                                answer: "Most swaps are completed within 5-15 minutes thanks to our advanced routing algorithms. Kaspa transactions are typically even faster due to the network's high throughput capabilities."
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
                            <div key={index} className="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-300 hover:shadow-lg transition-all duration-500 shadow-md">
                                <details className="group">
                                    <summary className="flex justify-between items-center p-6 sm:p-8 cursor-pointer">
                                        <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 text-lg sm:text-xl pr-4">{faq.question}</h3>
                                        <ChevronDown size={24} className="text-teal-600 group-open:transform group-open:rotate-180 transition-transform duration-300 flex-shrink-0" />
                                    </summary>
                                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-600 border-t border-gray-100">
                                        <p className="pt-6 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-16 sm:py-24">
                    <div className="relative px-4">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up">
                            Ready to Experience Advanced Trading?
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up-delay font-medium leading-relaxed">
                            Join thousands of traders who trust our advanced swap engine for their cryptocurrency exchanges.
                        </p>
                        <Link
                            to="/features/cross-chain-compatibility"
                            className="group relative inline-flex items-center gap-4 px-12 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full font-bold text-white text-xl sm:text-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                Explore Cross-Chain
                                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                                <div className="w-full h-full bg-white rounded-full"></div>
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
