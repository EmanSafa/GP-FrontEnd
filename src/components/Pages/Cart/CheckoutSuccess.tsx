import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckoutSuccessDetails } from '@/components/Pages/Cart/CheckoutSuccessDetails';
import { useCheckoutSuccessStore } from '@/store/checkoutSuccessStore';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, Home, Package, ShoppingBag } from 'lucide-react';

function CheckoutSuccess() {
  const { order, payment, message } = useCheckoutSuccessStore();

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-[70vh] bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-balance text-plate-8">
              Order Placed Successfully
            </h1>
            <p className="text-muted-foreground">
              {message ||
                'Thank you for your purchase. Your order has been confirmed and is now in delivery.'}
            </p>
          </div>

          <Card className="mb-6 overflow-hidden">
            <CardHeader className="bg-plate-8/5">
              <CardTitle className="flex items-center gap-2 text-balance">
                <Package className="size-5 text-plate-8" />
                Order Details
              </CardTitle>
              <CardDescription>
                We&apos;ll notify you when your package is on the way.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutSuccessDetails
                order={order}
                paymentMethod={payment?.method || order.payment_method}
                paymentStatus={payment?.status || order.payment_status}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="auth" className="gap-2" asChild>
              <Link to="/shop">
                <ShoppingBag className="size-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/account">
                <Package className="size-4" />
                View Order History
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
