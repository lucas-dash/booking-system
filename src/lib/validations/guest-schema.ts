import { z } from 'zod';

export const guestSchema = z.object({
  firstName: z.string().min(2).max(20).trim(),
  lastName: z.string().min(2).max(30).trim(),
  email: z.string().email().trim(),
  phone: z
    .string()
    .min(5)
    .max(15)
    .trim()
    .regex(
      /^(?:(?:\+420)? ?)?[1-7][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      'Invalid Czech phone number'
    ),
});
