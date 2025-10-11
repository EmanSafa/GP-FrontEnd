import AboutPage from "@/components/Pages/AboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/about")({
  component: AboutPage,
});
