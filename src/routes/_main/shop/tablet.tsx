import ShopPage from "@/components/Pages/ShopPage";
import { createFileRoute } from "@tanstack/react-router";
import tablet from "../../../assets/tablet.png";

const TabletPage = () => {
  return (
    <ShopPage
      categoryTitle="Tablet"
      productCardTitle={"Tablet"}
      productCardSrcImg={tablet}
    ></ShopPage>
  );
};
export const Route = createFileRoute("/_main/shop/tablet")({
  component: TabletPage,
});
