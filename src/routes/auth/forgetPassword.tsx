import { createFileRoute } from "@tanstack/react-router";
import ForgetPassword from "../../components/Pages/Auth/ForgetPassword";

export const Route = createFileRoute("/auth/forgetPassword")({
  component: ForgetPassword,
});
