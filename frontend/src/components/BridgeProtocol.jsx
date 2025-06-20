import React, { useState, useEffect } from 'react';
import {
    ArrowLeftRight, Home, Wallet, AlertCircle, CheckCircle,
    Clock, ArrowDown, ArrowUp, Settings, Info, Shield,
    Zap, Globe, BarChart3, TrendingUp, Activity
} from 'lucide-react';

const BridgeProtocol = () => {
    // Bridge state
    const [fromChain, setFromChain] = useState('kaspa');
    const [toChain, setToChain] = useState('ethereum');
    const [amount, setAmount] = useState('');
    const [selectedAsset, setSelectedAsset] = useState('KAS');
    const [bridgeStatus, setBridgeStatus] = useState('idle'); // idle, bridging, success, error
    const [estimatedTime, setEstimatedTime] = useState('2-5 minutes');
    const [bridgeFee, setBridgeFee] = useState('0.001');
    const [slippage, setSlippage] = useState('0.5');

    // Real-time bridge data
    const [bridgeData, setBridgeData] = useState({
        totalVolume: '$12.4M',
        totalTransactions: '1,234',
        supportedChains: 5,
        averageTime: '3.2 min',
        successRate: '99.8%',
        totalLiquidity: '$8.7M'
    });

    // Recent transactions
    const [recentTxs, setRecentTxs] = useState([
        { id: '1', from: 'Kaspa', to: 'Ethereum', amount: '1,500 KAS', status: 'completed', time: '2 min ago' },
        { id: '2', from: 'Ethereum', to: 'Kaspa', amount: '0.5 ETH', status: 'pending', time: '5 min ago' },
        { id: '3', from: 'Kaspa', to: 'Bitcoin', amount: '2,000 KAS', status: 'completed', time: '8 min ago' }
    ]);

    // Supported chains and assets
    const chains = {
        kaspa: { name: 'Kaspa', icon: '⛏️', color: 'teal' },
        ethereum: { name: 'Ethereum', icon: '🔷', color: 'blue' },
        bitcoin: { name: 'Bitcoin', icon: '₿', color: 'orange' },
        polygon: { name: 'Polygon', icon: '🟣', color: 'purple' },
        bsc: { name: 'BSC', icon: '🟡', color: 'yellow' }
    };

    const assets = {
        kaspa: ['KAS'],
        ethereum: ['ETH', 'USDC', 'USDT', 'WBTC'],
        bitcoin: ['BTC'],
        polygon: ['MATIC', 'USDC', 'WETH'],
        bsc: ['BNB', 'BUSD', 'BTCB']
    };

    // Update bridge data every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBridgeData(prev => ({
                totalVolume: `$${(12.4 + Math.random() * 2).toFixed(1)}M`,
                totalTransactions: `${Math.floor(1230 + Math.random() * 20)}`,
                supportedChains: 5,
                averageTime: `${(3.0 + Math.random() * 1).toFixed(1)} min`,
                successRate: '99.8%',
                totalLiquidity: `$${(8.7 + Math.random() * 1.5).toFixed(1)}M`
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Handle chain swap
    const swapChains = () => {
        const temp = fromChain;
        setFromChain(toChain);
        setToChain(temp);
        setSelectedAsset(assets[toChain][0]);
    };

    // Handle bridge transaction
    const handleBridge = async () => {
        setBridgeStatus('bridging');

        // Simulate bridge process
        setTimeout(() => {
            setBridgeStatus('success');
            // Add to recent transactions
            setRecentTxs(prev => [{
                id: Date.now().toString(),
                from: chains[fromChain].name,
                to: chains[toChain].name,
                amount: `${amount} ${selectedAsset}`,
                status: 'completed',
                time: 'Just now'
            }, ...prev.slice(0, 4)]);

            // Reset form
            setAmount('');
            setTimeout(() => setBridgeStatus('idle'), 3000);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/portal'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> Bridge
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors">
                        <Wallet size={16} className="mr-1" />
                        Connect Wallet
                    </button>
                </div>
            </div>

            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(45,212,191,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(124,58,237,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative pt-20 px-6 max-w-7xl mx-auto">
                {/* Bridge Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Volume</div>
                        <div className="text-lg font-bold text-teal-400">{bridgeData.totalVolume}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Transactions</div>
                        <div className="text-lg font-bold text-blue-400">{bridgeData.totalTransactions}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Chains</div>
                        <div className="text-lg font-bold text-purple-400">{bridgeData.supportedChains}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Avg Time</div>
                        <div className="text-lg font-bold text-green-400">{bridgeData.averageTime}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Success Rate</div>
                        <div className="text-lg font-bold text-yellow-400">{bridgeData.successRate}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Liquidity</div>
                        <div className="text-lg font-bold text-pink-400">{bridgeData.totalLiquidity}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Bridge Interface */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-teal-400 flex items-center">
                                    <ArrowLeftRight className="mr-3" size={24} />
                                    Cross-Chain Bridge
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-400">Network Active</span>
                                </div>
                            </div>

                            {/* From Chain */}
                            <div className="mb-4">
                                <label className="text-sm text-gray-400 mb-2 block">From</label>
                                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <select
                                            value={fromChain}
                                            onChange={(e) => {
                                                setFromChain(e.target.value);
                                                setSelectedAsset(assets[e.target.value][0]);
                                            }}
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                        >
                                            {Object.entries(chains).map(([key, chain]) => (
                                                <option key={key} value={key}>
                                                    {chain.icon} {chain.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={selectedAsset}
                                            onChange={(e) => setSelectedAsset(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                        >
                                            {assets[fromChain]?.map(asset => (
                                                <option key={asset} value={asset}>{asset}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 outline-none"
                                    />
                                    <div className="text-xs text-gray-400 mt-1">Balance: 1,234.56 {selectedAsset}</div>
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="flex justify-center my-4">
                                <button
                                    onClick={swapChains}
                                    className="bg-gray-800 hover:bg-gray-700 border border-teal-500/50 rounded-full p-3 transition-all hover:scale-110"
                                >
                                    <ArrowDown className="text-teal-400" size={20} />
                                </button>
                            </div>

                            {/* To Chain */}
                            <div className="mb-6">
                                <label className="text-sm text-gray-400 mb-2 block">To</label>
                                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <select
                                            value={toChain}
                                            onChange={(e) => setToChain(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                        >
                                            {Object.entries(chains).filter(([key]) => key !== fromChain).map(([key, chain]) => (
                                                <option key={key} value={key}>
                                                    {chain.icon} {chain.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-gray-400">
                                            {chains[toChain].icon} {assets[toChain][0]}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-white">
                                        {amount ? (parseFloat(amount) * 0.98).toFixed(4) : '0.0'}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Estimated amount (after fees)</div>
                                </div>
                            </div>

                            {/* Bridge Details */}
                            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Bridge Fee</span>
                                    <span className="text-white">{bridgeFee} {selectedAsset}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Estimated Time</span>
                                    <span className="text-white">{estimatedTime}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Slippage</span>
                                    <span className="text-white">{slippage}%</span>
                                </div>
                            </div>

                            {/* Bridge Button */}
                            <button
                                onClick={handleBridge}
                                disabled={!amount || bridgeStatus === 'bridging'}
                                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${bridgeStatus === 'bridging'
                                        ? 'bg-yellow-600 text-white cursor-not-allowed'
                                        : bridgeStatus === 'success'
                                            ? 'bg-green-600 text-white'
                                            : amount
                                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white'
                                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {bridgeStatus === 'bridging' && (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Bridging Assets...
                                    </div>
                                )}
                                {bridgeStatus === 'success' && (
                                    <div className="flex items-center justify-center">
                                        <CheckCircle className="mr-2" size={20} />
                                        Bridge Successful!
                                    </div>
                                )}
                                {bridgeStatus === 'idle' && 'Bridge Assets'}
                            </button>

                            {/* Security Notice */}
                            <div className="mt-4 flex items-start space-x-2 text-xs text-gray-400 bg-gray-800/30 rounded-lg p-3">
                                <Shield className="text-teal-400 mt-0.5" size={16} />
                                <div>
                                    <div className="font-medium text-teal-400 mb-1">Security Notice</div>
                                    <div>Cross-chain bridges are secured by a decentralized network of validators. Always verify transaction details before confirming.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Transactions */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center">
                                <Activity className="mr-2" size={18} />
                                Recent Bridges
                            </h3>
                            <div className="space-y-3">
                                {recentTxs.map(tx => (
                                    <div key={tx.id} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm font-medium">{tx.amount}</div>
                                            <div className={`text-xs px-2 py-1 rounded-full ${tx.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                                                    tx.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                                                        'bg-red-900/50 text-red-400'
                                                }`}>
                                                {tx.status}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {tx.from} → {tx.to}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{tx.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bridge Analytics */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center">
                                <BarChart3 className="mr-2" size={18} />
                                Bridge Analytics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Daily Volume</span>
                                        <span className="text-white">$2.1M</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Network Utilization</span>
                                        <span className="text-white">42%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Liquidity Available</span>
                                        <span className="text-white">89%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Networks */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center">
                                <Globe className="mr-2" size={18} />
                                Supported Networks
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(chains).map(([key, chain]) => (
                                    <div key={key} className="bg-gray-800/50 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-1">{chain.icon}</div>
                                        <div className="text-xs text-gray-400">{chain.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BridgeProtocol;
