import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Repeat, Link2, BookOpen, Sparkles, Zap, Shield, Globe, ArrowRight, Activity, Cpu, Database, RefreshCw } from 'lucide-react';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import { useTheme } from '../context/ThemeContext';

const AdvancedPortal = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [activeFeature, setActiveFeature] = useState(null);
    const { theme, themeData } = useTheme();

    // Define navigation protocols
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    const portalFeatures = [
        {
            id: 'swap',
            title: 'Token Swapping',
            description: 'Advanced cryptocurrency exchange with AI-powered rate optimization',
            icon: <Repeat className="w-8 h-8" />,
            path: '/features/token-swapping',
            color: 'from-teal-400 to-blue-500',
            stats: ['900+ Tokens', 'Sub-15min Swaps', 'Best Rates']
        },
        {
            id: 'crosschain',
            title: 'Cross-Chain Bridge',
            description: 'Seamless asset transfers across multiple blockchain networks',
            icon: <Link2 className="w-8 h-8" />,
            path: '/features/cross-chain-compatibility',
            color: 'from-purple-400 to-pink-500',
            stats: ['6+ Networks', 'Instant Transfers', 'Military Security']
        },
        {
            id: 'learn',
            title: 'Learning Hub',
            description: 'Comprehensive education center for blockchain technology',
            icon: <BookOpen className="w-8 h-8" />,
            path: '/learn',
            color: 'from-green-400 to-teal-500',
            stats: ['Expert Guides', 'Latest Research', 'Community Driven']
        }
    ];

    const quickActions = [
        {
            title: 'Quick Swap',
            description: 'Start trading immediately',
            icon: <Zap className="w-6 h-6" />,
            action: () => window.location.href = '/features/token-swapping',
            color: 'from-yellow-400 to-orange-500'
        },
        {
            title: 'Portfolio',
            description: 'View your assets',
            icon: <Database className="w-6 h-6" />,
            action: () => alert('Portfolio feature coming soon!'),
            color: 'from-blue-400 to-purple-500'
        },
        {
            title: 'Analytics',
            description: 'Market insights',
            icon: <Activity className="w-6 h-6" />,
            action: () => alert('Analytics feature coming soon!'),
            color: 'from-green-400 to-teal-500'
        },
        {
            title: 'Settings',
            description: 'Customize experience',
            icon: <Cpu className="w-6 h-6" />,
            action: () => alert('Settings feature coming soon!'),
            color: 'from-purple-400 to-pink-500'
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
        <div className="min-h-screen overflow-x-hidden relative" style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
            {/* Theme-aware animated background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, var(--primary-bg-gradient-start), var(--primary-bg-gradient-via), var(--primary-bg-gradient-end))' }}></div>
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to bottom right, rgba(var(--accent-primary-rgb-values), 0.3), transparent)' }}></div>
                    <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to bottom left, rgba(var(--accent-secondary-rgb-values), 0.3), transparent)', animationDelay: '1s' }}></div>
                    <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to top right, rgba(var(--accent-primary-rgb-values), 0.3), transparent)', animationDelay: '2s' }}></div>
                </div>
                <div
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(var(--accent-primary-rgb-values), 0.15), transparent 70%)`,
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
                    }}
                ></div>

                {/* Theme-aware floating particles */}
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float"
                        style={{
                            backgroundColor: `rgba(var(--accent-primary-rgb-values), 0.3)`,
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
                activeProtocol="portal"
            />

            <main className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12">
                {/* Portal Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}>
                                <Sparkles className="w-12 h-12 text-white animate-pulse" />
                            </div>
                            <div className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}></div>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                        <span style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Kasportal Command Center
                        </span>
                    </h1>
                    <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay" style={{ color: 'var(--text-secondary)' }}>
                        Your gateway to the quantum-powered blockchain ecosystem. Access advanced trading tools,
                        cross-chain bridges, and comprehensive learning resources.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <section className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="group relative p-6 rounded-2xl border transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-color)',
                                    animationDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={() => setActiveFeature(action.title)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>

                                <div className="relative z-10 text-center">
                                    <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {action.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-2 group-hover:text-teal-300 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                                        {action.title}
                                    </h3>
                                    <p className="text-sm group-hover:text-gray-300 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                                        {action.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Main Portal Features */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Portal Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {portalFeatures.map((feature, index) => (
                            <Link
                                key={feature.id}
                                to={feature.path}
                                className="group relative block p-8 rounded-3xl border transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 animate-fade-in-up"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-color)',
                                    animationDelay: `${index * 0.2}s`
                                }}
                                onMouseEnter={() => setActiveFeature(feature.id)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                {/* Glowing background effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {feature.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-300 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                                        {feature.title}
                                    </h3>

                                    <p className="mb-6 group-hover:text-gray-300 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                                        {feature.description}
                                    </p>

                                    {/* Feature Stats */}
                                    <div className="space-y-2 mb-6">
                                        {feature.stats.map((stat, statIndex) => (
                                            <div key={statIndex} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all duration-300" style={{ color: 'var(--accent-primary)' }}>
                                        <span>Explore Feature</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} p-[1px]`}>
                                        <div className="w-full h-full rounded-3xl" style={{ backgroundColor: 'var(--card-bg)' }}></div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Portal Stats */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Portal Statistics
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Real-time metrics from the Kasportal ecosystem
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Volume', value: '$2.4M+', icon: <Database className="w-6 h-6" /> },
                            { label: 'Active Users', value: '12.5K+', icon: <Activity className="w-6 h-6" /> },
                            { label: 'Transactions', value: '45.2K+', icon: <RefreshCw className="w-6 h-6" /> },
                            { label: 'Networks', value: '6+', icon: <Globe className="w-6 h-6" /> }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl border transition-all duration-500 hover:scale-105"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                            >
                                <div className="flex justify-center mb-4" style={{ color: 'var(--accent-primary)' }}>
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-20">
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Ready to Explore?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up-delay" style={{ color: 'var(--text-secondary)' }}>
                            Dive into the quantum-powered blockchain ecosystem and experience the future of decentralized finance.
                        </p>
                        <Link
                            to="/features/token-swapping"
                            className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full font-bold text-white text-lg shadow-2xl transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                            style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Start Trading
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, var(--accent-secondary), var(--accent-primary))' }}></div>
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
                
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-fade-in-up-delay { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-up-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default AdvancedPortal;
