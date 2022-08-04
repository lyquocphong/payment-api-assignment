import { PaymentStatus } from '../enum';

export interface GetBestPaymentResponse {
  merchantReference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}
