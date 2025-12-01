import { useGetUserOrders } from "@/hooks/useAccount";
import { useAuthStore } from "@/store/authStore";
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

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:grid lg:grid-cols-5  bg-[#A34141] text-white font-medium text-sm border-b border-gray-100">
          <div className="p-4">Order Number</div>
          <div className="p-4">Date</div>
          <div className="p-4">Status</div>
          <div className="p-4">Payment Status</div>
          <div className="p-4">Total</div>
        </div>

        {/* Orders */}
        <div className="divide-y divide-gray-100">
          {userOrders?.map((order) => (
            <div key={order.id} className="hover:bg-gray-50/50 transition-colors group">
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
                  <span className="font-bold text-sm text-[#C71B1B]">{Number(order.total).toLocaleString()} EGP</span>
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
              <div className="hidden lg:grid lg:grid-cols-5 items-center">
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
    </div>
  );
};

export default OrderHistory;
