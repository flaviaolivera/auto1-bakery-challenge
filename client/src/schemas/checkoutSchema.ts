import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal Code is required'),
});

export const customerInfoSchema = z.object({
  email: z.email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is too short'),
  address: addressSchema,
  paymentMethod: z
  .string()
  .refine((val) => val === 'cash' || val === 'card', {
    message: 'Select a payment method',
  }),
  specialInstructions: z.string().optional(),
});

export type CustomerInfoForm = z.infer<typeof customerInfoSchema>;
