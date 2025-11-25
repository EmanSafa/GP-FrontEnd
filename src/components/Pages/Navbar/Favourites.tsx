import phoneImg from "../../../assets/mobile.png";
import ProductCard from "../Home/product-card";
import GlobalPagination from "@/components/Global/GlobalPagination";
import GlobalSort from "@/components/Global/GlobalSort";

const Favourites = () => {
  return (
    <div>
      <h1 className="font-bold text-[30px] sm:text-[36px] mt-15 ml-[20px]  sm:ml-[120px]">
        Favourites (16)
      </h1>
      <div className="flex items-end justify-end  mr-[6%] ">
        <GlobalSort />
      </div>
      <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
        {Array.from({ length: 17 }).map((_, i) => (
          <ProductCard
            key={i}
            title={"Galaxy Ultra"}
            price="$960"
            oldPrice="$1200"
            rating={5}
            imgSrc={phoneImg}
            discount={20}
          />
        ))}
      </div>
      <GlobalPagination />
    </div>
  );
};

export default Favourites;
