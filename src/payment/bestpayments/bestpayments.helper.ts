import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BestpaymentsHelper {
  /**
   * Bestpayments API Endpoint
   */
  readonly API_ENDPOINT_URL: string = 'https://bp.pay/v2/payments';
  readonly CHECKSUM_SALT_OR_ROUND: number = 10;

  /**
   * Get create payment endpoint URL
   *
   * @returns string
   */
  getCreatePaymentEndpointUrl(): string {
    return `${this.API_ENDPOINT_URL}/create`;
  }

  /**
   * Get capture payment endpoint URL
   *
   * @returns string
   */
  getCapturePaymentEndpointUrl(): string {
    return `${this.API_ENDPOINT_URL}/capture`;
  }

  /**
   * Get find payment endpoint URL
   *
   * @returns string
   */
  getFindPaymentEndpointUrl(): string {
    return `${this.API_ENDPOINT_URL}/get`;
  }

  /**
   * Generate callback url for webhook
   *
   * @returns string
   */
  async generateCallbackUrl(): Promise<string> {
    const checksum = await this.generateChecksum();
    return `${process.env.APP_HOST}:${process.env.APP_PORT}/bestpayments/callback?checksum=${checksum}`;
  }

  /**
   * Generate checksum which will be added to webhookCallbackUrl
   *
   * @returns string
   */
  async generateChecksum(): Promise<string> {
    const reference = process.env.BESTPAYMENT_MERCHANT_REFERENCE;
    return await bcrypt.hash(reference, this.CHECKSUM_SALT_OR_ROUND);
  }

  /**
   * Validate the checksum
   *
   * @param checksum string Checksum want to check
   * @returns boolean
   */
  async validateChecksum(checksum: string): Promise<boolean> {
    const validChecksum = await this.generateChecksum();
    return checksum === validChecksum;
  }
}
