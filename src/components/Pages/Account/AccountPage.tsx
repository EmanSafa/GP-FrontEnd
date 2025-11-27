import { UserRound, Pencil } from "lucide-react";
import PersonalInfoEditDialog from "./personalInfoEditDialog";
import ShippingInfoEditDialog from "./ShippingInfoEditDialog";
import OrderHistory from "./OrderHistory";
import PaymentInfoEditDialog from "./PaymentInfoEditDialog";

import { useAuthStore } from "@/store/authStore";

const AccountPage = () => {
  const { user } = useAuthStore();
  
  // Helper to safely get user data
  const userData = user || {
    name: "Guest User",
    email: "guest@example.com",
    phone: "N/A",
    address: "N/A",
    city: "N/A",
    postcode: "N/A",
    governorate: "N/A",
    country: "N/A",
    role: "customer" as const
  };

  // Split name into first and last name
  const nameParts = (userData.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="mt-7 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <UserRound className="w-16 h-16 md:w-20 md:h-20 bg-[#F8E8E8] text-[#3D3D3D] rounded-full p-3" />
          <div className="absolute bottom-0 right-0 bg-gray-400 rounded-full p-1">
            <Pencil className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl">{userData.name}</h1>
          <h3 className="font-normal text-[#3D3D3D] text-sm md:text-base">
            {userData.email}
          </h3>
          {userData.role && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
              {userData.role}
            </span>
          )}
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Information */}
        <div className="bg-[#F5F5F5] rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Personal Information</h2>
            <PersonalInfoEditDialog />
          </div>
          <div className="h-[2px] w-[98%] text-center mx-auto mb-4 bg-black"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">First Name</p>
                <p className="font-medium">{firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Name</p>
                <p className="font-medium">{lastName}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="font-medium text-sm">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                <p className="font-medium">{userData.phone || "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">User Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Password</p>
                <p className="font-medium">{userData.password?.length > 0 ? "***********" : "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="font-medium capitalize">{userData.role || "Customer"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-[#F5F5F5] rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Shipping Information</h2>
            <ShippingInfoEditDialog />
          </div>
          <div className="h-[2px] w-[98%] text-center mx-auto mb-4 bg-black"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">City/Town</p>
                <p className="font-medium">Zagazig</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Postcode/Zip</p>
                <p className="font-medium">171717</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Permanent Address</p>
                <p className="font-medium">
                  5 Saied Street, Farouk Street, Floor 4
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Governorate</p>
                <p className="font-medium">El Sharqia</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Country</p>
                <p className="font-medium"> Egypt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-[#F5F5F5] rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Payment Information</h2>
            <PaymentInfoEditDialog/>
          </div>
          <div className="h-[2px] w-[98%] text-center mx-auto mb-4 bg-black"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name on Card</p>
                <p className="font-medium">Mirna Abdelrahman</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Card Number</p>
                <p className="font-medium">************</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valid Through</p>
                <p className="font-medium">12/4</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">CVV</p>
                <p className="font-medium">***</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderHistory/>
    </div>
  );
};

export default AccountPage;
