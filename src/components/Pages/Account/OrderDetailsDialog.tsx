import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useGetSingleOrder } from "@/hooks/useOrders";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Package, Truck, CreditCard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderDetailsDialogProps {
    orderId: number | null;
    isOpen: boolean;
    onClose: () => void;
}
const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'delivered':
        case 'paid':
            return 'bg-green-100 text-green-700 border border-green-200';
        case 'processing':
        case 'shipped':
            return 'bg-blue-100 text-blue-700 border border-blue-200';
        case 'pending':
            return 'bg-amber-100 text-amber-700 border border-amber-200';
        case 'cancelled':
        case 'failed':
        case 'refunded':
            return 'bg-red-100 text-red-700 border border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
};
const OrderDetailsDialog = ({ orderId, isOpen, onClose }: OrderDetailsDialogProps) => {
    const { data: order, isLoading, error } = useGetSingleOrder(orderId || 0);
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-[#5D0505]">
                        Order Details <span className="text-muted-foreground text-lg font-normal">#{order?.order_number}</span>
                    </DialogTitle>
                    <DialogDescription>
                        View detailed information about your order.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6 pt-2">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">
                            Failed to load order details. Please try again.
                        </div>
                    ) : order ? (
                        <div className="space-y-6">
                            {/* Status Section */}
                            <div className="flex flex-wrap gap-4 items-center justify-between bg-muted/30 p-4 rounded-lg border">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Order Status</p>
                                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-sm text-muted-foreground">Payment Status</p>
                                    <Badge variant={order.payment_status === 'paid' ? 'default' : 'outline'} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(order.status)}`}>
                                        {order.payment_status}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-sm text-muted-foreground">Order Date</p>
                                    <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Items Section */}
                            <div className="space-y-3">
                                <h3 className="font-semibold flex items-center gap-2 text-[#5D0505]">
                                    <Package className="h-4 w-4" /> Order Items
                                </h3>
                                <div className="border rounded-lg divide-y">
                                    {order.items?.map((item: any) => (
                                        <div key={item.id} className="p-3 flex items-center gap-4">
                                            <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center overflow-hidden border">
                                                {item?.product_image_url ? (
                                                    <img
                                                        src={item.product_image_url}
                                                        alt={item.product_name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <Package className="h-8 w-8 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate ">{item.product_name || 'Product Name'}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                                            </div>
                                            <div className="text-right font-medium">
                                                ${(Number(item.price) * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Shipping Info */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold flex items-center gap-2 text-[#5D0505]">
                                        <Truck className="h-4 w-4" /> Shipping Information
                                    </h3>
                                    <div className="bg-muted/30 p-4 rounded-lg border text-sm space-y-2">
                                        <p className="font-medium">{order.shipping_address}</p>
                                        {order.notes && (
                                            <div className="mt-2 pt-2 border-t border-dashed border-gray-300">
                                                <p className="text-xs text-muted-foreground">Notes:</p>
                                                <p className="italic">{order.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold flex items-center gap-2 text-[#5D0505]">
                                        <CreditCard className="h-4 w-4" /> Payment Details
                                    </h3>
                                    <div className="bg-muted/30 p-4 rounded-lg border text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Method</span>
                                            <span className="font-medium capitalize">{order.payment_method.replace('_', ' ')}</span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between text-lg font-bold text-[#5D0505]">
                                            <span>Total</span>
                                            <span>${Number(order.total).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsDialog;
