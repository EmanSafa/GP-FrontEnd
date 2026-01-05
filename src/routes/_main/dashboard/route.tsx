import DashboardLayout from '@/components/Pages/Dashboard/DashboardLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'
import { redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/_main/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    if (user?.role === 'customer') {
      throw redirect({
        to: '/',
      });
    }

    // Require authentication
    if (!isAuthenticated || user?.role !== 'admin') {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
})
