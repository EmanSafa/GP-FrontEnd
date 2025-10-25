// src/routes/shop/route.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/shop")({
  component: () => <Outlet />,
});
