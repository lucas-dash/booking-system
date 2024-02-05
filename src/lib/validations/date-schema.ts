import { addDays } from 'date-fns';
import { z } from 'zod';

export const bookingSchema = z.object({
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(
      (data) => data.from > addDays(new Date(), -1),
      'Start date must be in the future'
    ),
  guests: z.string(),
  room: z.string(),
});
