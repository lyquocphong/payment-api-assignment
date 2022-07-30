import { Injectable } from '@nestjs/common';
import { BestpaymentsHelper } from './bestpayments.helper';

@Injectable()
export class BestpaymentsService {

    constructor(private bestPaymentsHelper: BestpaymentsHelper) {}

    /**
     * Create payment in bestpayments provider
     */
    createPayment() {
        const webhookCallbackUrl: string = this.bestPaymentsHelper.generateCallbackUrl();
        const url:string = this.bestPaymentsHelper.getCreatePaymentEndpointUrl();
    }

    /**
     * Get payment in bestpayments provider
     */
    getPayment() {
        const url:string = this.bestPaymentsHelper.getFindPaymentEndpointUrl();
    }

    /**
     * Capture payment in bestpayments provider
     */
    capturePayment() {
        const url:string = this.bestPaymentsHelper.getCapturePaymentEndpointUrl();
    }
}
