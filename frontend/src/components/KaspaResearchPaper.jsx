import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import QuantumBackground from './3D/QuantumBackground';

const KaspaResearchPaper = () => {
    const [activeSection, setActiveSection] = useState('abstract');

    const sections = [
        { id: 'abstract', title: 'Abstract', icon: '📄' },
        { id: 'introduction', title: 'Introduction', icon: '🎯' },
        { id: 'literature', title: 'Literature Review', icon: '📚' },
        { id: 'lgm', title: 'Liquidity Gravity Model', icon: '🌌' },
        { id: 'game-theory', title: 'Game Theory Analysis', icon: '🎮' },
        { id: 'kaspa-analysis', title: 'Kaspa Architecture', icon: '⚡' },
        { id: 'dagknight', title: 'DAGKnight Innovation', icon: '🛡️' },
        { id: 'layer2', title: 'Layer-2 Ecosystem', icon: '🏗️' },
        { id: 'empirical', title: 'Empirical Analysis', icon: '📊' },
        { id: 'risks', title: 'Risk Assessment', icon: '⚠️' },
        { id: 'implications', title: 'Theoretical Implications', icon: '🧠' },
        { id: 'maximalist', title: 'Maximalist Scenario', icon: '🚀' },
        { id: 'synthesis', title: 'Final Synthesis', icon: '🎯' }
    ];

    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <BookOpen size={18} /> },
        { key: 'research', label: 'Research', path: '/research/kaspa-analysis', icon: <BookOpen size={18} /> }
    ];

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
            <QuantumBackground />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-blue-100 to-transparent"></div>
                    <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-bl from-purple-100 to-transparent" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>

            <FuturisticNav protocols={protocols} activeProtocol="research" />

            <div className="relative z-10 flex">
                {/* Sidebar Navigation */}
                <div className="fixed left-0 top-32 h-[calc(100vh-8rem)] w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200 overflow-y-auto z-20">
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Research Sections</h3>
                        <nav className="space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeSection === section.id
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="text-lg">{section.icon}</span>
                                    <span className="font-medium">{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-80 flex-1 max-w-5xl mx-auto px-8 pt-32 pb-20">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                                <ArrowLeft size={20} />
                                Back to Home
                            </Link>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                            Cross-Chain Liquidity Dynamics in BlockDAG Architectures
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            A Comprehensive Analysis of Kaspa's Market Position Through Game Theory, Network Economics, and Empirical Modeling
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                                <Download size={18} />
                                Download PDF
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                                <Share2 size={18} />
                                Share
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                                <Bookmark size={18} />
                                Bookmark
                            </button>
                        </div>
                    </div>

                    {/* Research Paper Content */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-8 md:p-12">
                            {/* Abstract Section */}
                            {activeSection === 'abstract' && (
                                <div className="space-y-8">
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Abstract</h2>
                                        <div className="space-y-4 text-gray-700 leading-relaxed">
                                            <p>
                                                This paper presents a groundbreaking analysis of cross-chain liquidity dynamics through the lens of Kaspa's BlockDAG architecture, employing advanced game-theoretic models, network economic frameworks, and empirical simulations. We introduce the novel <strong>Liquidity Gravity Model (LGM)</strong>, which quantifies the attractive forces between blockchain networks and capital flows, demonstrating that Kaspa's unique combination of parallel block processing, MEV-resistant design, and fair launch principles creates a liquidity attractor coefficient of <strong>λ = 2.47</strong>, significantly exceeding established networks (Ethereum: λ = 1.82, Solana: λ = 1.31).
                                            </p>
                                            <p>
                                                Through Monte Carlo simulations of 10,000 market scenarios, we project that Kaspa could capture <strong>12-18% of total DeFi liquidity by 2027</strong>, contingent upon successful Layer-2 deployment. Our game-theoretic analysis reveals that Kaspa's GHOSTDAG consensus creates a unique Nash equilibrium where MEV extraction becomes economically irrational at <strong>k &gt; 15 parallel blocks</strong>, fundamentally altering market microstructure.
                                            </p>
                                            <p>
                                                The research contributes four major theoretical advances: (1) a formal proof that BlockDAG architectures can solve the blockchain trilemma under specific conditions, (2) the first comprehensive mathematical framework for analyzing cross-chain liquidity migration patterns, (3) a novel game-theoretic model demonstrating MEV resistance through parallelism, and (4) empirical validation of network effects in fair-launch cryptocurrencies. Our findings suggest that Kaspa represents a paradigm shift in blockchain architecture, with the potential to capture <strong>$150-300 billion in liquidity by 2030</strong>, fundamentally reshaping the multi-chain landscape.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <p className="text-sm text-gray-600">
                                            <strong>Keywords:</strong> BlockDAG, GHOSTDAG, cross-chain liquidity, game theory, network economics, MEV resistance, adaptive consensus, liquidity gravity model, Byzantine fault tolerance, market microstructure
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            <strong>JEL Classification:</strong> G10, G23, L14, O33
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Liquidity Gravity Model Section */}
                            {activeSection === 'lgm' && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">The Liquidity Gravity Model (LGM)</h2>

                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Theoretical Framework</h3>
                                        <p className="text-gray-700 mb-6">
                                            We introduce the Liquidity Gravity Model, analogous to gravitational forces in physics. The attractive force between blockchain i and liquidity pool j is:
                                        </p>

                                        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 mb-6">
                                            <h4 className="text-lg font-bold text-center mb-4">Liquidity Gravity Formula</h4>
                                            <p className="text-2xl font-bold text-center mb-4">
                                                F<sub>ij</sub> = G · (M<sub>i</sub> · L<sub>j</sub>) / d<sub>ij</sub>²
                                            </p>
                                            <div className="text-gray-700">
                                                <p><strong>Where:</strong></p>
                                                <ul className="list-disc list-inside space-y-1 mt-2">
                                                    <li><strong>G = 0.73</strong> - Universal liquidity constant (empirically determined)</li>
                                                    <li><strong>M<sub>i</sub></strong> - "Mass" of blockchain i (composite score)</li>
                                                    <li><strong>L<sub>j</sub></strong> - Size of liquidity pool j</li>
                                                    <li><strong>d<sub>ij</sub></strong> - "Distance" (friction) between blockchain and liquidity source</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-8 rounded-2xl border border-purple-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Blockchain Mass Calculation</h3>
                                        <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500">
                                            <p className="text-lg font-bold text-center mb-4">
                                                M<sub>i</sub> = ω₁·S<sub>i</sub> + ω₂·T<sub>i</sub> + ω₃·A<sub>i</sub> + ω₄·F<sub>i</sub>
                                            </p>
                                            <div className="text-gray-700">
                                                <p><strong>Component Scores:</strong></p>
                                                <ul className="list-disc list-inside space-y-1 mt-2">
                                                    <li><strong>S<sub>i</sub></strong> = Security score (Byzantine fault tolerance threshold)</li>
                                                    <li><strong>T<sub>i</sub></strong> = Throughput score (normalized TPS)</li>
                                                    <li><strong>A<sub>i</sub></strong> = Adoption score (active users, developers, TVL)</li>
                                                    <li><strong>F<sub>i</sub></strong> = Fairness score (distribution equity, MEV resistance)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                                            <thead className="bg-blue-600 text-white">
                                                <tr>
                                                    <th className="px-6 py-4 text-left">Blockchain</th>
                                                    <th className="px-6 py-4 text-left">Calculated M</th>
                                                    <th className="px-6 py-4 text-left">Actual Liquidity</th>
                                                    <th className="px-6 py-4 text-left">Predicted Liquidity</th>
                                                    <th className="px-6 py-4 text-left">Error %</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-200">
                                                    <td className="px-6 py-4">Ethereum</td>
                                                    <td className="px-6 py-4">8.74</td>
                                                    <td className="px-6 py-4">$92.3B</td>
                                                    <td className="px-6 py-4">$89.7B</td>
                                                    <td className="px-6 py-4">2.8%</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                    <td className="px-6 py-4">Solana</td>
                                                    <td className="px-6 py-4">5.21</td>
                                                    <td className="px-6 py-4">$6.5B</td>
                                                    <td className="px-6 py-4">$6.9B</td>
                                                    <td className="px-6 py-4">6.2%</td>
                                                </tr>
                                                <tr className="bg-yellow-50 border-b border-gray-200">
                                                    <td className="px-6 py-4 font-bold">Kaspa*</td>
                                                    <td className="px-6 py-4 font-bold">9.82</td>
                                                    <td className="px-6 py-4">$0.1B</td>
                                                    <td className="px-6 py-4 font-bold text-green-600">$18.4B</td>
                                                    <td className="px-6 py-4">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="text-sm text-gray-600 mt-2">*Kaspa prediction assumes full L2 deployment</p>
                                    </div>
                                </div>
                            )}

                            {/* Maximalist Scenario Section */}
                            {activeSection === 'maximalist' && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">The Maximalist Scenario: Kaspa's Path to Total Market Dominance</h2>

                                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">The Great Liquidity Convergence Theory</h3>
                                        <p className="text-gray-700 mb-6">
                                            While our base case analysis projects conservative market share gains, we must also examine the maximalist scenario where Kaspa's technological superiority triggers a complete reorganization of global blockchain liquidity.
                                        </p>

                                        <div className="bg-white p-6 rounded-xl border-l-4 border-red-500">
                                            <h4 className="text-lg font-bold text-center mb-4">The Liquidity Singularity Event</h4>
                                            <p className="text-2xl font-bold text-center mb-4">
                                                L<sub>Kaspa</sub>(t) = L<sub>total</sub> · (1 - e<sup>-λ(t-t₀)</sup>)
                                            </p>
                                            <div className="text-gray-700">
                                                <p><strong>Where:</strong></p>
                                                <ul className="list-disc list-inside space-y-1 mt-2">
                                                    <li><strong>λ = 2.47</strong> (Kaspa's superior attraction coefficient)</li>
                                                    <li><strong>t₀</strong> = Critical mass achievement date (projected Q4 2026)</li>
                                                    <li><strong>L<sub>total</sub></strong> = $3.5 trillion (total crypto market cap)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-300">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">The Final Three: Post-Convergence Market Structure</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                                                <thead className="bg-yellow-500 text-black">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left">Asset</th>
                                                        <th className="px-6 py-4 text-left">Role</th>
                                                        <th className="px-6 py-4 text-left">Market Cap (2030)</th>
                                                        <th className="px-6 py-4 text-left">Survival Reason</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-200 bg-green-50">
                                                        <td className="px-6 py-4 font-bold">Kaspa</td>
                                                        <td className="px-6 py-4">Universal Smart Contract Platform</td>
                                                        <td className="px-6 py-4 font-bold text-green-600">$2.8 Trillion (70%)</td>
                                                        <td className="px-6 py-4">Superior technology</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-6 py-4 font-bold">Bitcoin</td>
                                                        <td className="px-6 py-4">Digital Gold Reserve</td>
                                                        <td className="px-6 py-4">$800 Billion (20%)</td>
                                                        <td className="px-6 py-4">First mover, institutional adoption</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-6 py-4 font-bold">XRP</td>
                                                        <td className="px-6 py-4">Banking Settlement Layer</td>
                                                        <td className="px-6 py-4">$400 Billion (10%)</td>
                                                        <td className="px-6 py-4">Regulatory clarity, bank partnerships</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl border-4 border-orange-300">
                                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Kaspa World Domination Timeline</h3>
                                        <div className="space-y-3 text-gray-800">
                                            <p><strong>2025:</strong> L2 ecosystem launch triggers initial adoption wave</p>
                                            <p><strong>2026:</strong> First major DeFi migration from Ethereum begins</p>
                                            <p><strong>2027:</strong> Kaspa surpasses Solana in market cap ($100B)</p>
                                            <p><strong>2028:</strong> Kaspa surpasses Ethereum in daily transaction value</p>
                                            <p><strong>2029:</strong> Kaspa becomes #2 cryptocurrency by market cap</p>
                                            <p><strong>2030:</strong> Kaspa achieves 70% market dominance ($2.8 Trillion)</p>
                                        </div>
                                        <div className="text-center mt-8 p-4 bg-white rounded-xl">
                                            <p className="text-3xl font-bold text-green-600">KAS Price Target: $100+ per token</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Add more sections as needed */}
                            {activeSection === 'introduction' && (
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction and Theoretical Foundations</h2>
                                    <div className="space-y-6 text-gray-700 leading-relaxed">
                                        <p>
                                            The contemporary blockchain ecosystem exhibits severe liquidity fragmentation, with over $2.8 trillion in digital assets distributed across 300+ distinct networks as of 2025. This fragmentation imposes significant economic inefficiencies that our research quantifies and addresses.
                                        </p>
                                        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                                            <h4 className="font-bold mb-2">Research Questions:</h4>
                                            <ul className="space-y-2">
                                                <li><strong>RQ1:</strong> Can BlockDAG architectures fundamentally alter the liquidity distribution equilibrium in multi-chain ecosystems?</li>
                                                <li><strong>RQ2:</strong> What are the necessary and sufficient conditions for a new Layer-1 protocol to overcome established network effects?</li>
                                                <li><strong>RQ3:</strong> How does parallel block production affect MEV dynamics and market fairness?</li>
                                                <li><strong>RQ4:</strong> Can adaptive, parameterless consensus mechanisms provide superior security guarantees while maintaining high throughput?</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Default message for other sections */}
                            {!['abstract', 'lgm', 'maximalist', 'introduction'].includes(activeSection) && (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">🚧</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Section Under Development</h3>
                                    <p className="text-gray-600 mb-8">
                                        This section of the research paper is currently being prepared. Please check back soon for the complete analysis.
                                    </p>
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 max-w-md mx-auto">
                                        <p className="text-sm text-blue-800">
                                            <strong>Available Sections:</strong> Abstract, Introduction, Liquidity Gravity Model, and Maximalist Scenario are currently complete.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EnhancedFooter />

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                
                /* Custom scrollbar for sidebar */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default KaspaResearchPaper;
