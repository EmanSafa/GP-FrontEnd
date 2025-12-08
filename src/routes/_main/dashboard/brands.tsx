import BrandDashboard from '@/components/Pages/Dashboard/Brands/BrandDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/brands')({
  component: BrandDashboard,
})

