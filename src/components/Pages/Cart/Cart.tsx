import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBagIcon } from "lucide-react";
import CartItem from "./CartItem";
import mobile from "../../../assets/mobile.png";
import { Link } from "@tanstack/react-router";
const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open cart"
          className="relative flex items-center justify-center"
        >
          <ShoppingBagIcon size={20} />
          {/* Optional: Cart count badge */}
          <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs px-1.5">
            2
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Cart</SheetTitle>
        </SheetHeader>
        <CartItem
          id="1"
          title="SanDisk Ultra Flair 128GB USB 3.0 Flash Drive – SDCZ73-128G-G46"
          oldPrice={100}
          price={80}
          quantity={1}
          rating={4}
          imgSrc={mobile}
        />
        <CartItem
          id="1"
          title="SanDisk Ultra Flair 128GB USB 3.0 Flash Drive – SDCZ73-128G-G46"
          oldPrice={100}
          price={80}
          quantity={1}
          rating={4}
          imgSrc={mobile}
        />
        <SheetFooter>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-between w-full ">
              <span className="text-lg text-[#414141] ">Price</span>
              <span className="text-xl font-medium ml-2">$160</span>
            </div>
            <div className="flex items-center justify-between w-full ">
              <span className="text-lg text-[#414141] ">Discount size</span>
              <span className="text-xl font-medium ml-2">-$20</span>
            </div>
            <div className="flex items-center justify-between w-full ">
              <span className="text-lg text-[#414141] ">Delivery Charges</span>
              <span className="text-xl font-medium ml-2">Free delivery</span>
            </div>
            <div className="h-[1px] my-1 w-[95%] bg-[#DEDEDE] text-center mx-auto"></div>
            <div className="flex items-center justify-between w-full pb-3">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-medium ml-2">$160</span>
            </div>
          </div>
          <SheetClose asChild>
            <Link to="/checkout">
              <Button type="submit" className="w-full" variant={"auth"}>
                Checkout
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
