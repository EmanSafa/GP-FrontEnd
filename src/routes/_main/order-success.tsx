import CheckoutSuccess from '@/components/Pages/Cart/CheckoutSuccess';
import { useAuthStore } from '@/store/authStore';
import { useCheckoutSuccessStore } from '@/store/checkoutSuccessStore';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/order-success')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({ to: '/auth/login' });
    }

    const { order } = useCheckoutSuccessStore.getState();

    if (!order) {
      throw redirect({ to: '/' });
    }
  },
  component: CheckoutSuccess,
});
