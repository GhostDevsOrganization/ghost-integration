// src/components/SwapComponent.jsx
import React, { useState, useEffect } from 'react';
import ChangeNowWidget from './ChangeNowWidget';
import { TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';

const SwapComponent = ({ onClose }) => {
  const [selectedPair, setSelectedPair] = useState({ from: 'btc', to: 'eth' });
  const [prices, setPrices] = useState({ btc: 0, eth: 0, sol: 0, kas: 0 });
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [priceError, setPriceError] = useState(null);
  const [activeStep, setActiveStep] = useState(4); // Set to Exchange Processed step by default

  const steps = [
    {
      title: "Initiate Swap",
      description: "Select the cryptocurrencies you want to swap and specify the amount. The system will calculate the estimated amount you'll receive based on current exchange rates."
    },
    {
      title: "Provide Address",
      description: "Enter your destination wallet address where you want to receive the swapped tokens. Make sure this address is compatible with the cryptocurrency you're receiving."
    },
    {
      title: "Receive Deposit Address",
      description: "The system generates a unique deposit address for your source cryptocurrency. This address is specifically tied to your transaction and destination address."
    },
    {
      title: "Send Funds",
      description: "Transfer the exact amount of your source cryptocurrency to the provided deposit address. You can use the QR code for easy wallet scanning."
    },
    {
      title: "Exchange Processed",
      description: "The swapping service automatically exchanges your funds at the current market rate. This process typically takes 10-30 minutes depending on network confirmations."
    },
    {
      title: "Receive Tokens",
      description: "Once the exchange is complete, the swapped tokens are sent directly to the destination wallet address you provided. No further action is required."
    }
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
          btc: data.bitcoin?.usd ?? prev.btc,
          eth: data.ethereum?.usd ?? prev.eth,
          sol: data.solana?.usd ?? prev.sol,
          kas: data.kaspa?.usd ?? prev.kas,
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
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`;
  };

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
            Exchange Crypto
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
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${active
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
                className={`flex items-center ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'
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

        <div className="px-4 flex-1 flex items-center justify-center mb-2">
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

        {/* Simplified Swap Process Indicator */}
        <div className="px-4 mb-4">
          <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4 text-center text-green-400">How Swapping Works</h3>

            {/* Simple Progress Bar */}
            <div className="relative flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < activeStep
                    ? 'bg-green-600 text-white'
                    : index === activeStep
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-gray-400'
                    }`}>
                    {index < activeStep ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Connecting line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-800 -z-0">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step Description */}
            <div className="flex items-center justify-between">
              <div className="text-gray-300">
                <p>{steps[activeStep].description}</p>
              </div>
              <button
                className="px-4 py-1 rounded bg-green-500 text-black text-sm hover:bg-green-400"
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </button>
            </div>
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
