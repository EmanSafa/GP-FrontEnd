import CardInfo from "@/components/Pages/Shop/CardInfo/CardInfo";
import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";

const searchSchema = z.object({
  id: z.coerce.number().optional(),
});

export const Route = createFileRoute("/_main/cardInfo")({
  validateSearch: (search) => searchSchema.parse(search),
  component: () => {
    const { id } = Route.useSearch();
    return <CardInfo id={id} />;
  },
});
