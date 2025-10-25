import ShopPage from "@/components/Pages/ShopPage";
import { createFileRoute } from "@tanstack/react-router";
import watch from "../../../assets/categories/watch.png";

const Smartwatches = () => {
  return (
    <ShopPage
      categoryTitle="SmartWatches"
      productCardTitle={"SmartWatches"}
      productCardSrcImg={watch}
    ></ShopPage>
  );
};
export const Route = createFileRoute("/_main/shop/smartwatches")({
  component: Smartwatches,
});
