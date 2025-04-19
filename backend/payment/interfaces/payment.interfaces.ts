export interface ApplePayStatus {
    isAvailable: boolean;
    supportedCards: string[];
  }
  
  export interface PaymentResponse {
    id: string;
    status: string;
    amount: number;
    currency: string;
    processingTime: number;
  }
  
  export interface KasConversionRate {
    rate: number;
    timestamp: number;
  }
  
  export interface KasPurchaseResponse {
    id: string;
    status: string;
    fiatAmount: number;
    kasAmount: number;
    estimatedTime: string;
  }
  
  export interface PaymentStatusResponse {
    status: string;
    timestamp: number;
  }