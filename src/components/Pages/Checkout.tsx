import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircleIcon } from "lucide-react";
import StepCart from "./CheckoutSteps/StepCart";
import StepInfoB from "./CheckoutSteps/StepInfoB";
import Shipping from "./CheckoutSteps/Shipping";

const steps = [{ title: " Your Cart" }, { title: "Shipping Details" }, { title: "Payment" }];

const Checkout = () => {
  return (
    <Stepper
      defaultValue={2}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8 mt-20"
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            key={index}
            step={index + 1}
            className="relative flex-1 items-start "
          >
            <StepperTrigger className="flex flex-col gap-2.5   text-[#5D0505]">
              <StepperIndicator className=" bg-[#F8E8E8] text-[#5D0505] border-1 border-[#5D0505]">
                {index + 1}
              </StepperIndicator>
              <StepperTitle className="">{step.title}</StepperTitle>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className=" absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        <StepperContent value={1} className="flex items-start justify-center">
          <StepCart />
        </StepperContent>

        <StepperContent value={2} className="flex items-start justify-center">
          <Shipping />
        </StepperContent>

        <StepperContent value={3} className="flex items-start justify-center">
          <StepInfoB />
        </StepperContent>
      </StepperPanel>
    </Stepper>
  );
};
export default Checkout;
