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
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';
import { parseDate } from '@/lib/helper-func';
import { useTotalPriceStore } from '@/store/total-price-store';
import useRealtime from '@/lib/hooks/useRealtime';

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
  const [unavailableDays, setUnavailableDays] = useState<ExtractedDates[]>([
    { check_in: '', check_out: '' },
  ]);
  const { isLoading, data } = useRealtime();
  const setDays = useTotalPriceStore((state) => state.setDays);

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
    if (!isLoading && data) {
      const extractedDates = data?.map(({ check_in, check_out }) => ({
        check_in,
        check_out,
      }));
      setUnavailableDays(extractedDates);
    }
  }, [data, isLoading]);

  return (
    <FormField
      control={formControl}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Check-In / Check-Out
            {isLoading && <Loader2 className="ml-1 animate-spin" />}
          </FormLabel>
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
