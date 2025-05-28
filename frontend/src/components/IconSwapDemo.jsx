import React, { useState } from 'react';
import { Icon, availableIcons } from './icons/IconRegistry';
import { getIcon } from '../config/iconConfig';

const IconSwapDemo = () => {
  const [selectedSection, setSelectedSection] = useState('coreFeatures');
  const [selectedIcon, setSelectedIcon] = useState('wallet');
  const [previewIcon, setPreviewIcon] = useState('wallet');

  const sections = {
    coreFeatures: ['wallet', 'trading', 'learning', 'crosschain'],
    navigation: ['home', 'swap', 'learn', 'wallet'],
    roadmap: ['q2_2025', 'q3_2025', 'q4_2025', 'q1_2026'],
    actions: ['primary', 'secondary', 'learn']
  };

  const currentIconName = getIcon(selectedSection, selectedIcon);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 Icon Swap Demo
        </h2>
        <p className="text-gray-600">
          See how easy it is to swap icons! Change any icon by updating the config.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Icon Display */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Current Icon</h3>
          <div className="text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-4 inline-block">
              <Icon name={currentIconName} size={64} />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Section: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedSection}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Key: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedIcon}</span>
            </p>
            <p className="text-sm text-gray-600">
              Icon: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{currentIconName}</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setSelectedIcon(sections[e.target.value][0]);
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(sections).map(section => (
                <option key={section} value={section}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Icon Key
            </label>
            <select
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sections[selectedSection].map(iconKey => (
                <option key={iconKey} value={iconKey}>
                  {iconKey}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 How to Swap</h4>
            <p className="text-sm text-yellow-700 mb-3">
              To change this icon, edit <code className="bg-yellow-100 px-1 rounded">iconConfig.js</code>:
            </p>
            <pre className="bg-yellow-100 p-3 rounded text-xs overflow-x-auto">
{`${selectedSection}: {
  ${selectedIcon}: '${currentIconName}', // ← Change this!
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Available Icons Grid */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Icons</h3>
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {availableIcons.map(iconName => (
            <div
              key={iconName}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                previewIcon === iconName 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPreviewIcon(iconName)}
              title={iconName}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={iconName} size={24} />
                <span className="text-xs text-gray-600 text-center truncate w-full">
                  {iconName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Selected Icon */}
      {previewIcon && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <Icon name={previewIcon} size={32} />
            <div>
              <p className="font-medium">Preview: {previewIcon}</p>
              <p className="text-sm text-gray-600">
                Copy this name to iconConfig.js to use this icon
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">✅ Easy Swap</h4>
          <p className="text-sm text-green-700">
            Change <code>wallet: 'wallet'</code> to <code>wallet: 'payment'</code>
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">🎨 Theme Switch</h4>
          <p className="text-sm text-blue-700">
            Change <code>currentTheme = 'default'</code> to <code>'business'</code>
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-2">🔄 Bulk Swap</h4>
          <p className="text-sm text-purple-700">
            Use <code>swapIcons('wallet', 'payment')</code> function
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconSwapDemo;
