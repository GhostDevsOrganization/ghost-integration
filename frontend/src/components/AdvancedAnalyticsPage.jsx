import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnalyticsPanel from './AnalyticsPanel'; // Import AnalyticsPanel

const AdvancedAnalyticsPage = () => {
    const [activeTab, setActiveTab] = useState('overview'); // Change initial tab to 'overview' to match AnalyticsPanel tabs
    const location = useLocation();

    // Example Analytics Data (still needed for other tabs)
    const portfolioData = [
        { date: 'Jan', value: 12400 },
        { date: 'Feb', value: 13100 },
        { date: 'Mar', value: 12800 },
        { date: 'Apr', value: 14500 },
        { date: 'May', value: 16200 },
        { date: 'Jun', value: 18900 },
        { date: 'Jul', value: 19200 }
    ];

    // Asset Distribution (still needed for other tabs)
    const assetDistribution = [
        { name: 'KAS', percentage: 65, color: 'bg-green-500' },
        { name: 'ETH', percentage: 15, color: 'bg-blue-500' },
        { name: 'BTC', percentage: 10, color: 'bg-orange-500' },
        { name: 'USDT', percentage: 5, color: 'bg-teal-500' },
        { name: 'Other', percentage: 5, color: 'bg-purple-500' }
    ];

    // Market Data
    const marketData = [
        { coin: 'KAS', price: '$0.062', change: '+5.2%', volume: '$24.6M', marketCap: '$652.3M', trending: true },
        { coin: 'BTC', price: '$62,583', change: '+1.8%', volume: '$18.2B', marketCap: '$1.22T', trending: true },
        { coin: 'ETH', price: '$3,045', change: '-0.3%', volume: '$8.6B', marketCap: '$367.1B', trending: false },
        { coin: 'SOL', price: '$124.20', change: '+7.5%', volume: '$3.8B', marketCap: '$53.2B', trending: true },
        { coin: 'DOGE', price: '$0.135', change: '-2.1%', volume: '$1.2B', marketCap: '$18.4B', trending: false }
    ];

    // Historical performance data
    const historicalData = [
        { period: '1 Day', kasChange: '+1.2%', btcChange: '+0.4%', marketChange: '+0.3%' },
        { period: '1 Week', kasChange: '+5.8%', btcChange: '+2.1%', marketChange: '+1.4%' },
        { period: '1 Month', kasChange: '+14.3%', btcChange: '+5.6%', marketChange: '+3.2%' },
        { period: '3 Months', kasChange: '+38.2%', btcChange: '+12.7%', marketChange: '+8.5%' },
        { period: '6 Months', kasChange: '+56.4%', btcChange: '+24.8%', marketChange: '+15.1%' },
        { period: '1 Year', kasChange: '+124.7%', btcChange: '+42.3%', marketChange: '+28.6%' }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Radar-style background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] rounded-full border border-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-green-500/10"></div>

                {/* Scanning line */}
                <div className="absolute top-1/2 left-1/2 h-[150vh] w-px bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                    style={{ animationDuration: '40s' }}></div>
                <div className="absolute top-1/2 left-1/2 h-px w-[150vh] bg-green-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                    style={{ animationDuration: '40s' }}></div>

                {/* Small particles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-green-400"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5,
                            animation: `float ${Math.random() * 10 + 10}s infinite linear`
                        }}
                    ></div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-4 pt-4 z-20 relative">
                <Link to="/" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Home</Link>
                <Link to="/portal/enhanced-radar" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/portal/enhanced-radar' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Enter Portal</Link>
                <Link to="/features/token-swapping" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/token-swapping' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Token Swapping</Link>
                <Link to="/features/multi-wallet-support" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/multi-wallet-support' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Multi-Wallet Support</Link>
                <Link to="/features/advanced-analytics" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/advanced-analytics' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Advanced Analytics</Link>
                <Link to="/features/cross-chain-compatibility" className={`px-4 py-2 rounded-t-lg ${location.pathname === '/features/cross-chain-compatibility' ? 'bg-green-500/20 text-green-400' : 'text-white hover:bg-black/50'}`}>Cross-Chain Compatibility</Link>
            </div>

            {/* Header */}
            <header className="pt-10 pb-10 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Advanced Analytics</span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-6"></div>
                {/* Updated Description */}
                <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
                    Kasportal's Advanced Analytics provides comprehensive insights into your cryptocurrency portfolio and market trends. Our powerful visualization tools help you track performance, analyze market conditions, and make informed decisions about your investments.
                </p>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 pb-20">
                {/* Analytics Tabs */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 mb-12">
                    <div className="flex flex-wrap border-b border-green-500/20 mb-6">
                        {/* Updated Tabs to match AnalyticsPanel */}
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === 'performance' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('performance')}
                        >


                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === 'customize' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('customize')}
                        >
                            Customize Dashboard
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {/* AnalyticsPanel for Overview, Performance, and Assets tabs */}
                        {(activeTab === 'overview' || activeTab === 'performance' || activeTab === 'assets') && (
                            <AnalyticsPanel
                                kasPrice={0.062} // Replace with actual dynamic data if available
                                portfolioData={portfolioData} // Pass data to AnalyticsPanel
                                assetDistribution={assetDistribution} // Pass data to AnalyticsPanel
                            />
                        )}

                        {/* Market Data Tab (existing content) */}
                        {activeTab === 'market' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">Market Data</h2>
                                    <div className="flex space-x-2">
                                        <button className="bg-green-500/10 text-green-400 px-4 py-2 rounded text-sm">Refresh Data</button>
                                    </div>
                                </div>

                                {/* Market Overview */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                                        <div className="text-gray-400 text-sm">Market Cap (Global)</div>
                                        <div className="text-2xl font-bold text-white">$2.45T</div>
                                        <div className="text-green-400 text-sm">+1.2% today</div>
                                    </div>
                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                                        <div className="text-gray-400 text-sm">Trading Volume (24h)</div>
                                        <div className="text-2xl font-bold text-white">$98.3B</div>
                                        <div className="text-red-400 text-sm">-3.5% from yesterday</div>
                                    </div>
                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                                        <div className="text-gray-400 text-sm">BTC Dominance</div>
                                        <div className="text-2xl font-bold text-white">48.2%</div>
                                        <div className="text-red-400 text-sm">-0.5% today</div>
                                    </div>
                                </div>

                                {/* Market Table */}
                                <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Top Cryptocurrencies</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-green-500/20">
                                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Coin</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Volume</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Market Cap</th>
                                                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Trending</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {marketData.map((coin, index) => (
                                                    <tr key={index} className="border-b border-green-500/10">
                                                        <td className="py-3 px-4 font-medium">{coin.coin}</td>
                                                        <td className="py-3 px-4 text-right">{coin.price}</td>
                                                        <td className={`py-3 px-4 text-right ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                            {coin.change}
                                                        </td>
                                                        <td className="py-3 px-4 text-right">{coin.volume}</td>
                                                        <td className="py-3 px-4 text-right">{coin.marketCap}</td>
                                                        <td className="py-3 px-4 text-center">
                                                            {coin.trending ? (
                                                                <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">
                                                                    Trending
                                                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                                    </svg>
                                                                </span>
                                                            ) : null}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-4 py-2 rounded text-sm">
                                            View All Coins
                                        </button>
                                    </div>
                                </div>

                                {/* Market Insights */}
                                <div className="mt-8 bg-black/50 border border-green-500/20 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Market Insights</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium text-green-400 mb-2">Fear & Greed Index</h4>
                                            <div className="flex items-center">
                                                <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                                                    <div className="absolute -top-1 transform -translate-x-1/2" style={{ left: '65%' }}>
                                                        <div className="w-6 h-6 bg-white rounded-full border-4 border-black"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs mt-1">
                                                <span>Extreme Fear</span>
                                                <span>Neutral</span>
                                                <span>Extreme Greed</span>
                                            </div>
                                            <div className="mt-2 text-center font-medium">Current: Greed (65)</div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-green-400 mb-2">Market Trend</h4>
                                            <div className="border border-green-500/20 rounded p-3">
                                                <div className="text-center mb-2">
                                                    <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 text-sm">
                                                        Bullish
                                                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-sm">Strong buying pressure with increased trading volume. BTC holding above key resistance level of $62K.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Historical Analysis Tab (existing content) */}
                        {activeTab === 'historical' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">Historical Analysis</h2>
                                    <div className="flex space-x-2">
                                        <button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">Export Data</button>
                                    </div>
                                </div>

                                {/* Comparative Performance */}
                                <div className="bg-black/50 border border-green-500/20 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Comparative Performance</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-green-500/20">
                                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Period</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Kaspa (KAS)</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Bitcoin (BTC)</th>
                                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Overall Market</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {historicalData.map((period, index) => (
                                                    <tr key={index} className="border-b border-green-500/10">
                                                        <td className="py-3 px-4 font-medium">{period.period}</td>
                                                        <td className={`py-3 px-4 text-right ${period.kasChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                            {period.kasChange}
                                                        </td>
                                                        <td className={`py-3 px-4 text-right ${period.btcChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                            {period.btcChange}
                                                        </td>
                                                        <td className={`py-3 px-4 text-right ${period.marketChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                            {period.marketChange}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Performance Chart */}
                                <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Relative Performance Chart</h3>
                                    <div className="h-80 w-full relative">
                                        {/* Chart Simulation - In a real implementation, you would use a proper charting library */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative w-full h-64">
                                                {/* Overlay grid */}
                                                <div className="absolute inset-0">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className="absolute w-full h-px bg-green-500/10" style={{ top: `${i * 25}%` }}></div>
                                                    ))}
                                                    {[...Array(7)].map((_, i) => (
                                                        <div key={i} className="absolute h-full w-px bg-green-500/10" style={{ left: `${i * 16.66}%` }}></div>
                                                    ))}
                                                </div>

                                                {/* Chart lines */}
                                                <svg className="w-full h-full">
                                                    {/* KAS Line */}
                                                    <path
                                                        d="M0,192 L100,160 L200,170 L300,140 L400,70 L500,20 L600,32"
                                                        fill="none"
                                                        stroke="#10b981"
                                                        strokeWidth="3"
                                                        className="animate-drawLine"
                                                        strokeDasharray="1000"
                                                        strokeDashoffset="1000"
                                                        style={{ animation: 'drawLine 2s forwards' }}
                                                    />

                                                    {/* BTC Line */}
                                                    <path
                                                        d="M0,192 L100,185 L200,175 L300,160 L400,135 L500,118 L600,128"
                                                        fill="none"
                                                        stroke="#f59e0b"
                                                        strokeWidth="2"
                                                        className="animate-drawLine"
                                                        strokeDasharray="1000"
                                                        strokeDashoffset="1000"
                                                        style={{ animation: 'drawLine 2s forwards 0.5s' }}
                                                    />

                                                    {/* Market Line */}
                                                    <path
                                                        d="M0,192 L100,188 L200,184 L300,175 L400,165 L500,152 L600,160"
                                                        fill="none"
                                                        stroke="#6b7280"
                                                        strokeWidth="2"
                                                        strokeDasharray="4,4"
                                                        className="animate-drawLine"
                                                        style={{ animation: 'drawLine 2s forwards 1s' }}
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Chart Legend */}
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 py-2">
                                            <div className="flex items-center">
                                                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                                                <span className="text-sm">Kaspa (KAS)</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
                                                <span className="text-sm">Bitcoin (BTC)</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-4 h-1 bg-gray-500 mr-2 border-t border-b border-dashed border-gray-500"></div>
                                                <span className="text-sm">Market Average</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Historical Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Volatility Analysis</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-300">30-Day Volatility</span>
                                                    <span className="text-white">High</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-yellow-500" style={{ width: '75%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-300">90-Day Volatility</span>
                                                    <span className="text-white">Medium</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-300">Price Correlation w/ BTC</span>
                                                    <span className="text-white">Low</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-green-500" style={{ width: '25%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Key Historical Events</h3>
                                        <div className="space-y-4">
                                            <div className="flex">
                                                <div className="min-w-[80px] text-xs text-gray-400">MAR 15, 2025</div>
                                                <div>
                                                    <div className="font-medium text-white">Network Upgrade v1.5</div>
                                                    <div className="text-sm text-gray-300">KAS price surged 28% following major protocol upgrade</div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="min-w-[80px] text-xs text-gray-400">FEB 3, 2025</div>
                                                <div>
                                                    <div className="font-medium text-white">Major Exchange Listing</div>
                                                    <div className="text-sm text-gray-300">Added to top-tier exchange with 15% price increase</div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="min-w-[80px] text-xs text-gray-400">JAN 12, 2025</div>
                                                <div>
                                                    <div className="font-medium text-white">Partnership Announcement</div>
                                                    <div className="text-sm text-gray-300">Strategic partnership with blockchain infrastructure provider</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Customize Dashboard Tab (existing content) */}
                        {activeTab === 'customize' && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Customize Your Analytics Dashboard</h2>

                                <div className="bg-black/50 border border-green-500/20 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Widget Selection</h3>
                                    <p className="text-gray-300 mb-6">Select which widgets to display on your dashboard and arrange them in your preferred order.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Widget Options */}
                                        {['Portfolio Value Chart', 'Asset Distribution', 'Token Holdings', 'Transaction History',
                                            'Market Overview', 'Price Alerts', 'Historical Comparison', 'Network Statistics'].map((widget, index) => (
                                                <div key={index} className="flex items-center space-x-2 bg-black/40 p-3 rounded border border-green-500/10">
                                                    <input
                                                        type="checkbox"
                                                        id={`widget-${index}`}
                                                        defaultChecked={index < 5}
                                                        className="form-checkbox h-5 w-5 text-green-400 rounded border-green-500/30 bg-black focus:ring-green-400"
                                                    />
                                                    <label htmlFor={`widget-${index}`} className="select-none">{widget}</label>
                                                </div>
                                            ))}
                                    </div>

                                    <div className="mt-6">
                                        <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded">
                                            Save Configuration
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Display Preferences</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gray-300 mb-2">Default Time Range</label>
                                                <select className="w-full bg-black border border-green-500/30 rounded p-2 text-white focus:border-green-400 focus:ring-1 focus:ring-green-400">
                                                    <option>24 Hours</option>
                                                    <option>7 Days</option>
                                                    <option selected>30 Days</option>
                                                    <option>90 Days</option>
                                                    <option>1 Year</option>
                                                    <option>All Time</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-gray-300 mb-2">Currency Display</label>
                                                <select className="w-full bg-black border border-green-500/30 rounded p-2 text-white focus:border-green-400 focus:ring-1 focus:ring-green-400">
                                                    <option selected>USD</option>
                                                    <option>EUR</option>
                                                    <option>GBP</option>
                                                    <option>JPY</option>
                                                    <option>BTC</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-gray-300 mb-2">Chart Type</label>
                                                <select className="w-full bg-black border border-green-500/30 rounded p-2 text-white focus:border-green-400 focus:ring-1 focus:ring-green-400">
                                                    <option selected>Line Chart</option>
                                                    <option>Candlestick</option>
                                                    <option>Bar Chart</option>
                                                    <option>Area Chart</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Notification Settings</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-gray-300">Price Alerts</label>
                                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" defaultChecked />
                                                    <span className="absolute cursor-pointer inset-0 bg-green-500 rounded-full transition duration-300"></span>
                                                    <span className="absolute cursor-pointer left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300 transform translate-x-6"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-gray-300">Portfolio Summary (Daily)</label>
                                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" defaultChecked />
                                                    <span className="absolute cursor-pointer inset-0 bg-green-500 rounded-full transition duration-300"></span>
                                                    <span className="absolute cursor-pointer left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300 transform translate-x-6"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-gray-300">Market Updates</label>
                                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
                                                    <span className="absolute cursor-pointer inset-0 bg-gray-600 rounded-full transition duration-300"></span>
                                                    <span className="absolute cursor-pointer left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-gray-300">Network Status Alerts</label>
                                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" defaultChecked />
                                                    <span className="absolute cursor-pointer inset-0 bg-green-500 rounded-full transition duration-300"></span>
                                                    <span className="absolute cursor-pointer left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300 transform translate-x-6"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to action */}
                <div className="text-center mt-8">
                    <a
                        href="#"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20"
                    >
                        Access Full Analytics Dashboard
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <p className="text-gray-400 mt-4">
                        Connect your wallet to view your personalized analytics
                    </p>
                </div>
            </main>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(3px, 3px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-3px, 5px); }
        }

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
        </div>
    );
};

export default AdvancedAnalyticsPage;
