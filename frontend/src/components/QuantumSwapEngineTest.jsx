import React, { useState } from 'react';
import QuantumSwapEngine from './QuantumSwapEngine';

const QuantumSwapEngineTest = () => {
    const [loading, setLoading] = useState(false);
    const [widgetConfig] = useState({
        from: 'btc',
        to: 'kas',
        amount: '0.01',
        backgroundColor: '1a1a1a',
        darkMode: true,
        primaryColor: '2DD4BF',
        textColor: 'ffffff'
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Quantum Swap Engine Test</h1>
            <div className="max-w-4xl mx-auto">
                <QuantumSwapEngine 
                    widgetConfig={widgetConfig}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
};

export default QuantumSwapEngineTest;