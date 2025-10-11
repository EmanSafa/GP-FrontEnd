import ShopPage from "@/components/Pages/ShopPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/shop")({
  component: ShopPage,
});
