import React, { useState, useEffect } from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight, Zap, PiggyBank, TrendingUp } from 'lucide-react';

const AnalyticsPanel = ({ kasPrice = 0.062, portfolioData, assetDistribution }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Use provided data or defaults (removed default data)
  const chartData = portfolioData || [];
  const distributionData = assetDistribution || [];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate portfolio metrics
  const currentValue = chartData.length > 0 ? chartData[chartData.length - 1]?.value || 0 : 0;
  const previousValue = chartData.length > 1 ? chartData[chartData.length - 2]?.value || 0 : 0;
  const changePercent = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isPositive = changePercent >= 0;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BarChart3 size={32} className="text-green-500 mb-4" />
          <span className="text-green-400">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-white">
      {/* Header with title */}
      <div className="pb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Portfolio Analytics</span>
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto mb-4"></div>
      </div>

      {/* Tabs navigation */}
      <div className="flex justify-center border-b border-green-500/20 mb-6">
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
          Performance
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === 'assets' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('assets')}
        >
          Assets
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Total Value</div>
                  <div className="text-2xl font-bold">${(currentValue / 100).toFixed(2)}</div>
                  <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                    {changePercent.toFixed(2)}% {isPositive ? 'increase' : 'decrease'}
                  </div>
                </div>
                <div className="h-20 w-32 relative">
                  {/* Mini chart - stylized trend line (using placeholder) */}
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                      </linearGradient>
                    </defs>
                    {/* Placeholder trend line */}
                    <path
                      d="M0,35 L20,30 L40,32 L60,25 L80,15 L100,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,35 L20,30 L40,32 L60,25 L80,15 L100,10 L100,40 L0,40 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Current KAS</span>
                    <Zap size={16} className="text-green-400" />
                  </div>
                  {/* Display actual KAS balance if available, otherwise placeholder */}
                  <div className="mt-1 font-medium">{portfolioData && portfolioData.length > 0 ? (portfolioData[portfolioData.length - 1].kasBalance / 100000000).toFixed(0) : 'N/A'}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">KAS Price</span>
                    <TrendingUp size={16} className="text-green-400" />
                  </div>
                  <div className="mt-1 font-medium">${kasPrice.toFixed(4)}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">24h Change</span>
                    {/* Placeholder for 24h change */}
                    <span className={`text-sm text-gray-400`}>N/A</span>
                  </div>
                  {/* Display actual KAS value if available, otherwise placeholder */}
                  <div className="mt-1 font-medium">{portfolioData && portfolioData.length > 0 ? '$' + ((portfolioData[portfolioData.length - 1].kasBalance / 100000000) * kasPrice).toFixed(2) : 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Performance</h3>
                  <PiggyBank size={20} className="text-green-400" />
                </div>
                {/* Removed simulated performance data */}
                <div className="text-center text-gray-400 text-sm">
                  Performance data not available.
                </div>
              </div>

              <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                <h3 className="font-medium mb-4">Asset Allocation</h3>
                <div className="space-y-3">
                  {/* Use actual distribution data if available, otherwise show placeholder */}
                  {distributionData.length > 0 ? (
                    distributionData.slice(0, 3).map((asset, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{asset.name}</span>
                          <span>{asset.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${asset.color}`} style={{ width: `${asset.percentage}%` }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-sm">
                      Asset distribution data not available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Portfolio Chart */}
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Performance History</h2>
                <div className="flex space-x-2">
                  <button className="bg-green-500/10 text-green-400 px-3 py-1 rounded text-sm">1M</button>
                  <button className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">6M</button>
                  <button className="bg-green-500/10 text-green-400 px-3 py-1 rounded text-sm">1Y</button>
                </div>
              </div>

              {/* Chart area (using placeholder if no data) */}
              <div className="h-64 relative">
                {chartData.length > 1 ? (
                  <div className="absolute inset-0">
                    {/* Horizontal grid lines */}
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="absolute w-full h-px bg-green-500/10" style={{ top: `${i * 25}%` }}></div>
                    ))}

                    {/* Chart visualization */}
                    <svg className="w-full h-full">
                      <defs>
                        <linearGradient id="chartFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                          <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                        </linearGradient>
                      </defs>

                      {/* Line chart path (using actual data) */}
                      <path
                        d={`M0,${240 - (chartData[0].value / 20000 * 224)} ` + chartData.slice(1).map((point, i) => {
                          const x = (i + 1) * (600 / (chartData.length - 1));
                          const y = 240 - (point.value / 20000 * 224);
                          return `L${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />

                      {/* Area fill (using actual data) */}
                      <path
                        d={`M0,${240 - (chartData[0].value / 20000 * 224)} ` + chartData.slice(1).map((point, i) => {
                          const x = (i + 1) * (600 / (chartData.length - 1));
                          const y = 240 - (point.value / 20000 * 224);
                          return `L${x},${y}`;
                        }).join(' ') + ` L600,240 L0,240 Z`}
                        fill="url(#chartFillGradient)"
                      />

                      {/* Data points */}
                      {chartData.map((point, i) => {
                        const x = i * (600 / (chartData.length - 1));
                        const y = 240 - (point.value / 20000 * 224);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#10b981"
                            stroke="#000"
                            strokeWidth="2"
                          />
                        );
                      })}
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                      {chartData.map((point, i) => (
                        <span key={i}>{point.date}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    Not enough data to display chart.
                  </div>
                )}
              </div>
            </div>

            {/* Removed Comparative table */}
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            {/* Asset Distribution */}
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Asset Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pie Chart (using actual data if available) */}
                <div className="flex items-center justify-center">
                  {distributionData.length > 0 ? (
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Calculate strokeDashoffset based on actual percentages */}
                        {distributionData.map((asset, index, arr) => {
                          const circumference = 2 * Math.PI * 40;
                          const strokeDasharray = circumference;
                          const percentage = asset.percentage;
                          const strokeDashoffset = circumference - (percentage / 100) * circumference;
                          const cumulativePercentage = arr.slice(0, index).reduce((sum, current) => sum + current.percentage, 0);
                          const rotateAngle = (cumulativePercentage / 100) * 360 - 90; // Start from top (-90 deg)

                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke={asset.color.replace('bg-', '#').replace('-500', '').replace('-400', '').replace('-300', '').replace('-200', '').replace('-100', '')} // Simple color conversion
                              strokeWidth="20"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              transform={`rotate(${rotateAngle} 50 50)`}
                            />
                          );
                        })}
                        {/* Center circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="30"
                          fill="#000"
                        />
                      </svg>

                      {/* Percentage in center (displaying the largest slice's percentage) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {distributionData.length > 0 ? distributionData[0].percentage : 'N/A'}%
                          </div>
                          <div className="text-sm text-white">
                            {distributionData.length > 0 ? distributionData[0].name : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-48 h-48 flex items-center justify-center text-gray-400 text-sm">
                      No distribution data.
                    </div>
                  )}
                </div>

                {/* Asset List */}
                <div>
                  <div className="mb-4 text-sm text-gray-400">Your asset allocation</div>
                  {distributionData.length > 0 ? (
                    distributionData.map((asset, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{asset.name}</span>
                          <span>{asset.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${asset.color}`} style={{ width: `${asset.percentage}%` }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-sm">
                      Asset distribution data not available.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Token Holdings (using placeholder data) */}
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Token Holdings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-500/20">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Token</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Value (USD)</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Placeholder rows */}
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-400" colSpan="4">
                        Token holding data not available.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export buttons */}
      <div className="mt-6 flex justify-center space-x-4 pb-4">
        <button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-4 py-2 rounded text-sm">
          Export Data as CSV
        </button>
        <button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-4 py-2 rounded text-sm">
          Generate PDF Report
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
