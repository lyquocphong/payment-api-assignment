import { Test, TestingModule } from '@nestjs/testing';
import { BestpaymentsService } from './bestpayments.service';

describe('BestpaymentsService', () => {
  let service: BestpaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BestpaymentsService],
    }).compile();

    service = module.get<BestpaymentsService>(BestpaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
