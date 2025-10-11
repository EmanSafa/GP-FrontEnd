import ContactPage from "@/components/Pages/ContactPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
