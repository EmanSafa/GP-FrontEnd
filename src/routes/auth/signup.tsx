import SignUpPage from "@/components/Pages/Auth/SignUpPage";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
      throw redirect({
        to: user.role === 'admin' ? '/dashboard' : '/',
      });
    }
  },
  component: SignUpPage,
});
