import React, { useState, useEffect } from 'react';
import {
    Lock, Home, Wallet, TrendingUp, ArrowUp, ArrowDown,
    DollarSign, Percent, Clock, Shield, Info, Plus,
    Minus, BarChart3, Target, Zap, Activity
} from 'lucide-react';

const VaultsProtocol = () => {
    // Vault state
    const [selectedVault, setSelectedVault] = useState(null);
    const [action, setAction] = useState('deposit'); // deposit, withdraw
    const [amount, setAmount] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('idle');

    // Real-time vault data
    const [vaultData, setVaultData] = useState({
        totalTVL: '$8.7M',
        totalPools: 8,
        totalUsers: '2,341',
        averageAPY: '14.2%',
        totalRewards: '$156K',
        activeStrategies: 12
    });

    // Vault strategies
    const [vaults, setVaults] = useState([
        {
            id: 1,
            name: 'KAS-ETH Stable',
            type: 'Stable',
            apy: '8.5%',
            tvl: '$2.1M',
            risk: 'Low',
            strategy: 'Liquidity Pool + Staking',
            deposited: '0',
            color: 'green',
            icon: '🛡️'
        },
        {
            id: 2,
            name: 'KAS Growth',
            type: 'Growth',
            apy: '15.2%',
            tvl: '$1.8M',
            risk: 'Medium',
            strategy: 'Auto-Compound Mining',
            deposited: '1,250',
            color: 'blue',
            icon: '📈'
        },
        {
            id: 3,
            name: 'DeFi Aggressive',
            type: 'Aggressive',
            apy: '24.7%',
            tvl: '$980K',
            risk: 'High',
            strategy: 'Yield Farming + Leverage',
            deposited: '0',
            color: 'purple',
            icon: '🚀'
        },
        {
            id: 4,
            name: 'Multi-Chain',
            type: 'Balanced',
            apy: '12.8%',
            tvl: '$1.5M',
            risk: 'Medium',
            strategy: 'Cross-Chain Arbitrage',
            deposited: '500',
            color: 'orange',
            icon: '🌐'
        }
    ]);

    // User positions
    const [userPositions, setUserPositions] = useState([
        { vault: 'KAS Growth', amount: '1,250 KAS', value: '$306.25', rewards: '+15.2 KAS' },
        { vault: 'Multi-Chain', amount: '500 KAS', value: '$122.50', rewards: '+8.7 KAS' }
    ]);

    // Update vault data every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setVaultData(prev => ({
                totalTVL: `$${(8.7 + Math.random() * 1.5).toFixed(1)}M`,
                totalPools: 8,
                totalUsers: `${Math.floor(2340 + Math.random() * 20)}`,
                averageAPY: `${(14.2 + Math.random() * 2).toFixed(1)}%`,
                totalRewards: `$${Math.floor(156 + Math.random() * 20)}K`,
                activeStrategies: 12
            }));

            // Update vault APYs
            setVaults(prev => prev.map(vault => ({
                ...vault,
                apy: `${(parseFloat(vault.apy) + (Math.random() - 0.5) * 2).toFixed(1)}%`
            })));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Handle vault interaction
    const handleVaultAction = async () => {
        setTransactionStatus('processing');

        setTimeout(() => {
            setTransactionStatus('success');

            if (action === 'deposit' && selectedVault) {
                // Update user positions
                setUserPositions(prev => {
                    const existing = prev.find(p => p.vault === selectedVault.name);
                    if (existing) {
                        return prev.map(p =>
                            p.vault === selectedVault.name
                                ? { ...p, amount: `${parseFloat(p.amount) + parseFloat(amount)} KAS` }
                                : p
                        );
                    } else {
                        return [...prev, {
                            vault: selectedVault.name,
                            amount: `${amount} KAS`,
                            value: `$${(parseFloat(amount) * 0.245).toFixed(2)}`,
                            rewards: '+0 KAS'
                        }];
                    }
                });
            }

            setAmount('');
            setTimeout(() => setTransactionStatus('idle'), 3000);
        }, 2500);
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'text-green-400 bg-green-900/30';
            case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
            case 'High': return 'text-red-400 bg-red-900/30';
            default: return 'text-gray-400 bg-gray-900/30';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/portal'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> Vaults
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
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-teal-900/10 to-blue-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(45,212,191,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative pt-20 px-6 max-w-7xl mx-auto">
                {/* Vault Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total TVL</div>
                        <div className="text-lg font-bold text-green-400">{vaultData.totalTVL}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Active Pools</div>
                        <div className="text-lg font-bold text-teal-400">{vaultData.totalPools}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Users</div>
                        <div className="text-lg font-bold text-blue-400">{vaultData.totalUsers}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Avg APY</div>
                        <div className="text-lg font-bold text-purple-400">{vaultData.averageAPY}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Rewards</div>
                        <div className="text-lg font-bold text-yellow-400">{vaultData.totalRewards}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Strategies</div>
                        <div className="text-lg font-bold text-pink-400">{vaultData.activeStrategies}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Vault Selection */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-green-400 flex items-center mb-6">
                                <Lock className="mr-3" size={24} />
                                Yield Vaults
                            </h2>

                            {/* Vault Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {vaults.map(vault => (
                                    <div
                                        key={vault.id}
                                        onClick={() => setSelectedVault(vault)}
                                        className={`bg-gray-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:scale-105 ${selectedVault?.id === vault.id
                                                ? 'border-green-400 shadow-green-500/30'
                                                : 'border-gray-600 hover:border-green-500/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-2">{vault.icon}</span>
                                                <div>
                                                    <h3 className="font-bold text-white">{vault.name}</h3>
                                                    <p className="text-xs text-gray-400">{vault.strategy}</p>
                                                </div>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs ${getRiskColor(vault.risk)}`}>
                                                {vault.risk}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-gray-400">APY</div>
                                                <div className="text-green-400 font-bold">{vault.apy}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">TVL</div>
                                                <div className="text-white font-bold">{vault.tvl}</div>
                                            </div>
                                        </div>

                                        {vault.deposited !== '0' && (
                                            <div className="mt-3 pt-3 border-t border-gray-700">
                                                <div className="text-xs text-gray-400">Your Position</div>
                                                <div className="text-teal-400 font-medium">{vault.deposited} KAS</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Action Panel */}
                            {selectedVault && (
                                <div className="bg-gray-800/30 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-green-400 mb-4">
                                        {selectedVault.name} - {action === 'deposit' ? 'Deposit' : 'Withdraw'}
                                    </h3>

                                    {/* Action Toggle */}
                                    <div className="flex space-x-2 mb-4">
                                        <button
                                            onClick={() => setAction('deposit')}
                                            className={`px-4 py-2 rounded transition-all ${action === 'deposit'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Plus size={16} className="inline mr-1" />
                                            Deposit
                                        </button>
                                        <button
                                            onClick={() => setAction('withdraw')}
                                            className={`px-4 py-2 rounded transition-all ${action === 'withdraw'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Minus size={16} className="inline mr-1" />
                                            Withdraw
                                        </button>
                                    </div>

                                    {/* Amount Input */}
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-400 mb-2 block">Amount (KAS)</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 text-white text-lg font-bold"
                                        />
                                        <div className="text-xs text-gray-400 mt-1">
                                            Available: 5,432.10 KAS
                                        </div>
                                    </div>

                                    {/* Expected Returns */}
                                    {amount && (
                                        <div className="bg-gray-700/30 rounded-lg p-3 mb-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Expected Annual Return</span>
                                                <span className="text-green-400">
                                                    {(parseFloat(amount) * parseFloat(selectedVault.apy) / 100).toFixed(2)} KAS
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Monthly Estimate</span>
                                                <span className="text-green-400">
                                                    {(parseFloat(amount) * parseFloat(selectedVault.apy) / 100 / 12).toFixed(2)} KAS
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        onClick={handleVaultAction}
                                        disabled={!amount || transactionStatus === 'processing'}
                                        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${transactionStatus === 'processing'
                                                ? 'bg-yellow-600 text-white cursor-not-allowed'
                                                : transactionStatus === 'success'
                                                    ? 'bg-green-600 text-white'
                                                    : amount
                                                        ? `bg-gradient-to-r ${action === 'deposit' ? 'from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400' : 'from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400'} text-white`
                                                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {transactionStatus === 'processing' && (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </div>
                                        )}
                                        {transactionStatus === 'success' && (
                                            <div className="flex items-center justify-center">
                                                <Target className="mr-2" size={20} />
                                                {action === 'deposit' ? 'Deposited!' : 'Withdrawn!'}
                                            </div>
                                        )}
                                        {transactionStatus === 'idle' && (action === 'deposit' ? 'Deposit to Vault' : 'Withdraw from Vault')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Positions */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                                <Activity className="mr-2" size={18} />
                                Your Positions
                            </h3>
                            <div className="space-y-3">
                                {userPositions.map((position, index) => (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="font-medium text-white mb-1">{position.vault}</div>
                                        <div className="text-sm text-gray-400">{position.amount}</div>
                                        <div className="text-sm text-gray-300">{position.value}</div>
                                        <div className="text-xs text-green-400 mt-1">{position.rewards}</div>
                                    </div>
                                ))}
                                {userPositions.length === 0 && (
                                    <div className="text-center text-gray-400 py-4">
                                        No positions yet. Deposit to start earning!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Strategy Info */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                                <Target className="mr-2" size={18} />
                                Strategy Types
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-green-400 mb-1">🛡️ Stable Vaults</div>
                                    <div className="text-gray-300">Low-risk strategies focusing on stable returns through liquidity provision and staking.</div>
                                    <div className="text-green-400 text-xs mt-1">3-8% APY</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-blue-400 mb-1">📈 Growth Vaults</div>
                                    <div className="text-gray-300">Medium-risk auto-compounding strategies for steady growth.</div>
                                    <div className="text-blue-400 text-xs mt-1">8-18% APY</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-purple-400 mb-1">🚀 Aggressive Vaults</div>
                                    <div className="text-gray-300">High-risk, high-reward strategies using leverage and complex DeFi protocols.</div>
                                    <div className="text-purple-400 text-xs mt-1">15-30% APY</div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Analytics */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                                <BarChart3 className="mr-2" size={18} />
                                Performance
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">24h Yield</span>
                                        <span className="text-green-400">+$1,247</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Strategy Success</span>
                                        <span className="text-green-400">94%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Auto-Compound Rate</span>
                                        <span className="text-green-400">Every 6h</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaultsProtocol;
