import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  PiggyBank, 
  TrendingUp,
  Activity,
  RefreshCw,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  Download,
  Plus,
  Filter
} from 'lucide-react';
import BlackPortfolioChart from './BlackPortfolioChart';

const PortalAnalyticsDashboard = ({ 
  kasPrice = 0.062, 
  walletConnected = false, 
  address = "", 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24H');
  const [portfolioValue, setPortfolioValue] = useState(24563.89);
  const [portfolioChange, setPortfolioChange] = useState(5.7);

  // Asset distribution
  const assetDistribution = [
    { name: 'ETH', percentage: 45, color: 'bg-green-500' },
    { name: 'BTC', percentage: 25, color: 'bg-green-700' },
    { name: 'SOL', percentage: 15, color: 'bg-emerald-500' },
    { name: 'MATIC', percentage: 10, color: 'bg-green-300' },
    { name: 'Other', percentage: 5, color: 'bg-green-900' }
  ];

  // Transaction data
  const transactionData = [
    {
      type: "Swap",
      from: "ETH",
      to: "USDC",
      amount: "1.25 ETH",
      value: "$2,345.67",
      time: "2h ago",
      status: "completed",
    },
    {
      type: "Bridge",
      from: "Ethereum",
      to: "Polygon",
      amount: "500 USDC",
      value: "$500.00",
      time: "5h ago",
      status: "completed",
    },
    {
      type: "Swap",
      from: "USDC",
      to: "SOL",
      amount: "1,000 USDC",
      value: "$1,000.00",
      time: "1d ago",
      status: "completed",
    }
  ];

  // Network stats
  const networkStats = {
    gasPrice: "32 Gwei",
    congestion: "Low congestion",
    blockHeight: "18,245,632",
    blockStatus: "Latest block",
    hashRate: "1.2 PH/s",
    hashRateChange: "+3.5% (24h)",
    validators: "738,245",
    validatorsChange: "+124 (24h)"
  };

  // Market stats
  const marketStats = {
    marketCap: "$2.45T",
    marketCapChange: "+1.2% today",
    tradingVolume: "$98.3B",
    tradingVolumeChange: "-3.5% from yesterday",
    btcDominance: "48.2%",
    btcDominanceChange: "-0.5% today",
    fearGreedIndex: "65",
    fearGreedStatus: "Greed"
  };

  // Historical performance
  const historicalData = [
    { period: '1 Day', assetChange: '+1.2%', btcChange: '+0.4%', marketChange: '+0.3%' },
    { period: '1 Week', assetChange: '+5.8%', btcChange: '+2.1%', marketChange: '+1.4%' },
    { period: '1 Month', assetChange: '+14.3%', btcChange: '+5.6%', marketChange: '+3.2%' },
    { period: '3 Months', assetChange: '+38.2%', btcChange: '+12.7%', marketChange: '+8.5%' },
    { period: '6 Months', assetChange: '+56.4%', btcChange: '+24.8%', marketChange: '+15.1%' },
    { period: '1 Year', assetChange: '+124.7%', btcChange: '+42.3%', marketChange: '+28.6%' }
  ];

  // Sample portfolio data for the chart
  const generateSamplePortfolioData = () => {
    // Create a series of dates from 2 weeks ago to today
    const data = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    
    let currentValue = 21000; // Starting value
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Random change between -3% and +5%
      const change = currentValue * (Math.random() * 0.08 - 0.03);
      currentValue += change;
      
      // Ensure it never goes negative
      if (currentValue < 100) currentValue = 100;
      
      data.push({
        date: currentDate.toISOString(),
        value: currentValue,
        usdValue: currentValue * kasPrice
      });
      
      // Increment by 6 hours
      const nextDate = new Date(currentDate);
      nextDate.setHours(nextDate.getHours() + 6);
      currentDate = nextDate;
    }
    
    return data;
  };

  const [portfolioData, setPortfolioData] = useState([]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPortfolioData(generateSamplePortfolioData());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [kasPrice]);

  // Generate stars for the background
  const createStars = (count = 150) =>
    Array.from({ length: count }).map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  
  const [stars] = useState(createStars);

  const demoMode = !walletConnected;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <BarChart3 size={48} className="text-green-500 mb-4" />
          <span className="text-green-400 text-xl">Loading analytics dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50 overflow-hidden">
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Single header with title, time range buttons, and close button */}
      <div className="relative px-4 py-2 border-b border-green-900/50 flex justify-between items-center z-10">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-400 font-medium text-sm">PORTAL ANALYTICS</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex">
            <button
              onClick={() => setTimeRange('24H')}
              className={`px-2 py-0.5 text-xs rounded-sm ${timeRange === '24H' ? 'bg-green-600 text-white' : 'bg-black border border-green-800/50 text-green-400'}`}
            >
              24H
            </button>
            <button
              onClick={() => setTimeRange('7D')}
              className={`px-2 py-0.5 text-xs rounded-sm ${timeRange === '7D' ? 'bg-green-600 text-white' : 'bg-black border border-green-800/50 text-green-400'}`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30D')}
              className={`px-2 py-0.5 text-xs rounded-sm ${timeRange === '30D' ? 'bg-green-600 text-white' : 'bg-black border border-green-800/50 text-green-400'}`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeRange('ALL')}
              className={`px-2 py-0.5 text-xs rounded-sm ${timeRange === 'ALL' ? 'bg-green-600 text-white' : 'bg-black border border-green-800/50 text-green-400'}`}
            >
              ALL
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-0.5 rounded-sm text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-green-900/30">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-8 text-xs ${activeTab === 'overview' 
            ? 'text-white border-b border-green-400 bg-green-900/20' 
            : 'text-gray-400 hover:text-green-300'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`py-2 px-8 text-xs ${activeTab === 'market' 
            ? 'text-white border-b border-green-400 bg-green-900/20' 
            : 'text-gray-400 hover:text-green-300'}`}
        >
          Market
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`py-2 px-8 text-xs ${activeTab === 'performance' 
            ? 'text-white border-b border-green-400 bg-green-900/20' 
            : 'text-gray-400 hover:text-green-300'}`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`py-2 px-8 text-xs ${activeTab === 'assets' 
            ? 'text-white border-b border-green-400 bg-green-900/20' 
            : 'text-gray-400 hover:text-green-300'}`}
        >
          Assets
        </button>
      </div>

      {/* Main Content Area with Scrolling */}
      <div className="flex-grow overflow-y-auto p-4 text-white">
        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-4">
            {/* Market Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="text-gray-400 text-xs">Market Cap (Global)</div>
                <div className="text-xl font-bold text-white">{marketStats.marketCap}</div>
                <div className="text-green-500 text-xs">↑ {marketStats.marketCapChange}</div>
              </div>
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="text-gray-400 text-xs">Trading Volume (24h)</div>
                <div className="text-xl font-bold text-white">{marketStats.tradingVolume}</div>
                <div className="text-red-500 text-xs">↓ {marketStats.tradingVolumeChange}</div>
              </div>
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="text-gray-400 text-xs">BTC Dominance</div>
                <div className="text-xl font-bold text-white">{marketStats.btcDominance}</div>
                <div className="text-red-500 text-xs">↓ {marketStats.btcDominanceChange}</div>
              </div>
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="text-gray-400 text-xs">Fear & Greed Index</div>
                <div className="text-xl font-bold text-white">{marketStats.fearGreedIndex}</div>
                <div className="text-yellow-500 text-xs">{marketStats.fearGreedStatus}</div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Market Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-green-900/40 rounded p-4">
                  <h4 className="text-green-400 text-xs mb-2">Fear & Greed Index</h4>
                  <div className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                    <div className="absolute -top-1 w-5 h-5 bg-white rounded-full border-2 border-black transform -translate-x-1/2" style={{ left: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Extreme Fear</span>
                    <span>Neutral</span>
                    <span>Extreme Greed</span>
                  </div>
                  <div className="mt-2 text-xs text-center">Current: Greed (65)</div>
                </div>

                <div className="bg-black/40 border border-green-900/40 rounded p-4">
                  <h4 className="text-green-400 text-xs mb-2">Market Trend</h4>
                  <div className="flex justify-center mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-500 text-xs rounded flex items-center">
                      Bullish <ChevronsUp size={12} className="ml-1" />
                    </span>
                  </div>
                  <p className="text-xs">
                    Strong buying pressure with increased trading volume. BTC holding above key resistance level of $62K.
                  </p>
                </div>
              </div>
            </div>

            {/* Market Trends Chart */}
            <div className="mt-6 bg-black/40 border border-green-900/40 rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Market Trends</h3>
                <div className="relative">
                  <button className="flex items-center text-xs px-2 py-1 bg-black border border-green-800 rounded">
                    <span>BTC/USD</span>
                    <ChevronDown size={12} className="ml-1" />
                  </button>
                </div>
              </div>

              {/* For market trends, we'll use the same chart component with different data */}
              <BlackPortfolioChart 
                data={portfolioData.map(item => ({
                  ...item,
                  value: item.value * (1 + (Math.random() * 0.2 - 0.1)), // Slightly different data
                  usdValue: item.usdValue * (1 + (Math.random() * 0.2 - 0.1))
                }))} 
                kasPrice={kasPrice} 
              />
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Portfolio Overview */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xs text-gray-400">Total Value</div>
                  <div className="text-2xl font-bold">
                    ${portfolioValue.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs flex items-center ${portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {portfolioChange >= 0 ? <ChevronsUp size={12} /> : <ChevronsDown size={12} />}
                    {portfolioChange >= 0 ? "+" : ""}
                    {portfolioChange}% (24h)
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-black border border-green-800 rounded-sm text-green-400 text-xs flex items-center">
                    <Download size={10} className="mr-1" />Export
                  </button>
                  <button className="px-3 py-1 bg-green-700 text-white rounded-sm text-xs flex items-center">
                    <Plus size={10} className="mr-1" />Add Funds
                  </button>
                </div>
              </div>

              {/* Portfolio Chart using the imported component */}
              <BlackPortfolioChart data={portfolioData} kasPrice={kasPrice} />
            </div>

            {/* Additional Charts Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Assets */}
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Assets</h3>
                  <button className="text-green-400">
                    <RefreshCw size={12} />
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      letter: "E",
                      name: "Ethereum",
                      symbol: "ETH",
                      value: 12345.67,
                      change: 2.4,
                    },
                    {
                      letter: "B",
                      name: "Bitcoin",
                      symbol: "BTC",
                      value: 8765.43,
                      change: -1.2,
                    },
                    {
                      letter: "S",
                      name: "Solana",
                      symbol: "SOL",
                      value: 2345.67,
                      change: 7.8,
                    },
                    {
                      letter: "M",
                      name: "Polygon",
                      symbol: "MATIC",
                      value: 987.65,
                      change: 3.5,
                    },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-green-900/20 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs text-green-500">
                          {asset.letter}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{asset.name}</p>
                          <p className="text-xs text-gray-400">{asset.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">${asset.value.toLocaleString()}</p>
                        <p
                          className={`text-xs ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-3 py-1 text-center border border-green-800 text-green-400 rounded-sm text-xs">
                  View All Assets
                </button>
              </div>

              {/* Recent Transactions */}
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Recent Transactions</h3>
                  <button className="text-green-400">
                    <Filter size={12} />
                  </button>
                </div>

                <div className="space-y-3">
                  {transactionData.map((tx, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-green-900/20 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs text-green-500">
                          <RefreshCw size={12} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tx.type}</p>
                          <p className="text-xs text-gray-400">{tx.from} → {tx.to}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm">{tx.amount}</p>
                        <p className="text-xs text-gray-400">{tx.value}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{tx.time}</p>
                        <p className="text-xs text-green-500">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-3 py-1 text-center border border-green-800 text-green-400 rounded-sm text-xs">
                  View All Transactions
                </button>
              </div>
            </div>

            {/* Network Stats */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Network Stats</h3>
                <button className="flex items-center text-xs px-2 py-1 bg-black border border-green-800 rounded">
                  <span>Ethereum</span>
                  <ChevronDown size={12} className="ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-black/40 border border-green-900/40 rounded p-3">
                  <div className="text-xs text-gray-400">Gas Price</div>
                  <div className="text-lg font-bold">{networkStats.gasPrice}</div>
                  <div className="text-xs text-green-500">{networkStats.congestion}</div>
                </div>

                <div className="bg-black/40 border border-green-900/40 rounded p-3">
                  <div className="text-xs text-gray-400">Block Height</div>
                  <div className="text-lg font-bold">{networkStats.blockHeight}</div>
                  <div className="text-xs text-gray-400">{networkStats.blockStatus}</div>
                </div>

                <div className="bg-black/40 border border-green-900/40 rounded p-3">
                  <div className="text-xs text-gray-400">Network Hash Rate</div>
                  <div className="text-lg font-bold">{networkStats.hashRate}</div>
                  <div className="text-xs text-green-500">{networkStats.hashRateChange}</div>
                </div>

                <div className="bg-black/40 border border-green-900/40 rounded p-3">
                  <div className="text-xs text-gray-400">Active Validators</div>
                  <div className="text-lg font-bold">{networkStats.validators}</div>
                  <div className="text-xs text-green-500">{networkStats.validatorsChange}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-4">
            {/* Portfolio Chart */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Performance History</h3>
              </div>

              {/* Using the BlackPortfolioChart component for performance tab too */}
              <BlackPortfolioChart data={portfolioData} kasPrice={kasPrice} />
            </div>

            {/* Comparative table */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <h3 className="text-sm font-medium mb-4">Comparative Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-green-900/40">
                      <th className="text-left py-2 px-3 text-gray-400 font-medium">Period</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Your Portfolio</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Bitcoin (BTC)</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Market Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((period, index) => (
                      <tr key={index} className="border-b border-green-900/20">
                        <td className="py-2 px-3 font-medium">{period.period}</td>
                        <td className={`py-2 px-3 text-right ${period.assetChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {period.assetChange}
                        </td>
                        <td className={`py-2 px-3 text-right ${period.btcChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {period.btcChange}
                        </td>
                        <td className={`py-2 px-3 text-right ${period.marketChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {period.marketChange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <h3 className="text-sm font-medium mb-4">Volatility Analysis</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-gray-300">30-Day Volatility</span>
                      <span className="text-white">High</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-yellow-500" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-gray-300">90-Day Volatility</span>
                      <span className="text-white">Medium</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-gray-300">Price Correlation w/ BTC</span>
                      <span className="text-white">Low</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-green-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-green-900/40 rounded p-4">
                <h3 className="text-sm font-medium mb-4">Key Events</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="min-w-[80px] text-xs text-gray-400">MAR 15, 2025</div>
                    <div>
                      <div className="text-xs font-medium text-white">Network Upgrade v1.5</div>
                      <div className="text-xs text-gray-300">ETH price surged 28% following major protocol upgrade</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px] text-xs text-gray-400">FEB 3, 2025</div>
                    <div>
                      <div className="text-xs font-medium text-white">Major Exchange Listing</div>
                      <div className="text-xs text-gray-300">SOL added to top-tier exchange with 15% price increase</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px] text-xs text-gray-400">JAN 12, 2025</div>
                    <div>
                      <div className="text-xs font-medium text-white">Partnership Announcement</div>
                      <div className="text-xs text-gray-300">MATIC strategic partnership with blockchain infrastructure provider</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-4">
            {/* Asset Distribution Chart */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <h3 className="text-sm font-medium mb-4">Asset Distribution</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Donut Chart */}
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* ETH (45%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      {/* BTC (25%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#047857"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="113.04"
                        transform="rotate(-90 50 50)"
                      />
                      {/* SOL (15%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#34d399"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="175.84"
                        transform="rotate(-90 50 50)"
                      />
                      {/* MATIC (10%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#6ee7b7"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="213.52"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Other (5%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#064e3b"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="238.64"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Center circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="#000"
                      />
                    </svg>

                    {/* Percentage in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-500">45%</div>
                        <div className="text-xs text-white">ETH</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asset List */}
                <div>
                  <div className="mb-3 text-xs text-gray-400">Your asset allocation</div>
                  {assetDistribution.map((asset, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="font-medium">{asset.name}</span>
                        <span>{asset.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${asset.color}`} style={{ width: `${asset.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Token Holdings */}
            <div className="bg-black/40 border border-green-900/40 rounded p-4">
              <h3 className="text-sm font-medium mb-4">Token Holdings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-green-900/40">
                      <th className="text-left py-2 px-3 text-gray-400 font-medium">Token</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Amount</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Value (USD)</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">24h Change</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-900/20">
                      <td className="py-2 px-3 font-medium">ETH</td>
                      <td className="py-2 px-3 text-right">4.2</td>
                      <td className="py-2 px-3 text-right">$12,789.00</td>
                      <td className="py-2 px-3 text-right text-green-500">+2.4%</td>
                      <td className="py-2 px-3 text-right">
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs mr-1">Trade</button>
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs">Transfer</button>
                      </td>
                    </tr>
                    <tr className="border-b border-green-900/20">
                      <td className="py-2 px-3 font-medium">BTC</td>
                      <td className="py-2 px-3 text-right">0.14</td>
                      <td className="py-2 px-3 text-right">$8,761.62</td>
                      <td className="py-2 px-3 text-right text-red-500">-1.2%</td>
                      <td className="py-2 px-3 text-right">
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs mr-1">Trade</button>
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs">Transfer</button>
                      </td>
                    </tr>
                    <tr className="border-b border-green-900/20">
                      <td className="py-2 px-3 font-medium">SOL</td>
                      <td className="py-2 px-3 text-right">25.8</td>
                      <td className="py-2 px-3 text-right">$3,204.36</td>
                      <td className="py-2 px-3 text-right text-green-500">+7.8%</td>
                      <td className="py-2 px-3 text-right">
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs mr-1">Trade</button>
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs">Transfer</button>
                      </td>
                    </tr>
                    <tr className="border-b border-green-900/20">
                      <td className="py-2 px-3 font-medium">MATIC</td>
                      <td className="py-2 px-3 text-right">1,200</td>
                      <td className="py-2 px-3 text-right">$900.00</td>
                      <td className="py-2 px-3 text-right text-green-500">+3.5%</td>
                      <td className="py-2 px-3 text-right">
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs mr-1">Trade</button>
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs">Transfer</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">USDC</td>
                      <td className="py-2 px-3 text-right">1,250</td>
                      <td className="py-2 px-3 text-right">$1,250.00</td>
                      <td className="py-2 px-3 text-right text-gray-400">0.0%</td>
                      <td className="py-2 px-3 text-right">
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs mr-1">Trade</button>
                        <button className="px-2 py-0.5 bg-green-900/40 text-green-400 rounded text-xs">Transfer</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Portal animation styles */}
      <style jsx="true">{`
        @keyframes pulse {
          0% { opacity: var(--base-opacity); }
          50% { opacity: calc(var(--base-opacity) * 1.5); }
          100% { opacity: var(--base-opacity); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PortalAnalyticsDashboard;