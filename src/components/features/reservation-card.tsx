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

export default function ReservationCard() {
  const priceStore = useTotalPriceStore();
  const setTotal = useTotalPriceStore((state) => state.setTotal);

  const { isLoading, data } = useQuery({
    queryKey: ['roomInfo'],
    queryFn: async () => await getRoomInfo(),
  });

  useEffect(() => {
    if (data) {
      setTotal(data.price_per_day + data.clean_fee);
    }
  }, [data, setTotal]);

  return (
    <article>
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
          {/* separator */}
          {isLoading ? (
            <div className="animate-ping w-3 h-3 rounded-full bg-secondary"></div>
          ) : (
            <h5 className="font-semibold text-lg">
              {' '}
              {`Total: ${calculateTotalPrice(
                priceStore.total,
                priceStore.days
              )}`}
            </h5>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
