import { calculateTotalPrice } from '@/lib/helper-func';
import { useTotalPriceStore } from '@/store/total-price-store';

import { format } from 'date-fns';

type SummaryProps = {
  time: {
    check_in: string;
    check_out: string;
  };
};

export default function Summary({ time }: SummaryProps) {
  const { total, days } = useTotalPriceStore();
  return (
    <article>
      <h3 className="font-semibold">Summary:</h3>
      <div className="flex flex-col gap-2 pt-2">
        <h5 className="font-medium font-">
          Total:{' '}
          <span className="font-normal">
            {calculateTotalPrice(total, days)}
          </span>
        </h5>
        <h5 className="font-medium font-">
          Check-In:{' '}
          <span className="font-normal">
            {format(time.check_in, 'd LLL y')} 14:00
          </span>
        </h5>
        <h5 className="font-medium font-">
          Check-Out:{' '}
          <span className="font-normal">
            {format(time.check_out, 'd LLL y')} 11:00
          </span>
        </h5>
      </div>
    </article>
  );
}
