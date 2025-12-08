import UserDashboard from '@/components/Pages/Dashboard/Users/UserDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/users')({
  component: UserDashboard,
})

