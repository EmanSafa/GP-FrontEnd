import CategoriesDashboard from '@/components/Pages/Dashboard/Categories/CategoriesDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/dashboard/categories')({
  component: CategoriesDashboard,
})

