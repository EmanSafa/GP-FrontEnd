"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Gift,
  Lock,
  Shield,
  Trash2,
  Truck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepContact from "../CheckoutSteps/StepContact";
import StepShipping from "../CheckoutSteps/StepShipping";
import StepPayment from "../CheckoutSteps/StepPayment";
import { useCheckoutOrder } from "@/hooks/useOrders";
import { useDeleteCartItem, useGetCart, useGetCartTotal } from "@/hooks/useCart";
import type { Cart } from "@/types/types";

const Checkout = () => {
  const { data: orderSummary } = useGetCart()
  const { data: orderTotal } = useGetCartTotal()
  const { mutate: deleteCartItem } = useDeleteCartItem()
  const { mutate: checkout, isPending: isCheckoutLoading } = useCheckoutOrder()

  const [step, setStep] = useState(1);
  const [showCvv, setShowCvv] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    email: "",
    firstName: "",
    lastName: "",
    phone: "",

    // Shipping Address
    address: "",
    city: "",
    governorate: "",
    zipCode: "",
    country: "US",
    notes: "",

    // Payment
    paymentMethod: "cash",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Options
    saveInfo: false,
    sameAsBilling: true,
    newsletter: false,
    promoCode: "",
  });


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    handleInputChange("cardNumber", formatted);
  };

  const handleExpiryChange = (value: string) => {
    // Format expiry as MM/YY
    const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
    handleInputChange("expiryDate", formatted);
  };

  const handleCompleteOrder = () => {
    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.governorate}, ${formData.zipCode}, Egypt`;

    const checkoutData: any = {
      payment_method: formData.paymentMethod,
      shipping_address: shippingAddress,
      notes: formData.notes,
    };

    if (formData.paymentMethod !== 'cash' && formData.paymentMethod !== 'bank_transfer' && formData.paymentMethod !== 'paypal') {
      checkoutData.card_details = {
        card_number: formData.cardNumber.replace(/\s/g, ""),
        cvv: formData.cvv,
        expiry: formData.expiryDate
      }
    }

    checkout(checkoutData);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isFormValid = () => {
    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone) return false;
    if (!formData.address || !formData.city || !formData.governorate || !formData.zipCode) return false;
    if (formData.paymentMethod !== 'cash' && formData.paymentMethod !== 'bank_transfer' && formData.paymentMethod !== 'paypal') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) return false;
    }
    return true;
  }

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-balance">
            Secure Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your purchase in just a few steps
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-1 border-[#5D0505]  text-sm font-medium transition-colors ${stepNumber <= step
                    ? "bg-[#5D0505] text-white"
                    : "bg-muted text-[#5D0505]"
                    }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`mx-4  h-1 w-16 rounded transition-colors ${stepNumber < step ? "bg-[#5D0505] " : "bg-muted"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">
                  {step === 1 && "Contact Information"}
                  {step === 2 && "Shipping Address"}
                  {step === 3 && "Payment Details"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "We'll use this to send you order updates"}
                  {step === 2 && "Where should we deliver your order?"}
                  {step === 3 &&
                    "Your payment information is secure and encrypted"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <StepContact
                    formData={formData}
                    handleInputChange={handleInputChange}
                  />
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <StepShipping
                    formData={formData}
                    handleInputChange={handleInputChange}
                  />
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <StepPayment
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleCardNumberChange={handleCardNumberChange}
                    handleExpiryChange={handleExpiryChange}
                    showCvv={showCvv}
                    setShowCvv={setShowCvv}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>

                  {step < 3 ? (
                    <Button
                      onClick={nextStep}
                      variant={"auth"}
                      className="cursor-pointer"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      variant={"auth"}
                      className="flex cursor-pointer items-center gap-2"
                      onClick={handleCompleteOrder}
                      disabled={!isFormValid() || isCheckoutLoading}
                    >
                      {isCheckoutLoading ? "Processing..." : (
                        <>
                          <Lock className="size-4" />
                          Complete Order
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-balance">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-4 ">
                  {Array.isArray(orderSummary) && orderSummary.map((item: Cart) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative">
                        <div className="p-5 h-[100px] w-[100px]">
                          <img
                            src={item.product_image_url}
                            alt={item.product_name}
                            className="h-16 w-16 rounded-lg h-auto w-auto object-cover"
                          />
                        </div>
                        <Badge
                          variant="secondary"
                          className="absolute -end-2 -top-2 size-6 rounded-full p-0 text-xs"
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">
                          {item.product_name}
                        </h4>
                        {/* <p className="text-muted-foreground text-xs">
                          {item.variant}
                        </p> */}
                        <p className="mt-1 text-sm font-medium">
                          ${item.price}
                        </p>
                      </div>
                      <button onClick={() => deleteCartItem(item.id)}><Trash2 /></button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <Label htmlFor="promoCode-kL1m67Q" className="text-sm">
                    Promo code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="promoCode-kL1m67Q"
                      placeholder="Enter code"
                      value={formData.promoCode}
                      onChange={(e) =>
                        handleInputChange("promoCode", e.target.value)
                      }
                    />
                    <Button variant="outline" className="cursor-pointer">
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${orderTotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Truck className="size-3" />
                      Shipping
                    </span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$0.00</span>
                  </div>

                </div>

                <Separator />

                {/* <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div> */}

                {/* Trust Indicators */}
                <div className="space-y-3 pt-4">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Shield className="size-4 text-green-600" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Truck className="size-4 text-blue-600" />
                    <span>Free shipping on orders over $75</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Gift className="size-4 text-purple-600" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
