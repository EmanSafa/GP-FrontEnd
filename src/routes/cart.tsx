import Cart from '@/components/Pages/Cart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
  component: Cart,
})

