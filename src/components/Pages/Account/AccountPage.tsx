import { UserRound, Pencil } from "lucide-react";
import OrderHistory from "./OrderHistory";
import InfoSection from "./InfoSection";
import InfoField from "./InfoField";
import { useAuthStore } from "@/store/authStore";
import { useGetUserProfile } from "@/hooks/useAccount";
import PersonalInfoEditDialog from "./personalInfoEditDialog";
import { BugHighlighter } from "@/components/BugScanner/BugHighlighter";


const AccountPage = () => {

  const { user } = useAuthStore();
  const id = user ? Number(user.id) : 0;
  const { data: userData } = useGetUserProfile(id, { enabled: !!user });

  if (!userData) return <div>Loading...</div>;

  // Split name into first and last name
  const nameParts = (userData.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="mt-7 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <BugHighlighter id="profile-pic" bugName="RCE - Remote code execution">
          <div className="relative">
            <UserRound className="w-16 h-16 md:w-20 md:h-20 bg-[#F8E8E8] text-[#3D3D3D] rounded-full p-3" />
            <div className="absolute bottom-0 right-0 bg-gray-400 rounded-full p-1">
              <Pencil className="w-3 h-3 text-white" />
            </div>
          </div>
        </BugHighlighter>
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
      <BugHighlighter id="userdataCors" className="w-full" bugName="CORS - Cross-Origin Resource Sharing">
        <div className="w-full">
          {/* Personal Information */}
          <InfoSection title="Personal Information" editDialog={<PersonalInfoEditDialog />}>
            <div className="grid grid-cols-2 gap-4">
              <InfoField label="First Name" value={firstName} />
              <InfoField label="Last Name" value={lastName} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Email Address" value={userData.email} />
              <InfoField label="Phone Number" value={userData.phone} />
              <InfoField label="Address" value={userData.address} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="User Name" value={userData.name} />
              <InfoField
                label="Password"
                value={"***********"}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="capitalize">
                <InfoField label="Role" value={userData.role} />
              </div>
            </div>
          </InfoSection>
        </div>
      </BugHighlighter>
      <OrderHistory />
    </div>
  );
};

export default AccountPage;
