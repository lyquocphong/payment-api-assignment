import { IsNumber, IsUUID, Min } from 'class-validator';
import { IsISO4217String } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBestPaymentPayloadDto {
  @ApiProperty({
    type: String,
    description: 'Id of item',
  })
  @IsUUID()
  itemId: string;

  @ApiProperty({
    type: String,
    description: 'Id of client',
  })
  @IsUUID()
  clientId: string;

  @ApiProperty({
    type: Number,
    description: 'Amount want to pay',
  })
  @IsNumber({
    maxDecimalPlaces: 2,
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  amount: number;

  @ApiProperty({
    type: String,
    description: 'Currency code in ISO4217. Example: EUR',
  })
  @IsISO4217String({
    message: 'currency need to be in the ISO4217 format',
  })
  currency: string;
}
