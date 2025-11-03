import { OTPForm } from "@/components/ui/Auth-Forms/otp-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/otp")({
  component: OTPForm,
});
