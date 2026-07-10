import * as z from 'zod';

export const loginV2Schema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Email is required' })
    .min(5, { message: 'Email is too short' })
    .max(50, { message: 'Email is too long' })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: 'Please enter a valid email address',
    }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

export const loginV1Schema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

export const loginV3Schema = z.object({
  email: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginV2Schema>;
