import { useUpdateCartItem, useDeleteCartItem } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface IProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imgSrc?: string;
}

const CartItem = ({
  id,
  title,
  price,
  quantity,
  imgSrc,
}: IProps) => {
  const [counter, setCounter] = useState(Number(quantity));
  const { mutate: updateCartItem } = useUpdateCartItem(id);
  const { mutate: deleteCartItem } = useDeleteCartItem(id);


  return (
    <div key={id} className="m-4 ">
      <div className="flex items-start justify-start gap-3  mb-5 ">
        <div className="f border-1  border-[#DEDEDE] shadow-md rounded-md max-h-[120px] max-w-[150px] flex items-center justify-center  p-2">
          <img src={imgSrc} alt={title} className="  rounded" />
        </div>
        <div className="flex flex-1 flex-col  items-stretch gap-2   ">
          <h3 className="text-lg font-semibold">{title}</h3>

          <div className="flex items-center flex-1 gap-3">
            <p className="text-lg">${price}</p>
          </div>
          <div className="flex w-full flex-1   justify-between items-center">
            <div className="flex items-center justify-between gap-2 border-1 p-1 border-[#5D0505] rounded-md ">
              <div onClick={() => {
                if (counter > 1) {
                  const newQuantity = Number(counter) - 1;
                  setCounter(newQuantity);
                  updateCartItem({ quantity: newQuantity });
                }
              }} className="cursor-pointer">
                <Minus className="w-4 h-4" />
              </div>
              <span>{counter}</span>
              <div onClick={() => {
                const newQuantity = Number(counter) + 1;
                setCounter(newQuantity);
                updateCartItem({ quantity: newQuantity });
              }} className="cursor-pointer">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            <button onClick={() => deleteCartItem()} className="text-[#880909] hover:text-[#5D0505] mr-5 cursor-pointer text-sm">
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
