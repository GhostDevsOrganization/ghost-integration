import React from 'react';
import { Icon } from './icons/IconRegistry';
import { getIcon } from '../config/iconConfig';

const EnhancedCoreFeatures = () => {
  const features = [
    {
      iconName: getIcon('coreFeatures', 'wallet'),
      title: "Multi-Wallet Support",
      description: "Connect with Kasware, MetaMask, and other popular wallets seamlessly",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      iconName: getIcon('coreFeatures', 'trading'),
      title: "Instant Swaps",
      description: "Lightning-fast cryptocurrency exchanges with real-time rates",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      iconName: getIcon('coreFeatures', 'crosschain'),
      title: "Cross-Chain Bridge",
      description: "Move assets across different blockchains effortlessly",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      iconName: getIcon('coreFeatures', 'learning'),
      title: "Learning Hub",
      description: "Master DeFi with our comprehensive educational resources",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of decentralized finance with our comprehensive suite of tools
          </p>
          
          {/* Icon Swap Indicator */}
          <div className="mt-6 inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <Icon name="swap" size={16} />
            <span className="text-sm text-blue-700 font-medium">
              Icons powered by Enhanced Icon System
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon with gradient background */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 flex items-center justify-center`}>
                    <Icon name={feature.iconName} size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Action button with icon */}
                <div className="mt-6">
                  <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    <span>Learn More</span>
                    <Icon name={getIcon('actions', 'learn')} size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Icon name="ai" size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              🎯 Icon Swapping Made Easy
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Want to change the wallet icon to a payment icon? Just edit one line in iconConfig.js!
            </p>
            
            {/* Code example */}
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-left max-w-md mx-auto">
              <pre className="text-sm text-green-300">
{`// iconConfig.js
coreFeatures: {
  wallet: 'payment', // Changed!
  trading: 'ai',     // Changed!
  // ...
}`}
              </pre>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Icon name="swap" size={16} />
                <span className="text-sm">Easy Swapping</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Icon name="mobile" size={16} />
                <span className="text-sm">Theme Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Icon name="contract" size={16} />
                <span className="text-sm">Type Safety</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Icon Mapping Display */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Current Icon Mapping
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-2">
                  <Icon name={feature.iconName} size={32} />
                </div>
                <p className="text-xs text-gray-600 font-mono">
                  {feature.iconName}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Change any of these by editing <code className="bg-gray-200 px-2 py-1 rounded">iconConfig.js</code>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCoreFeatures;
