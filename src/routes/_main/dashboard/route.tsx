import DashboardLayout from '@/components/Pages/Dashboard/DashboardLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard')({
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
})
