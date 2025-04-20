import React from 'react';

const PortfolioOverview = ({ walletData }) => {
    return (
        <div className="bg-black/30 border border-green-800/50 rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-green-300 mb-4">Portfolio Overview</h2>
            <div className="space-y-4">
                <div className="text-white">
                    <p className="text-sm text-green-400">Total Balance</p>
                    <p className="text-2xl font-bold">
                        {walletData ? `${(walletData.total / 100000000).toFixed(4)} KAS` : "50.0000 KAS (Demo)"}
                    </p>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-green-400 mb-2">Asset Allocation</p>
                    <div className="bg-black/50 rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                            <span className="text-white">KAS</span>
                            <span className="text-green-300">100%</span>
                        </div>
                        <div className="w-full bg-green-900/30 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioOverview;
