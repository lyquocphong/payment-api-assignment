import { Test, TestingModule } from '@nestjs/testing';
import { BestpaymentsController } from './bestpayments.controller';

describe('BestpaymentsController', () => {
  let controller: BestpaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BestpaymentsController],
    }).compile();

    controller = module.get<BestpaymentsController>(BestpaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
