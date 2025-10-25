// src/routes/_main/shop/mobile.tsx
import ShopPage from "@/components/Pages/ShopPage";
import { createFileRoute } from "@tanstack/react-router";
import mobile from '../../../assets/mobile.png'

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
