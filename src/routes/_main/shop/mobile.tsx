// src/routes/_main/shop/mobile.tsx
import { createFileRoute } from "@tanstack/react-router";
import mobile from '../../../assets/mobile.png'
import ShopPage from "@/components/Pages/Shop/ShopPage";

const MobilePage = () => (
   <ShopPage
      categoryTitle="Mobile"
      productCardTitle={"Mobile"}
      productCardSrcImg={mobile}
    ></ShopPage>
);

export const Route = createFileRoute("/_main/shop/mobile")({
  component: MobilePage,
});
