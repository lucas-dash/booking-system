import { FormEvent, useEffect, useState } from 'react';
import { DatePickerWithRange } from './ui/DatePickerWithRange';
import { Button } from './ui/button';
import useReservation from '@/lib/hooks/useReservation';

type ExtractedDates = {
  check_in: string;
  check_out: string;
};

export default function Reservation() {
  const [unavailableDays, setUnavailableDays] = useState<ExtractedDates[]>([
    { check_in: '', check_out: '' },
  ]);
  const { data } = useReservation();

  useEffect(() => {
    if (data) {
      const extractedDates = data.map(({ check_in, check_out }) => ({
        check_in,
        check_out,
      }));
      setUnavailableDays(extractedDates);
    }
  }, [data]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div>
      <h3>Reserve you day</h3>
      <form onSubmit={submit}>
        <DatePickerWithRange bookedRanges={unavailableDays} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
