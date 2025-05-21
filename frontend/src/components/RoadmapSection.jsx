import React from 'react';

const roadmapData = [
    {
        phase: '🔹 PHASE 1',
        title: 'FOUNDATION & SIMULATION (Q2-Q3 2025)',
        details: [
            'Interactive DeFi simulations for lending/borrowing',
            'Enhanced analytics with portfolio visualization',
            'Advanced KRC-20 token management',
            'Cross-chain visualization tools'
        ]
    },
    {
        phase: '🔹 PHASE 2',
        title: 'CROSS-CHAIN & EDUCATION (Q4 2025)',
        details: [
            'Enhanced bridge interfaces for cross-chain transfers',
            'Interactive DeFi education hub',
            'User experience refinements',
            'Community feedback mechanisms'
        ]
    },
    {
        phase: '🔹 PHASE 3',
        title: 'PRE-SMART CONTRACT SOLUTIONS (Q1-Q2 2026)',
        details: [
            'Hybrid DeFi solutions with partner protocols',
            'Developer ecosystem expansion',
            'Cross-chain strategy automation'
        ]
    },
    {
        phase: '🔹 PHASE 4',
        title: 'NATIVE DEFI (WHEN SMART CONTRACTS AVAILABLE)',
        details: [
            'Phased smart contract deployment',
            'Native lending and liquidity pools',
            'Advanced yield optimization',
            'Cross-chain composability'
        ]
    }
];

const RoadmapSection = () => {
    return (
        <section id="roadmap" className="py-20 bg-black text-white relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>

            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-4xl font-bold text-center text-green-400 mb-8">Project Roadmap</h2>

                {/* Introduction */}
                <p className="text-lg text-white/80 text-center mb-12">
                    Kasportal is evolving into a comprehensive DeFi hub that combines the best of DEX trading and lending protocols. Our phased approach delivers immediate value through simulations and education while building toward full native functionality when Kaspa smart contracts arrive.
                </p>

                {/* Current Progress */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-green-400 text-center mb-6">Current Progress</h3>
                    <ul className="list-disc list-inside text-white/80 mx-auto max-w-md space-y-2">
                        <li>Multi-crypto swaps via swap integration</li>
                        <li>KRC-20 token deployment and management</li>
                        <li>Cross-chain transaction capabilities</li>
                        <li>Enhanced privacy features</li>
                    </ul>
                </div>


                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-600/30 pointer-events-none z-0"></div>

                    {roadmapData.map((phase, index) => (
                        <div key={index} className="mb-16 flex flex-col md:flex-row items-center w-full">
                            {/* Phase Number/Title */}
                            <div className="md:w-1/2 flex justify-center md:justify-end pr-8 mb-4 md:mb-0">
                                <div className="text-right">
                                    <h3 className="text-2xl font-semibold text-green-400">{phase.phase}</h3>
                                    <p className="text-xl text-white/90">{phase.title}</p>
                                </div>
                            </div>

                            {/* Dot */}
                            <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 border-4 border-black">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>

                            {/* Phase Details */}
                            <div className="md:w-1/2 pl-8 mt-4 md:mt-0">
                                <div className="bg-green-900/20 p-6 rounded-lg shadow-lg border border-green-400/20">
                                    {phase.details && (
                                        <ul className="mt-0 list-disc list-inside text-white/70 space-y-2">
                                            {phase.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Custom animations and styles */}
            <style jsx="true" global="true">{`
        /* Grid background for section */
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
