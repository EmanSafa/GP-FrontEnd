import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { DetailedOrder } from '@/types/types';
import { CreditCard, Package, Truck, Gift } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CheckoutSuccessDetailsProps {
  order: DetailedOrder;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionId?: string;
}

function formatPaymentMethod(method: string) {
  return method.replace(/_/g, ' ');
}

export function CheckoutSuccessDetails({
  order,
  paymentMethod,
  paymentStatus,
  transactionId,
}: CheckoutSuccessDetailsProps) {
  return (
    <div className="space-y-6 pt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-muted/40 px-4 py-3">
          <span className="text-sm text-muted-foreground">Order Number</span>
          <p className="font-semibold text-plate-8">{order.order_number}</p>
        </div>
        <div className="rounded-lg border bg-muted/40 px-4 py-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <p className="font-semibold text-plate-8">{formatPrice(order.total)}</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/40 px-4 py-3">
        <span className="text-sm text-muted-foreground">Shipping Address</span>
        <p className="mt-1 text-sm">{order.shipping_address}</p>
      </div>

      {/* Additional Details Grid */}
      {(order.promo_code ||
        (order.discount_amount && parseFloat(order.discount_amount) > 0) ||
        transactionId ||
        order.notes) && (
        <div className="grid gap-3 sm:grid-cols-2 border rounded-lg bg-muted/20 p-4">
          {order.promo_code && (
            <div className="rounded-lg border bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Gift className="size-3" /> Promo Code
              </span>
              <p className="font-semibold text-emerald-600 tracking-wider mt-1">
                {order.promo_code}
              </p>
            </div>
          )}
          {order.discount_amount && parseFloat(order.discount_amount) > 0 && (
            <div className="rounded-lg border bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm">
              <span className="text-xs text-muted-foreground">Discount Applied</span>
              <p className="font-semibold text-emerald-600 mt-1">
                -{formatPrice(order.discount_amount)}
              </p>
            </div>
          )}
          {transactionId && (
            <div className="rounded-lg border bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm sm:col-span-2">
              <span className="text-xs text-muted-foreground">Transaction ID</span>
              <p className="font-mono text-xs mt-1 text-slate-700 dark:text-slate-300">
                {transactionId}
              </p>
            </div>
          )}
          {order.notes && (
            <div className="rounded-lg border bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm sm:col-span-2">
              <span className="text-xs text-muted-foreground">Order Notes</span>
              <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{order.notes}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Badge className="capitalize">{order.status || 'processing'}</Badge>
        {paymentStatus && (
          <Badge variant="secondary" className="capitalize">
            Payment: {paymentStatus}
          </Badge>
        )}
        {(paymentMethod || order.payment_method) && (
          <Badge variant="outline" className="capitalize gap-1">
            <CreditCard className="size-3" />
            {formatPaymentMethod(paymentMethod || order.payment_method)}
          </Badge>
        )}
      </div>

      {order.items && order.items.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Package className="size-4 text-plate-8" />
              Items ({order.items.length})
            </p>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.product_name}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <Separator />

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plate-8 text-white">
            <Package className="size-5" />
          </div>
          <div>
            <p className="font-medium">Order confirmed</p>
            <p className="text-sm text-muted-foreground">
              Your payment was received and your order is being prepared.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Truck className="size-5" />
          </div>
          <div>
            <p className="font-medium">In delivery</p>
            <p className="text-sm text-muted-foreground">
              Your order is on its way and will arrive at your shipping address soon.
            </p>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Truck className="size-4 text-blue-600" />
        <span>Estimated delivery: 3–5 business days</span>
      </div>
    </div>
  );
}
