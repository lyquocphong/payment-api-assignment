import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../enum';

export class BestPaymentCallbackPayloadDto {
  @ApiProperty({
    type: String,
    description: 'Id of item',
  })
  @IsUUID()
  paymentReference: string;

  @ApiProperty({
    type: String,
    description: 'Status of payment',
  })
  status: PaymentStatus;
}
