import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TraditionalNav from './TraditionalNav';
import { Home, Repeat, Wallet, Link2, BookOpen } from 'lucide-react';
import { Book, ArrowRight, Github, Send, Clock, ExternalLink, Zap, Shield, Database, Layers, RefreshCw, AlertTriangle, DollarSign, Lock, Cpu, ServerCrash } from 'lucide-react';
import DiscordIcon from './DiscordIcon';

const LearnPage = () => {
    const [activeTopic, setActiveTopic] = useState('overview');
    const [showCommunityLinks, setShowCommunityLinks] = useState(false);
    const location = useLocation();

    // Animate in sections as they come into view
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Auto-scroll to anchor links AND ensure visibility
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                // 1. Ensure element is immediately visible if navigated to via hash
                element.classList.add('animate-in');

                // 2. Add a slight delay to ensure the DOM has updated before scrolling
                // This prevents scrolling to an element that's still animating or hidden
                setTimeout(() => {
                    // Calculate the top navigation's height and add extra padding
                    const navHeight = 60; // Typical height of the nav bar
                    const padding = 20; // Extra padding for better appearance
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - padding;

                    // Use window.scrollTo instead of scrollIntoView for better control
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setActiveTopic(id); // Set active topic after successful scroll
                }, 100); // Small delay, e.g., 100ms
            }
        } else {
            // If no hash, default to 'overview' for initial state or reset when hash is cleared
            setActiveTopic('overview');
        }
    }, [location]); // Depend on location changes

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

    // Timeline for Kaspa history - UPDATED DATES (based on May 20, 2025)
    const kaspaTimeline = [
        { date: 'Nov 2021', event: 'Kaspa Mainnet Launch', description: 'Kaspa launches with fair distribution, no premine or token allocations.' },
        { date: 'Feb 2023', event: 'DAGKnight Whitepaper Released', description: 'Updated whitepaper for the next-generation DAGKnight protocol released.' },
        { date: 'Jun 2024', event: 'KRC-20 Beta Launch (Kasplex)', description: 'Kasplex went live on mainnet with KRC-20 token standard, enabling fungible tokens.' }, // Past tense
        { date: 'May 2025', event: 'Crescendo Upgrade (10 BPS)', description: 'Hard fork increased block rates to 10 blocks per second (BPS), significantly boosting throughput.' } // Past tense, assuming completed by current date
    ];

    // Layer 2 solutions information - UPDATED STATUSES (based on May 20, 2025)
    const layer2Solutions = [
        {
            name: 'Sparkle',
            description: 'A "Layer 1.5" solution utilizing zero-knowledge proofs for enhanced scalability and privacy.',
            status: 'In Active Development',
            timeline: 'Expected later in 2025',
            icon: <Shield size={24} className="text-green-400" />
        },
        {
            name: 'Kasplex',
            description: 'Enables KRC-20/KRC-721 tokens through on-chain data inscription mechanisms.',
            status: 'Live on Mainnet',
            timeline: 'Launched June 2024 (Fully Operational)',
            icon: <Database size={24} className="text-green-400" />
        },
        {
            name: 'Igra Network',
            description: 'EVM-compatible Layer 2 solution to bring Ethereum ecosystem to Kaspa.',
            status: 'Testnet Phase',
            timeline: 'Mainnet expected Q2/Q3 2025',
            icon: <Layers size={24} className="text-green-400" />
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-[var(--content-padding)]">
            {/* Radar-style background elements - similar to other pages */}
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

            {/* Navigation - now using TraditionalNav component */}
            <TraditionalNav
                protocols={[
                    { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
                    { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
                    { key: 'crosschain', label: 'Cross-Chain Compatibility', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
                    { key: 'wallet', label: 'Multi-Wallet Support', path: '/features/multi-wallet-support', icon: <Wallet size={18} /> },
                    { key: 'learn', label: 'Learn', path: '/learn', icon: <BookOpen size={18} /> }
                ]}
                activeProtocol={location.pathname.split('/')[1] === 'features'
                    ? location.pathname.split('/')[2]
                    : location.pathname.split('/')[1]}
            />

            {/* Header */}
            <header className="pt-10 pb-10 text-center">
                <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Book size={32} className="text-green-400" />
                    </div>
                </div>
                <h1 className="text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Kaspa Learning Hub</span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-6"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                    Your comprehensive resource to understand Kaspa's innovative BlockDAG technology,
                    its revolutionary capabilities, and the future of DeFi on the Kaspa network.
                </p>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 pb-20">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left sidebar navigation */}
                    <div className="md:w-1/4">
                        <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 mb-6 sticky top-[calc(var(--content-padding)+1rem)]">
                            <h3 className="text-xl font-bold text-green-400 mb-4">Learning Topics</h3>
                            <nav className="space-y-2">
                                {topics.map(topic => (
                                    <a
                                        key={topic.id}
                                        href={`#${topic.id}`}
                                        className={`block px-4 py-3 rounded-lg transition-all duration-200 ${activeTopic === topic.id
                                            ? 'bg-green-600 text-white shadow-md font-medium'
                                            : 'bg-black/50 border border-green-500/20 text-green-200 hover:bg-green-700/50 hover:text-white'
                                            }`}
                                        onClick={() => setActiveTopic(topic.id)}
                                    >
                                        {topic.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-6 pt-6 border-t border-green-500/20">
                                <button
                                    className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                                    onClick={() => setShowCommunityLinks(!showCommunityLinks)}
                                >
                                    <span>Community Resources</span>
                                    <svg
                                        className={`ml-2 w-4 h-4 transition-transform ${showCommunityLinks ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showCommunityLinks && (
                                    <div className="mt-3 space-y-2 pl-2">
                                        {communityResources.map((resource, index) => (
                                            <a
                                                key={index}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-gray-300 hover:text-green-400 py-1 transition-colors"
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

                    {/* Main content area */}
                    <div className="md:w-3/4">
                        {/* Overview Section */}
                        <section id="overview" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">Kaspa Overview</h2>

                                <p className="mb-4 text-gray-300">
                                    Kaspa is a revolutionary Layer-1 blockchain protocol that employs an innovative BlockDAG architecture
                                    (Directed Acyclic Graph) with the GHOSTDAG consensus mechanism. This novel approach enables Kaspa to
                                    achieve unprecedented scalability and transaction speeds while maintaining robust security.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <Zap size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Speed & Scalability</h3>
                                        <p className="text-gray-400">
                                            10 blocks per second with transaction inclusion in 100ms and confirmation in seconds
                                        </p>
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <Shield size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Security</h3>
                                        <p className="text-gray-400">
                                            Proof-of-Work consensus with GHOSTDAG protocol offering Bitcoin-level security guarantees
                                        </p>
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <Database size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Fair Launch</h3>
                                        <p className="text-gray-400">
                                            No pre-mine, pre-sale, or token allocations, ensuring true decentralization
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                                    <li>Fast block production (10 BPS) with the Crescendo upgrade</li>
                                    <li>Near-instant transaction finality</li>
                                    <li>High throughput capacity (2,000-3,000 TPS)</li>
                                    <li>Minimal transaction fees</li>
                                    <li>Complete Rust codebase rewrite for performance</li>
                                    <li>Potential MEV (Miner Extractable Value) resistance</li>
                                    <li>KRC-20 token standard support</li>
                                </ul>

                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Kaspa Timeline</h3>
                                    <div className="space-y-4">
                                        {kaspaTimeline.map((item, index) => (
                                            <div key={index} className="flex">
                                                <div className="flex-shrink-0 w-24 text-green-400 font-medium">{item.date}</div>
                                                <div>
                                                    <h4 className="font-bold text-white">{item.event}</h4>
                                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* BlockDAG Architecture Section */}
                        <section id="blockdag" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">BlockDAG Architecture</h2>

                                <p className="mb-6 text-gray-300">
                                    At the heart of Kaspa's innovation is its BlockDAG (Directed Acyclic Graph) architecture,
                                    a radical departure from traditional linear blockchain structures. This architecture allows
                                    multiple blocks to be created and confirmed in parallel, fundamentally resolving the
                                    throughput limitations of conventional blockchains.
                                </p>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">How BlockDAG Works</h3>
                                    <p className="text-gray-300 mb-4">
                                        Unlike a traditional blockchain where blocks form a single linear chain:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                                        <li>Multiple miners can create valid blocks simultaneously</li>
                                        <li>Each new block can reference multiple previous blocks</li>
                                        <li>The structure forms a directed acyclic graph rather than a linear chain</li>
                                        <li>Parallel block creation eliminates the fundamental throughput bottleneck</li>
                                        <li>GHOSTDAG protocol determines the main chain within the DAG structure</li>
                                    </ul>

                                    <div className="mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-green-300 italic text-sm">
                                            "While traditional blockchains form a linear chain of blocks, Kaspa's BlockDAG allows for blocks
                                            to be created and confirmed in parallel. This fundamental design choice is intended to resolve
                                            the inherent trade-off between transaction throughput and security that has constrained many
                                            earlier blockchain designs."
                                        </p>
                                    </div>

                                    <h4 className="font-bold text-white mb-2">Key Advantages:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                                        <li>Dramatically higher transaction throughput</li>
                                        <li>Faster block confirmation times</li>
                                        <li>No orphaned blocks (all valid blocks are included in the DAG)</li>
                                        <li>More efficient use of mining resources</li>
                                        <li>Native resistance to certain types of attacks</li>
                                    </ul>
                                </div>

                                <div className="border border-green-500/20 rounded-lg overflow-hidden">
                                    <div className="bg-green-500/10 px-4 py-2 text-green-400 font-medium">BlockDAG vs Traditional Blockchain</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-green-500/20">
                                        <div className="p-4">
                                            <h4 className="font-bold text-white mb-3">Traditional Blockchain</h4>
                                            <ul className="text-gray-300 space-y-2">
                                                <li>• Linear chain structure</li>
                                                <li>• Single block at a time</li>
                                                <li>• Orphaned blocks waste resources</li>
                                                <li>• Limited throughput (bottleneck)</li>
                                                <li>• Slower finality</li>
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-white mb-3">Kaspa BlockDAG</h4>
                                            <ul className="text-gray-300 space-y-2">
                                                <li>• Directed acyclic graph structure</li>
                                                <li>• Multiple parallel blocks</li>
                                                <li>• All valid blocks are included</li>
                                                <li>• High throughput (scalable)</li>
                                                <li>• Rapid finality</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* GHOSTDAG Protocol Section */}
                        <section id="ghostdag" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">GHOSTDAG Protocol</h2>

                                <p className="mb-6 text-gray-300">
                                    The GHOSTDAG protocol is the consensus mechanism that powers Kaspa's BlockDAG architecture.
                                    It builds upon the original GHOST (Greedy Heaviest Observed Subtree) protocol, adapting it
                                    specifically for DAG structures to determine consensus in an environment where multiple valid
                                    blocks can exist simultaneously.
                                </p>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">Core Principles</h3>

                                    <p className="text-gray-300 mb-4">
                                        GHOSTDAG solves the fundamental challenge of determining the canonical ordering of transactions
                                        in a BlockDAG structure where multiple blocks are created in parallel:
                                    </p>

                                    <ol className="list-decimal list-inside space-y-3 text-gray-300 mb-6">
                                        <li>
                                            <span className="font-medium text-white">Block Scoring:</span> Assigns weights to blocks based on their
                                            position and connections within the DAG
                                        </li>
                                        <li>
                                            <span className="font-medium text-white">Block Coloring:</span> Uses a "blue/red" coloring system to
                                            determine which blocks are part of the main chain
                                        </li>
                                        <li>
                                            <span className="font-medium text-white">Main Chain Selection:</span> Selects the "heaviest" path through
                                            the DAG as the canonical chain
                                        </li>
                                        <li>
                                            <span className="font-medium text-white">Parallel Processing:</span> Allows blocks created in parallel to be
                                            integrated into the consensus DAG
                                        </li>
                                    </ol>

                                    <div className="mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-green-300 italic text-sm">
                                            "A key feature of the GHOSTDAG protocol is its handling of blocks created in parallel. Instead of
                                            orphaning these blocks (as occurs in linear chains, leading to wasted computational effort),
                                            GHOSTDAG incorporates them into the consensus structure of the BlockDAG. This not only improves
                                            mining efficiency but also contributes to the overall security and throughput of the network."
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">Security Properties</h3>

                                    <p className="text-gray-300 mb-4">
                                        GHOSTDAG is designed to offer strong security guarantees while enabling high throughput:
                                    </p>

                                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                                        <li>Provides security similar to Bitcoin's Nakamoto consensus</li>
                                        <li>Resistant to various attack vectors while maintaining high throughput</li>
                                        <li>Ensures proper transaction ordering even in high-throughput scenarios</li>
                                        <li>Allows for faster confirmation times without compromising security</li>
                                        <li>Creates deterministic consensus even with multiple parallel blocks</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* DAGKnight Protocol Section */}
                        <section id="dagknight" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">DAGKnight Protocol</h2>

                                <p className="mb-6 text-gray-300">
                                    DAGKnight represents the next evolution of Kaspa's consensus mechanism, designed to
                                    enhance the security, responsiveness, and adaptability of the network. Currently under
                                    development, DAGKnight builds upon GHOSTDAG's foundation with several advanced features.
                                </p>

                                <div className="flex items-center bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
                                    <Clock className="text-green-400 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-green-200">
                                        <span className="font-medium">Development Status:</span> In active development with an
                                        updated whitepaper released in February 2023. Community-funded through a successful
                                        crowdfunding campaign completed in December 2022.
                                    </p>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">Key Innovations</h3>

                                    <ul className="space-y-4 text-gray-300">
                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">1</div>
                                            <div>
                                                <span className="font-medium text-white">Parameterless Design</span>
                                                <p className="text-sm mt-1">
                                                    Unlike protocols that rely on fixed assumptions about network conditions, DAGKnight
                                                    dynamically adapts without requiring hardcoded parameters. This allows the network to
                                                    naturally scale with improvements in global internet infrastructure.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">2</div>
                                            <div>
                                                <span className="font-medium text-white">Network Responsiveness</span>
                                                <p className="text-sm mt-1">
                                                    DAGKnight actively evaluates real-time network conditions and adjusts block confirmation
                                                    parameters accordingly. This provides faster confirmations when the network is healthy
                                                    while automatically becoming more conservative during adverse conditions.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">3</div>
                                            <div>
                                                <span className="font-medium text-white">Enhanced 50% Attack Resistance</span>
                                                <p className="text-sm mt-1">
                                                    Designed to provide improved resistance to 50% attacks, particularly in scenarios with
                                                    fluctuating network latency. DAGKnight aims for 50% Byzantine Fault Tolerance under
                                                    varying network conditions.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">4</div>
                                            <div>
                                                <span className="font-medium text-white">Self-Stabilization</span>
                                                <p className="text-sm mt-1">
                                                    If the underlying GHOSTDAG protocol encounters issues confirming transactions due to
                                                    excessive network delays, DAGKnight is designed to remain operational and maintain
                                                    consensus, albeit potentially at a reduced speed.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                    <p className="text-green-300 italic text-sm">
                                        "If successfully implemented, DAGKnight could provide Kaspa with an unparalleled combination
                                        of speed, security, and adaptability, significantly strengthening its case as a foundational
                                        layer for a new generation of decentralized systems."
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* KRC-20 Tokens Section */}
                        <section id="krc20" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">KRC-20 Tokens</h2>

                                <p className="mb-6 text-gray-300">
                                    The KRC-20 token standard is Kaspa's equivalent to Ethereum's ERC-20, enabling the creation
                                    and management of fungible tokens on the Kaspa blockchain. Launched in beta in June 2024,
                                    the KRC-20 standard combines the ease of use associated with ERC-20 with the inherent security,
                                    speed, and scalability of the Kaspa network.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Technical Implementation</h3>

                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">On-Chain Data Inscription</span>
                                                    <p className="text-sm mt-1">
                                                        Utilizes a data inscription mechanism through Kasplex, with Pay-to-Script-Hash (P2SH)
                                                        optimizations to avoid UTXO bloat
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">Indexing and APIs</span>
                                                    <p className="text-sm mt-1">
                                                        Open-source indexer scans the Kaspa network for relevant transactions and metadata,
                                                        making this data accessible via public APIs for developer integration
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">Direct KAS Swaps</span>
                                                    <p className="text-sm mt-1">
                                                        KRC-20 tokens can be swapped directly to KAS using Partially Signed Kaspa Transactions
                                                        (PSKTs), eliminating the need for wrapping tokens for basic swaps
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Current Ecosystem Status</h3>

                                        <p className="text-gray-300 mb-4">
                                            The KRC-20 ecosystem is in a developing stage with several categories of tokens:
                                        </p>

                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">Memecoin Proliferation</span>
                                                    <p className="text-sm mt-1">
                                                        Early adoption dominated by memecoins generating initial interest and trading activity
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">Emerging Utility Tokens</span>
                                                    <p className="text-sm mt-1">
                                                        Projects like BetterTherapy (healthcare payments) and Kaspafunding (FUND) for ecosystem
                                                        development are introducing utility-focused tokens
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                <div>
                                                    <span className="font-medium text-white">Infrastructure Development</span>
                                                    <p className="text-sm mt-1">
                                                        Community teams working on foundational DeFi primitives like decentralized exchanges (DEXs)
                                                        to support the growing token economy
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">Creating KRC-20 Tokens</h3>

                                    <p className="text-gray-300 mb-4">
                                        KRC-20 tokens can be created following a simple process:
                                    </p>

                                    <ol className="space-y-3 text-gray-300">
                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">1</div>
                                            <div>
                                                <span className="font-medium text-white">Deploy Token</span>
                                                <p className="text-sm mt-1">
                                                    Define token parameters including ticker symbol, maximum supply, and mint limit per transaction
                                                </p>
                                                <div className="mt-2 bg-black/70 rounded p-2 font-mono text-xs text-green-300">
                                                    {`{
  "p": "KRC-20",
  "op": "deploy",
  "tick": "EXAMPLE",
  "max": "1000000000000",
  "lim": "1000000000"
}`}
                                                </div>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">2</div>
                                            <div>
                                                <span className="font-medium text-white">Mint Tokens</span>
                                                <p className="text-sm mt-1">
                                                    Create new tokens within the defined limits
                                                </p>
                                                <div className="mt-2 bg-black/70 rounded p-2 font-mono text-xs text-green-300">
                                                    {`{
  "p": "KRC-20",
  "op": "mint",
  "tick": "EXAMPLE"
}`}
                                                </div>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">3</div>
                                            <div>
                                                <span className="font-medium text-white">Transfer Tokens</span>
                                                <p className="text-sm mt-1">
                                                    Send tokens to other addresses
                                                </p>
                                                <div className="mt-2 bg-black/70 rounded p-2 font-mono text-xs text-green-300">
                                                    {`{
  "p": "KRC-20",
  "op": "transfer",
  "tick": "EXAMPLE",
  "amt": "1000000000",
  "to": "kaspa:address..."
}`}
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </section>

                        {/* Layer 2 Solutions Section */}
                        <section id="layers" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">Layer 2 Solutions</h2>

                                <p className="mb-6 text-gray-300">
                                    Kaspa's architectural design focuses on a lean and exceptionally fast Layer-1 (L1) for UTXO-based
                                    transactions and secure sequencing. Complex smart contract execution is primarily envisioned for
                                    Layer-2 (L2) solutions built on top of Kaspa, preventing the L1 from becoming a bottleneck while
                                    enabling rich functionality.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {layer2Solutions.map((solution, index) => (
                                        <div key={index} className="bg-black/50 border border-green-500/10 rounded-lg p-6 flex flex-col">
                                            <div className="mb-4">
                                                {solution.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{solution.name}</h3>
                                            <p className="text-gray-300 text-sm mb-4 flex-grow">{solution.description}</p>
                                            <div className="mt-auto">
                                                <div className="text-xs font-medium text-green-400 mb-1">STATUS</div>
                                                <div className="text-white font-medium">{solution.status}</div>
                                                <div className="text-gray-400 text-xs mt-1">{solution.timeline}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">Multi-Tier Strategy</h3>

                                    <p className="text-gray-300 mb-4">
                                        Kaspa is pursuing a multi-faceted L2 approach to address different needs:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Short-Term: EVM Compatibility</h4>
                                            <p className="text-gray-300 text-sm">
                                                Igra Network is developing an EVM-compatible L2 to lower the barrier to entry for
                                                Ethereum developers and dApps. This strategy aims to accelerate ecosystem growth by
                                                enabling existing projects to deploy on Kaspa with minimal modification.
                                            </p>
                                        </div>

                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Long-Term: ZK-Rollup Focus</h4>
                                            <p className="text-gray-300 text-sm">
                                                The core vision centers on establishing "based ZK-rollups" as the standard for L2s on Kaspa.
                                                Projects like Sparkle ("Layer 1.5") will leverage zero-knowledge proofs for scalability,
                                                privacy, and security, inheriting Kaspa L1's security for sequencing.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">Enabling Technologies</h3>

                                    <p className="text-gray-300 mb-4">
                                        Several Kaspa Improvement Proposals (KIPs) are supporting this L2 vision:
                                    </p>

                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <div className="bg-green-500/20 px-2 py-0.5 rounded text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs font-mono">KIP-14</div>
                                            <div>
                                                <span className="font-medium text-white">Data Payloads</span>
                                                <p className="text-sm mt-1">
                                                    Enables transactions to carry arbitrary data payloads, a fundamental prerequisite for
                                                    smart contracts as it allows function calls and parameters to be embedded within transactions
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start">
                                            <div className="bg-green-500/20 px-2 py-0.5 rounded text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs font-mono">KIP-15</div>
                                            <div>
                                                <span className="font-medium text-white">Cost-Effective L2s</span>
                                                <p className="text-sm mt-1">
                                                    Allows L2 nodes to trustlessly prove the sequence and acceptance of their smart contract
                                                    executions to new synchronizing nodes without requiring them to store the entire L1 history
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start">
                                            <div className="bg-green-500/20 px-2 py-0.5 rounded text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs font-mono">ZK-opcodes</div>
                                            <div>
                                                <span className="font-medium text-white">Zero-Knowledge Operations</span>
                                                <p className="text-sm mt-1">
                                                    Planned set of operations to support zero-knowledge proof systems for the Sparkle development
                                                    stack and other ZK-based L2 solutions
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Tokenomics Section */}
                        <section id="tokenomics" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">Tokenomics</h2>

                                <p className="mb-6 text-gray-300">
                                    Kaspa's economic model is designed to support its technological goals and foster a secure,
                                    decentralized, and ultimately liquid network. The model emphasizes fair distribution and long-term
                                    sustainability.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Supply and Distribution</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-300">Maximum Supply</span>
                                                    <span className="font-medium text-white">28.7 billion KAS</span>
                                                </div>
                                                <div className="w-full h-2 bg-black/50 rounded-full">
                                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }}></div>
                                                </div>
                                                <div className="text-right text-xs text-gray-400 mt-1">~26.13 billion circulating (91%)</div>
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-green-300 font-medium mb-2">Fair Launch Distribution</p>
                                                <ul className="text-gray-300 space-y-1 text-sm">
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        No pre-mine
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        No pre-sale
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        No team/investor allocations
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        All coins distributed through mining
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Emission Schedule</h3>

                                        <p className="text-gray-300 mb-4 text-sm">
                                            Kaspa follows a deflationary emission schedule with regular reductions in block rewards:
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="font-medium text-white">Chromatic Phase</p>
                                                <p className="text-gray-300 text-sm">
                                                    Current emission phase with geometrically decreasing block rewards.
                                                    Rewards halve once per year through monthly adjustments, each decreasing by
                                                    a factor of (1/2)<sup>(1/12)</sup>.
                                                </p>
                                            </div>

                                            <div className="pt-2">
                                                <p className="font-medium text-white">Long-Term Security Budget</p>
                                                <p className="text-gray-300 text-sm">
                                                    Block rewards become negligible approximately 36 years after mainnet launch.
                                                    Network security will then primarily rely on transaction fees.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">Fee Structure</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-gray-300 mb-4">
                                                Kaspa employs a minimal fee structure with dynamic adjustments:
                                            </p>

                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Minimum Fee:</span> 1 sompi per gram of transaction
                                                        data (1 KAS = 10<sup>8</sup> sompis)
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Typical Transaction:</span> ~0.000023 KAS
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Wallet Default:</span> Some wallets use a fixed fee of
                                                        0.0001 KAS per UTXO
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Fee Market:</span> Fees increase automatically when
                                                        the network experiences congestion
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="text-gray-300 mb-4">
                                                Future fee sources to sustain network security:
                                            </p>

                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Smart Contract Execution:</span> Fees from L2 smart
                                                        contract operations
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">L2 Settlements:</span> Fees from L2 solutions settling
                                                        on the Kaspa L1
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">Cross-Chain Support:</span> Potential revenue from
                                                        Kaspa supporting Ethereum settlements
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                                    <div>
                                                        <span className="font-medium text-white">High Transaction Volume:</span> Security through
                                                        massive scale with low individual fees
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Future DeFi Ecosystem Section */}
                        <section id="defi" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">Future DeFi Ecosystem</h2>

                                <p className="mb-6 text-gray-300">
                                    While Kaspa's native DeFi ecosystem is in its early stages, the foundational technology and
                                    ongoing development of L2 solutions are paving the way for a robust decentralized finance
                                    landscape. The future Kaspa DeFi ecosystem will leverage the network's unique strengths to
                                    provide innovative financial services.
                                </p>

                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
                                    <p className="text-sm text-green-200 font-medium">
                                        Current Status: Kaspa's DeFi ecosystem is in a nascent stage with primary focus on infrastructure
                                        development. The rapid transaction speeds, low fees, and upcoming L2 solutions position Kaspa
                                        for significant DeFi growth as the ecosystem matures.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Key DeFi Building Blocks</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Near-Instant Finality</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        Kaspa's quick transaction finality enables faster DeFi operations, reducing the
                                                        time between trades, loans, and other financial actions. This could lead to more
                                                        capital efficiency and better user experiences.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <Layers size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Layer 2 Composability</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        With multiple L2 solutions in development, Kaspa's DeFi ecosystem could benefit from
                                                        strong composability between different applications, allowing for complex financial
                                                        interactions while retaining the security of the base layer.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <RefreshCw size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Decentralized Exchanges (DEXs)</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        Community teams are working on DEX solutions to facilitate token trading.
                                                        Kaspa's high speed and low fees could enable highly efficient swaps with reduced slippage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-3">Unique Advantages for DeFi</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <Zap size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">MEV Resistance</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        Kaspa's potential resistance to Miner Extractable Value (MEV) could create a fairer
                                                        trading environment, reducing front-running, sandwich attacks, and other predatory
                                                        practices that affect DeFi users on other chains.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <Shield size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Lending and Borrowing Protocols</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        Future lending protocols on Kaspa could leverage the network's rapid settlement for
                                                        more efficient liquidations and risk management, potentially enabling lower collateralization
                                                        requirements.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                                                    <Database size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Stablecoins</p>
                                                    <p className="text-gray-300 text-sm mt-1">
                                                        The Kaspa Industrial Initiative (KII) has mentioned plans for stablecoin development,
                                                        including the "Gigawa Stable Coin." Native stablecoins would be a critical component
                                                        for broader DeFi adoption.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* MEV Resistance Section */}
                        <section id="mev" className="mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
                            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                                <h2 className="text-3xl font-bold text-green-400 mb-6">MEV Resistance: Kaspa's Solution to Blockchain's Extraction Crisis</h2>

                                <p className="mb-6 text-gray-300">
                                    Maximal Extractable Value (MEV) represents one of the most significant threats to fair and
                                    decentralized blockchain ecosystems today. Originally termed "Miner Extractable Value" during Ethereum's
                                    proof-of-work era, MEV refers to the value that can be extracted from block production beyond standard
                                    rewards by manipulating transaction ordering. Kaspa's unique BlockDAG architecture provides a
                                    fundamental solution to this systemic problem.
                                </p>

                                <div className="flex items-center bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
                                    <AlertTriangle className="text-green-400 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-green-200">
                                        <span className="font-medium">Industry Impact:</span> Since 2020, MEV extraction has evolved from an
                                        academic curiosity into a sophisticated industry worth over $686 million on Ethereum alone. In extreme cases,
                                        users can lose nearly all their funds—as happened in March 2023 when a trader lost approximately $215,000
                                        (98% of their funds) during what should have been a simple stablecoin swap.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <DollarSign size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Direct User Losses</h3>
                                        <p className="text-gray-400">
                                            Research has identified over 265,000 sandwich attacks affecting nearly 125,000 unique victims
                                            with losses totaling $20 million plus $9 million in reordering slippage
                                        </p>
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <ServerCrash size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Centralization Risk</h3>
                                        <p className="text-gray-400">
                                            Block building centralization creates censorship risks, while MEV revenue advantages
                                            push solo validators to join larger staking pools, reducing network decentralization
                                        </p>
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-lg border border-green-500/10">
                                        <div className="mb-3 text-green-400">
                                            <Lock size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">DeFi Vulnerability</h3>
                                        <p className="text-gray-400">
                                            MEV infrastructure amplifies smart contract vulnerabilities through transaction transparency,
                                            flash loan amplification, and validator/miner collusion
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">The Dark Side: How MEV Extractors Operate</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">SELFDESTRUCT Opcode Exploitation</h4>
                                            <p className="text-gray-300 text-sm">
                                                MEV extractors deliberately undermine blockchain transparency using Ethereum's SELFDESTRUCT opcode to:
                                                1) Deploy contracts containing MEV strategies, 2) Execute them to extract value, and 3) Immediately
                                                self-destruct the contracts to hide their extraction logic. Recent Ethereum updates (EIP-6780) have
                                                reduced but not eliminated this functionality.
                                            </p>
                                            <div className="mt-3 p-2 bg-black/80 rounded-md font-mono text-xs text-green-300">
                                                <p>// Typical extraction pattern</p>
                                                <p>1. Deploy contract with CREATE2</p>
                                                <p>2. Execute MEV extraction logic</p>
                                                <p>3. SELFDESTRUCT the contract</p>
                                                <p>4. Redeploy different code at same address</p>
                                            </div>
                                        </div>

                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Private Mempool Infrastructure</h4>
                                            <p className="text-gray-300 text-sm">
                                                The proliferation of private transaction channels has created fundamental transparency issues,
                                                with data showing over 50% of all transactions in some periods bypassing the public mempool.
                                                This opacity directly contradicts blockchain's founding principles of transparency and equal access.
                                            </p>
                                            <div className="mt-3">
                                                <p className="text-xs text-green-400 font-medium">Common MEV Extraction Strategies:</p>
                                                <ul className="mt-1 space-y-1 text-xs text-gray-300">
                                                    <li>• Sandwich attacks (front and back running)</li>
                                                    <li>• Liquidation sniping in lending protocols</li>
                                                    <li>• Arbitrage between liquidity pools</li>
                                                    <li>• Just-in-time (JIT) liquidity provision</li>
                                                    <li>• NFT sniping/minting optimization</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-green-300 italic text-sm">
                                            "During the July 2023 Curve Finance hack, white-hat rescuers attempted to front-run attackers to recover funds,
                                            but MEV bots monitored these rescue attempts in the public mempool and outbid the white-hat efforts, resulting
                                            in millions in additional losses. This incident resulted in the largest MEV block rewards in Ethereum's history."
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">Why Current MEV Protection Fails</h3>

                                    <p className="text-gray-300 mb-4">
                                        Despite numerous attempts to address MEV, current protection mechanisms consistently fall short due to
                                        fundamental limitations:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Private Mempools</h4>
                                            <p className="text-gray-300 text-sm">
                                                Services like Flashbots Protect and MEV Blockers route transactions directly to validators without
                                                exposing them publicly, but still rely on trusted operators who could potentially exploit transaction
                                                data themselves. The April 2023 Flashbots relay vulnerability that resulted in $20 million stolen
                                                demonstrates these weaknesses.
                                            </p>
                                        </div>

                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Builder-Searcher Integration</h4>
                                            <p className="text-gray-300 text-sm">
                                                A concerning trend is the increasing vertical integration between searchers (who find MEV opportunities)
                                                and block builders (who construct blocks), creating information advantages that undermine existing
                                                protections through priority manipulation and order flow capture.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-green-300 italic text-sm">
                                            "These solutions face constant pressure from MEV extractors who continuously develop more sophisticated
                                            bypass techniques. The arms race between protection mechanisms and extraction methods ensures that MEV
                                            extraction will continue to evolve faster than protections."
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-3">Layer 2 Solutions: Inheriting Problems or Solutions?</h3>

                                    <p className="text-gray-300 mb-4">
                                        Layer 2 solutions face a critical choice: implement MEV resistance at the protocol level or risk recreating
                                        the same extractive economic landscape as their underlying Layer 1s. Research shows cross-layer sandwich attacks
                                        have already extracted approximately $2 million across different L2s.
                                    </p>

                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                            <div>
                                                <span className="font-medium text-white">Cross-Layer MEV Attacks</span>
                                                <p className="text-sm mt-1">
                                                    Novel attack strategies that bypass traditional MEV protections by exploiting execution delays
                                                    between chains, allowing attackers to observe transactions in the L1 mempool before they execute on L2
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                            <div>
                                                <span className="font-medium text-white">Architecture-Independent Vulnerabilities</span>
                                                <p className="text-sm mt-1">
                                                    Regardless of the underlying Layer 1 blockchain, certain vulnerability classes like reentrancy,
                                                    flash loan attacks, and oracle manipulation will transfer to any Layer 2 implementation
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 mt-0.5 flex-shrink-0 text-xs">•</div>
                                            <div>
                                                <span className="font-medium text-white">Centralized Sequencers</span>
                                                <p className="text-sm mt-1">
                                                    Many current L2 solutions rely on centralized sequencers, which simply shifts the MEV extraction
                                                    potential from miners/validators to sequencer operators
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-black/50 border border-green-500/10 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-3">How Kaspa Solves the MEV Problem</h3>

                                    <p className="text-gray-300 mb-4">
                                        Unlike incremental solutions that try to mitigate MEV symptoms, Kaspa's innovative BlockDAG architecture
                                        addresses the root cause by fundamentally changing how transactions are ordered and validated:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">BlockDAG's Structural Advantage</h4>
                                            <p className="text-gray-300 text-sm">
                                                In traditional blockchains, MEV extraction is possible because a single entity controls the ordering of transactions within each block.
                                                Kaspa's BlockDAG fundamentally breaks this monopoly by allowing multiple blocks to be created simultaneously. This parallel block
                                                production makes it impossible for a single miner to monopolize transaction ordering across the entire network.
                                            </p>
                                            <div className="mt-3 p-2 bg-black/80 rounded-md text-xs text-green-300">
                                                <p className="font-medium">Technical Insight:</p>
                                                <p>With 10 blocks per second (BPS), a front-runner would need to control the entire mining network for
                                                    a sustained period to reliably execute sandwich attacks—a scenario that's economically infeasible
                                                    in a properly decentralized network.</p>
                                            </div>
                                        </div>

                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">GHOSTDAG's Role in MEV Prevention</h4>
                                            <p className="text-gray-300 text-sm">
                                                The GHOSTDAG protocol's transaction ordering mechanism creates an environment where predictable transaction ordering
                                                (required for successful MEV extraction) becomes extremely difficult. By including multiple parallel blocks in the consensus
                                                DAG, GHOSTDAG creates uncertainty about which miner will include any given transaction.
                                            </p>
                                            <div className="mt-3 p-2 bg-black/80 rounded-md text-xs text-green-300">
                                                <p className="font-medium">Blue Set Selection:</p>
                                                <p>GHOSTDAG's blue set selection algorithm establishes a deterministic order for parallel blocks that's extremely
                                                    difficult to manipulate, making it nearly impossible for extractors to reliably predict transaction sequencing.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <ol className="space-y-3 text-gray-300">
                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">1</div>
                                            <div>
                                                <span className="font-medium text-white">Eliminating Monopolistic Block Control</span>
                                                <p className="text-sm mt-1">
                                                    Unlike traditional blockchains where a single miner controls each block, Kaspa's BlockDAG allows
                                                    multiple miners to produce blocks simultaneously, creating competition for transaction inclusion
                                                    that prevents monopolistic ordering power.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">2</div>
                                            <div>
                                                <span className="font-medium text-white">Miner Kickback Auction System</span>
                                                <p className="text-sm mt-1">
                                                    When multiple miners compete to include the same transactions, they must offer competitive
                                                    kickbacks to users. In equilibrium, the miner kickback equals the MEV value, resulting in a
                                                    net-zero transaction cost for users—effectively returning extracted value to the users themselves.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">3</div>
                                            <div>
                                                <span className="font-medium text-white">Increased Auction Frequency</span>
                                                <p className="text-sm mt-1">
                                                    With Kaspa's high block rate (10 blocks per second with the Crescendo upgrade), the frequency of
                                                    these auctions increases, enhancing the likelihood that miner kickbacks will match user rebates
                                                    and effectively neutralize MEV extraction. This creates a mathematical probability barrier to
                                                    successful MEV extraction.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">4</div>
                                            <div>
                                                <span className="font-medium text-white">Stealth Transactions via DAG</span>
                                                <p className="text-sm mt-1">
                                                    Kaspa's architecture enables users to submit encrypted transactions that are only decrypted after
                                                    inclusion in a block. Since multiple blocks are produced in parallel, front-runners cannot reliably
                                                    predict which block will include the transaction, making front-running attacks probabilistically infeasible.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">5</div>
                                            <div>
                                                <span className="font-medium text-white">Transaction Randomization</span>
                                                <p className="text-sm mt-1">
                                                    The GHOSTDAG protocol encourages miners to select transactions randomly rather than strictly by fees.
                                                    This randomization further obscures transaction ordering, making it difficult for MEV extractors to
                                                    predict which transactions will be included in which blocks and in what order.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>

                                    <div className="mt-6 mb-6 bg-black/70 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-green-300 italic text-sm">
                                            "Kaspa's BlockDAG architecture and GHOSTDAG protocol offer the only truly effective solution by addressing
                                            MEV at the protocol level. By enabling parallel block processing and implementing multi-leader consensus,
                                            Kaspa creates structural obstacles to MEV extraction rather than trying to patch vulnerabilities in
                                            fundamentally MEV-prone architectures."
                                        </p>
                                    </div>

                                    <div className="border border-green-500/20 rounded-lg overflow-hidden mt-6">
                                        <div className="bg-green-500/10 px-4 py-2 text-green-400 font-medium">Implementation Guidelines for Kaspa L2 Builders</div>
                                        <div className="p-4">
                                            <ul className="text-gray-300 space-y-2">
                                                <li className="flex items-center">
                                                    <Cpu size={16} className="mr-2 text-green-400" />
                                                    <span>Design for MEV resistance from the ground up with encrypted mempools</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Cpu size={16} className="mr-2 text-green-400" />
                                                    <span>Implement time-locked encryption and batch execution with predetermined ordering</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Cpu size={16} className="mr-2 text-green-400" />
                                                    <span>Balance decentralization with tiered sequencer designs and regular rotation</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Cpu size={16} className="mr-2 text-green-400" />
                                                    <span>Ensure protocol transparency with robust monitoring and verification systems</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Cpu size={16} className="mr-2 text-green-400" />
                                                    <span>Implement strong cross-chain security with multi-signature requirements</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold mb-4 text-kaspa-green mt-8">Layer 2 Solutions with Inherited MEV Resistance</h3>

                                    <p className="text-gray-300 mb-4">
                                        Kaspa's Layer 2 solutions inherit the MEV-resistant properties of the base layer, creating an ecosystem
                                        that's fundamentally more resistant to extraction at every level. This inheritance occurs through several
                                        technical mechanisms:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">Kasplex: Inherited Ordering Uncertainty</h4>
                                            <p className="text-gray-300 text-sm">
                                                Kasplex, the most mature L2 implementation, leverages Kaspa's multi-block parallel production to create an
                                                environment where MEV extractors face probabilistic barriers to successful front-running. By committing state transitions
                                                to multiple parallel blocks rather than a single block, Kasplex inherits Kaspa's natural defense against
                                                monopolistic transaction ordering.
                                            </p>
                                            <div className="mt-3 p-2 bg-black/80 rounded-md text-xs text-green-300">
                                                <p className="font-medium">Technical Implementation:</p>
                                                <p>Kasplex uses a distributed sequencing mechanism where multiple sequencers can propose state transitions,
                                                    with final ordering determined through a consensus protocol derived from GHOSTDAG's principles. This prevents any
                                                    single sequencer from having full control over transaction ordering.</p>
                                            </div>
                                        </div>

                                        <div className="bg-black/70 border border-green-500/20 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">ZK-Rollups: Threshold Cryptography</h4>
                                            <p className="text-gray-300 text-sm">
                                                ZK-rollup implementations on Kaspa combine the BlockDAG's inherent MEV resistance with zero-knowledge proofs
                                                and threshold cryptography to prevent transaction data from being visible to any single party until after ordering
                                                is finalized. This creates a technical barrier to MEV extraction that's almost impossible to circumvent.
                                            </p>
                                            <div className="mt-3 p-2 bg-black/80 rounded-md text-xs text-green-300">
                                                <p className="font-medium">Cryptographic Protection:</p>
                                                <p>Transaction data is encrypted with a threshold scheme requiring multiple independent parties to
                                                    collaborate to decrypt. The transaction is first ordered, then decrypted and executed, making it
                                                    impossible to front-run transactions based on their content.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/70 border border-green-500/20 rounded-lg p-4 mb-6">
                                        <h4 className="font-bold text-green-400 mb-2">Cross-Layer MEV Protection</h4>
                                        <p className="text-gray-300 text-sm">
                                            Unlike other Layer 2 solutions that remain vulnerable to cross-layer MEV attacks, Kaspa's L2 implementations
                                            are specifically designed to prevent these attack vectors through several technical mechanisms:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-300 text-sm list-disc list-inside">
                                            <li>
                                                <span className="font-medium text-white">Mempool Isolation:</span> Transactions bound for L2 are never visible
                                                in the L1 mempool, preventing the observation and exploitation of L1→L2 transaction flows
                                            </li>
                                            <li>
                                                <span className="font-medium text-white">Commit-Reveal Schemes:</span> Transactions use a two-phase commit-reveal
                                                pattern where only a hash of the transaction is submitted first, with the full transaction details revealed
                                                only after ordering is finalized
                                            </li>
                                            <li>
                                                <span className="font-medium text-white">Execution Delay Elimination:</span> The high throughput of Kaspa's BlockDAG
                                                significantly reduces the execution delay window typically exploited in cross-layer attacks
                                            </li>
                                            <li>
                                                <span className="font-medium text-white">Batch Processing:</span> Transactions are processed in predetermined batches
                                                with fixed ordering, eliminating intra-batch MEV opportunities
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-green-200">
                                            <span className="font-medium">Mathematical Analysis:</span> Game theory models suggest that in Kaspa's multi-leader
                                            consensus environment with high block production rates, MEV extraction becomes a negative-sum game for extractors,
                                            as the cost of attempting extraction exceeds potential profits. This creates a natural economic disincentive
                                            for MEV extraction that extends to Layer 2 solutions built on Kaspa.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <style jsx="true">{`
          .animate-on-scroll.animate-in {
            opacity: 1 !important;
          }
          
          /* Ensure targeted sections are always visible */
          .animate-on-scroll:target {
            opacity: 1 !important;
          }
          
          /* Optional: Add a staggered reveal effect */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-on-scroll.animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
        </div>
    );
};

export default LearnPage;
