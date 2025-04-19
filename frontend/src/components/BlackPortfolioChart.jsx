import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


// Format date for display
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const BlackPortfolioChart = ({ data, kasPrice }) => {
  const [showUsd, setShowUsd] = useState(false);
  const [showDots, setShowDots] = useState(true);

  // Use live KAS/USD rate, fallback to 0.042 if not provided
  const kasToUsdRate = typeof kasPrice === 'number' ? kasPrice : 0.042;

  // Format y-axis ticks
  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;
    }
    return value;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const displayValue = showUsd ? dataPoint.usdValue : dataPoint.value;
      const currency = showUsd ? 'USD' : 'KAS';

      return (
        <div className="bg-black p-3 rounded border border-green-700 shadow-lg">
          <p className="text-green-300 text-sm font-medium">{formatDate(dataPoint.date)}</p>
          <p className="text-green-100 font-bold">
            {displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currency}
          </p>
          {!showUsd && (
            <p className="text-green-400 text-sm">
              ${(dataPoint.value * kasToUsdRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
            </p>
          )}
          {showUsd && (
            <p className="text-green-400 text-sm">
              {(dataPoint.usdValue / kasToUsdRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} KAS
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-black rounded-lg p-4 shadow-xl border border-green-900 text-green-300 text-center">
        No portfolio data available.
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg p-4 shadow-xl border border-green-900">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-green-100">Portfolio Value Over Time</h2>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 text-green-300">
            <input
              type="checkbox"
              checked={showDots}
              onChange={() => setShowDots(!showDots)}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            <span className="text-sm">Show Points</span>
          </label>
          <button
            className={`px-3 py-1 rounded text-sm font-medium ${showUsd ? 'bg-green-700 text-white' : 'bg-green-900/40 text-green-300'}`}
            onClick={() => setShowUsd(!showUsd)}
          >
            {showUsd ? 'Show KAS' : 'Show USD'}
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="1 3"
              stroke="#1f4532"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: '#10b981', fontSize: 10 }}
              axisLine={{ stroke: '#1f4532' }}
              tickLine={{ stroke: '#1f4532' }}
              minTickGap={30}
            />
            <YAxis
              tick={{ fill: '#10b981', fontSize: 10 }}
              axisLine={{ stroke: '#1f4532' }}
              tickLine={{ stroke: '#1f4532' }}
              tickFormatter={formatYAxis}
              domain={['dataMin', 'dataMax']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={showUsd ? "usdValue" : "value"}
              name={showUsd ? "USD Value" : "KAS Value"}
              stroke="#10b981"
              strokeWidth={2}
              dot={showDots ? { fill: '#10b981', r: 4, strokeWidth: 1 } : false}
              activeDot={{ fill: '#d1fae5', stroke: '#10b981', strokeWidth: 2, r: 6 }}
            />
            <ReferenceLine y={0} stroke="#10b981" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-900/20 rounded p-3 border border-green-800">
          <p className="text-green-300 text-xs">Current Value</p>
          <p className="text-white font-bold">
            {showUsd
              ? `$${data[data.length - 1].usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              : `${data[data.length - 1].value.toLocaleString(undefined, { maximumFractionDigits: 4 })} KAS`
            }
          </p>
        </div>
        <div className="bg-green-900/20 rounded p-3 border border-green-800">
          <p className="text-green-300 text-xs">KAS/USD Rate</p>
          <p className="text-white font-bold">1 KAS = ${kasToUsdRate.toFixed(3)}</p>
        </div>
        <div className="bg-green-900/20 rounded p-3 border border-green-800">
          <p className="text-green-300 text-xs">Peak Value</p>
          <p className="text-white font-bold">
            {showUsd
              ? `$${Math.max(...data.map(d => d.usdValue)).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              : `${Math.max(...data.map(d => d.value)).toLocaleString(undefined, { maximumFractionDigits: 4 })} KAS`
            }
          </p>
        </div>
      </div>

      {/* Time increments for x-axis labels */}
      <div className="mt-2 flex justify-between text-green-400 text-xs overflow-hidden">
        <span>{data.length > 0 ? formatDate(data[0].date).split(',')[0] : ''}</span>
        <span>{data.length > 1 ? formatDate(data[Math.floor(data.length / 2)].date).split(',')[0] : ''}</span>
        <span>{data.length > 0 ? formatDate(data[data.length - 1].date).split(',')[0] : ''}</span>
      </div>
    </div>
  );
};

export default BlackPortfolioChart;
