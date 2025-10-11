import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleIcon from "./ui/icons/googleIcon";
import { Link } from "@tanstack/react-router";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-2 max-w-sm mx-auto", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center ">
          <h1 className="text-3xl font-bold text-[#5D0505] tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name" className="text-[#5D0505] font-medium">
            Full Name
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            required
            className=" border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-[#5D0505] font-medium">
            Email Address
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className=" border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-[#5D0505] font-medium">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            className=" border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20"
          />
        </Field>
        <Field>
          <FieldLabel
            htmlFor="confirm-password"
            className="text-[#5D0505] font-medium"
          >
            Confirm Password
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            className=" border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20"
          />
        </Field>
        <Field className="mt-1">
          <Button
            type="submit"
            className="w-full bg-[#5D0505] hover:bg-[#4a0404] text-white font-medium  rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Create Account
          </Button>
        </Field>

        <FieldSeparator className="text-gray-500 text-sm">
          Or continue with
        </FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            className="w-full border-gray-300 text-[#5D0505] hover:text-[#5D0505]/90 hover:border-[#5D0505] transition-all duration-200 py-2.5"
          >
            <GoogleIcon className="w-5 h-5 mr-3 text-[#5D0505]" />
            Sign up with Google
          </Button>

          <FieldDescription className="text-center text-[#5D0505] hover:text-[#5D0505]/90">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className=" font-semibold transition-colors duration-200"
            >
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
