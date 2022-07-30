import { Module } from '@nestjs/common';
import { BestpaymentsModule } from './bestpayments/bestpayments.module';

@Module({
  imports: [BestpaymentsModule]
})
export class PaymentModule {}
