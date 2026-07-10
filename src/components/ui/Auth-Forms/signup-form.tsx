import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '@/api/authApi';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useVersionStore } from '@/store/versionStore';
import {
  signupV1Schema,
  signupV2Schema,
  signupV3Schema,
  type SignupFormData,
} from '@/schema/signupSchema';

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [apiError, setApiError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: authApi.register,
    onSuccess: async (_data, variables) => {
      setSuccessMessage('Account created successfully! Logging in...');
      try {
        const authData = await authApi.login({
          email: variables.email,
          password: variables.password,
        });
        const destination = authData.user?.role === 'admin' ? '/dashboard' : '/';
        setTimeout(() => {
          void navigate({ to: destination });
        }, 1500);
      } catch {
        toast.error('Auto-login failed. Redirecting to login...');
        setTimeout(() => {
          void navigate({ to: '/auth/login' });
        }, 2000);
      }
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const activeVersion = useVersionStore((state) => state.activeVersion);
  const schema =
    activeVersion === 'v3'
      ? signupV3Schema
      : activeVersion === 'v1'
        ? signupV1Schema
        : signupV2Schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: SignupFormData) => {
    setApiError('');
    setSuccessMessage('');

    // Transform data to match API spec (name instead of name)
    const registerData = {
      name: data.name, // Backend expects 'name'
      email: data.email,
      password: data.password,
      phone: data.phone,
    };

    console.log('Form data:', data);
    console.log('Sending to API:', registerData);

    registerUser(registerData);
  };

  return (
    <form
      className={cn('flex flex-col  max-w-sm mx-auto', className)}
      {...props}
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center ">
          <h1 className="text-3xl font-bold text-plate-8 tracking-tight">Create Account</h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Fill in the form below to create your account
          </p>
          {successMessage && (
            <div className="w-full p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {successMessage}
            </div>
          )}
          {apiError && activeVersion !== 'v3' && (
            <div className="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {apiError}
            </div>
          )}
        </div>
        <Field>
          <FieldLabel htmlFor="name" className="text-plate-8 font-medium">
            Full Name
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            required
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.name && 'border-red-500 focus:ring-red-300'
            )}
            {...register('name')}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-plate-8 font-medium">
            Email Address
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.email && 'border-red-500 focus:ring-red-300'
            )}
            {...register('email')}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="phone" className="text-plate-8 font-medium">
            Phone Number
          </FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.phone && 'border-red-500 focus:ring-red-300'
            )}
            {...register('phone')}
          />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-plate-8 font-medium">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.password && 'border-red-500 focus:ring-red-300'
            )}
            {...register('password')}
            isPassword={true}
          />
          {errors.password && <FieldError>{errors.password.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password" className="text-plate-8 font-medium">
            Confirm Password
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.confirmPassword && 'border-red-500 focus:ring-red-300'
            )}
            {...register('confirmPassword')}
            isPassword={true}
          />
          {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
        </Field>
        <Field className="mt-1">
          <Button type="submit" variant={'default'} disabled={isPending}>
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Field>

        <FieldSeparator className="text-gray-500 text-sm">Or continue with</FieldSeparator>

        <Field>
          {/* <Button
            variant="outline"
            type="button"
            className="w-full border-gray-300 text-plate-8 hover:text-plate-8/90 hover:border-plate-8 transition-all duration-200 py-2.5"
          >
            <GoogleIcon className="w-5 h-5 mr-3 text-plate-8" />
            Sign up with Google
          </Button> */}

          <FieldDescription className="text-center text-plate-8 hover:text-plate-8/90">
            Already have an account?{' '}
            <Link to="/auth/login" className=" font-semibold transition-colors duration-200">
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
