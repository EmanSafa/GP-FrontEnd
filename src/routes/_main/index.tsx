import HomePage from "@/components/Pages/Home/HomePage";
// import { useAuthStore } from "@/store/authStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  // beforeLoad: () => {
  //   const { isAuthenticated, user } = useAuthStore.getState();
    
  //   if (isAuthenticated && user && user.role === 'admin') {
  //     throw redirect({
  //       to: '/dashboard',
  //     });
  //   }
  // },
  component: HomePage,
});
