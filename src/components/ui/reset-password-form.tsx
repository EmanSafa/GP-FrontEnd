import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      {/* Email */}
      <div className="space-y-1">
        <Label className="leading-5 text-[#5D0505]" htmlFor="userEmail">
          Email address*
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder="Enter your email address"
        />
      </div>

      {/* Password */}
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
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            className="text-[#5D0505] hover:text-[#5D0505]/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isPasswordVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="w-full space-y-1">
        <Label className="leading-5 text-[#5D0505]" htmlFor="confirmPassword">
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
              {isConfirmPasswordVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      <Button
        className="w-full bg-[#5D0505] text-white hover:bg-[#5D0505]/90"
        type="submit"
      >
        Set New Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
