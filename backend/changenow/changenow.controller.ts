import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Headers, 
  HttpStatus, 
  HttpException, 
  HttpCode,
  Query
} from '@nestjs/common';
import { ChangeNowService } from './changenow.service';

@Controller('changenow')
export class ChangeNowController {
  constructor(private readonly changenowService: ChangeNowService) {}

  @Get('currencies')
  async getAvailableCurrencies(
    @Headers('x-api-key') apiKey: string,
    @Query('fixedRate') fixedRate?: string
  ) {
    if (!apiKey) {
      throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
    }
    return this.changenowService.getAvailableCurrencies(fixedRate === 'true');
  }

  @Get('min-amount/:fromCurrency/:toCurrency')
  async getMinAmount(
    @Param('fromCurrency') fromCurrency: string,
    @Param('toCurrency') toCurrency: string,
    @Headers('x-api-key') apiKey: string,
  ) {
    if (!apiKey) {
      throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.changenowService.getMinAmount(fromCurrency, toCurrency);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to get minimum amount',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('transaction')
  async createTransaction(
    @Body() transactionData: any,
    @Headers('x-api-key') apiKey: string,
  ) {
    if (!apiKey) {
      throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
    }
    
    const requiredFields = ['from', 'to', 'address', 'amount'];
    for (const field of requiredFields) {
      if (!transactionData[field]) {
        throw new HttpException(`Missing required field: ${field}`, HttpStatus.BAD_REQUEST);
      }
    }

    try {
      return await this.changenowService.createTransaction(transactionData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to create transaction',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('estimate/:fromCurrency/:toCurrency/:amount')
  async getEstimate(
    @Param('fromCurrency') fromCurrency: string,
    @Param('toCurrency') toCurrency: string,
    @Param('amount') amount: string,
    @Headers('x-api-key') apiKey: string,
    @Query('fixedRate') fixedRate?: string
  ) {
    if (!apiKey) {
      throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.changenowService.getEstimate(fromCurrency, toCurrency, amount, fixedRate === 'true');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to get estimate',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('transaction/:id')
  async getTransactionStatus(
    @Param('id') id: string,
    @Headers('x-api-key') apiKey: string,
  ) {
    if (!apiKey) {
      throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.changenowService.getTransactionStatus(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to get transaction status',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Public endpoint for market prices (no API key required)
  @Get('market-prices')
  async getMarketPrices() {
    return this.changenowService.getMarketPrices();
  }
}
