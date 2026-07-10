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
import { useAuthStore } from '@/store/authStore';
import { BugHighlighter } from '@/components/BugScanner/BugHighlighter';
import { useVersionStore } from '@/store/versionStore';
import { LOGIN_BUG, USER_ENUMERATION_BUG, WEAK_PASSWORD_HASH_BUG } from '@/constants/bugs';
import { loginV1Schema, loginV2Schema, loginV3Schema } from '@/schema/loginSchema';
import type { LoginFormData } from '@/schema/loginSchema';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [apiError, setApiError] = useState<string>('');
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const { mutate: login, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      // Auth data is already stored by authApi.login
      const redirectPath = user?.role === 'admin' ? '/dashboard' : '/';
      void navigate({ to: redirectPath });
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const activeVersion = useVersionStore((state) => state.activeVersion);
  const schema =
    activeVersion === 'v3' ? loginV3Schema : activeVersion === 'v1' ? loginV1Schema : loginV2Schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema) as never,
    mode: 'onSubmit',
  });

  const onSubmit = (data: LoginFormData) => {
    setApiError('');
    login(data);
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <FieldGroup>
        <BugHighlighter
          id={LOGIN_BUG.id}
          ids={[LOGIN_BUG.id, USER_ENUMERATION_BUG.id, WEAK_PASSWORD_HASH_BUG.id]}
          bugName="Security Vulnerabilities"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl whitespace-nowrap font-bold text-plate-8 3xl:text-4xl">
              Login to your account
            </h1>
            <p className="text-muted-foreground text-sm 3xl:text-md text-balance ">
              Enter your email below to login to your account
            </p>
            {apiError && activeVersion !== 'v3' && (
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
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.email && 'border-red-500 focus:ring-red-300'
            )}
            {...register('email')}
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
            {...register('password')}
            className={cn(
              'border-gray-300 focus:border-plate-8 focus:ring-plate-8/20',
              errors.password && 'border-red-500 focus:ring-red-300'
            )}
          />
          {errors.password && <FieldError>{errors.password.message}</FieldError>}
        </Field>
        <Field>
          <Button type="submit" variant={'default'} disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
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
            Don&apos;t have an account?{' '}
            <Link to="/auth/signup" className="underline underline-offset-4 font-semibold">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
