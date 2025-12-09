import BrandDashboard from '@/components/Pages/Dashboard/brandDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/brands')({
  component: BrandDashboard,
})

