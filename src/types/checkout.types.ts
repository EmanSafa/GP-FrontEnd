import type { DetailedOrder } from '@/types/types';

export interface CheckoutPayment {
  status: string;
  method: string;
  transaction_id?: string | null;
}

export interface CheckoutResponse {
  success: boolean;
  message?: string;
  order?: DetailedOrder;
  payment?: CheckoutPayment;
}
