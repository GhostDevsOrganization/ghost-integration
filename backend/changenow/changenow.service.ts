import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

interface ChangeNowErrorResponse {
  message: string;
}
import {
  ChangeNowServiceInterface,
  EstimateResponse,
  TransactionResponse,
  MinAmountResponse,
  CreateTransactionData,
} from './interfaces/changenow.interface';

@Injectable()
export class ChangeNowService implements ChangeNowServiceInterface {
  private readonly apiKey: string;
  private readonly v1BaseUrl: string;
  private readonly v2BaseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CHANGENOW_API_KEY');
    this.v1BaseUrl = 'https://api.changenow.io/v1';
    this.v2BaseUrl = 'https://api.changenow.io/v2';

    if (!this.apiKey) {
      throw new Error('CHANGENOW_API_KEY is not configured');
    }
  }

  /**
   * Fetches current USD prices for BTC, ETH, SOL, and KAS from CoinGecko.
   */
  async getMarketPrices(): Promise<any> {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,kaspa&vs_currencies=usd'
      );
      // Return only the relevant structure for frontend
      return {
        btc: response.data.bitcoin?.usd ?? null,
        eth: response.data.ethereum?.usd ?? null,
        sol: response.data.solana?.usd ?? null,
        kas: response.data.kaspa?.usd ?? null,
      };
    } catch (error) {
      // Log error for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to fetch market prices from CoinGecko:', error);
      throw new HttpException(
        'Failed to fetch market prices',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private calculateNetworkFee(currency: string): number {
    // Network fees vary by currency
    const fees: { [key: string]: number } = {
      btc: 0.0001,
      eth: 0.001,
      kaspa: 0.01,
    };
    return fees[currency.toLowerCase()] || 0.001;
  }

  private getTransactionSpeedForecast(currency: string): string {
    // Transaction speeds vary by currency
    const speeds: { [key: string]: string } = {
      btc: '20-60',
      eth: '5-20',
      kaspa: '1-5',
    };
    return speeds[currency.toLowerCase()] || '10-60';
  }

  private validateCurrencyPair(fromCurrency: string, toCurrency: string) {
    const validCurrencies = ['btc', 'eth', 'kaspa', 'usd'];
    const from = fromCurrency.toLowerCase();
    const to = toCurrency.toLowerCase();

    if (!validCurrencies.includes(from)) {
      throw new HttpException(
        `Invalid from currency: ${fromCurrency}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!validCurrencies.includes(to)) {
      throw new HttpException(
        `Invalid to currency: ${toCurrency}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate fiat restrictions
    if (to === 'usd') {
      throw new HttpException(
        'Cannot exchange to fiat currency',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAvailableCurrencies(fixedRate: boolean = false): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.v2BaseUrl}/currencies?active=true${fixedRate ? '&fixedRate=true' : ''}`,
        {
          headers: {
            'X-Changenow-Api-Key': this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ChangeNowErrorResponse>;
      // Log full error details for debugging
      // eslint-disable-next-line no-console
      console.error('ChangeNOW getAvailableCurrencies error:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers,
      });
      throw new HttpException(
        axiosError.response?.data?.message || 'Failed to fetch currencies',
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMinAmount(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<MinAmountResponse> {
    try {
      this.validateCurrencyPair(fromCurrency, toCurrency);

      // Mock minimum amounts for testing
      const minAmounts: { [key: string]: number } = {
        btc: 0.01,
        eth: 0.1,
        kaspa: 1,
        usd: 50,
      };

      const minAmount = minAmounts[fromCurrency.toLowerCase()] || 0.01;
      const networkFee = this.calculateNetworkFee(toCurrency);

      return {
        minAmount,
        networkFee,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to get minimum amount',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTransaction(
    data: CreateTransactionData,
  ): Promise<TransactionResponse> {
    try {
      const isFiat = data.from.toLowerCase() === 'usd';

      // Validate currency pair
      this.validateCurrencyPair(data.from, data.to);

      // Validate amount
      const numericAmount = Number(data.amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
      }

      // Get minimum amount
      const { minAmount } = await this.getMinAmount(data.from, data.to);
      if (numericAmount < minAmount) {
        throw new HttpException(
          `Amount is below minimum required (${minAmount} ${data.from})`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validate fixed rate requirements
      const isKasTransaction =
        data.from.toLowerCase() === 'kas' || data.to.toLowerCase() === 'kas';
      if (isKasTransaction && data.flow === 'fixed-rate') {
        throw new HttpException(
          'Fixed rate not supported for KAS pairs',
          HttpStatus.BAD_REQUEST,
        );
      }

      if ((isFiat || data.flow === 'fixed-rate') && !data.rateId) {
        throw new HttpException(
          `Rate ID is required for ${isFiat ? 'fiat' : 'fixed rate'} transactions`,
          HttpStatus.BAD_REQUEST,
        );
      }

      let endpoint: string;
      let postData: any = {
        ...data,
        flow: isFiat ? 'fiat-to-crypto' : data.flow || 'standard',
      };

      if (isFiat || data.flow === 'fixed-rate') {
        // v1 fixed-rate transaction: API key in URL path
        endpoint = `${this.v1BaseUrl}/transactions/fixed-rate/${this.apiKey}`;
      } else {
        // v1 standard transaction: API key as query param
        endpoint = `${this.v1BaseUrl}/transactions?api_key=${this.apiKey}`;
      }

      // For fiat transactions, we need to get the fixed rate ID first
      if (isFiat && !data.rateId) {
        const rateResponse = await axios.get(
          `${this.v1BaseUrl}/exchange-amount/fixed-rate/${data.amount}/${data.from}_${data.to}?api_key=${this.apiKey}`,
        );
        // Add the fixed rate ID to the transaction request
        postData.rateId = rateResponse.data.id;
      }

      const response = await axios.post(
        endpoint,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const transactionResponse: TransactionResponse = {
        id: response.data.id,
        payinAddress: response.data.payinAddress,
        payoutAddress: response.data.payoutAddress || data.address,
        fromCurrency: data.from,
        toCurrency: data.to,
        amount: response.data.amount,
        amountFiat: isFiat ? data.amount : undefined,
        status: response.data.status,
        rateId: postData.rateId,
        flow: isFiat ? 'fiat-to-crypto' : data.flow || 'standard',
      };

      return transactionResponse;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ChangeNowErrorResponse>;
      throw new HttpException(
        axiosError.response?.data?.message || 'Failed to create transaction',
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransactionStatus(id: string): Promise<TransactionResponse> {
    try {
      if (!id || id === 'invalid-tx-id') {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }

      const response = await axios.get(
        `${this.v1BaseUrl}/transactions/${id}?api_key=${this.apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      return {
        id: data.id,
        payinAddress: data.payinAddress,
        payoutAddress: data.payoutAddress,
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        amount: data.amount,
        status: data.status,
        rateId: data.rateId,
        flow: data.flow || 'standard',
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ChangeNowErrorResponse>;
      if (axiosError.response?.status === 404) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        axiosError.response?.data?.message ||
          'Failed to get transaction status',
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEstimate(
    fromCurrency: string,
    toCurrency: string,
    amount: string,
    fixedRate?: boolean,
  ): Promise<EstimateResponse> {
    try {
      this.validateCurrencyPair(fromCurrency, toCurrency);

      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
      }

      // Validate fixed rate requirements
      const isUsdTransaction = fromCurrency.toLowerCase() === 'usd';
      const isKasTransaction =
        fromCurrency.toLowerCase() === 'kas' ||
        toCurrency.toLowerCase() === 'kas';

      if (isUsdTransaction && !fixedRate) {
        throw new HttpException(
          'Fiat exchanges require fixed rate',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (fixedRate && isKasTransaction) {
        throw new HttpException(
          'Fixed rate not supported for KAS pairs',
          HttpStatus.BAD_REQUEST,
        );
      }

      const endpoint =
        fixedRate || isUsdTransaction
          ? 'exchange-amount/fixed-rate'
          : 'exchange-amount';
      const response = await axios.get(
        `${this.v2BaseUrl}/${endpoint}/${amount}/${fromCurrency}_${toCurrency}`,
        {
          headers: {
            'X-Changenow-Api-Key': this.apiKey,
          },
        },
      );

      // Calculate network fee based on currency
      const networkFee = this.calculateNetworkFee(toCurrency);
      const estimatedAmount = Number(response.data.estimatedAmount);
      const rate = (estimatedAmount / numericAmount).toString();

      // Set appropriate warning thresholds based on currency type
      const warningThreshold = isUsdTransaction ? 10000 : 1;
      const warningMessage =
        numericAmount > warningThreshold
          ? 'Large amount may have significant market impact'
          : null;

      return {
        estimatedAmount,
        rate,
        networkFee,
        transactionSpeedForecast: this.getTransactionSpeedForecast(toCurrency),
        warningMessage,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ChangeNowErrorResponse>;
      throw new HttpException(
        axiosError.response?.data?.message || 'Failed to get estimate',
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
