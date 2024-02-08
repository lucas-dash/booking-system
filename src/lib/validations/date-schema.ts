import { addDays, differenceInDays } from 'date-fns';
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
    )
    .refine((data) => {
      if (!data.from || !data.to) {
        return false;
      }
      const daysDiff = differenceInDays(data.to, data.from);
      return daysDiff <= 13;
    }, `The duration cannot be more than 14 days`),
  guests: z.string(),
});
