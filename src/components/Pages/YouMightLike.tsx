import ProductCard from "./Home/product-card";
import phoneImg from "../../assets/mobile.png";

const YouMightLike = () => {
  return (
    <div>
      <h1 className="font-bold text-[30px] text-[#404040] ml-10 mt-10">
        You may also like...
      </h1>
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 ">
        {Array.from({ length: 5 }).map((_, i) => (
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
    </div>
  );
};

export default YouMightLike;
