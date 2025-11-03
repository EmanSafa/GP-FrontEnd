import OTP from "@/components/Pages/Auth/OTPPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/otp")({
  component: OTP,
});
