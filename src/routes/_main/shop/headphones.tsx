import ShopPage from "@/components/Pages/ShopPage";
import headphones from "../../../assets/headphoes.png";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/shop/headphones")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ShopPage
      categoryTitle="HeadPhones"
      productCardTitle={"HeadPhones"}
      productCardSrcImg={headphones}
    ></ShopPage>
  );
}
