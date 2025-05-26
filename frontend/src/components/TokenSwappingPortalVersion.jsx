import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Info, ExternalLink, RefreshCw, ChevronDown, Home, Repeat, Wallet, Link2, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChangeNowWidget from './ChangeNowWidget';
import { useTheme } from '../context/ThemeContext.jsx';
import QuantumBackground from './3D/QuantumBackground';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import USDTIcon from './USDTIcon';
import BNBIcon from './BNBIcon';
import KASIcon from './KASIcon';

const TokenSwappingPortalVersion = () => {
    const [loading, setLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme, themeData } = useTheme();

    // Popular swap pairs with brand-specific colors
    const popularPairs = [
        {
            from: 'BTC',
            to: 'KAS',
            fromIcon: <BitcoinIcon size={40} style={{ color: '#F7931A' }} />,
            toIcon: <KASIcon size={40} style={{ color: '#00D632' }} />,
            color: 'from-orange-400 to-green-500',
            fromColor: 'text-orange-500',
            toColor: 'text-green-500'
        },
        {
            from: 'ETH',
            to: 'KAS',
            fromIcon: <EthereumIcon size={40} style={{ color: '#627EEA' }} />,
            toIcon: <KASIcon size={40} style={{ color: '#00D632' }} />,
            color: 'from-blue-400 to-green-500',
            fromColor: 'text-blue-500',
            toColor: 'text-green-500'
        },
        {
            from: 'USDT',
            to: 'KAS',
            fromIcon: <USDTIcon size={40} />,
            toIcon: <KASIcon size={40} style={{ color: '#00D632' }} />,
            color: 'from-green-400 to-emerald-500',
            fromColor: 'text-green-500',
            toColor: 'text-green-500'
        },
        {
            from: 'BNB',
            to: 'KAS',
            fromIcon: <BNBIcon size={40} />,
            toIcon: <KASIcon size={40} style={{ color: '#00D632' }} />,
            color: 'from-yellow-400 to-green-500',
            fromColor: 'text-yellow-500',
            toColor: 'text-green-500'
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

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
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

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
            {/* Add 3D Background */}
            <QuantumBackground />

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
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float bg-teal-300/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10 p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors duration-200 group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="text-lg font-semibold">Back to Portal</span>
                    </Link>

                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                        Token Swapping
                    </h1>

                    <div className="flex items-center space-x-3">
                        <button
                            className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-3 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                            title="Help"
                        >
                            <HelpCircle size={20} />
                        </button>
                        <button
                            className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-3 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                            title="Information"
                        >
                            <Info size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Popular Pairs Section - Compact for Portal */}
                <section className="mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Popular Trading Pairs
                        </h2>
                        <p className="text-lg text-gray-600 font-medium">
                            Quick access to the most traded cryptocurrency pairs
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                        {popularPairs.map((pair, index) => (
                            <button
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-6 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-md"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handlePairSelect(pair.from.toLowerCase(), pair.to.toLowerCase())}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${pair.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    {/* From Token */}
                                    <div className="flex flex-col items-center mb-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {pair.fromIcon}
                                        </div>
                                        <div className={`text-sm sm:text-base font-bold ${pair.fromColor}`}>
                                            {pair.from}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="text-gray-400 text-xs mb-3 group-hover:text-teal-500 transition-colors duration-300">
                                        <ArrowRight size={14} className="mx-auto" />
                                    </div>

                                    {/* To Token */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {pair.toIcon}
                                        </div>
                                        <div className={`text-sm sm:text-base font-bold ${pair.toColor}`}>
                                            {pair.to}
                                        </div>
                                    </div>
                                </div>

                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pair.color} p-[1px]`}>
                                        <div className="w-full h-full bg-white rounded-2xl"></div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Main Swap Widget Section - Clean and Prominent */}
                <section className="mb-16">
                    <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-6 sm:p-10 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                        {/* Corner decoration */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-100/40 rounded-full"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-100/20 rounded-full"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                        Advanced Swap Engine
                                    </h2>
                                    <p className="text-base sm:text-lg text-gray-600 font-medium">
                                        Lightning-fast cryptocurrency exchanges with cutting-edge technology
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button
                                        className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-3 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                                        title="Refresh rates"
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                    <button
                                        className="text-gray-500 hover:text-teal-600 transition-colors duration-200 p-3 rounded-full hover:bg-teal-50 border border-gray-200 hover:border-teal-300"
                                        title="Swap information"
                                    >
                                        <Info size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Widget */}
                            <div className="relative mb-6 min-h-96 bg-gray-50/30 rounded-2xl p-3">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl z-20">
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                                            <p className="text-teal-600 text-lg font-semibold">Initializing swap engine...</p>
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
                                    height="480px"
                                    width="100%"
                                />
                            </div>

                            {/* Prominent Exchange Button */}
                            <div className="text-center">
                                <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full font-bold text-white text-lg shadow-xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-3">
                                        Exchange Crypto
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features - Compact for Portal */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Why Choose Our Engine?
                        </h2>
                        <p className="text-lg text-gray-600 font-medium">
                            Advanced features for seamless cryptocurrency trading
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Lightning Speed',
                                description: 'Swaps completed in under 15 minutes with advanced routing.',
                                icon: <RefreshCw className="w-6 h-6" />,
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                title: 'Zero Registration',
                                description: 'No KYC required. Connect wallet and start swapping instantly.',
                                icon: <Wallet className="w-6 h-6" />,
                                color: 'from-teal-600 to-purple-600'
                            },
                            {
                                title: 'Best Rates',
                                description: 'AI aggregates 50+ exchanges for optimal exchange rates.',
                                icon: <ArrowRight className="w-6 h-6" />,
                                color: 'from-teal-400 to-purple-500'
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-md"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-12">
                    <div className="relative px-4">
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            Ready for Advanced Trading?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
                            Experience the future of cryptocurrency exchanges with our cutting-edge technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/features/token-swapping"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full font-bold text-white text-lg shadow-xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Full Features
                                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </Link>
                            <Link
                                to="/features/cross-chain-compatibility"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-teal-600 rounded-full font-bold text-teal-600 text-lg hover:bg-teal-600 hover:text-white transition-all duration-500 transform hover:scale-110"
                            >
                                <span className="flex items-center gap-3">
                                    Cross-Chain
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(180deg); }
                }
                
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default TokenSwappingPortalVersion;
