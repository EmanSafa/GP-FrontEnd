import ContactPage from "@/components/Pages/Navbar/ContactPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/contact")({
  component: ContactPage,
});
