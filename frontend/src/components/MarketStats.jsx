import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketStats = () => {
    const stats = {
        price: 0.042,
        change24h: 2.5,
        marketCap: '42M',
        volume24h: '3.8M',
        blockHeight: 1235467,
        hashrate: '2.3 PH/s',
    };

    return (
        <div className="bg-black/30 border border-green-800/50 rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-green-300 mb-4">Market Stats</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-green-400">KAS Price</p>
                    <div className="flex items-center">
                        <p className="text-xl font-bold text-white">${stats.price}</p>
                        <div className={`flex items-center ml-2 ${stats.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stats.change24h >= 0 ?
                                <TrendingUp size={16} className="mr-1" /> :
                                <TrendingDown size={16} className="mr-1" />
                            }
                            <span className="text-sm">{stats.change24h}%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-green-400">Market Cap</p>
                    <p className="text-xl font-bold text-white">${stats.marketCap}</p>
                </div>

                <div>
                    <p className="text-sm text-green-400">24h Volume</p>
                    <p className="text-xl font-bold text-white">${stats.volume24h}</p>
                </div>

                <div>
                    <p className="text-sm text-green-400">Block Height</p>
                    <p className="text-xl font-bold text-white">{stats.blockHeight.toLocaleString()}</p>
                </div>

                <div>
                    <p className="text-sm text-green-400">Network Hashrate</p>
                    <p className="text-xl font-bold text-white">{stats.hashrate}</p>
                </div>
            </div>
        </div>
    );
};

export default MarketStats;
