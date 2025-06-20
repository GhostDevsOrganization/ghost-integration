import React, { useState, useEffect, useRef } from 'react';
import {
  Repeat, Wallet, Send, Home, MessageCircle,
  ArrowLeftRight, Lock, TrendingUp, Database, Users,
  Zap, Shield, Clock, DollarSign, BarChart3,
  ArrowUpDown, Eye, Settings, Info
} from 'lucide-react';
import TokenSwappingPage from './TokenSwappingPage';
import TraditionalNav from './TraditionalNav';
import BetaTestForm from './BetaTestForm';
import { useTheme } from '../context/ThemeContext';
import GuidedTour from './GuidedTour';
import { connectKasware, disconnectKasware, signTransaction } from '../services/kaswareService';
import { isMobile } from '../utils/walletDetect';

// Transaction type constants
export const TxType = {
  SIGN_TX: 0,
  SEND_KASPA: 1
};

const Kasportal = () => {
  // Enhanced starfield state for controlled movement with teal/purple theme
  const STAR_COUNT = 200;
  const createStars = () =>
    Array.from({ length: STAR_COUNT }).map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? 'teal' : 'purple'
    }));
  const [stars, setStars] = useState(createStars);

  // Mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Portal UI state
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [portalActive, setPortalActive] = useState(false);
  const [showBetaForm, setShowBetaForm] = useState(false);

  // Wallet state
  const [kaswareInstalled, setKaswareInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("kaspa_mainnet");
  // Removed KRC20 state

  // Real-time protocol data state
  const [protocolData, setProtocolData] = useState({
    bridge: { volume: '$12.4M', transactions: '1,234', chains: 5 },
    vaults: { tvl: '$8.7M', apy: '12.5%', pools: 8 },
    lending: { supplied: '$5.2M', borrowed: '$3.1M', utilization: '59.6%' },
    oracle: { feeds: 15, latency: '0.8s', accuracy: '99.9%' },
    multisig: { wallets: 42, secured: '$15.3M', signers: 156 }
  });

  // Form states for protocols
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [isSendingKas, setIsSendingKas] = useState(false);

  // Protocol-specific form states
  const [bridgeForm, setBridgeForm] = useState({
    fromChain: 'kaspa', toChain: 'ethereum', amount: '', asset: 'KAS'
  });
  const [vaultForm, setVaultForm] = useState({
    pool: 'kas-eth', amount: '', action: 'deposit'
  });
  const [lendingForm, setLendingForm] = useState({
    asset: 'KAS', amount: '', action: 'supply'
  });

  // Mouse movement tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Real-time data updates every 3 seconds
  useEffect(() => {
    const updateProtocolData = () => {
      setProtocolData(prev => ({
        bridge: {
          volume: `$${(12.4 + Math.random() * 2).toFixed(1)}M`,
          transactions: `${Math.floor(1200 + Math.random() * 100)}`,
          chains: 5
        },
        vaults: {
          tvl: `$${(8.7 + Math.random() * 1.5).toFixed(1)}M`,
          apy: `${(12.5 + Math.random() * 3).toFixed(1)}%`,
          pools: 8
        },
        lending: {
          supplied: `$${(5.2 + Math.random() * 1).toFixed(1)}M`,
          borrowed: `$${(3.1 + Math.random() * 0.8).toFixed(1)}M`,
          utilization: `${(59.6 + Math.random() * 10).toFixed(1)}%`
        },
        oracle: {
          feeds: 15,
          latency: `${(0.8 + Math.random() * 0.4).toFixed(1)}s`,
          accuracy: '99.9%'
        },
        multisig: {
          wallets: Math.floor(42 + Math.random() * 8),
          secured: `$${(15.3 + Math.random() * 2).toFixed(1)}M`,
          signers: Math.floor(156 + Math.random() * 20)
        }
      }));
    };

    const interval = setInterval(updateProtocolData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Protocol definitions for the portal UI with updated theme - 6 protocols in hexagonal arrangement
  const protocols = {
    bridge: {
      name: "Bridge",
      icon: <ArrowLeftRight className="text-teal-200" size={20} />,
      description: "Cross-chain asset bridge",
      position: { top: '25%', left: '75%' },
      color: "from-blue-400 to-teal-600",
      angle: 0
    },
    swap: {
      name: "Swap",
      icon: <Repeat className="text-purple-200" size={20} />,
      description: "Token exchange protocol",
      position: { top: '50%', left: '85%' },
      color: "from-teal-400 to-purple-600",
      angle: 60
    },
    vaults: {
      name: "Vaults",
      icon: <Lock className="text-green-200" size={20} />,
      description: "Yield farming pools",
      position: { top: '75%', left: '75%' },
      color: "from-green-400 to-teal-600",
      angle: 120
    },
    lending: {
      name: "Lending",
      icon: <TrendingUp className="text-yellow-200" size={20} />,
      description: "Supply & borrow assets",
      position: { top: '75%', left: '25%' },
      color: "from-yellow-400 to-orange-600",
      angle: 180
    },
    oracle: {
      name: "Oracle",
      icon: <Database className="text-blue-200" size={20} />,
      description: "Price & data feeds",
      position: { top: '50%', left: '15%' },
      color: "from-blue-400 to-indigo-600",
      angle: 240
    },
    multisig: {
      name: "MultiSig",
      icon: <Users className="text-pink-200" size={20} />,
      description: "Multi-signature wallets",
      position: { top: '25%', left: '25%' },
      color: "from-pink-400 to-purple-600",
      angle: 300
    }
  };

  // Handle protocol selection - navigate to dedicated pages
  const handleProtocolClick = (key) => {
    // Route to dedicated protocol pages
    switch (key) {
      case 'bridge':
        window.location.href = '/bridge';
        break;
      case 'swap':
        window.location.href = '/swap';
        break;
      case 'vaults':
        window.location.href = '/vaults';
        break;
      case 'lending':
        window.location.href = '/lending';
        break;
      case 'oracle':
        window.location.href = '/oracle';
        break;
      case 'multisig':
        window.location.href = '/multisig';
        break;
      default:
        console.log(`Unknown protocol: ${key}`);
    }
  };

  // Connect to wallet
  const connectWallet = async () => {
    try {
      if (window.kasware) {
        const accounts = await window.kasware.requestAccounts();
        setAccounts(accounts);
        setConnected(true);
        setAddress(accounts[0]);

        const balance = await window.kasware.getBalance();
        setBalance(balance);

        // Removed KRC20 balance tracking
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    try {
      setConnected(false);
      setAccounts([]);
      setAddress("");
      setBalance({ confirmed: 0, unconfirmed: 0, total: 0 });
      setKrc20Balances([]);
    } catch (error) {
      console.error("Error disconnecting from wallet:", error);
    }
  };

  // Only show swap functionality on mobile
  if (isMobile()) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start pt-4">
        <TokenSwappingPage />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Enhanced animated background with teal/purple theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        ></div>

        {/* Enhanced floating particles with teal/purple colors */}
        {stars.map((star, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${star.color === 'teal' ? 'bg-teal-400/30' : 'bg-purple-400/30'} animate-float`}
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Top navigation bar with updated theme */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-[100]">
        <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <Home size={20} className="mr-2 text-teal-400" />
          <span className="text-teal-400">Kaspa</span> Portal
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => window.location.href = '/swap'}
            className="flex items-center bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 rounded transition-colors"
          >
            <Repeat size={16} className="mr-1" />
            Swap
          </button>
          <button
            onClick={() => window.open('/whitepaper.html', '_blank')}
            className="flex items-center bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
            </svg>
            Research Paper
          </button>
          <button
            onClick={() => window.location.href = '/architecture'}
            className="flex items-center bg-indigo-800 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors"
          >
            <Settings size={16} className="mr-1" />
            Tech Deep Dive
          </button>
          <button
            onClick={connected ? disconnectWallet : connectWallet}
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
          >
            <Wallet size={16} className="mr-1" />
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>

      </div>

      {/* Main portal interface with enhanced design */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Enhanced background effects with teal/purple theme */}
        <div className="absolute w-96 h-96 rounded-full border-2 border-teal-500/30 opacity-30 animate-pulse"></div>
        <div className="absolute w-80 h-80 rounded-full border-2 border-purple-400/40 opacity-40" style={{ animation: 'ping 4s infinite' }}></div>

        {/* Enhanced ripple effects */}
        <div className="absolute w-72 h-72 rounded-full border border-teal-400/40 opacity-40" style={{ animation: 'ripple 3s infinite' }}></div>
        <div className="absolute w-64 h-64 rounded-full border border-purple-500/30 opacity-30" style={{ animation: 'ripple 4s infinite 1s' }}></div>

        {/* Enhanced vortex effect */}
        <div className="absolute w-56 h-56 rounded-full border border-teal-300/50" style={{ animation: 'rotate3D 15s linear infinite' }}></div>
        <div className="absolute w-48 h-48 rounded-full border border-purple-400/50" style={{ animation: 'rotate3D 10s linear infinite reverse' }}></div>

        {/* Enhanced rotating outer ring */}
        <div className="absolute w-[450px] h-[450px] rounded-full border border-teal-300/30 border-dashed" style={{ animation: 'spin 30s linear infinite' }}></div>

        {/* Enhanced orbiting elements with teal/purple theme */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orbit-element-${i}`}
            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-teal-400/50' : 'bg-purple-400/50'}`}
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(${120 + i * 20}px) translateY(-50%)`,
              animation: `orbit ${8 + i}s linear infinite`
            }}
          />
        ))}

        {/* Protocol nodes */}
        {Object.entries(protocols).map(([key, protocol]) => (
          <React.Fragment key={key}>
            {/* Energy beam connection line */}
            <div
              className="absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"
              style={{
                width: '180px',
                transformOrigin: 'left center',
                transform: `translateX(-50%) translateY(-50%) rotate(${protocol.angle}deg)`,
                opacity: activeProtocol === key ? 0.9 : 0.6,
                filter: activeProtocol === key ? 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.7))' : 'none'
              }}
            ></div>

            {/* Protocol node */}
            <div
              id={`protocol-${key}`}
              className="absolute group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-20"
              style={{
                ...protocol.position,
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: 'auto'
              }}
              onClick={() => handleProtocolClick(key)}
            >
              {/* Icon container */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center
                            bg-gradient-to-br ${protocol.color}
                            border-2 ${activeProtocol === key ? 'border-teal-400 shadow-teal-500/60' : 'border-teal-600/50'}
                            shadow-lg shadow-teal-900/50
                            transition-all duration-300
                            hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40
                            ${activeProtocol === key ? 'scale-110 shadow-xl' : 'scale-100'}`}>
                {protocol.icon}
              </div>

              {/* Status indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

              {/* Label */}
              <span className="text-teal-200 text-xs mt-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {protocol.name}
              </span>
            </div>
          </React.Fragment>
        ))}

        {/* Central portal */}
        <div className="relative w-32 h-32 rounded-full z-30 cursor-pointer group" onClick={() => setShowBetaForm(true)}>
          {/* Portal core */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-purple-600/30 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-teal-300/50 to-purple-500/50 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/80 to-teal-200/80 group-hover:scale-110 transition-transform"></div>

          {/* Alpha access indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-teal-800 opacity-70 group-hover:opacity-100 transition-opacity">
              ALPHA
            </span>
          </div>
        </div>
      </div>


      {/* Wallet info panel */}
      {connected && (
        <div className="absolute top-20 right-6 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 w-64 z-50">
          <h3 className="text-teal-400 font-bold mb-2">Wallet</h3>
          <p className="text-white text-sm mb-1">Address: {address.slice(0, 8)}...{address.slice(-8)}</p>
          <p className="text-white text-sm">Balance: {(balance.total / 100000000).toFixed(4)} KAS</p>
        </div>
      )}

      {/* Protocol Status Panel */}
      <div className="absolute bottom-6 right-6 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 w-72 z-50">
        <h3 className="text-teal-400 font-bold mb-3 flex items-center">
          <BarChart3 size={16} className="mr-2" />
          Protocol Status
        </h3>
        <div className="space-y-2 text-xs">
          {Object.entries(protocols).map(([key, protocol]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-gray-300">{protocol.name}</span>
              </div>
              <div className="text-right">
                {key === 'bridge' && <span className="text-blue-400">{protocolData.bridge.volume}</span>}
                {key === 'swap' && <span className="text-purple-400">Active</span>}
                {key === 'vaults' && <span className="text-green-400">{protocolData.vaults.apy}</span>}
                {key === 'lending' && <span className="text-yellow-400">{protocolData.lending.utilization}</span>}
                {key === 'oracle' && <span className="text-blue-400">{protocolData.oracle.latency}</span>}
                {key === 'multisig' && <span className="text-pink-400">{protocolData.multisig.wallets}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Total TVL</span>
            <span className="text-teal-400">$41.2M</span>
          </div>
        </div>
      </div>

      {/* Beta Test Form */}
      <BetaTestForm
        isVisible={showBetaForm}
        onClose={() => setShowBetaForm(false)}
      />


      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes rotate3D {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(var(--radius, 120px)) translateY(-50%); }
          100% { transform: rotate(360deg) translateX(var(--radius, 120px)) translateY(-50%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Kasportal;
