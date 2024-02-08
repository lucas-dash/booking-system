import { z } from 'zod';

export const guestSchema = z.object({
  firstName: z.string().min(2).max(20).trim(),
  lastName: z.string().min(2).max(30).trim(),
  email: z.string().email().trim(),
  phone: z.string().min(5).max(15).trim(),
});
