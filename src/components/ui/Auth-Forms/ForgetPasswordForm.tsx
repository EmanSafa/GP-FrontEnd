import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
});

type FormData = z.infer<typeof schema>;

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // TODO: call API to request password reset link
    // For now, navigate to OTP page (existing behaviour)
    console.log("Forgot password submit:", data);
    navigate({ to: "/auth/otp" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="userEmail" className="leading-5 text-plate-8">
            Email address*
          </FieldLabel>
          <Input
            type="email"
            id="userEmail"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Button
          className="w-full bg-plate-8 text-white hover:bg-plate-8/90"
          type="submit"
          disabled={isSubmitting}
        >
          Send Reset Link
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ForgetPasswordForm;
