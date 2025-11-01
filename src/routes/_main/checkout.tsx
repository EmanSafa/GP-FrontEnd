import Checkout from "@/components/Pages/Checkout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/checkout")({
  component: Checkout,
});
