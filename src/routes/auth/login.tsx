import LoginPage from "@/components/Pages/Auth/LoginPage";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
      throw redirect({
        to: user.role === 'admin' ? '/dashboard' : '/',
      });
    }
  },
  component: LoginPage,
});
