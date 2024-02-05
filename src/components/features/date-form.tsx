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
// import { format } from 'date-fns';

export default function DateForm() {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: {
        from: new Date(),
        to: new Date(),
      },
      guests: '1',
      room: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    // todo set values to global state
    if (values.room) {
      console.log(values);

      // Number(values.guests);
      // format(values.date.from, 'yyyy-MM-dd')
      setOpenDialog(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DateRangePicker formControl={form.control} />

        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">3 Beds, 1 Kitchen</SelectItem>
                  <SelectItem value="2">4 Beds, 1 Kitchen</SelectItem>
                  <SelectItem value="3">4 Beds, 2 Kitchen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <ContactDialog open={openDialog} close={setOpenDialog} />
      </form>
    </Form>
  );
}
