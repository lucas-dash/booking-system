import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { guestSchema } from '@/lib/validations/guest-schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useReservationStore } from '@/store/reservation-store';
import { useMutation } from '@tanstack/react-query';
import { insertReservation } from '@/lib/queries/insert-reservation';
import { InsertType } from '@/lib/types/reservations-type';
import { Loader2 } from 'lucide-react';
import { useTotalPriceStore } from '@/store/total-price-store';

export default function GuestForm() {
  const reservation = useReservationStore((state) => ({
    check_in: state.check_in,
    check_out: state.check_out,
    guests_count: state.guests_count,
  }));
  const totalPrice = useTotalPriceStore((state) => state.total);

  const { isPending, mutate } = useMutation({
    mutationKey: ['confirmReservation'],
    mutationFn: async (reservationData: InsertType) =>
      await insertReservation(reservationData),
  });

  const form = useForm<z.infer<typeof guestSchema>>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof guestSchema>) {
    if (reservation) {
      try {
        const combinedData = { ...reservation, ...values, totalPrice };
        mutate(combinedData);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex max-sm:flex-col sm:items-center gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Smith"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johnSmith@email.com"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="721 882 991"
                  minLength={5}
                  maxLength={15}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex items-center">
          {isPending && <Loader2 className="mr-1 animate-spin" />}
          Confirm Reservation
        </Button>
      </form>
    </Form>
  );
}
