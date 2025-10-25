import { ChevronLeftIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "../ui/reset-password-form";
import { Link } from "@tanstack/react-router";

const ForgetPassword = () => {
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-md">
        <CardHeader className="gap-6">
          <div>
            <CardTitle className="mb-1.5 text-2xl text-[#5D0505] ">
              Reset Password
            </CardTitle>
            <CardDescription className="text-base ">
              Please enter your current password and choose a new password to
              update your account security.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ResetPassword Form */}
          <ResetPasswordForm />

          <a href="#" className="group mx-auto flex w-fit items-center gap-2">
            <ChevronLeftIcon className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <Link to="/auth/login">Back to login</Link>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
