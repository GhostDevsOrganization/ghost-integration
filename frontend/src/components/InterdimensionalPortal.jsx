import React, { useState, useEffect, useRef } from 'react';
import { Repeat, PiggyBank, Shield, BarChart3, Wallet, Activity, Zap, CreditCard, Send, Copy, LayoutGrid, Circle, Sun, Moon, Home, MessageCircle } from 'lucide-react'; // Added Home, MessageCircle icons
import TokenSwappingPage from './TokenSwappingPage';
import TraditionalNav from './TraditionalNav';
import AnalyticsPanel from './AnalyticsPanel';
import BlackPortfolioChart from './BlackPortfolioChart';
// import NetworkStatsTicker from './NetworkStatsTicker'; // Removed import
import { useTheme } from '../context/ThemeContext';
import GuidedTour from './GuidedTour';
import { connectKasware, disconnectKasware, signTransaction } from '../services/kaswareService';
import { isMobile } from '../utils/walletDetect';

// Transaction type constants
export const TxType = {
  SIGN_TX: 0,
  SEND_KASPA: 1,
  SIGN_KRC20_DEPLOY: 2,
  SIGN_KRC20_MINT: 3,
  SIGN_KRC20_TRANSFER: 4
};

/**
 * @typedef {Object} BatchTransferRes
 * @property {number} [index]
 * @property {string} [tick]
 * @property {string} [to]
 * @property {number} [amount]
 * @property {"success"|"failed"|"preparing 20%"|"preparing 40%"|"preparing 60%"|"preparing 80%"|"preparing 100%"} status
 * @property {string} [errorMsg]
 * @property {{commitId: string, revealId: string}} [txId]
 */

const Kasportal = () => {
  // Starfield state for controlled movement
  const STAR_COUNT = 150;
  const createStars = () =>
    Array.from({ length: STAR_COUNT }).map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  const [stars, setStars] = useState(createStars);

  // Ripple state for portal center
  const [ripples, setRipples] = useState([]);

  // KAS price state (default to 0.042, will be updated by ticker)
  const [kasPrice, setKasPrice] = useState(0.042);

  // Portal UI state
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [portalPulse, setPortalPulse] = useState(1);

  // Wallet state
  const [kaswareInstalled, setKaswareInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [connector, setConnector] = useState(null);
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("kaspa_mainnet");
  const [krc20Balances, setKrc20Balances] = useState([]);
  const [batchTransferProgress, setBatchTransferProgress] = useState(undefined);
  const [copySuccess, setCopySuccess] = useState(''); // State for copy feedback

  // Form states for various protocols
  const [swapAmount, setSwapAmount] = useState('');
  const [swapEstimate, setSwapEstimate] = useState('0.0123 ETH');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [enhancedPrivacy, setEnhancedPrivacy] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [deployTicker, setDeployTicker] = useState('');
  const [deploySupply, setDeploySupply] = useState(100000000);
  const [deployLimit, setDeployLimit] = useState(1000);
  const [mintTicker, setMintTicker] = useState('');
  const [transferTicker, setTransferTicker] = useState('');
  const [transferAmount, setTransferAmount] = useState(1);
  const [transferAddress, setTransferAddress] = useState('');

  // Loading states for actions
  const [isSendingKas, setIsSendingKas] = useState(false);
  const [isDeployingToken, setIsDeployingToken] = useState(false);
  const [isMintingToken, setIsMintingToken] = useState(false);
  const [isSendingToken, setIsSendingToken] = useState(false);

  // Create pulsing effect for the portal
  useEffect(() => {
    const interval = setInterval(() => {
      setPortalPulse(prev => prev === 1 ? 1.05 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch KAS price periodically
  useEffect(() => {
    const fetchKasPrice = async () => {
      try {
        // Using CoinGecko API as an example - replace if you have a preferred source
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.kaspa && data.kaspa.usd) {
          setKasPrice(data.kaspa.usd);
        } else {
          console.error('Unexpected API response structure:', data);
        }
      } catch (error) {
        console.error('Failed to fetch KAS price:', error);
        // Keep the default price or handle the error appropriately
      }
    };

    fetchKasPrice(); // Initial fetch
    const interval = setInterval(fetchKasPrice, 60000); // Update every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this runs once on mount and sets up the interval

  // Reference for handling account changes
  const selfRef = useRef({
    accounts: [],
  });
  const self = selfRef.current;

  // Get basic wallet info
  const getBasicInfo = async () => {
    try {
      const kasware = window.kasware;
      if (!kasware) return;

      const [address] = await kasware.getAccounts();
      setAddress(address);

      const publicKey = await kasware.getPublicKey();
      setPublicKey(publicKey);

      const balance = await kasware.getBalance();
      setBalance(balance);

      const krc20Balances = await kasware.getKRC20Balance();
      setKrc20Balances(krc20Balances);
      console.log("krc20Balances", krc20Balances);

      const network = await kasware.getNetwork();
      setNetwork(network);

      // Save portfolio snapshot to localStorage (per-wallet)
      try {
        if (!address) return;
        const key = `portfolioHistory_${address}`;
        const history = JSON.parse(localStorage.getItem(key) || '[]');
        history.push({
          timestamp: Date.now(),
          kasBalance: balance.total,
          krc20Balances: krc20Balances
        });
        if (history.length > 100) history.shift();
        localStorage.setItem(key, JSON.stringify(history));
      } catch (e) {
        console.error('Failed to save portfolio history', e);
      }
    } catch (error) {
      console.error("Error getting basic info:", error);
    }
  };

  // Handle account changes
  const handleAccountsChanged = (_accounts) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);
      setAddress(_accounts[0]);
      getBasicInfo();
    } else {
      setConnected(false);
    }
  };

  // Handle network changes
  const handleNetworkChanged = (network) => {
    console.log("network", network);
    setNetwork(network);
    getBasicInfo();
  };

  // Handle batch transfer progress updates
  const handleKRC20BatchTransferChangedChanged = (ress) => {
    ress.forEach((res) => {
      console.log("result", res.status, res?.index, res?.txId?.revealId, res?.errorMsg);
      setBatchTransferProgress(res);
    });
  };

  // Check for available wallets and initialize listeners
  useEffect(() => {
    async function checkWallets() {
      // Check for Kasware
      let kasware = window.kasware;
      for (let i = 1; i < 10 && !kasware; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        kasware = window.kasware;
      }

      setKaswareInstalled(!!kasware);

      if (!kasware) return;

      try {
        kasware.getAccounts().then((accounts) => {
          handleAccountsChanged(accounts);
        });

        kasware.on("accountsChanged", handleAccountsChanged);
        kasware.on("networkChanged", handleNetworkChanged);
        kasware.on("krc20BatchTransferChanged", handleKRC20BatchTransferChangedChanged);

        return () => {
          kasware.removeListener("accountsChanged", handleAccountsChanged);
          kasware.removeListener("networkChanged", handleNetworkChanged);
          kasware.removeListener("krc20BatchTransferChanged", handleKRC20BatchTransferChangedChanged);
        };
      } catch (error) {
        console.error("Error setting up Kasware listeners:", error);
      }
    }

    checkWallets();
  }, []);

  // Protocol definitions for the portal UI
  const protocols = {
    swap: {
      name: "Swap",
      icon: <Repeat className="text-green-200" />,
      description: "Token exchange protocol",
      position: { top: '30%', left: '75%' },
      group: "trading",
      label: "Swap" // Added label
    },
    send: {
      name: "Send",
      icon: <Send className="text-green-200" />,
      description: "Send KAS or KRC-20 tokens",
      position: { top: '30%', left: '25%' },
      group: "trading",
      label: "Send" // Added label
    },
    privacy: {
      name: "Privacy",
      icon: <Shield className="text-green-200" />,
      description: "Transaction privacy",
      position: { top: '70%', left: '25%' },
      group: "account",
      label: "Privacy" // Added label
    },
    tokens: {
      name: "Tokens",
      icon: <CreditCard className="text-green-200" />,
      description: "Manage KRC-20 tokens",
      position: { top: '70%', left: '75%' },
      group: "account",
      label: "Tokens" // Added label
    },
    analytics: {
      name: "Analytics",
      icon: <BarChart3 className="text-green-200" />,
      description: "Portfolio performance over time",
      position: { top: '50%', left: '50%' },
      group: "account",
      label: "Analytics"
    }
  };

  // State for navigation mode (circular or traditional)
  const [navMode, setNavMode] = useState('circular'); // 'circular' or 'traditional'
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  // Handle protocol selection with animation effect
  const handleProtocolClick = (key) => {
    // For swap protocol, navigate directly to swap page
    if (key === 'swap') {
      window.location.href = '/swap';
      return;
    }

    // For other protocols, toggle selection
    if (activeProtocol === key) {
      setActiveProtocol(null);
    } else {
      setActiveProtocol(key);

      // Jitter the stars slightly
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          left: Math.min(100, Math.max(0, star.left + (Math.random() - 0.5) * 2)), // jitter by up to ±1%
          top: Math.min(100, Math.max(0, star.top + (Math.random() - 0.5) * 2)),
        }))
      );

      // Add visual sucking animation effect
      const button = document.getElementById(`protocol-${key}`);
      if (button) {
        // First scale down slightly
        button.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
        button.style.transform = 'scale(0.8)';
        button.style.opacity = '0.7';

        // Then quickly scale up and fade back
        setTimeout(() => {
          button.style.transform = 'scale(1.2)';
          button.style.opacity = '1';

          // Finally return to normal
          setTimeout(() => {
            button.style.transform = 'scale(1)';
          }, 150);
        }, 150);
      }
    }
  };

  // Function to navigate to home page
  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Function to open Telegram
  const openTelegram = () => {
    window.open('https://t.me/+LJanxsRyV645OWUx', '_blank');
  };

  // Function to generate random string for token ticker
  const randomString = (len = 4) => {
    var $chars = "ABCDEFGHJKMNPQRSTWXYZ";
    var maxPos = $chars.length;
    var pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  };

  // Handle KRC20 deployment
  const handleDeployKRC20 = async () => {
    setIsDeployingToken(true);
    try {
      const deployObj = {
        p: "KRC-20",
        op: "deploy",
        tick: deployTicker,
        max: (deploySupply * 100000000).toString(),
        lim: (deployLimit * 100000000).toString(),
      };
      const jsonStr = JSON.stringify(deployObj);
      // kas unit
      const priorityFee = 0.1;
      const destAddr = "";
      const txids = await window.kasware.signKRC20Transaction(
        jsonStr,
        TxType.SIGN_KRC20_DEPLOY,
        destAddr,
        priorityFee
      );
      return txids;
    } catch (error) {
      console.error("Error deploying KRC20:", error);
      alert(`Deployment failed: ${error.message}`); // Provide feedback
      return error.message;
    } finally {
      setIsDeployingToken(false);
    }
  };

  // Handle KRC20 minting
  const handleMintKRC20 = async () => {
    setIsMintingToken(true);
    try {
      const mintObj = {
        p: "KRC-20",
        op: "mint",
        tick: mintTicker,
      };
      const jsonStr = JSON.stringify(mintObj);
      // kas unit
      const priorityFee = 0.1;
      const destAddr = "";
      const txid = await window.kasware.signKRC20Transaction(
        jsonStr,
        TxType.SIGN_KRC20_MINT,
        destAddr,
        priorityFee
      );
      return txid;
    } catch (error) {
      console.error("Error minting KRC20:", error);
      alert(`Mint failed: ${error.message}`); // Provide feedback
      return error.message;
    } finally {
      setIsMintingToken(false);
    }
  };

  // Handle KRC20 transfer
  const handleTransferKRC20 = async () => {
    setIsSendingToken(true);
    try {
      const transferObj = {
        p: "KRC-20",
        op: "transfer",
        tick: transferTicker,
        amt: (transferAmount * 100000000).toString(),
        to: transferAddress,
      };
      const jsonStr = JSON.stringify(transferObj);
      // kas unit
      const priorityFee = 0.1;
      const txid = await window.kasware.signKRC20Transaction(
        jsonStr,
        TxType.SIGN_KRC20_TRANSFER,
        transferAddress,
        priorityFee
      );
      return txid;
    } catch (error) {
      console.error("Error transferring KRC20:", error);
      alert(`Transfer failed: ${error.message}`); // Provide feedback
      return error.message;
    } finally {
      setIsSendingToken(false);
    }
  };

  // Handle sending KAS (also used for private send)
  const handleSendKas = async () => {
    setIsSendingKas(true);
    try {
      if (connector) {
        // Kaspium wallet flow using WalletConnect
        const txData = {
          to: recipientAddress,
          value: parseFloat(sendAmount) * 100000000,
          gasPrice: enhancedPrivacy ? 20000 : 10000,
          data: enhancedPrivacy ? "private" : "",
        };
        return await signTransaction(connector, txData);
      } else if (window.kasware) {
        // Kasware wallet flow
        const txid = await window.kasware.sendKaspa(
          recipientAddress,
          parseFloat(sendAmount) * 100000000,
          {
            priorityFee: enhancedPrivacy ? 20000 : 10000,
            payload: enhancedPrivacy ? "private" : "",
          }
        );
        return txid;
      }
      throw new Error("No wallet connected");
    } catch (error) {
      console.error("Full KAS Send Error:", error); // Log the full error object
      // Provide a more user-friendly message, guiding them to check console if needed
      const userMessage = error.message && error.message.includes('JSON input')
        ? "Send failed. Unable to process response from network. Check console for details."
        : `Send failed: ${error.message}`;
      alert(userMessage); // Provide improved feedback
      return error.message; // Still return the original message for potential internal handling
    } finally {
      setIsSendingKas(false);
    }
  };

  // Connect to wallet
  const connectWallet = async () => {
    try {
      if (kaswareInstalled) {
        const result = await connectKasware();
        setConnector(result.connector);
        handleAccountsChanged(result.accounts);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    try {
      if (connector) {
        if (connector.connected) {
          await disconnectKasware(connector);
        }
        setConnector(null);
      } else if (kaswareInstalled) {
        const origin = window.location.origin;
        await window.kasware.disconnect(origin);
      }
      handleAccountsChanged([]);
    } catch (error) {
      console.error("Error disconnecting from wallet:", error);
    }
  };

  // Copy address to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(demoMode ? "kaspa...wallet" : address);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 1500); // Clear message after 1.5s
    } catch (err) {
      console.error('Failed to copy address: ', err);
      setCopySuccess('Failed');
      setTimeout(() => setCopySuccess(''), 1500);
    }
  };

  // Switch network
  const switchNetwork = async (network) => {
    try {
      const newNetwork = await window.kasware.switchNetwork(network);
      setNetwork(newNetwork);
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  // Add demo mode state - true when not connected to wallet
  const demoMode = !connected;

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
      {/* Star field background - Less movement, static stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              animation: `pulse 60s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Top navigation bar */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-10">
        <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={navigateToHome}>
          <Home size={20} className="mr-2 text-green-400" />
          <span className="text-green-400">Kaspa</span> Portal
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => { console.log('Analytics button clicked'); setShowAnalytics(true); }}
            className="flex items-center bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
          >
            <BarChart3 size={16} className="mr-1" />
            Analytics
          </button>
          <button
            onClick={openTelegram}
            className="flex items-center bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
          >
            <MessageCircle size={16} className="mr-1" />
            Telegram
          </button>
        </div>

        {/* Wallet connect/disconnect button */}
        {connected ? (
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Main portal interface */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background vortex effect */}
        <div className="absolute w-96 h-96 rounded-full border-2 border-green-500 opacity-30 animate-pulse"></div>
        <div className="absolute w-80 h-80 rounded-full border-2 border-green-400 opacity-40" style={{ animation: 'ping 4s infinite' }}></div>

        {/* Ripple effects */}
        <div className="absolute w-72 h-72 rounded-full border border-green-400 opacity-40" style={{ animation: 'ripple 3s infinite' }}></div>
        <div className="absolute w-64 h-64 rounded-full border border-green-500 opacity-30" style={{ animation: 'ripple 4s infinite 1s' }}></div>

        {/* Vortex effect using multiple rotating rings */}
        <div className="absolute w-56 h-56 rounded-full border border-green-300" style={{ animation: 'rotate3D 15s linear infinite' }}></div>
        <div className="absolute w-48 h-48 rounded-full border border-green-400" style={{ animation: 'rotate3D 10s linear infinite reverse' }}></div>

        {/* Rotating outer ring */}
        <div className="absolute w-[450px] h-[450px] rounded-full border border-green-300 border-dashed" style={{ animation: 'spin 30s linear infinite' }}></div>

        {/* Orbiting Blocks */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orbit-block-${i}`}
            className="absolute w-3 h-3 bg-green-500/50 rounded-sm"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: 'center center', // Orbit around the center
              animation: `orbit ${5 + i * 1.5}s linear infinite`, // Vary speed
              animationDelay: `${i * 0.5}s`, // Stagger start times
              '--orbit-radius': `${100 + i * 15}px` // Vary orbit radius (custom property)
            }}
          />
        ))}


        {/* Conditional Rendering for Navigation */}
        {navMode === 'circular' && (
          <>
            {/* Protocol nodes and connection lines (Circular Layout) */}
            {Object.entries(protocols).map(([key, protocol]) => (
              <React.Fragment key={key}>
                {/* Energy beam connection line */}
                <div
                  className="absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"
                  style={{
                    width: '180px',
                    transformOrigin: 'left center',
                    transform: `translateX(-50%) translateY(-50%) rotate(${Object.keys(protocols).indexOf(key) * 90}deg)`,
                    opacity: activeProtocol === key ? 0.9 : 0.6,
                    filter: activeProtocol === key ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.7))' : 'none'
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
                                bg-gradient-to-br from-green-900 to-green-800
                                border-2 ${activeProtocol === key ? 'border-green-400 shadow-green-500/60' : 'border-green-600'}
                                shadow-lg shadow-green-900/50
                                transition-all duration-300
                                group-hover:scale-110 group-hover:border-green-300 group-hover:shadow-lg group-hover:shadow-green-400/50`}>
                    {protocol.icon}
                  </div>
                  {/* Text label */}
                  <div className="text-green-100 text-xs mt-2 font-medium transition-all duration-300 group-hover:text-green-300">
                    {protocol.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        )}

        {/* Kaspa-styled portal light rays */}
        <div className="absolute w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.7) 0%, rgba(5, 150, 105, 0.2) 70%, transparent 100%)',
            filter: 'blur(8px)',
            transform: `scale(${portalPulse})`
          }}>
        </div>

        {/* Central portal with Kaspa theme - LESS MOVEMENT */}
        <div
          className="relative w-32 h-32 rounded-full z-30
                    bg-gradient-to-br from-green-800 via-green-700 to-green-900
                    flex items-center justify-center cursor-pointer
                    hover:scale-110 transition-all duration-300 shadow-lg shadow-green-500/50"
          style={{
            boxShadow: '0 0 30px 5px rgba(16, 185, 129, 0.6), inset 0 0 20px 5px rgba(5, 150, 105, 0.4)'
          }}
          onClick={() => {
            setActiveProtocol(null);
            setRipples((prev) => [...prev, Date.now()]);
          }}
        >
          {/* Static overlays, no pulse or ping - Reduced opacity */}
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-10"></div> {/* Was opacity-20 */}
          <div className="absolute inset-0 rounded-full bg-green-400" style={{ opacity: 0.015 }}></div> {/* Was 0.03 */}

          {/* Vortex effect - styled for Kaspa - Reduced opacity */}
          <div className="absolute w-28 h-28 rounded-full opacity-40"  /* Was opacity-80 */
            style={{
              background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.6), rgba(5, 150, 105, 0.3), rgba(16, 185, 129, 0.6))', // Adjusted gradient alpha too
              // Keep slow spin for subtle effect
              animation: 'spin 16s linear infinite'
            }}>
          </div>

          {/* Inner portal rings - Reduced opacity */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-green-700 to-green-800 opacity-40"></div> {/* Was opacity-80 */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 opacity-50"></div> {/* Was opacity-90 */}
          <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 opacity-75"></div> {/* Added opacity-75 */}

          {/* Portal core - bright center, static - Reduced opacity */}
          <div className="absolute w-6 h-6 rounded-full bg-white/40 blur-sm"></div> {/* Was bg-white/80 */}

          {/* Ripples on click */}
          {ripples.map((r, i) => (
            <span
              key={r}
              className="absolute w-full h-full rounded-full border border-green-400 pointer-events-none"
              style={{
                animation: 'ripple 1.2s cubic-bezier(0.4,0,0.2,1)',
                opacity: 0.3,
                zIndex: 40 + i,
              }}
              onAnimationEnd={() => {
                setRipples((prev) => prev.filter((_, idx) => idx !== 0));
              }}
            ></span>
          ))}

          {/* Portal Logo in Center */}
          <div className="absolute inset-0 flex items-center justify-center z-50"> {/* Increased z-index */}
            <img
              src="/images/portal-logo.png" // Updated path to new logo
              alt="PORTAL Logo"
              style={{
                width: "90%", // Increased width percentage
                maxWidth: 130, // Increased max width
                objectFit: "contain",
                filter: 'grayscale(1) brightness(3)' // Attempt to make it white
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Protocol panel - Features from Kasware (Responsive Width) */}
      <div className={`absolute right-0 top-0 h-full bg-green-900/80 backdrop-blur-md border-l border-green-700 p-6 
                      transform transition-all duration-500 ease-in-out z-50 ${activeProtocol ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: "400px" }}>
        {activeProtocol && (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-200">
                {protocols[activeProtocol].name}
                <div className="text-sm font-normal text-green-300 mt-1">
                  {protocols[activeProtocol].description}
                </div>
              </h2>
              <button
                className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-600"
                onClick={() => setActiveProtocol(null)}
              >
                ×
              </button>
            </div>

            <div className="flex-1 bg-black rounded-lg p-4 text-green-200 overflow-y-auto">
              {/* Swap protocol is handled directly in the handleProtocolClick function */}

              {/* Send Panel */}
              {activeProtocol === 'send' && (
                <div className="p-4 bg-black/40 rounded-lg">
                  <div className="text-center mb-4 font-medium">Send KAS</div>
                  <div className="mb-4">
                    <div className="text-xs text-green-300 mb-1">Recipient Address</div>
                    <input
                      type="text"
                      className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white text-xs font-mono overflow-hidden ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="kaspa:address..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      disabled={demoMode}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-green-300 mb-1">Amount (KAS)</div>
                    <input
                      type="text"
                      className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="0.0"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      disabled={demoMode}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-green-300 mb-1">Current Balance</div>
                    <div className="w-full bg-black/40 border border-green-700 rounded p-2 text-white">
                      {demoMode ? "50.0000 KAS (Demo)" : (balance.total / 100000000).toFixed(8) + " KAS"}
                    </div>
                  </div>
                  <button
                    className={`w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors mb-2 ${isSendingKas && !demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={demoMode ? connectWallet : handleSendKas}
                    disabled={isSendingKas && !demoMode}
                  >
                    {demoMode ? "Connect Wallet to Send" : (isSendingKas ? 'Sending...' : 'Send KAS')}
                  </button>
                  <div className="mt-6 border-t border-green-700 pt-4">
                    <div className="text-center mb-4 font-medium">Send KRC-20 Token</div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Token Ticker</div>
                      <input
                        type="text"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="TICK"
                        value={transferTicker}
                        onChange={(e) => setTransferTicker(e.target.value)}
                        disabled={demoMode}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Amount</div>
                      <input
                        type="text"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="0.0"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        disabled={demoMode}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Recipient Address</div>
                      <input
                        type="text"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white text-xs font-mono overflow-hidden ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="kaspa:address..."
                        value={transferAddress}
                        onChange={(e) => setTransferAddress(e.target.value)}
                        disabled={demoMode}
                      />
                    </div>
                    <button
                      className={`w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors ${isSendingToken && !demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={demoMode ? connectWallet : handleTransferKRC20}
                      disabled={isSendingToken && !demoMode}
                    >
                      {demoMode ? "Connect Wallet to Send" : (isSendingToken ? 'Sending...' : 'Send KRC-20 Token')}
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Panel */}
              {activeProtocol === 'privacy' && (
                <div className="p-4 bg-black/40 rounded-lg">
                  <div className="text-center mb-4 font-medium">Private Transaction</div>
                  <div className="mb-4">
                    <div className="text-xs text-green-300 mb-1">Recipient Address</div>
                    <input
                      type="text"
                      className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white font-mono text-xs ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="kaspa:address..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      disabled={demoMode}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-green-300 mb-1">Amount (KAS)</div>
                    <input
                      type="text"
                      className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="0.0"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      disabled={demoMode}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="privacy-level"
                      className={`mr-2 bg-green-900 ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      checked={enhancedPrivacy}
                      onChange={(e) => setEnhancedPrivacy(e.target.checked)}
                      disabled={demoMode}
                    />
                    <label htmlFor="privacy-level" className="text-green-200 text-sm">Enhanced Privacy (uses more gas)</label>
                  </div>
                  <button
                    className={`w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors ${isSendingKas && !demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={demoMode ? connectWallet : handleSendKas} // Uses the same handler as regular send
                    disabled={isSendingKas && !demoMode}
                  >
                    {demoMode ? "Connect Wallet to Send" : (isSendingKas ? 'Sending...' : 'Send Private Transaction')}
                  </button>
                  <div className="mt-4 p-3 bg-green-950 text-xs rounded">
                    <p className="text-green-300">Privacy features use a combination of:</p>
                    <ul className="list-disc pl-4 mt-2 text-green-200 space-y-1">
                      <li>Higher gas fees to avoid correlation</li>
                      <li>Optional payload encryption</li>
                      <li>Transaction obfuscation</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tokens Panel - Manage KRC-20 tokens */}
              {activeProtocol === 'tokens' && (
                <div className="space-y-6">
                  {/* Deploy section */}
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-center mb-4 font-medium">Deploy KRC-20 Token</div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Token Ticker</div>
                      <input
                        type="text"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="TICK"
                        value={deployTicker || randomString(4)}
                        onChange={(e) => setDeployTicker(e.target.value)}
                        disabled={demoMode}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Max Supply</div>
                      <input
                        type="number"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={deploySupply}
                        onChange={(e) => setDeploySupply(parseInt(e.target.value))}
                        disabled={demoMode}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Amount per mint</div>
                      <input
                        type="number"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={deployLimit}
                        onChange={(e) => setDeployLimit(parseInt(e.target.value))}
                        disabled={demoMode}
                      />
                    </div>
                    <button
                      className={`w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors ${isDeployingToken && !demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={demoMode ? connectWallet : handleDeployKRC20}
                      disabled={isDeployingToken && !demoMode}
                    >
                      {demoMode ? "Connect Wallet to Deploy" : (isDeployingToken ? 'Deploying...' : 'Deploy Token')}
                    </button>
                  </div>

                  {/* Mint section */}
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-center mb-4 font-medium">Mint KRC-20 Token</div>
                    <div className="mb-4">
                      <div className="text-xs text-green-300 mb-1">Token Ticker</div>
                      <input
                        type="text"
                        className={`w-full bg-black/40 border border-green-700 rounded p-2 text-white ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="TICK"
                        value={mintTicker}
                        onChange={(e) => setMintTicker(e.target.value)}
                        disabled={demoMode}
                      />
                    </div>
                    <button
                      className={`w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors ${isMintingToken && !demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={demoMode ? connectWallet : handleMintKRC20}
                      disabled={isMintingToken && !demoMode}
                    >
                      {demoMode ? "Connect Wallet to Mint" : (isMintingToken ? 'Minting...' : 'Mint Token')}
                    </button>
                  </div>

                  {/* KRC-20 Balances */}
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-center mb-4 font-medium">Your KRC-20 Balances</div>
                    <div className="max-h-48 overflow-y-auto">
                      {demoMode ? (
                        <div className="bg-green-800/50 rounded-lg p-3 mb-2 flex justify-between">
                          <span>DEMO</span>
                          <span className="text-green-300">1000 units</span>
                        </div>
                      ) : krc20Balances && krc20Balances.length > 0 ? (
                        krc20Balances.map((token, index) => (
                          <div key={index} className="bg-green-800/50 rounded-lg p-3 mb-2 flex justify-between">
                            <span>{token.tick}</span>
                            <span className="text-green-300">{token.balance} units</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-green-300 py-4">
                          No KRC-20 tokens found
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Panel */}
              {activeProtocol === 'analytics' && (
                <div className="p-4 bg-black/40 rounded-lg">
                  <div className="text-center mb-4 font-medium">Portfolio Analytics</div>
                  <button
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors"
                    onClick={() => { setShowAnalytics(true); setActiveProtocol(null); }}
                  >
                    View Full Analytics
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Traditional Navigation Bar (Rendered conditionally) */}
      {navMode === 'traditional' && (
        <TraditionalNav
          protocols={protocols}
          activeProtocol={activeProtocol}
          onProtocolClick={handleProtocolClick}
        />
      )}

      {/* Network switcher & Nav Mode Toggle */}
      <div className="absolute top-20 left-0 m-6 z-40 flex items-center space-x-4">
        {/* Network Dropdown */}
        <div className="relative">
          <select
            value={network}
            onChange={(e) => switchNetwork(e.target.value)}
            className={`appearance-none w-full bg-green-900/80 backdrop-blur-md border border-green-700 text-white py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-green-800 focus:border-green-500 text-sm ${demoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={demoMode}
          >
            <option value="kaspa_mainnet" className="bg-green-900">Mainnet</option>
            <option value="kaspa_testnet_11" className="bg-green-900">Testnet-11</option>
            <option value="kaspa_testnet_10" className="bg-green-900">Testnet-10</option>
            <option value="kaspa_devnet" className="bg-green-900">Devnet</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
        {/* Nav Mode Toggle Button */}
        <button
          onClick={() => setNavMode(navMode === 'circular' ? 'traditional' : 'circular')}
          className="bg-green-900/80 backdrop-blur-md border border-green-700 text-white p-2 rounded-lg hover:bg-green-800 focus:outline-none focus:border-green-500"
          title={navMode === 'circular' ? "Switch to Traditional Nav" : "Switch to Circular Nav"}
        >
          {navMode === 'circular' ? <LayoutGrid size={18} /> : <Circle size={18} />}
        </button>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="bg-green-900/80 backdrop-blur-md border border-green-700 text-white p-2 rounded-lg hover:bg-green-800 focus:outline-none focus:border-green-500"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Guided Tour Component */}
      <GuidedTour
        steps={[
          {
            target: '#protocol-swap',
            title: "Welcome to Kaspa Portal",
            content: "This guided tour will help you explore the portal's features."
          },
          {
            target: '#protocol-swap',
            title: "Swap Tokens",
            content: "Exchange KAS for other cryptocurrencies instantly using our integrated swap feature."
          },
          {
            target: '#protocol-send',
            title: "Send Assets",
            content: "Securely send KAS or KRC-20 tokens to any Kaspa address."
          },
          {
            target: '#protocol-privacy',
            title: "Private Transactions",
            content: "Enable enhanced privacy features for anonymous transactions."
          },
          {
            target: '#protocol-tokens',
            title: "Manage Tokens",
            content: "Create and manage your KRC-20 tokens directly in the portal."
          },
          {
            target: '.bg-green-600', // Connect button
            title: "Wallet Connection",
            content: "Connect your Kasware or Kaspium wallet to access all features."
          },
          {
            target: '.absolute.w-32.h-32', // Central portal
            title: "Your Balance",
            content: "View your KAS balance and access the main portal controls here."
          },
          {
            target: '.absolute.bottom-0', // Bottom info panel
            title: "Account Info",
            content: "Quickly access your address, balance and network status here."
          }
        ]}
      />

      {/* Bottom info panel */}
      <div className="absolute bottom-0 w-full px-6 py-4">
        <div className="bg-black/70 backdrop-blur-sm border border-green-800 rounded-lg p-4 flex text-sm">
          {/* Address and Copy Button */}
          <div className="flex items-center space-x-2">
            <div className="text-white">
              Address:
              <span className="text-green-400 font-mono ml-1">
                {demoMode ? "kaspa...wallet" : `${address.substring(0, 10)}...${address.substring(address.length - 6)}`}
              </span>
            </div>
            {/* Improved Copy Button Feedback */}
            <button onClick={copyToClipboard} className="relative text-green-400 hover:text-green-200 transition-colors px-2" title="Copy address">
              <Copy size={14} />
              {copySuccess && (
                <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  {copySuccess}
                </span>
              )}
            </button>
          </div>

          {/* Balance - Increased Prominence */}
          <div className="text-white text-base ml-8">
            Balance: <span className="text-green-400 font-bold text-lg ml-1">
              {demoMode ? "50.0000 KAS (Demo)" : `${(balance.total / 100000000).toFixed(4)} KAS`}
            </span>
          </div>

          {/* Network Info */}
          <div className="text-center text-white ml-8">
            <Activity className="inline-block mr-2 text-green-300" size={16} />
            Network: <span className="text-green-400">
              {demoMode ? "mainnet" : network.replace('kaspa_', '')}
            </span>
          </div>

          {/* Status Info */}
          <div className="flex items-center ml-auto">
            <div className="w-12 h-12 rounded-full bg-green-900 border border-green-500 flex items-center justify-center text-white">
              <Zap size={20} />
            </div>
            <div className="ml-2">
              <div className="text-white">Status</div>
              <div className={`text-xs ${demoMode ? "text-yellow-400" : "text-green-400"}`}>
                {demoMode ? "Demo Mode" : "Connected"}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Analytics Overlay */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
          <div className="flex justify-end p-2">
            <button
              onClick={() => setShowAnalytics(false)}
              className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-600"
            >
              Close
            </button>
          </div>
          <div className="flex-grow overflow-auto p-4">
            {demoMode ? (
              <div className="text-center text-yellow-400 p-8">Connect wallet to view analytics.</div>
            ) : (
              <AnalyticsChartWrapper kasPrice={kasPrice} address={address} />
            )}
          </div>
        </div>
      )}

      {/* Define keyframes for animations */}
      <style jsx="true" global="true">{`
        @keyframes smoothDrift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(5px, 10px); }
          50% { transform: translate(10px, 5px); }
          75% { transform: translate(5px, -5px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes flowToCenter {
          0% { transform: rotate(var(--angle)) translateX(var(--distance)); opacity: 0; }
          50% { transform: rotate(var(--angle)) translateX(calc(var(--distance) * 0.5)); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(0); opacity: 0; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes rotate3D {
          0% { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: var(--base-opacity); }
          50% { opacity: calc(var(--base-opacity) * 1.5); }
          100% { opacity: var(--base-opacity); }
        }
        
        /* Button animation keyframes - for the sucking effect */
        @keyframes suckIn {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        /* Orbit animation */
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
        }
        
        /* Spin animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Ping animation */
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const AnalyticsChartWrapper = ({ kasPrice, address }) => {
  let data = [];
  try {
    if (address) {
      const key = `portfolioHistory_${address}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        data = parsed.map((entry) => ({
          date: new Date(entry.timestamp).toISOString(),
          value: entry.kasBalance / 100000000,
          usdValue: (entry.kasBalance / 100000000) * kasPrice,
        }));
      }
    }
  } catch (e) {
    data = [];
  }
  return <BlackPortfolioChart data={data} kasPrice={kasPrice} />;
};

export default Kasportal;
