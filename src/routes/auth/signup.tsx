import SignUpPage from "@/components/Pages/Auth/SignUpPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: SignUpPage,
});
