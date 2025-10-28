import ResetPassword from "@/components/Pages/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/resetPass")({
  component: ResetPassword,
});
