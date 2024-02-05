import useReservation from '@/lib/hooks/useReservation';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

type ExtractedDates = {
  check_in: string;
  check_out: string;
};

interface DateRangePickerProps {
  formControl:
    | Control<{
        date: {
          from: Date;
          to: Date;
        };
        guests: string;
        room: string;
      }>
    | undefined;
}

export default function DateRangePicker({ formControl }: DateRangePickerProps) {
  const [unavailableDays, setUnavailableDays] = useState<ExtractedDates[]>([
    { check_in: '', check_out: '' },
  ]);
  const { data } = useReservation();

  const bookedDateRanges = unavailableDays?.map((range) => ({
    check_in: parseISO(range.check_in),
    check_out: parseISO(range.check_out),
  }));

  const isWithinBookedRanges = (day: Date) => {
    return bookedDateRanges?.some((range) => {
      const startDate = range.check_in;
      const endDate = range.check_out;

      return isWithinInterval(day, { start: startDate, end: endDate });
    });
  };

  useEffect(() => {
    if (data) {
      const extractedDates = data.map(({ check_in, check_out }) => ({
        check_in,
        check_out,
      }));
      setUnavailableDays(extractedDates);
    }
  }, [data]);

  return (
    <FormField
      control={formControl}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Check-In / Check-Out</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, 'LLL dd, y')} -{' '}
                        {format(field.value.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(field.value.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
                disabled={isWithinBookedRanges}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}