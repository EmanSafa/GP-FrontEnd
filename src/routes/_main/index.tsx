import HomePage from "@/components/Pages/Home/HomePage";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    
    if (isAuthenticated && user) {
      throw redirect({
        to: user.role === 'admin' ? '/dashboard' : '/',
      });
    }
  },
  component: HomePage,
});
