import ProductsDashboard from '@/components/Pages/Dashboard/Products/ProductsDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/product')({
  component: ProductsDashboard,
})

