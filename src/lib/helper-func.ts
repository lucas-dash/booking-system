import { differenceInDays, format, addDays, isWithinInterval } from 'date-fns';

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

type DateRange = {
  start: Date;
  end: Date;
};

type UnavailableDateRange = DateRange[];

export const findNextAvailableDates = (
  unavailableRanges: UnavailableDateRange,
  daysToFind: number = 2
): Date[] => {
  let currentDate = new Date();
  let availableDates: Date[] = [];

  while (availableDates.length < daysToFind) {
    const isAvailable = !unavailableRanges.some((range) =>
      isWithinInterval(currentDate, { start: range.start, end: range.end })
    );

    if (isAvailable) {
      if (availableDates.length === 0) {
        // Přidání prvního dostupného dne
        availableDates.push(currentDate);
      } else if (availableDates.length === 1) {
        // Kontrola, zda je druhý den také dostupný
        const nextDay = addDays(currentDate, 1);
        const isNextDayAvailable = !unavailableRanges.some((range) =>
          isWithinInterval(nextDay, { start: range.start, end: range.end })
        );

        if (isNextDayAvailable) {
          availableDates.push(nextDay);
          break;
        } else {
          availableDates = [];
        }
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  return availableDates;
};
