import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleIcon from "../icons/googleIcon";
import { Link } from "@tanstack/react-router";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const schema = z
    .object({
      fullName: z
        .string()
        .min(2, { message: "Full Name is too short" })
        .max(100, { message: "Full Name is too long" })
        .nonempty({ message: "Full name is required" }),

      email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required" })
        .min(5, { message: "Email is too short" })
        .max(50, { message: "Email is too long" })
        .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
          message: "Please enter a valid email address",
        }),

      password: z
        .string()
        .trim()
        .nonempty({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(/[A-Z]/, { message: "At least one uppercase letter required" })
        .regex(/[a-z]/, { message: "At least one lowercase letter required" })
        .regex(/[0-9]/, { message: "At least one number required" })
        .regex(/[^A-Za-z0-9]/, {
          message: "At least one special character required",
        })
        .refine((val) => !val.includes("password"), {
          message: "Password should not contain the word 'password'",
        }),
      confirmPassword: z
        .string()
        .trim()
        .nonempty({ message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  type SignupFormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };
  return (
    <form
      className={cn("flex flex-col  max-w-sm mx-auto", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
            className={cn(
              "border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20",
              errors.fullName && "border-red-500 focus:ring-red-300"
            )}
            {...register("fullName")}
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
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
            className={cn(
              "border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20",              
              errors.email && "border-red-500 focus:ring-red-300"
            )}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
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
            className={cn(
              "border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20",
              errors.password && "border-red-500 focus:ring-red-300"
            )}
            {...register("password")}
            isPassword={true}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
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
            className={cn(
              "border-gray-300 focus:border-[#5D0505] focus:ring-[#5D0505]/20",
              errors.confirmPassword && "border-red-500 focus:ring-red-300"
            )}
            {...register("confirmPassword")}
            isPassword={true}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
        <Field className="mt-1">
          <Button
            type="submit"
            className="w-full bg-[#5D0505] hover:bg-[#4a0404] text-white font-medium  rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={isSubmitting}
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
