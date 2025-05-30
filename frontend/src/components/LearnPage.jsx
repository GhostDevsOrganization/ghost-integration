import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import QuantumBackground from './3D/QuantumBackground';
import { Home, Repeat, Wallet, Link2, BookOpen, Menu, X } from 'lucide-react';
import { Book, ArrowRight, Github, Send, Clock, ExternalLink, Zap, Shield, Database, Layers, RefreshCw, AlertTriangle, DollarSign, Lock, Cpu, ServerCrash } from 'lucide-react';
import DiscordIcon from './DiscordIcon';

const LearnPage = () => {
    const [activeTopic, setActiveTopic] = useState('overview');
    const [showCommunityLinks, setShowCommunityLinks] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const location = useLocation();

    // Mouse movement tracking for background effects
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
                {[...Array(12)].map((_, i) => (
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

            {/* Always Accessible Navigation Button */}
            <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-110"
                aria-label="Open navigation menu"
            >
                {showMobileNav ? <X size={24} /> : <BookOpen size={24} />}
            </button>

            {/* Always Accessible Navigation Menu */}
            {showMobileNav && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex items-center justify-center overflow-auto">
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

            {/* Header - Enhanced Typography */}
            <header className="pt-32 pb-24 text-center relative z-10">
                <div className="flex justify-center items-center mb-12 animate-fade-in-up">
                    <div className="w-28 h-28 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full flex items-center justify-center backdrop-blur-sm border border-teal-200">
                        <Book size={56} className="text-teal-600" />
                    </div>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 animate-fade-in-up-delay">
                    <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">Kaspa Learning Hub</span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-500 mx-auto mb-12 animate-fade-in-up-delay-2"></div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-6xl mx-auto px-4 leading-relaxed animate-fade-in-up-delay-3 font-medium">
                    Your comprehensive resource to understand Kaspa's innovative BlockDAG technology,
                    its capabilities, and the potential future of decentralized finance.
                </p>
            </header>

            {/* Main content - Improved desktop layout */}
            <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Desktop Sidebar - Clean White Design */}
                    <div className="xl:w-80 xl:flex-shrink-0">
                        <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-8 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto z-30 hover:border-teal-300 hover:shadow-xl transition-all duration-500 hidden xl:block shadow-lg">
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

                    {/* Main content area - Clean White Cards */}
                    <div className="xl:flex-1 xl:min-w-0">
                        {/* Overview Section */}
                        <section id="overview" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">Kaspa Overview</h2>

                                    <p className="mb-10 text-gray-700 text-xl leading-relaxed">
                                        Kaspa is a revolutionary Layer-1 blockchain protocol that employs an innovative BlockDAG architecture
                                        (Directed Acyclic Graph) with the GHOSTDAG consensus mechanism. This novel approach enables Kaspa to
                                        achieve unprecedented scalability and transaction speeds while maintaining robust security.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <Zap size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">Speed & Scalability</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg leading-relaxed">
                                                10 blocks per second with transaction inclusion in 100ms and confirmation in seconds
                                            </p>
                                        </div>

                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                                            <div className="mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                                <Shield size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">Security</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg leading-relaxed">
                                                Proof-of-Work consensus with GHOSTDAG protocol offering Bitcoin-level security guarantees
                                            </p>
                                        </div>

                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <Database size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">Fair Launch</h3>
                                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg leading-relaxed">
                                                No pre-mine, pre-sale, or token allocations, ensuring true decentralization
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">Key Features</h3>
                                    <ul className="list-disc list-inside space-y-4 text-gray-700 mb-12 text-lg leading-relaxed">
                                        <li>Fast block production (10 BPS) with the Crescendo upgrade</li>
                                        <li>Near-instant transaction finality</li>
                                        <li>High throughput capacity (2,000-3,000 TPS)</li>
                                        <li>Minimal transaction fees</li>
                                        <li>Complete Rust codebase rewrite for performance</li>
                                        <li>Potential MEV (Miner Extractable Value) resistance</li>
                                        <li>KRC-20 token standard support</li>
                                    </ul>

                                    <div className="mt-12">
                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-8">Kaspa Timeline</h3>
                                        <div className="space-y-8">
                                            {kaspaTimeline.map((item, index) => (
                                                <div key={index} className="flex group">
                                                    <div className="flex-shrink-0 w-32 text-teal-600 font-semibold text-lg group-hover:text-purple-600 transition-colors duration-300">{item.date}</div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-300 mb-2">{item.event}</h4>
                                                        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg leading-relaxed">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* BlockDAG Architecture Section */}
                        <section id="blockdag" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">BlockDAG Architecture</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        At the heart of Kaspa's innovation is its BlockDAG (Directed Acyclic Graph) architecture,
                                        a radical departure from traditional linear blockchain structures. This architecture allows
                                        multiple blocks to be created and confirmed in parallel, fundamentally resolving the
                                        throughput limitations of conventional blockchains.
                                    </p>

                                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 hover:border-teal-200 hover:shadow-lg transition-all duration-500">
                                        <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-6">How BlockDAG Works</h3>
                                        <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg leading-relaxed">
                                            <li>Multiple miners can create valid blocks simultaneously</li>
                                            <li>Each new block can reference multiple previous blocks</li>
                                            <li>The structure forms a directed acyclic graph rather than a linear chain</li>
                                            <li>Parallel block creation eliminates the fundamental throughput bottleneck</li>
                                            <li>GHOSTDAG protocol determines the main chain within the DAG structure</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* GHOSTDAG Protocol Section */}
                        <section id="ghostdag" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">GHOSTDAG Protocol</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        GHOSTDAG (Greedy Heaviest-Observed Sub-Tree Directed Acyclic Graph) is Kaspa's consensus protocol
                                        that enables the BlockDAG structure while maintaining security. It's a generalization of Bitcoin's
                                        longest chain rule adapted for DAG structures.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500">
                                            <h3 className="text-2xl font-bold text-teal-600 mb-6">Key Features</h3>
                                            <ul className="text-gray-700 space-y-3 text-lg">
                                                <li>• Maintains total ordering of blocks</li>
                                                <li>• Prevents double-spending attacks</li>
                                                <li>• Enables parallel block creation</li>
                                                <li>• Preserves Bitcoin-level security</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500">
                                            <h3 className="text-2xl font-bold text-purple-600 mb-6">Benefits</h3>
                                            <ul className="text-gray-700 space-y-3 text-lg">
                                                <li>• Higher transaction throughput</li>
                                                <li>• Faster confirmation times</li>
                                                <li>• No orphaned blocks</li>
                                                <li>• Improved network efficiency</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* DAGKnight Protocol Section */}
                        <section id="dagknight" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">DAGKnight Protocol</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        DAGKnight is the next evolution of Kaspa's consensus protocol, designed to further improve
                                        security and performance. It represents the cutting-edge of BlockDAG consensus research.
                                    </p>

                                    <div className="bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-200 rounded-3xl p-8">
                                        <h3 className="text-2xl font-bold text-teal-600 mb-6">Current Status</h3>
                                        <p className="text-gray-700 text-lg leading-relaxed">
                                            DAGKnight is currently in research and development phase. The protocol aims to provide
                                            even stronger security guarantees while maintaining Kaspa's high throughput capabilities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* KRC-20 Tokens Section */}
                        <section id="krc20" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">KRC-20 Tokens</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        KRC-20 is Kaspa's token standard, similar to Ethereum's ERC-20, enabling the creation of
                                        fungible tokens on the Kaspa network. This standard opens up possibilities for DeFi
                                        applications and token economies built on Kaspa's high-performance infrastructure.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <Database size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Token Creation</h3>
                                            <p className="text-gray-600 text-lg">Create custom tokens with defined supply, decimals, and metadata</p>
                                        </div>
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                                <RefreshCw size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Transfers</h3>
                                            <p className="text-gray-600 text-lg">Benefit from Kaspa's high-speed network for token transactions</p>
                                        </div>
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <DollarSign size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Low Fees</h3>
                                            <p className="text-gray-600 text-lg">Minimal transaction costs for token operations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Layer 2 Solutions Section */}
                        <section id="layers" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">Layer 2 Solutions</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        Kaspa's ecosystem is expanding with various Layer 2 solutions that build upon the base layer's
                                        speed and security to enable new use cases and applications.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:border-teal-300 hover:shadow-lg transition-all duration-500">
                                            <div className="flex items-start gap-6">
                                                <div className="text-teal-600 mt-2">
                                                    <Shield size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Sparkle (Layer 1.5)</h3>
                                                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">A "Layer 1.5" solution utilizing zero-knowledge proofs for enhanced scalability and privacy.</p>
                                                    <div className="flex items-center gap-6 text-base">
                                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">In Development</span>
                                                        <span className="text-gray-600">Expected later in 2025</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-lg transition-all duration-500">
                                            <div className="flex items-start gap-6">
                                                <div className="text-purple-600 mt-2">
                                                    <Database size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Kasplex</h3>
                                                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">Enables KRC-20/KRC-721 tokens through on-chain data inscription mechanisms.</p>
                                                    <div className="flex items-center gap-6 text-base">
                                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">Live on Mainnet</span>
                                                        <span className="text-gray-600">Launched June 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:border-teal-300 hover:shadow-lg transition-all duration-500">
                                            <div className="flex items-start gap-6">
                                                <div className="text-teal-600 mt-2">
                                                    <Layers size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Igra Network</h3>
                                                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">EVM-compatible Layer 2 solution to bring Ethereum ecosystem to Kaspa.</p>
                                                    <div className="flex items-center gap-6 text-base">
                                                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">Testnet Phase</span>
                                                        <span className="text-gray-600">Mainnet expected Q2/Q3 2025</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tokenomics Section */}
                        <section id="tokenomics" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">Tokenomics</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        Kaspa features a fair and transparent tokenomics model with no pre-mine, pre-sale, or
                                        token allocations. The supply is purely determined by mining rewards and follows a
                                        deflationary emission schedule.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
                                            <h3 className="text-2xl font-bold text-teal-600 mb-6">Supply Details</h3>
                                            <ul className="space-y-4 text-gray-700 text-lg">
                                                <li>• <strong>Max Supply:</strong> ~28.7 billion KAS</li>
                                                <li>• <strong>Current Supply:</strong> ~24+ billion KAS</li>
                                                <li>• <strong>Block Reward:</strong> Decreasing over time</li>
                                                <li>• <strong>Halving:</strong> Smooth reduction (not abrupt)</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
                                            <h3 className="text-2xl font-bold text-purple-600 mb-6">Fair Distribution</h3>
                                            <ul className="space-y-4 text-gray-700 text-lg">
                                                <li>• <strong>No Pre-mine:</strong> 0% allocated to founders</li>
                                                <li>• <strong>No Pre-sale:</strong> No early investor allocations</li>
                                                <li>• <strong>Pure PoW:</strong> All tokens from mining</li>
                                                <li>• <strong>Community Driven:</strong> Decentralized from day one</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Future DeFi Ecosystem Section */}
                        <section id="defi" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">Future DeFi Ecosystem</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        With KRC-20 tokens and upcoming Layer 2 solutions, Kaspa is positioned to host a
                                        vibrant DeFi ecosystem that leverages the network's speed and low fees.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <RefreshCw size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">DEX Trading</h3>
                                            <p className="text-gray-600 text-lg">High-speed decentralized exchanges with minimal slippage</p>
                                        </div>
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                                <Lock size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lending Protocols</h3>
                                            <p className="text-gray-600 text-lg">Fast and efficient lending and borrowing platforms</p>
                                        </div>
                                        <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105">
                                            <div className="mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                <DollarSign size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Yield Farming</h3>
                                            <p className="text-gray-600 text-lg">Liquidity mining with instant reward distribution</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* MEV Resistance Section */}
                        <section id="mev" className="mb-24 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-10 lg:p-12 hover:border-teal-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden shadow-lg">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-50 rounded-full"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-10">MEV Resistance</h2>

                                    <p className="mb-12 text-gray-700 text-xl leading-relaxed">
                                        Kaspa's BlockDAG architecture and parallel block creation provide natural resistance to
                                        Miner Extractable Value (MEV) attacks, creating a more fair and equitable trading environment.
                                    </p>

                                    <div className="bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-200 rounded-3xl p-8 mb-10">
                                        <h3 className="text-2xl font-bold text-teal-600 mb-6">How Kaspa Resists MEV</h3>
                                        <ul className="space-y-4 text-gray-700 text-lg">
                                            <li>• <strong>Parallel Processing:</strong> Multiple blocks processed simultaneously</li>
                                            <li>• <strong>Reduced Ordering Power:</strong> Miners have less control over transaction ordering</li>
                                            <li>• <strong>Fast Finality:</strong> Quick confirmation reduces arbitrage opportunities</li>
                                            <li>• <strong>Fair Inclusion:</strong> Transactions included based on fees, not manipulation</li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-500">
                                            <h3 className="text-2xl font-bold text-teal-600 mb-6">Benefits for Users</h3>
                                            <ul className="text-gray-700 space-y-3 text-lg">
                                                <li>• Fairer transaction execution</li>
                                                <li>• Reduced front-running attacks</li>
                                                <li>• Better price discovery</li>
                                                <li>• Lower effective trading costs</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500">
                                            <h3 className="text-2xl font-bold text-purple-600 mb-6">DeFi Advantages</h3>
                                            <ul className="text-gray-700 space-y-3 text-lg">
                                                <li>• More predictable DEX pricing</li>
                                                <li>• Reduced sandwich attacks</li>
                                                <li>• Fair liquidation processes</li>
                                                <li>• Improved user experience</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center py-24">
                            <div className="relative">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up">
                                    Ready to Dive Deeper?
                                </h2>
                                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay font-medium">
                                    We are working to simplify blockchain— discover how it could work better for you.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link
                                        to="/features/token-swapping"
                                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full font-bold text-white text-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-2 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-4">
                                            Start Swapping
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </Link>
                                    <a
                                        href="https://ghostdevlabs.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white border border-teal-300 rounded-full font-bold text-teal-600 text-xl hover:bg-teal-50 transition-all duration-500 transform hover:scale-110 animate-fade-in-up-delay-3">
                                        <span className="flex items-center gap-4">
                                            Official Website
                                            <ExternalLink className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
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
                .animate-fade-in-up-delay-3 { animation: fade-in-up 0.8s ease-out 0.6s forwards; opacity: 0; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                
                .animate-in {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
};

export default LearnPage;
