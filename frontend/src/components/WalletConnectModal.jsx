import { useState } from 'react';
import BlackPortfolioChart from './BlackPortfolioChart';

export default function WalletConnectModal({ open, onClose, onConnect, walletAddress, walletBalance }) {
  const [selected, setSelected] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const walletOptions = [
    { name: 'Kasware Extension', icon: '🧩', id: 'kasware' },
    { name: 'Ledger (Coming Soon)', icon: '🔒', id: 'ledger', disabled: true },
    { name: 'Trezor (Coming Soon)', icon: '🔐', id: 'trezor', disabled: true },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (id === 'kasware') {
      setConnecting(true);
      onConnect()
        .finally(() => setConnecting(false));
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-black rounded-xl shadow-2xl border border-green-400/20 p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-green-400 hover:text-green-200 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Connect Wallet</h2>
        <div className="space-y-4 mb-6">
          {walletOptions.map(opt => (
            <button
              key={opt.id}
              className={`w-full flex items-center px-4 py-3 rounded-lg border border-green-400/20 bg-black/60 text-white font-semibold text-lg transition-all duration-200
                ${selected === opt.id ? 'border-green-400 bg-green-400/10' : ''}
                ${opt.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400/10 hover:border-green-400'}
              `}
              onClick={() => !opt.disabled && handleSelect(opt.id)}
              disabled={opt.disabled || connecting}
            >
              <span className="mr-3 text-2xl">{opt.icon}</span>
              {opt.name}
              {connecting && selected === opt.id && (
                <span className="ml-auto animate-spin text-green-400">⏳</span>
              )}
            </button>
          ))}
        </div>
        {walletAddress && (
          <div className="mt-6 p-4 rounded-lg bg-green-400/10 border border-green-400/20">
            <div className="mb-2 text-green-300 font-mono text-xs truncate">Address: {walletAddress}</div>
            <div className="mb-2 text-green-400 font-bold text-lg transition-all duration-700">
              Balance: <AnimatedNumber value={walletBalance} /> KAS
            </div>
            <div className="mt-4">
              <div className="text-green-200 font-semibold mb-2">Mini Portfolio</div>
              <div className="bg-black/60 rounded-lg p-2">
                <BlackPortfolioChart balance={walletBalance} mini />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Animated number transition for balance
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value || 0);

  // Animate towards new value
  useState(() => {
    if (value === undefined || value === null) return;
    let frame;
    const animate = () => {
      setDisplay(prev => {
        if (Math.abs(prev - value) < 0.01) return value;
        return prev + (value - prev) * 0.2;
      });
      if (Math.abs(display - value) > 0.01) {
        frame = requestAnimationFrame(animate);
      }
    };
    animate();
    return () => frame && cancelAnimationFrame(frame);
    // eslint-disable-next-line
  }, [value]);

  return <span>{display.toFixed(2)}</span>;
}
