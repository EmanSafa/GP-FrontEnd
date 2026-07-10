import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useNavigate } from '@tanstack/react-router';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { authApi } from '@/api/authApi';
import { emailSchema, getPasswordSchema, passwordV2Schema } from '@/schema/forgetPasswordSchema';
import { useVersionStore } from '@/store/versionStore';

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordV2Schema>;

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const { activeVersion } = useVersionStore();

  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<number | undefined>(undefined);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(getPasswordSchema(activeVersion)),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmitEmail = async (data: EmailFormData) => {
    try {
      const response = await authApi.forgotPassword(data.email);
      setEmail(data.email);
      if (response && response.user_id) {
        setUserId(Number(response.user_id));
      }
      setStep('password');
    } catch {
      // Errors are already toasted in authApi
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      await authApi.resetPasswordGuest({
        email,
        new_password: data.new_password,
        user_id: userId,
      });
      void navigate({ to: '/auth/login' });
    } catch {
      // Errors are already toasted in authApi
    }
  };

  if (step === 'email') {
    return (
      <form
        className="space-y-4"
        onSubmit={(e) => {
          void handleEmailSubmit(onSubmitEmail)(e);
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="userEmail" className="leading-5 text-plate-8">
              Email address*
            </FieldLabel>
            <Input
              type="email"
              id="userEmail"
              placeholder="Enter your email address"
              {...registerEmail('email')}
            />
            {emailErrors.email && <FieldError>{emailErrors.email.message}</FieldError>}
          </Field>

          <Button
            className="w-full bg-plate-8 text-white hover:bg-plate-8/90"
            type="submit"
            disabled={isEmailSubmitting}
          >
            Send Reset Link
          </Button>
        </FieldGroup>
      </form>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        void handlePasswordSubmit(onSubmitPassword)(e);
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="newPassword" className="leading-5 text-plate-8">
            New Password*
          </FieldLabel>
          <Input
            type="password"
            id="newPassword"
            isPassword
            placeholder="Enter your new password"
            {...registerPassword('new_password')}
          />
          {passwordErrors.new_password && (
            <FieldError>{passwordErrors.new_password.message as string}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword" className="leading-5 text-plate-8">
            Confirm Password*
          </FieldLabel>
          <Input
            type="password"
            id="confirmPassword"
            isPassword
            placeholder="Confirm your new password"
            {...registerPassword('confirm_password')}
          />
          {passwordErrors.confirm_password && (
            <FieldError>{passwordErrors.confirm_password.message as string}</FieldError>
          )}
        </Field>

        <Button
          className="w-full bg-plate-8 text-white hover:bg-plate-8/90"
          type="submit"
          disabled={isPasswordSubmitting}
        >
          Reset Password
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ForgetPasswordForm;
