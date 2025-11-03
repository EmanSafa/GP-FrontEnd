import ShopPage from "@/components/Pages/Shop/ShopPage";
import { createFileRoute } from "@tanstack/react-router";
import accessories from "../../../assets/accessors.png";

const AcessoriesPage = () => {
  return (
    <ShopPage
      categoryTitle="Accessories"
      productCardTitle={"Accessories"}
      productCardSrcImg={accessories}
    ></ShopPage>
  );
};
export const Route = createFileRoute("/_main/shop/accessories")({
  component: AcessoriesPage,
});
