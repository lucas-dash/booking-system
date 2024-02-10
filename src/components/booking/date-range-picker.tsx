import { format, parseISO } from 'date-fns';

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
import { parseDate } from '@/lib/helper-func';
import { useTotalPriceStore } from '@/store/total-price-store';
import useRealtime from '@/lib/hooks/useRealtime';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

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
      }>
    | undefined;
}

export default function DateRangePicker({ formControl }: DateRangePickerProps) {
  const [bookedDays, setBookedDays] = useState<ExtractedDates[]>([
    { check_in: '', check_out: '' },
  ]);
  const { isLoading, data } = useRealtime();
  const setDays = useTotalPriceStore((state) => state.setDays);

  useEffect(() => {
    if (data) {
      setBookedDays(data);
    }
  }, [data]);

  const bookedDateRanges = bookedDays?.map((range) => ({
    from: parseISO(range.check_in),
    to: parseISO(range.check_out),
  }));

  const disabledDays = [{ before: new Date() }, ...bookedDateRanges];

  return (
    <FormField
      control={formControl}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Check-In / Check-Out</FormLabel>
          {isLoading ? (
            <Skeleton className="w-full h-10 rounded-xl" />
          ) : (
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
                  onSelect={(value) => {
                    field.onChange(value);
                    setDays(parseDate(value?.from, value?.to));
                  }}
                  numberOfMonths={2}
                  disabled={disabledDays}
                />
              </PopoverContent>
            </Popover>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
