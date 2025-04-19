import React, { useState } from 'react';

const faqData = [
  {
    category: "Interdimensional Portal Features",
    items: [
      { question: "What is the Interdimensional Portal?", answer: "The portal is your gateway to advanced Kaspa blockchain features, including token management, analytics, and privacy tools." },
      { question: "How do I connect my wallet?", answer: "Click 'Connect Wallet' and follow the prompts to link your Kasware or compatible wallet." },
      { question: "How do I check my KAS and KRC-20 token balances?", answer: "Once your wallet is connected, your balances are displayed in the portal dashboard." },
      { question: "How do I swap tokens?", answer: "Use the 'Swap' protocol to exchange KAS for other tokens or vice versa." },
      { question: "How do I send KAS or KRC-20 tokens?", answer: "Select the 'Send' protocol, enter the recipient's address and amount, and confirm the transaction." },
      { question: "How do I deploy a new KRC-20 token?", answer: "Use the 'Deploy' feature, set your token's ticker, supply, and limit, then confirm the deployment with your wallet." },
      { question: "How do I mint more of my KRC-20 token?", answer: "Use the 'Mint' feature, select your token, and specify the amount to mint." },
      { question: "How do I transfer KRC-20 tokens?", answer: "Use the 'Transfer' feature, select the token, enter the recipient's address and amount, and confirm." },
      { question: "How do I use privacy features?", answer: "Enable 'Enhanced Privacy' when sending KAS to increase transaction privacy." },
      { question: "How do I view analytics and portfolio history?", answer: "Open the 'Analytics' panel to see your portfolio performance and transaction history over time." },
      { question: "What wallets are supported?", answer: "Kasware and other compatible wallets are supported. Multi-wallet support is planned for the future." },
      { question: "What if my wallet is not detected?", answer: "Ensure your wallet extension is installed and unlocked, then refresh the page." },
    ],
  },
  {
    category: "What is Kaspa?",
    items: [
      { question: "What is Kaspa?", answer: "Kaspa is the fastest UTXO-based Layer 1 blockchain." },
      { question: "What makes Kaspa unique?", answer: "Kaspa offers high scalability and security with a unique blockDAG structure." },
    ],
  },
];

export default function FAQModal({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-black rounded-lg max-w-3xl w-full max-h-full overflow-auto p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-600 text-xl font-bold"
            aria-label="Close FAQ"
          >
            ×
          </button>
        </div>
        {faqData.map(({ category, items }) => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left text-lg font-semibold text-green-400 hover:text-green-600 focus:outline-none"
              aria-expanded={expandedCategory === category}
            >
              {category}
            </button>
            {expandedCategory === category && (
              <ul className="mt-2 pl-4 list-disc space-y-2 text-green-200">
                {items.map(({ question, answer }, idx) => (
                  <li key={idx}>
                    <p className="font-semibold">{question}</p>
                    <p>{answer}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}