import { isISO4217String } from '@common/utils';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { BestpaymentsHelper } from './bestpayments.helper';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  CreateBestPaymentResponse,
  GetBestPaymentResponse,
} from './interface/';
import { firstValueFrom, map } from 'rxjs';
import { CaptureBestPaymentResponse } from './interface/capture-payment-response.interface';
import { PaymentStatus } from './enum';

@Injectable()
export class BestpaymentsService {
  constructor(
    private readonly bestPaymentsHelper: BestpaymentsHelper,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Create payment in bestpayments provider
   */
  async createPayment(
    amount: number,
    currency: string,
  ): Promise<CreateBestPaymentResponse> {
    if (!isISO4217String(currency)) {
      throw new NotAcceptableException('currency need to be in ISO4217');
    }

    const webhookCallbackUrl: string =
      await this.bestPaymentsHelper.generateCallbackUrl();

    const payload = {
      merchantReference: process.env.BESTPAYMENT_MERCHANT_REFERENCE,
      amount,
      currency,
      webhookCallbackUrl,
    };

    const url: string = this.bestPaymentsHelper.getCreatePaymentEndpointUrl();

    /* 
        // Url
        POST https://bp.pay/v2/payments/create
        
        // Request JSON payload:
        merchantReference(string)
        amount(int)
        currency(string: ISO 4217 three letter code)
        webhookCallbackUrl(string: URL)
        
        // Response JSON payload:
        paymentReference(string: UUID)
        token(string)
    */

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      return await firstValueFrom<CreateBestPaymentResponse>(
        this.httpService
          .post<CreateBestPaymentResponse>(url, payload, config)
          .pipe(
            map((response) => ({
              token: response.data.token,
              paymentReference: response.data.paymentReference,
            })),
          ),
      );
    } catch (error) {
      let description: string;
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        description = error.message;
      } else {
        console.log('unexpected error: ', error);
        description = 'An unexpected error occurred';
      }

      throw new NotAcceptableException(description);
    }
  }

  /**
   * Get payment in bestpayments provider
   */
  async getPayment(paymentReference: string): Promise<GetBestPaymentResponse> {
    const url: string = this.bestPaymentsHelper.getFindPaymentEndpointUrl();

    const payload = {
      paymentReference,
    };

    /* 
        GET https://bp.pay/v2/payments/get

        // Request JSON payload:
        paymentReference(string: UUID)
        
        // Response JSON payload:
        merchantReference(string)
        amount(int)
        currency(string: ISO 4217 three letter code)
        status(enum: ['initiated', 'reserved', 'error', 'captured'])
    */

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: payload,
      };

      return await firstValueFrom<GetBestPaymentResponse>(
        this.httpService.get<GetBestPaymentResponse>(url, config).pipe(
          map((response) => ({
            merchantReference: response.data.merchantReference,
            amount: response.data.amount,
            currency: response.data.currency,
            status: response.data.status,
          })),
        ),
      );
    } catch (error) {
      let description: string;
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        description = error.message;
      } else {
        console.log('unexpected error: ', error);
        description = 'An unexpected error occurred';
      }

      throw new NotAcceptableException(description);
    }
  }

  /**
   * Capture payment in bestpayments provider
   */
  async capturePayment(paymentReference: string) {
    const url: string = this.bestPaymentsHelper.getCapturePaymentEndpointUrl();

    const payload = {
      paymentReference,
    };

    /* 
         POST https://bp.pay/v2/payments/capture


        // Request JSON payload:
        paymentReference(string: UUID)

        // Response JSON payload:
        status(enum: ['ok', 'alreadyCaptured', 'error'])
        errorMessage(string | optional)

      */

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: payload,
      };

      const result = await firstValueFrom<CaptureBestPaymentResponse>(
        this.httpService
          .get<CaptureBestPaymentResponse>(url, config)
          .pipe(map((response) => response.data)),
      );

      if (result.errorMessage || result.status == PaymentStatus.Error) {
        // Need to handle the capture error here, maybe need to add to log or capture transation
        console.log('capture error');
        return;
      }

      // Need to set payment status as captured in database. Need to do later
      console.log('Captured');
    } catch (error) {
      let description: string;
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        description = error.message;
      } else {
        console.log('unexpected error: ', error);
        description = 'An unexpected error occurred';
      }

      throw new NotAcceptableException(description);
    }
  }
}
