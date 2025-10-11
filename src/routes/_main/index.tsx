import HomePage from "@/components/Pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: HomePage,
});
