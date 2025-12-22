import Checkout from "@/components/Pages/Cart/Checkout";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from '@/store/authStore'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/_main/checkout")({
  component: Checkout,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login", // Redirect to login if not authenticated
      });

    }
  }
})