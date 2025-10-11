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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl whitespace-nowrap font-bold text-[#5D0505] 3xl:text-4xl">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm 3xl:text-md text-balance ">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-[#5D0505]">
            Email
          </FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="text-[#5D0505]">
              Password
            </FieldLabel>
            <Link
              to="/auth/forgetPassword"
              className="ml-auto font-medium text-sm text-[#5D0505] underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" variant={"auth"}>
            Login
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="text-[#5D0505]  hover:text-[#5D0505]/90 hover:border-[#5D0505]"
          >
            <GoogleIcon className="text-[#5D0505]" />
            Login with Google
          </Button>
          <FieldDescription className="text-center text-[#5D0505] hover:text-[#5D0505]/90">
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
