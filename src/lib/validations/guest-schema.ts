import { z } from 'zod';

export const guestSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  phone: z.string().min(5).max(15),
});
