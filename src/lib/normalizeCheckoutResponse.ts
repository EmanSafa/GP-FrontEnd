import type { CheckoutPayment, CheckoutResponse } from '@/types/checkout.types';
import type { DetailedOrder } from '@/types/types';

function getNestedOrder(data: Record<string, unknown>): DetailedOrder | undefined {
  if (data.order && typeof data.order === 'object') {
    return data.order as DetailedOrder;
  }

  if (data.data && typeof data.data === 'object') {
    const nested = data.data as Record<string, unknown>;
    if (nested.order && typeof nested.order === 'object') {
      return nested.order as DetailedOrder;
    }
  }

  return undefined;
}

export function normalizeCheckoutResponse(data: unknown): CheckoutResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const response = data as Record<string, unknown>;

  if (response.success !== true) {
    return null;
  }

  const order = getNestedOrder(response);
  const payment =
    response.payment && typeof response.payment === 'object'
      ? (response.payment as CheckoutPayment)
      : undefined;

  return {
    success: true,
    message: typeof response.message === 'string' ? response.message : undefined,
    order,
    payment,
  };
}
