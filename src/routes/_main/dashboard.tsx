import Dashboard from '@/components/Pages/Dashboard/dashboard'
import { useAuthStore } from '@/store/authStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    
    // Require authentication
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: Dashboard,
})

