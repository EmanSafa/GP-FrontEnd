// routes/auth/route.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";
import "../../index.css";

function AuthLayout() {
  return (
      <div >
        <Outlet />
      </div>
  );
}

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});
