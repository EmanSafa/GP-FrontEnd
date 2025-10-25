import SetttingsPage from "@/components/Pages/SetttingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/settings")({
  component: SetttingsPage,
});
