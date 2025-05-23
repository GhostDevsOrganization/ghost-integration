import React, { useState } from 'react';
import { Zap, Brain, Atom, GraduationCap, Award, BookOpen, Users, Target } from 'lucide-react';

const roadmapData = [
    {
        phase: '🚀 PHASE 1',
        title: 'PARALLEL EXECUTION REVOLUTION',
        subtitle: 'Q2-Q3 2025 - "The Speed Breakthrough"',
        icon: <Zap className="w-6 h-6" />,
        color: 'from-blue-400 to-cyan-600',
        bgColor: 'bg-blue-900/20',
        borderColor: 'border-blue-400/30',
        details: [
            'Multi-Path AMM (MP-AMM) - World\'s first parallel swap router',
            'Temporal Arbitrage Engine leveraging 1-second blocks',
            'Interactive Parallel Execution Visualizer for education',
            'Academic paper: "Temporal Dynamics in DAG-Based Trading"'
        ],
        metrics: {
            performance: '10x throughput improvement',
            innovation: 'Eliminates MEV by design',
            academic: 'PhD thesis potential'
        }
    },
    {
        phase: '🧠 PHASE 2',
        title: 'AI-POWERED BLOCKCHAIN INNOVATION',
        subtitle: 'Q4 2025 - Q1 2026 - "The Intelligence Layer"',
        icon: <Brain className="w-6 h-6" />,
        color: 'from-purple-400 to-pink-600',
        bgColor: 'bg-purple-900/20',
        borderColor: 'border-purple-400/30',
        details: [
            'Conversational Evolution NFTs with on-chain neural networks',
            'Autonomous Agent Framework for self-trading entities',
            'Neural State Channels with ML-optimized routing',
            'Research publication: "Distributed AI Coordination on DAGs"'
        ],
        metrics: {
            performance: 'First on-chain ML implementation',
            innovation: 'MIT AI Lab collaboration',
            academic: 'Breakthrough AI research'
        }
    },
    {
        phase: '⚛️ PHASE 3',
        title: 'QUANTUM-INSPIRED PROTOCOLS',
        subtitle: 'Q2-Q3 2026 - "The Theoretical Breakthrough"',
        icon: <Atom className="w-6 h-6" />,
        color: 'from-emerald-400 to-teal-600',
        bgColor: 'bg-emerald-900/20',
        borderColor: 'border-emerald-400/30',
        details: [
            'Quantum Entangled Bridges with asset superposition',
            'Holographic Smart Contracts across multiple DAG branches',
            'Time-Dilated Execution Environments for complex computations',
            'Published in Physical Review Letters'
        ],
        metrics: {
            performance: 'Nobel-worthy implementation',
            innovation: 'Quantum computing integration',
            academic: 'CERN partnership'
        }
    },
    {
        phase: '🎓 PHASE 4',
        title: 'ACADEMIC RESEARCH INSTITUTE',
        subtitle: 'Q4 2026 onwards - "The Knowledge Hub"',
        icon: <GraduationCap className="w-6 h-6" />,
        color: 'from-amber-400 to-orange-600',
        bgColor: 'bg-amber-900/20',
        borderColor: 'border-amber-400/30',
        details: [
            'Kasportal Research Labs with PhD fellowship program',
            'Cross-Chain Physics Laboratory testing theoretical concepts',
            'Developer Scientist Program with university certification',
            'Annual academic symposium and open research framework'
        ],
        metrics: {
            performance: 'Sustainable innovation pipeline',
            innovation: 'University partnerships',
            academic: 'Next-gen researcher training'
        }
    }
];

const RoadmapSection = () => {
    const [activePhase, setActivePhase] = useState(0);

    return (
        <section id="roadmap" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-blue-900/5" />
                <div className="absolute inset-0 grid-bg opacity-5" />
            </div>

            <div className="mx-auto max-w-7xl px-4 relative z-10">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-400/30 rounded-full px-6 py-2 mb-6">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Enhanced Innovation Roadmap</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Revolutionary Development Timeline
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Kasportal transforms from a DeFi platform into a blockchain research institution, creating
                        breakthrough innovations that will be studied in universities worldwide.
                    </p>
                </div>

                {/* Current Progress - Enhanced */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
                        <Award className="w-6 h-6 text-green-400" />
                        Current Achievements
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4 text-center">
                            <div className="text-green-400 font-semibold">Multi-Crypto Swaps</div>
                            <div className="text-sm text-gray-400">via integration</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4 text-center">
                            <div className="text-blue-400 font-semibold">KRC-20 Management</div>
                            <div className="text-sm text-gray-400">deployment & management</div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-400/30 rounded-lg p-4 text-center">
                            <div className="text-purple-400 font-semibold">Cross-Chain Capabilities</div>
                            <div className="text-sm text-gray-400">transaction capabilities</div>
                        </div>
                        <div className="bg-amber-900/20 border border-amber-400/30 rounded-lg p-4 text-center">
                            <div className="text-amber-400 font-semibold">Enhanced Privacy</div>
                            <div className="text-sm text-gray-400">privacy features</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Roadmap Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 pointer-events-none z-0 opacity-30"></div>

                    {roadmapData.map((phase, index) => (
                        <div key={index} className="mb-20 flex flex-col md:flex-row items-center w-full">
                            {/* Phase Header - Left Side */}
                            <div className="md:w-1/2 flex justify-center md:justify-end pr-8 mb-6 md:mb-0">
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-3 mb-2">
                                        <div className={`p-2 rounded-full bg-gradient-to-r ${phase.color}`}>
                                            {phase.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{phase.phase}</h3>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white/90 mb-1">{phase.title}</h4>
                                    <p className="text-sm text-gray-400">{phase.subtitle}</p>
                                </div>
                            </div>

                            {/* Enhanced Center Dot */}
                            <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} border-4 border-black shadow-lg`}>
                                <div className="w-4 h-4 rounded-full bg-white"></div>
                            </div>

                            {/* Phase Details - Right Side */}
                            <div className="md:w-1/2 pl-8 mt-6 md:mt-0">
                                <div className={`${phase.bgColor} border ${phase.borderColor} p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300`}>
                                    {/* Details List */}
                                    <ul className="space-y-3 mb-6">
                                        {phase.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/80">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phase.color} mt-2 flex-shrink-0`} />
                                                <span className="text-sm leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Performance:</span>
                                            <span className={`text-xs font-semibold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                                                {phase.metrics.performance}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Innovation:</span>
                                            <span className={`text-xs font-semibold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                                                {phase.metrics.innovation}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Academic:</span>
                                            <span className={`text-xs font-semibold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                                                {phase.metrics.academic}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Success Metrics */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-white mb-8">Success Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-400/30">
                            <div className="text-2xl font-bold text-blue-400">100x</div>
                            <div className="text-sm text-gray-400">Swap Throughput</div>
                        </div>
                        <div className="p-4 rounded-lg bg-green-900/20 border border-green-400/30">
                            <div className="text-2xl font-bold text-green-400">20+</div>
                            <div className="text-sm text-gray-400">Citations/Year</div>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-400/30">
                            <div className="text-2xl font-bold text-purple-400">$1B+</div>
                            <div className="text-sm text-gray-400">Volume Target</div>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-400/30">
                            <div className="text-2xl font-bold text-amber-400">3+</div>
                            <div className="text-sm text-gray-400">Breakthroughs</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced styles */}
            <style jsx="true" global="true">{`
                .grid-bg {
                    background-image:
                        linear-gradient(to right, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                }
            `}</style>
        </section>
    );
};

export default RoadmapSection;
