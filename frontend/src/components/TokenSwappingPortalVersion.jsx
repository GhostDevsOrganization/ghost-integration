// src/components/TokenSwappingPortalVersion.jsx

import React, { useState, useEffect } from 'react';
import { Repeat, HelpCircle, Info, RefreshCw, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const TokenSwappingPortalVersion = ({ onClose }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    // Popular swap pairs
    const popularPairs = [
        { from: 'BTC', to: 'KAS' },
        { from: 'ETH', to: 'KAS' },
        { from: 'USDT', to: 'KAS' },
        { from: 'BNB', to: 'KAS' },
        { from: 'KAS', to: 'BTC' }
    ];

    // Widget config state
    const [widgetConfig, setWidgetConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01',
        backgroundColor: '121212',
        darkMode: true,
        primaryColor: '4ADE80' // Green hex color
    });

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handlePairSelect = (from, to) => {
        setWidgetConfig(prev => ({
            ...prev,
            from,
            to
        }));
    };

    return (
        <div className="portal-swap-container text-white overflow-auto">
            {/* Close button in top right */}
            <button
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-600"
                onClick={onClose}
            >
                ×
            </button>

            {/* Page Header - simplified for portal */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 inline-block mb-2">
                    Token Swapping
                </h2>
                <p className="text-gray-400 text-sm">
                    Exchange Kaspa with other cryptocurrencies
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
                {/* Swap Widget */}
                <div className="bg-gray-900/40 rounded-xl p-4 backdrop-blur-sm border border-green-400/10 shadow-lg shadow-black/40 relative overflow-hidden">
                    {/* Corner decoration */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-400/10 rounded-full"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-400/5 rounded-full"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Swap Tokens</h3>

                            <div className="flex items-center space-x-2">
                                <button
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                    title="Refresh rates"
                                >
                                    <RefreshCw size={16} />
                                </button>
                                <button
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                    title="Swap information"
                                >
                                    <Info size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Popular pairs section */}
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <span className="text-sm text-gray-400">Popular Pairs</span>
                                <div className="ml-2 h-px flex-grow bg-gray-700"></div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {popularPairs.map((pair, index) => (
                                    <button
                                        key={index}
                                        className="px-2 py-1 bg-green-900/20 hover:bg-green-900/30 rounded-md border border-green-400/20 text-xs flex items-center transition-colors duration-200"
                                        onClick={() => handlePairSelect(pair.from.toLowerCase(), pair.to.toLowerCase())}
                                    >
                                        <span>{pair.from}</span>
                                        <span className="mx-1 text-gray-500">→</span>
                                        <span>{pair.to}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Widget Display */}
                        <div className="relative mb-4">
                            {loading ? (
                                <div className="py-20 flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin mb-3"></div>
                                        <p className="text-green-400 text-sm">Loading exchange rates...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* From currency input */}
                                    <div>
                                        <div className="text-xs text-green-300 mb-1">You Send</div>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                className="flex-grow bg-black/40 border border-green-700 rounded-l p-2 text-white"
                                                placeholder="0.0"
                                                defaultValue="0.01"
                                            />
                                            <div className="bg-green-900 px-3 py-2 rounded-r flex items-center">
                                                {widgetConfig.from.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exchange icon */}
                                    <div className="flex justify-center">
                                        <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center">
                                            <Repeat size={16} className="text-green-200" />
                                        </div>
                                    </div>

                                    {/* To currency output */}
                                    <div>
                                        <div className="text-xs text-green-300 mb-1">You Receive (estimated)</div>
                                        <div className="flex">
                                            <div className="flex-grow bg-black/40 border border-green-700 rounded-l p-2 text-green-200">
                                                382.57
                                            </div>
                                            <div className="bg-green-900 px-3 py-2 rounded-r flex items-center">
                                                {widgetConfig.to.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exchange details */}
                                    <div className="bg-black/30 p-3 rounded-lg text-xs text-gray-300 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Exchange Rate</span>
                                            <span className="text-green-300">1 {widgetConfig.from.toUpperCase()} ≈ 38,257 {widgetConfig.to.toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Network Fee</span>
                                            <span>0.5%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Estimated Time</span>
                                            <span>5-15 minutes</span>
                                        </div>
                                    </div>

                                    {/* Swap button */}
                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors">
                                        Swap Tokens
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Advanced options toggle */}
                        <div className="border-t border-gray-800 pt-3">
                            <button
                                className="flex items-center justify-between w-full py-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <span className="font-medium text-sm">Advanced Options</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${showAdvanced ? 'transform rotate-180' : ''}`}
                                />
                            </button>

                            {showAdvanced && (
                                <div className="mt-3 space-y-3 text-xs text-gray-400 bg-gray-900/30 p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span>Slippage Tolerance</span>
                                        <div className="flex space-x-1">
                                            <button className="px-2 py-1 rounded bg-gray-800 hover:bg-green-800 transition-colors">0.5%</button>
                                            <button className="px-2 py-1 rounded bg-green-900 text-green-400">1%</button>
                                            <button className="px-2 py-1 rounded bg-gray-800 hover:bg-green-800 transition-colors">2%</button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Transaction Deadline</span>
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                className="w-12 px-2 py-1 rounded bg-gray-800 text-center"
                                                value="20"
                                                readOnly
                                            />
                                            <span className="ml-1">minutes</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Why Use Our Swap section */}
                <div className="bg-gray-900/40 rounded-xl p-4 backdrop-blur-sm border border-green-400/10">
                    <h3 className="text-sm font-semibold mb-3 flex items-center">
                        <HelpCircle size={16} className="mr-2 text-green-400" />
                        <span>Why Use Our Swap?</span>
                    </h3>

                    <ul className="space-y-2 text-xs">
                        <li className="flex items-start">
                            <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                                <span className="text-green-400 text-xs">✓</span>
                            </div>
                            <span className="text-gray-300">No registration or KYC required for basic swaps</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                                <span className="text-green-400 text-xs">✓</span>
                            </div>
                            <span className="text-gray-300">Best rates from multiple exchanges in one place</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                                <span className="text-green-400 text-xs">✓</span>
                            </div>
                            <span className="text-gray-300">Fast transactions with average completion time under 15 minutes</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TokenSwappingPortalVersion;