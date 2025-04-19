import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChangeNowService } from '../changenow/changenow.service';
import axios, { AxiosError } from 'axios';

interface PaymentError extends Error {
  message: string;
}

@Injectable()
export class PaymentService {
  constructor(
    private configService: ConfigService,
    private changeNowService: ChangeNowService
  ) {}

async processCardPayment(paymentData: any) {
try {
    const result = await this.processPayment(paymentData);
    if (!result.success) {
    throw new Error('Card payment processing failed');
    }
    return result;
} catch (error: unknown) {
    const paymentError = error as PaymentError;
    throw new HttpException(
    paymentError.message || 'Card payment processing failed',
    HttpStatus.INTERNAL_SERVER_ERROR
    );
}
}

async getKasConversionRate(fromCurrency: string = 'usd', amount: string = '1') {
try {
    const estimate = await this.changeNowService.getEstimate(fromCurrency, 'kas', amount);
    return {
    rate: estimate.rate,
    estimatedAmount: estimate.estimatedAmount
    };
} catch (error) {
    throw new HttpException(
    'Failed to get KAS conversion rate',
    HttpStatus.INTERNAL_SERVER_ERROR
    );
}
}

async processKasPurchase(purchaseData: { paymentData: any; kaspaAddress: string; amount: string }) {
    try {
      // 1. First get the estimate from ChangeNow
      const estimate = await this.changeNowService.getEstimate('usd', 'kas', purchaseData.amount);
      
      // Process card payment
      const paymentResult = await this.processCardPayment(purchaseData.paymentData);
      
      if (!paymentResult.success) {
        throw new Error('Payment failed');
      }

      // 3. Create ChangeNow transaction for USD to KAS
      const transaction = await this.changeNowService.createTransaction({
        from: 'usd',
        to: 'kas',
        amount: purchaseData.amount,
        address: purchaseData.kaspaAddress,
        flow: 'standard'
      });

      return {
        success: true,
        transactionId: transaction.id,
        estimatedKaspaAmount: estimate.estimatedAmount,
        paymentId: paymentResult.id
      };
    } catch (error: unknown) {
      const paymentError = error as PaymentError;
      throw new HttpException(
        paymentError.message || 'Payment processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async processPayment(paymentData: any) {
    // In production, implement actual payment processing
    // This is a mock implementation
    return {
      success: true,
      id: `payment-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  }

async getKasPurchaseStatus(transactionId: string) {
return this.changeNowService.getTransactionStatus(transactionId);
}
}
