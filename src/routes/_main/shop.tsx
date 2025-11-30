import ShopPage from '@/components/Pages/Shop/ShopPage'
import { createFileRoute } from '@tanstack/react-router'

import { z } from 'zod'

const shopSearchSchema = z.object({
  categoryId: z.coerce.number().optional(),
  brandId: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(['price', 'rating', 'created_at', 'name']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  q: z.string().optional(),
})

export const Route = createFileRoute('/_main/shop')({
  validateSearch: (search) => shopSearchSchema.parse(search),
  component: ShopRouteComponent,
})

function ShopRouteComponent() {
  const search = Route.useSearch()
  return <ShopPage {...search} />
}

