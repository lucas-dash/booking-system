import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { bookingSchema } from '@/lib/validations/date-schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DateRangePicker from './date-range-picker';
import { useReservationStore } from '@/store/reservation-store';
import {
  eachDayOfInterval,
  format,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { useModal } from '@/store/modal';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import useRealtime from '@/lib/hooks/useRealtime';
import { Skeleton } from '../ui/skeleton';

export default function DateForm() {
  const { openModal } = useModal();
  const { setDateRange } = useReservationStore();
  const { setGuests } = useReservationStore();
  const { isLoading, data } = useRealtime();
  const [error, setError] = useState('');

  const [bookedDays, setBookedDays] = useState([
    { check_in: '', check_out: '' },
  ]);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: {
        from: new Date(),
        to: new Date(),
      },
      guests: '1',
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    const selectedFrom = values.date.from;
    const selectedTo = values.date.to;

    const unvailableDays = bookedDays.flatMap((booking) =>
      eachDayOfInterval({
        start: parseISO(booking.check_in),
        end: parseISO(booking.check_out),
      })
    );

    let isDateUnavailable = false;

    for (const day of unvailableDays) {
      if (isWithinInterval(day, { start: selectedFrom, end: selectedTo })) {
        isDateUnavailable = true;
        break;
      }
    }

    if (isDateUnavailable) {
      setError('Selected dates are already booked');
      return;
    } else {
      setError('');
    }

    const range = {
      from: format(values.date.from, 'yyy-MM-dd'),
      to: format(values.date.to, 'yyy-MM-dd'),
    };

    setDateRange(range);
    setGuests(Number(values.guests));

    openModal();
  }

  useEffect(() => {
    if (!isLoading && data) {
      const booked = data?.map(({ check_in, check_out }) => {
        return {
          check_in: check_in,
          check_out: check_out,
        };
      });

      setBookedDays(booked);
    }
  }, [data, form, isLoading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isLoading ? (
          <Skeleton className="w-full h-10 rounded-xl" />
        ) : (
          <DateRangePicker
            formControl={form.control}
            unavailableDays={bookedDays}
          />
        )}

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guests</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Guests" defaultValue={'1'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
        <Button className="w-full" type="submit">
          Reserve
        </Button>
      </form>
    </Form>
  );
}
