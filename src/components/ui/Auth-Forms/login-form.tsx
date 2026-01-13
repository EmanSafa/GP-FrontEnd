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
import { Link, useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/api/authApi";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useHighlightStore } from "@/store/highlightStore";
import { BugHighlighter } from "@/components/BugScanner/BugHighlighter";
import { LOGIN_BUG } from "@/constants/bugs";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [apiError, setApiError] = useState<string>("");
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);



  const { mutate: login, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      // Auth data is already stored by authApi.login
      const redirectPath = user?.role === 'admin' ? '/dashboard' : '/';
      navigate({ to: redirectPath });
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const { triggerHighlight } = useHighlightStore();

  useEffect(() => {
    triggerHighlight(LOGIN_BUG.id, LOGIN_BUG.details);
  }, []);

  const schema = z.object({
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
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .refine((val) => !/\s/.test(val), {
        message: "Password must not contain spaces",
      }),
  });

  type LoginFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    // resolver: zodResolver(schema),
    // mode: "onSubmit",
  });

  const onSubmit = (data: LoginFormData) => {
    setApiError("");
    login(data);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >

      <FieldGroup>
        <BugHighlighter id={LOGIN_BUG.id} bugName="SQLI - SQL Injection">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl whitespace-nowrap font-bold text-plate-8 3xl:text-4xl">
              Login to your account
            </h1>
            <p className="text-muted-foreground text-sm 3xl:text-md text-balance ">
              Enter your email below to login to your account
            </p>
            {apiError && (
              <div className="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {apiError}
              </div>
            )}
          </div>
        </BugHighlighter>
        <Field>
          <FieldLabel htmlFor="email" className="text-plate-8">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className={cn(
              "border-gray-300 focus:border-plate-8 focus:ring-plate-8/20",
              errors.email && "border-red-500 focus:ring-red-300"
            )}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="text-plate-8">
              Password
            </FieldLabel>
            <Link
              to="/auth/forgetPassword"
              className="ml-auto font-medium text-sm text-plate-8 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            isPassword
            {...register("password")}
            className={cn(
              "border-gray-300 focus:border-plate-8 focus:ring-plate-8/20",
              errors.password && "border-red-500 focus:ring-red-300"
            )}
          />
          {/* {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )} */}
        </Field>
        <Field>
          <Button type="submit" variant={"default"} disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          {/* <Button
            variant="outline"
            type="button"
            className="text-plate-8  hover:text-plate-8/90 hover:border-plate-8 transition-all duration-200 "
          >
            <GoogleIcon className="text-plate-8" />
            Login with Google
          </Button> */}
          <FieldDescription className="text-center text-plate-8 hover:text-plate-8/90">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/signup"
              className="underline underline-offset-4 font-semibold"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
