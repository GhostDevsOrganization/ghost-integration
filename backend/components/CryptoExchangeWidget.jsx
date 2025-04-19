import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CryptoExchangeWidget = () => {
  const [kaspaAddress, setKaspaAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exchangeData, setExchangeData] = useState(null);

  const API_KEY = process.env.CHANGENOW_API_KEY;
  const API_URL = process.env.CHANGENOW_API_URL;
  const FROM_CURRENCY = 'btc';
  const TO_CURRENCY = 'kas';

  const createExchange = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          from: FROM_CURRENCY,
          to: TO_CURRENCY,
          address: kaspaAddress,
          amount: amount,
          flow: 'standard'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create exchange');
      }

      setExchangeData(data);
    } catch (err) {
      setError(err.message);
      console.error('Exchange error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kaspaAddress || !amount) {
      setError('Please fill in all fields');
      return;
    }
    createExchange();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BTC to Kaspa Exchange</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Kaspa Wallet Address
            </label>
            <Input
              type="text"
              value={kaspaAddress}
              onChange={(e) => setKaspaAddress(e.target.value)}
              placeholder="Enter your Kaspa wallet address"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Amount (BTC)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.00000001"
              min="0"
              className="w-full"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {exchangeData && (
            <Alert>
              <AlertDescription>
                Please send {exchangeData.amountFrom} BTC to address: {exchangeData.payinAddress}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Exchange...' : 'Exchange BTC to Kaspa'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CryptoExchangeWidget;