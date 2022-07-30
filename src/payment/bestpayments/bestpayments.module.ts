import { Module } from '@nestjs/common';
import { BestpaymentsService } from './bestpayments.service';
import { BestpaymentsController } from './bestpayments.controller';
import { BestpaymentsHelper } from './bestpayments.helper';
@Module({
  providers: [BestpaymentsService, BestpaymentsHelper],
  controllers: [BestpaymentsController]
})
export class BestpaymentsModule {}
