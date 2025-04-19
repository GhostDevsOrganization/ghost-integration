// src/components/SwapComponent.jsx
import React, { useState, useEffect } from 'react';
import ChangeNowWidget from './ChangeNowWidget';
import { TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';

const SwapComponent = ({ onClose }) => {
  const [selectedPair, setSelectedPair] = useState({ from: 'btc', to: 'eth' });
  const [prices, setPrices] = useState({ btc: 0, eth: 0, sol: 0, kas: 0 });
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [priceError, setPriceError] = useState(null);

  const popularPairs = [
    { from: 'eth', to: 'kas', label: 'ETH → KAS' },
    { from: 'btc', to: 'kas', label: 'BTC → KAS' },
    { from: 'usdc', to: 'kas', label: 'USDC → KAS' },
    { from: 'btc', to: 'eth', label: 'BTC → ETH' },
  ];

  const marketStats = [
    { coin: 'BTC', change: 2.4 },
    { coin: 'ETH', change: -0.8 },
    { coin: 'KAS', change: 1.2 },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchPrices = async () => {
      setLoadingPrices(true);
      setPriceError(null);

      try {
        const url =
          'https://api.coingecko.com/api/v3/simple/price'
          + '?ids=bitcoin,ethereum,solana,kaspa'
          + '&vs_currencies=usd';
        const res = await fetch(url);
        if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);

        const data = await res.json();
        if (!isMounted) return;

        setPrices(prev => ({
          btc:  data.bitcoin?.usd  ?? prev.btc,
          eth:  data.ethereum?.usd ?? prev.eth,
          sol:  data.solana?.usd   ?? prev.sol,
          kas:  data.kaspa?.usd    ?? prev.kas,
        }));
      } catch (err) {
        if (!isMounted) return;
        setPriceError(err.message);
      } finally {
        if (isMounted) setLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const formatPrice = price => {
    if (typeof price !== 'number' || isNaN(price)) return '$0.00';
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits:0 })}`;
    if (price >= 1)    return `$${price.toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits:4, maximumFractionDigits:6 })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto touch-pan-y">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-green-500 opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 overflow-y-auto touch-pan-y">
        <div className="w-full flex justify-end p-4">
          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-green-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
            aria-label="Close swap"
          >
            ×
          </button>
        </div>

        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">
            Swap your crypto instantly
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm mb-6 min-h-[20px]">
            {loadingPrices ? (
              <div className="text-gray-500">Loading prices...</div>
            ) : priceError ? (
              <div className="text-red-500">Error: {priceError}</div>
            ) : (
              <>
                <div>BTC: {formatPrice(prices.btc)}</div>
                <div>ETH: {formatPrice(prices.eth)}</div>
                <div>SOL: {formatPrice(prices.sol)}</div>
                <div>KAS: {formatPrice(prices.kas)}</div>
              </>
            )}
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-gray-500 text-sm">Popular pairs:</span>
            {popularPairs.map(pair => {
              const active = selectedPair.from === pair.from && selectedPair.to === pair.to;
              return (
                <button
                  key={`${pair.from}-${pair.to}`}
                  onClick={() => setSelectedPair(pair)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    active
                      ? 'bg-green-500 text-white ring-2 ring-green-500'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-green-500'
                  }`}
                >
                  {pair.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {marketStats.map(stat => (
              <div
                key={stat.coin}
                className={`flex items-center ${
                  stat.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                {stat.coin} {stat.change >= 0 ? `+${stat.change}%` : `${stat.change}%`}
              </div>
            ))}
            <div className="flex items-center text-gray-400">
              <Clock size={16} className="mr-1" />
              Est. time: 10–30 min
            </div>
          </div>
        </div>

        <div className="px-4 flex-1 flex items-center justify-center mb-6">
          <div className="w-full max-w-4xl relative">
            <ChangeNowWidget
              from={selectedPair.from}
              to={selectedPair.to}
              amount="0.1"
              darkMode
              horizontal
              lang="en-US"
              backgroundColor="000000"
              primaryColor="22C55E"
              height="600px"
              width="100%"
            />
            <button className="absolute top-2 right-2 text-green-500 hover:text-green-400">
              <Info size={18} />
            </button>
          </div>
        </div>

        <div className="w-full p-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-green-500">Help</a>
          <a href="#" className="hover:text-green-500">Terms</a>
          <a href="#" className="hover:text-green-500">Privacy</a>
        </div>
      </div>
    </div>
  );
};

export default SwapComponent;
