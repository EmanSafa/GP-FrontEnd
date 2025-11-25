import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Pencil } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/store/authStore";

const PersonalInfoEditDialog = () => {
  const { user } = useAuthStore();
  const userData = user || {
    name: "Guest User",
    email: "guest@example.com",
    phone: "N/A",
    role: "customer"
  };

  // Split name into first and last name
  const nameParts = (userData.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  return (
    <Dialog>
      <form>
        <DialogTrigger>
          {" "}
          <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Personal Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">First Name</Label>
              <Input id="name-1" name="name" defaultValue={firstName} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-2">Last Name</Label>
              <Input id="name-2" name="name" defaultValue={lastName} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue={userData.name}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                defaultValue={userData.email}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" defaultValue={userData.phone} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" defaultValue={userData.role} disabled className="bg-gray-100" />
            </div>
            <Label htmlFor="pass">Password</Label>
            <div className="flex justify-between items-center gap-4">
              <Input id="pass" name="pass" defaultValue="**********" />
              <Button
                variant={"auth"}
                onClick={() => setShowChangePass(!showChangePass)}
              >
                Change password
              </Button>
            </div>
            {/* Password */}
            {showChangePass && (
              <div className="w-full space-y-1">
                <Label className="leading-5 text-[#5D0505]" htmlFor="password">
                  New Password*
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                    className="text-[#5D0505] hover:text-[#5D0505]/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isPasswordVisible ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {/* Confirm Password */}

            {showChangePass && (
              <div className="w-full space-y-1 ">
                <Label
                  className="leading-5 text-[#5D0505]"
                  htmlFor="confirmPassword"
                >
                  Confirm Password*
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setIsConfirmPasswordVisible((prevState) => !prevState)
                    }
                    className="text-[#5D0505] hover:text-[#5D0505]/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isConfirmPasswordVisible
                        ? "Hide password"
                        : "Show password"}
                    </span>
                  </Button>
                </div>
                <Button className="my-4" variant={'authOutline'}>
                  Update Password
                </Button>
              </div>
          
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
            <Button type="submit" variant={'auth'}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PersonalInfoEditDialog;
