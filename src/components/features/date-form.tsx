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
import ContactDialog from './contact-dialog';
import { useState } from 'react';
import { useReservationStore } from '@/store/reservation-store';
import { format } from 'date-fns';

export default function DateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const setDateRange = useReservationStore((state) => state.setDateRange);
  const setGuests = useReservationStore((state) => state.setGuests);

  function close() {
    setOpenDialog(false);
  }

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
    const range = {
      from: format(values.date.from, 'yyy-MM-dd'),
      to: format(values.date.to, 'yyy-MM-dd'),
    };

    setDateRange(range);
    setGuests(Number(values.guests));

    setOpenDialog(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DateRangePicker formControl={form.control} />

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guests</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // handleGuestsChange(value);
                }}
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
        <ContactDialog open={openDialog} close={close} />
      </form>
    </Form>
  );
}
