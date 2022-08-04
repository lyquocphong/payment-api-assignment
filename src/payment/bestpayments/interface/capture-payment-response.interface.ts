import { PaymentStatus } from '../enum';

export interface CaptureBestPaymentResponse {
  status: PaymentStatus;
  errorMessage?: string;
}
