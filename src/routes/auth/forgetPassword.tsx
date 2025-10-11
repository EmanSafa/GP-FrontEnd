import ForgetPassword from "@/components/Pages/ForgetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgetPassword")({
  component: ForgetPassword,
});
