import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import KasportalLogo from './KasportalLogo';
import GlassmorphicCard from './GlassmorphicCard';

// Enhanced Animated Logo Component
const AnimatedKasportalLogo = ({ className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative ${className}`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Pulsing glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full blur-xl opacity-0"
                style={{
                    background: 'linear-gradient(45deg, #14b8a6, #8b5cf6)',
                }}
                animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Subtle pulse animation */}
            <motion.div
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <KasportalLogo width="80" height="80" />
            </motion.div>
        </motion.div>
    );
};

// Cosmic Network Background Component
const CosmicNetworkBackground = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

    const nodes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
    }));

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Cosmic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />

            {/* Animated network nodes */}
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
                    </radialGradient>
                </defs>

                {/* Connection lines */}
                {nodes.map((node, i) =>
                    nodes.slice(i + 1).map((otherNode, j) => {
                        const distance = Math.sqrt(
                            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                        );
                        if (distance < 30) {
                            return (
                                <motion.line
                                    key={`${i}-${j}`}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${otherNode.x}%`}
                                    y2={`${otherNode.y}%`}
                                    stroke="url(#lineGradient)"
                                    strokeWidth="1"
                                    opacity="0.3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: node.delay }}
                                />
                            );
                        }
                        return null;
                    })
                )}

                {/* Network nodes */}
                {nodes.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r="3"
                        fill="url(#nodeGradient)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            delay: node.delay,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                ))}

                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Floating particles */}
            <motion.div
                className="absolute inset-0"
                style={{ y: y1 }}
            >
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

// Enhanced Glassmorphic Card with Professional Styling
const ProfessionalGlassCard = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 }
            }}
            className={`group relative ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 p-8">
                {children}
            </div>
        </motion.div>
    );
};

// Cursor Trail Effect
const CursorTrail = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newPosition = { x: e.clientX, y: e.clientY };
            setMousePosition(newPosition);

            setTrail(prev => [
                ...prev.slice(-8),
                { ...newPosition, id: Date.now() }
            ]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"
                    style={{
                        left: point.x - 4,
                        top: point.y - 4,
                    }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}
        </div>
    );
};

// Main Professional Revolutionary Landing Component
const ProfessionalRevolutionaryLanding = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);

    const features = [
        {
            title: "Cross-Chain DeFi",
            description: "Seamlessly interact with multiple blockchain networks through our unified protocol.",
            icon: "🌐",
            gradient: "from-teal-400 to-blue-500"
        },
        {
            title: "Advanced Security",
            description: "Military-grade encryption and smart contract auditing for maximum protection.",
            icon: "🛡️",
            gradient: "from-purple-400 to-pink-500"
        },
        {
            title: "Lightning Fast",
            description: "Sub-second transaction processing with optimized routing algorithms.",
            icon: "⚡",
            gradient: "from-blue-400 to-cyan-500"
        },
        {
            title: "Professional Tools",
            description: "Enterprise-grade analytics and portfolio management capabilities.",
            icon: "📊",
            gradient: "from-teal-500 to-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
            <CosmicNetworkBackground />
            <CursorTrail />

            {/* Hero Section */}
            <motion.section
                className="relative min-h-screen flex items-center justify-center px-4"
                style={{ y: heroY }}
            >
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <AnimatedKasportalLogo className="mx-auto mb-8" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                        Kasportal
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
                    >
                        The future of decentralized finance. Professional-grade tools for the next generation of blockchain technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-semibold text-lg shadow-2xl hover:shadow-teal-500/25 transition-all duration-300"
                        >
                            Launch App
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                            Revolutionary Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience the next evolution of DeFi with our cutting-edge technology stack.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <ProfessionalGlassCard key={index} delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="text-4xl mb-6">{feature.icon}</div>
                                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </ProfessionalGlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ProfessionalGlassCard>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                                Ready to Begin?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Join thousands of users already experiencing the future of decentralized finance.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-semibold text-lg shadow-2xl hover:shadow-teal-500/25 transition-all duration-300"
                            >
                                Get Started Today
                            </motion.button>
                        </motion.div>
                    </ProfessionalGlassCard>
                </div>
            </section>
        </div>
    );
};

export default ProfessionalRevolutionaryLanding;
