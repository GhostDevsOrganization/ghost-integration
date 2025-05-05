import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronsUp,
  ChevronsDown
} from 'lucide-react';
import BlackPortfolioChart from './BlackPortfolioChart';
import { useTheme } from '../context/ThemeContext';
import KasportalLogo from './KasportalLogo';

const AnalyticsPanel = ({
  walletData,
  onClose,
  mini = false
}) => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState([]);
  const [kasPrice, setKasPrice] = useState(0.068);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);

  // Generate sample data for demonstration
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const data = generateSampleData();
      setPortfolioData(data);

      // Calculate total value and change
      if (data && data.length > 0) {
        const lastEntry = data[data.length - 1];
        setPortfolioValue(lastEntry.value * kasPrice);

        const firstEntry = data[0];
        const percentChange = ((lastEntry.value - firstEntry.value) / firstEntry.value) * 100;
        setPortfolioChange(percentChange);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateSampleData = () => {
    const data = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    let currentValue = 21500;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const change = currentValue * (Math.random() * 0.08 - 0.03);
      currentValue += change;

      if (currentValue < 100) currentValue = 100;

      data.push({
        date: currentDate.toISOString(),
        value: currentValue,
        usdValue: currentValue * kasPrice
      });

      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate;
    }

    return data;
  };

  // Quick stats to display
  const quickStats = [
    {
      label: "Total KAS",
      value: portfolioData.length > 0 ? portfolioData[portfolioData.length - 1].value.toFixed(2) : "0",
      icon: <BarChart3 size={16} />,
      change: "+5.2%",
      changeUp: true
    },
    {
      label: "Portfolio Value",
      value: `$${portfolioValue.toFixed(2)}`,
      icon: <RefreshCw size={16} />,
      change: `${portfolioChange >= 0 ? '+' : ''}${portfolioChange.toFixed(2)}%`,
      changeUp: portfolioChange >= 0
    }
  ];

  if (loading) {
    return (
      <div className="p-4 rounded-lg border transition-colors duration-300 flex flex-col items-center justify-center min-h-[200px]"
        style={{ backgroundColor: 'var(--ks-surface)', borderColor: 'var(--ks-border)', color: 'var(--ks-text-primary)' }}>
        <div className="animate-pulse flex flex-col items-center">
          <BarChart3 className="mb-2" style={{ color: 'var(--ks-primary)' }} />
          <p style={{ color: 'var(--ks-secondary)' }}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border transition-colors duration-300"
      style={{ backgroundColor: 'var(--ks-surface)', borderColor: 'var(--ks-border)', color: 'var(--ks-text-primary)' }}>
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b transition-colors duration-300"
        style={{ borderColor: 'var(--ks-border)' }}>
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ks-primary)', opacity: 0.2 }}>
            <BarChart3 size={12} style={{ color: 'var(--ks-primary)' }} />
          </div>
          <span className="font-semibold" style={{ color: 'var(--ks-primary)' }}>PORTFOLIO ANALYTICS</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded text-xs hover:opacity-80 transition-colors"
            style={{ backgroundColor: 'var(--ks-primary)', color: 'white' }}
          >
            Close
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="p-3 rounded border transition-colors duration-300"
              style={{ borderColor: 'var(--ks-border)', backgroundColor: 'rgba(106, 66, 244, 0.03)' }}>
              <div className="flex items-center mb-1">
                <div className="mr-2" style={{ color: 'var(--ks-secondary)' }}>{stat.icon}</div>
                <span className="text-xs" style={{ color: 'var(--ks-text-secondary)' }}>{stat.label}</span>
              </div>
              <div className="text-lg font-bold" style={{ color: 'var(--ks-text-primary)' }}>{stat.value}</div>
              <div className="flex items-center text-xs"
                style={{ color: stat.changeUp ? 'rgb(52, 211, 153)' : 'rgb(239, 68, 68)' }}>
                {stat.changeUp ? <ChevronsUp size={12} /> : <ChevronsDown size={12} />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--ks-text-primary)' }}>Portfolio Performance</h3>
          <BlackPortfolioChart data={portfolioData} kasPrice={kasPrice} mini={mini} />
        </div>

        {/* Asset Breakdown */}
        {!mini && (
          <div>
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--ks-text-primary)' }}>Asset Breakdown</h3>
            <div className="space-y-2">
              {[
                { name: "KAS", amount: "21,563.42", value: "$1,466.31", percent: "58%", color: "rgba(106, 66, 244, 1)" },
                { name: "ETH", amount: "0.42", value: "$842.00", percent: "30%", color: "rgba(75, 180, 222, 1)" },
                { name: "USDC", amount: "350.00", value: "$350.00", percent: "12%", color: "rgba(114, 95, 218, 1)" }
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0 transition-colors duration-300"
                  style={{ borderColor: 'var(--ks-border)', opacity: 0.85 }}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                    <span style={{ color: 'var(--ks-text-primary)' }}>{asset.name}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ks-text-secondary)' }}>{asset.amount}</div>
                  <div className="text-xs" style={{ color: 'var(--ks-text-secondary)' }}>{asset.value}</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--ks-text-primary)' }}>{asset.percent}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t text-xs transition-colors duration-300 flex justify-between items-center"
        style={{ borderColor: 'var(--ks-border)', color: 'var(--ks-text-secondary)' }}>
        <div className="flex items-center">
          <KasportalLogo size="small" withText={false} className="mr-2" />
          <span>Powered by KasPortal Analytics</span>
        </div>
        <button className="underline hover:no-underline" style={{ color: 'var(--ks-primary)' }}>
          View Full Dashboard
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
