import React from 'react';
import { Icon } from './icons/IconRegistry';

const IconSwapComparison = () => {
  const beforeAfter = [
    {
      section: 'Core Features',
      items: [
        { key: 'wallet', before: 'wallet', after: 'payment', label: 'Multi-Wallet Support' },
        { key: 'trading', before: 'swap', after: 'ai', label: 'Instant Swaps' },
        { key: 'learning', before: 'learn', after: 'docs', label: 'Learning Hub' },
        { key: 'crosschain', before: 'crosschain', after: 'mobile', label: 'Cross-Chain Bridge' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Icon Swap Success!
        </h2>
        <p className="text-gray-600">
          See how easy it was to swap all icons by editing just one file
        </p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
          <Icon name="ai" size={16} className="text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            All icons swapped in 5 seconds!
          </span>
        </div>
      </div>

      {beforeAfter.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {section.section}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.items.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  {item.label}
                </h4>
                
                {/* Before */}
                <div className="mb-4">
                  <div className="text-center mb-2">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Before</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-red-200">
                    <div className="text-center">
                      <Icon name={item.before} size={32} className="mx-auto mb-2" />
                      <p className="text-xs text-gray-600 font-mono">{item.before}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="text-center mb-2">
                    <span className="text-xs text-green-600 font-medium uppercase tracking-wide">After</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-200">
                    <div className="text-center">
                      <Icon name={item.after} size={32} className="mx-auto mb-2" />
                      <p className="text-xs text-gray-600 font-mono">{item.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Code Change Display */}
      <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4 text-center">
          The Only Code Change Needed
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm text-red-300 font-medium mb-2 uppercase tracking-wide">❌ Before</h4>
            <pre className="bg-red-900 bg-opacity-30 p-4 rounded-lg text-sm overflow-x-auto">
{`coreFeatures: {
  wallet: 'wallet',
  trading: 'swap',
  learning: 'learn',
  crosschain: 'crosschain',
}`}
            </pre>
          </div>
          <div>
            <h4 className="text-sm text-green-300 font-medium mb-2 uppercase tracking-wide">✅ After</h4>
            <pre className="bg-green-900 bg-opacity-30 p-4 rounded-lg text-sm overflow-x-auto">
{`coreFeatures: {
  wallet: 'payment',    // Changed!
  trading: 'ai',        // Changed!
  learning: 'docs',     // Changed!
  crosschain: 'mobile', // Changed!
}`}
            </pre>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-300">
            <strong>That's it!</strong> One file edit = All icons swapped across your entire app
          </p>
        </div>
      </div>

      {/* Benefits Highlight */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Icon name="ai" size={32} className="mx-auto mb-3" />
          <h4 className="font-semibold text-blue-900 mb-2">Lightning Fast</h4>
          <p className="text-sm text-blue-700">Swap any icon in under 5 seconds</p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Icon name="docs" size={32} className="mx-auto mb-3" />
          <h4 className="font-semibold text-green-900 mb-2">One File Edit</h4>
          <p className="text-sm text-green-700">No hunting through components</p>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <Icon name="mobile" size={32} className="mx-auto mb-3" />
          <h4 className="font-semibold text-purple-900 mb-2">Theme Support</h4>
          <p className="text-sm text-purple-700">Switch entire icon sets instantly</p>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-4 bg-yellow-50 px-6 py-3 rounded-xl border border-yellow-200">
          <Icon name="payment" size={20} className="text-yellow-600" />
          <span className="text-yellow-800 font-medium">
            Want to revert? Just change the config back to the original values!
          </span>
        </div>
      </div>
    </div>
  );
};

export default IconSwapComparison;
