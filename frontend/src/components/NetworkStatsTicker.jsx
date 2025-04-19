import { useEffect, useState } from 'react';

const defaultStats = [
  { label: 'TPS', value: 512 },
  { label: 'Block Height', value: 1892345 },
  { label: 'Difficulty', value: '2.34 P' },
  { label: 'KAS Price', value: '$0.042' },
  { label: 'Hashrate', value: '1.2 PH/s' },
  { label: 'Supply', value: '21,000,000,000' },
];

export default function NetworkStatsTicker({ kasPrice, setKasPrice }) {
  const [stats, setStats] = useState(defaultStats);
  const [offset, setOffset] = useState(0);

  // Simulate stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev =>
        prev.map(stat => {
          if (stat.label === 'TPS') {
            return { ...stat, value: Math.max(500, Math.round(500 + Math.random() * 30)) };
          }
          if (stat.label === 'Block Height') {
            return { ...stat, value: stat.value + 1 };
          }
          if (stat.label === 'KAS Price') {
            let price = parseFloat(stat.value.replace('$', ''));
            price += (Math.random() - 0.5) * 0.001;
            // Update parent KAS price state
            if (setKasPrice) setKasPrice(Number(price.toFixed(3)));
            return { ...stat, value: '$' + price.toFixed(3) };
          }
          return stat;
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [setKasPrice]);

  // Animate ticker movement
  useEffect(() => {
    const move = setInterval(() => {
      setOffset(o => (o - 1) % 1000);
    }, 30);
    return () => clearInterval(move);
  }, []);

  return (
    <div className="w-full bg-black border-t border-green-400/10 py-2 overflow-hidden relative z-20">
      <div
        className="whitespace-nowrap flex items-center text-green-300 font-mono text-sm"
        style={{
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {stats.map((stat, idx) => (
          <span key={stat.label} className="mx-8 flex items-center">
            <span className="font-bold text-green-400">{stat.label}:</span>
            <span className="ml-2">{stat.value}</span>
            {idx < stats.length - 1 && (
              <span className="mx-4 text-green-700">|</span>
            )}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {stats.map((stat, idx) => (
          <span key={stat.label + '-dup'} className="mx-8 flex items-center">
            <span className="font-bold text-green-400">{stat.label}:</span>
            <span className="ml-2">{stat.value}</span>
            {idx < stats.length - 1 && (
              <span className="mx-4 text-green-700">|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
