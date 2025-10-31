import { ChevronLeft, ChevronRight,  Trash2 } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface IProps {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  quantity: number;
  rating?: number;
  imgSrc?: string;
}

const CartItem = ({
  id,
  title,
  oldPrice,
  price,
  quantity,
  rating,
  imgSrc,
}: IProps) => {
  const [counter, setCounter] = useState(quantity);

  return (
   <div key={id} className="m-4 ">
     <div
      className="flex items-start justify-start gap-3  mb-5 "
      
    >
      <div className=" border-1 border-[#DEDEDE] shadow-md rounded-md  p-2">
        <img src={imgSrc} alt={title} className="  rounded" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex justify-start gap-1">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} className="w-4 h-4 text-[#880909]" />
          ))}
          <FaStar className="w-4 h-4 text-[#880909]/10" />
        </div>
        <div className="flex items-center gap-3">
          <p>${price}</p>
          <span className="line-through text-[#5D0505]">${oldPrice}</span>
        </div>
        <div className="flex w-full  justify-between items-center">
          <div className="flex items-center justify-between gap-5 border-1 px-1 border-[#5D0505] rounded-md ">
            <div onClick={() => setCounter((prev) => prev - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </div>
            {counter > 0 ? <span>{counter}</span> : <span>0</span>}
            <div onClick={() => setCounter((prev) => prev + 1)}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <button className="text-[#880909] hover:text-[#5D0505] mr-5 cursor-pointer text-sm">
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
      <div className="h-[1px] mt-9 w-[90%] bg-[#DEDEDE] text-center mx-auto"></div>
   </div>
  );
};

export default CartItem;
