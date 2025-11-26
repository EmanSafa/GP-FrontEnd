import SignUpPage from "@/components/Pages/Auth/SignUpPage";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      throw redirect({
        to: "/", // Redirect to home if already logged in
      });
    }
  },
  component: SignUpPage,
});
