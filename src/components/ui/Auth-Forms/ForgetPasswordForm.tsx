// import { useState } from "react";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";

const ForgetPasswordForm = () => {

  const navigate = useNavigate();
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

    
      <Button
        className="w-full bg-[#5D0505] text-white hover:bg-[#5D0505]/90"
        type="submit"
        onClick={() => navigate({ to: "/auth/otp" })}
      >
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
