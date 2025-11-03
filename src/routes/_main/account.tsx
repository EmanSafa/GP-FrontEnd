import Account from "@/components/Pages/Account/AccountPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/account")({
  component: Account,
});
