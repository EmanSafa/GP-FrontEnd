import * as z from 'zod';

export const signupV2Schema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Full Name is too short' })
      .max(100, { message: 'Full Name is too long' })
      .nonempty({ message: 'Full name is required' }),

    email: z
      .string()
      .trim()
      .nonempty({ message: 'Email is required' })
      .min(5, { message: 'Email is too short' })
      .max(50, { message: 'Email is too long' })
      .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
        message: 'Please enter a valid email address',
      }),

    phone: z.string().trim().optional(),

    password: z
      .string()
      .trim()
      .nonempty({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(50, { message: 'Password must not exceed 50 characters' })
      .regex(/[A-Z]/, { message: 'At least one uppercase letter required' })
      .regex(/[a-z]/, { message: 'At least one lowercase letter required' })
      .regex(/[0-9]/, { message: 'At least one number required' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'At least one special character required',
      })
      .refine((val) => !val.includes('password'), {
        message: "Password should not contain the word 'password'",
      }),
    confirmPassword: z.string().trim().nonempty({ message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const signupV1Schema = z
  .object({
    name: z.string().nonempty({ message: 'Full name is required' }),
    email: z.string().nonempty({ message: 'Email is required' }),
    phone: z.string().optional(),
    password: z.string().nonempty({ message: 'Password is required' }),
    confirmPassword: z.string().nonempty({ message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const signupV3Schema = z.object({
  name: z.string().optional().or(z.literal('')),
  email: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
});

export type SignupFormData = z.infer<typeof signupV2Schema>;
