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
    )
    .refine(
      (data) => data.from && data.to,
      'Both start and end dates must be selected'
    )
    .refine(
      (data) =>
        !(data.from && data.to && data.from.getTime() === data.to.getTime()),
      'Start and end dates cannot be the same'
    ),
  guests: z.string(),
});
