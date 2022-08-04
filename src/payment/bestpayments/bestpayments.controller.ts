import {
  Controller,
  Get,
  Post,
  NotImplementedException,
  Body,
  Res,
  HttpStatus,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BestpaymentsService } from './bestpayments.service';
import { CreateBestPaymentPayloadDto } from './dto';
import { VerifyBestPaymentClientPayloadDto } from './dto/verify-payment.dto';
import { PaymentStatus } from './enum';
import { CreateBestPaymentResponse, GetBestPaymentResponse } from './interface';
import { Response } from 'express';
import { BestPaymentCallbackPayloadDto } from './dto/callback.dto';
import { BestpaymentsHelper } from './bestpayments.helper';

@ApiTags('payment')
@Controller('bestpayments')
export class BestpaymentsController {
  constructor(
    private readonly bestpaymentsService: BestpaymentsService,
    private readonly bestpaymentsHelper: BestpaymentsHelper,
  ) {}

  @Post('create')
  @ApiOperation({
    description:
      'This endpoint will create the payment in bestpayments provider',
  })
  async create(
    @Body() body: CreateBestPaymentPayloadDto,
  ): Promise<{ token: string }> {
    const result: CreateBestPaymentResponse =
      await this.bestpaymentsService.createPayment(body.amount, body.currency);
    return { token: result.token };
  }

  @Post('verify')
  @ApiOperation({
    description:
      'This endpoint will verify the payment in bestpayments provider',
  })
  async verify(
    @Body() body: VerifyBestPaymentClientPayloadDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ result: string }> {
    // Need to get payment from payment table based on clientId and itemId
    const paymentReference = '12345abc';

    // Need to get token from payment table based on clientId and itemId
    const token = '12345bcdas';
    const result: GetBestPaymentResponse =
      await this.bestpaymentsService.getPayment(paymentReference);

    switch (result.status) {
      case PaymentStatus.Reserved:
        res.status(HttpStatus.OK);
        return { result: `payment for item = ${body.itemId} successful!` };
      case PaymentStatus.Error:
        res.status(HttpStatus.BAD_REQUEST);
        return { result: `payment for item = ${body.itemId} failed!` };
      default:
        res.status(HttpStatus.PAYMENT_REQUIRED);
        return { result: token };
    }
  }

  @Post('callback')
  @ApiOperation({
    description:
      'This endpoint will handle the callback from bestpayments provider',
  })
  callback(
    @Body() body: BestPaymentCallbackPayloadDto,
    @Query('checksum') checksum: string,
  ): void {
    /**
     * Need to validate checksum before handle the callback
     */
    if (!this.bestpaymentsHelper.validateChecksum(checksum)) {
      throw new BadRequestException({ description: 'Checksum not valid' });
    }

    this.bestpaymentsService.capturePayment(body.paymentReference);
  }
}
