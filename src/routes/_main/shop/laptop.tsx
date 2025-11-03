import ShopPage from "@/components/Pages/Shop/ShopPage";
import { createFileRoute } from "@tanstack/react-router";
import laptop from "../../../assets/laptop.png";

const LaptopPage = () => {
  return (
    <ShopPage
      categoryTitle="Laptop"
      productCardTitle={"Laptop"}
      productCardSrcImg={laptop}
    ></ShopPage>
  );
};
export const Route = createFileRoute("/_main/shop/laptop")({
  component: LaptopPage,
});
