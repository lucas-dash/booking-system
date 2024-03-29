import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DateForm from './date-form';
import { useQuery } from '@tanstack/react-query';
import { getRoomInfo } from '@/lib/queries/get-room-info';
import { calculateTotalPrice, currencyFormat } from '@/lib/helper-func';
import { useTotalPriceStore } from '@/store/total-price-store';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

export default function BookingCard() {
  const { setTotal, days, total } = useTotalPriceStore();

  const { isLoading, data, error } = useQuery({
    queryKey: ['roomInfo'],
    queryFn: async () => await getRoomInfo(),
  });

  if (error) {
    toast({ variant: 'destructive', title: error?.message });
  }

  useEffect(() => {
    if (!isLoading && data) {
      setTotal(data.price_per_day + data.clean_fee);
    }
  }, [data, setTotal, isLoading]);

  return (
    <article className="w-full">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            {isLoading ? (
              <div className="animate-ping w-3 h-3 rounded-full bg-secondary"></div>
            ) : (
              <p>
                {currencyFormat(data?.price_per_day || 0)}
                <span className="ml-2 text-gray-500 text-base font-normal">
                  night
                </span>
              </p>
            )}
          </CardTitle>
          <CardDescription className="text-center">
            You won't be charged yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateForm />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <p>Cleaning Fee: {currencyFormat(data?.clean_fee || 0)}</p>
          <hr className="w-full" />
          {isLoading ? (
            <div className="animate-ping w-3 h-3 rounded-full bg-secondary"></div>
          ) : (
            <h5 className="font-semibold text-lg">
              {' '}
              {`Total: ${calculateTotalPrice(total, days)}`}
            </h5>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
