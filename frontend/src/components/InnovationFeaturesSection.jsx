import React, { useState, useEffect } from 'react';
import { Brain, Zap, Atom, GraduationCap, ArrowRight, BookOpen, Users, Award, Target } from 'lucide-react';

const InnovationFeaturesSection = () => {
    const [activePhase, setActivePhase] = useState(0);
    const [animationState, setAnimationState] = useState('idle');

    const plannedInnovations = [
        {
            phase: 'Phase 1',
            title: 'Parallel Execution Revolution',
            subtitle: 'Q2-Q3 2025 - "The Speed Breakthrough"',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-blue-400 to-cyan-600',
            borderColor: 'border-blue-400/30',
            bgColor: 'bg-blue-900/20',
            status: 'In Development',
            features: [
                {
                    name: 'Multi-Path AMM (MP-AMM)',
                    description: "Planned world's first parallel swap router executing multiple swaps simultaneously across DAG branches",
                    impact: 'Target: 10x throughput vs traditional DEXs'
                },
                {
                    name: 'Temporal Arbitrage Engine',
                    description: 'Vision to leverage Kaspa\'s 1-second blocks for microsecond arbitrage with AI-powered predictive routing',
                    impact: 'Goal: Eliminate MEV by design'
                },
                {
                    name: 'Interactive Parallel Execution Visualizer',
                    description: 'Planned real-time visualization of parallel transactions for educational and research purposes',
                    impact: 'Academic research potential'
                }
            ]
        },
        {
            phase: 'Phase 2',
            title: 'AI-Powered Blockchain Innovation',
            subtitle: 'Q4 2025 - Q1 2026 - "The Intelligence Layer"',
            icon: <Brain className="w-8 h-8" />,
            color: 'from-purple-400 to-pink-600',
            borderColor: 'border-purple-400/30',
            bgColor: 'bg-purple-900/20',
            status: 'Research Phase',
            features: [
                {
                    name: 'Conversational Evolution NFTs',
                    description: 'Concept for NFTs that learn and evolve from interactions with compressed neural networks on-chain',
                    impact: 'Vision: First implementation of on-chain ML'
                },
                {
                    name: 'Autonomous Agent Framework',
                    description: 'Planned deployment of AI agents that trade and interact autonomously through Kaspa\'s fast blocks',
                    impact: 'Target: Academic collaboration'
                },
                {
                    name: 'Neural State Channels',
                    description: 'Research into ML-optimized payment routing with self-balancing liquidity paths',
                    impact: 'Goal: Academic publication'
                }
            ]
        },
        {
            phase: 'Phase 3',
            title: 'Quantum-Inspired Protocols',
            subtitle: 'Q2-Q3 2026 - "The Theoretical Breakthrough"',
            icon: <Atom className="w-8 h-8" />,
            color: 'from-emerald-400 to-teal-600',
            borderColor: 'border-emerald-400/30',
            bgColor: 'bg-emerald-900/20',
            status: 'Conceptual',
            features: [
                {
                    name: 'Quantum Entangled Bridges',
                    description: 'Theoretical assets existing in superposition across chains with zero-knowledge proof of conservation',
                    impact: 'Vision: Nobel-worthy theoretical implementation'
                },
                {
                    name: 'Holographic Smart Contracts',
                    description: 'Concept for contracts existing across multiple DAG branches simultaneously, exploring all execution paths',
                    impact: 'Goal: Physical Review Letters publication'
                },
                {
                    name: 'Time-Dilated Execution Environments',
                    description: 'Research into spreading complex computations across parallel blocks to solve impossible calculations',
                    impact: 'Target: Partnership with quantum labs'
                }
            ]
        },
        {
            phase: 'Phase 4',
            title: 'Academic Research Institute',
            subtitle: 'Q4 2026 onwards - "The Knowledge Hub"',
            icon: <GraduationCap className="w-8 h-8" />,
            color: 'from-amber-400 to-orange-600',
            borderColor: 'border-amber-400/30',
            bgColor: 'bg-amber-900/20',
            status: 'Vision',
            features: [
                {
                    name: 'Kasportal Research Labs',
                    description: 'Planned open research framework with PhD fellowship program and annual academic symposium',
                    impact: 'Goal: University partnerships'
                },
                {
                    name: 'Cross-Chain Physics Laboratory',
                    description: 'Vision to test theoretical physics concepts on blockchain with Bell\'s inequality experiments',
                    impact: 'Target: CERN collaboration'
                },
                {
                    name: 'Developer Scientist Program',
                    description: 'Planned training for developers in advanced blockchain theory with university certification',
                    impact: 'Vision: Next-gen researcher pipeline'
                }
            ]
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePhase((prev) => (prev + 1) % plannedInnovations.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handlePhaseClick = (index) => {
        setActivePhase(index);
        setAnimationState('transition');
        setTimeout(() => setAnimationState('idle'), 500);
    };

    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-blue-900/5" />
                <div className="absolute inset-0 grid-bg opacity-5" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-400/30 rounded-full px-6 py-2 mb-6">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Innovation Roadmap</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Planned Blockchain Research
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Our vision for Kasportal goes beyond traditional DeFi—we're planning to create entirely new categories of blockchain innovation
                        that could be studied in universities worldwide. Each phase represents breakthrough technology we aim to develop on Kaspa's unique DAG architecture.
                    </p>
                </div>

                {/* Phase Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {plannedInnovations.map((innovation, index) => (
                        <button
                            key={index}
                            onClick={() => handlePhaseClick(index)}
                            className={`
                flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300
                ${activePhase === index
                                    ? `${innovation.bgColor} ${innovation.borderColor} text-white`
                                    : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'
                                }
              `}
                        >
                            <div className={`${activePhase === index ? 'text-white' : 'text-gray-500'}`}>
                                {innovation.icon}
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-sm">{innovation.phase}</div>
                                <div className="text-xs opacity-80">{innovation.title}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Phase Display */}
                <div className={`transition-all duration-500 ${animationState === 'transition' ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                    {plannedInnovations.map((innovation, index) => (
                        activePhase === index && (
                            <div key={index} className="space-y-8">
                                {/* Phase Header */}
                                <div className="text-center">
                                    <div className={`inline-flex items-center gap-4 p-6 rounded-2xl border ${innovation.borderColor} ${innovation.bgColor} mb-6`}>
                                        <div className={`p-3 rounded-full bg-gradient-to-r ${innovation.color}`}>
                                            {innovation.icon}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold text-white">{innovation.title}</h3>
                                            <p className="text-gray-300">{innovation.subtitle}</p>
                                            <span className="inline-block mt-2 px-3 py-1 bg-amber-900/30 border border-amber-400/30 rounded-full text-amber-400 text-xs">
                                                {innovation.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features Grid */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {innovation.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className={`
                        p-6 rounded-xl border ${innovation.borderColor} ${innovation.bgColor}
                        hover:scale-105 transition-all duration-300 cursor-pointer
                        hover:shadow-lg hover:shadow-green-400/10
                      `}
                                        >
                                            <h4 className="text-lg font-semibold text-white mb-3">{feature.name}</h4>
                                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{feature.description}</p>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${innovation.color} text-white text-xs font-semibold`}>
                                                <Target className="w-3 h-3" />
                                                {feature.impact}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Target Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                    <div className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                                        <div className="text-2xl font-bold text-green-400">100x</div>
                                        <div className="text-sm text-gray-400">Target Performance</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                                        <div className="text-2xl font-bold text-blue-400">20+</div>
                                        <div className="text-sm text-gray-400">Target Citations</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                                        <div className="text-2xl font-bold text-purple-400">$1B+</div>
                                        <div className="text-sm text-gray-400">Volume Goal</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                                        <div className="text-2xl font-bold text-amber-400">3+</div>
                                        <div className="text-sm text-gray-400">Target Patents</div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 cursor-pointer">
                        <Users className="w-5 h-5" />
                        Join Our Research Vision
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                        Be part of our vision to create breakthrough innovations that could shape the future of blockchain technology
                    </p>
                </div>
            </div>

            <style>{`
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

export default InnovationFeaturesSection;
