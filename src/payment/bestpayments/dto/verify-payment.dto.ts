import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyBestPaymentClientPayloadDto {
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
}
