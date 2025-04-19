export interface EstimateResponse {
  estimatedAmount: number;
  rate: string;
  networkFee: number;
  transactionSpeedForecast: string;
  warningMessage?: string | null;
}

export type TransactionFlow = 'standard' | 'fiat-to-crypto' | 'fixed-rate';

export interface CreateTransactionData {
  from: string;
  to: string;
  address: string;
  amount: string;
  flow?: TransactionFlow;
  rateId?: string;
  type?: 'fiat-to-crypto' | 'crypto-to-crypto';
}

export interface TransactionResponse {
  id: string;
  payinAddress?: string;  // Optional for fiat transactions
  payoutAddress: string;
  fromCurrency: string;
  toCurrency: string;
  amount?: string;
  amountFiat?: string;
  status?: string;
  rateId?: string;
  flow?: TransactionFlow;
}

export interface MinAmountResponse {
  minAmount: number;
  networkFee: number;
}

export interface ChangeNowServiceInterface {
  getAvailableCurrencies(fixedRate?: boolean): Promise<any[]>;
  getMinAmount(fromCurrency: string, toCurrency: string): Promise<MinAmountResponse>;
  createTransaction(data: CreateTransactionData): Promise<TransactionResponse>;
  getTransactionStatus(id: string): Promise<TransactionResponse>;
  getEstimate(fromCurrency: string, toCurrency: string, amount: string): Promise<EstimateResponse>;
}
