import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import QuantumBackground from './3D/QuantumBackground';
import { Home, Repeat, Wallet, Link2, BookOpen, Menu, X, ChevronUp } from 'lucide-react';
import { Book, ArrowRight, Github, Send, Clock, ExternalLink, Zap, Shield, Database, Layers, RefreshCw, AlertTriangle, DollarSign, Lock, Cpu, ServerCrash } from 'lucide-react';
import DiscordIcon from './DiscordIcon';

const LearnPage = () => {
    const [activeTopic, setActiveTopic] = useState('overview');
    const [showCommunityLinks, setShowCommunityLinks] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse movement tracking for background effects (desktop only)
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    // Animate in sections as they come into view AND track active section
    useEffect(() => {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Track which section is currently in view for navigation highlighting
        const navigationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId && topics.some(topic => topic.id === sectionId)) {
                        setActiveTopic(sectionId);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -70% 0px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animationObserver.observe(el);
        });

        // Observe all section elements for navigation tracking
        topics.forEach(topic => {
            const element = document.getElementById(topic.id);
            if (element) {
                navigationObserver.observe(element);
            }
        });

        return () => {
            animationObserver.disconnect();
            navigationObserver.disconnect();
        };
    }, []);

    // Auto-scroll to anchor links AND ensure visibility
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('animate-in');

                setTimeout(() => {
                    const navHeight = 60;
                    const padding = 20;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - padding;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setActiveTopic(id);
                }, 100);
            }
        } else {
            setActiveTopic('overview');
        }
    }, [location]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const topics = [
        { id: 'overview', label: 'Kaspa Overview' },
        { id: 'blockdag', label: 'BlockDAG Architecture' },
        { id: 'ghostdag', label: 'GHOSTDAG Protocol' },
        { id: 'dagknight', label: 'DAGKnight Protocol' },
        { id: 'krc20', label: 'KRC-20 Tokens' },
        { id: 'layers', label: 'Layer 2 Solutions' },
        { id: 'tokenomics', label: 'Tokenomics' },
        { id: 'defi', label: 'Future DeFi Ecosystem' },
        { id: 'mev', label: 'MEV Resistance' }
    ];

    const communityResources = [
        { name: 'Official Kaspa Website', url: 'https://kaspa.org', icon: <ExternalLink size={16} className="ml-1" /> },
        { name: 'Kaspa Github', url: 'https://github.com/kaspanet', icon: <Github size={16} className="ml-1" /> },
        { name: 'Kaspa Discord', url: 'https://discord.gg/kaspa', icon: <DiscordIcon size={16} className="ml-1" /> },
        { name: 'Kaspa Telegram', url: 'https://t.me/+LJanxsRyV645OWUx', icon: <Send size={16} className="ml-1" /> },
        { name: 'Kaspa Explorer', url: 'https://explorer.kaspa.org', icon: <ExternalLink size={16} className="ml-1" /> }
    ];

    // Timeline for Kaspa history
    const kaspaTimeline = [
        { date: 'Nov 2021', event: 'Kaspa Mainnet Launch', description: 'Kaspa launches with fair distribution, no premine or token allocations.' },
        { date: 'Feb 2023', event: 'DAGKnight Whitepaper Released', description: 'Updated whitepaper for the next-generation DAGKnight protocol released.' },
        { date: 'Jun 2024', event: 'KRC-20 Beta Launch (Kasplex)', description: 'Kasplex went live on mainnet with KRC-20 token standard, enabling fungible tokens.' },
        { date: 'May 2025', event: 'Crescendo Upgrade (10 BPS)', description: 'Hard fork increased block rates to 10 blocks per second (BPS), significantly boosting throughput.' }
    ];

    // Define navigation protocols for FuturisticNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
    ];

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
            {/* Add 3D Background - conditionally for performance */}
            {!isMobile && <QuantumBackground />}

            {/* Clean light background with subtle gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-teal-100 to-transparent"></div>
                    <div className="absolute top-1/4 right-0 w-40 md:w-80 h-40 md:h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-bl from-purple-100 to-transparent" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-0 left-1/3 w-36 md:w-72 h-36 md:h-72 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-blue-100 to-transparent" style={{ animationDelay: '2s' }}></div>
                </div>
                {!isMobile && (
                    <div
                        className="absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.03), transparent 70%)`,
                            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
                        }}
                    ></div>
                )}

                {/* Floating particles - reduced for mobile */}
                {[...Array(isMobile ? 6 : 12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 rounded-full animate-float bg-teal-300/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 6}s`
                        }}
                    />
                ))}
            </div>

            <FuturisticNav
                protocols={protocols}
                activeProtocol="learn"
            />

            {/* Mobile Navigation Button */}
            <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-110 md:hidden"
                aria-label="Open navigation menu"
            >
                {showMobileNav ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white border border-gray-200 text-teal-600 flex items-center justify-center shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={20} />
                </button>
            )}

            {/* Mobile Navigation Menu */}
            {showMobileNav && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex items-center justify-center overflow-auto md:hidden">
                    <div className="w-full max-w-sm mx-auto px-6 py-10">
                        <div className="mb-8 text-center">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">Learning Topics</h3>
                            <p className="text-gray-600 text-sm">Select a topic to navigate</p>
                        </div>
                        <div className="space-y-3">
                            {topics.map(topic => (
                                <a
                                    key={topic.id}
                                    href={`#${topic.id}`}
                                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${activeTopic === topic.id
                                        ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-md font-medium'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    onClick={() => {
                                        setActiveTopic(topic.id);
                                        setShowMobileNav(false);
                                    }}
                                >
                                    {topic.label}
                                </a>
                            ))}
                        </div>

                        {/* Community Resources in Mobile Menu */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                className="flex items-center text-teal-600 hover:text-purple-600 transition-colors duration-300 font-medium mb-4 w-full justify-center"
                                onClick={() => setShowCommunityLinks(!showCommunityLinks)}
                            >
                                <span>Community Resources</span>
                                <svg
                                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${showCommunityLinks ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showCommunityLinks && (
                                <div className="space-y-3">
                                    {communityResources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center text-gray-600 hover:text-teal-600 py-2 transition-colors duration-300"
                                            onClick={() => setShowMobileNav(false)}
                                        >
                                            {resource.name}
                                            {resource.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Header - Mobile Optimized Typography */}
            <header className="pt-20 md:pt-32 pb-12 md:pb-24 text-center relative z-10 px-4">
                <div className="flex justify-center items-center mb-8 md:mb-12 animate-fade-in-up">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full flex items-center justify-center backdrop-blur-sm border border-teal-200">
                        <Book size={40} className="text-teal-600 md:hidden" />
                        <Book size={56} className="text-teal-600 hidden md:block" />
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-10 animate-fade-in-up-delay px-4">
                    <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">Kaspa Learning Hub</span>
                </h1>
                <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-500 mx-auto mb-8 md:mb-12 animate-fade-in-up-delay-2"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-6xl mx-auto px-4 leading-relaxed animate-fade-in-up-delay-3 font-medium">
                    Your comprehensive resource to understand Kaspa's innovative BlockDAG technology,
                    its capabilities, and the potential future of decentralized finance.
                </p>
            </header>

            {/* Main content - Mobile Optimized */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10">
                <div className="flex flex-col xl:flex-row gap-8 md:gap-12">
                    {/* Desktop Sidebar - Clean White Design */}
                    <div className="xl:w-80 xl:flex-shrink-0">
                        <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-8 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto z-30 hover:border-teal-300 hover:shadow-xl transition-all duration-500 hidden xl:block shadow-lg">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-8">Learning Topics</h3>
                            <nav className="space-y-2">
                                {topics.map(topic => (
                                    <a
                                        key={topic.id}
                                        href={`#${topic.id}`}
                                        className={`block px-5 py-4 rounded-2xl transition-all duration-300 text-sm font-medium ${activeTopic === topic.id
                                            ? 'bg-gradient-to-r from-teal-500/10 to-purple-500/10 text-gray-900 border border-teal-300 shadow-lg'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-teal-200 border border-transparent'
                                            }`}
                                        onClick={() => setActiveTopic(topic.id)}
                                    >
                                        {topic.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <button
                                    className="flex items-center text-teal-600 hover:text-purple-600 transition-colors duration-300 font-medium text-lg mb-6"
                                    onClick={() => setShowCommunityLinks(!showCommunityLinks)}
                                >
                                    <span>Community Resources</span>
                                    <svg
                                        className={`ml-3 w-5 h-5 transition-transform duration-300 ${showCommunityLinks ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showCommunityLinks && (
                                    <div className="space-y-4">
                                        {communityResources.map((resource, index) => (
                                            <a
                                                key={index}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-gray-600 hover:text-teal-600 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">{resource.name}</span>
                                                <span className="ml-auto group-hover:translate-x-1 transition-transform duration-300">{resource.icon}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main content area - Mobile Optimized Cards */}
                    <div className="xl:flex-1 xl:min-w-0">
                        {/* Kaspa Overview */}
                        <section id="overview" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Zap size={24} className="text-teal-600 md:hidden" />
                                        <Zap size={32} className="text-teal-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                                        Kaspa Overview
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        Kaspa is a revolutionary Layer 1 blockchain that implements the GHOSTDAG protocol, allowing blocks to coexist and be ordered in consensus rather than orphaning competing blocks. This breakthrough enables Kaspa to achieve unprecedented block rates while maintaining the security guarantees of proof-of-work consensus.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-teal-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Fair Launch</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                No premine, no ICO, no team allocation. 100% community-driven from day one.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl border border-purple-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Ultra-Fast</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Currently 10 blocks per second, targeting 100 BPS with future upgrades.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mt-8 md:mt-12">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                            <Clock className="mr-3 text-teal-600" size={24} />
                                            Kaspa Timeline
                                        </h3>
                                        <div className="space-y-4">
                                            {kaspaTimeline.map((item, index) => (
                                                <div key={index} className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                                    <div className="font-bold text-teal-600 mb-2 md:mb-0 md:mr-4 md:w-32">{item.date}</div>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-900">{item.event}</div>
                                                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* BlockDAG Architecture */}
                        <section id="blockdag" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Database size={24} className="text-blue-600 md:hidden" />
                                        <Database size={32} className="text-blue-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                        BlockDAG Architecture
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        Unlike traditional blockchains that form a single chain of blocks, Kaspa uses a Directed Acyclic Graph (DAG) structure. This allows multiple blocks to be created simultaneously and referenced by future blocks, dramatically increasing throughput without sacrificing security.
                                    </p>

                                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 md:p-8 rounded-2xl border border-blue-200">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Key Advantages:</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Parallel block creation eliminates bottlenecks</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Near-instant transaction confirmation</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Scales with network growth</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Maintains Bitcoin's security model</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "The BlockDAG paradigm shift enables Kaspa to process thousands of transactions per second while maintaining decentralization and security."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* GHOSTDAG Protocol */}
                        <section id="ghostdag" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Layers size={24} className="text-purple-600 md:hidden" />
                                        <Layers size={32} className="text-purple-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        GHOSTDAG Protocol
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        The GHOSTDAG protocol is the cornerstone of Kaspa's innovative approach, enabling fast and secure transactions by allowing blocks to be added to the DAG in a way that is both parallel and conflict-free. This ensures that all transactions are confirmed quickly, without the delays typical of traditional blockchains.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl border border-purple-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Secure & Decentralized</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Built on Bitcoin's proven security model, enhanced for high throughput.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 rounded-2xl border border-blue-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Future-Proof</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Designed to scale with technological advancements and network growth.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "GHOSTDAG represents a fundamental shift in how blockchains can achieve consensus and process transactions efficiently."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* DAGKnight Protocol */}
                        <section id="dagknight" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Cpu size={24} className="text-teal-600 md:hidden" />
                                        <Cpu size={32} className="text-teal-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                                        DAGKnight Protocol
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        DAGKnight is an evolution of the original DAG concept, optimized for even greater efficiency and speed. It introduces innovative mechanisms for block propagation and consensus, further reducing the time and resources needed for transaction confirmation.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-teal-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Enhanced Efficiency</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Optimized block propagation reduces latency and increases throughput.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl border border-purple-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Resource Friendly</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Lowers energy and computational requirements for network participation.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "DAGKnight is not just an upgrade; it's a reimagining of what a blockchain can be, paving the way for sustainable and scalable decentralized networks."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* KRC-20 Tokens */}
                        <section id="krc20" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <DollarSign size={24} className="text-blue-600 md:hidden" />
                                        <DollarSign size={32} className="text-blue-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                        KRC-20 Tokens
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        KRC-20 is Kaspa's token standard, enabling the creation and management of fungible tokens on the Kaspa blockchain. It brings the flexibility and power of smart tokens to the Kaspa ecosystem, opening up new possibilities for decentralized applications and finance.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 rounded-2xl border border-blue-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Smart Token Functionality</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Supports complex programmable money use cases and DeFi applications.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-teal-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Interoperable and Flexible</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Easily integrates with existing Kaspa infrastructure and other blockchains.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "KRC-20 tokens are set to revolutionize the DeFi landscape on Kaspa, providing the essential building blocks for a diverse range of financial applications."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Layer 2 Solutions */}
                        <section id="layers" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Layers size={24} className="text-purple-600 md:hidden" />
                                        <Layers size={32} className="text-purple-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Layer 2 Solutions
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        To further enhance scalability and efficiency, Kaspa is developing Layer 2 solutions. These solutions aim to enable even higher throughput and faster transaction times, making Kaspa one of the most advanced blockchain platforms available.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl border border-purple-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Scalable and Efficient</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Designed to handle a large number of transactions with minimal latency.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 rounded-2xl border border-blue-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Seamless User Experience</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Optimized for fast confirmations and low fees, enhancing usability.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "Kaspa's Layer 2 solutions are poised to set a new standard for blockchain scalability, making high-performance decentralized applications a reality."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tokenomics */}
                        <section id="tokenomics" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Shield size={24} className="text-teal-600 md:hidden" />
                                        <Shield size={32} className="text-teal-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                                        Tokenomics
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        Kaspa's tokenomics are designed to ensure a fair, sustainable, and incentivized ecosystem for all participants. With no premine or hidden allocations, the distribution is fully transparent and community-driven.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-teal-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Fair Distribution</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                100% of the tokens are distributed to the community, with no allocations for teams or advisors.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl border border-purple-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Incentive Alignment</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Long-term incentives for holders and stakers, promoting network security and stability.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "The integrity of Kaspa's tokenomics is paramount, ensuring that all participants have a fair opportunity to contribute to and benefit from the network."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Future DeFi Ecosystem */}
                        <section id="defi" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <ExternalLink size={24} className="text-blue-600 md:hidden" />
                                        <ExternalLink size={32} className="text-blue-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                        Future DeFi Ecosystem
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        Kaspa is poised to be at the forefront of the decentralized finance revolution, providing the essential infrastructure and tools for a wide range of financial applications and services.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 rounded-2xl border border-blue-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Decentralized Exchanges</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Fast and secure token swapping with low fees and high liquidity.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-teal-200">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Lending and Borrowing</h3>
                                            <p className="text-sm md:text-base text-gray-700">
                                                Trustless and efficient lending protocols, enabling users to earn interest or borrow assets.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "The future of DeFi on Kaspa is bright, with endless possibilities for innovation and growth in the decentralized financial ecosystem."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* MEV Resistance */}
                        <section id="mev" className="animate-on-scroll mb-16 md:mb-24">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex items-center mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mr-4 md:mr-6">
                                        <Lock size={24} className="text-purple-600 md:hidden" />
                                        <Lock size={32} className="text-purple-600 hidden md:block" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        MEV Resistance
                                    </h2>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                        Kaspa's unique architecture inherently protects against Miner Extractable Value (MEV) attacks, ensuring a fairer and more secure environment for all users. By eliminating the possibility of front-running and other MEV exploits, Kaspa maintains the integrity of its transaction ordering and consensus.
                                    </p>

                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 md:p-8 rounded-2xl border border-purple-200">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Built-In MEV Resistance:</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">No single miner or entity can control transaction ordering</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Reduces the risk of front-running and sandwich attacks</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-3 mt-1">•</span>
                                                <span className="text-sm md:text-base text-gray-700">Enhances overall network security and fairness</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                                        <p className="text-sm md:text-base text-gray-600 italic">
                                            "Kaspa's approach to MEV resistance is a game changer, promoting a healthier and more equitable blockchain ecosystem."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <EnhancedFooter />
        </div>
    );
};

export default LearnPage;
