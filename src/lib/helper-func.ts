import { differenceInDays, format } from 'date-fns';

export function currencyFormat(price: number | string) {
  const formatted = new Intl.NumberFormat('cz-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
  });

  if (typeof price === 'string') return formatted.format(Number(price));

  return formatted.format(price);
}

export function calculateTotalPrice(pricePerDay: number, days: number) {
  const totalPrice = pricePerDay * days;

  return currencyFormat(totalPrice);
}

export function parseDate(from: Date | undefined, to: Date | undefined) {
  if (from && to) {
    const startDate = format(from, 'yyyy-MM-dd');
    const endDate = format(to, 'yyyy-MM-dd');

    return differenceInDays(endDate, startDate);
  } else return 1;
}
