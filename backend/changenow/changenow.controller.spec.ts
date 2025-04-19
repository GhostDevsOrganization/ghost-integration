import { Test, TestingModule } from '@nestjs/testing';
import { ChangeNowController } from './changenow.controller';
import { ChangeNowService } from './changenow.service';

describe('ChangeNowController', () => {
  let controller: ChangeNowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeNowController],
      providers: [
        {
          provide: ChangeNowService,
          useValue: {
            getAvailableCurrencies: jest.fn().mockResolvedValue([
              { ticker: 'btc', name: 'Bitcoin' },
              { ticker: 'kas', name: 'Kaspa' }
            ]),
            createTransaction: jest.fn().mockResolvedValue({
              id: 'tx123',
              payinAddress: 'btc1address',
              payoutAddress: 'kaspa1address',
              fromAmount: '0.1',
              toAmount: '1000'
            })
          },
        },
      ],
    }).compile();

    controller = module.get<ChangeNowController>(ChangeNowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
