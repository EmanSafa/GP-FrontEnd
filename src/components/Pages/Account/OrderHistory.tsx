import { useGetUserOrders } from "@/hooks/useAccount";
import { useAuthStore } from "@/store/authStore";
import { useDeleteOrder } from "@/hooks/useOrders";
import { Trash2, AlertCircle, Badge } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import OrderDetailsDialog from "./OrderDetailsDialog";

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

const OrderHistory = () => {
  const { user } = useAuthStore();
  const { data: userOrders } = useGetUserOrders(Number(user?.id) || 0, { enabled: !!user })
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDetailsOrderId, setSelectedDetailsOrderId] = useState<number | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, orderId: number) => {
    e.stopPropagation(); // Prevent row click
    setSelectedOrderId(orderId);
    setDeleteDialogOpen(true);
  };

  const handleRowClick = (orderId: number) => {
    setSelectedDetailsOrderId(orderId);
    setDetailsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedOrderId) {
      deleteOrder(selectedOrderId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedOrderId(null);
        },
        onError: () => {
          toast.error("Failed to cancel order");
        }
      });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:grid lg:grid-cols-6  bg-[#A34141] text-white font-medium text-sm border-b border-gray-100">
          <div className="p-4">Order Number</div>
          <div className="p-4">Date</div>
          <div className="p-4">Status</div>
          <div className="p-4">Payment Status</div>
          <div className="p-4">Total</div>
          <div className="p-4">Actions</div>
        </div>

        {/* Orders */}
        <div className="divide-y divide-gray-100">
          {userOrders?.map((order) => (
            <div
              key={order.id}
              className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
              onClick={() => handleRowClick(Number(order.id))}
            >
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-900 font-semibold text-sm block">
                      {order.order_number}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-sm text-[#C71B1B]">{Number(order.total).toLocaleString()} EGP</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => handleDeleteClick(e, Number(order.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 block">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 block">Payment</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-6 items-center">
                <div className="p-4">
                  <span className="text-gray-900 font-medium group-hover:text-[#C71B1B] transition-colors">
                    {order.order_number}
                  </span>
                </div>
                <div className="p-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(order.payment_status)}`}>
                    {order.payment_status}
                  </span>
                </div>
                <div className="p-4 font-semibold text-sm text-gray-900">
                  {Number(order.total).toLocaleString()} EGP
                </div>
                <div className="p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => handleDeleteClick(e, Number(order.id))}
                  >
                    <Trash2 className="h-4 w-4 text-[#5D0505]" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {(!userOrders || userOrders.length === 0) && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-2">No orders found</div>
              <p className="text-sm text-gray-500">When you place an order, it will appear here.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Cancel Order
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Keep Order
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Cancelling..." : "Yes, Cancel Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <OrderDetailsDialog
        isOpen={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        orderId={selectedDetailsOrderId}
      />
    </div>
  );
};

export default OrderHistory;
