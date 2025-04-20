import React from 'react';

const TransactionHistory = () => {
  // Mock transaction data
  const transactions = [
    { type: 'Send', amount: -120, token: 'KAS', timestamp: '1 hour ago', address: 'kaspa:qz...8fj2' },
    { type: 'Receive', amount: 250, token: 'KAS', timestamp: '3 hours ago', address: 'kaspa:pr...m5n1' },
    { type: 'Mint', amount: 1000, token: 'KRC-20', timestamp: '1 day ago', address: 'kaspa:tr...k3p7' },
  ];

  return (
    <div className="bg-black/30 border border-green-800/50 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold text-green-300 mb-4">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-green-400 text-sm">
              <th className="pb-2">Type</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Token</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-t border-green-800/30">
                <td className="py-3 text-white">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${tx.type === 'Receive' ? 'bg-green-500/20 text-green-300' :
                      tx.type === 'Send' ? 'bg-red-500/20 text-red-300' :
                        'bg-blue-500/20 text-blue-300'
                    }`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-3 ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </td>
                <td className="py-3 text-white">{tx.token}</td>
                <td className="py-3 text-gray-400 text-sm">{tx.timestamp}</td>
                <td className="py-3 text-gray-400 font-mono text-xs">{tx.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div >
  );
};

export default TransactionHistory;
