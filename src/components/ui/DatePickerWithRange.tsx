import * as React from 'react';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bookedRanges: { check_in: string; check_out: string }[];
}

export function DatePickerWithRange({
  className,
  bookedRanges,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const bookedDateRanges = bookedRanges?.map((range) => ({
    check_in: parseISO(range.check_in),
    check_out: parseISO(range.check_out),
  }));

  //   const nearestAvailableDate = bookedDateRanges?.reduce<Date | null>(
  //     (nearestDate, bookedRange) => {
  //       const checkOutDate = addDays(bookedRange.check_out, 1); // Add 1 day to the check-out date
  //       const today = new Date();

  //       // Find the nearest date after today that is not occupied
  //       if (
  //         isAfter(checkOutDate, today) &&
  //         (!nearestDate || isBefore(checkOutDate, nearestDate))
  //       ) {
  //         return checkOutDate;
  //       }

  //       return nearestDate;
  //     },
  //     null
  //   );

  //   // Set the default range
  //   const defaultRange: DateRange = nearestAvailableDate
  //     ? {
  //         from: nearestAvailableDate,
  //         to: addDays(nearestAvailableDate, 1),
  //       }
  //     : {
  //         from: new Date(),
  //         to: addDays(new Date(), 2),
  //       };

  //   const [date, setDate] = React.useState<DateRange | undefined>(defaultRange);

  const isWithinBookedRanges = (day: Date) => {
    return bookedDateRanges?.some((range) => {
      const startDate = range.check_in;
      const endDate = range.check_out;

      return isWithinInterval(day, { start: startDate, end: endDate });
    });
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={isWithinBookedRanges}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
