import ProductsDashboard from '@/components/Pages/Dashboard/Products/ProductsDashboard';
import { useAuthStore } from '@/store/authStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    
    // Require authentication
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: ProductsDashboard,
})

