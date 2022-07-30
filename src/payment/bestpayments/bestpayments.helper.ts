import { Injectable } from '@nestjs/common';

@Injectable()
export class BestpaymentsHelper {

    /**
     * Generate callback url for webhook
     * 
     * @returns string
     */
    generateCallbackUrl(): string {
        return 'not implement callback';
    }
}
