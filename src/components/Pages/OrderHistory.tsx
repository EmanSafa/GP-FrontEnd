import { ExternalLink } from "lucide-react";

const OrderHistory = () => {
  const orders = [
    {
      orderNo: "5132",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
      product: "Realme M Dual Sim - 256GB , 12GB RAM,5G",
      deliveryDate: "23-12-2025 (Expected)",
      trackingId: "2176418876",
      price: "18390EGP",
    },
    {
      orderNo: "5132",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
      product: "iPad Case(A10) 11 Generation",
      deliveryDate: "23-12-2025 (Expected)",
      trackingId: "2176418876",
      price: "150EGP",
    },
    {
      orderNo: "5132",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      product:
        "Wireless Headphone With Mic, Headset For Gaming & SD Memory Card",
      deliveryDate: "23-12-2025 (Expected)",
      trackingId: "2176418876",
      price: "450EGP",
    },
    {
      orderNo: "5132",
      image:
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=100&h=100&fit=crop",
      product: "SanDisk Ultra Flair 128GB USB 3.0 Flash Drive",
      deliveryDate: "23-12-2025 (Expected)",
      trackingId: "2176418876",
      price: "745EGP",
    },
    {
      orderNo: "2133",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
      product: "2021 Apple 10.2-Inch iPad Wi-Fi, 256GB - 10th Gen",
      deliveryDate: "23-07-2021",
      trackingId: "7391450268",
      price: "15080EGP",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:grid lg:grid-cols-[100px_1fr_150px_150px_120px] bg-[#A34141] text-white font-semibold text-sm">
          <div className="p-4">Order no</div>
          <div className="p-4">Items</div>
          <div className="p-4">Delivery Date</div>
          <div className="p-4">Tracking ID</div>
          <div className="p-4">Price</div>
        </div>

        {/* Orders */}
        <div className="divide-y">
          {orders.map((order, index) => (
            <div key={index} className="hover:bg-gray-50 transition-colors">
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[#C71B1B] font-semibold text-sm">
                        {order.orderNo}
                      </span>
                      <span className="font-bold text-sm">{order.price}</span>
                    </div>
                    <p className="text-sm mb-2">{order.product}</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span>{order.deliveryDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tracking:</span>
                        <a
                          href="#"
                          className="text-[#6A6A6A] flex items-center gap-1"
                        >
                          {order.trackingId}
                          <ExternalLink className="w-3 h-3 text-[#C71B1B]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-[100px_1fr_150px_150px_120px] items-center">
                <div className="p-4">
                  <span className="text-red-600 font-semibold">
                    {order.orderNo}
                  </span>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm">{order.product}</span>
                </div>
                <div className="p-4 text-sm text-gray-600">
                  {order.deliveryDate}
                </div>
                <div className="p-4">
                  <a
                    href="#"
                    className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    {order.trackingId}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-4 font-semibold text-sm">{order.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
