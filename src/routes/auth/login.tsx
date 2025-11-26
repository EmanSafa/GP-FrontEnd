import LoginPage from "@/components/Pages/Auth/LoginPage";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      throw redirect({
        to: "/", // Redirect to home if already logged in
      });
    }
  },
  component: LoginPage,
});
