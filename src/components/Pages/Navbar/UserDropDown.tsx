import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useNavigate } from "@tanstack/react-router";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";

const UserDropDown = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore.getState();
    

  const handleLogout = async () => {
    await authApi.logout();
    navigate({ to: "/auth/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-transparent ">
          <CircleUserRound className="text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="start">
        <DropdownMenuLabel className="text-xl">My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to="/account" className="no-underline">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
         
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <Link to='/contact'>
        <DropdownMenuItem>Support</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {isAuthenticated && user && user.role === 'admin' && (
          <Link to='/dashboard'>
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuSeparator />
          </Link>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
