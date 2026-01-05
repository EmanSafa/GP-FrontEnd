import Account from "@/components/Pages/Account/AccountPage";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/account")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login", // Redirect to login if not authenticated
      });
    }
  },
  component: Account,
});
