import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ChangeNowService } from './changenow.service';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { CreateTransactionData } from './interfaces/changenow.interface';

describe('ChangeNowService', () => {
  let service: ChangeNowService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
    post: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeNowService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ChangeNowService>(ChangeNowService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableCurrencies', () => {
    it('should return available currencies', async () => {
      const mockCurrencies = [
        { ticker: 'btc', name: 'Bitcoin' },
        { ticker: 'kas', name: 'Kaspa' },
      ];

      mockHttpService.get.mockReturnValueOnce(
        of({
          data: { result: mockCurrencies },
          status: 200,
        })
      );

      const result = await service.getAvailableCurrencies(false);
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle API errors', async () => {
      mockHttpService.get.mockReturnValueOnce(
        throwError(() => ({
          response: {
            data: 'API Error',
            status: 500,
          },
        }))
      );

      await expect(service.getAvailableCurrencies(false)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('createTransaction', () => {
  const mockExchangeDto: CreateTransactionData = {
    from: 'btc',
    to: 'kas',
    address: 'kaspa1address',
    amount: '0.1',
    flow: 'standard' as any,
  };

    it('should create exchange transaction successfully', async () => {
      const mockResponse = {
        id: 'tx123',
        payinAddress: 'btc1address',
        payoutAddress: 'kaspa1address',
        fromAmount: '0.1',
        toAmount: '1000',
      };

      mockHttpService.post.mockReturnValueOnce(
        of({
          data: { result: mockResponse },
          status: 200,
        })
      );

      const result = await service.createTransaction(mockExchangeDto);
      expect(result).toEqual(mockResponse);
    });

    it('should handle creation errors', async () => {
      mockHttpService.post.mockReturnValueOnce(
        throwError(() => ({
          response: {
            data: 'Invalid amount',
            status: 400,
          },
        }))
      );

      await expect(service.createTransaction(mockExchangeDto)).rejects.toThrow(
        HttpException
      );
    });
  });
});
