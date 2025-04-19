const axios = require('axios');
require('dotenv').config();

const CHANGENOW_API_KEY = process.env.CHANGENOW_API_KEY || 'bac48ddfc5bf69b7a6a515bbfa785ea4888582ddd4bf3e88639faa8f30a335ef';
const BASE_URL = 'https://api.changenow.io/v1';

async function testChangeNowAPI() {
  try {
    console.log('Testing ChangeNow API connection...');
    
    // Test getting available currencies
    const currenciesResponse = await axios.get(`${BASE_URL}/currencies?active=true`, {
      headers: {
        'x-api-key': CHANGENOW_API_KEY
      }
    });
    console.log('Available currencies:', currenciesResponse.data.slice(0, 5));

    // Test getting exchange estimate for USD to KAS
    console.log('\nTesting USD to KAS exchange rate...');
    // Using the standard exchange endpoint instead of fixed-rate
    const estimateResponse = await axios.get(
      `${BASE_URL}/exchange-amount/standard/usd/kas/100`, {
      headers: {
        'x-api-key': CHANGENOW_API_KEY
      }
    });
    console.log('\nExchange estimate:', estimateResponse.data);

    // Also test minimum amount
    console.log('\nTesting minimum amount...');
    const minAmountResponse = await axios.get(
      `${BASE_URL}/min-amount/usd/kas`, {
      headers: {
        'x-api-key': CHANGENOW_API_KEY
      }
    });
    console.log('Minimum amount:', minAmountResponse.data);

  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
  }
}

(async () => {
  try {
    await testChangeNowAPI();
  } catch (error) {
    console.error('Uncaught error:', error);
  }
})();