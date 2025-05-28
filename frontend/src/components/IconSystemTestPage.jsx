import React, { useState } from 'react';
import { Icon, availableIcons } from './icons/IconRegistry';
import { getIcon, iconThemes } from '../config/iconConfig';
import IconSwapDemo from './IconSwapDemo';
import EnhancedCoreFeatures from './EnhancedCoreFeatures';

const IconSystemTestPage = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                🎯 Enhanced Icon System
              </h1>
              <p className="text-blue-100">
                The most flexible icon management system ever built
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Icon name="ai" size={48} className="text-white" />
              <Icon name="swap" size={48} className="text-white" />
              <Icon name="wallet" size={48} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <Icon name="swap" size={32} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{availableIcons.length}</h3>
              <p className="text-blue-700">Available Icons</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <Icon name="mobile" size={32} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">4</h3>
              <p className="text-green-700">Built-in Themes</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Icon name="contract" size={32} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">1</h3>
              <p className="text-purple-700">File to Edit</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <Icon name="ai" size={32} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-orange-900">5s</h3>
              <p className="text-orange-700">Swap Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Switcher Demo */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Theme Switching Demo
            </h2>
            <p className="text-gray-600">
              See how different themes change the icon mappings instantly
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Theme
                </label>
                <select
                  value={currentTheme}
                  onChange={(e) => setCurrentTheme(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(iconThemes).map(theme => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {['wallet', 'trading', 'learning', 'crosschain'].map(iconKey => {
                  const iconName = iconThemes[currentTheme]?.coreFeatures?.[iconKey] || iconKey;
                  return (
                    <div key={iconKey} className="text-center p-4 bg-gray-50 rounded-lg">
                      <Icon name={iconName} size={32} className="mx-auto mb-2" />
                      <p className="text-xs text-gray-600 font-mono">{iconKey}</p>
                      <p className="text-xs text-gray-500">→ {iconName}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>💡 How it works:</strong> Change <code>currentTheme = '{currentTheme}'</code> in iconConfig.js to switch all icons at once!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Icons Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Available Icons
            </h2>
            <p className="text-gray-600">
              Click any icon name to copy it to your clipboard
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {availableIcons.map(iconName => (
              <div
                key={iconName}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                onClick={() => {
                  navigator.clipboard.writeText(iconName);
                  // You could add a toast notification here
                }}
                title={`Click to copy: ${iconName}`}
              >
                <div className="text-center">
                  <Icon name={iconName} size={32} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-600 font-mono truncate">
                    {iconName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Toggle */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Try the Interactive Demo
          </h2>
          <p className="text-blue-100 mb-6">
            See the icon system in action with our interactive demo
          </p>
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Icon name="swap" size={20} className="text-blue-600" />
            <span>{showDemo ? 'Hide Demo' : 'Show Interactive Demo'}</span>
          </button>
        </div>
      </section>

      {/* Interactive Demo */}
      {showDemo && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <IconSwapDemo />
          </div>
        </section>
      )}

      {/* Enhanced Core Features Example */}
      <EnhancedCoreFeatures />

      {/* Quick Start Guide */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Quick Start Guide
            </h2>
            <p className="text-gray-300">
              Get started with the Enhanced Icon System in 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Import the Icon</h3>
              <pre className="bg-gray-800 p-3 rounded text-sm text-left">
{`import { Icon } from './icons/IconRegistry';

<Icon name="wallet" size={24} />`}
              </pre>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Edit the Config</h3>
              <pre className="bg-gray-800 p-3 rounded text-sm text-left">
{`// iconConfig.js
coreFeatures: {
  wallet: 'payment', // Changed!
}`}
              </pre>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">See the Magic</h3>
              <div className="bg-gray-800 p-3 rounded text-center">
                <Icon name="payment" size={32} className="text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">All wallet icons are now payment icons!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Icon name="ai" size={24} />
            <span className="text-lg font-semibold">Enhanced Icon System</span>
            <Icon name="swap" size={24} />
          </div>
          <p className="text-gray-400">
            Making icon management effortless, one swap at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IconSystemTestPage;
