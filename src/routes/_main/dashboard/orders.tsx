import OrderDashboard from '@/components/Pages/Dashboard/Orders/OrdersDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/orders')({
  component: OrderDashboard,
})

