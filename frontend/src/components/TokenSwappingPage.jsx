import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Info, ExternalLink, RefreshCw, ChevronDown, Home, Repeat, Wallet, Link2, BookOpen, ArrowRight } from 'lucide-react';
import { Zap, Shield, Clock, TrendingUp, Activity, Lock, Sparkles } from 'lucide-react';
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
        backgroundColor: 'ffffff', // Dark background
        darkMode: false,          // Force dark mode
        primaryColor: '2DD4BF',
        textColor: '000000'      // White text  
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
                        backgroundColor='white'
                        darkMode='false'
                        primaryColor={widgetConfig.primaryColor}
                        height="1000px"
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
                        Seamlessly exchange cryptocurrencies.
                        Fast, Secure, Non Custodial.
                    </p>
                </div>

                {/* Enhanced Widget Container with Premium Effects */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    {/* 3D Perspective wrapper */}
                    <div className="relative transform-gpu hover:scale-[1.02]  duration-500">

                        {/* Main widget with enhanced wrapper */}
                        <div className="relative">
                            {/* Glow effect container */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-3xl opacity-75 blur-xl animate-pulse"></div>

                            {/* Glass morphism container */}
                            <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                                {/* Animated border gradient */}
                                <div className="absolute inset-0 pointer-events-none rounded-3xl p-[2px] bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 animate-gradient-rotate">
                                    <div className="h-full w-full bg-white rounded-3xl pointer-events-auto"></div>
                                </div>

                                {/* Content wrapper */}
                                <div className="relative z-10">
                                    {/* Premium header with animated elements */}
                                    <div className="relative p-6 sm:p-8 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 overflow-hidden">
                                        {/* Animated wave pattern */}
                                        <div className="absolute inset-0 opacity-20">
                                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
                                                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                                    fill="currentColor" className="text-white/20 animate-wave"></path>
                                            </svg>
                                        </div>

                                        {/* Sparkle effects */}
                                        <div className="absolute inset-0">
                                            {[...Array(15)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute animate-sparkle"
                                                    style={{
                                                        left: `${Math.random() * 100}%`,
                                                        top: `${Math.random() * 100}%`,
                                                        animationDelay: `${Math.random() * 3}s`
                                                    }}
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-white/60">
                                                        <path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4L5 0Z" fill="currentColor" />>
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="relative z-10 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                                    <div className="relative">
                                                        <Repeat className="w-8 h-8" />
                                                        <div className="absolute inset-0 w-8 h-8 bg-white/30 blur-xl animate-pulse"></div>
                                                    </div>
                                                    Swap & Bridge
                                                </h3>
                                                <p className="text-teal-100 text-sm sm:text-base mt-2 flex items-center gap-2">
                                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                    Exchange over 900+ cryptocurrencies with ease
                                                </p>
                                            </div>
                                            <div className="hidden sm:flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                                                    <span className="text-white text-sm font-medium">Lightning Fast</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats ribbon */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 border-b border-gray-200">
                                        <div className="flex items-center justify-center gap-8 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-4 h-4 text-teal-600" />
                                                <span className="text-gray-700">Non-Custodial</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                                <span className="text-gray-700">Best Rates</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-gray-700">Available 24/7</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Widget body with enhanced styling */}
                                    <div className="p-4 sm:p-6 lg:p-8 relative bg-gradient-to-b from-white to-gray-50/50">
                                        <div className="relative">
                                            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-teal-500 rounded-tl-lg"></div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-teal-500 rounded-tr-lg"></div>
                                            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-teal-500 rounded-bl-lg"></div>
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-500 rounded-br-lg"></div>

                                            {/* Remove the extra margin by deleting margin-top */}
                                            <div style={{ width: "100%" }}>
                                                <iframe
                                                    id="iframe-widget"
                                                    src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=1&amountFiat=1500&backgroundColor=0e0a0a&darkMode=true&from=btc&fromFiat=eur&horizontal=false&isFiat&lang=en-US&link_id=c7ce3416e81112&locales=true&logo=false&primaryColor=00C26F&to=eth&toFiat=eth&toTheMoon=true"
                                                    title="ChangeNOW Exchange Widget"
                                                    allow="clipboard-write"
                                                    style={{ height: "356px", width: "100%", border: "none" }}
                                                ></iframe>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8">
                                            <button
                                                className="group relative flex items-center gap-3 px-8 py-4 bg-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-teal-500 overflow-hidden"
                                                onClick={() => {
                                                    setLoading(true);
                                                    const iframe = document.getElementById("iframe-widget");
                                                    if (iframe) {
                                                        const currentUrl = new URL(iframe.src);
                                                        currentUrl.searchParams.set('refresh', Date.now());
                                                        iframe.src = currentUrl.toString();
                                                    }
                                                    // Remove the existing connector script if present
                                                    const oldScript = document.querySelector("script[src='https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js']");
                                                    if (oldScript) {
                                                        oldScript.remove();
                                                    }
                                                    // Re-add the connector script to reinitialize the widget
                                                    const script = document.createElement("script");
                                                    script.src = "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js";
                                                    script.defer = true;
                                                    document.body.appendChild(script);
                                                    setTimeout(() => setLoading(false), 1500);
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative z-10 flex items-center gap-3 text-gray-700 group-hover:text-white transition-colors duration-300">
                                                    <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                                                    <span>Refresh Rates</span>
                                                </div>
                                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Premium footer */}
                                    <div className="relative p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                                        {/* Animated line */}
                                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center gap-6 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative">
                                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                                    </div>
                                                    <span className="text-gray-300">Status: <span className="text-green-400 font-bold">Active</span></span>
                                                </div>
                                                <div className="hidden sm:flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
                                                    <span className="text-gray-300">Network: <span className="text-teal-400 font-bold">Optimal</span></span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2">
                                                <Lock className="w-3 h-3" />
                                                Secured by Kaspa • Powered by kasportal.com
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section - Clean White Cards */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                            Why Choose Our Swap Engine?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay px-4 font-medium">
                            Speed - Ease of Use - Myriad Coins
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        {[
                            {
                                title: 'Lightning Speed',
                                description: 'Speedy swaps completed in under 10 minutes even on the clunkiest chains.',
                                icon: <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                title: 'Non Custodial',
                                description: 'No sign up, no accounts, no hassle. Just connect a fund and recipient wallet and swap.',
                                icon: <Wallet className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-600 to-purple-600'
                            },

                            {
                                title: 'So Many Coins!',
                                description: 'Swap between 900 + supported cryptocurrencies including all major coins and tokens.',
                                icon: <Link2 className="w-8 h-8 sm:w-10 sm:h-10" />,
                                color: 'from-teal-700 to-purple-700'
                            },

                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-8 sm:p-10 hover:border-teal-300 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 animate-fade-in-up shadow-lg"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${feature.color} w-fit mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                        <div className="text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-teal-700 transition-colors duration-300 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed text-center">
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
                                title: 'Select',
                                description: 'Specify source and destination tokens from the list of 900 + supported tokens.',
                                color: 'from-teal-500 to-blue-600'
                            },
                            {
                                title: 'Scan',
                                description: 'Scan 50+ exchanges in real-time to find the best exchange rate for your trade.',
                                color: 'from-teal-600 to-purple-600'
                            },
                            {
                                title: 'Execute',
                                description: 'Complete your swap in under 10 minutes and receive your tokens.',
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
                                answer: "Most swaps are completed within 5-10 minutes thanks to our advanced routing algorithms. Kaspa transactions are typically even faster due to the network's high throughput capabilities."
                            },
                            {
                                question: "Are there any swap limits?",
                                answer: "Basic swaps have no upper limits. However, very large transactions may require additional verification steps, KYC verification in accordance with regulatory requirements."
                            },
                            {
                                question: "What fees are associated with swapping?",
                                answer: "The exchange rate you see includes all fees. The rate includes network transaction fees and a small service fee Typically around 1%."
                            },
                            {
                                question: "Is my personal information required?",
                                answer: "For basic swaps, only your sending and receiving wallet address is required. No account creation is needed, You maintain control of your funds and seed phrases at all time. This is a non custodial service."
                            },
                            {
                                question: "What if my swap is taking longer than expected?",
                                answer: "Transactions may occasionally take longer due to network congestion. You can check the status of your swap using the transaction ID provided. If a swap is pending for over 2 hours, please contact our support."
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
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up whitespace-nowrap">
                            Want to learn more?
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up-delay font-medium leading-relaxed">

                        </p>
                        <Link
                            to="/features/cross-chain-compatibility"
                            className="group relative inline-flex items-center gap-4 px-12 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full font-bold text-white text-xl sm:text-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                Explore Cross-Chain
                                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                
                @keyframes float-orbit {
                    from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
                }

                @keyframes gradient-rotate {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(180deg); }
                }

                @keyframes wave {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(-50px); }
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                }

                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes float-random {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    25% { transform: translate(30px, -30px) scale(1.2); opacity: 0.6; }
                    50% { transform: translate(-20px, 20px) scale(0.8); opacity: 0.3; }
                    75% { transform: translate(40px, 10px) scale(1.1); opacity: 0.5; }
                }

                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-fade-in-up-delay { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-up-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                .animate-gradient-rotate { animation: gradient-rotate 8s linear infinite; }
                .animate-wave { animation: wave 6s ease-in-out infinite; }
                .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
                .animate-slide { animation: slide 3s linear infinite; }
                .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
                .animate-float-random { animation: float-random 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default TokenSwappingPage;
