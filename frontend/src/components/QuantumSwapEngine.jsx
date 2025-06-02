import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Info, TrendingUp, Clock, Shield, Zap, ChevronDown, Check } from 'lucide-react';
import BitcoinIcon from './BitcoinIcon';
import EthereumIcon from './EthereumIcon';
import USDTIcon from './USDTIcon';
import BNBIcon from './BNBIcon';
import KASIcon from './KASIcon';

const QuantumSwapEngine = ({
    from: initialFrom = 'btc',
    to: initialTo = 'kas',
    amount: initialAmount = '0.01'
}) => {
    // State management
    const [fromCurrency, setFromCurrency] = useState(initialFrom);
    const [toCurrency, setToCurrency] = useState(initialTo);
    const [fromAmount, setFromAmount] = useState(initialAmount);
    const [toAmount, setToAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [showRateInfo, setShowRateInfo] = useState(false);
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    // Currency configuration
    const currencies = {
        btc: {
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: <BitcoinIcon size={24} />,
            color: '#F7931A',
            decimals: 8
        },
        eth: {
            name: 'Ethereum',
            symbol: 'ETH',
            icon: <EthereumIcon size={24} />,
            color: '#627EEA',
            decimals: 18
        },
        kas: {
            name: 'Kaspa',
            symbol: 'KAS',
            icon: <KASIcon size={24} />,
            color: '#00D632',
            decimals: 8
        },
        usdt: {
            name: 'Tether',
            symbol: 'USDT',
            icon: <USDTIcon size={24} />,
            color: '#26A17B',
            decimals: 6
        },
        bnb: {
            name: 'BNB',
            symbol: 'BNB',
            icon: <BNBIcon size={24} />,
            color: '#F3BA2F',
            decimals: 18
        }
    };

    // Mock exchange rates (in production, these would come from an API)
    const mockRates = {
        'btc-kas': 420000,
        'btc-eth': 16.5,
        'btc-usdt': 65000,
        'btc-bnb': 108,
        'eth-kas': 25454,
        'eth-usdt': 3940,
        'eth-bnb': 6.54,
        'kas-usdt': 0.154,
        'kas-bnb': 0.000257,
        'usdt-bnb': 0.00167
    };

    // Calculate exchange rate
    const calculateExchangeRate = (from, to) => {
        if (from === to) return 1;

        const key = `${from}-${to}`;
        const reverseKey = `${to}-${from}`;

        if (mockRates[key]) {
            return mockRates[key];
        } else if (mockRates[reverseKey]) {
            return 1 / mockRates[reverseKey];
        }
        return null;
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.currency-selector')) {
                setShowFromDropdown(false);
                setShowToDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update amounts when currencies or input changes
    useEffect(() => {
        const rate = calculateExchangeRate(fromCurrency, toCurrency);
        if (rate && fromAmount) {
            const calculated = (parseFloat(fromAmount) * rate).toFixed(currencies[toCurrency].decimals);
            setToAmount(calculated);
            setExchangeRate(rate);
        }
    }, [fromCurrency, toCurrency, fromAmount]);

    // Handle swap currencies
    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    // Handle amount change
    const handleFromAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setFromAmount(value);
        }
    };

    // Handle swap execution
    const handleExecuteSwap = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert(`Swap initiated: ${fromAmount} ${currencies[fromCurrency].symbol} → ${toAmount} ${currencies[toCurrency].symbol}`);
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Main Swap Container */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200">

                {/* From Section */}
                <div className="bg-white rounded-2xl p-6 mb-3 shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">From</label>
                        <div className="text-xs text-gray-500">
                            Balance: 0.0 {currencies[fromCurrency].symbol}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={fromAmount}
                            onChange={handleFromAmountChange}
                            placeholder="0.0"
                            className="flex-1 text-3xl font-bold bg-transparent outline-none focus:ring-0 text-gray-900 placeholder-gray-400"
                        />
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold uppercase tracking-wide hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                            MAX
                        </button>
                        <div className="relative currency-selector">
                            <button
                                onClick={() => setShowFromDropdown(!showFromDropdown)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 shadow-sm"
                            >
                                <div style={{ color: currencies[fromCurrency].color }}>
                                    {currencies[fromCurrency].icon}
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {currencies[fromCurrency].symbol}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showFromDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showFromDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 overflow-hidden transform origin-top transition-all duration-200 ease-out">
                                    <div className="p-2">
                                        {Object.entries(currencies).map(([key, currency]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setFromCurrency(key);
                                                    setShowFromDropdown(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all ${key === fromCurrency ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' : ''
                                                    }`}
                                            >
                                                <div style={{ color: currency.color }}>
                                                    {currency.icon}
                                                </div>
                                                <div className="text-left flex-1">
                                                    <div className="font-semibold text-gray-900">{currency.symbol}</div>
                                                    <div className="text-xs text-gray-500">{currency.name}</div>
                                                </div>
                                                {key === fromCurrency && (
                                                    <Check className="w-5 h-5 text-blue-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="relative h-4 my-2">
                    <button
                        onClick={handleSwapCurrencies}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
                    >
                        <ArrowDownUp className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* To Section */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">To</label>
                        <div className="text-xs text-gray-500">
                            Balance: 0.0 {currencies[toCurrency].symbol}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={toAmount}
                            readOnly
                            placeholder="0.0"
                            className="flex-1 text-3xl font-bold bg-transparent outline-none text-gray-900 placeholder-gray-400"
                        />
                        <div className="relative currency-selector">
                            <button
                                onClick={() => setShowToDropdown(!showToDropdown)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 shadow-sm"
                            >
                                <div style={{ color: currencies[toCurrency].color }}>
                                    {currencies[toCurrency].icon}
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {currencies[toCurrency].symbol}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showToDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showToDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 overflow-hidden transform origin-top transition-all duration-200 ease-out">
                                    <div className="p-2">
                                        {Object.entries(currencies).map(([key, currency]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setToCurrency(key);
                                                    setShowToDropdown(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all ${key === toCurrency ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' : ''
                                                    }`}
                                            >
                                                <div style={{ color: currency.color }}>
                                                    {currency.icon}
                                                </div>
                                                <div className="text-left flex-1">
                                                    <div className="font-semibold text-gray-900">{currency.symbol}</div>
                                                    <div className="text-xs text-gray-500">{currency.name}</div>
                                                </div>
                                                {key === toCurrency && (
                                                    <Check className="w-5 h-5 text-blue-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Exchange Rate Info */}
                {exchangeRate && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-bold text-gray-800">
                                    1 {currencies[fromCurrency].symbol} = {exchangeRate.toFixed(2)} {currencies[toCurrency].symbol}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowRateInfo(!showRateInfo)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-1 rounded-lg transition-colors"
                            >
                                <Info className="w-5 h-5" />
                            </button>
                        </div>

                        {showRateInfo && (
                            <div className="mt-4 pt-4 border-t border-blue-200 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    <span>Rate updates every 30 seconds</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Shield className="w-4 h-4 text-blue-500" />
                                    <span>Best rate from 50+ exchanges</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Zap className="w-4 h-4 text-blue-500" />
                                    <span>Estimated time: 5-10 minutes</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Swap Button */}
                <button
                    onClick={handleExecuteSwap}
                    disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isLoading}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${isLoading || !fromAmount || parseFloat(fromAmount) <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:from-teal-500 hover:to-indigo-500'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing Swap...</span>
                        </div>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Swap Now
                            <ArrowDownUp className="w-5 h-5" />
                        </span>
                    )}
                </button>

                {/* Info Footer */}
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5 hover:text-gray-700 transition-colors cursor-pointer">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Non-custodial</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center gap-1.5 hover:text-gray-700 transition-colors cursor-pointer">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">~1% fee</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center gap-1.5 hover:text-gray-700 transition-colors cursor-pointer">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">5-10 min</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantumSwapEngine;