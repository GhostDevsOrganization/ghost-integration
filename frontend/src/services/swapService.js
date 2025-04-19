// src/services/changeNowService.js
import axios from 'axios';

// Mock data for development if backend isn't ready
const MOCK_AVAILABLE_CURRENCIES = [
  { name: 'Bitcoin', ticker: 'btc' },
  { name: 'Ethereum', ticker: 'eth' },
  { name: 'Kaspa', ticker: 'kaspa' },
  { name: 'Litecoin', ticker: 'ltc' },
  { name: 'USD Coin', ticker: 'usdc' }
];

// API Service class
class SwapService { // Renamed class
  constructor() {
    // Swap Service configuration (using backend proxy or full API URL)
    // Use environment variable for API base URL in production, fallback to proxy for local dev
    this.baseUrl = process.env.REACT_APP_API_URL || '/api/changenow'; // Use full backend URL in production
    this.apiKey = process.env.REACT_APP_SWAP_API_KEY; // API key for your backend authentication

    // Set to false to use live data via the backend
    this.useMock = false; // Disabled mock data to use real backend API
  }

  // Get available currencies
  async getAvailableCurrencies(fixedRate = false) {
    if (this.useMock) {
      return MOCK_AVAILABLE_CURRENCIES;
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/currencies${fixedRate ? '?fixedRate=true' : ''}`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw this.handleError(error);
    }
  }

  // Get minimum amount for exchange
  async getMinAmount(fromCurrency, toCurrency) {
    if (this.useMock) {
      return {
        minAmount: fromCurrency === 'btc' ? 0.001 : 1,
        networkFee: 0.01
      };
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/min-amount/${fromCurrency}/${toCurrency}`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching minimum amount:', error);
      throw this.handleError(error);
    }
  }

  // Get exchange estimate
  async getEstimate(params) {
    if (this.useMock) {
      const { fromCurrency, toCurrency, amount } = params;
      const mockRate = toCurrency === 'kaspa' ? 10000 : 0.0001;
      const estimatedAmount = parseFloat(amount) * mockRate;
      
      return {
        estimatedAmount,
        rate: mockRate.toString(),
        networkFee: 0.01,
        transactionSpeedForecast: '5-20',
        warningMessage: null
      };
    }

    try {
      const { fromCurrency, toCurrency, amount, fixedRate } = params;
      const response = await axios.post(
        `${this.baseUrl}/estimate`,
        {
          fromCurrency,
          toCurrency,
          amount,
          fixedRate
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching estimate:', error);
      throw this.handleError(error);
    }
  }

  // Create exchange transaction
  async createTransaction(data) {
    if (this.useMock) {
    // Generate realistic-looking mock transaction data
    const mockId = `mock-${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`;
    const payinAddress = `bc1q${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
    
    return {
      id: mockId,
      payinAddress: payinAddress,
        payoutAddress: data.address,
        fromCurrency: data.from,
        toCurrency: data.to,
        amount: data.amount,
        status: 'waiting',
        flow: data.flow
      };
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/transaction`,
        data,
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw this.handleError(error);
    }
  }

  // Get transaction status
  async getTransactionStatus(id) {
    if (this.useMock) {
      return {
        id,
        payinAddress: '0x123...mock456',
        payoutAddress: '0xabc...mock789',
        fromCurrency: 'btc',
        toCurrency: 'kaspa',
        amount: '0.1',
        status: 'waiting',
        flow: 'standard'
      };
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/${id}/status`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction status:', error);
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      return new Error(`Error ${status}: ${data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error('Error setting up the request');
    }
  }
}

// Create a singleton instance
export const swapService = new SwapService(); // Renamed instance
