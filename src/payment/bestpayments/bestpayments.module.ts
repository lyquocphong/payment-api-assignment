import { Module } from '@nestjs/common';
import { BestpaymentsService } from './bestpayments.service';
import { BestpaymentsController } from './bestpayments.controller';
import { BestpaymentsHelper } from './bestpayments.helper';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [BestpaymentsService, BestpaymentsHelper],
  controllers: [BestpaymentsController],
})
export class BestpaymentsModule {}
