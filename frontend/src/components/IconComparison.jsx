import React from 'react';
import { Repeat, Wallet, Book, Home, Link2, BookOpen, CreditCard, Smartphone, Zap, Brain, Mail, MessageSquare, FileText, Send } from 'lucide-react';
import {
    SwapIcon,
    WalletIcon,
    LearnIcon,
    HomeIcon,
    CrossChainIcon,
    PaymentIcon,
    MobileIcon,
    SmartContractIcon,
    AIIcon,
    EmailIcon,
    DiscordIcon,
    DocsIcon,
    BusinessIcon
} from './CryptoIcons';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import SolanaIcon from './SolanaIcon';

export default function IconComparison() {
    const iconComparisons = [
        {
            category: "Navigation Icons",
            icons: [
                { name: "Home", old: <Home size={24} />, new: <HomeIcon size={24} /> },
                { name: "Swap", old: <Repeat size={24} />, new: <SwapIcon size={24} /> },
                { name: "Cross Chain", old: <Link2 size={24} />, new: <CrossChainIcon size={24} /> },
                { name: "Learn", old: <BookOpen size={24} />, new: <LearnIcon size={24} /> }
            ]
        },
        {
            category: "Feature Icons",
            icons: [
                { name: "Token Swapping", old: <Repeat size={32} />, new: <SwapIcon size={32} /> },
                { name: "Wallet", old: <Wallet size={32} />, new: <WalletIcon size={32} /> },
                { name: "Learn/Education", old: <Book size={32} />, new: <LearnIcon size={32} /> }
            ]
        },
        {
            category: "Payment Method Icons",
            icons: [
                { name: "Payment Card", old: <CreditCard size={32} />, new: <PaymentIcon size={32} className="text-amber-400" /> },
                { name: "Mobile Payment", old: <Smartphone size={32} />, new: <MobileIcon size={32} className="text-teal-400" /> }
            ]
        },
        {
            category: "Roadmap Icons",
            icons: [
                { name: "Payment Gateway", old: <CreditCard size={32} />, new: <PaymentIcon size={32} className="text-teal-400" /> },
                { name: "Mobile App", old: <Smartphone size={32} />, new: <MobileIcon size={32} className="text-purple-400" /> },
                { name: "Smart Contracts", old: <Zap size={32} />, new: <SmartContractIcon size={32} className="text-cyan-400" /> },
                { name: "AI/NFT", old: <Brain size={32} />, new: <AIIcon size={32} className="text-pink-400" /> }
            ]
        },
        {
            category: "Contact Icons",
            icons: [
                { name: "Email", old: <Mail size={32} />, new: <EmailIcon size={32} className="text-teal-400" /> },
                { name: "Discord", old: <MessageSquare size={32} />, new: <DiscordIcon size={32} className="text-purple-400" /> },
                { name: "Documentation", old: <FileText size={32} />, new: <DocsIcon size={32} className="text-cyan-400" /> },
                { name: "Business", old: <Send size={32} />, new: <BusinessIcon size={32} className="text-indigo-400" /> }
            ]
        },
        {
            category: "Cryptocurrency Logos",
            icons: [
                { name: "Bitcoin", old: <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-400">OLD</div>, new: <BitcoinIcon /> },
                { name: "Ethereum", old: <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-400">OLD</div>, new: <EthereumIcon /> },
                { name: "Solana", old: <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-400">OLD</div>, new: <SolanaIcon /> }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        Icon Comparison
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Compare the old basic icons vs. new crypto-style icons
                    </p>
                    <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                            <span className="text-sm text-gray-400">Old Icons (Lucide / Placeholder)</span>
                        </div>
                        <div className="text-center">
                            <div className="w-4 h-4 bg-teal-500 rounded-full mx-auto mb-2"></div>
                            <span className="text-sm text-gray-400">New Icons (Custom Crypto / Actual Logos)</span>
                        </div>
                    </div>
                </div>

                {iconComparisons.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-16">
                        <h2 className="text-2xl font-bold text-teal-400 mb-8 text-center">
                            {category.category}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {category.icons.map((icon, iconIndex) => (
                                <div key={iconIndex} className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-6 text-center">
                                        {icon.name}
                                    </h3>

                                    {/* Old Icon */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center p-4 bg-red-500/10 border border-red-500/30 rounded-2xl mb-3">
                                            <div className="text-red-400">
                                                {icon.old}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 text-center">Old (Basic)</p>
                                    </div>

                                    {/* New Icon */}
                                    <div>
                                        <div className="flex items-center justify-center p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl mb-3">
                                            <div className="drop-shadow-lg">
                                                {icon.new}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 text-center">New (Crypto Style)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-center mt-16 p-8 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl">
                    <h3 className="text-2xl font-bold text-white mb-4">Key Differences</h3>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div>
                            <h4 className="text-lg font-semibold text-red-400 mb-3">Old Icons (Lucide)</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Simple line art style</li>
                                <li>• Single color (white/gray)</li>
                                <li>• Basic, generic appearance</li>
                                <li>• No gradients or effects</li>
                                <li>• Standard UI library icons</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-teal-400 mb-3">New Icons (Custom Crypto)</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Gradient color schemes</li>
                                <li>• Teal-to-purple crypto theme</li>
                                <li>• Drop shadow effects</li>
                                <li>• Filled areas with transparency</li>
                                <li>• Professional, crypto-native look</li>
                                <li>• Custom designed for your brand</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-teal-400 mb-3">Actual Cryptocurrency Logos</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Official brand logos for specific cryptocurrencies</li>
                                <li>• High-fidelity SVG representations</li>
                                <li>• Essential for brand recognition and trust</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-400">
                        The new icons provide a more professional, crypto-focused appearance that matches your futuristic portal theme.
                    </p>
                </div>
            </div>
        </div>
    );
}
