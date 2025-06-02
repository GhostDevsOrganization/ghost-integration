import React, { useState } from 'react';
import QuantumSwapEngine from './QuantumSwapEngine';
import { useTheme } from '../context/ThemeContext';

const QuantumSwapEngineTest = () => {
    const { theme, themeData } = useTheme();

    // Widget configuration
    const [config, setConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01'
    });

    // Handle config changes
    const handleConfigChange = (field, value) => {
        setConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Quantum Swap Engine Test
                    </h1>
                    <p className="text-lg text-gray-600">
                        Isolated component testing environment
                    </p>
                </div>

                {/* Configuration Panel */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                From Currency
                            </label>
                            <select
                                value={config.from}
                                onChange={(e) => handleConfigChange('from', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="btc">BTC</option>
                                <option value="eth">ETH</option>
                                <option value="kas">KAS</option>
                                <option value="usdt">USDT</option>
                                <option value="bnb">BNB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                To Currency
                            </label>
                            <select
                                value={config.to}
                                onChange={(e) => handleConfigChange('to', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="kas">KAS</option>
                                <option value="btc">BTC</option>
                                <option value="eth">ETH</option>
                                <option value="usdt">USDT</option>
                                <option value="bnb">BNB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>
                            <input
                                type="number"
                                value={config.amount}
                                onChange={(e) => handleConfigChange('amount', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                step="0.001"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Widget Container */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-purple-600 p-4 text-white">
                        <h3 className="text-lg font-semibold">Widget Preview</h3>
                    </div>
                    <div className="p-8">
                        <QuantumSwapEngine
                            from={config.from}
                            to={config.to}
                            amount={config.amount}
                        />
                    </div>
                </div>

                {/* Theme Info */}
                <div className="mt-8 bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                        Current Theme: <span className="font-semibold">{theme}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuantumSwapEngineTest;
