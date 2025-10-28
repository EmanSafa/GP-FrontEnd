import CardInfo from "@/components/Pages/CardInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/cardInfo")({
  component: CardInfo,
});
