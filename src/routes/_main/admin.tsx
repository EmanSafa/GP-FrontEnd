import AdminDashboard from '@/components/Pages/Admin/AdminDashboard'
import { useAuthStore } from '@/store/authStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/admin')({
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    
    // Require authentication
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      });
    }
    
    // Require admin role
    if (user?.role !== 'admin') {
      throw redirect({
        to: '/',
      });
    }
  },
  component: AdminDashboard,
})
