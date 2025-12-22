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
import { Link, useNavigate } from "@tanstack/react-router";
import { useClearCart, useGetCart, useGetCartCount, useGetCartTotal } from "@/hooks/useCart";
import type { Cart as CartType } from "@/types/types";
import CartItem from "./CartItem";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
const Cart = () => {
  const { data: cartItems } = useGetCart()
  const { data: cartCount } = useGetCartCount()
  const { data: cartTotalPrice } = useGetCartTotal()
  const { mutate: clearCart } = useClearCart()
  const { isAuthenticated } = useAuthStore.getState();
  const navigate = useNavigate();

  const handleClearCart = () => {
    clearCart()
  }
  return (
    <Sheet>
      <SheetTrigger asChild >
        <button
          aria-label="Open cart"
          className="relative flex items-center justify-center"
          onClick={() => {
            if (!isAuthenticated) {
              toast.error('Please login to add to cart')
              navigate({ to: "/auth/login" });
            }
          }}
        >
          <ShoppingBagIcon size={20} />
          {/* Optional: Cart count badge */}
          <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs px-1.5">
            {cartCount}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Cart</SheetTitle>
        </SheetHeader>
        {cartItems?.length > 0 ? cartItems?.map((item: CartType) => (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.product_name}
            price={item.subtotal}
            quantity={item.quantity}
            imgSrc={item.product_image_url}
          />
        )) : (<div className="flex items-center justify-center h-full">{!isAuthenticated ? <p>You should login to view your cart</p> : <p>no items in cart</p>}</div>)}
        <SheetFooter>
          <div className="flex flex-col items-center justify-center gap-4">

            {/*<div className="flex items-center justify-between w-full ">
              <span className="text-lg text-[#414141] ">Discount size</span>
              <span className="text-xl font-medium ml-2">-$20</span>
            </div>
            <div className="flex items-center justify-between w-full ">
              <span className="text-lg text-[#414141] ">Delivery Charges</span>
              <span className="text-xl font-medium ml-2">Free delivery</span>
            </div>/*/}
            <div className="h-[1px] my-1 w-[95%] bg-[#DEDEDE] text-center mx-auto"></div>
            <div className="flex items-center justify-between w-full pb-3">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-medium ml-2"> ${isAuthenticated ? cartTotalPrice : 0}</span>
            </div>
          </div>
        {isAuthenticated && (
          <SheetClose asChild>
            <Link to="/checkout">
              <Button type="submit" className="w-full" variant={"auth"}>
                Checkout
              </Button>
            </Link>
          </SheetClose>
        )}
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
          {isAuthenticated && (
            <Button variant="default" onClick={handleClearCart}>Clear Cart</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
