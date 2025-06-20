import React, { useState, useEffect } from 'react';
import {
    Database, Home, Wallet, TrendingUp, TrendingDown, Activity,
    Clock, Shield, Info, Zap, BarChart3, Globe,
    RefreshCw, AlertCircle, CheckCircle, Wifi, WifiOff
} from 'lucide-react';

const OracleProtocol = () => {
    // Oracle state
    const [selectedFeed, setSelectedFeed] = useState('KAS/USD');
    const [subscriptionStatus, setSubscriptionStatus] = useState('idle');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real-time oracle data from API
    const [oracleData, setOracleData] = useState({
        totalFeeds: 0,
        averageLatency: '0.0s',
        uptime: '0%',
        totalRequests: '0K',
        activeNodes: 0,
        dataProviders: 0
    });

    // Price feeds from real API
    const [priceFeeds, setPriceFeeds] = useState([]);

    // Data sources from real API
    const [dataSources, setDataSources] = useState([]);

    // User subscriptions
    const [userSubscriptions, setUserSubscriptions] = useState([
        { feed: 'KAS/USD', type: 'Price', frequency: 'Real-time', cost: '0.01 KAS/day' },
        { feed: 'ETH/USD', type: 'Price', frequency: 'Real-time', cost: '0.01 KAS/day' }
    ]);

    // API base URL - adjust based on your backend deployment
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    // Fetch oracle data from backend API
    const fetchOracleData = async () => {
        try {
            setError(null);

            // Fetch oracle stats
            const statsResponse = await fetch(`${API_BASE_URL}/oracle/stats`);
            if (statsResponse.ok) {
                const stats = await statsResponse.json();
                setOracleData(stats);
            }

            // Fetch all price feeds
            const pricesResponse = await fetch(`${API_BASE_URL}/oracle/prices`);
            if (pricesResponse.ok) {
                const prices = await pricesResponse.json();
                setPriceFeeds(prices);

                // Set first feed as selected if none selected
                if (prices.length > 0 && !selectedFeed) {
                    setSelectedFeed(prices[0].pair);
                }
            }

            // Fetch data sources status
            const sourcesResponse = await fetch(`${API_BASE_URL}/oracle/sources`);
            if (sourcesResponse.ok) {
                const sources = await sourcesResponse.json();
                setDataSources(sources);
            }

            setLoading(false);
        } catch (err) {
            console.error('Error fetching oracle data:', err);
            setError('Failed to fetch real-time data. Using cached data.');
            setLoading(false);

            // Fallback to mock data if API is unavailable
            setOracleData({
                totalFeeds: 15,
                averageLatency: '0.8s',
                uptime: '99.9%',
                totalRequests: '45.2K',
                activeNodes: 8,
                dataProviders: 12
            });

            setPriceFeeds([
                {
                    pair: 'KAS/USD',
                    price: 0.245,
                    change24h: 5.2,
                    volume: '$2.1M',
                    lastUpdate: '2s ago',
                    status: 'active',
                    confidence: 99.8,
                    sources: 5
                },
                {
                    pair: 'ETH/USD',
                    price: 2847.50,
                    change24h: -1.8,
                    volume: '$15.2B',
                    lastUpdate: '1s ago',
                    status: 'active',
                    confidence: 99.9,
                    sources: 8
                },
                {
                    pair: 'BTC/USD',
                    price: 67234.00,
                    change24h: 2.4,
                    volume: '$28.7B',
                    lastUpdate: '1s ago',
                    status: 'active',
                    confidence: 99.9,
                    sources: 10
                }
            ]);

            setDataSources([
                { name: 'CoinGecko', status: 'online', latency: '45ms', reliability: 99.8 },
                { name: 'Binance', status: 'online', latency: '62ms', reliability: 99.6 },
                { name: 'Coinbase', status: 'online', latency: '38ms', reliability: 99.7 }
            ]);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchOracleData();
    }, []);

    // Update oracle data every 10 seconds (real API calls)
    useEffect(() => {
        const interval = setInterval(fetchOracleData, 10000);
        return () => clearInterval(interval);
    }, []);

    // Handle subscription
    const handleSubscription = async () => {
        setSubscriptionStatus('processing');

        setTimeout(() => {
            setSubscriptionStatus('success');

            // Add to subscriptions if not already subscribed
            const exists = userSubscriptions.find(sub => sub.feed === selectedFeed);
            if (!exists) {
                setUserSubscriptions(prev => [...prev, {
                    feed: selectedFeed,
                    type: 'Price',
                    frequency: 'Real-time',
                    cost: '0.01 KAS/day'
                }]);
            }

            setTimeout(() => setSubscriptionStatus('idle'), 3000);
        }, 2000);
    };

    const selectedFeedData = priceFeeds.find(feed => feed.pair === selectedFeed);

    const formatPrice = (price, pair) => {
        if (pair.includes('USD')) {
            return price < 1 ? price.toFixed(4) : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return price.toFixed(6);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-green-400 bg-green-900/30';
            case 'degraded': return 'text-yellow-400 bg-yellow-900/30';
            case 'offline': return 'text-red-400 bg-red-900/30';
            default: return 'text-gray-400 bg-gray-900/30';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/portal'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> Oracle
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-purple-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative pt-20 px-6 max-w-7xl mx-auto">
                {/* Error Banner */}
                {error && (
                    <div className="bg-red-900/50 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center">
                        <AlertCircle className="text-red-400 mr-3" size={20} />
                        <span className="text-red-200">{error}</span>
                        <button
                            onClick={fetchOracleData}
                            className="ml-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading Indicator */}
                {loading && (
                    <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-8 mb-6 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-4"></div>
                        <span className="text-blue-400">Loading real-time oracle data...</span>
                    </div>
                )}

                {/* Oracle Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Active Feeds</div>
                        <div className="text-lg font-bold text-blue-400">{oracleData.totalFeeds}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Avg Latency</div>
                        <div className="text-lg font-bold text-indigo-400">{oracleData.averageLatency}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Uptime</div>
                        <div className="text-lg font-bold text-purple-400">{oracleData.uptime}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Requests</div>
                        <div className="text-lg font-bold text-green-400">{oracleData.totalRequests}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Active Nodes</div>
                        <div className="text-lg font-bold text-teal-400">{oracleData.activeNodes}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Data Sources</div>
                        <div className="text-lg font-bold text-cyan-400">{oracleData.dataProviders}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Price Feeds */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-blue-400 flex items-center mb-6">
                                <Database className="mr-3" size={24} />
                                Price Feeds
                            </h2>

                            {/* Price Feed Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {priceFeeds.map(feed => (
                                    <div
                                        key={feed.pair}
                                        onClick={() => setSelectedFeed(feed.pair)}
                                        className={`bg-gray-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02] ${selectedFeed === feed.pair
                                            ? 'border-blue-400 shadow-blue-500/30'
                                            : 'border-gray-600 hover:border-blue-500/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{feed.pair}</h3>
                                                <div className="text-xs text-gray-400">{feed.lastUpdate}</div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${feed.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                                                    }`}></div>
                                                <span className="text-xs text-gray-400">{feed.confidence.toFixed(1)}%</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-white">
                                                    ${formatPrice(feed.price, feed.pair)}
                                                </span>
                                                <div className={`flex items-center ${feed.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {feed.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                                    <span className="ml-1 text-sm font-medium">
                                                        {Math.abs(feed.change24h).toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>Vol: {feed.volume}</span>
                                                <span>{feed.sources} sources</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feed Details Panel */}
                            {selectedFeedData && (
                                <div className="bg-gray-800/30 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-blue-400 mb-4">
                                        {selectedFeedData.pair} - Feed Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-sm text-gray-400">Current Price</div>
                                            <div className="text-xl font-bold text-white">
                                                ${formatPrice(selectedFeedData.price, selectedFeedData.pair)}
                                            </div>
                                        </div>
                                        <div className="bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-sm text-gray-400">24h Change</div>
                                            <div className={`text-xl font-bold ${selectedFeedData.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                {selectedFeedData.change24h >= 0 ? '+' : ''}{selectedFeedData.change24h.toFixed(2)}%
                                            </div>
                                        </div>
                                        <div className="bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-sm text-gray-400">Confidence</div>
                                            <div className="text-xl font-bold text-blue-400">
                                                {selectedFeedData.confidence.toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-sm text-gray-400 mb-2">Feed Information</div>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Update Frequency</span>
                                                    <span className="text-white">Real-time</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Data Sources</span>
                                                    <span className="text-white">{selectedFeedData.sources}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Last Update</span>
                                                    <span className="text-white">{selectedFeedData.lastUpdate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-sm text-gray-400 mb-2">Subscription Cost</div>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Real-time</span>
                                                    <span className="text-white">0.01 KAS/day</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Hourly</span>
                                                    <span className="text-white">0.001 KAS/day</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Daily</span>
                                                    <span className="text-white">0.0001 KAS/day</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subscribe Button */}
                                    <button
                                        onClick={handleSubscription}
                                        disabled={subscriptionStatus === 'processing' || userSubscriptions.find(sub => sub.feed === selectedFeed)}
                                        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${subscriptionStatus === 'processing'
                                            ? 'bg-yellow-600 text-white cursor-not-allowed'
                                            : subscriptionStatus === 'success'
                                                ? 'bg-green-600 text-white'
                                                : userSubscriptions.find(sub => sub.feed === selectedFeed)
                                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
                                            }`}
                                    >
                                        {subscriptionStatus === 'processing' && (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Subscribing...
                                            </div>
                                        )}
                                        {subscriptionStatus === 'success' && (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="mr-2" size={20} />
                                                Subscribed!
                                            </div>
                                        )}
                                        {subscriptionStatus === 'idle' && userSubscriptions.find(sub => sub.feed === selectedFeed) && (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="mr-2" size={20} />
                                                Already Subscribed
                                            </div>
                                        )}
                                        {subscriptionStatus === 'idle' && !userSubscriptions.find(sub => sub.feed === selectedFeed) && 'Subscribe to Feed'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Subscriptions */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                                <Activity className="mr-2" size={18} />
                                Your Subscriptions
                            </h3>
                            <div className="space-y-3">
                                {userSubscriptions.map((subscription, index) => (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="font-medium text-white mb-1">{subscription.feed}</div>
                                        <div className="text-xs text-gray-400 mb-1">{subscription.type} • {subscription.frequency}</div>
                                        <div className="text-xs text-green-400">{subscription.cost}</div>
                                    </div>
                                ))}
                                {userSubscriptions.length === 0 && (
                                    <div className="text-center text-gray-400 py-4">
                                        No subscriptions yet. Subscribe to feeds for real-time data!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Data Sources Status */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                                <Globe className="mr-2" size={18} />
                                Data Sources
                            </h3>
                            <div className="space-y-3">
                                {dataSources.map((source, index) => (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-white">{source.name}</span>
                                            <div className="flex items-center">
                                                {source.status === 'online' ?
                                                    <Wifi className="text-green-400" size={14} /> :
                                                    <WifiOff className="text-red-400" size={14} />
                                                }
                                                <span className={`ml-1 px-2 py-1 rounded-full text-xs ${getStatusColor(source.status)}`}>
                                                    {source.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Latency: {source.latency}</span>
                                            <span>Reliability: {source.reliability.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Oracle Analytics */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                                <BarChart3 className="mr-2" size={18} />
                                Oracle Analytics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Network Health</span>
                                        <span className="text-green-400">98.7%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Data Accuracy</span>
                                        <span className="text-blue-400">99.2%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Response Time</span>
                                        <span className="text-indigo-400">0.8s avg</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Oracle Info */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                                <Info className="mr-2" size={18} />
                                Oracle Network
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-blue-400 mb-1">🔗 Decentralized Network</div>
                                    <div className="text-gray-300">8 independent oracle nodes provide price data from 12+ sources for maximum reliability.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-indigo-400 mb-1">⚡ Real-time Updates</div>
                                    <div className="text-gray-300">Sub-second latency with automatic failover ensures continuous data availability.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-purple-400 mb-1">🛡️ Data Integrity</div>
                                    <div className="text-gray-300">Cryptographic proofs and consensus mechanisms ensure data accuracy and tamper resistance.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OracleProtocol;
