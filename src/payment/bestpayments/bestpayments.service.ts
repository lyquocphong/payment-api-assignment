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
    }

    /**
     * Get payment in bestpayments provider
     */
    getPayment() {

    }

    /**
     * Capture payment in bestpayments provider
     */
    capturePayment() {

    }
}
