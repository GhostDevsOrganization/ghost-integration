import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Home, Wallet, DollarSign, ArrowUp, ArrowDown,
    Percent, Clock, Shield, Info, Plus, Minus,
    BarChart3, Target, AlertTriangle, Activity, Zap
} from 'lucide-react';

const LendingProtocol = () => {
    // Lending state
    const [selectedAsset, setSelectedAsset] = useState('KAS');
    const [action, setAction] = useState('supply'); // supply, borrow, repay
    const [amount, setAmount] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('idle');

    // Real-time lending data
    const [lendingData, setLendingData] = useState({
        totalSupplied: '$5.2M',
        totalBorrowed: '$3.1M',
        utilization: '59.6%',
        totalUsers: '1,847',
        totalLiquidated: '$24K',
        activeLoans: 156
    });

    // Lending markets
    const [markets, setMarkets] = useState([
        {
            asset: 'KAS',
            icon: '⛏️',
            supplyAPY: '4.2%',
            borrowAPY: '8.5%',
            totalSupplied: '$2.1M',
            totalBorrowed: '$1.3M',
            utilizationRate: '61.9%',
            collateralFactor: '75%',
            liquidationThreshold: '80%',
            userSupplied: '1,500',
            userBorrowed: '0'
        },
        {
            asset: 'ETH',
            icon: '🔷',
            supplyAPY: '3.8%',
            borrowAPY: '7.2%',
            totalSupplied: '$1.8M',
            totalBorrowed: '$980K',
            utilizationRate: '54.4%',
            collateralFactor: '80%',
            liquidationThreshold: '85%',
            userSupplied: '0',
            userBorrowed: '0.5'
        },
        {
            asset: 'BTC',
            icon: '₿',
            supplyAPY: '3.5%',
            borrowAPY: '6.8%',
            totalSupplied: '$1.1M',
            totalBorrowed: '$650K',
            utilizationRate: '59.1%',
            collateralFactor: '70%',
            liquidationThreshold: '75%',
            userSupplied: '0',
            userBorrowed: '0'
        },
        {
            asset: 'USDC',
            icon: '💵',
            supplyAPY: '5.1%',
            borrowAPY: '9.3%',
            totalSupplied: '$220K',
            totalBorrowed: '$160K',
            utilizationRate: '72.7%',
            collateralFactor: '85%',
            liquidationThreshold: '90%',
            userSupplied: '0',
            userBorrowed: '0'
        }
    ]);

    // User portfolio
    const [userPortfolio, setUserPortfolio] = useState({
        totalSupplied: '$367.50',
        totalBorrowed: '$1,235.00',
        netAPY: '+2.3%',
        healthFactor: '1.85',
        borrowLimit: '$2,450.00',
        liquidationRisk: 'Safe'
    });

    // User positions
    const [userPositions, setUserPositions] = useState([
        { type: 'Supply', asset: 'KAS', amount: '1,500 KAS', apy: '+4.2%', value: '$367.50' },
        { type: 'Borrow', asset: 'ETH', amount: '0.5 ETH', apy: '-7.2%', value: '$1,235.00' }
    ]);

    // Update lending data every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLendingData(prev => ({
                totalSupplied: `$${(5.2 + Math.random() * 1).toFixed(1)}M`,
                totalBorrowed: `$${(3.1 + Math.random() * 0.5).toFixed(1)}M`,
                utilization: `${(59.6 + Math.random() * 5).toFixed(1)}%`,
                totalUsers: `${Math.floor(1840 + Math.random() * 20)}`,
                totalLiquidated: `$${Math.floor(24 + Math.random() * 5)}K`,
                activeLoans: Math.floor(150 + Math.random() * 20)
            }));

            // Update market rates
            setMarkets(prev => prev.map(market => ({
                ...market,
                supplyAPY: `${(parseFloat(market.supplyAPY) + (Math.random() - 0.5) * 0.5).toFixed(1)}%`,
                borrowAPY: `${(parseFloat(market.borrowAPY) + (Math.random() - 0.5) * 0.8).toFixed(1)}%`,
                utilizationRate: `${(parseFloat(market.utilizationRate) + (Math.random() - 0.5) * 3).toFixed(1)}%`
            })));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Handle lending action
    const handleLendingAction = async () => {
        setTransactionStatus('processing');

        setTimeout(() => {
            setTransactionStatus('success');

            // Update user positions based on action
            if (action === 'supply') {
                const existingSupply = userPositions.find(p => p.type === 'Supply' && p.asset === selectedAsset);
                if (existingSupply) {
                    setUserPositions(prev => prev.map(p =>
                        p.type === 'Supply' && p.asset === selectedAsset
                            ? { ...p, amount: `${parseFloat(p.amount) + parseFloat(amount)} ${selectedAsset}` }
                            : p
                    ));
                } else {
                    setUserPositions(prev => [...prev, {
                        type: 'Supply',
                        asset: selectedAsset,
                        amount: `${amount} ${selectedAsset}`,
                        apy: `+${markets.find(m => m.asset === selectedAsset)?.supplyAPY || '0%'}`,
                        value: `$${(parseFloat(amount) * (selectedAsset === 'KAS' ? 0.245 : selectedAsset === 'ETH' ? 2470 : 67000)).toFixed(2)}`
                    }]);
                }
            }

            setAmount('');
            setTimeout(() => setTransactionStatus('idle'), 3000);
        }, 2500);
    };

    const getHealthFactorColor = (factor) => {
        const num = parseFloat(factor);
        if (num >= 2) return 'text-green-400';
        if (num >= 1.5) return 'text-yellow-400';
        if (num >= 1.2) return 'text-orange-400';
        return 'text-red-400';
    };

    const selectedMarket = markets.find(m => m.asset === selectedAsset);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/portal'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> Lending
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
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-orange-900/10 to-red-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(234,179,8,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(249,115,22,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative pt-20 px-6 max-w-7xl mx-auto">
                {/* Lending Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Supplied</div>
                        <div className="text-lg font-bold text-yellow-400">{lendingData.totalSupplied}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Borrowed</div>
                        <div className="text-lg font-bold text-orange-400">{lendingData.totalBorrowed}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Utilization</div>
                        <div className="text-lg font-bold text-red-400">{lendingData.utilization}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Users</div>
                        <div className="text-lg font-bold text-green-400">{lendingData.totalUsers}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Liquidated</div>
                        <div className="text-lg font-bold text-purple-400">{lendingData.totalLiquidated}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Active Loans</div>
                        <div className="text-lg font-bold text-blue-400">{lendingData.activeLoans}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lending Markets */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-yellow-400 flex items-center mb-6">
                                <TrendingUp className="mr-3" size={24} />
                                Lending Markets
                            </h2>

                            {/* Markets Table */}
                            <div className="space-y-4 mb-6">
                                {markets.map(market => (
                                    <div
                                        key={market.asset}
                                        onClick={() => setSelectedAsset(market.asset)}
                                        className={`bg-gray-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02] ${selectedAsset === market.asset
                                                ? 'border-yellow-400 shadow-yellow-500/30'
                                                : 'border-gray-600 hover:border-yellow-500/50'
                                            }`}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3">{market.icon}</span>
                                                <div>
                                                    <div className="font-bold text-white">{market.asset}</div>
                                                    <div className="text-xs text-gray-400">{market.totalSupplied} supplied</div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-green-400 font-bold">{market.supplyAPY}</div>
                                                <div className="text-xs text-gray-400">Supply APY</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-red-400 font-bold">{market.borrowAPY}</div>
                                                <div className="text-xs text-gray-400">Borrow APY</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-white font-bold">{market.utilizationRate}</div>
                                                <div className="text-xs text-gray-400">Utilization</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-teal-400 font-bold">{market.collateralFactor}</div>
                                                <div className="text-xs text-gray-400">Collateral</div>
                                            </div>
                                            <div className="text-center">
                                                {(market.userSupplied !== '0' || market.userBorrowed !== '0') && (
                                                    <div className="text-yellow-400 text-xs">
                                                        {market.userSupplied !== '0' && `S: ${market.userSupplied}`}
                                                        {market.userBorrowed !== '0' && `B: ${market.userBorrowed}`}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Panel */}
                            {selectedMarket && (
                                <div className="bg-gray-800/30 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-yellow-400 mb-4">
                                        {selectedMarket.asset} - {action === 'supply' ? 'Supply' : action === 'borrow' ? 'Borrow' : 'Repay'}
                                    </h3>

                                    {/* Action Toggle */}
                                    <div className="flex space-x-2 mb-4">
                                        <button
                                            onClick={() => setAction('supply')}
                                            className={`px-4 py-2 rounded transition-all ${action === 'supply'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Plus size={16} className="inline mr-1" />
                                            Supply
                                        </button>
                                        <button
                                            onClick={() => setAction('borrow')}
                                            className={`px-4 py-2 rounded transition-all ${action === 'borrow'
                                                ? 'bg-orange-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <ArrowDown size={16} className="inline mr-1" />
                                            Borrow
                                        </button>
                                        <button
                                            onClick={() => setAction('repay')}
                                            className={`px-4 py-2 rounded transition-all ${action === 'repay'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Minus size={16} className="inline mr-1" />
                                            Repay
                                        </button>
                                    </div>

                                    {/* Amount Input */}
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-400 mb-2 block">Amount ({selectedAsset})</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 text-white text-lg font-bold"
                                        />
                                        <div className="text-xs text-gray-400 mt-1">
                                            {action === 'supply' ? 'Available' : action === 'borrow' ? 'Borrow Limit' : 'Owed'}: 2,543.21 {selectedAsset}
                                        </div>
                                    </div>

                                    {/* Transaction Details */}
                                    {amount && (
                                        <div className="bg-gray-700/30 rounded-lg p-3 mb-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">
                                                    {action === 'supply' ? 'APY Earned' : action === 'borrow' ? 'APY Cost' : 'Interest Saved'}
                                                </span>
                                                <span className={action === 'supply' ? 'text-green-400' : 'text-red-400'}>
                                                    {action === 'supply' ? selectedMarket.supplyAPY : selectedMarket.borrowAPY}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Collateral Factor</span>
                                                <span className="text-teal-400">{selectedMarket.collateralFactor}</span>
                                            </div>
                                            {action === 'borrow' && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Liquidation Threshold</span>
                                                    <span className="text-orange-400">{selectedMarket.liquidationThreshold}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        onClick={handleLendingAction}
                                        disabled={!amount || transactionStatus === 'processing'}
                                        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${transactionStatus === 'processing'
                                                ? 'bg-yellow-600 text-white cursor-not-allowed'
                                                : transactionStatus === 'success'
                                                    ? 'bg-green-600 text-white'
                                                    : amount
                                                        ? `bg-gradient-to-r ${action === 'supply' ? 'from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400' :
                                                            action === 'borrow' ? 'from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400' :
                                                                'from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400'
                                                        } text-white`
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
                                                {action === 'supply' ? 'Supplied!' : action === 'borrow' ? 'Borrowed!' : 'Repaid!'}
                                            </div>
                                        )}
                                        {transactionStatus === 'idle' &&
                                            (action === 'supply' ? 'Supply Assets' : action === 'borrow' ? 'Borrow Assets' : 'Repay Loan')
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Portfolio */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
                                <Activity className="mr-2" size={18} />
                                Your Portfolio
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Total Supplied</span>
                                    <span className="text-green-400 font-bold">{userPortfolio.totalSupplied}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Total Borrowed</span>
                                    <span className="text-red-400 font-bold">{userPortfolio.totalBorrowed}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Net APY</span>
                                    <span className="text-blue-400 font-bold">{userPortfolio.netAPY}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Health Factor</span>
                                    <span className={`font-bold ${getHealthFactorColor(userPortfolio.healthFactor)}`}>
                                        {userPortfolio.healthFactor}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Borrow Limit</span>
                                    <span className="text-teal-400 font-bold">{userPortfolio.borrowLimit}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Risk Level</span>
                                    <div className="flex items-center">
                                        <span className="text-green-400 font-bold mr-1">{userPortfolio.liquidationRisk}</span>
                                        <Shield className="text-green-400" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Positions */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4">Your Positions</h3>
                            <div className="space-y-3">
                                {userPositions.map((position, index) => (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xs px-2 py-1 rounded-full ${position.type === 'Supply' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                                                }`}>
                                                {position.type}
                                            </span>
                                            <span className="text-white font-medium">{position.asset}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">{position.amount}</div>
                                        <div className="flex justify-between text-xs mt-1">
                                            <span className="text-gray-300">{position.value}</span>
                                            <span className={position.type === 'Supply' ? 'text-green-400' : 'text-red-400'}>
                                                {position.apy}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risk Management */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
                                <AlertTriangle className="mr-2" size={18} />
                                Risk Management
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-green-400 mb-1">✓ Health Factor: {userPortfolio.healthFactor}</div>
                                    <div className="text-gray-300">Your account is safe from liquidation. Maintain above 1.0 to avoid liquidation.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-teal-400 mb-1">📊 Utilization Tips</div>
                                    <div className="text-gray-300">Higher utilization = higher rates. Monitor market conditions for optimal timing.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-orange-400 mb-1">⚠️ Liquidation Risk</div>
                                    <div className="text-gray-300">If health factor drops below 1.0, positions may be liquidated with penalties.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LendingProtocol;
