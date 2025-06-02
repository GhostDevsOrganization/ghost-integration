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
                        {/* Overview Section */}
                        <section id="overview" className="mb-16 md:mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-20 md:w-40 h-20 md:h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 w-30 md:w-60 h-30 md:h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-10">Kaspa Overview</h2>

                                    <p className="mb-8 md:mb-10 text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                                        Kaspa is a revolutionary Layer-1 blockchain protocol that employs an innovative BlockDAG architecture
                                        (Directed Acyclic Graph) with the GHOSTDAG consensus mechanism. This novel approach enables Kaspa to
                                        achieve unprecedented scalability and transaction speeds while maintaining robust security.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-8 md:my-12">
                                        <div className="group bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 md:hover:-translate-y-3">
                                            <div className="mb-4 md:mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <Zap size={28} className="md:hidden" />
                                                <Zap size={36} className="hidden md:block" />
                                            </div>
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-teal-700 transition-colors duration-300">Speed & Scalability</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base lg:text-lg leading-relaxed">
                                                10 blocks per second with transaction inclusion in 100ms and confirmation in seconds
                                            </p>
                                        </div>

                                        <div className="group bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 md:hover:-translate-y-3">
                                            <div className="mb-4 md:mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                                <Shield size={28} className="md:hidden" />
                                                <Shield size={36} className="hidden md:block" />
                                            </div>
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-purple-700 transition-colors duration-300">Security</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base lg:text-lg leading-relaxed">
                                                Proof-of-Work consensus with GHOSTDAG protocol offering Bitcoin-level security guarantees
                                            </p>
                                        </div>

                                        <div className="group bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 md:hover:-translate-y-3">
                                            <div className="mb-4 md:mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <Database size={28} className="md:hidden" />
                                                <Database size={36} className="hidden md:block" />
                                            </div>
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-teal-700 transition-colors duration-300">Fair Launch</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base lg:text-lg leading-relaxed">
                                                No pre-mine, pre-sale, or token allocations, ensuring true decentralization
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">Key Features</h3>
                                    <ul className="list-disc list-inside space-y-3 md:space-y-4 text-gray-700 mb-8 md:mb-12 text-sm md:text-base lg:text-lg leading-relaxed">
                                        <li>Fast block production (10 BPS) with the Crescendo upgrade</li>
                                        <li>Near-instant transaction finality</li>
                                        <li>High throughput capacity (2,000-3,000 TPS)</li>
                                        <li>Minimal transaction fees</li>
                                        <li>Complete Rust codebase rewrite for performance</li>
                                        <li>Potential MEV (Miner Extractable Value) resistance</li>
                                        <li>KRC-20 token standard support</li>
                                    </ul>

                                    <div className="mt-8 md:mt-12">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">Kaspa Timeline</h3>
                                        <div className="space-y-6 md:space-y-8">
                                            {kaspaTimeline.map((item, index) => (
                                                <div key={index} className="flex flex-col md:flex-row group">
                                                    <div className="flex-shrink-0 md:w-32 text-teal-600 font-semibold text-sm md:text-base lg:text-lg group-hover:text-purple-600 transition-colors duration-300 mb-2 md:mb-0">{item.date}</div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 text-base md:text-lg lg:text-xl group-hover:text-teal-700 transition-colors duration-300 mb-1 md:mb-2">{item.event}</h4>
                                                        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base lg:text-lg leading-relaxed">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* BlockDAG Architecture Section */}
                        <section id="blockdag" className="mb-16 md:mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-20 md:w-40 h-20 md:h-40 bg-purple-50 rounded-full"></div>
                                <div className="absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 w-30 md:w-60 h-30 md:h-60 bg-teal-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-10">BlockDAG Architecture</h2>
