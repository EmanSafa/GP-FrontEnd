'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Gift, Lock, Shield, Trash2, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepContact from '../CheckoutSteps/StepContact';
import StepShipping from '../CheckoutSteps/StepShipping';
import StepPayment from '../CheckoutSteps/StepPayment';
import { useCheckoutOrder } from '@/hooks/useOrders';
import { useGetUserProfile } from '@/hooks/useAccount';
import {
  useDeleteCartItem,
  useGetCartDetails,
  useApplyPromo,
  useRemovePromo,
} from '@/hooks/useCart';
import { useAuthStore } from '@/store/authStore';
import { useCheckoutSuccessStore } from '@/store/checkoutSuccessStore';
import { useVersionStore } from '@/store/versionStore';
import type { Cart, CheckoutData } from '@/types/types';
import type { CheckoutResponse } from '@/types/checkout.types';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils';

function mapPaymentMethodForApi(method: string, apiVersion: 'v1' | 'v2') {
  if (apiVersion !== 'v2') {
    return method;
  }

  const v2Methods: Record<string, string> = {
    cash: 'cash_on_delivery',
    credit_card: 'credit_card',
    debit_card: 'credit_card',
    bank_transfer: 'bank_transfer',
  };

  return v2Methods[method] ?? method;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: userProfile } = useGetUserProfile(Number(user?.id) || 0, { enabled: !!user });
  const setCheckoutResult = useCheckoutSuccessStore((state) => state.setCheckoutResult);
  const { data: cartDetails } = useGetCartDetails();
  const orderSummary = cartDetails?.items;
  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutate: checkout, isPending: isCheckoutLoading } = useCheckoutOrder();
  const { mutate: applyPromo, isPending: isApplyingPromo } = useApplyPromo();
  const { mutate: removePromo, isPending: isRemovingPromo } = useRemovePromo();

  const handleApplyPromo = () => {
    if (!formData.promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    applyPromo(formData.promoCode, {
      onSuccess: (data) => {
        toast.success(data.message || 'Promo code applied successfully!');
      },
      onError: (err) => {
        const axiosError = err as AxiosError<{ message?: string }>;
        const errMsg =
          axiosError.response?.data?.message || axiosError.message || 'Failed to apply promo code';
        toast.error(errMsg);
      },
    });
  };

  const [step, setStep] = useState(1);
  const [showCvv, setShowCvv] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    email: '',
    firstName: '',
    lastName: '',
    phone: '',

    // Shipping Address
    address: '',
    city: '',
    governorate: '',
    zipCode: '',
    country: 'US',
    notes: '',

    // Payment
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',

    // Options
    saveInfo: false,
    sameAsBilling: true,
    newsletter: false,
    promoCode: '',
  });

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    const nameParts = (userProfile.name || '').split(' ');

    setFormData((prev) => ({
      ...prev,
      email: prev.email || userProfile.email || '',
      firstName: prev.firstName || nameParts[0] || '',
      lastName: prev.lastName || nameParts.slice(1).join(' ') || '',
      phone: prev.phone || userProfile.phone || '',
      address: prev.address || userProfile.address || '',
    }));
  }, [userProfile]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (value: string) => {
    // Format expiry as MM/YY
    const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    handleInputChange('expiryDate', formatted);
  };

  const handleCompleteOrder = () => {
    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.governorate}, ${formData.zipCode}, Egypt`;
    const { activeVersion } = useVersionStore.getState();

    const checkoutData: CheckoutData = {
      payment_method: mapPaymentMethodForApi(formData.paymentMethod, activeVersion),
      shipping_address: shippingAddress,
      notes: formData.notes,
    };

    if (
      formData.paymentMethod !== 'cash' &&
      formData.paymentMethod !== 'bank_transfer' &&
      formData.paymentMethod !== 'paypal'
    ) {
      checkoutData.card_details = {
        card_number: formData.cardNumber.replace(/\s/g, ''),
        cvv: formData.cvv,
        expiry: formData.expiryDate,
      };
    }

    checkout(checkoutData, {
      onSuccess: (data: CheckoutResponse) => {
        if (!data.order) {
          toast.error('Order was placed but details were missing. Check your order history.');
          return;
        }

        setCheckoutResult(data.order, data.payment ?? null, data.message ?? null);
        void navigate({ to: '/order-success' });
      },
      onError: () => {
        toast.error('Checkout failed. Please try again.');
      },
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-balance">Secure Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase in just a few steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-plate-8 text-sm font-medium transition-colors ${
                    stepNumber <= step ? 'bg-plate-8 text-white' : 'bg-muted text-plate-8'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`mx-4  h-1 w-16 rounded transition-colors ${
                      stepNumber < step ? 'bg-plate-8 ' : 'bg-gray-300'
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
                  {step === 1 && 'Contact Information'}
                  {step === 2 && 'Shipping Address'}
                  {step === 3 && 'Payment Details'}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "We'll use this to send you order updates"}
                  {step === 2 && 'Where should we deliver your order?'}
                  {step === 3 && 'Your payment information is secure and encrypted'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <StepContact formData={formData} handleInputChange={handleInputChange} />
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <StepShipping formData={formData} handleInputChange={handleInputChange} />
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
                    <Button onClick={nextStep} variant={'auth'} className="cursor-pointer">
                      Continue
                    </Button>
                  ) : (
                    <Button
                      variant={'auth'}
                      className="flex cursor-pointer items-center gap-2"
                      onClick={handleCompleteOrder}
                      disabled={isCheckoutLoading}
                    >
                      {isCheckoutLoading ? (
                        'Processing...'
                      ) : (
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
                  {Array.isArray(orderSummary) &&
                    orderSummary.map((item: Cart) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative">
                          <div className="p-5 h-[100px] w-[100px]">
                            <img
                              src={item.product_image_url}
                              alt={item.product_name}
                              className="size-16 rounded-lg object-cover"
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
                          <h4 className="truncate text-sm font-medium">{item.product_name}</h4>
                          {/* <p className="text-muted-foreground text-xs">
                          {item.variant}
                        </p> */}
                          <p className="mt-1 text-sm font-medium">{formatPrice(item.price)}</p>
                        </div>
                        <button onClick={() => deleteCartItem(item.id)}>
                          <Trash2 />
                        </button>
                      </div>
                    ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Promo code</Label>
                  {cartDetails?.promo ? (
                    cartDetails.promo.valid ? (
                      <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg text-emerald-800 dark:text-emerald-300 text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-1">
                        <div className="flex items-center gap-2">
                          <Gift className="size-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                          <span className="font-bold tracking-wider">{cartDetails.promo.code}</span>
                          <span className="text-xs opacity-90">(Applied)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={isRemovingPromo}
                          onClick={() => {
                            removePromo(undefined, {
                              onSuccess: () => {
                                toast.success('Promo code removed successfully');
                                handleInputChange('promoCode', '');
                              },
                              onError: (err) => {
                                const axiosError = err as AxiosError<{ message?: string }>;
                                const errMsg =
                                  axiosError.response?.data?.message ||
                                  axiosError.message ||
                                  'Failed to remove promo code';
                                toast.error(errMsg);
                              },
                            });
                          }}
                          className="h-auto p-1 px-2 text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 cursor-pointer text-xs font-semibold rounded"
                        >
                          {isRemovingPromo ? 'Removing...' : 'Remove'}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-1">
                          <div className="flex items-center gap-2">
                            <Gift className="size-4 text-destructive animate-pulse" />
                            <span className="font-bold tracking-wider">
                              {cartDetails.promo.code}
                            </span>
                            <span className="text-xs opacity-90">(Invalid)</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isRemovingPromo}
                            onClick={() => {
                              removePromo(undefined, {
                                onSuccess: () => {
                                  toast.success('Promo code removed successfully');
                                  handleInputChange('promoCode', '');
                                },
                                onError: (err) => {
                                  const axiosError = err as AxiosError<{ message?: string }>;
                                  const errMsg =
                                    axiosError.response?.data?.message ||
                                    axiosError.message ||
                                    'Failed to remove promo code';
                                  toast.error(errMsg);
                                },
                              });
                            }}
                            className="h-auto p-1 px-2 text-destructive hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer text-xs font-semibold rounded"
                          >
                            {isRemovingPromo ? 'Removing...' : 'Remove'}
                          </Button>
                        </div>
                        <p className="text-xs text-destructive font-medium px-1">
                          {cartDetails.promo.message}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        id="promoCode-kL1m67Q"
                        placeholder="Enter promo code"
                        value={formData.promoCode}
                        onChange={(e) => handleInputChange('promoCode', e.target.value)}
                        className="uppercase font-medium tracking-wide placeholder:normal-case placeholder:font-normal"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyPromo();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer font-medium hover:bg-plate-8 hover:text-white transition-colors"
                        disabled={isApplyingPromo || !formData.promoCode.trim()}
                        onClick={handleApplyPromo}
                      >
                        {isApplyingPromo ? 'Applying...' : 'Apply'}
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {formatPrice(
                        typeof cartDetails?.subtotal === 'number' ? cartDetails.subtotal : 0
                      )}
                    </span>
                  </div>

                  {typeof cartDetails?.discount === 'number' && cartDetails.discount > 0 ? (
                    <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium transition-all duration-300 animate-in fade-in">
                      <span className="flex items-center gap-1">
                        <Gift className="size-3" />
                        Discount {cartDetails.promo?.code ? `(${cartDetails.promo.code})` : ''}
                      </span>
                      <span>-{formatPrice(cartDetails.discount)}</span>
                    </div>
                  ) : null}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {formatPrice(typeof cartDetails?.total === 'number' ? cartDetails.total : 0)}
                  </span>
                </div>

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
