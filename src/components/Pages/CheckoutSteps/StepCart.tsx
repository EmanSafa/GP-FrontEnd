import { Button } from "@/components/ui/button";
import CartItem from "../CartItem";
import mobile from "../../../assets/mobile.png";
import { Link } from "@tanstack/react-router";
import { useStepper } from "@/components/ui/stepper";

const StepCart = () => {
  const { setActiveStep } = useStepper();

  const goToShipping = () => setActiveStep(2);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="space-y-4">
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
          id="2"
          title="SanDisk Ultra Flair 128GB USB 3.0 Flash Drive – SDCZ73-128G-G46"
          oldPrice={100}
          price={80}
          quantity={1}
          rating={4}
          imgSrc={mobile}
        />
      </div>

      <footer className="mt-6 mx-12">
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

        <div className="mt-4 flex gap-3 flex-row mx-3 max-md:flex-col">
          {/* In checkout page already — change the link/action as needed */}
          <Button className="flex-1" variant="auth" onClick={goToShipping}>
            Proceed
          </Button>
          <Link to="/shop" className="flex-1 ">
            <Button className="flex-1 w-full" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default StepCart;
