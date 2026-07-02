import PromoCodeDashboard from '@/components/Pages/Dashboard/PromoCodes/PromoCodeDashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/dashboard/promo-codes')({
  component: PromoCodeDashboard,
});
