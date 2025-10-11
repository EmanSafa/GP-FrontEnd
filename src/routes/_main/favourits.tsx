import Favourites from "@/components/Pages/Favourites";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/favourits")({
  component: Favourites,
});
