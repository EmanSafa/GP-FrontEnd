import * as z from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Email is required' })
    .min(5, { message: 'Email is too short' })
    .max(50, { message: 'Email is too long' })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: 'Please enter a valid email address',
    }),
});

export const passwordV2Schema = z
  .object({
    new_password: z
      .string()
      .trim()
      .nonempty({ message: 'New password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirm_password: z.string().trim().nonempty({ message: 'Confirm password is required' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const passwordV1Schema = z
  .object({
    new_password: z
      .string()
      .trim()
      .nonempty({ message: 'New password is required' })
      .min(4, { message: 'Password must be at least 4 characters' }),
    confirm_password: z.string().trim().nonempty({ message: 'Confirm password is required' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const passwordV3Schema = z.object({
  new_password: z.string().optional().or(z.literal('')),
  confirm_password: z.string().optional().or(z.literal('')),
});

export const getPasswordSchema = (version: 'v1' | 'v2' | 'v3') => {
  if (version === 'v3') return passwordV3Schema;
  return version === 'v1' ? passwordV1Schema : passwordV2Schema;
};
