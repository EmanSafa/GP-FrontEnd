import HomePage from "@/components/Pages/Home/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: HomePage,
});
