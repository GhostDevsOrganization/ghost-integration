import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Headers, 
    HttpException, 
    HttpStatus,
    HttpCode,
    Param,
    Query
  } from '@nestjs/common';
  import { PaymentService } from './payment.service';
  
  @Controller('payment')
  export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}
  
    @Post('process')
    @HttpCode(200) // Explicitly set status code to 200
    async processPayment(@Body() paymentData: any, @Headers('x-api-key') apiKey: string) {
      if (!apiKey) {
        throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
      }
      
      const requiredFields = ['amount', 'currency'];
      for (const field of requiredFields) {
        if (!paymentData[field]) {
          throw new HttpException(`Missing required field: ${field}`, HttpStatus.BAD_REQUEST);
        }
      }
  
      return this.paymentService.processCardPayment(paymentData);
    }
  
    @Get('kas/rate')
    async getKasRate(
      @Headers('x-api-key') apiKey: string,
      @Query('amount') amount?: string
    ) {
      if (!apiKey) {
        throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
      }
      return this.paymentService.getKasConversionRate('usd', amount);
    }
  
    @Post('kas/purchase')
    @HttpCode(200) // Explicitly set status code to 200
    async purchaseKas(@Body() purchaseData: any, @Headers('x-api-key') apiKey: string) {
      if (!apiKey) {
        throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
      }
  
      const requiredFields = ['amount', 'kaspaAddress', 'paymentData'];
      for (const field of requiredFields) {
        if (!purchaseData[field]) {
          throw new HttpException(`Missing required field: ${field}`, HttpStatus.BAD_REQUEST);
        }
      }
  
      // Validate payment data
      const paymentDataFields = ['cardNumber', 'expiryDate', 'cvv'];
      for (const field of paymentDataFields) {
        if (!purchaseData.paymentData[field]) {
          throw new HttpException(
            `Missing required payment field: ${field}`,
            HttpStatus.BAD_REQUEST
          );
        }
      }

      return this.paymentService.processKasPurchase({
        amount: purchaseData.amount,
        kaspaAddress: purchaseData.kaspaAddress,
        paymentData: {
          cardNumber: purchaseData.paymentData.cardNumber.replace(/\s/g, ''),
          expiryDate: purchaseData.paymentData.expiryDate,
          cvv: purchaseData.paymentData.cvv
        }
      });
    }
  
    @Get('kas/status/:id')
    async getKasPurchaseStatus(
      @Param('id') id: string,
      @Headers('x-api-key') apiKey: string
    ) {
      if (!apiKey) {
        throw new HttpException('API key is required', HttpStatus.UNAUTHORIZED);
      }
      return this.paymentService.getKasPurchaseStatus(id);
    }
  }
