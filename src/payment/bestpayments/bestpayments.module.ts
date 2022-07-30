import { Module } from '@nestjs/common';
import { BestpaymentsService } from './bestpayments.service';
import { BestpaymentsController } from './bestpayments.controller';

@Module({
  providers: [BestpaymentsService],
  controllers: [BestpaymentsController]
})
export class BestpaymentsModule {}
