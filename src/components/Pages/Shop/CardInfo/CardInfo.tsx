import { Heart, Minus, Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../../../ui/button";
import ShippingsIcon from "../../../ui/icons/shippingsIcon";
import DeliverIcon from "../../../ui/icons/deliverIcon";
import CardTable from "./CardTable";
import YouMightLike from "../YouMightLike";
import { usegetSingleProduct, useGetSingleProductImages } from "@/hooks/useProducts";
import CardInfoSkeleton from "../../../Skeletons/CardInfoSkeleton";
interface CardInfoProps {
  id?: number;
}



const CardInfo = ({ id }: CardInfoProps) => {
  const [counter, setCounter] = useState(0);
  const { data: product, isLoading } = usegetSingleProduct(id);
  const { data:singleProductImages} = useGetSingleProductImages(id)
  
  if (isLoading) {
    return <CardInfoSkeleton />;
  }

  if (!product && !isLoading) {
     return <div className="flex items-center justify-center h-screen">Product not found</div>;
  }

  return (
    <>
      <div className="mt-[55px] lg:h-[627px] h-auto flex flex-col lg:flex-row gap-5 w-full items-start lg:items-center justify-between">
        <div className="flex flex-row gap-8 md:gap-3 w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col  items-center lg:w-[30%] w-1/3 justify-between gap-5 ml-0 lg:ml-9">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={singleProductImages?.images?.[i]?.id || i}
                className="w-[150px] flex items-center justify-center h-[210px] bg-[#F5F5F5]"
              >
                <img
                  src={singleProductImages?.images?.[i]?.url}
                  alt={`img${i + 1}`}
                />
              </div>
            ))}
          </div>
          <div className=" lg:w-[70%] md:w-[60%] w-full p-4 h-auto flex items-center justify-center bg-[#F5F5F5]">
            <img src={product?.main_image_url} alt="" />
          </div>
        </div>
        <div className="flex flex-col mx-5 gap-2 w-full lg:w-1/2 ">
          <h1 className=" text-start text-xl font-bold text-[#777777] ">
            {product?.brand_name || "Brand"}
          </h1>
          <div className="flex items-center justify-between">
            <h2 className="sm:text-3xl text-lg  font-bold text-[#404040] max-w-[438px] ">
              {product?.name}
            </h2>
            <Heart className="text-[#5D0505] md:mr-20 sm:mr-6 lg:mr-1" />
            {/*Todo:Heart icon is clickble to add to favourites*/}
          </div>
          <div className="flex items-center flex-wrap justify-start gap-2">
            <span className="sm:text-[24px]/[171%] font-normal text-[20px]  ">
              {product?.price}
            </span>
            <span className="text-[#9D0000] text-[16px]/[171%] font-normal line-through">
             {product?.price ? Number(product.price) + 1000 : ''}
            </span> 
            <span className="h-[26px] bg-black w-[1px]"></span>
            {Array.from({ length: Math.round(Number(product?.rating || 0)) }).map((_, i) => (
              <FaStar key={i} className="text-[#D50000] w-3 h-3" />
            ))}
            <span className="text-[#9D0000]">{`(${product?.rating})` || 0} Ratings</span>
          </div>
          <div className="text-[#414141] font-normal sm:text-[24px] text-[15px]">
           {product?.description}
          </div>
          <div className="h-[1px] w-[85%] bg-[#5D0505] my-3"></div>
          
          <div className="flex flex-col items-start justify-start text-[15px] font-normal text-[#414141]">
            <label htmlFor=""> Whats in the box?</label>
            <ul className="list-disc ml-6">
              <li>Adaptor</li>
              <li>Cable Type C</li>
              <li>Mental Pin</li>
              <li>User Manual</li>
            </ul>
          </div>
          <div className="flex items-start justify-start gap-5 mx-auto w-full flex-col lg:flex-row">
            <div className="flex items-center justify-center gap-3 border-1 border-[#D79898] h-[50px] w-[130px] rounded-full">
              <div onClick={() => setCounter((prev) => prev - 1)}>
                <Minus />
              </div>
              {counter > 0 ? <span>{counter}</span> : <span>0</span>}
              <div onClick={() => setCounter((prev) => prev + 1)}>
                <Plus />
              </div>
            </div>
            <Button
              variant={"auth"}
              className="rounded-full lg:w-[355px] sm:w-[90%]   sm:h-[50px] h-[40px] py-[16px] px-[24px] font-semibold text-[15px] sm:text-[18px] "
            >
              Add to Cart
              {/*Todo:Add to cart functionality*/}
            </Button>
          </div>
          <div className="flex items-start justify-start mt-2 ">
            <Button
              variant={"authOutline"}
              className="rounded-full lg:w-[500px]  w-[90%] sm:h-[50px] h-[35px] py-[16px] px-[24px] font-semibold text-[18px] "
            >
              Buy Now
              {/*Todo:Buy now functionality*/}
            </Button>
          </div>
          <div className="flex flex-col max-md:mt-4 gap-3 items-start justify-start">
            <div className="flex gap-5 items-center justify-start">
              <ShippingsIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Free worldwide shipping on all orders over $100
              </span>
            </div>
            <div className="flex gap-5 items-center justify-start">
              <DeliverIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Delivers in: 3-7 Working Days Shipping & Return
              </span>
            </div>
          </div>
        </div>
      </div>
      <CardTable id={id} />
      <YouMightLike />
    </>
  );
};

export default CardInfo;
