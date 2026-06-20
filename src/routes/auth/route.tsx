// routes/auth/route.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";
import "../../index.css";
import { NavTopBar } from "@/components/Pages/Navbar/Navbar";

function AuthLayout() {
  return (
    <div>
      <NavTopBar />
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});
