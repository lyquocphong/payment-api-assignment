import { Test, TestingModule } from '@nestjs/testing';
import { BestpaymentsHelper } from './bestpayments.helper';

describe('BestpaymentsHelper', () => {
  let provider: BestpaymentsHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BestpaymentsHelper],
    }).compile();

    provider = module.get<BestpaymentsHelper>(BestpaymentsHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
