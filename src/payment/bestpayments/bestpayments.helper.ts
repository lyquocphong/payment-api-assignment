import { Injectable } from '@nestjs/common';

@Injectable()
export class BestpaymentsHelper {

    /**
     * Bestpayments API Endpoint
     */
    readonly API_ENDPOINT_URL:string = 'https://bp.pay/v2/payments';

    /**
     * Get create payment endpoint URL
     * 
     * @returns string
     */
    getCreatePaymentEndpointUrl():string {
        return `${this.API_ENDPOINT_URL}/create`;
    }

    /**
     * Get capture payment endpoint URL
     * 
     * @returns string
     */
    getCapturePaymentEndpointUrl():string {
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
    generateCallbackUrl(): string {
        return 'not implement callback';
    }
}
