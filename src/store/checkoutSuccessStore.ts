import { create } from 'zustand';
import type { CheckoutPayment } from '@/types/checkout.types';
import type { DetailedOrder } from '@/types/types';

interface CheckoutSuccessState {
  order: DetailedOrder | null;
  payment: CheckoutPayment | null;
  message: string | null;
  setCheckoutResult: (
    order: DetailedOrder,
    payment?: CheckoutPayment | null,
    message?: string | null
  ) => void;
  clearCheckoutResult: () => void;
}

export const useCheckoutSuccessStore = create<CheckoutSuccessState>()((set) => ({
  order: null,
  payment: null,
  message: null,
  setCheckoutResult: (order, payment = null, message = null) => {
    set({ order, payment, message });
  },
  clearCheckoutResult: () => {
    set({ order: null, payment: null, message: null });
  },
}));
