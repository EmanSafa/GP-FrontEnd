import Account from "@/components/Pages/AccountPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  component: Account,
});
